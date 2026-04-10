"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { cityOptions, vibeOptions } from "@/lib/data";
import { defaultFilters, filterShops, getApprovedShops, getFavorites, toggleFavorite } from "@/lib/demo-store";
import type { CoffeeShop, ShopFilters } from "@/lib/types";

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl border border-white/60 bg-white/80 p-5 shadow-sm backdrop-blur">
      <p className="text-sm text-stone-500">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-stone-900">{value}</p>
    </div>
  );
}

function FavoriteButton({ id, favorites, onToggle }: { id: string; favorites: string[]; onToggle: (id: string) => void }) {
  const active = favorites.includes(id);

  return (
    <button
      type="button"
      onClick={() => onToggle(id)}
      className={`rounded-full px-3 py-1 text-sm font-medium transition ${
        active ? "bg-amber-500 text-stone-950" : "bg-stone-900 text-white hover:bg-stone-700"
      }`}
    >
      {active ? "★ Favorit" : "☆ Simpan"}
    </button>
  );
}

function ShopCard({ shop, favorites, onToggleFavorite }: { shop: CoffeeShop; favorites: string[]; onToggleFavorite: (id: string) => void }) {
  return (
    <article className="overflow-hidden rounded-[28px] border border-stone-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-56">
        <Image src={shop.imageUrl} alt={shop.name} fill className="object-cover" />
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
          <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-stone-700">
            {shop.city}
          </span>
          <FavoriteButton id={shop.id} favorites={favorites} onToggle={onToggleFavorite} />
        </div>
      </div>

      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold text-stone-900">{shop.name}</h3>
            <p className="text-sm text-stone-500">{shop.neighborhood} • {shop.priceRange}</p>
          </div>
          <div className="rounded-2xl bg-emerald-50 px-3 py-2 text-right text-sm text-emerald-900">
            <div className="font-semibold">⭐ {shop.rating.toFixed(1)}</div>
            <div>{shop.reviewCount} reviews</div>
          </div>
        </div>

        <p className="text-sm leading-6 text-stone-600">{shop.description}</p>

        <div className="flex flex-wrap gap-2">
          {shop.vibes.map((vibe) => (
            <span key={vibe} className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-700">
              {vibe}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between gap-3">
          <p className="text-sm text-stone-500">{shop.amenities.slice(0, 3).join(" • ")}</p>
          <Link href={`/cafes/${shop.slug}`} className="rounded-full bg-stone-900 px-4 py-2 text-sm font-semibold text-white hover:bg-stone-700">
            Lihat detail
          </Link>
        </div>
      </div>
    </article>
  );
}

export function HomePageClient() {
  const [shops, setShops] = useState<CoffeeShop[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [filters, setFilters] = useState<ShopFilters>(defaultFilters);

  useEffect(() => {
    setShops(getApprovedShops());
    setFavorites(getFavorites());
  }, []);

  const filteredShops = useMemo(() => filterShops(shops, filters), [shops, filters]);
  const featuredShops = filteredShops.filter((shop) => shop.featured).slice(0, 2);

  function updateFilter<Key extends keyof ShopFilters>(key: Key, value: ShopFilters[Key]) {
    setFilters((current) => ({ ...current, [key]: value }));
  }

  function handleToggleFavorite(id: string) {
    setFavorites(toggleFavorite(id));
  }

  return (
    <div className="bg-[radial-gradient(circle_at_top,_rgba(253,224,71,0.24),_transparent_28%),linear-gradient(180deg,_#fffdf8_0%,_#f5f1ea_100%)]">
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-14 px-6 py-8 md:px-10 lg:px-12">
        <section className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="rounded-[32px] bg-stone-950 px-8 py-10 text-white shadow-xl shadow-stone-950/10 md:px-10">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-amber-300">Kopilih Enhanced</p>
            <h1 className="mt-4 max-w-2xl text-4xl font-semibold leading-tight md:text-6xl">
              Temukan kafe yang pas buat kerja, brunch, atau nongkrong santai.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-stone-300 md:text-lg">
              Demo discovery app local-first untuk eksplorasi kafe approved, simpan favorit, kirim rekomendasi baru, lalu uji approval flow admin tanpa backend server state.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="#discover" className="rounded-full bg-amber-400 px-5 py-3 text-sm font-semibold text-stone-950 hover:bg-amber-300">
                Explore cafes
              </Link>
              <Link href="/submit" className="rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10">
                Submit cafe baru
              </Link>
              <Link href="/admin/submissions" className="rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10">
                Admin approval
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            <StatCard label="Kafe approved" value={`${shops.length}`} />
            <StatCard label="Favorit tersimpan" value={`${favorites.length}`} />
            <StatCard label="Kota populer" value={`${cityOptions.length}`} />
          </div>
        </section>

        <section className="grid gap-5 rounded-[32px] border border-stone-200 bg-white/90 p-6 shadow-sm md:grid-cols-2 xl:grid-cols-6" id="discover">
          <div className="xl:col-span-2">
            <label className="text-sm font-medium text-stone-700">Cari nama, kota, atau vibe</label>
            <input
              value={filters.query}
              onChange={(event) => updateFilter("query", event.target.value)}
              placeholder="Contoh: Bandung, brunch, work-friendly"
              className="mt-2 w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-900 outline-none ring-0 transition focus:border-amber-400"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-stone-700">Kota</label>
            <select value={filters.city} onChange={(event) => updateFilter("city", event.target.value)} className="mt-2 w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-900">
              <option value="all">Semua kota</option>
              {cityOptions.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-stone-700">Vibe</label>
            <select value={filters.vibe} onChange={(event) => updateFilter("vibe", event.target.value)} className="mt-2 w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-900">
              <option value="all">Semua vibe</option>
              {vibeOptions.map((vibe) => (
                <option key={vibe} value={vibe}>{vibe}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-stone-700">Budget</label>
            <select value={filters.price} onChange={(event) => updateFilter("price", event.target.value)} className="mt-2 w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-900">
              <option value="all">Semua harga</option>
              <option value="$">$</option>
              <option value="$$">$$</option>
              <option value="$$$">$$$</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-stone-700">Sort</label>
            <select value={filters.sort} onChange={(event) => updateFilter("sort", event.target.value as ShopFilters["sort"])} className="mt-2 w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-900">
              <option value="featured">Featured</option>
              <option value="rating">Rating tertinggi</option>
              <option value="price-low">Harga terjangkau</option>
              <option value="name">Nama A-Z</option>
            </select>
          </div>

          <label className="flex items-center gap-3 rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm font-medium text-stone-700 xl:mt-7">
            <input type="checkbox" checked={filters.wifiOnly} onChange={(event) => updateFilter("wifiOnly", event.target.checked)} className="size-4 rounded border-stone-300" />
            WiFi friendly only
          </label>
        </section>

        {featuredShops.length > 0 && (
          <section className="space-y-5">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-stone-500">Pilihan editor</p>
                <h2 className="text-3xl font-semibold text-stone-900">Highlight minggu ini</h2>
              </div>
            </div>
            <div className="grid gap-6 xl:grid-cols-2">
              {featuredShops.map((shop) => (
                <ShopCard key={shop.id} shop={shop} favorites={favorites} onToggleFavorite={handleToggleFavorite} />
              ))}
            </div>
          </section>
        )}

        <section className="space-y-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-semibold text-stone-900">Semua cafe approved</h2>
              <p className="mt-1 text-sm text-stone-500">Hanya data seed dan submission yang sudah di-approve admin yang muncul di sini.</p>
            </div>
            <p className="rounded-full bg-white px-4 py-2 text-sm font-medium text-stone-700 shadow-sm">
              {filteredShops.length} hasil
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {filteredShops.map((shop) => (
              <ShopCard key={shop.id} shop={shop} favorites={favorites} onToggleFavorite={handleToggleFavorite} />
            ))}
          </div>

          {filteredShops.length === 0 && (
            <div className="rounded-[28px] border border-dashed border-stone-300 bg-white p-10 text-center text-stone-500">
              Belum ada hasil yang cocok. Coba ubah filter atau submit cafe baru.
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
