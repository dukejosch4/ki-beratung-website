interface GastroTemplateProps {
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
      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg"
      style={{ backgroundColor: color }}
    >
      {initial}
    </div>
  );
}

export function GastroTemplate({
  name,
  phone,
  address,
  city,
  faviconUrl,
}: GastroTemplateProps) {
  const primary = "#B45309";
  const dark = "#92400E";
  const bg = "#FFF8F0";

  return (
    <div
      className="w-[1280px] h-[800px] overflow-hidden font-sans"
      style={{ backgroundColor: bg }}
    >
      {/* Header */}
      <header
        className="flex items-center justify-between px-12 py-5"
        style={{ borderBottom: "1px solid #F5E6D0" }}
      >
        <div className="flex items-center gap-3">
          {faviconUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={faviconUrl} alt="" className="w-10 h-10 rounded-full object-cover" />
          ) : (
            <InitialsLogo name={name} color={primary} />
          )}
          <span
            className="text-xl font-semibold italic"
            style={{ color: dark }}
          >
            {name}
          </span>
        </div>
        <nav className="flex items-center gap-8 text-sm" style={{ color: "#78716C" }}>
          <span>Speisekarte</span>
          <span>Über uns</span>
          <span>Galerie</span>
          <span>Kontakt</span>
          <button
            className="px-5 py-2.5 rounded-full text-white text-sm font-medium"
            style={{ backgroundColor: primary }}
          >
            Tisch reservieren
          </button>
        </nav>
      </header>

      {/* Hero */}
      <section className="px-12 py-14 flex items-center gap-16">
        <div className="flex-1">
          <p
            className="text-sm font-medium tracking-widest uppercase mb-3"
            style={{ color: primary }}
          >
            Willkommen
          </p>
          <h1
            className="text-5xl font-bold leading-tight mb-6"
            style={{ color: "#1C1917" }}
          >
            Genuss, der
            <br />
            <span style={{ color: primary }}>verbindet</span>
          </h1>
          <p className="text-lg mb-8 leading-relaxed" style={{ color: "#78716C" }}>
            {name} lädt Sie ein zu einem kulinarischen Erlebnis mit frischen
            Zutaten, kreativen Rezepten und herzlicher Gastfreundschaft.
          </p>
          <div className="flex items-center gap-4">
            <button
              className="px-8 py-3.5 rounded-full text-white font-semibold text-base"
              style={{ backgroundColor: primary }}
            >
              Tisch reservieren
            </button>
            <button
              className="px-8 py-3.5 rounded-full font-semibold text-base"
              style={{
                color: primary,
                border: `2px solid ${primary}`,
              }}
            >
              Speisekarte
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-[175px] h-[130px] rounded-xl flex items-center justify-center"
              style={{ backgroundColor: "#FDECD0" }}
            >
              <div className="text-center" style={{ color: dark }}>
                <svg className="w-8 h-8 mx-auto opacity-30" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.1 13.34l2.83-2.83L3.91 3.5a4.008 4.008 0 000 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z" />
                </svg>
                <p className="text-[10px] opacity-50 mt-1">Gericht {i}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="px-12 py-10" style={{ backgroundColor: "#FEF3E2" }}>
        <div className="grid grid-cols-3 gap-8">
          <div className="text-center">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3"
              style={{ backgroundColor: "#FDECD0" }}
            >
              <svg className="w-7 h-7" style={{ color: primary }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold mb-1" style={{ color: "#1C1917" }}>
              Öffnungszeiten
            </h3>
            <p className="text-sm" style={{ color: "#78716C" }}>
              Di-So 11:30 - 22:00 Uhr
            </p>
          </div>
          <div className="text-center">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3"
              style={{ backgroundColor: "#FDECD0" }}
            >
              <svg className="w-7 h-7" style={{ color: primary }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="font-semibold mb-1" style={{ color: "#1C1917" }}>
              Standort
            </h3>
            <p className="text-sm" style={{ color: "#78716C" }}>
              {address || "Zentrale Lage"}{city ? `, ${city}` : ""}
            </p>
          </div>
          <div className="text-center">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3"
              style={{ backgroundColor: "#FDECD0" }}
            >
              <svg className="w-7 h-7" style={{ color: primary }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 className="font-semibold mb-1" style={{ color: "#1C1917" }}>
              Reservierung
            </h3>
            <p className="text-sm" style={{ color: "#78716C" }}>
              {phone || "Rufen Sie uns an"}
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="px-12 py-5 flex items-center justify-between"
        style={{ backgroundColor: dark, color: "white" }}
      >
        <div className="text-xs text-white/60">
          <p className="font-medium text-white">{name}</p>
          {address && <p>{address}</p>}
          {city && <p>{city}</p>}
        </div>
        <div className="text-xs text-right text-white/60">
          {phone && <p className="text-white/80">{phone}</p>}
          <p>Wir freuen uns auf Ihren Besuch</p>
        </div>
      </footer>
    </div>
  );
}
