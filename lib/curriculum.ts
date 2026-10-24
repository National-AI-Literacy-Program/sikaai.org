import en from "@/data/curriculum.json";
import ne from "@/data/curriculum.ne.json";

export type Competence = {
  domain: string;
  number: number;
  level: string;
  page: number;
};

export type Day = {
  day: number;
  title: string;
  summary: string;
  kind: string; // lesson | project | capstone | extension
  review: boolean;
  competence: Competence | null;
  basis?: string;
  knowledge: string[];
  skills: string[];
  attitudes: string[];
};

export type Week = { week: number; domain: string; tagline: string; days: Day[] };

export type Curriculum = {
  meta: {
    title: string;
    frameworkName: string;
    frameworkFullName: string;
    frameworkPublisher: string;
    frameworkPdf: string;
  };
  framework: {
    knowledge: { id: string; label: string; page: number }[];
    skills: { id: string; name: string; description: string; page: number }[];
    attitudes: { id: string; name: string; description: string; page: number }[];
  };
  weeks: Week[];
};

type NeItem = { name?: string; description?: string };
type NeData = {
  framework?: {
    knowledge?: Record<string, string>;
    skills?: Record<string, NeItem>;
    attitudes?: Record<string, NeItem>;
  };
  days?: Record<string, { title?: string; summary?: string; basis?: string }>;
};

const base = en as unknown as Curriculum;
const overlay = ne as NeData;

export const meta = base.meta;
export const pdfAt = (page: number) => `${meta.frameworkPdf}#page=${page}`;

// English domain names in the data -> keys under CourseStructure.weeks
const DOMAIN_KEYS: Record<string, string> = {
  "Engage with AI": "engage",
  "Create with AI": "create",
  "Manage AI": "manage",
  "Shape AI": "shape",
};
export const domainKey = (domain: string) => DOMAIN_KEYS[domain];

// English level names in the data -> keys under Curriculum.levels
const LEVEL_KEYS: Record<string, string> = {
  Basic: "basic",
  "Basic to Intermediate": "basicToIntermediate",
};
export const levelKey = (level: string) => LEVEL_KEYS[level];

/** English data, with Nepali text laid over it. Anything missing in ne falls back to English. */
export function getCurriculum(locale: string): Curriculum {
  if (locale !== "ne") return base;
  const fw = overlay.framework;

  return {
    ...base,
    framework: {
      knowledge: base.framework.knowledge.map((k) => ({
        ...k,
        label: fw?.knowledge?.[k.id] ?? k.label,
      })),
      skills: base.framework.skills.map((s) => ({
        ...s,
        name: fw?.skills?.[s.id]?.name ?? s.name,
        description: fw?.skills?.[s.id]?.description ?? s.description,
      })),
      attitudes: base.framework.attitudes.map((a) => ({
        ...a,
        name: fw?.attitudes?.[a.id]?.name ?? a.name,
        description: fw?.attitudes?.[a.id]?.description ?? a.description,
      })),
    },
    weeks: base.weeks.map((w) => ({
      ...w,
      days: w.days.map((d) => {
        const o = overlay.days?.[String(d.day)];
        return {
          ...d, // structure, ids and numbers always stay English-file values
          title: o?.title ?? d.title,
          summary: o?.summary ?? d.summary,
          basis: o?.basis ?? d.basis,
        };
      }),
    })),
  };
}

function byId<T extends { id: string }>(items: T[]) {
  return Object.fromEntries(items.map((i) => [i.id, i])) as Record<string, T>;
}

export function indexFramework(f: Curriculum["framework"]) {
  return {
    knowledge: byId(f.knowledge),
    skills: byId(f.skills),
    attitudes: byId(f.attitudes),
  };
}

export type Framework = ReturnType<typeof indexFramework>;