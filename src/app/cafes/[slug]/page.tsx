import type { Metadata } from "next";

import { CafeDetailClient } from "@/components/cafe-detail-client";
import { getSeededPublicShops } from "@/lib/demo-store";

export async function generateStaticParams() {
  return getSeededPublicShops().map((shop) => ({
    slug: shop.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const shop = getSeededPublicShops().find((item) => item.slug === slug);

  if (!shop) {
    return {
      title: "Cafe detail | Kopilih Enhanced",
      description:
        "Cafe details for the current browser demo store and seeded listings.",
    };
  }

  return {
    title: `${shop.name} | Kopilih Enhanced`,
    description: shop.description,
  };
}

export default async function CafeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return <CafeDetailClient slug={slug} />;
}
