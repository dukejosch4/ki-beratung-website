"use client";

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

interface FullScanProgressProps {
  progress: ProgressState;
}

function ProgressBar({
  value,
  max,
  label,
}: {
  value: number;
  max: number;
  label: string;
}) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs text-white/50">{label}</span>
        <span className="text-xs font-mono text-white/40">
          {value}/{max} ({pct}%)
        </span>
      </div>
      <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden">
        <div
          className="h-full bg-white/30 rounded-full transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export function FullScanProgress({ progress }: FullScanProgressProps) {
  if (progress.phase === "idle") return null;

  return (
    <div className="space-y-4">
      {/* Search Progress */}
      <ProgressBar
        value={progress.completedCombos}
        max={progress.totalCombos}
        label={
          progress.phase === "searching"
            ? `Suche: ${progress.currentCombo}`
            : "Suche abgeschlossen"
        }
      />

      {/* Analyze Progress */}
      {(progress.phase === "analyzing" || progress.phase === "done") && (
        <ProgressBar
          value={progress.analyzedLeads}
          max={progress.totalToAnalyze}
          label={
            progress.phase === "analyzing"
              ? `Analyse: ${progress.currentLead}`
              : "Analyse abgeschlossen"
          }
        />
      )}

      {/* Summary */}
      {progress.phase === "done" && (
        <div className="grid grid-cols-4 gap-3 pt-2">
          <div className="text-center">
            <p className="text-xl font-semibold text-white">
              {progress.completedCombos}
            </p>
            <p className="text-[10px] text-white/40">Kombis</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-semibold text-white">
              {progress.totalNewLeads}
            </p>
            <p className="text-[10px] text-white/40">Neue Leads</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-semibold text-white">
              {progress.analyzedLeads}
            </p>
            <p className="text-[10px] text-white/40">Analysiert</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-semibold text-white/60">
              {progress.errors.length}
            </p>
            <p className="text-[10px] text-white/40">Fehler</p>
          </div>
        </div>
      )}

      {/* Error */}
      {progress.phase === "error" && progress.errors.length > 0 && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-3">
          <p className="text-xs text-red-400">
            {progress.errors[progress.errors.length - 1]}
          </p>
        </div>
      )}
    </div>
  );
}
