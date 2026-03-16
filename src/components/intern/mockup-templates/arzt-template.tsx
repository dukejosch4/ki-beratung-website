interface ArztTemplateProps {
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

export function ArztTemplate({
  name,
  phone,
  address,
  city,
  faviconUrl,
}: ArztTemplateProps) {
  const primary = "#8B7355";
  const accent = "#A0896D";
  const bg = "#FAF7F2";

  return (
    <div
      className="w-[1280px] h-[800px] overflow-hidden font-sans"
      style={{ backgroundColor: bg }}
    >
      {/* Header */}
      <header
        className="flex items-center justify-between px-12 py-5"
        style={{ borderBottom: "1px solid #E8E0D4" }}
      >
        <div className="flex items-center gap-3">
          {faviconUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={faviconUrl} alt="" className="w-10 h-10 rounded-full object-cover" />
          ) : (
            <InitialsLogo name={name} color={primary} />
          )}
          <span className="text-xl font-semibold" style={{ color: primary }}>
            {name}
          </span>
        </div>
        <nav className="flex items-center gap-8 text-sm" style={{ color: "#6B5E4F" }}>
          <span>Leistungen</span>
          <span>Über uns</span>
          <span>Team</span>
          <span>Kontakt</span>
          <button
            className="px-5 py-2.5 rounded-lg text-white text-sm font-medium"
            style={{ backgroundColor: primary }}
          >
            Termin vereinbaren
          </button>
        </nav>
      </header>

      {/* Hero */}
      <section className="px-12 py-16 flex items-center gap-16">
        <div className="flex-1">
          <h1
            className="text-5xl font-bold leading-tight mb-6"
            style={{ color: "#3D3429" }}
          >
            Willkommen bei
            <br />
            <span style={{ color: primary }}>{name}</span>
          </h1>
          <p className="text-lg mb-8 leading-relaxed" style={{ color: "#6B5E4F" }}>
            Ihre Gesundheit liegt uns am Herzen. Vertrauen Sie auf unsere
            langjährige Erfahrung und individuelle Betreuung.
          </p>
          <div className="flex items-center gap-4">
            <button
              className="px-8 py-3.5 rounded-lg text-white font-semibold text-base"
              style={{ backgroundColor: primary }}
            >
              Termin vereinbaren
            </button>
            <button
              className="px-8 py-3.5 rounded-lg font-semibold text-base"
              style={{
                color: primary,
                border: `2px solid ${primary}`,
              }}
            >
              Mehr erfahren
            </button>
          </div>
        </div>
        <div
          className="w-[380px] h-[280px] rounded-2xl flex items-center justify-center"
          style={{ backgroundColor: "#EDE6DA" }}
        >
          <div className="text-center" style={{ color: accent }}>
            <svg className="w-16 h-16 mx-auto mb-3 opacity-40" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z" />
            </svg>
            <p className="text-sm opacity-60">Praxisbild</p>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="px-12 py-10" style={{ backgroundColor: "#F3EDE3" }}>
        <div className="grid grid-cols-3 gap-8">
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#E0D5C5" }}
            >
              <svg className="w-6 h-6" style={{ color: primary }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-sm" style={{ color: "#3D3429" }}>
                Zertifizierte Qualität
              </p>
              <p className="text-xs" style={{ color: "#8B7E6F" }}>
                Höchste medizinische Standards
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#E0D5C5" }}
            >
              <svg className="w-6 h-6" style={{ color: primary }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-sm" style={{ color: "#3D3429" }}>
                Kurze Wartezeiten
              </p>
              <p className="text-xs" style={{ color: "#8B7E6F" }}>
                Online-Terminbuchung verfügbar
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#E0D5C5" }}
            >
              <svg className="w-6 h-6" style={{ color: primary }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-sm" style={{ color: "#3D3429" }}>
                Einfühlsame Betreuung
              </p>
              <p className="text-xs" style={{ color: "#8B7E6F" }}>
                Individuell auf Sie abgestimmt
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-12 py-6 flex items-center justify-between" style={{ borderTop: "1px solid #E8E0D4" }}>
        <div className="text-xs" style={{ color: "#8B7E6F" }}>
          <p className="font-medium" style={{ color: "#3D3429" }}>{name}</p>
          {address && <p>{address}</p>}
          {city && <p>{city}</p>}
        </div>
        <div className="text-xs text-right" style={{ color: "#8B7E6F" }}>
          {phone && <p>{phone}</p>}
          <p>Termine nach Vereinbarung</p>
        </div>
      </footer>
    </div>
  );
}
