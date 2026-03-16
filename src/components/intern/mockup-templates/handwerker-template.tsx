interface HandwerkerTemplateProps {
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
      className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-lg"
      style={{ backgroundColor: color }}
    >
      {initial}
    </div>
  );
}

export function HandwerkerTemplate({
  name,
  phone,
  address,
  city,
  faviconUrl,
}: HandwerkerTemplateProps) {
  const primary = "#D97706";
  const dark = "#92400E";
  const bg = "#FFFBF0";

  return (
    <div
      className="w-[1280px] h-[800px] overflow-hidden font-sans"
      style={{ backgroundColor: bg }}
    >
      {/* Header */}
      <header
        className="flex items-center justify-between px-12 py-5"
        style={{ borderBottom: "1px solid #F0E6D0" }}
      >
        <div className="flex items-center gap-3">
          {faviconUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={faviconUrl} alt="" className="w-10 h-10 rounded-lg object-cover" />
          ) : (
            <InitialsLogo name={name} color={primary} />
          )}
          <span className="text-xl font-bold" style={{ color: "#1C1917" }}>
            {name}
          </span>
        </div>
        <nav className="flex items-center gap-8 text-sm" style={{ color: "#57534E" }}>
          <span>Leistungen</span>
          <span>Projekte</span>
          <span>Über uns</span>
          <span>Kontakt</span>
          <button
            className="px-5 py-2.5 rounded-lg text-white text-sm font-semibold"
            style={{ backgroundColor: primary }}
          >
            Kostenlose Anfrage
          </button>
        </nav>
      </header>

      {/* Hero */}
      <section className="px-12 py-14 flex items-center gap-16">
        <div className="flex-1">
          <div
            className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4"
            style={{ backgroundColor: "#FEF3C7", color: dark }}
          >
            Meisterbetrieb
          </div>
          <h1
            className="text-5xl font-bold leading-tight mb-6"
            style={{ color: "#1C1917" }}
          >
            Qualität, auf die
            <br />
            Sie{" "}
            <span style={{ color: primary }}>zählen können</span>
          </h1>
          <p className="text-lg mb-8 leading-relaxed" style={{ color: "#57534E" }}>
            {name} — Ihr zuverlässiger Partner für fachgerechte Handwerksarbeit
            in der Region. Termingerecht, sauber und in höchster Qualität.
          </p>
          <div className="flex items-center gap-4">
            <button
              className="px-8 py-3.5 rounded-lg text-white font-semibold text-base"
              style={{ backgroundColor: primary }}
            >
              Jetzt Anfrage stellen
            </button>
            <button
              className="px-8 py-3.5 rounded-lg font-semibold text-base"
              style={{
                color: primary,
                border: `2px solid ${primary}`,
              }}
            >
              Projekte ansehen
            </button>
          </div>
        </div>
        <div
          className="w-[380px] h-[280px] rounded-2xl flex items-center justify-center"
          style={{ backgroundColor: "#FEF3C7" }}
        >
          <div className="text-center" style={{ color: dark }}>
            <svg className="w-16 h-16 mx-auto mb-3 opacity-40" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z" />
            </svg>
            <p className="text-sm opacity-60">Projektbild</p>
          </div>
        </div>
      </section>

      {/* Service Cards */}
      <section className="px-12 py-10" style={{ backgroundColor: "#FEF9EE" }}>
        <div className="grid grid-cols-3 gap-6">
          {[
            {
              title: "Beratung & Planung",
              desc: "Kostenlose Erstberatung und detaillierte Projektplanung für Ihr Vorhaben.",
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              ),
            },
            {
              title: "Fachgerechte Ausführung",
              desc: "Qualifizierte Handwerksmeister garantieren erstklassige Ergebnisse.",
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ),
            },
            {
              title: "Garantie & Service",
              desc: "Langfristige Gewährleistung und schneller Kundenservice nach Abschluss.",
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              ),
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-xl p-6"
              style={{ border: "1px solid #F0E6D0" }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                style={{ backgroundColor: "#FEF3C7", color: primary }}
              >
                {item.icon}
              </div>
              <h3 className="font-semibold mb-2" style={{ color: "#1C1917" }}>
                {item.title}
              </h3>
              <p className="text-sm" style={{ color: "#78716C" }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer
        className="px-12 py-5 flex items-center justify-between"
        style={{ backgroundColor: "#1C1917" }}
      >
        <div className="text-xs text-white/60">
          <p className="font-medium text-white">{name}</p>
          {address && <p>{address}</p>}
          {city && <p>{city}</p>}
        </div>
        <div className="text-xs text-right text-white/60">
          {phone && <p className="text-white/80">{phone}</p>}
          <p>Kostenlose Beratung vor Ort</p>
        </div>
      </footer>
    </div>
  );
}
