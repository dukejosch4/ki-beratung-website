"use client";

import { INDUSTRIES, PIPELINE_STAGES, PIPELINE_LABELS } from "@/lib/constants";

interface LeadFiltersProps {
  filters: {
    status: string;
    industry: string;
    city: string;
    search: string;
    hasWebsite: string;
  };
  onChange: (filters: LeadFiltersProps["filters"]) => void;
  cities: string[];
}

export function LeadFilters({ filters, onChange, cities }: LeadFiltersProps) {
  const update = (key: string, value: string) => {
    onChange({ ...filters, [key]: value });
  };

  return (
    <div className="flex flex-wrap gap-3 mb-6">
      <input
        type="text"
        placeholder="Suche..."
        value={filters.search}
        onChange={(e) => update("search", e.target.value)}
        className="bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2 text-sm text-white placeholder:text-white/25 focus:border-white/30 focus:outline-none w-64"
      />

      <select
        value={filters.status}
        onChange={(e) => update("status", e.target.value)}
        className="bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:border-white/30 focus:outline-none appearance-none cursor-pointer"
      >
        <option value="">Alle Status</option>
        {PIPELINE_STAGES.map((stage) => (
          <option key={stage} value={stage}>
            {PIPELINE_LABELS[stage]}
          </option>
        ))}
      </select>

      <select
        value={filters.industry}
        onChange={(e) => update("industry", e.target.value)}
        className="bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:border-white/30 focus:outline-none appearance-none cursor-pointer"
      >
        <option value="">Alle Branchen</option>
        {INDUSTRIES.map((ind) => (
          <option key={ind.value} value={ind.value}>
            {ind.label}
          </option>
        ))}
      </select>

      <select
        value={filters.city}
        onChange={(e) => update("city", e.target.value)}
        className="bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:border-white/30 focus:outline-none appearance-none cursor-pointer"
      >
        <option value="">Alle Städte</option>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>

      <select
        value={filters.hasWebsite}
        onChange={(e) => update("hasWebsite", e.target.value)}
        className="bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:border-white/30 focus:outline-none appearance-none cursor-pointer"
      >
        <option value="">Website egal</option>
        <option value="true">Mit Website</option>
        <option value="false">Ohne Website</option>
      </select>
    </div>
  );
}
