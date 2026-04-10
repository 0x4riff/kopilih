"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { findApprovedShopBySlug, getFavorites, toggleFavorite } from "@/lib/demo-store";
import type { CoffeeShop } from "@/lib/types";

export function CafeDetailClient({ slug }: { slug: string }) {
  const [shop, setShop] = useState<CoffeeShop | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setShop(findApprovedShopBySlug(slug) ?? null);
    setFavorites(getFavorites());
    setReady(true);
  }, [slug]);

  if (!ready) {
    return <div className="mx-auto max-w-5xl px-6 py-20 text-stone-500">Loading cafe...</div>;
  }

  if (!shop) {
    return (
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 text-center">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-stone-500">Cafe not found</p>
        <h1 className="mt-4 text-4xl font-semibold text-stone-900">Cafe ini belum approved atau slug tidak tersedia.</h1>
        <p className="mt-3 text-stone-600">Cek halaman admin untuk approve submission, lalu buka lagi detail cafenya.</p>
        <Link href="/" className="mt-6 rounded-full bg-stone-900 px-5 py-3 text-sm font-semibold text-white hover:bg-stone-700">
          Kembali ke homepage
        </Link>
      </div>
    );
  }

  const isFavorite = favorites.includes(shop.id);

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-8 md:px-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link href="/" className="text-sm font-medium text-stone-600 hover:text-stone-900">← Kembali ke discovery</Link>
        <button
          type="button"
          onClick={() => setFavorites(toggleFavorite(shop.id))}
          className={`rounded-full px-4 py-2 text-sm font-semibold ${isFavorite ? "bg-amber-400 text-stone-950" : "bg-stone-900 text-white"}`}
        >
          {isFavorite ? "Tersimpan di favorit" : "Simpan ke favorit"}
        </button>
      </div>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="relative min-h-[380px] overflow-hidden rounded-[32px] bg-stone-200 shadow-lg">
          <Image src={shop.imageUrl} alt={shop.name} fill className="object-cover" />
        </div>

        <div className="rounded-[32px] bg-stone-950 p-8 text-white shadow-lg">
          <p className="text-sm uppercase tracking-[0.3em] text-amber-300">{shop.city}</p>
          <h1 className="mt-3 text-4xl font-semibold">{shop.name}</h1>
          <p className="mt-3 text-stone-300">{shop.neighborhood} • {shop.address}</p>
          <p className="mt-6 text-lg leading-8 text-stone-200">{shop.longDescription}</p>

          <div className="mt-8 grid grid-cols-2 gap-4 text-sm">
            <div className="rounded-2xl bg-white/10 p-4">
              <p className="text-stone-300">Rating</p>
              <p className="mt-1 text-2xl font-semibold">⭐ {shop.rating.toFixed(1)}</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-4">
              <p className="text-stone-300">Harga</p>
              <p className="mt-1 text-2xl font-semibold">{shop.priceRange}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <aside className="space-y-6 rounded-[32px] border border-stone-200 bg-white p-6 shadow-sm">
          <div>
            <h2 className="text-lg font-semibold text-stone-900">Amenities</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {shop.amenities.map((amenity) => (
                <span key={amenity} className="rounded-full bg-stone-100 px-3 py-1 text-sm text-stone-700">{amenity}</span>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-stone-900">Vibes</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {shop.vibes.map((vibe) => (
                <span key={vibe} className="rounded-full bg-amber-100 px-3 py-1 text-sm text-amber-900">{vibe}</span>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-stone-900">Jam buka</h2>
            <div className="mt-3 space-y-2 text-sm text-stone-600">
              {shop.hours.map((entry) => (
                <div key={entry.day} className="flex justify-between gap-4">
                  <span>{entry.day}</span>
                  <span className="font-medium text-stone-900">{entry.open}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>

        <section className="space-y-6 rounded-[32px] border border-stone-200 bg-white p-6 shadow-sm">
          <div>
            <h2 className="text-lg font-semibold text-stone-900">Kenapa worth it?</h2>
            <p className="mt-3 leading-7 text-stone-600">{shop.description} Area ini pas untuk kamu yang cari tempat dengan akses nyaman, estetika rapi, dan pengalaman ngopi yang konsisten.</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <a href={shop.mapsUrl} target="_blank" rel="noreferrer" className="rounded-[28px] bg-stone-100 p-5 hover:bg-stone-200">
              <p className="text-sm font-medium text-stone-500">Lokasi</p>
              <p className="mt-2 text-lg font-semibold text-stone-900">Buka di Google Maps</p>
            </a>
            <a href={shop.instagramUrl} target="_blank" rel="noreferrer" className="rounded-[28px] bg-stone-100 p-5 hover:bg-stone-200">
              <p className="text-sm font-medium text-stone-500">Social</p>
              <p className="mt-2 text-lg font-semibold text-stone-900">Lihat Instagram cafe</p>
            </a>
          </div>

          <div className="rounded-[28px] border border-dashed border-stone-300 p-5 text-sm leading-7 text-stone-500">
            Demo ini local-first. Jika cafe berasal dari submission user, status approval dan detailnya tersimpan di browser kamu sendiri melalui localStorage.
          </div>
        </section>
      </section>
    </main>
  );
}
