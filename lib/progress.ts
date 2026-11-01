"use client";

import { useCallback, useEffect, useState } from "react";

export const TOTAL_DAYS = 28;

export type Attempt = {
  id: string;
  day: number;
  at: number;
  misses: number;
  ms: number;
  total?: number;
  synced: boolean;
};

export type Status = "completed" | "current" | "waiting" | "locked";

export type Certificate = {
  id: string;
  url: string;
  name: string;
  issuedAt: string;
  stats: {
    days: number;
    firstTryPct: number;
    minutes: number;
    tries: number;
  };
};

// ---------- IndexedDB wrapper ----------

const open = () =>
  new Promise<IDBDatabase>((res, rej) => {
    const r = indexedDB.open("sikaai", 1);

    r.onupgradeneeded = () => {
      r.result.createObjectStore("attempts", { keyPath: "id" });
      r.result.createObjectStore("kv");
    };

    r.onsuccess = () => res(r.result);
    r.onerror = () => rej(r.error);
  });

async function db<T>(
  store: string,
  mode: IDBTransactionMode,
  fn: (s: IDBObjectStore) => IDBRequest,
) {
  const d = await open();

  return new Promise<T>((res, rej) => {
    const r = fn(d.transaction(store, mode).objectStore(store));
    r.onsuccess = () => res(r.result as T);
    r.onerror = () => rej(r.error);
  });
}

const kvGet = <T,>(k: string) =>
  db<T | undefined>("kv", "readonly", (s) => s.get(k));

const kvSet = (k: string, v: unknown) =>
  db("kv", "readwrite", (s) => s.put(v, k));

const kvDelete = (k: string) =>
  db("kv", "readwrite", (s) => s.delete(k));

const allAttempts = () =>
  db<Attempt[]>("attempts", "readonly", (s) => s.getAll());

// ---------- User data ----------

export const getEmail = () => kvGet<string>("email");

export const saveEmail = (email: string) => kvSet("email", email);

export const saveToken = (token: string) => kvSet("token", token);

export const getCertificate = () =>
  kvGet<Certificate>("certificate");

// ---------- API configuration ----------

const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");

// Fired after progress changes outside the hook (sign in / restore),
// so every mounted useProgress() refreshes itself.
const PROGRESS_EVENT = "sikaai:progress-changed";

// ---------- Trusted offline clock ----------

export async function trustedNow() {
  const [seen = 0, offset = 0] = await Promise.all([
    kvGet<number>("maxSeen"),
    kvGet<number>("serverOffset"),
  ]);

  const t = Math.max(Date.now() + offset, seen);

  if (t > seen) {
    await kvSet("maxSeen", t);
  }

  return t;
}

const nextMidnight = (t: number) => {
  const d = new Date(t);
  d.setHours(24, 0, 0, 0);
  return d.getTime();
};

// ---------- Certificate request ----------

const post = async (url: string, body: unknown) => {
  const token = await kvGet<string>("token");
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const r = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ ...(body as object), tz }),
  });

  if (!r.ok) throw new Error(String(r.status));

  return r.json();
};

// ---------- FastAPI synchronization ----------

export class HttpError extends Error {
  status: number;

  constructor(status: number) {
    super(String(status));
    this.status = status;
  }
}

// fetch() rejects with a TypeError when the device is offline or the server is down
export const isOfflineError = (e: unknown) => e instanceof TypeError;

async function apiFetch(
  method: "POST" | "PUT",
  path: string,
  body: unknown,
) {
  if (!API_URL) {
    console.error(
      "NEXT_PUBLIC_API_URL is not set. Add it to .env.local (dev) or the host's environment variables (production), then restart/rebuild.",
    );

    throw new Error("API URL missing");
  }

  const token = await kvGet<string>("token");

  return fetch(`${API_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
  });
}

async function api<T>(
  method: "POST" | "PUT",
  path: string,
  body: unknown,
): Promise<T> {
  const r = await apiFetch(method, path, body);

  if (!r.ok) throw new HttpError(r.status);

  return r.json();
}

type Account = { email: string; id: string };

type ServerProgress = {
  day: number;
  completed: boolean;
  total_question: number;
  missed_question: number;
  completed_at: string | null;
};

const normEmail = (e: string) => e.trim().toLowerCase();

// The backend returns UTC datetimes without a timezone, e.g.
// "2026-10-30T13:59:20.381000". Add the Z so JS does not read them as local time.
function toUtcMs(value: string | null): number | null {
  if (!value) return null;

  const hasZone = /(Z|[+-]\d{2}:?\d{2})$/.test(value);
  const ms = new Date(hasZone ? value : `${value}Z`).getTime();

  return Number.isNaN(ms) ? null : ms;
}

// Turn the server's one-entry-per-day list back into local attempts.
// A day that already exists locally is left alone (local wins).
async function importServerProgress(items: ServerProgress[]) {
  const have = new Set((await allAttempts()).map((a) => a.day));

  for (const p of items) {
    if (!p.completed || have.has(p.day)) continue;

    const attempt: Attempt = {
      id: `server:${p.day}`, // stable id, so importing twice never duplicates
      day: p.day,
      at: toUtcMs(p.completed_at) ?? (await trustedNow()),
      misses: p.missed_question,
      ms: 0, // the server does not store time spent
      total: p.total_question,
      synced: true,
    };

    await db("attempts", "readwrite", (s) => s.put(attempt));
  }
}

// Different person on the same device: their attempts are not ours.
async function clearLocalProgress() {
  await db("attempts", "readwrite", (s) => s.clear());
  await kvDelete("certificate");
}

/**
 * Register first. Only a 201 creates a new account.
 * A 409 means the email exists, so log in and restore the saved progress.
 * Throws HttpError for server errors (422 = invalid email) and a TypeError
 * when offline (see isOfflineError).
 */
export async function connectAccount(rawEmail: string) {
  const email = normEmail(rawEmail);
  const account = await kvGet<Account>("account");

  if (account?.email === email) return account.id; // already connected

  if (account) await clearLocalProgress(); // a different email signed in

  let id: string;
  const reg = await apiFetch("POST", "/auth/register", { email });

  if (reg.status === 201) {
    id = (await reg.json()).id;
  } else if (reg.status === 409) {
    const res = await apiFetch("POST", "/auth/login", { email });

    if (!res.ok) throw new HttpError(res.status);

    const data = await res.json(); // { id, email, progress: [...] }
    id = data.id;
    await importServerProgress(data.progress ?? []);
  } else {
    throw new HttpError(reg.status);
  }

  await kvSet("account", { email, id } satisfies Account);
  await kvSet("email", email);

  window.dispatchEvent(new Event(PROGRESS_EVENT));

  return id;
}

// Convert local attempts to one progress entry per day,
// using the first attempt for certificate calculations.
function toProgress(all: Attempt[]) {
  const first = new Map<number, Attempt>();

  for (const a of [...all].sort((x, y) => x.at - y.at)) {
    if (!first.has(a.day)) {
      first.set(a.day, a);
    }
  }

  return [...first.values()].map((a) => {
    const total = a.total ?? 1;

    return {
      day: a.day,
      completed: true,
      total_question: total,
      missed_question: Math.min(a.misses, total),
      completed_at: new Date(a.at).toISOString(),
    };
  });
}

async function runSync() {
  const [email, account, before] = await Promise.all([
    kvGet<string>("email"),
    kvGet<Account>("account"),
    allAttempts(),
  ]);

  if (!email) return;

  const todo = before.filter((a) => !a.synced);
  const needsConnect = !account || account.email !== normEmail(email);

  if (!todo.length && !needsConnect) return;

  // Connect (and restore saved progress) BEFORE any PUT. The PUT replaces the
  // whole list on the server, so pushing first would erase days saved elsewhere.
  const userId = await connectAccount(email);

  if (!todo.length) return;

  // Re-read: connectAccount may have imported days from the server.
  const all = await allAttempts();

  await api("PUT", `/auth/progress/${userId}`, {
    progress: toProgress(all),
  });

  for (const a of todo) {
    await db("attempts", "readwrite", (s) =>
      s.put({ ...a, synced: true }),
    );
  }
}

let syncing: Promise<void> | null = null;

/**
 * Push local attempts to FastAPI (and restore saved progress if this
 * device has not connected yet). One run at a time.
 * Failed requests leave attempts marked as unsynced.
 */
export function syncAttempts() {
  if (!syncing) {
    syncing = runSync().finally(() => {
      syncing = null;
    });
  }

  return syncing;
}

// ---------- Progress hook ----------

export function useProgress() {
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [now, setNow] = useState(0);
  const [certificate, setCertificate] = useState<Certificate>();
  const [online, setOnline] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
    setAttempts(await allAttempts());
    setCertificate(await kvGet<Certificate>("certificate"));
    setNow(await trustedNow());
  }, []);

  useEffect(() => {
    const up = () => {
      setOnline(true);
      syncAttempts().then(refresh).catch(() => {});
    };

    const down = () => setOnline(false);
    const changed = () => void refresh();

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOnline(navigator.onLine);

    refresh();

    if (navigator.onLine) up();

    window.addEventListener("online", up);
    window.addEventListener("offline", down);
    window.addEventListener(PROGRESS_EVENT, changed);

    const tick = setInterval(refresh, 60_000);

    return () => {
      window.removeEventListener("online", up);
      window.removeEventListener("offline", down);
      window.removeEventListener(PROGRESS_EVENT, changed);
      clearInterval(tick);
    };
  }, [refresh]);

  // first = the attempt that counts for the certificate.
  // best = the attempt with the fewest misses.
  const sorted = [...attempts].sort((a, b) => a.at - b.at);

  const first = new Map<number, Attempt>();
  const best = new Map<number, Attempt>();

  for (const a of sorted) {
    if (!first.has(a.day)) {
      first.set(a.day, a);
    }

    const b = best.get(a.day);

    if (!b || a.misses < b.misses) {
      best.set(a.day, a);
    }
  }

  const completed = [...first.keys()];

  const skip =
    process.env.NEXT_PUBLIC_SKIP_DAILY_LOCK === "true";

  const unlockAt = (day: number) => {
    const p = first.get(day - 1);

    return p
      ? skip
        ? 0
        : nextMidnight(p.at)
      : Infinity;
  };

  const statusOf = (day: number): Status =>
    first.has(day)
      ? "completed"
      : day === 1
        ? "current"
        : !first.has(day - 1)
          ? "locked"
          : now >= unlockAt(day)
            ? "current"
            : "waiting";

  // Existing string-based countdown API.
  const opensIn = (day: number) => {
    const h = Math.ceil((unlockAt(day) - now) / 36e5);

    return h <= 2
      ? `in ${Math.max(1, h)}h`
      : "tomorrow";
  };

  // Structured countdown API used by the course page.
  const opensWhen = (day: number) => {
    const h = Math.ceil((unlockAt(day) - now) / 36e5);

    return h <= 2
      ? {
          kind: "hours" as const,
          hours: Math.max(1, h),
        }
      : {
          kind: "tomorrow" as const,
        };
  };

  const complete = useCallback(
    async (
      day: number,
      r: { misses: number; ms: number; total?: number },
    ) => {
      const at = await trustedNow();

      await db("attempts", "readwrite", (s) =>
        s.add({
          id: crypto.randomUUID(),
          day,
          at,
          ...r,
          synced: false,
        }),
      );

      await refresh();

      if (navigator.onLine) {
        syncAttempts().then(refresh).catch(() => {});
      }
    },
    [refresh],
  );

  const claim = async (name: string) => {
    setBusy(true);
    setError("");

    try {
      const email = await kvGet<string>("email");

      await kvSet("name", name);

      await kvSet(
        "certificate",
        await post("/api/certificate", {
          email,
          name,
          attempts,
        }),
      );

      await refresh();
    } catch {
      setError(
        "Couldn't reach the server. Check your connection and try again.",
      );
    } finally {
      setBusy(false);
    }
  };

  const days = completed.length;

  const pct = (m: Map<number, Attempt>) =>
    days
      ? Math.round(
          (100 *
            [...m.values()].filter((a) => a.misses === 0).length) /
            days,
        )
      : 0;

  const stats = {
    days,
    firstTryPct: pct(first),
    bestPct: pct(best),
    tries: attempts.length,
    minutes: Math.round(
      attempts.reduce((n, a) => n + a.ms, 0) / 60000,
    ),
  };

  return {
    ready: now > 0,
    completed,
    statusOf,
    opensIn,
    opensWhen,
    complete,
    stats,
    online,
    busy,
    error,
    certificate,
    claim,
    canCertify: days >= TOTAL_DAYS,
  };
}
