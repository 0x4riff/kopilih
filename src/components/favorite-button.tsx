"use client";

import { useDemoStore } from "@/components/demo-store-provider";

export function FavoriteButton({ slug }: { slug: string }) {
  const { isFavorite, toggleFavorite } = useDemoStore();
  const active = isFavorite(slug);

  return (
    <button
      type="button"
      onClick={() => toggleFavorite(slug)}
      className={`inline-flex items-center rounded-full border px-3 py-2 text-sm font-semibold transition ${
        active
          ? "border-amber-500 bg-amber-500 text-white"
          : "border-white/70 bg-white/90 text-slate-900 hover:bg-white"
      }`}
      aria-pressed={active}
      aria-label={active ? "Remove from favorites" : "Save to favorites"}
    >
      {active ? "Saved" : "Save"}
    </button>
  );
}
