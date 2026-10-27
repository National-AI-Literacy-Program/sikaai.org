import { getDb, type DayProgressRecord, type UserInfoRecord } from "./db";

// What the UI passes in when a day's progress changes
export interface SaveProgressInput {
  user_id: string;
  day: number;
  completed: boolean;
  total_question: number;
  missed_question: number;
}

export function makeProgressId(userId: string, day: number) {
  return `${userId}:${day}`;
}

// Save (or overwrite) one day. Always starts as "not synced".
export async function saveDayProgress(input: SaveProgressInput) {
  const db = await getDb();
  const id = makeProgressId(input.user_id, input.day);

  const existing = await db.get("progress", id);

  // Set completed_at once, the first time the day becomes completed.
  // If the day was completed before, keep the original time.
  let completedAt: string | null = existing?.completed_at ?? null;
  if (input.completed && !completedAt) {
    completedAt = new Date().toISOString();
  }
  if (!input.completed) {
    completedAt = null;
  }

  const record: DayProgressRecord = {
    id,
    user_id: input.user_id,
    day: input.day,
    completed: input.completed,
    total_question: input.total_question,
    missed_question: input.missed_question,
    completed_at: completedAt,
    updated_at: Date.now(),
    is_synced: false,
  };

  await db.put("progress", record);
  return record;
}

export async function getUserProgress(userId: string) {
  const db = await getDb();
  const all = await db.getAllFromIndex("progress", "by_user", userId);
  return all.sort((a, b) => a.day - b.day);
}

export async function getDayProgress(userId: string, day: number) {
  const db = await getDb();
  return db.get("progress", makeProgressId(userId, day));
}

export async function getUnsyncedProgress(userId: string) {
  const all = await getUserProgress(userId);
  return all.filter((record) => !record.is_synced);
}

// Used later by the sync step. Only flips to synced if the record was
// not edited while the request was in flight.
export async function markSynced(id: string, syncedUpdatedAt: number) {
  const db = await getDb();
  const current = await db.get("progress", id);

  if (!current) return;
  if (current.updated_at !== syncedUpdatedAt) return;

  await db.put("progress", { ...current, is_synced: true });
}

// Cache of the login response so the app can start offline
export async function saveUserInfo(info: UserInfoRecord) {
  const db = await getDb();
  await db.put("userinfo", info);
}

export async function getUserInfo(userId: string) {
  const db = await getDb();
  return db.get("userinfo", userId);
}
