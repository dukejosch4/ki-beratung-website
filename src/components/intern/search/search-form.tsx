"use client";

import { useState } from "react";
import { Search, Loader2 } from "lucide-react";
import { INDUSTRIES, REGIONS } from "@/lib/constants";

interface SearchResult {
  searchId: string;
  totalFound: number;
  newLeads: number;
  duplicatesSkipped: number;
}

export function SearchForm() {
  const [industry, setIndustry] = useState("");
  const [region, setRegion] = useState("");
  const [radiusKm, setRadiusKm] = useState(10);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SearchResult | null>(null);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!industry || !region) return;

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/intern/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ industry, region, radiusKm }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Suche fehlgeschlagen");
      }

      setResult(await res.json());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Fehler bei der Suche");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-xs uppercase tracking-[0.35em] text-white/40 mb-2">
            Branche
          </label>
          <select
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-white/30 focus:outline-none appearance-none cursor-pointer"
          >
            <option value="">Branche wählen...</option>
            {INDUSTRIES.map((ind) => (
              <option key={ind.value} value={ind.value}>
                {ind.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-[0.35em] text-white/40 mb-2">
            Region
          </label>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-white/30 focus:outline-none appearance-none cursor-pointer"
          >
            <option value="">Region wählen...</option>
            {REGIONS.map((reg) => (
              <option key={reg.value} value={reg.value}>
                {reg.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-[0.35em] text-white/40 mb-2">
            Radius: {radiusKm} km
          </label>
          <input
            type="range"
            min="5"
            max="50"
            step="5"
            value={radiusKm}
            onChange={(e) => setRadiusKm(parseInt(e.target.value))}
            className="w-full accent-white"
          />
          <div className="flex justify-between text-[10px] text-white/25 mt-1">
            <span>5 km</span>
            <span>50 km</span>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || !industry || !region}
          className="flex items-center gap-2 bg-white text-black font-medium px-6 py-3 rounded-xl hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Search className="w-4 h-4" />
          )}
          {loading ? "Suche läuft..." : "Suche starten"}
        </button>
      </form>

      {error && (
        <div className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/5 p-4">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      {result && (
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.035] p-6 space-y-3">
          <h3 className="text-lg font-semibold text-white">
            Suche abgeschlossen
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-2xl font-semibold text-white">
                {result.totalFound}
              </p>
              <p className="text-xs text-white/40">Gefunden</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-white">
                {result.newLeads}
              </p>
              <p className="text-xs text-white/40">Neue Leads</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-white">
                {result.duplicatesSkipped}
              </p>
              <p className="text-xs text-white/40">Duplikate</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
