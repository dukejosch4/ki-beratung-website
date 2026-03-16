"use client";

import Link from "next/link";
import { Globe } from "lucide-react";
import { ScoreBadge } from "../leads/score-badge";

interface KanbanCardProps {
  lead: {
    id: string;
    name: string;
    city: string | null;
    websiteUrl: string | null;
    opportunityScore: number;
    industry: string | null;
  };
  onDragStart: (e: React.DragEvent, leadId: string) => void;
}

export function KanbanCard({ lead, onDragStart }: KanbanCardProps) {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, lead.id)}
      className="bg-white/[0.035] border border-white/10 rounded-xl p-4 hover:border-white/20 transition-colors cursor-grab active:cursor-grabbing"
    >
      <Link
        href={`/intern/leads/${lead.id}`}
        className="text-sm text-white hover:text-white/80 font-medium block"
      >
        {lead.name}
      </Link>
      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-2">
          {lead.city && (
            <span className="text-xs text-white/30">{lead.city}</span>
          )}
          {!lead.websiteUrl && (
            <span className="flex items-center gap-1 text-[10px] text-white/25">
              <Globe className="w-3 h-3" />—
            </span>
          )}
        </div>
        <ScoreBadge score={lead.opportunityScore} size="sm" />
      </div>
    </div>
  );
}
