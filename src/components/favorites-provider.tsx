"use client";

import { DemoStoreProvider, useDemoStore } from "./demo-store-provider";

export function FavoritesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DemoStoreProvider>{children}</DemoStoreProvider>;
}

export function useFavorites() {
  const { favorites, isFavorite, toggleFavorite } = useDemoStore();

  return {
    favorites,
    isFavorite,
    toggleFavorite,
  };
}
