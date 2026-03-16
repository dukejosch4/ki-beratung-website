"use client";

import { useState, useEffect } from "react";
import { PageShell } from "@/components/intern/layout/page-shell";
import { PIPELINE_LABELS, type PipelineStatus } from "@/lib/constants";
import { ScoreBadge } from "@/components/intern/leads/score-badge";

interface Lead {
  id: string;
  name: string;
  city: string | null;
  opportunityScore: number;
  pipelineStatus: string;
  websiteUrl: string | null;
  industry: string | null;
}

export default function StatsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/intern/leads?limit=10000")
      .then((r) => r.json())
      .then((data) => {
        setLeads(data.leads);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <PageShell title="Statistik">
        <div className="text-white/40 text-sm py-12 text-center">
          Lade Statistiken...
        </div>
      </PageShell>
    );
  }

  const totalLeads = leads.length;
  const withoutWebsite = leads.filter((l) => !l.websiteUrl).length;
  const avgScore =
    totalLeads > 0
      ? Math.round(
          leads.reduce((sum, l) => sum + l.opportunityScore, 0) / totalLeads
        )
      : 0;
  const wonLeads = leads.filter((l) => l.pipelineStatus === "gewonnen").length;
  const conversionRate =
    totalLeads > 0 ? ((wonLeads / totalLeads) * 100).toFixed(1) : "0";

  const statusCounts: Record<string, number> = {};
  for (const lead of leads) {
    statusCounts[lead.pipelineStatus] =
      (statusCounts[lead.pipelineStatus] || 0) + 1;
  }

  const topLeads = [...leads]
    .sort((a, b) => b.opportunityScore - a.opportunityScore)
    .slice(0, 10);

  const industryCounts: Record<string, number> = {};
  for (const lead of leads) {
    const ind = lead.industry || "sonstige";
    industryCounts[ind] = (industryCounts[ind] || 0) + 1;
  }

  return (
    <PageShell title="Statistik" subtitle="Übersicht über alle Leads">
      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Leads gesamt", value: totalLeads.toString() },
          { label: "Ohne Website", value: withoutWebsite.toString() },
          { label: "Ø Score", value: avgScore.toString() },
          { label: "Conversion", value: `${conversionRate}%` },
        ].map((metric) => (
          <div
            key={metric.label}
            className="rounded-2xl border border-white/10 bg-white/[0.035] p-6"
          >
            <p className="text-3xl font-semibold text-white">{metric.value}</p>
            <p className="text-xs uppercase tracking-[0.35em] text-white/40 mt-2">
              {metric.label}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pipeline Distribution */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Pipeline-Verteilung
          </h3>
          <div className="space-y-3">
            {Object.entries(statusCounts)
              .sort(([, a], [, b]) => b - a)
              .map(([status, count]) => {
                const pct = totalLeads > 0 ? (count / totalLeads) * 100 : 0;
                return (
                  <div key={status}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-white/60">
                        {PIPELINE_LABELS[status as PipelineStatus] || status}
                      </span>
                      <span className="text-white/40 font-mono">{count}</span>
                    </div>
                    <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-white/20 rounded-full"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Top Leads */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Top Leads</h3>
          <div className="space-y-2">
            {topLeads.map((lead, idx) => (
              <div
                key={lead.id}
                className="flex items-center justify-between py-2 border-b border-white/[0.06] last:border-0"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-white/25 w-5">
                    {idx + 1}
                  </span>
                  <span className="text-sm text-white/60">{lead.name}</span>
                </div>
                <ScoreBadge score={lead.opportunityScore} size="sm" />
              </div>
            ))}
          </div>
        </div>

        {/* Industry Distribution */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Branchen-Verteilung
          </h3>
          <div className="space-y-3">
            {Object.entries(industryCounts)
              .sort(([, a], [, b]) => b - a)
              .map(([industry, count]) => {
                const pct = totalLeads > 0 ? (count / totalLeads) * 100 : 0;
                return (
                  <div key={industry}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-white/60">{industry}</span>
                      <span className="text-white/40 font-mono">{count}</span>
                    </div>
                    <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-white/20 rounded-full"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
