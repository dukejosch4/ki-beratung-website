"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import {
  FileText,
  Zap,
  MessageSquare,
  Globe,
  ArrowRight,
  ArrowLeft,
  Check,
  Info,
} from "lucide-react";
import {
  calculatePricing,
  type ServiceType,
  type IndustryType,
  type CompanySize,
  type DocumentVolume,
  type Infrastructure,
} from "@/lib/pricing";

/* ── Animated Counter ── */
function PriceCounter({ target }: { target: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: false });
  const [count, setCount] = useState(0);
  const prevTarget = useRef(target);

  useEffect(() => {
    if (!isInView) return;
    const from = prevTarget.current !== target ? prevTarget.current : 0;
    prevTarget.current = target;
    let frame: number;
    const duration = 800;
    const start = performance.now();
    function animate(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(from + (target - from) * eased));
      if (progress < 1) frame = requestAnimationFrame(animate);
    }
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [isInView, target]);

  return <span ref={ref}>{count.toLocaleString("de-DE")}</span>;
}

/* ── Service cards data ── */
const SERVICES: {
  id: ServiceType;
  icon: React.ReactNode;
  title: string;
  desc: string;
  from: string;
}[] = [
  {
    id: "wissensassistent",
    icon: <FileText className="w-5 h-5" />,
    title: "KI-Wissensassistent",
    desc: "Semantische Dokumentensuche mit Quellenangabe",
    from: "ab 4.900\u00A0\u20AC",
  },
  {
    id: "workflow",
    icon: <Zap className="w-5 h-5" />,
    title: "Workflow-Autopilot",
    desc: "Automatisierte Geschäftsprozesse mit KI",
    from: "ab 2.500\u00A0\u20AC",
  },
  {
    id: "kundenservice",
    icon: <MessageSquare className="w-5 h-5" />,
    title: "KI-Kundenservice",
    desc: "24/7 Chatbot trainiert auf Ihre Daten",
    from: "5.900\u00A0\u20AC",
  },
  {
    id: "webdev",
    icon: <Globe className="w-5 h-5" />,
    title: "Web-Development",
    desc: "Moderne Websites & Web-Apps mit Next.js",
    from: "ab 3.500\u00A0\u20AC",
  },
];

const SIZES: { id: CompanySize; label: string }[] = [
  { id: "1-10", label: "1–10" },
  { id: "11-50", label: "11–50" },
  { id: "51-200", label: "51–200" },
  { id: "200+", label: "200+" },
];

const DOC_VOLUMES: { id: DocumentVolume; label: string; sub: string }[] = [
  { id: "small", label: "< 1.000", sub: "Klein" },
  { id: "medium", label: "1.000–10.000", sub: "Mittel" },
  { id: "large", label: "10.000–100.000", sub: "Groß" },
  { id: "enterprise", label: "> 100.000", sub: "Enterprise" },
];

const WORKFLOW_OPTIONS = [1, 3, 5, 10];

/* ── Step indicator ── */
function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-8 sm:mb-10">
      {Array.from({ length: total }, (_, i) => {
        const step = i + 1;
        const isActive = step === current;
        const isDone = step < current;
        return (
          <div key={i} className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-300 ${
                isDone
                  ? "bg-white/15 text-white border border-white/20"
                  : isActive
                  ? "bg-white text-black border border-white"
                  : "border border-white/10 text-white/30"
              }`}
            >
              {isDone ? <Check className="w-3.5 h-3.5" /> : step}
            </div>
            {i < total - 1 && (
              <div
                className={`w-8 sm:w-12 h-px transition-colors duration-300 ${
                  isDone ? "bg-white/30" : "bg-white/10"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ── Main Component ── */
export function CostCalculator() {
  const [step, setStep] = useState(1);
  const [services, setServices] = useState<ServiceType[]>([]);
  const [industry, setIndustry] = useState<IndustryType>("standard");
  const [companySize, setCompanySize] = useState<CompanySize>("1-10");
  const [docVolume, setDocVolume] = useState<DocumentVolume>("medium");
  const [infra, setInfra] = useState<Infrastructure>("cloud");
  const [workflowCount, setWorkflowCount] = useState(3);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = back

  const hasKIService = services.some((s) => s !== "webdev");
  const needsDataStep = hasKIService;
  const totalSteps = needsDataStep ? 4 : 3;

  // Auto-select on-premise for regulated
  useEffect(() => {
    if (industry === "regulated" && hasKIService) {
      setInfra("onpremise");
    }
  }, [industry, hasKIService]);

  const result = useMemo(
    () =>
      calculatePricing({
        services,
        industry,
        companySize,
        documentVolume: docVolume,
        infrastructure: infra,
        workflowCount,
      }),
    [services, industry, companySize, docVolume, infra, workflowCount]
  );

  const canProceed =
    step === 1
      ? services.length > 0
      : step === 2
      ? true
      : step === 3 && needsDataStep
      ? true
      : true;

  function goNext() {
    if (!canProceed) return;
    setDirection(1);
    if (step === 2 && !needsDataStep) {
      setStep(4);
    } else {
      setStep((s) => Math.min(s + 1, 4));
    }
  }

  function goBack() {
    setDirection(-1);
    if (step === 4 && !needsDataStep) {
      setStep(2);
    } else {
      setStep((s) => Math.max(s - 1, 1));
    }
  }

  function toggleService(id: ServiceType) {
    setServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  }

  const isResultStep = step === 4 || (step === 3 && !needsDataStep);
  const displayStep = !needsDataStep && step === 4 ? 3 : step;

  return (
    <div className="max-w-3xl mx-auto px-6">
      <StepIndicator current={displayStep} total={totalSteps} />

      <div className="relative overflow-hidden" style={{ minHeight: "320px" }}>
        <AnimatePresence mode="wait" custom={direction}>
          {/* ── Step 1: Services ── */}
          {step === 1 && (
            <motion.div
              key="step1"
              custom={direction}
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -40 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl sm:text-2xl font-semibold text-white text-center mb-2">
                Welche Lösung benötigen Sie?
              </h3>
              <p className="text-sm text-white/40 text-center mb-8">
                Mehrfachauswahl möglich
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SERVICES.map((svc) => {
                  const selected = services.includes(svc.id);
                  return (
                    <motion.button
                      key={svc.id}
                      onClick={() => toggleService(svc.id)}
                      whileTap={{ scale: 0.97 }}
                      className={`text-left p-5 rounded-2xl border transition-all duration-200 cursor-pointer ${
                        selected
                          ? "bg-white/[0.06] border-white/30"
                          : "bg-white/[0.02] border-white/[0.08] hover:border-white/15"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-9 h-9 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                            selected
                              ? "border-white/40 text-white"
                              : "border-white/15 text-white/50"
                          }`}
                        >
                          {svc.icon}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-white">
                            {svc.title}
                          </p>
                          <p className="text-xs text-white/40 mt-0.5">
                            {svc.desc}
                          </p>
                          <p className="text-xs text-white/25 mt-1">
                            {svc.from}
                          </p>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* ── Step 2: Company ── */}
          {step === 2 && (
            <motion.div
              key="step2"
              custom={direction}
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -40 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl sm:text-2xl font-semibold text-white text-center mb-8">
                Erzählen Sie uns von Ihrem Unternehmen
              </h3>

              {/* Industry */}
              <div className="mb-8">
                <p className="text-sm text-white/50 mb-3">Branche</p>
                <div className="grid grid-cols-2 gap-3">
                  {(
                    [
                      {
                        id: "standard" as IndustryType,
                        label: "Standard",
                        sub: "Handwerk, Maschinenbau, IT, etc.",
                      },
                      {
                        id: "regulated" as IndustryType,
                        label: "Reguliert",
                        sub: "Steuerberatung, Gesundheit, Finanzen",
                      },
                    ] as const
                  ).map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setIndustry(opt.id)}
                      className={`text-left p-4 rounded-xl border transition-all cursor-pointer ${
                        industry === opt.id
                          ? "bg-white/[0.06] border-white/30"
                          : "bg-white/[0.02] border-white/[0.08] hover:border-white/15"
                      }`}
                    >
                      <p className="text-sm font-medium text-white">
                        {opt.label}
                      </p>
                      <p className="text-xs text-white/35 mt-0.5">{opt.sub}</p>
                      {opt.id === "regulated" && industry === "regulated" && hasKIService && (
                        <p className="text-[10px] text-amber-400/70 mt-2 flex items-center gap-1">
                          <Info className="w-3 h-3" /> On-Premise empfohlen
                        </p>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Company size */}
              <div>
                <p className="text-sm text-white/50 mb-3">Mitarbeiteranzahl</p>
                <div className="grid grid-cols-4 gap-2">
                  {SIZES.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setCompanySize(s.id)}
                      className={`py-3 rounded-full text-xs sm:text-sm font-medium border transition-all cursor-pointer ${
                        companySize === s.id
                          ? "bg-white/[0.08] border-white/30 text-white"
                          : "border-white/[0.08] text-white/40 hover:border-white/15"
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ── Step 3: Data & Infra (only if KI services selected) ── */}
          {step === 3 && needsDataStep && (
            <motion.div
              key="step3"
              custom={direction}
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -40 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl sm:text-2xl font-semibold text-white text-center mb-8">
                Daten & Infrastruktur
              </h3>

              {/* Document volume */}
              <div className="mb-8">
                <p className="text-sm text-white/50 mb-3">Dokumentenmenge</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {DOC_VOLUMES.map((d) => (
                    <button
                      key={d.id}
                      onClick={() => setDocVolume(d.id)}
                      className={`py-3 px-3 rounded-xl border text-center transition-all cursor-pointer ${
                        docVolume === d.id
                          ? "bg-white/[0.06] border-white/30"
                          : "bg-white/[0.02] border-white/[0.08] hover:border-white/15"
                      }`}
                    >
                      <p className="text-sm font-medium text-white">{d.label}</p>
                      <p className="text-[10px] text-white/30">{d.sub}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Infrastructure */}
              <div className="mb-8">
                <p className="text-sm text-white/50 mb-3">Infrastruktur</p>
                <div className="grid grid-cols-2 gap-3">
                  {(
                    [
                      {
                        id: "cloud" as Infrastructure,
                        label: "Cloud",
                        sub: "Hetzner DE, ab 180\u00A0\u20AC/Monat",
                      },
                      {
                        id: "onpremise" as Infrastructure,
                        label: "On-Premise",
                        sub: "Eigener Server, 4.500\u00A0\u20AC einmalig",
                      },
                    ] as const
                  ).map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setInfra(opt.id)}
                      className={`text-left p-4 rounded-xl border transition-all cursor-pointer ${
                        infra === opt.id
                          ? "bg-white/[0.06] border-white/30"
                          : "bg-white/[0.02] border-white/[0.08] hover:border-white/15"
                      }`}
                    >
                      <p className="text-sm font-medium text-white">
                        {opt.label}
                      </p>
                      <p className="text-xs text-white/35 mt-0.5">{opt.sub}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Workflow count */}
              {services.includes("workflow") && (
                <div>
                  <p className="text-sm text-white/50 mb-3">Anzahl Workflows</p>
                  <div className="flex gap-2">
                    {WORKFLOW_OPTIONS.map((n) => (
                      <button
                        key={n}
                        onClick={() => setWorkflowCount(n)}
                        className={`flex-1 py-3 rounded-full text-sm font-medium border transition-all cursor-pointer ${
                          workflowCount === n
                            ? "bg-white/[0.08] border-white/30 text-white"
                            : "border-white/[0.08] text-white/40 hover:border-white/15"
                        }`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* ── Step 4: Result ── */}
          {((step === 4) || (step === 3 && !needsDataStep)) && (
            <motion.div
              key="result"
              custom={direction}
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -40 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl sm:text-2xl font-semibold text-white text-center mb-8">
                Ihre geschätzte Investition
              </h3>

              {/* Price cards */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-4 sm:p-5 text-center">
                  <p className="text-[10px] sm:text-xs text-white/40 uppercase tracking-wider mb-2">
                    Einmalig
                  </p>
                  <p className="text-xl sm:text-3xl font-bold text-white">
                    <PriceCounter target={result.setupTotal} />
                    <span className="text-sm sm:text-lg font-normal text-white/50">
                      {" "}€
                    </span>
                  </p>
                </div>
                <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-4 sm:p-5 text-center">
                  <p className="text-[10px] sm:text-xs text-white/40 uppercase tracking-wider mb-2">
                    Monatlich
                  </p>
                  <p className="text-xl sm:text-3xl font-bold text-white">
                    <PriceCounter target={result.monthlyTotal} />
                    <span className="text-sm sm:text-lg font-normal text-white/50">
                      {" "}€
                    </span>
                  </p>
                </div>
              </div>

              {/* Breakdown */}
              <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4 mb-6">
                <p className="text-xs text-white/40 uppercase tracking-wider mb-3">
                  Aufschlüsselung
                </p>
                <div className="space-y-3 sm:space-y-2">
                  {result.breakdown.map((item, i) => (
                    <div
                      key={i}
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm gap-0.5 sm:gap-0"
                    >
                      <span className="text-white/60">{item.label}</span>
                      <div className="flex gap-3 sm:gap-4 text-right">
                        {item.setup > 0 && (
                          <span className="text-white/40 text-xs sm:text-sm">
                            {item.setup.toLocaleString("de-DE")}&nbsp;€
                          </span>
                        )}
                        {item.monthly > 0 && (
                          <span className="text-white/30 text-xs self-center">
                            +{item.monthly}&nbsp;€/M
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-2 mb-8">
                {result.notes.map((note, i) => (
                  <p
                    key={i}
                    className="text-xs text-white/35 flex items-start gap-2"
                  >
                    <Info className="w-3 h-3 shrink-0 mt-0.5" />
                    {note}
                  </p>
                ))}
              </div>

              {/* Amortisation hint */}
              {services.some((s) => s !== "webdev") && (
                <div className="text-center mb-8 py-3 px-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <p className="text-sm text-white/50">
                    Typische Amortisation: <span className="text-white font-medium">6–12 Wochen</span>
                  </p>
                </div>
              )}

              {/* CTA */}
              <div className="text-center">
                <a
                  href="https://calendly.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-white text-black font-semibold px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-sm sm:text-base hover:bg-white/90 transition-colors"
                >
                  Kostenvoranschlag anfordern
                  <ArrowRight className="w-4 h-4" />
                </a>
                <p className="text-white/25 text-xs mt-4">
                  Kostenlose 30-Min Erstberatung — wir erstellen Ihren individuellen Kostenvoranschlag
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Navigation buttons ── */}
      {!isResultStep && (
        <div className="flex items-center justify-between mt-8">
          <button
            onClick={goBack}
            disabled={step === 1}
            className={`flex items-center gap-2 text-sm transition-colors cursor-pointer ${
              step === 1
                ? "text-white/10 cursor-default"
                : "text-white/40 hover:text-white"
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            Zurück
          </button>
          <button
            onClick={goNext}
            disabled={!canProceed}
            className={`flex items-center gap-2 text-sm font-medium px-6 py-2.5 rounded-full border transition-all cursor-pointer ${
              canProceed
                ? "border-white/30 text-white hover:bg-white/5"
                : "border-white/10 text-white/20 cursor-default"
            }`}
          >
            Weiter
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
      {isResultStep && (
        <div className="flex justify-center mt-6">
          <button
            onClick={goBack}
            className="flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Angaben ändern
          </button>
        </div>
      )}
    </div>
  );
}
