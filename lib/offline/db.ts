import { openDB, type DBSchema, type IDBPDatabase } from "idb";

// Mirrors DayProgressSchema on the FastAPI side
export interface DayProgressRecord {
  id: string; // "<user_id>:<day>", unique per user per day
  user_id: string;

  day: number; // >= 1
  completed: boolean;
  total_question: number;
  missed_question: number;
  completed_at: string | null; // ISO string, e.g. "2026-10-24T09:30:00.000Z"

  // local-only fields (never sent to the backend)
  updated_at: number; // Date.now() of the last local change
  is_synced: boolean; // true only after the backend accepted it
}

export interface UserInfoRecord {
  user_id: string;
  email: string;
}

interface SikaiDB extends DBSchema {
  userinfo: {
    key: string;
    value: UserInfoRecord;
  };
  progress: {
    key: string;
    value: DayProgressRecord;
    indexes: { by_user: string };
  };
}

const DB_NAME = "sikai-offline";
const DB_VERSION = 1;

let dbPromise: Promise<IDBPDatabase<SikaiDB>> | null = null;

export function getDb() {
  if (typeof window === "undefined") {
    throw new Error("IndexedDB is only available in the browser");
  }

  if (!dbPromise) {
    dbPromise = openDB<SikaiDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        db.createObjectStore("userinfo", { keyPath: "user_id" });

        const progress = db.createObjectStore("progress", { keyPath: "id" });
        progress.createIndex("by_user", "user_id");
      },
    });
  }

  return dbPromise;
}
