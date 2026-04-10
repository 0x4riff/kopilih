import type { CoffeeShop, PriceRange, ShopFilters, SubmissionStatus } from "./types";

export function formatRelativeDate(iso: string) {
  const date = new Date(iso);
  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export function formatPriceLabel(priceRange: PriceRange) {
  switch (priceRange) {
    case "$":
      return "Budget friendly";
    case "$$":
      return "Mid range";
    case "$$$":
      return "Treat spot";
    default:
      return priceRange;
  }
}

export function formatStatusLabel(status: SubmissionStatus) {
  switch (status) {
    case "approved":
      return "Approved";
    case "rejected":
      return "Rejected";
    case "pending":
    default:
      return "Pending review";
  }
}

export function statusTone(status: SubmissionStatus) {
  switch (status) {
    case "approved":
      return "bg-emerald-100 text-emerald-800";
    case "rejected":
      return "bg-rose-100 text-rose-700";
    case "pending":
    default:
      return "bg-amber-100 text-amber-800";
  }
}

export function filterAndSortShops(shops: CoffeeShop[], filters: ShopFilters) {
  const query = filters.query.trim().toLowerCase();

  const filtered = shops.filter((shop) => {
    const haystack = [shop.name, shop.city, shop.neighborhood, shop.description, ...shop.vibes]
      .join(" ")
      .toLowerCase();

    const matchesQuery = !query || haystack.includes(query);
    const matchesCity = !filters.city || shop.city === filters.city;
    const matchesVibe = !filters.vibe || shop.vibes.includes(filters.vibe);
    const matchesWifi = !filters.wifiOnly || shop.wifiFriendly;
    const matchesPrice = !filters.price || shop.priceRange === filters.price;

    return matchesQuery && matchesCity && matchesVibe && matchesWifi && matchesPrice;
  });

  return filtered.sort((a, b) => {
    switch (filters.sort) {
      case "rating":
        return b.rating - a.rating;
      case "price-low":
        return a.priceRange.length - b.priceRange.length;
      case "name":
        return a.name.localeCompare(b.name, "id");
      case "featured":
      default:
        return Number(Boolean(b.featured)) - Number(Boolean(a.featured)) || b.rating - a.rating;
    }
  });
}

export function getShopStats(shops: CoffeeShop[]) {
  const total = shops.length;
  const cities = new Set(shops.map((shop) => shop.city)).size;
  const wifiFriendly = shops.filter((shop) => shop.wifiFriendly).length;
  const averageRating = total ? (shops.reduce((sum, shop) => sum + shop.rating, 0) / total).toFixed(1) : "0.0";

  return {
    total,
    cities,
    wifiFriendly,
    averageRating,
  };
}
