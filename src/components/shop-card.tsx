import Link from "next/link";

import { FavoriteButton } from "@/components/favorite-button";
import type { CoffeeShop, Coordinates } from "@/lib/types";
import { calculateDistanceKm, formatDistanceKm, formatPriceLabel } from "@/lib/utils";

export function ShopCard({ shop, userLocation }: { shop: CoffeeShop; userLocation?: Coordinates | null }) {
  const distance = userLocation && shop.coordinates ? calculateDistanceKm(userLocation, shop.coordinates) : null;
  return (
    <article className="surface-card overflow-hidden rounded-[30px] transition hover:-translate-y-[2px]">
      <div
        className="image-sheen relative h-64 bg-slate-200 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(15,23,42,0.08), rgba(15,23,42,0.56)), url(${shop.imageUrl})`,
        }}
      >
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <span className="editorial-badge bg-white/88 text-slate-900">
            {shop.city}
          </span>
          <span className="editorial-badge bg-slate-950/82 text-white">
            {shop.priceRange}
          </span>
          {shop.source === "community" ? (
            <span className="editorial-badge border-teal-400/20 bg-teal-500/82 text-white">
Pilihan komunitas
            </span>
          ) : null}
          {distance !== null ? (
            <span className="editorial-badge bg-white/88 text-slate-900">
{formatDistanceKm(distance)} dari kamu
            </span>
          ) : null}
        </div>

        <div className="absolute right-4 top-4">
          <FavoriteButton slug={shop.slug} />
        </div>

        <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-6">
          <p className="editorial-kicker text-white/78">
            {shop.neighborhood}
          </p>
          <h3 className="font-display editorial-title text-3xl">{shop.name}</h3>
        </div>
      </div>

      <div className="space-y-4 p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <p className="text-sm leading-6 text-slate-600">{shop.description}</p>
          <div className="surface-muted rounded-[22px] px-3 py-2.5 text-right text-sm text-amber-900">
            <div className="font-semibold">{shop.rating.toFixed(1)}</div>
            <div>{shop.reviewCount} ulasan</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {shop.vibes.slice(0, 3).map((vibe) => (
            <span
              key={vibe}
              className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700"
            >
              {vibe}
            </span>
          ))}
          <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700">
            {formatPriceLabel(shop.priceRange)}
          </span>
          {distance !== null && distance < 5 ? (
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
Dekat darimu
            </span>
          ) : null}
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-slate-100/80 pt-4">
          <span className="text-xs text-slate-500">
            {shop.amenities.slice(0, 3).join(" • ")}
          </span>
          <Link
            href={`/cafes/${shop.slug}`}
            className="btn btn-primary !min-h-0 px-4 py-2.5"
          >
Lihat detail
          </Link>
        </div>
      </div>
    </article>
  );
}
