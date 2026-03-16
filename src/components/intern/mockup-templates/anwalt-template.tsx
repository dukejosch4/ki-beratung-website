interface AnwaltTemplateProps {
  name: string;
  phone: string | null;
  address: string | null;
  city: string | null;
  faviconUrl: string | null;
}

function InitialsLogo({ name, color }: { name: string; color: string }) {
  const initial = name.charAt(0).toUpperCase();
  return (
    <div
      className="w-10 h-10 rounded flex items-center justify-center text-white font-bold text-lg"
      style={{ backgroundColor: color }}
    >
      {initial}
    </div>
  );
}

export function AnwaltTemplate({
  name,
  phone,
  address,
  city,
  faviconUrl,
}: AnwaltTemplateProps) {
  const primary = "#1E3A5F";
  const accent = "#2D5A8E";
  const bg = "#F5F7FA";

  return (
    <div
      className="w-[1280px] h-[800px] overflow-hidden font-sans"
      style={{ backgroundColor: bg }}
    >
      {/* Header */}
      <header
        className="flex items-center justify-between px-12 py-5"
        style={{ backgroundColor: "#FFFFFF", borderBottom: "2px solid #E2E8F0" }}
      >
        <div className="flex items-center gap-3">
          {faviconUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={faviconUrl} alt="" className="w-10 h-10 rounded object-cover" />
          ) : (
            <InitialsLogo name={name} color={primary} />
          )}
          <div>
            <span className="text-lg font-bold" style={{ color: primary }}>
              {name}
            </span>
            <p className="text-[10px] tracking-widest uppercase" style={{ color: "#94A3B8" }}>
              Rechtsberatung
            </p>
          </div>
        </div>
        <nav className="flex items-center gap-8 text-sm" style={{ color: "#64748B" }}>
          <span>Rechtsgebiete</span>
          <span>Kanzlei</span>
          <span>Team</span>
          <span>Kontakt</span>
          <button
            className="px-5 py-2.5 rounded text-white text-sm font-medium"
            style={{ backgroundColor: primary }}
          >
            Erstberatung anfragen
          </button>
        </nav>
      </header>

      {/* Hero */}
      <section className="flex">
        <div className="flex-1 px-12 py-16">
          <h1
            className="text-4xl font-bold leading-tight mb-6"
            style={{ color: primary }}
          >
            Kompetente
            <br />
            Rechtsberatung
            <br />
            <span style={{ color: accent }}>mit Weitblick</span>
          </h1>
          <p className="text-base mb-8 leading-relaxed max-w-lg" style={{ color: "#64748B" }}>
            {name} steht für fundierte juristische Expertise, strategisches
            Denken und persönliche Betreuung. Wir finden die beste Lösung für
            Ihre Situation.
          </p>
          <button
            className="px-8 py-3.5 rounded text-white font-semibold text-base"
            style={{ backgroundColor: primary }}
          >
            Kostenlose Erstberatung
          </button>
        </div>
        <div
          className="w-[420px] flex items-center justify-center"
          style={{ backgroundColor: primary }}
        >
          <div className="text-center text-white/40">
            <svg className="w-20 h-20 mx-auto mb-3 opacity-30" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
            </svg>
            <p className="text-sm">Kanzleibild</p>
          </div>
        </div>
      </section>

      {/* Competencies */}
      <section className="px-12 py-10 bg-white">
        <h2 className="text-xl font-bold mb-6" style={{ color: primary }}>
          Unsere Kompetenzen
        </h2>
        <div className="grid grid-cols-4 gap-5">
          {[
            "Arbeitsrecht",
            "Vertragsrecht",
            "Familienrecht",
            "Handelsrecht",
            "Mietrecht",
            "Strafrecht",
            "Erbrecht",
            "Gesellschaftsrecht",
          ].map((area) => (
            <div
              key={area}
              className="flex items-center gap-3 py-3 px-4 rounded"
              style={{ backgroundColor: "#F1F5F9" }}
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: accent }}
              />
              <span className="text-sm font-medium" style={{ color: "#334155" }}>
                {area}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer
        className="px-12 py-5 flex items-center justify-between"
        style={{ backgroundColor: primary }}
      >
        <div className="text-xs text-white/60">
          <p className="font-medium text-white">{name}</p>
          {address && <p>{address}</p>}
          {city && <p>{city}</p>}
        </div>
        <div className="text-xs text-right text-white/60">
          {phone && <p className="text-white/80">{phone}</p>}
          <p>Termine nach Vereinbarung</p>
        </div>
      </footer>
    </div>
  );
}
