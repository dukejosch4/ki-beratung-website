"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView } from "motion/react";
import Link from "next/link";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { BeamsBackground } from "@/components/ui/beams-background";
import { CostCalculator } from "@/components/ui/cost-calculator";
import {
  Search,
  Brain,
  Repeat,
  Shield,
  Code2,
  Euro,
  MapPin,
  ChevronDown,
  ArrowRight,
  Target,
  FileText,
  Zap,
  MessageSquare,
  Globe,
  Phone,
  ClipboardCheck,
  Wrench,
  Headphones,
  Plus,
  Menu,
  X,
  Calculator,
} from "lucide-react";

/* ═══════════════════════════════════════════
   ANIMATED COMPONENTS
   ═══════════════════════════════════════════ */

function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 0.68, 0, 1] }}
      viewport={{ once: true, margin: "-80px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function AnimatedCounter({
  target,
  suffix = "",
}: {
  target: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let frame: number;
    const duration = 1500;
    const start = performance.now();

    function animate(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(animate);
    }
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

function FAQItem({
  question,
  answer,
  index,
}: {
  question: string;
  answer: string;
  index: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <FadeUp delay={index * 0.08}>
      <div
        className={`border border-white/10 rounded-2xl overflow-hidden transition-colors duration-300 ${
          open ? "bg-white/[0.03]" : "bg-white/[0.035] hover:bg-white/[0.03]"
        }`}
      >
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between gap-6 px-8 py-6 text-left cursor-pointer group"
        >
          <span className="text-lg font-medium text-white group-hover:text-white/90 transition-colors">
            {question}
          </span>
          <span
            className={`shrink-0 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center transition-all duration-300 ${
              open ? "rotate-45 bg-white/10" : ""
            }`}
          >
            <Plus className="w-4 h-4 text-white" />
          </span>
        </button>
        <div
          style={{
            display: "grid",
            gridTemplateRows: open ? "1fr" : "0fr",
            opacity: open ? 1 : 0,
            transition: "grid-template-rows 0.3s ease, opacity 0.3s ease",
          }}
        >
          <div style={{ overflow: "hidden" }}>
            <p className="px-8 pb-6 text-white/50 leading-relaxed">{answer}</p>
          </div>
        </div>
      </div>
    </FadeUp>
  );
}

/* ═══════════════════════════════════════════
   SCROLL VIDEO COMPONENT
   ═══════════════════════════════════════════ */

function StickyVideo({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    const v = video;
    const c = container;

    v.load();
    v.pause();

    function scrub() {
      if (!v.duration || isNaN(v.duration)) return;
      const rect = c.getBoundingClientRect();
      const vh = window.innerHeight;
      // Video 0%: when container top hits viewport center
      // Video 100%: when container bottom hits viewport center
      const center = vh * 0.5;
      const progress = Math.max(0, Math.min(1, (center - rect.top) / rect.height));
      const targetTime = progress * v.duration;
      if (Math.abs(v.currentTime - targetTime) > 0.05) {
        v.currentTime = targetTime;
      }
    }

    function onScroll() {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(scrub);
    }

    function startListening() {
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }

    if (v.readyState >= 2) {
      startListening();
    } else {
      v.addEventListener("loadeddata", startListening, { once: true });
    }

    return () => {
      v.removeEventListener("loadeddata", startListening);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [containerRef]);

  return (
    <div
      style={{
        position: "sticky",
        top: "5rem",
      }}
    >
      <FadeUp>
        <p className="text-xs uppercase tracking-[0.35em] text-white/40 mb-3">
          Ihr KI-System
        </p>
        <h3 className="text-xl font-semibold text-white mb-1">
          Schicht für Schicht
        </h3>
        <p className="text-sm text-white/30 mb-4">
          100% auf Ihrem Server
        </p>
      </FadeUp>
      <div className="rounded-2xl border border-white/10" style={{ overflow: "clip", maxHeight: "65vh" }}>
        <video
          ref={videoRef}
          src="/hero-assembly.mp4"
          muted
          playsInline
          preload="auto"
          className="w-full block"
          style={{ maxHeight: "65vh", objectFit: "cover" }}
        />
      </div>
      <div className="flex justify-between mt-3 text-[10px] uppercase tracking-[0.15em] text-white/20">
        <span>Docs</span>
        <span>OCR</span>
        <span>Vektoren</span>
        <span>KI</span>
        <span>Chat</span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MOBILE SCROLL VIDEO
   ═══════════════════════════════════════════ */

function MobileScrollVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    const v = video;
    const c = container;

    v.load();
    v.pause();

    function scrub() {
      if (!v.duration || isNaN(v.duration)) return;
      const rect = c.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = Math.max(0, Math.min(1, (vh * 0.5 - rect.top) / rect.height));
      const targetTime = progress * v.duration;
      if (Math.abs(v.currentTime - targetTime) > 0.05) {
        v.currentTime = targetTime;
      }
    }

    function onScroll() {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(scrub);
    }

    function startListening() {
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }

    if (v.readyState >= 2) {
      startListening();
    } else {
      v.addEventListener("loadeddata", startListening, { once: true });
    }

    return () => {
      v.removeEventListener("loadeddata", startListening);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div ref={containerRef} className="lg:hidden" style={{ minHeight: "150vh" }}>
      <div style={{ position: "sticky", top: "4rem" }} className="px-6 pb-8">
        <FadeUp>
          <p className="text-xs uppercase tracking-[0.35em] text-white/40 text-center mb-3">
            Ihr KI-System
          </p>
          <h3 className="text-xl font-semibold text-white text-center mb-1">
            Schicht für Schicht
          </h3>
          <p className="text-sm text-white/30 text-center mb-4">
            100% auf Ihrem Server
          </p>
        </FadeUp>
        <div className="rounded-2xl border border-white/10 max-w-sm mx-auto" style={{ overflow: "clip" }}>
          <video
            ref={videoRef}
            src="/hero-assembly.mp4"
            muted
            playsInline
            preload="auto"
            className="w-full block"
          />
        </div>
        <div className="flex justify-between mt-3 max-w-sm mx-auto text-[10px] uppercase tracking-[0.15em] text-white/20">
          <span>Docs</span>
          <span>OCR</span>
          <span>Vektoren</span>
          <span>KI</span>
          <span>Chat</span>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   STICKY VIDEO SECTION (two-column layout)
   ═══════════════════════════════════════════ */

function StickyVideoSection({
  handleCardGlow,
}: {
  handleCardGlow: (e: React.MouseEvent<HTMLDivElement>) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  const products = [
    {
      icon: <Target className="w-5 h-5" />,
      badge: "EINSTIEG",
      title: "KI-Potenzialanalyse",
      price: "1.490 €",
      desc: "Halbtägiger Workshop + Bericht mit 3 priorisierten Use Cases.",
      features: ["ROI-Berechnung", "DSGVO-Bewertung", "Wird bei Folgeauftrag angerechnet"],
      highlight: false,
    },
    {
      icon: <FileText className="w-5 h-5" />,
      badge: "FLAGGSCHIFF",
      title: "KI-Wissensassistent",
      price: "ab 4.900 €",
      desc: "Mitarbeiter fragen, System durchsucht alle Dokumente semantisch.",
      features: ["Quellenangabe bei jeder Antwort", "DSGVO-konform, On-Premise", "PDFs, Word, E-Mails & mehr"],
      highlight: true,
    },
    {
      icon: <Zap className="w-5 h-5" />,
      badge: null,
      title: "Workflow-Autopilot",
      price: "ab 2.500 €",
      desc: "Rechnungen, E-Mails, Angebote — automatisch verarbeitet.",
      features: ["n8n-basiert, 350+ Integrationen", "Human-in-the-Loop", "3er-Paket ab 6.900 €"],
      highlight: false,
    },
    {
      icon: <MessageSquare className="w-5 h-5" />,
      badge: null,
      title: "KI-Kundenservice",
      price: "5.900 €",
      desc: "Chatbot auf Ihrer Website, trainiert auf Ihre Daten.",
      features: ["24/7 verfügbar", "Übergabe an Mensch", "Einbettbares React-Widget"],
      highlight: false,
    },
    {
      icon: <Globe className="w-5 h-5" />,
      badge: "NEU",
      title: "Web-Development",
      price: "ab 3.500 €",
      desc: "Moderne Websites & Web-Apps — performant, responsive, SEO-optimiert.",
      features: ["Next.js & React", "Referenzen: trainsense.fit, cortexboard.de", "Hosting & Wartung inklusive"],
      highlight: false,
    },
  ];

  const steps = [
    { num: "01", icon: <Phone className="w-4 h-4" />, title: "Erstgespräch", desc: "30 Minuten, kostenlos. Wir verstehen Ihre Herausforderung." },
    { num: "02", icon: <ClipboardCheck className="w-4 h-4" />, title: "Potenzialanalyse", desc: "Halbtägiger Workshop vor Ort. 3 Use Cases mit ROI." },
    { num: "03", icon: <Wrench className="w-4 h-4" />, title: "Implementierung", desc: "2-4 Wochen. Schlüsselfertiges System." },
    { num: "04", icon: <Headphones className="w-4 h-4" />, title: "Laufender Betrieb", desc: "Retainer ab 350€/Monat. Wir kümmern uns." },
  ];

  return (
    <div id="leistungen">
      {/* ── Section header (full width, OUTSIDE the scroll container) ── */}
      <div className="max-w-7xl mx-auto px-6 pt-20 sm:pt-32 pb-10 sm:pb-16">
        <FadeUp>
          <p className="text-xs uppercase tracking-[0.35em] text-white/40 text-center mb-4">
            Unsere Lösungen
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white text-center mb-4">
            Fünf Lösungen. Ein Ziel:
            <br />
            Ihr Wettbewerbsvorteil.
          </h2>
        </FadeUp>
      </div>

      {/* ── Two-column: Content left, Video right ── */}
      <div
        ref={containerRef}
        style={{ position: "relative", overflow: "visible" }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-12">
          {/* LEFT: Content column */}
          <div className="flex-1 min-w-0 pb-16 lg:pb-24">
            {/* Products (stacked vertically on the left) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-16 sm:mb-24">
              {products.map((product, i) => (
                <FadeUp key={i} delay={i * 0.1} className={i === products.length - 1 && products.length % 2 !== 0 ? "sm:col-span-2" : ""}>
                  <div
                    onMouseMove={handleCardGlow}
                    className={`card-glow relative rounded-2xl p-5 sm:p-6 border transition-all duration-300 h-full ${
                      product.highlight
                        ? "bg-white/[0.04] border-white/20 shadow-[0_0_60px_rgba(255,255,255,0.06)]"
                        : "bg-white/[0.035] border-white/10 hover:border-white/20"
                    }`}
                  >
                    {product.badge && (
                      <span className={`absolute top-5 right-5 text-[10px] uppercase tracking-[0.2em] px-3 py-1 rounded-full border ${
                        product.highlight ? "border-white/30 text-white" : "border-white/10 text-white/50"
                      }`}>
                        {product.badge}
                      </span>
                    )}
                    <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white mb-5">
                      {product.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-1">{product.title}</h3>
                    <p className="text-xl font-bold text-white mb-3">{product.price}</p>
                    <p className="text-white/40 text-sm leading-relaxed mb-4">{product.desc}</p>
                    <ul className="space-y-1.5">
                      {product.features.map((f, j) => (
                        <li key={j} className="flex items-center gap-2 text-sm text-white/50">
                          <div className="w-1 h-1 rounded-full bg-white/40" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <a href="#kontakt" className="inline-flex items-center gap-1 text-sm text-white/60 hover:text-white mt-5 transition-colors group">
                      Mehr erfahren
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </FadeUp>
              ))}
            </div>

            {/* Process Steps */}
            <div className="mb-8">
              <FadeUp>
                <p className="text-xs uppercase tracking-[0.35em] text-white/40 mb-4">
                  So funktioniert&apos;s
                </p>
                <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-12">
                  In 4 Schritten zur KI-Lösung
                </h2>
              </FadeUp>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {steps.map((step, i) => (
                  <FadeUp key={i} delay={i * 0.1}>
                    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 hover:border-white/15 transition-all duration-300">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/60 shrink-0">
                          {step.icon}
                        </div>
                        <span className="text-sm font-mono text-white/25">{step.num}</span>
                      </div>
                      <h3 className="text-base font-semibold text-white mb-1">{step.title}</h3>
                      <p className="text-sm text-white/40 leading-relaxed">{step.desc}</p>
                    </div>
                  </FadeUp>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Sticky video (desktop only) */}
          <div className="hidden lg:block w-[340px] shrink-0" id="architektur">
            <StickyVideo containerRef={containerRef} />
          </div>
          </div>
        </div>
      </div>

      {/* Mobile: Scroll-driven video */}
      <MobileScrollVideo />
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════ */

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleCardGlow = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty(
      "--mouse-x",
      `${e.clientX - rect.left}px`
    );
    e.currentTarget.style.setProperty(
      "--mouse-y",
      `${e.clientY - rect.top}px`
    );
  }, []);

  return (
    <main className="min-h-screen bg-black relative">
      {/* ── Noise grain overlay ── */}
      <div className="noise-overlay" />

      {/* ── Beams ambient background ── */}
      <BeamsBackground intensity="subtle" />

      {/* ─── Navigation ─── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-black/80 backdrop-blur-xl border-b border-white/5"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a
            href="#"
            className="text-white font-semibold text-lg tracking-tight"
          >
            KI-BERATUNG
          </a>

          <div className="hidden md:flex items-center gap-8 text-sm text-white/50">
            <a
              href="#leistungen"
              className="hover:text-white transition-colors duration-300"
            >
              Leistungen
            </a>
            <a
              href="#architektur"
              className="hover:text-white transition-colors duration-300"
            >
              Technologie
            </a>
            <a
              href="#vorteile"
              className="hover:text-white transition-colors duration-300"
            >
              Vorteile
            </a>
            <a
              href="#kostenrechner"
              className="hover:text-white transition-colors duration-300"
            >
              Preise
            </a>
            <a
              href="#faq"
              className="hover:text-white transition-colors duration-300"
            >
              FAQ
            </a>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="#kontakt"
              className="hidden md:inline-flex items-center gap-2 border border-white/20 hover:border-white/40 hover:bg-white/5 text-white text-sm font-medium px-5 py-2 rounded-full transition-all duration-300"
            >
              Erstberatung buchen
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white p-1"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className="md:hidden bg-black/95 backdrop-blur-xl border-b border-white/5"
          style={{
            display: "grid",
            gridTemplateRows: mobileMenuOpen ? "1fr" : "0fr",
            opacity: mobileMenuOpen ? 1 : 0,
            transition: "grid-template-rows 0.3s ease, opacity 0.3s ease",
          }}
        >
          <div style={{ overflow: "hidden" }}>
            <div className="px-6 py-6 flex flex-col gap-4">
              {[
                { label: "Leistungen", href: "leistungen" },
                { label: "Technologie", href: "architektur" },
                { label: "Vorteile", href: "vorteile" },
                { label: "Preise", href: "kostenrechner" },
                { label: "FAQ", href: "faq" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={`#${item.href}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-white/60 hover:text-white text-lg transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#kontakt"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 inline-flex items-center justify-center border border-white/20 text-white text-sm font-medium px-5 py-3 rounded-full"
              >
                Erstberatung buchen
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* ─── Hero ─── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <BackgroundPaths />

        <div className="relative max-w-6xl mx-auto px-6 pt-32 pb-20 w-full">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="inline-flex items-center gap-2 border border-white/10 rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-white/50 mb-8">
                <div className="w-1.5 h-1.5 rounded-full bg-white/50 animate-pulse" />
                Förderfähig über BAFA & Digitalbonus
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 0.68, 0, 1] }}
              className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-[1.1] mb-6 tracking-tight"
            >
              KI-Lösungen, die
              <br />
              wirklich funktionieren.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-lg sm:text-xl text-white/60 leading-relaxed mb-10 max-w-xl"
            >
              Schlüsselfertige KI-Systeme für KMU in Hildesheim & Hannover.
              DSGVO-konform. Lokal gehostet. Sofort einsatzbereit.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a
                href="#kontakt"
                className="inline-flex items-center justify-center gap-2 bg-white text-black font-semibold px-8 py-4 rounded-full text-base hover:bg-white/90 transition-colors"
              >
                Kostenlose Erstberatung
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#architektur"
                className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-medium px-8 py-4 rounded-full text-base hover:bg-white/5 transition-all"
              >
                Demo ansehen
              </a>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-5 h-5 text-white/20" />
          </motion.div>
        </motion.div>
      </section>

      {/* ─── Problem / 91% ─── */}
      <section className="py-20 sm:py-32 relative bg-grid">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_30%,rgba(255,255,255,0.04),transparent)]" />
        <div className="relative max-w-6xl mx-auto px-6">
          <FadeUp>
            <p className="text-xs uppercase tracking-[0.35em] text-white/40 text-center mb-6 sm:mb-8">
              Das Problem
            </p>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="text-center mb-10 sm:mb-16">
              <span className="text-[5rem] sm:text-[10rem] lg:text-[12rem] font-bold text-white leading-none tracking-tighter">
                <AnimatedCounter target={91} suffix="%" />
              </span>
              <p className="text-xl sm:text-2xl text-white/50 mt-2">
                der KMUs haben kein KI-Team
              </p>
            </div>
          </FadeUp>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                icon: <Search className="w-5 h-5" />,
                title: "Stundenlange Dokumentensuche",
                desc: "Mitarbeiter verbringen 2-3 Stunden täglich mit der Suche nach internen Informationen.",
              },
              {
                icon: <Brain className="w-5 h-5" />,
                title: "Wissen in einzelnen Köpfen",
                desc: "Wenn ein Schlüsselmitarbeiter ausfällt, geht kritisches Know-how verloren.",
              },
              {
                icon: <Repeat className="w-5 h-5" />,
                title: "Repetitive Routineaufgaben",
                desc: "60-80% der Arbeitszeit fließt in Aufgaben, die automatisierbar wären.",
              },
            ].map((item, i) => (
              <FadeUp key={i} delay={0.15 + i * 0.1}>
                <div
                  onMouseMove={handleCardGlow}
                  className="card-glow bg-white/[0.05] border border-white/[0.12] rounded-2xl p-8 hover:border-white/25 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white mb-6">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Two-Column Layout: Content (left) + Sticky Video (right) ═══ */}
      <StickyVideoSection handleCardGlow={handleCardGlow} />

      {/* ─── USP / Trust ─── */}
      <section id="vorteile" className="py-20 sm:py-32 relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_20%,rgba(255,255,255,0.06),transparent)]" />
        <div className="relative max-w-6xl mx-auto px-6">
          <FadeUp>
            <p className="text-xs uppercase tracking-[0.35em] text-white/40 text-center mb-4">
              Warum wir
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-white text-center mb-10 sm:mb-16">
              Ihre Daten. Ihre Kontrolle.
            </h2>
          </FadeUp>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                icon: <Shield className="w-5 h-5" />,
                title: "DSGVO by Design",
                desc: "Alle Daten bleiben auf Ihrem Server. Open-Source-Modelle, lokal gehostet.",
              },
              {
                icon: <Code2 className="w-5 h-5" />,
                title: "Open Source",
                desc: "Kein Vendor Lock-in. Volle Kontrolle über Ihre KI-Infrastruktur.",
              },
              {
                icon: <Euro className="w-5 h-5" />,
                title: "KMU-Preise",
                desc: "Enterprise-Qualität ohne Enterprise-Budget. Ab 4.900€.",
              },
              {
                icon: <MapPin className="w-5 h-5" />,
                title: "Regionale Nähe",
                desc: "Vor Ort in Hildesheim & Hannover. Persönlicher Kontakt.",
              },
            ].map((item, i) => (
              <FadeUp key={i} delay={i * 0.1} className="h-full">
                <div className="text-center p-4 sm:p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] h-full">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/15 bg-white/[0.05] flex items-center justify-center text-white/80 mx-auto mb-3 sm:mb-5">
                    {item.icon}
                  </div>
                  <h3 className="text-sm sm:text-base font-semibold text-white mb-1 sm:mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/50 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Kostenrechner ─── */}
      <section id="kostenrechner" className="py-20 sm:py-32 relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_30%,rgba(255,255,255,0.04),transparent)]" />
        <div className="relative">
          <FadeUp>
            <div className="text-center px-6 mb-10 sm:mb-14">
              <p className="text-xs uppercase tracking-[0.35em] text-white/40 mb-4">
                Kostenrechner
              </p>
              <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-3">
                Was kostet Ihre KI-Lösung?
              </h2>
              <p className="text-white/40 max-w-lg mx-auto">
                Unverbindliche Schätzung in 60 Sekunden — individueller Kostenvoranschlag im Erstgespräch.
              </p>
            </div>
          </FadeUp>
          <FadeUp delay={0.15}>
            <CostCalculator />
          </FadeUp>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section id="faq" className="py-20 sm:py-32 relative bg-grid">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_30%_at_50%_0%,rgba(255,255,255,0.04),transparent)]" />
        <div className="relative max-w-3xl mx-auto px-6">
          <FadeUp>
            <p className="text-xs uppercase tracking-[0.35em] text-white/40 text-center mb-4">
              Häufige Fragen
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-white text-center mb-10 sm:mb-16">
              Ihre Bedenken — unsere Antworten
            </h2>
          </FadeUp>

          <div className="space-y-3">
            {[
              {
                q: "Ist das DSGVO-konform?",
                a: "Ja, zu 100%. Alle Systeme laufen auf Ihrem eigenen Server oder in deutschen Rechenzentren. Wir verwenden ausschließlich Open-Source-Modelle — keine Daten fließen an Drittanbieter. Jede Lösung wird mit vollständiger Datenschutz-Dokumentation ausgeliefert: AV-Vertrag, Verfahrensverzeichnis, TOM-Dokument.",
              },
              {
                q: "Wir haben kein IT-Know-how im Haus.",
                a: "Brauchen Sie auch nicht. Wir liefern schlüsselfertige Lösungen inklusive Hosting, Wartung und Support. Ihre Mitarbeiter nutzen das System über eine einfache Chat-Oberfläche — die Schulung dauert 2 Stunden.",
              },
              {
                q: "Unsere Daten sind chaotisch und unstrukturiert.",
                a: "Das ist bei 90% unserer Kunden der Fall — und genau dafür sind unsere Systeme gebaut. Sie arbeiten mit PDFs, Word, Excel, E-Mails und sogar eingescannten Dokumenten. Die Datenaufbereitung übernehmen wir.",
              },
              {
                q: "Ist KI nicht eine Black Box?",
                a: "Nicht bei uns. Jede Antwort enthält die exakte Quellenangabe — Sie sehen, aus welchem Dokument die Information stammt. Bei Unsicherheit sagt das System ehrlich: 'Dazu habe ich keine Information.'",
              },
              {
                q: "Wie schnell amortisiert sich die Investition?",
                a: "Typischerweise in 6-12 Wochen. Beispiel: Ein Wissensassistent spart pro Mitarbeiter 30-60 Minuten täglich bei der Informationssuche. Bei 10 Mitarbeitern und 50€ Stundensatz sind das 12.500-25.000€ Einsparung pro Monat.",
              },
            ].map((item, i) => (
              <FAQItem key={i} question={item.q} answer={item.a} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── Team ─── */}
      <section className="py-20 sm:py-32 relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_50%,rgba(255,255,255,0.03),transparent)]" />
        <div className="relative max-w-4xl mx-auto px-6">
          <FadeUp>
            <p className="text-xs uppercase tracking-[0.35em] text-white/40 text-center mb-4">
              Team
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-white text-center mb-10 sm:mb-16">
              Menschen, die KI verstehen
            </h2>
          </FadeUp>

          <div className="grid grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                img: "/team-joscha.jpg",
                name: "Joscha Haertel",
                role: "Strategie & KI-Infrastruktur",
              },
              {
                img: "/team-lukas.jpeg",
                name: "Lucas Dönges",
                role: "Backend & KI-Infrastruktur",
                objectPos: "center 35%",
              },
              {
                img: "/team-fabian.jpeg",
                name: "Fabian Otto",
                role: "Frontend & Automatisierung",
                objectPos: "center 20%",
              },
            ].map((member, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <div className="text-center">
                  <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full border border-white/10 overflow-hidden mx-auto mb-3 sm:mb-4">
                    <img
                      src={member.img}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      style={{ objectPosition: member.objectPos || "center top" }}
                    />
                  </div>
                  <h3 className="text-sm sm:text-base font-semibold text-white">
                    {member.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/40">{member.role}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section id="kontakt" className="py-20 sm:py-32 relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(255,255,255,0.07),transparent)]" />

        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <FadeUp>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white mb-6">
              Bereit für KI,
              <br />
              die funktioniert?
            </h2>
            <p className="text-lg text-white/40 mb-10 max-w-xl mx-auto">
              Starten Sie mit einer kostenlosen 30-Minuten Erstberatung. Konkret,
              praxisnah, ohne Verkaufsdruck.
            </p>
          </FadeUp>

          <FadeUp delay={0.15}>
            <a
              href="https://calendly.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white text-black font-semibold px-10 py-4 rounded-full text-lg hover:bg-white/90 transition-colors"
            >
              Termin buchen
              <ArrowRight className="w-5 h-5" />
            </a>
            <p className="text-white/30 text-sm mt-6">
              Oder schreiben Sie uns:{" "}
              <a
                href="mailto:kontakt@ki-beratung.de"
                className="text-white/50 hover:text-white underline underline-offset-4 transition-colors"
              >
                kontakt@ki-beratung.de
              </a>
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t border-white/5 py-12 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <span className="text-white/30 text-sm font-medium">
                KI-BERATUNG
              </span>
              <span className="text-white/15 text-sm">
                &copy; {new Date().getFullYear()}
              </span>
            </div>

            <div className="flex items-center gap-6 text-sm text-white/30">
              <Link
                href="/impressum"
                className="hover:text-white/60 transition-colors"
              >
                Impressum
              </Link>
              <Link
                href="/datenschutz"
                className="hover:text-white/60 transition-colors"
              >
                Datenschutz
              </Link>
              <Link href="/agb" className="hover:text-white/60 transition-colors">
                AGB
              </Link>
            </div>

            <div className="text-xs text-white/20">
              Förderfähig über BAFA & Digitalbonus.Niedersachsen
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
