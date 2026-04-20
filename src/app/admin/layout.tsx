import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f7f2e8_0%,#efe6d8_100%)] text-slate-900">
      <header className="border-b border-black/5 bg-white/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <p className="editorial-kicker text-slate-400">KOPILIH internal</p>
            <h1 className="mt-2 text-2xl font-semibold text-slate-950">Admin console</h1>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link href="/admin" className="btn btn-secondary !min-h-0 px-4 py-2.5">Dashboard</Link>
            <Link href="/admin/submissions" className="btn btn-secondary !min-h-0 px-4 py-2.5">Submissions</Link>
            <Link href="/" className="btn btn-primary !min-h-0 px-4 py-2.5">Lihat situs publik</Link>
          </div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
