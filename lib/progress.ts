"use client";

import { useCallback, useEffect, useState } from "react";

export const TOTAL_DAYS = 28;
export type Attempt = { id: string; day: number; at: number; misses: number; ms: number; synced: boolean };
export type Status = "completed" | "current" | "waiting" | "locked";
export type Certificate = {
  id: string;
  url: string;
  name: string;
  issuedAt: string; // ISO date
  stats: { days: number; firstTryPct: number; minutes: number; tries: number };
};
export const getEmail = () => kvGet<string>("email");
/* ---------- tiny IndexedDB wrapper (no dependencies) ---------- */
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

async function db<T>(store: string, mode: IDBTransactionMode, fn: (s: IDBObjectStore) => IDBRequest) {
  const d = await open();
  return new Promise<T>((res, rej) => {
    const r = fn(d.transaction(store, mode).objectStore(store));
    r.onsuccess = () => res(r.result as T);
    r.onerror = () => rej(r.error);
  });
}
const kvGet = <T,>(k: string) => db<T | undefined>("kv", "readonly", (s) => s.get(k));
const kvSet = (k: string, v: unknown) => db("kv", "readwrite", (s) => s.put(v, k));
const allAttempts = () => db<Attempt[]>("attempts", "readonly", (s) => s.getAll());

/** Call these from the email gate once the user is registered (token is optional but recommended). */
export const saveEmail = (email: string) => kvSet("email", email);
export const saveToken = (token: string) => kvSet("token", token);
export const getCertificate = () => kvGet<Certificate>("certificate");

/* ---------- offline clock ----------
   The device clock can be changed, so time never moves backwards:
   we remember the latest time ever seen and the last server offset. */
export async function trustedNow() {
  const [seen = 0, offset = 0] = await Promise.all([kvGet<number>("maxSeen"), kvGet<number>("serverOffset")]);
  const t = Math.max(Date.now() + offset, seen);
  if (t > seen) await kvSet("maxSeen", t);
  return t;
}
const nextMidnight = (t: number) => {
  const d = new Date(t);
  d.setHours(24, 0, 0, 0);
  return d.getTime();
};

/* ---------- sync ---------- */
const post = async (url: string, body: unknown) => {
  const token = await kvGet<string>("token");
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const r = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    body: JSON.stringify({ ...(body as object), tz }),
  });
  if (!r.ok) throw new Error(String(r.status));
  return r.json();
};

/** Pushes unsynced attempts. Server must be idempotent on attempt.id and return { serverTime }. */
export async function syncAttempts() {
  const [email, all] = await Promise.all([kvGet<string>("email"), allAttempts()]);
  const todo = all.filter((a) => !a.synced);
  if (!email || !todo.length) return;
  const { serverTime } = await post("/api/sync", { email, attempts: todo });
  await kvSet("serverOffset", serverTime - Date.now());
  for (const a of todo) await db("attempts", "readwrite", (s) => s.put({ ...a, synced: true }));
}

/* ---------- hook ---------- */
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
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOnline(navigator.onLine);
    refresh();
    if (navigator.onLine) up();
    window.addEventListener("online", up);
    window.addEventListener("offline", down);
    const tick = setInterval(refresh, 60_000);
    return () => {
      window.removeEventListener("online", up);
      window.removeEventListener("offline", down);
      clearInterval(tick);
    };
  }, [refresh]);

  // first = the attempt that counts for the certificate (never overwritten)
  // best  = fewest misses across redos (what the learner sees as their score)
  const sorted = [...attempts].sort((a, b) => a.at - b.at);
  const first = new Map<number, Attempt>();
  const best = new Map<number, Attempt>();
  for (const a of sorted) {
    if (!first.has(a.day)) first.set(a.day, a);
    const b = best.get(a.day);
    if (!b || a.misses < b.misses) best.set(a.day, a);
  }
  const completed = [...first.keys()];
  const skip = process.env.NEXT_PUBLIC_SKIP_DAILY_LOCK === "true"; // for testing

  const unlockAt = (day: number) => {
    const p = first.get(day - 1);
    return p ? (skip ? 0 : nextMidnight(p.at)) : Infinity;
  };
  const statusOf = (day: number): Status =>
    first.has(day) ? "completed"
    : day === 1 ? "current"
    : !first.has(day - 1) ? "locked"
    : now >= unlockAt(day) ? "current"
    : "waiting";
  const opensWhen = (day: number): { kind: "tomorrow" } | { kind: "hours"; hours: number } => {
    const h = Math.ceil((unlockAt(day) - now) / 36e5);
    return h <= 2 ? { kind: "hours", hours: Math.max(1, h) } : { kind: "tomorrow" };
  };
  // Kept so existing callers keep working. Prefer opensWhen for anything shown to people.
  const opensIn = (day: number) => {
    const w = opensWhen(day);
    return w.kind === "hours" ? `in ${w.hours}h` : "tomorrow";
  };
  const complete = useCallback(
    async (day: number, r: { misses: number; ms: number }) => {
      const at = await trustedNow();
      await db("attempts", "readwrite", (s) => s.add({ id: crypto.randomUUID(), day, at, ...r, synced: false }));
      await refresh();
      if (navigator.onLine) syncAttempts().then(refresh).catch(() => {});
    },
    [refresh],
  );

  const claim = async (name: string) => {
    setBusy(true);
    setError("");
    try {
      const email = await kvGet<string>("email");
      await kvSet("name", name);
      await kvSet("certificate", await post("/api/certificate", { email, name, attempts }));
      await refresh();
    } catch {
      setError("network");
    } finally {
      setBusy(false);
    }
  };

  const days = completed.length;
  const pct = (m: Map<number, Attempt>) => (days ? Math.round((100 * [...m.values()].filter((a) => a.misses === 0).length) / days) : 0);
  const stats = {
    days,
    firstTryPct: pct(first),
    bestPct: pct(best),
    tries: attempts.length,
    minutes: Math.round(attempts.reduce((n, a) => n + a.ms, 0) / 60000),
  };

  return {
    ready: now > 0, completed, statusOf, opensIn, opensWhen, complete, stats,
    online, busy, error, certificate, claim,
    canCertify: days >= TOTAL_DAYS,
  };
}