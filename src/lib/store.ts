import { seededSubmissions } from "./data";
import type { CoffeeSubmission, SubmissionStatus } from "./types";

type SubmissionInput = Omit<CoffeeSubmission, "id" | "submittedAt" | "status">;

const globalStore = globalThis as typeof globalThis & {
  __kopilihServerSubmissions?: CoffeeSubmission[];
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function ensureStore() {
  if (!globalStore.__kopilihServerSubmissions) {
    globalStore.__kopilihServerSubmissions = structuredClone(seededSubmissions);
  }

  return globalStore.__kopilihServerSubmissions;
}

export function getSubmissions() {
  return ensureStore();
}

export function createSubmission(input: SubmissionInput) {
  const store = ensureStore();
  const submission: CoffeeSubmission = {
    ...input,
    id: `submission-${Date.now()}`,
    slug: input.slug || slugify(`${input.name}-${input.city}`),
    submittedAt: new Date().toISOString(),
    status: "pending",
  };

  store.unshift(submission);
  return submission;
}

export function updateSubmissionStatus(id: string, status: SubmissionStatus, adminNote?: string) {
  const store = ensureStore();
  const index = store.findIndex((item) => item.id === id);

  if (index === -1) return null;

  store[index] = {
    ...store[index],
    status,
    adminNote,
  };

  return store[index];
}
