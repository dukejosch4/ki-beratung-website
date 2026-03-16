"use client";

import { useState } from "react";
import {
  Globe,
  Phone,
  Mail,
  MapPin,
  Star,
  ExternalLink,
  Loader2,
  Check,
  X,
  Shield,
  Smartphone,
  Clock,
  FileText,
  Code2,
  Image,
  Eye,
} from "lucide-react";
import { ScoreBadge } from "./score-badge";
import {
  PIPELINE_STAGES,
  PIPELINE_LABELS,
  INDUSTRIES,
  type PipelineStatus,
} from "@/lib/constants";

interface PipelineEvent {
  id: string;
  fromStatus: string;
  toStatus: string;
  note: string | null;
  createdAt: string;
}

interface LeadData {
  id: string;
  name: string;
  address: string | null;
  city: string | null;
  postalCode: string | null;
  phone: string | null;
  email: string | null;
  websiteUrl: string | null;
  googlePlaceId: string | null;
  googleRating: number | null;
  googleReviewCount: number | null;
  category: string | null;
  industry: string | null;
  hasSsl: boolean | null;
  isMobileResponsive: boolean | null;
  pageLoadMs: number | null;
  hasMetaTags: boolean | null;
  hasStructuredData: boolean | null;
  opportunityScore: number;
  mockupScreenshotPath: string | null;
  pipelineStatus: string;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  events: PipelineEvent[];
}

interface LeadDetailProps {
  lead: LeadData;
  onUpdate: () => void;
}

function CheckIcon({ value }: { value: boolean | null }) {
  if (value === null)
    return <span className="text-white/20 text-xs">—</span>;
  return value ? (
    <Check className="w-4 h-4 text-white/60" />
  ) : (
    <X className="w-4 h-4 text-white/25" />
  );
}

export function LeadDetail({ lead, onUpdate }: LeadDetailProps) {
  const [analyzing, setAnalyzing] = useState(false);
  const [generatingMockup, setGeneratingMockup] = useState(false);
  const [notes, setNotes] = useState(lead.notes || "");
  const [savingNotes, setSavingNotes] = useState(false);

  async function handleAnalyze() {
    setAnalyzing(true);
    try {
      await fetch(`/api/intern/leads/${lead.id}/analyze`, { method: "POST" });
      onUpdate();
    } finally {
      setAnalyzing(false);
    }
  }

  async function handleGenerateMockup() {
    setGeneratingMockup(true);
    try {
      await fetch(`/api/intern/leads/${lead.id}/mockup`, { method: "POST" });
      onUpdate();
    } finally {
      setGeneratingMockup(false);
    }
  }

  async function handleStatusChange(status: string) {
    await fetch(`/api/intern/leads/${lead.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pipelineStatus: status }),
    });
    onUpdate();
  }

  async function saveNotes() {
    setSavingNotes(true);
    await fetch(`/api/intern/leads/${lead.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ notes }),
    });
    setSavingNotes(false);
    onUpdate();
  }

  const industryLabel =
    INDUSTRIES.find((i) => i.value === lead.industry)?.label || lead.industry;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-3xl font-semibold text-white">{lead.name}</h2>
          <div className="flex items-center gap-4 mt-2 text-sm text-white/40">
            {lead.category && <span>{lead.category}</span>}
            {industryLabel && <span>{industryLabel}</span>}
          </div>
        </div>
        <ScoreBadge score={lead.opportunityScore} />
      </div>

      {/* Contact Info */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-6 space-y-3">
        {lead.address && (
          <div className="flex items-center gap-3 text-sm">
            <MapPin className="w-4 h-4 text-white/40" />
            <span className="text-white/60">{lead.address}</span>
          </div>
        )}
        {lead.phone && (
          <div className="flex items-center gap-3 text-sm">
            <Phone className="w-4 h-4 text-white/40" />
            <a
              href={`tel:${lead.phone}`}
              className="text-white/60 hover:text-white transition-colors"
            >
              {lead.phone}
            </a>
          </div>
        )}
        {lead.email && (
          <div className="flex items-center gap-3 text-sm">
            <Mail className="w-4 h-4 text-white/40" />
            <a
              href={`mailto:${lead.email}`}
              className="text-white/60 hover:text-white transition-colors"
            >
              {lead.email}
            </a>
          </div>
        )}
        {lead.websiteUrl && (
          <div className="flex items-center gap-3 text-sm">
            <Globe className="w-4 h-4 text-white/40" />
            <a
              href={lead.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors flex items-center gap-1"
            >
              {lead.websiteUrl}
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        )}
        {lead.googleRating && (
          <div className="flex items-center gap-3 text-sm">
            <Star className="w-4 h-4 text-white/40" />
            <span className="text-white/60">
              {lead.googleRating.toFixed(1)} ({lead.googleReviewCount}{" "}
              Bewertungen)
            </span>
          </div>
        )}
      </div>

      {/* Website Analysis */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Website-Analyse</h3>
          <button
            onClick={handleAnalyze}
            disabled={analyzing || !lead.websiteUrl}
            className="flex items-center gap-2 text-sm px-4 py-2 rounded-xl border border-white/10 text-white/60 hover:border-white/20 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {analyzing ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : null}
            {analyzing ? "Analysiere..." : "Analysieren"}
          </button>
        </div>

        {!lead.websiteUrl ? (
          <p className="text-sm text-white/40">
            Keine Website vorhanden — hohe Opportunity
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <Shield className="w-4 h-4 text-white/40" />
              <span className="text-sm text-white/50">SSL</span>
              <CheckIcon value={lead.hasSsl} />
            </div>
            <div className="flex items-center gap-3">
              <Smartphone className="w-4 h-4 text-white/40" />
              <span className="text-sm text-white/50">Responsive</span>
              <CheckIcon value={lead.isMobileResponsive} />
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-4 h-4 text-white/40" />
              <span className="text-sm text-white/50">Ladezeit</span>
              <span className="text-sm font-mono text-white/40">
                {lead.pageLoadMs ? `${lead.pageLoadMs}ms` : "—"}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <FileText className="w-4 h-4 text-white/40" />
              <span className="text-sm text-white/50">Meta-Tags</span>
              <CheckIcon value={lead.hasMetaTags} />
            </div>
            <div className="flex items-center gap-3">
              <Code2 className="w-4 h-4 text-white/40" />
              <span className="text-sm text-white/50">Structured Data</span>
              <CheckIcon value={lead.hasStructuredData} />
            </div>
          </div>
        )}
      </div>

      {/* Mockup */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Website-Mockup</h3>
          <div className="flex items-center gap-2">
            <a
              href={`/intern/mockup-preview/${lead.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm px-4 py-2 rounded-xl border border-white/10 text-white/60 hover:border-white/20 hover:text-white transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              Vorschau
            </a>
            <button
              onClick={handleGenerateMockup}
              disabled={generatingMockup}
              className="flex items-center gap-2 text-sm px-4 py-2 rounded-xl border border-white/10 text-white/60 hover:border-white/20 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              {generatingMockup ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Image className="w-3.5 h-3.5" />
              )}
              {generatingMockup ? "Erstelle..." : "Mockup erstellen"}
            </button>
          </div>
        </div>

        {lead.mockupScreenshotPath ? (
          <div className="rounded-xl overflow-hidden border border-white/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/api/intern/screenshots/${lead.mockupScreenshotPath}`}
              alt={`Mockup für ${lead.name}`}
              className="w-full"
            />
          </div>
        ) : (
          <p className="text-sm text-white/40">
            Noch kein Mockup erstellt. Klicken Sie auf &quot;Mockup erstellen&quot; um ein
            personalisiertes Website-Mockup zu generieren.
          </p>
        )}
      </div>

      {/* Pipeline Status */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-6">
        <h3 className="text-lg font-semibold text-white mb-4">
          Pipeline-Status
        </h3>
        <div className="flex flex-wrap gap-2">
          {PIPELINE_STAGES.map((stage) => (
            <button
              key={stage}
              onClick={() => handleStatusChange(stage)}
              className={`text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 rounded-full border transition-colors ${
                lead.pipelineStatus === stage
                  ? "bg-white/[0.08] border-white/30 text-white"
                  : "border-white/[0.08] text-white/40 hover:border-white/15"
              }`}
            >
              {PIPELINE_LABELS[stage]}
            </button>
          ))}
        </div>
      </div>

      {/* Notes */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Notizen</h3>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
          className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/25 focus:border-white/30 focus:outline-none resize-none"
          placeholder="Notizen zum Lead..."
        />
        <button
          onClick={saveNotes}
          disabled={savingNotes}
          className="mt-3 text-sm px-4 py-2 rounded-xl border border-white/10 text-white/60 hover:border-white/20 hover:text-white transition-colors disabled:opacity-50"
        >
          {savingNotes ? "Speichert..." : "Speichern"}
        </button>
      </div>

      {/* Pipeline Timeline */}
      {lead.events.length > 0 && (
        <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Verlauf</h3>
          <div className="space-y-3">
            {lead.events
              .sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
              )
              .map((event) => (
                <div
                  key={event.id}
                  className="flex items-start gap-3 text-sm"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-white/40 mt-1.5 shrink-0" />
                  <div>
                    <span className="text-white/60">
                      {PIPELINE_LABELS[event.fromStatus as PipelineStatus]} →{" "}
                      {PIPELINE_LABELS[event.toStatus as PipelineStatus]}
                    </span>
                    {event.note && (
                      <p className="text-white/30 mt-0.5">{event.note}</p>
                    )}
                    <p className="text-white/20 text-xs mt-0.5">
                      {new Date(event.createdAt).toLocaleString("de-DE")}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
