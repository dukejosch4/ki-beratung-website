"use client";

import { useState, useEffect, useCallback } from "react";
import { PageShell } from "@/components/intern/layout/page-shell";
import { LeadsTable } from "@/components/intern/leads/leads-table";
import { LeadFilters } from "@/components/intern/leads/lead-filters";
import { Download, Upload, Plus } from "lucide-react";

interface Lead {
  id: string;
  name: string;
  city: string | null;
  industry: string | null;
  websiteUrl: string | null;
  opportunityScore: number;
  pipelineStatus: string;
  googleRating: number | null;
  googleReviewCount: number | null;
  createdAt: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 50,
    total: 0,
    totalPages: 0,
  });
  const [sort, setSort] = useState("opportunity_score");
  const [order, setOrder] = useState("desc");
  const [filters, setFilters] = useState({
    status: "",
    industry: "",
    city: "",
    search: "",
    hasWebsite: "",
  });
  const [cities, setCities] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLeads = useCallback(async () => {
    const params = new URLSearchParams({
      page: pagination.page.toString(),
      limit: pagination.limit.toString(),
      sort,
      order,
    });

    if (filters.status) params.set("status", filters.status);
    if (filters.industry) params.set("industry", filters.industry);
    if (filters.city) params.set("city", filters.city);
    if (filters.search) params.set("search", filters.search);
    if (filters.hasWebsite) params.set("hasWebsite", filters.hasWebsite);

    const res = await fetch(`/api/intern/leads?${params}`);
    const data = await res.json();
    setLeads(data.leads);
    setPagination(data.pagination);
    setLoading(false);

    // Extract unique cities
    const uniqueCities = [
      ...new Set(
        data.leads
          .map((l: Lead) => l.city)
          .filter(Boolean) as string[]
      ),
    ];
    setCities((prev) => {
      const merged = [...new Set([...prev, ...uniqueCities])].sort();
      return merged;
    });
  }, [pagination.page, pagination.limit, sort, order, filters]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  function handleSort(column: string) {
    if (sort === column) {
      setOrder(order === "desc" ? "asc" : "desc");
    } else {
      setSort(column);
      setOrder("desc");
    }
  }

  async function handleImport() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".csv";
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("file", file);

      await fetch("/api/intern/import", {
        method: "POST",
        body: formData,
      });

      fetchLeads();
    };
    input.click();
  }

  return (
    <PageShell
      title="Leads"
      subtitle={`${pagination.total} Leads gesamt`}
      action={
        <div className="flex items-center gap-3">
          <button
            onClick={handleImport}
            className="flex items-center gap-2 text-sm px-4 py-2 rounded-xl border border-white/[0.08] text-white/40 hover:border-white/15 hover:text-white/60 transition-colors"
          >
            <Upload className="w-3.5 h-3.5" />
            Import
          </button>
          <a
            href="/api/intern/export"
            className="flex items-center gap-2 text-sm px-4 py-2 rounded-xl border border-white/[0.08] text-white/40 hover:border-white/15 hover:text-white/60 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            Export
          </a>
          <a
            href="/intern/search"
            className="flex items-center gap-2 text-sm px-4 py-2 rounded-xl bg-white text-black font-medium hover:bg-white/90 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Neue Suche
          </a>
        </div>
      }
    >
      <LeadFilters
        filters={filters}
        onChange={(f) => {
          setFilters(f);
          setPagination((p) => ({ ...p, page: 1 }));
        }}
        cities={cities}
      />

      {loading ? (
        <div className="text-white/40 text-sm py-12 text-center">
          Lade Leads...
        </div>
      ) : (
        <>
          <LeadsTable
            leads={leads}
            sort={sort}
            order={order}
            onSort={handleSort}
          />

          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 mt-6">
              <button
                onClick={() =>
                  setPagination((p) => ({ ...p, page: Math.max(1, p.page - 1) }))
                }
                disabled={pagination.page <= 1}
                className="text-sm px-4 py-2 rounded-xl border border-white/[0.08] text-white/40 hover:border-white/15 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                Zurück
              </button>
              <span className="text-sm font-mono text-white/25">
                {pagination.page} / {pagination.totalPages}
              </span>
              <button
                onClick={() =>
                  setPagination((p) => ({
                    ...p,
                    page: Math.min(p.totalPages, p.page + 1),
                  }))
                }
                disabled={pagination.page >= pagination.totalPages}
                className="text-sm px-4 py-2 rounded-xl border border-white/[0.08] text-white/40 hover:border-white/15 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                Weiter
              </button>
            </div>
          )}
        </>
      )}
    </PageShell>
  );
}
