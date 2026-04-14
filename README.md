# Kopilih Enhanced

Versi enhanced dari konsep `kopilih.vercel.app`, dibangun dengan Next.js App Router, TypeScript, Tailwind CSS, dan Supabase sebagai backend.

## Arsitektur

```
User Browser                Supabase                    Vercel
────────────                ────────                    ──────
Submit form  ──────────────► cafe_submissions (pending)
                                 │
Admin review ──────────────► cafe_submissions (approved/rejected)
                                      │
                              cafes (published)
                                    │
Homepage  ◄────────────────── cafes ◄───────── Vercel build
Cafe detail ◄──────────────── cafes
Favorites ◄── localStorage
```

## Fitur utama

- **Homepage** discovery dengan search, filter (kota/vibe/harga/wifi), sort
- **Cafe detail page** per slug
- **Submit form** — user kirim cafe baru ke queue
- **Admin submissions page** — approve/reject/pending dengan review
- **Favorites** di browser via localStorage (tidak perlu DB)
- Hanya cafe **approved** yang tampil di listing publik
- API routes untuk submissions dan admin review

## Database (Supabase)

### Tables

- **`cafe_submissions`** — queue submissions (pending → approved/rejected)
- **`cafes`** — published cafe listings
- **`cafe_hours`** — jam buka per cafe

### RLS Policies

- Public: SELECT `cafes` (status=published) + `cafe_hours`
- Public: INSERT `cafe_submissions`
- Admin: UPDATE `cafe_submissions` + INSERT `cafes`

## Setup lokal

```bash
# 1. Clone & install
git clone https://github.com/0x4riff/kopilih-enhanced.git
cd kopilih-enhanced
npm install

# 2. Buat file .env.local
cp .env.example .env.local
# Lalu isi NEXT_PUBLIC_SUPABASE_URL dan NEXT_PUBLIC_SUPABASE_ANON_KEY
# dari Supabase Dashboard → Settings → API

# 3. Push schema ke Supabase (kalau belum)
supabase db push

# 4. Seed data awal
supabase db seed

# 5. Jalan lokal
npm run dev
```

## Deploy ke Vercel

1. Connect repo `0x4riff/kopilih-enhanced` ke Vercel
2. Tambahkan environment variables di Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Deploy

Atau via CLI:

```bash
npx vercel
```

## Supabase Schema

Schema sudah ada di `supabase/migrations/20260411095800_init_kopilih.sql`.

Field kunci:

| Table | Field | Notes |
|-------|-------|-------|
| `cafe_submissions` | `status` | pending → approved/rejected |
| `cafe_submissions` | `admin_note` | Catatan dari admin |
| `cafes` | `status` | draft/published/archived |
| `cafes` | `source` | editorial/community/imported |
| `cafes` | `featured` | Tampil di hero/featured |

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- Supabase (PostgreSQL + RLS)
- Vercel (deployment)

## Next step production

1. Tambah **Supabase Auth** untuk admin login
2. Tambah **image upload** (bukan hanya URL)
3. Tambah **duplicate detection** (nama + alamat mirip)
4. Tambah **audit trail** (log setiap approve/reject)
5. Tambah **email notification** ke submitter saat status berubah