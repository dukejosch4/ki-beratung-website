"use client";

import { useState, useRef, useCallback } from "react";
import { Play, Square, Loader2 } from "lucide-react";
import { INDUSTRIES, REGIONS } from "@/lib/constants";
import { FullScanProgress } from "./full-scan-progress";

interface ProgressState {
  phase: "idle" | "searching" | "analyzing" | "done" | "error";
  completedCombos: number;
  totalCombos: number;
  currentCombo: string;
  totalNewLeads: number;
  analyzedLeads: number;
  totalToAnalyze: number;
  currentLead: string;
  errors: string[];
}

const TOTAL_COMBOS = INDUSTRIES.length * REGIONS.length;

const initialProgress: ProgressState = {
  phase: "idle",
  completedCombos: 0,
  totalCombos: TOTAL_COMBOS,
  currentCombo: "",
  totalNewLeads: 0,
  analyzedLeads: 0,
  totalToAnalyze: 0,
  currentLead: "",
  errors: [],
};

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function FullScan() {
  const [progress, setProgress] = useState<ProgressState>(initialProgress);
  const abortRef = useRef<AbortController | null>(null);

  const startScan = useCallback(async () => {
    const controller = new AbortController();
    abortRef.current = controller;

    setProgress({
      ...initialProgress,
      phase: "searching",
    });

    let totalNewLeads = 0;
    let completedCombos = 0;
    const errors: string[] = [];

    // Phase 1: Search all combos
    for (const industry of INDUSTRIES) {
      for (const region of REGIONS) {
        if (controller.signal.aborted) break;

        const comboLabel = `${industry.label} in ${region.label}`;
        setProgress((prev) => ({
          ...prev,
          currentCombo: comboLabel,
        }));

        try {
          const res = await fetch("/api/intern/search", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              industry: industry.value,
              region: region.value,
              radiusKm: 15,
            }),
            signal: controller.signal,
          });

          if (res.ok) {
            const data = await res.json();
            totalNewLeads += data.newLeads || 0;
          } else {
            errors.push(`${comboLabel}: HTTP ${res.status}`);
          }
        } catch (err) {
          if (controller.signal.aborted) break;
          errors.push(
            `${comboLabel}: ${err instanceof Error ? err.message : "Fehler"}`
          );
        }

        completedCombos++;
        setProgress((prev) => ({
          ...prev,
          completedCombos,
          totalNewLeads,
          errors: [...errors],
        }));

        // Rate limiting delay
        if (!controller.signal.aborted) {
          await delay(500);
        }
      }
      if (controller.signal.aborted) break;
    }

    if (controller.signal.aborted) {
      setProgress((prev) => ({ ...prev, phase: "done" }));
      return;
    }

    // Phase 2: Analyze unanalyzed leads
    setProgress((prev) => ({
      ...prev,
      phase: "analyzing",
      currentCombo: "",
    }));

    try {
      // Fetch all unanalyzed leads
      const leadsRes = await fetch(
        "/api/intern/leads?analyzed=false&limit=1000",
        { signal: controller.signal }
      );
      if (!leadsRes.ok) throw new Error("Leads konnten nicht geladen werden");

      const leadsData = await leadsRes.json();
      const unanalyzed = leadsData.leads || [];

      setProgress((prev) => ({
        ...prev,
        totalToAnalyze: unanalyzed.length,
      }));

      let analyzedCount = 0;
      for (const lead of unanalyzed) {
        if (controller.signal.aborted) break;

        setProgress((prev) => ({
          ...prev,
          currentLead: lead.name,
        }));

        try {
          await fetch(`/api/intern/leads/${lead.id}/analyze`, {
            method: "POST",
            signal: controller.signal,
          });
        } catch (err) {
          if (controller.signal.aborted) break;
          errors.push(
            `Analyse ${lead.name}: ${err instanceof Error ? err.message : "Fehler"}`
          );
        }

        analyzedCount++;
        setProgress((prev) => ({
          ...prev,
          analyzedLeads: analyzedCount,
          errors: [...errors],
        }));

        // Small delay between analyses
        if (!controller.signal.aborted) {
          await delay(200);
        }
      }
    } catch (err) {
      if (!controller.signal.aborted) {
        errors.push(
          `Analyse-Phase: ${err instanceof Error ? err.message : "Fehler"}`
        );
      }
    }

    setProgress((prev) => ({
      ...prev,
      phase: controller.signal.aborted ? "done" : "done",
      errors: [...errors],
    }));
  }, []);

  function handleAbort() {
    abortRef.current?.abort();
    setProgress((prev) => ({ ...prev, phase: "done" }));
  }

  const isRunning =
    progress.phase === "searching" || progress.phase === "analyzing";

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">Full Scan</h3>
          <p className="text-xs text-white/40 mt-0.5">
            Alle {TOTAL_COMBOS} Industrie-Region-Kombinationen durchsuchen
          </p>
        </div>

        {isRunning ? (
          <button
            onClick={handleAbort}
            className="flex items-center gap-2 text-sm px-4 py-2 rounded-xl border border-red-500/30 text-red-400 hover:border-red-500/50 transition-colors"
          >
            <Square className="w-3.5 h-3.5" />
            Abbrechen
          </button>
        ) : (
          <button
            onClick={startScan}
            disabled={progress.phase === "done" && progress.completedCombos > 0}
            className="flex items-center gap-2 text-sm px-4 py-2 rounded-xl bg-white text-black font-medium hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {progress.phase === "done" ? (
              <Loader2 className="w-3.5 h-3.5" />
            ) : (
              <Play className="w-3.5 h-3.5" />
            )}
            {progress.phase === "done" ? "Scan abgeschlossen" : "Full Scan starten"}
          </button>
        )}
      </div>

      <FullScanProgress progress={progress} />

      {progress.phase === "done" && (
        <button
          onClick={() => setProgress(initialProgress)}
          className="text-xs text-white/40 hover:text-white/60 transition-colors"
        >
          Zurücksetzen
        </button>
      )}
    </div>
  );
}
