# KOPILIH

KOPILIH adalah katalog cafe Indonesia dengan pendekatan mobile-first, visual premium, dan browsing berbasis kebutuhan nyata: kerja fokus, meeting santai, singgah cepat, atau mencari tempat terdekat dari posisi pengguna.

## Ringkasan produk

- katalog publik untuk menemukan cafe pilihan
- nearby browsing dengan izin lokasi pengguna
- halaman detail cafe per slug
- form rekomendasi cafe baru
- meja review internal untuk kurasi listing
- favorit disimpan lokal di browser

## Arsitektur aplikasi

```text
Pengunjung membuka KOPILIH
        ↓
Beranda memuat listing cafe yang sudah tayang
        ↓
Pengguna dapat mencari, memfilter, menyimpan, dan membuka detail
        ↓
Rekomendasi cafe baru masuk ke meja review
        ↓
Tim review menerbitkan listing yang lolos kurasi
```

## Fitur yang sudah aktif

- pencarian berdasarkan nama cafe, kota, atau vibe
- filter kota, vibe, harga, dan preferensi WiFi
- sorting unggulan, rating, harga, alfabet, dan terdekat
- badge jarak dan panel cafe terdekat
- radius filter 5 km dan 10 km
- simpan lokasi terakhir pengguna di browser
- submit flow untuk rekomendasi cafe baru
- review flow untuk approve, reject, atau pending

## Menjalankan lokal

```bash
git clone https://github.com/0x4riff/kopilih.git
cd kopilih
npm install
cp .env.example .env.local
npm run dev
```

Isi `.env.local` dengan:

```bash
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

## Deploy production

1. Hubungkan repo ke Vercel
2. Pasang environment variables berikut di Vercel:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Lakukan deploy production

Atau via CLI:

```bash
vercel --prod
```

## Struktur penting

- `src/app` untuk routes App Router
- `src/components` untuk UI utama
- `src/lib` untuk types, mapper, helper, dan akses data
- `supabase/migrations` untuk schema
- `supabase/seed.sql` untuk seed awal

## Next product passes

- admin auth yang proper
- upload gambar langsung tanpa URL manual
- duplicate detection untuk nama dan alamat mirip
- audit trail perubahan status listing
- enrichment data tempat dari provider maps pada fase berikutnya
