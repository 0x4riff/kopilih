import Link from "next/link";

import { requireAdminAuth } from "@/lib/admin-auth";

function ModuleCard({ description, href, title }: { description: string; href: string; title: string }) {
  return (
    <Link href={href} className="surface-card rounded-[32px] p-6 transition hover:-translate-y-[2px]">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Module</p>
      <h2 className="mt-3 text-3xl font-semibold text-slate-950">{title}</h2>
      <p className="editorial-body mt-4 text-sm text-slate-600">{description}</p>
    </Link>
  );
}

export default async function AdminDashboardPage() {
  await requireAdminAuth();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <section className="surface-card rounded-[36px] p-8 sm:p-10">
        <p className="editorial-kicker text-slate-400">KOPILIH business console</p>
        <h1 className="editorial-title mt-4 text-5xl font-semibold text-slate-950">Kelola katalog, review, dan jalur monetisasi.</h1>
        <p className="editorial-body mt-5 max-w-3xl text-base text-slate-600">
          Dashboard admin bukan lagi sekadar antrian review. Dari sini, KOPILIH bisa berkembang jadi console operasional untuk listing, voucher, promosi partner, dan pengelolaan placement premium.
        </p>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
        <ModuleCard
          href="/admin/submissions"
          title="Submission review"
          description="Tinjau rekomendasi cafe yang masuk, approve listing, dan jaga kualitas katalog publik."
        />
        <ModuleCard
          href="/admin"
          title="Cafe management"
          description="Siapkan area untuk featured placement, pengaturan kategori, jam buka, serta kualitas data partner."
        />
        <ModuleCard
          href="/admin"
          title="Voucher & offers"
          description="Fondasi monetisasi untuk promo partner, diskon khusus, kuota voucher, dan campaign window."
        />
        <ModuleCard
          href="/admin"
          title="Partner console"
          description="Ruang untuk metrik performa listing, sponsored placement, dan prioritas kota atau area yang ingin didorong."
        />
      </section>
    </div>
  );
}
