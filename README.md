# Kopilih Enhanced

Versi enhanced dari konsep `kopilih.vercel.app`, dibangun dengan Next.js App Router, TypeScript, dan Tailwind CSS.

## Fitur utama

- Homepage discovery yang lebih kaya: hero, search, filter, sorting, stats, featured picks
- Detail page per cafe
- Favorites di browser via localStorage
- Form submit cafe oleh user
- Admin submissions page untuk approve/reject
- Hanya cafe approved yang tampil di listing publik
- Route API demo untuk submission dan admin review
- Siap deploy ke Vercel

## Demo flow approval

### Public
- `/` menampilkan daftar cafe approved
- `/cafes/[slug]` menampilkan detail cafe
- `/submit` untuk mengirim cafe baru

### Admin
- `/admin/submissions` untuk review submission
- `pending` bisa di-approve atau di-reject

## Cara jalan lokal

```bash
npm install
npm run dev
```

Lalu buka `http://localhost:3000`

## Build production

```bash
npm run build
npm run start
```

## Catatan penting

Project ini sengaja dibuat **demo/local-first**.

- Favorites disimpan di browser user
- Listing detail client juga membaca approved submissions dari localStorage browser
- API route admin/submission memakai in-memory server store untuk demo runtime lokal / preview
- Di Vercel, state API route **tidak persisten** antar invocation atau redeploy

Artinya, flow submit + approve saat ini cocok untuk:
- prototype
- demo produk
- validasi UX

Belum cocok untuk production sungguhan.

## Next step production yang direkomendasikan

1. Tambah database, mis. Supabase / Neon / PostgreSQL
2. Tambah auth admin, mis. NextAuth atau Clerk
3. Simpan submission, review log, dan favorites secara persisten
4. Tambah image upload asli, bukan hanya image URL
5. Tambah moderation fields: proof links, duplicate detection, audit trail
6. Tambah role-based access untuk admin/editor

## Deploy ke Vercel

```bash
npx vercel
```

Atau connect repo GitHub ke Vercel lalu deploy otomatis.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
