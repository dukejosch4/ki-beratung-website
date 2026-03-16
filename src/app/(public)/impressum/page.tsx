import Link from "next/link";

export default function Impressum() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-3xl mx-auto px-6 py-32">
        <Link
          href="/"
          className="text-sm text-white/40 hover:text-white transition-colors mb-12 inline-block"
        >
          &larr; Zurück zur Startseite
        </Link>

        <h1 className="text-4xl font-bold mb-12">Impressum</h1>

        <div className="space-y-8 text-white/70 leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-white mb-3">
              Angaben gemäß § 5 DDG
            </h2>
            <p>
              Booqly UG (haftungsbeschränkt)
              <br />
              Katharinenstraße 6
              <br />
              31177 Harsum
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">
              Vertreten durch
            </h2>
            <p>Geschäftsführer: Joscha Härtel</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">
              Registereintrag
            </h2>
            <p>
              Eintragung im Handelsregister
              <br />
              Registergericht: Amtsgericht Hildesheim
              <br />
              Registernummer: HRB 210314
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">
              Stammkapital
            </h2>
            <p>500,00 EUR</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">Kontakt</h2>
            <p>
              Telefon: +49 152 05279865
              <br />
              E-Mail:{" "}
              <a
                href="mailto:haertel.joscha@gmail.com"
                className="text-white underline underline-offset-4 hover:text-white/80 transition-colors"
              >
                haertel.joscha@gmail.com
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">
              Umsatzsteuer-Identifikationsnummer
            </h2>
            <p>
              Gemäß § 27a Umsatzsteuergesetz wird eine
              Umsatzsteuer-Identifikationsnummer beantragt. Diese wird nach
              Erteilung hier ergänzt.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">
              Redaktionell verantwortlich
            </h2>
            <p>
              Joscha Härtel
              <br />
              Katharinenstraße 6
              <br />
              31177 Harsum
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">
              EU-Streitschlichtung
            </h2>
            <p>
              Die Europäische Kommission stellt eine Plattform zur
              Online-Streitbeilegung (OS) bereit:{" "}
              <a
                href="https://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white underline underline-offset-4 hover:text-white/80 transition-colors"
              >
                https://ec.europa.eu/consumers/odr/
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">
              Verbraucherstreitbeilegung / Universalschlichtungsstelle
            </h2>
            <p>
              Wir sind nicht bereit oder verpflichtet, an
              Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
              teilzunehmen.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">
              Haftung für Inhalte
            </h2>
            <p>
              Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene
              Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
              verantwortlich. Nach §§ 8 bis 10 DDG sind wir als
              Diensteanbieter jedoch nicht verpflichtet, übermittelte oder
              gespeicherte fremde Informationen zu überwachen oder nach
              Umständen zu forschen, die auf eine rechtswidrige Tätigkeit
              hinweisen.
            </p>
            <p className="mt-3">
              Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
              Informationen nach den allgemeinen Gesetzen bleiben hiervon
              unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem
              Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich.
              Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir
              diese Inhalte umgehend entfernen.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">
              Haftung für Links
            </h2>
            <p>
              Unser Angebot enthält Links zu externen Websites Dritter, auf
              deren Inhalte wir keinen Einfluss haben. Deshalb können wir für
              diese fremden Inhalte auch keine Gewähr übernehmen. Für die
              Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter
              oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten
              wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße
              überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der
              Verlinkung nicht erkennbar.
            </p>
            <p className="mt-3">
              Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist
              jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht
              zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir
              derartige Links umgehend entfernen.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">
              Urheberrecht
            </h2>
            <p>
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf
              diesen Seiten unterliegen dem deutschen Urheberrecht. Die
              Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
              Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der
              schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
              Downloads und Kopien dieser Seite sind nur für den privaten, nicht
              kommerziellen Gebrauch gestattet.
            </p>
            <p className="mt-3">
              Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt
              wurden, werden die Urheberrechte Dritter beachtet. Insbesondere
              werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie
              trotzdem auf eine Urheberrechtsverletzung aufmerksam werden,
              bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von
              Rechtsverletzungen werden wir derartige Inhalte umgehend
              entfernen.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
