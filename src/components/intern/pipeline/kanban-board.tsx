"use client";

import { useState, useEffect, useCallback } from "react";
import { PIPELINE_STAGES, type PipelineStatus } from "@/lib/constants";
import { KanbanColumn } from "./kanban-column";

interface Lead {
  id: string;
  name: string;
  city: string | null;
  websiteUrl: string | null;
  opportunityScore: number;
  industry: string | null;
  pipelineStatus: string;
}

export function KanbanBoard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [draggedId, setDraggedId] = useState<string | null>(null);

  const fetchLeads = useCallback(async () => {
    const res = await fetch("/api/intern/leads?limit=500");
    const data = await res.json();
    setLeads(data.leads);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  function handleDragStart(e: React.DragEvent, leadId: string) {
    setDraggedId(leadId);
    e.dataTransfer.effectAllowed = "move";
  }

  async function handleDrop(e: React.DragEvent, stage: PipelineStatus) {
    e.preventDefault();
    if (!draggedId) return;

    const lead = leads.find((l) => l.id === draggedId);
    if (!lead || lead.pipelineStatus === stage) {
      setDraggedId(null);
      return;
    }

    // Optimistic update
    setLeads((prev) =>
      prev.map((l) =>
        l.id === draggedId ? { ...l, pipelineStatus: stage } : l
      )
    );

    await fetch("/api/intern/pipeline", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ leadId: draggedId, toStatus: stage }),
    });

    setDraggedId(null);
  }

  if (loading) {
    return (
      <div className="text-white/40 text-sm py-12 text-center">
        Lade Pipeline...
      </div>
    );
  }

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {PIPELINE_STAGES.map((stage) => (
        <KanbanColumn
          key={stage}
          stage={stage}
          leads={leads.filter((l) => l.pipelineStatus === stage)}
          onDragStart={handleDragStart}
          onDrop={handleDrop}
        />
      ))}
    </div>
  );
}
