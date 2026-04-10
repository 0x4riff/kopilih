import Link from "next/link";

import { StoreStatus } from "@/components/store-status";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(251,146,60,0.18),_transparent_25%),radial-gradient(circle_at_bottom_right,_rgba(20,184,166,0.12),_transparent_28%),linear-gradient(180deg,#fffaf1_0%,#f5efe5_100%)] text-slate-900">
      <header className="sticky top-0 z-30 border-b border-white/50 bg-[#fff8ef]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <Link
              href="/"
              className="font-display text-xl tracking-tight text-slate-950"
            >
              Kopilih Enhanced
            </Link>
            <p className="text-xs text-slate-500">
              Discover, submit, and moderate cafes in a local-first demo.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <StoreStatus />
            <nav className="flex items-center gap-2 text-sm font-semibold text-slate-600">
              <Link
                href="/"
                className="rounded-full px-3 py-2 transition hover:bg-white"
              >
                Discover
              </Link>
              <Link
                href="/submit"
                className="rounded-full px-3 py-2 transition hover:bg-white"
              >
                Submit
              </Link>
              <Link
                href="/admin/submissions"
                className="rounded-full bg-slate-950 px-4 py-2 text-white transition hover:bg-slate-800"
              >
                Admin
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
