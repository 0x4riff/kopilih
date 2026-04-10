"use client";

import { useDemoStore } from "@/components/demo-store-provider";

export function StoreStatus() {
  const { counts, favorites } = useDemoStore();

  return (
    <div className="hidden items-center gap-2 lg:flex">
      <span className="rounded-full border border-white/60 bg-white/80 px-3 py-1 text-xs font-semibold text-slate-600">
        Saved {favorites.length}
      </span>
      <span className="rounded-full border border-white/60 bg-white/80 px-3 py-1 text-xs font-semibold text-slate-600">
        Pending {counts.pending}
      </span>
    </div>
  );
}
