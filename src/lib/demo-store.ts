import { coffeeShops, seededSubmissions } from "./data";
import type { CoffeeShop, CoffeeSubmission, ShopFilters, SubmissionStatus } from "./types";

const FAVORITES_KEY = "kopilih:favorites";
const SUBMISSIONS_KEY = "kopilih:submissions";

type SubmissionInput = Omit<CoffeeSubmission, "id" | "submittedAt" | "status">;

export const defaultFilters: ShopFilters = {
  query: "",
  city: "all",
  vibe: "all",
  wifiOnly: false,
  price: "all",
  sort: "featured",
};

function isBrowser() {
  return typeof window !== "undefined";
}

function safeRead<T>(key: string, fallback: T): T {
  if (!isBrowser()) return fallback;

  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function safeWrite<T>(key: string, value: T) {
  if (!isBrowser()) return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getFavorites() {
  return safeRead<string[]>(FAVORITES_KEY, []);
}

export function toggleFavorite(slug: string) {
  const current = new Set(getFavorites());
  if (current.has(slug)) current.delete(slug);
  else current.add(slug);
  const next = Array.from(current);
  safeWrite(FAVORITES_KEY, next);
  return next;
}

export function getSubmissions() {
  return safeRead<CoffeeSubmission[]>(SUBMISSIONS_KEY, seededSubmissions);
}

export function saveSubmissions(submissions: CoffeeSubmission[]) {
  safeWrite(SUBMISSIONS_KEY, submissions);
}

function nextUniqueSlug(seed: string, submissions: CoffeeSubmission[]) {
  const base = slugify(seed) || "coffee-spot";
  const existing = new Set([
    ...coffeeShops.map((shop) => shop.slug),
    ...submissions.map((submission) => submission.slug),
  ]);

  if (!existing.has(base)) return base;

  let index = 2;
  while (existing.has(`${base}-${index}`)) index += 1;
  return `${base}-${index}`;
}

export function createSubmission(payload: SubmissionInput) {
  const existing = getSubmissions();
  const submission: CoffeeSubmission = {
    ...payload,
    id: `submission-${Date.now()}`,
    slug: payload.slug || nextUniqueSlug(`${payload.name}-${payload.city}`, existing),
    submittedAt: new Date().toISOString(),
    status: "pending",
  };

  const next = [submission, ...existing];
  saveSubmissions(next);
  return submission;
}

export function updateSubmissionStatus(id: string, status: SubmissionStatus, adminNote?: string) {
  const next = getSubmissions().map((submission) =>
    submission.id === id ? { ...submission, status, adminNote } : submission,
  );

  saveSubmissions(next);
  return next.find((submission) => submission.id === id) ?? null;
}

export function submissionToCoffeeShop(submission: CoffeeSubmission): CoffeeShop {
  return {
    id: `approved-${submission.id}`,
    slug: submission.slug,
    name: submission.name,
    city: submission.city,
    neighborhood: submission.neighborhood || submission.city,
    address: submission.address,
    description: submission.description,
    longDescription: `${submission.description} Listing ini muncul dari workflow submit user dan approval admin versi demo. Untuk production, data seperti validasi lokasi, foto, jam buka, dan audit trail approval sebaiknya dipindah ke database.`,
    priceRange: submission.priceRange,
    rating: 4.3,
    reviewCount: 37,
    vibes: submission.vibes,
    amenities: submission.amenities as CoffeeShop["amenities"],
    imageUrl:
      submission.imageUrl ||
      "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1200&q=80",
    mapsUrl: submission.mapsUrl || `https://maps.google.com/?q=${encodeURIComponent(submission.name)}`,
    instagramUrl: submission.instagramUrl || "https://instagram.com",
    hours: [
      { day: "Senin - Jumat", open: "08.00 - 21.00" },
      { day: "Sabtu - Minggu", open: "08.00 - 22.00" },
    ],
    wifiFriendly: submission.amenities.includes("WiFi cepat"),
    featured: false,
    source: "community",
  };
}

export function getApprovedShops() {
  const approvedFromSubmissions = getSubmissions()
    .filter((submission) => submission.status === "approved")
    .map(submissionToCoffeeShop);

  return [...coffeeShops, ...approvedFromSubmissions];
}

export function getApprovedCoffeeShops() {
  return getApprovedShops();
}

export function findApprovedShopBySlug(slug: string) {
  return getApprovedShops().find((shop) => shop.slug === slug);
}

export function filterShops(shops: CoffeeShop[], filters: ShopFilters) {
  const query = filters.query.trim().toLowerCase();

  const filtered = shops.filter((shop) => {
    const haystack = [shop.name, shop.city, shop.neighborhood, shop.description, ...shop.vibes]
      .join(" ")
      .toLowerCase();

    const matchesQuery = !query || haystack.includes(query);
    const matchesCity = filters.city === "all" || shop.city === filters.city;
    const matchesVibe = filters.vibe === "all" || shop.vibes.includes(filters.vibe);
    const matchesWifi = !filters.wifiOnly || shop.wifiFriendly;
    const matchesPrice = filters.price === "all" || shop.priceRange === filters.price;

    return matchesQuery && matchesCity && matchesVibe && matchesWifi && matchesPrice;
  });

  return filtered.sort((left, right) => {
    switch (filters.sort) {
      case "rating":
        return right.rating - left.rating;
      case "price-low":
        return left.priceRange.length - right.priceRange.length;
      case "name":
        return left.name.localeCompare(right.name, "id");
      case "featured":
      default:
        return Number(Boolean(right.featured)) - Number(Boolean(left.featured)) || right.rating - left.rating;
    }
  });
}
