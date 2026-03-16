interface ScoreBadgeProps {
  score: number;
  size?: "sm" | "md";
}

export function ScoreBadge({ score, size = "md" }: ScoreBadgeProps) {
  const opacity =
    score >= 80
      ? "text-white border-white/30"
      : score >= 60
        ? "text-white/80 border-white/20"
        : score >= 40
          ? "text-white/60 border-white/15"
          : "text-white/30 border-white/[0.08]";

  const sizeClasses =
    size === "sm"
      ? "text-[10px] px-2 py-0.5"
      : "text-xs px-3 py-1";

  return (
    <span
      className={`inline-flex items-center font-mono rounded-full border ${opacity} ${sizeClasses}`}
    >
      {score}
    </span>
  );
}
