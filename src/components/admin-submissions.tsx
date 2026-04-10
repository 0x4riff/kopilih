"use client";

import { useEffect, useState } from "react";

import { CoffeeSubmission, SubmissionStatus } from "@/lib/types";

export function AdminSubmissions() {
  const [submissions, setSubmissions] = useState<CoffeeSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  async function loadSubmissions() {
    setLoading(true);
    const response = await fetch("/api/admin/submissions", { cache: "no-store" });
    const payload = await response.json();
    setSubmissions(payload.submissions);
    setLoading(false);
  }

  useEffect(() => {
    loadSubmissions();
  }, []);

  async function updateStatus(id: string, status: SubmissionStatus) {
    const response = await fetch("/api/admin/submissions", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status, adminNote: status === "approved" ? "Approved via demo admin panel." : "Rejected via demo admin panel." }),
    });

    if (response.ok) {
      await loadSubmissions();
      setMessage(`Submission ${status}. Public listing akan update untuk item approved.`);
    }
  }

  const grouped = {
    pending: submissions.filter((item) => item.status === "pending"),
    approved: submissions.filter((item) => item.status === "approved"),
    rejected: submissions.filter((item) => item.status === "rejected"),
  };

  return (
    <div className="space-y-6">
      {message ? <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{message}</div> : null}
      {loading ? <div className="rounded-2xl bg-white p-6 text-sm text-slate-500">Loading submissions...</div> : null}

      {Object.entries(grouped).map(([status, items]) => (
        <section key={status} className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold capitalize text-slate-950">{status}</h2>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">{items.length} items</span>
          </div>
          <div className="grid gap-4">
            {items.length === 0 ? (
              <div className="rounded-[28px] border border-dashed border-slate-200 bg-white px-5 py-6 text-sm text-slate-500">
                No {status} submissions.
              </div>
            ) : (
              items.map((item) => (
                <article key={item.id} className="rounded-[28px] border border-white/60 bg-white p-5 shadow-lg">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-slate-500">{item.city}</p>
                        <h3 className="text-2xl font-semibold text-slate-950">{item.name}</h3>
                        <p className="mt-1 text-sm text-slate-500">{item.address}</p>
                      </div>
                      <p className="max-w-3xl text-sm leading-6 text-slate-600">{item.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {item.vibes.map((vibe) => (
                          <span key={vibe} className="rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-orange-700">
                            #{vibe}
                          </span>
                        ))}
                      </div>
                      <div className="text-xs text-slate-500">Amenities: {item.amenities.join(" • ")}</div>
                      {item.adminNote ? <div className="text-xs text-slate-500">Admin note: {item.adminNote}</div> : null}
                    </div>
                    {status === "pending" ? (
                      <div className="flex shrink-0 gap-2">
                        <button
                          type="button"
                          onClick={() => updateStatus(item.id, "approved")}
                          className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white"
                        >
                          Approve
                        </button>
                        <button
                          type="button"
                          onClick={() => updateStatus(item.id, "rejected")}
                          className="rounded-full bg-rose-500 px-4 py-2 text-sm font-semibold text-white"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span className="rounded-full bg-slate-950 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                        {status}
                      </span>
                    )}
                  </div>
                </article>
              ))
            )}
          </div>
        </section>
      ))}
    </div>
  );
}
