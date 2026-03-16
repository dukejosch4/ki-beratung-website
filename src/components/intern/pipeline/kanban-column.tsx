"use client";

import { PIPELINE_LABELS, type PipelineStatus } from "@/lib/constants";
import { KanbanCard } from "./kanban-card";

interface Lead {
  id: string;
  name: string;
  city: string | null;
  websiteUrl: string | null;
  opportunityScore: number;
  industry: string | null;
  pipelineStatus: string;
}

interface KanbanColumnProps {
  stage: PipelineStatus;
  leads: Lead[];
  onDragStart: (e: React.DragEvent, leadId: string) => void;
  onDrop: (e: React.DragEvent, stage: PipelineStatus) => void;
}

export function KanbanColumn({
  stage,
  leads,
  onDragStart,
  onDrop,
}: KanbanColumnProps) {
  return (
    <div
      className="bg-white/[0.02] rounded-2xl border border-white/[0.06] min-w-[260px] max-w-[280px] flex flex-col"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => onDrop(e, stage)}
    >
      <div className="px-4 py-3 border-b border-white/[0.06]">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-[0.35em] text-white/40">
            {PIPELINE_LABELS[stage]}
          </span>
          <span className="text-[10px] font-mono text-white/25">
            {leads.length}
          </span>
        </div>
      </div>
      <div className="p-3 space-y-2 flex-1 overflow-y-auto max-h-[calc(100vh-240px)]">
        {leads.map((lead) => (
          <KanbanCard
            key={lead.id}
            lead={lead}
            onDragStart={onDragStart}
          />
        ))}
      </div>
    </div>
  );
}
