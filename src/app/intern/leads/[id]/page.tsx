"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { PageShell } from "@/components/intern/layout/page-shell";
import { LeadDetail } from "@/components/intern/leads/lead-detail";
import { ArrowLeft, Trash2 } from "lucide-react";
import Link from "next/link";

export default function LeadDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [lead, setLead] = useState<null | Record<string, unknown>>(null);
  const [loading, setLoading] = useState(true);

  const fetchLead = useCallback(async () => {
    const res = await fetch(`/api/intern/leads/${params.id}`);
    if (!res.ok) {
      router.push("/intern/leads");
      return;
    }
    setLead(await res.json());
    setLoading(false);
  }, [params.id, router]);

  useEffect(() => {
    fetchLead();
  }, [fetchLead]);

  async function handleDelete() {
    if (!confirm("Lead wirklich löschen?")) return;
    await fetch(`/api/intern/leads/${params.id}`, { method: "DELETE" });
    router.push("/intern/leads");
  }

  if (loading || !lead) {
    return (
      <PageShell title="Lead laden...">
        <div className="text-white/40 text-sm py-12 text-center">
          Lade Lead-Details...
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell
      title=""
      action={
        <div className="flex items-center gap-3">
          <Link
            href="/intern/leads"
            className="flex items-center gap-2 text-sm text-white/40 hover:text-white/60 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Zurück
          </Link>
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 text-sm px-4 py-2 rounded-xl border border-white/[0.08] text-white/30 hover:border-red-500/30 hover:text-red-400/60 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Löschen
          </button>
        </div>
      }
    >
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <LeadDetail lead={lead as any} onUpdate={fetchLead} />
    </PageShell>
  );
}
