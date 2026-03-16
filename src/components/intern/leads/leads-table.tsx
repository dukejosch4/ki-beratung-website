"use client";

import Link from "next/link";
import { ArrowUpDown, Globe, ExternalLink } from "lucide-react";
import { ScoreBadge } from "./score-badge";
import { PIPELINE_LABELS, type PipelineStatus } from "@/lib/constants";

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

interface LeadsTableProps {
  leads: Lead[];
  sort: string;
  order: string;
  onSort: (column: string) => void;
}

export function LeadsTable({ leads, sort, order, onSort }: LeadsTableProps) {
  const SortHeader = ({
    column,
    children,
  }: {
    column: string;
    children: React.ReactNode;
  }) => (
    <th
      className="text-left text-xs uppercase tracking-[0.35em] text-white/40 py-3 px-4 cursor-pointer hover:text-white/60 transition-colors select-none"
      onClick={() => onSort(column)}
    >
      <span className="flex items-center gap-1.5">
        {children}
        <ArrowUpDown
          className={`w-3 h-3 ${sort === column ? "text-white/60" : "text-white/20"}`}
        />
      </span>
    </th>
  );

  if (leads.length === 0) {
    return (
      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-12 text-center">
        <p className="text-white/40 text-sm">Keine Leads gefunden</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/[0.08] overflow-hidden">
      <table className="w-full">
        <thead className="border-b border-white/[0.08]">
          <tr>
            <SortHeader column="name">Name</SortHeader>
            <SortHeader column="city">Stadt</SortHeader>
            <th className="text-left text-xs uppercase tracking-[0.35em] text-white/40 py-3 px-4">
              Website
            </th>
            <SortHeader column="opportunity_score">Score</SortHeader>
            <SortHeader column="pipeline_status">Status</SortHeader>
            <th className="text-left text-xs uppercase tracking-[0.35em] text-white/40 py-3 px-4">
              Google
            </th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr
              key={lead.id}
              className="border-b border-white/[0.06] hover:bg-white/[0.03] transition-colors"
            >
              <td className="py-3 px-4">
                <Link
                  href={`/intern/leads/${lead.id}`}
                  className="text-sm text-white hover:text-white/80 transition-colors"
                >
                  {lead.name}
                </Link>
              </td>
              <td className="py-3 px-4 text-sm text-white/40">
                {lead.city || "—"}
              </td>
              <td className="py-3 px-4">
                {lead.websiteUrl ? (
                  <a
                    href={lead.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-white/40 hover:text-white/60 transition-colors"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="text-[10px] uppercase tracking-[0.2em] px-2 py-0.5 rounded-full border border-white/10 text-white/30">
                    Keine
                  </span>
                )}
              </td>
              <td className="py-3 px-4">
                <ScoreBadge score={lead.opportunityScore} size="sm" />
              </td>
              <td className="py-3 px-4">
                <span className="text-[10px] uppercase tracking-[0.2em] px-3 py-1 rounded-full border border-white/10 text-white/50">
                  {PIPELINE_LABELS[lead.pipelineStatus as PipelineStatus] ||
                    lead.pipelineStatus}
                </span>
              </td>
              <td className="py-3 px-4 text-sm text-white/40">
                {lead.googleRating ? (
                  <span>
                    {lead.googleRating.toFixed(1)} ({lead.googleReviewCount})
                  </span>
                ) : (
                  "—"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
