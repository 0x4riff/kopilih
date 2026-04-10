"use client";

import { useState } from "react";

const initialForm = {
  name: "",
  city: "",
  address: "",
  description: "",
  priceRange: "$$",
  vibes: "",
  amenities: "WiFi cepat, Colokan banyak",
  imageUrl: "",
  mapsUrl: "",
  instagramUrl: "",
};

export function SubmitForm() {
  const [form, setForm] = useState(initialForm);
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");
    setMessage("");

    try {
      const response = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          vibes: form.vibes.split(",").map((item) => item.trim()).filter(Boolean),
          amenities: form.amenities.split(",").map((item) => item.trim()).filter(Boolean),
        }),
      });

      if (!response.ok) {
        throw new Error("Submit gagal");
      }

      const payload = await response.json();
      setState("success");
      setMessage(`Submission terkirim dengan status ${payload.submission.status}. Cek area admin untuk approve/reject demo.`);
      setForm(initialForm);
    } catch {
      setState("error");
      setMessage("Gagal mengirim submission. Coba lagi.");
    }
  }

  const fields = [
    { key: "name", label: "Nama cafe", type: "text", placeholder: "Mis. Kopi Tengah Kota" },
    { key: "city", label: "Kota", type: "text", placeholder: "Jakarta" },
    { key: "address", label: "Alamat", type: "text", placeholder: "Jl. ..." },
    { key: "imageUrl", label: "Image URL", type: "url", placeholder: "https://..." },
    { key: "mapsUrl", label: "Google Maps URL", type: "url", placeholder: "https://maps.google.com/..." },
    { key: "instagramUrl", label: "Instagram URL", type: "url", placeholder: "https://instagram.com/..." },
  ] as const;

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-[32px] border border-white/60 bg-white p-6 shadow-xl sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map((field) => (
          <label key={field.key} className="space-y-2 text-sm font-medium text-slate-700">
            {field.label}
            <input
              required={field.key !== "instagramUrl"}
              type={field.type}
              value={form[field.key]}
              onChange={(event) => setForm((current) => ({ ...current, [field.key]: event.target.value }))}
              placeholder={field.placeholder}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-orange-300"
            />
          </label>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-[0.7fr_1.3fr]">
        <label className="space-y-2 text-sm font-medium text-slate-700">
          Price range
          <select
            value={form.priceRange}
            onChange={(event) => setForm((current) => ({ ...current, priceRange: event.target.value }))}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-orange-300"
          >
            <option value="$">$</option>
            <option value="$$">$$</option>
            <option value="$$$">$$$</option>
          </select>
        </label>

        <label className="space-y-2 text-sm font-medium text-slate-700">
          Vibe tags
          <input
            required
            type="text"
            value={form.vibes}
            onChange={(event) => setForm((current) => ({ ...current, vibes: event.target.value }))}
            placeholder="work-friendly, minimal, brunch"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-orange-300"
          />
        </label>
      </div>

      <label className="space-y-2 text-sm font-medium text-slate-700">
        Fasilitas
        <input
          required
          type="text"
          value={form.amenities}
          onChange={(event) => setForm((current) => ({ ...current, amenities: event.target.value }))}
          placeholder="WiFi cepat, Colokan banyak, Outdoor"
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-orange-300"
        />
      </label>

      <label className="space-y-2 text-sm font-medium text-slate-700">
        Deskripsi singkat
        <textarea
          required
          value={form.description}
          onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
          placeholder="Kenapa cafe ini layak masuk Kopilih?"
          rows={5}
          className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-orange-300"
        />
      </label>

      <div className="flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-500">Submission disimpan di demo local-first store dan butuh approval admin sebelum tampil publik.</p>
        <button
          type="submit"
          disabled={state === "loading"}
          className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-60"
        >
          {state === "loading" ? "Mengirim..." : "Submit coffee shop"}
        </button>
      </div>

      {message ? (
        <div
          className={`rounded-2xl px-4 py-3 text-sm ${
            state === "success" ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"
          }`}
        >
          {message}
        </div>
      ) : null}
    </form>
  );
}
