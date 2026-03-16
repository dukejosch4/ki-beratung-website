import Link from "next/link";

export default function Datenschutz() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-3xl mx-auto px-6 py-32">
        <Link
          href="/"
          className="text-sm text-white/40 hover:text-white transition-colors mb-12 inline-block"
        >
          &larr; Zurück zur Startseite
        </Link>

        <h1 className="text-4xl font-bold mb-4">Datenschutzerklärung</h1>
        <p className="text-white/40 mb-12">Stand: März 2026</p>

        <div className="space-y-10 text-white/70 leading-relaxed">
          {/* 1. Verantwortlicher */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">
              1. Verantwortlicher
            </h2>
            <p>
              Booqly UG (haftungsbeschränkt)
              <br />
              Katharinenstraße 6
              <br />
              31177 Harsum
              <br />
              <br />
              Geschäftsführer: Joscha Härtel
              <br />
              E-Mail:{" "}
              <a
                href="mailto:haertel.joscha@gmail.com"
                className="text-white underline underline-offset-4"
              >
                haertel.joscha@gmail.com
              </a>
              <br />
              Telefon: +49 152 05279865
            </p>
          </section>

          {/* 2. Überblick */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">
              2. Überblick der Verarbeitungen
            </h2>
            <p>
              Die nachfolgende Übersicht fasst die Arten der verarbeiteten Daten
              und die Zwecke ihrer Verarbeitung zusammen und verweist auf die
              betroffenen Personen.
            </p>
            <h3 className="text-base font-semibold text-white mt-4 mb-2">
              Arten der verarbeiteten Daten
            </h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Bestandsdaten (z. B. Namen, Adressen)</li>
              <li>Kontaktdaten (z. B. E-Mail, Telefonnummern)</li>
              <li>Inhaltsdaten (z. B. Eingaben in Kontaktformularen)</li>
              <li>
                Nutzungsdaten (z. B. besuchte Webseiten, Zugriffszeiten)
              </li>
              <li>
                Meta-/Kommunikationsdaten (z. B. Geräte-Informationen,
                IP-Adressen)
              </li>
            </ul>
          </section>

          {/* 3. Rechtsgrundlagen */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">
              3. Maßgebliche Rechtsgrundlagen
            </h2>
            <p>
              Nachfolgend erhalten Sie eine Übersicht der Rechtsgrundlagen der
              DSGVO, auf deren Basis wir personenbezogene Daten verarbeiten:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li>
                <strong className="text-white">
                  Vertragserfüllung und vorvertragliche Anfragen (Art. 6 Abs. 1
                  lit. b DSGVO)
                </strong>{" "}
                — Verarbeitung ist für die Erfüllung eines Vertrags oder zur
                Durchführung vorvertraglicher Maßnahmen erforderlich.
              </li>
              <li>
                <strong className="text-white">
                  Berechtigte Interessen (Art. 6 Abs. 1 lit. f DSGVO)
                </strong>{" "}
                — Verarbeitung ist zur Wahrung der berechtigten Interessen des
                Verantwortlichen erforderlich, sofern nicht die Interessen oder
                Grundrechte der betroffenen Person überwiegen.
              </li>
            </ul>
          </section>

          {/* 4. Hosting */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">
              4. Bereitstellung des Onlineangebots und Webhosting
            </h2>
            <p>
              Wir verarbeiten die Daten der Nutzer, um ihnen unsere
              Online-Dienste zur Verfügung stellen zu können. Zu diesem Zweck
              verarbeiten wir die IP-Adresse des Nutzers, die notwendig ist, um
              die Inhalte und Funktionen unserer Online-Dienste an den Browser
              bzw. das Endgerät der Nutzer zu übermitteln.
            </p>
            <h3 className="text-base font-semibold text-white mt-4 mb-2">
              Hosting bei Vercel
            </h3>
            <p>
              Unser Onlineangebot wird bei Vercel Inc., 340 S Lemon Ave #4133,
              Walnut, CA 91789, USA gehostet. Vercel verarbeitet die oben
              genannten Daten in unserem Auftrag. Die Datenverarbeitung kann
              auch außerhalb der EU/des EWR stattfinden. Die Übermittlung
              personenbezogener Daten in die USA wird auf Grundlage des
              EU-US Data Privacy Framework (DPF) vorgenommen, an dem Vercel
              teilnimmt.
            </p>
            <p className="mt-3">
              <strong className="text-white">Verarbeitete Datenarten:</strong>{" "}
              Nutzungsdaten, Meta-/Kommunikationsdaten (IP-Adressen,
              Zugriffszeiten, Browser-Typ).
              <br />
              <strong className="text-white">Rechtsgrundlage:</strong>{" "}
              Berechtigte Interessen (Art. 6 Abs. 1 lit. f DSGVO).
            </p>
          </section>

          {/* 5. Kontaktaufnahme */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">
              5. Kontaktaufnahme
            </h2>
            <p>
              Bei der Kontaktaufnahme mit uns (z. B. per E-Mail, Telefon oder
              über ein Terminbuchungstool) werden die Angaben der anfragenden
              Person verarbeitet, soweit dies zur Beantwortung der
              Kontaktanfragen und etwaiger angefragter Maßnahmen erforderlich
              ist.
            </p>
            <p className="mt-3">
              <strong className="text-white">Verarbeitete Datenarten:</strong>{" "}
              Kontaktdaten, Inhaltsdaten, Bestandsdaten.
              <br />
              <strong className="text-white">Betroffene Personen:</strong>{" "}
              Kommunikationspartner.
              <br />
              <strong className="text-white">Rechtsgrundlage:</strong>{" "}
              Vertragserfüllung und vorvertragliche Anfragen (Art. 6 Abs. 1
              lit. b DSGVO), berechtigte Interessen (Art. 6 Abs. 1 lit. f
              DSGVO).
            </p>
          </section>

          {/* 6. Terminbuchung */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">
              6. Terminbuchung über Calendly
            </h2>
            <p>
              Wir nutzen den Dienst Calendly (Calendly LLC, 3423 Piedmont Road
              NE, Atlanta, GA 30305, USA) zur Terminvereinbarung. Bei der
              Buchung eines Termins werden die von Ihnen eingegebenen Daten
              (Name, E-Mail-Adresse, ggf. Telefonnummer, Terminwunsch) an
              Calendly übermittelt und dort verarbeitet.
            </p>
            <p className="mt-3">
              <strong className="text-white">Rechtsgrundlage:</strong>{" "}
              Vertragserfüllung und vorvertragliche Anfragen (Art. 6 Abs. 1
              lit. b DSGVO).
              <br />
              <strong className="text-white">Datenschutzhinweise:</strong>{" "}
              Weitere Informationen finden Sie in der Datenschutzerklärung von
              Calendly.
            </p>
          </section>

          {/* 7. Keine Cookies */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">
              7. Cookies und Tracking
            </h2>
            <p>
              Unsere Website verwendet keine Tracking-Cookies, keine
              Analyse-Tools (wie Google Analytics) und keine
              Marketing-Technologien. Es werden keine Nutzerprofile erstellt und
              kein Tracking-basiertes Targeting durchgeführt.
            </p>
            <p className="mt-3">
              Es können technisch notwendige Cookies durch den Hosting-Anbieter
              gesetzt werden, die für die Bereitstellung der Website erforderlich
              sind. Diese Cookies enthalten keine personenbezogenen Daten und
              dienen nicht der Nutzerverfolgung.
            </p>
          </section>

          {/* 8. Rechte */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">
              8. Rechte der betroffenen Personen
            </h2>
            <p>
              Ihnen stehen als Betroffene nach der DSGVO verschiedene Rechte zu,
              die sich insbesondere aus Art. 15 bis 21 DSGVO ergeben:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li>
                <strong className="text-white">Auskunftsrecht (Art. 15 DSGVO):</strong>{" "}
                Sie haben das Recht, eine Bestätigung darüber zu verlangen, ob
                Sie betreffende personenbezogene Daten verarbeitet werden.
              </li>
              <li>
                <strong className="text-white">
                  Recht auf Berichtigung (Art. 16 DSGVO):
                </strong>{" "}
                Sie haben das Recht, die Berichtigung unrichtiger Daten und die
                Vervollständigung unvollständiger Daten zu verlangen.
              </li>
              <li>
                <strong className="text-white">
                  Recht auf Löschung (Art. 17 DSGVO):
                </strong>{" "}
                Sie haben das Recht, die Löschung Ihrer personenbezogenen Daten
                zu verlangen, sofern die Voraussetzungen hierfür vorliegen.
              </li>
              <li>
                <strong className="text-white">
                  Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO):
                </strong>{" "}
                Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer
                Daten zu verlangen.
              </li>
              <li>
                <strong className="text-white">
                  Recht auf Datenübertragbarkeit (Art. 20 DSGVO):
                </strong>{" "}
                Sie haben das Recht, Ihre Daten in einem strukturierten,
                gängigen und maschinenlesbaren Format zu erhalten.
              </li>
              <li>
                <strong className="text-white">
                  Widerspruchsrecht (Art. 21 DSGVO):
                </strong>{" "}
                Sie haben das Recht, jederzeit gegen die Verarbeitung Ihrer
                Daten Widerspruch einzulegen, wenn die Verarbeitung auf Art. 6
                Abs. 1 lit. f DSGVO beruht.
              </li>
              <li>
                <strong className="text-white">
                  Beschwerderecht bei einer Aufsichtsbehörde (Art. 77 DSGVO):
                </strong>{" "}
                Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde
                zu beschweren. Die für uns zuständige Aufsichtsbehörde ist:
                <br />
                <span className="mt-2 block">
                  Die Landesbeauftragte für den Datenschutz Niedersachsen
                  <br />
                  Prinzenstraße 5, 30159 Hannover
                  <br />
                  Telefon: +49 511 120-4500
                </span>
              </li>
            </ul>
          </section>

          {/* 9. Auftragsverarbeitung */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">
              9. Datenverarbeitung im Rahmen von Kundenaufträgen
            </h2>
            <p>
              Im Rahmen unserer KI-Dienstleistungen (Wissensassistenten,
              Workflow-Automatisierung, Chatbots) verarbeiten wir
              personenbezogene Daten unserer Kunden ausschließlich im Auftrag
              und nach Weisung des jeweiligen Kunden. Die Verarbeitung erfolgt
              auf Grundlage eines Auftragsverarbeitungsvertrags (AVV) gemäß
              Art. 28 DSGVO.
            </p>
            <p className="mt-3">
              Die KI-Systeme werden auf der Infrastruktur des Kunden
              (On-Premise) oder in deutschen Rechenzentren betrieben. Es erfolgt
              keine Übermittlung von Kundendaten an Drittländer, sofern nicht
              ausdrücklich vereinbart und durch geeignete Garantien abgesichert.
            </p>
          </section>

          {/* 10. Änderungen */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">
              10. Änderung dieser Datenschutzerklärung
            </h2>
            <p>
              Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit
              sie stets den aktuellen rechtlichen Anforderungen entspricht oder
              um Änderungen unserer Leistungen in der Datenschutzerklärung
              umzusetzen. Für Ihren erneuten Besuch gilt dann die neue
              Datenschutzerklärung.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
