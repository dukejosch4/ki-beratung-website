import Link from "next/link";

export default function AGB() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-3xl mx-auto px-6 py-32">
        <Link
          href="/"
          className="text-sm text-white/40 hover:text-white transition-colors mb-12 inline-block"
        >
          &larr; Zurück zur Startseite
        </Link>

        <h1 className="text-4xl font-bold mb-4">
          Allgemeine Geschäftsbedingungen
        </h1>
        <p className="text-white/40 mb-12">Stand: März 2026</p>

        <div className="space-y-10 text-white/70 leading-relaxed">
          {/* §1 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">
              § 1 Geltungsbereich
            </h2>
            <p>
              (1) Diese Allgemeinen Geschäftsbedingungen (nachfolgend „AGB")
              gelten für alle Verträge zwischen der Booqly UG
              (haftungsbeschränkt), Katharinenstraße 6, 31177 Harsum
              (nachfolgend „Auftragnehmer") und dem jeweiligen Kunden
              (nachfolgend „Auftraggeber") über die Erbringung von
              KI-Beratungs- und Implementierungsleistungen.
            </p>
            <p className="mt-3">
              (2) Es gelten ausschließlich diese AGB. Abweichende,
              entgegenstehende oder ergänzende Allgemeine Geschäftsbedingungen
              des Auftraggebers werden nur dann und insoweit
              Vertragsbestandteil, als der Auftragnehmer ihrer Geltung
              ausdrücklich schriftlich zugestimmt hat.
            </p>
            <p className="mt-3">
              (3) Diese AGB richten sich ausschließlich an Unternehmer im Sinne
              von § 14 BGB.
            </p>
          </section>

          {/* §2 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">
              § 2 Vertragsgegenstand
            </h2>
            <p>
              (1) Der Auftragnehmer erbringt KI-Dienstleistungen, insbesondere:
            </p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>KI-Potenzialanalysen und Workshops</li>
              <li>
                Entwicklung und Implementierung von KI-Wissensassistenten
                (RAG-Systeme)
              </li>
              <li>
                Workflow-Automatisierung mittels KI-gestützter Prozesse
              </li>
              <li>
                KI-basierte Kundenservice-Chatbots
              </li>
              <li>
                Laufende Betreuung und Wartung (Retainer)
              </li>
            </ul>
            <p className="mt-3">
              (2) Der genaue Leistungsumfang ergibt sich aus dem jeweiligen
              individuellen Angebot bzw. der Leistungsbeschreibung.
            </p>
          </section>

          {/* §3 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">
              § 3 Vertragsschluss
            </h2>
            <p>
              (1) Die Darstellung der Leistungen auf der Website stellt kein
              verbindliches Angebot dar, sondern eine Aufforderung zur Abgabe
              eines Angebots (invitatio ad offerendum).
            </p>
            <p className="mt-3">
              (2) Der Vertrag kommt durch Unterzeichnung eines individuellen
              Angebots durch beide Parteien oder durch schriftliche
              Auftragsbestätigung des Auftragnehmers zustande.
            </p>
            <p className="mt-3">
              (3) Mündliche Nebenabreden bestehen nicht. Änderungen und
              Ergänzungen des Vertrages bedürfen der Schriftform. Dies gilt
              auch für die Aufhebung dieser Schriftformklausel.
            </p>
          </section>

          {/* §4 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">
              § 4 Vergütung und Zahlungsbedingungen
            </h2>
            <p>
              (1) Die Vergütung richtet sich nach dem jeweiligen individuellen
              Angebot. Alle genannten Preise verstehen sich als Nettopreise
              zuzüglich der jeweils geltenden gesetzlichen Umsatzsteuer.
            </p>
            <p className="mt-3">
              (2) Einmalige Leistungen werden wie folgt fällig: 50 % bei
              Auftragserteilung, 50 % bei Abnahme der Leistung.
            </p>
            <p className="mt-3">
              (3) Laufende Leistungen (Retainer) werden monatlich im Voraus in
              Rechnung gestellt.
            </p>
            <p className="mt-3">
              (4) Rechnungen sind innerhalb von 14 Tagen nach Rechnungsstellung
              ohne Abzug zur Zahlung fällig.
            </p>
            <p className="mt-3">
              (5) Die bei der KI-Potenzialanalyse gezahlte Vergütung wird bei
              Beauftragung eines Folgeprojekts innerhalb von 3 Monaten
              vollständig auf die Vergütung des Folgeprojekts angerechnet.
            </p>
          </section>

          {/* §5 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">
              § 5 Mitwirkungspflichten des Auftraggebers
            </h2>
            <p>
              (1) Der Auftraggeber stellt dem Auftragnehmer alle für die
              Leistungserbringung erforderlichen Informationen, Dokumente,
              Daten und Zugänge rechtzeitig und kostenfrei zur Verfügung.
            </p>
            <p className="mt-3">
              (2) Der Auftraggeber benennt einen Ansprechpartner, der
              befugt ist, im Rahmen des Projekts verbindliche Entscheidungen zu
              treffen.
            </p>
            <p className="mt-3">
              (3) Verzögerungen, die durch eine verspätete oder unvollständige
              Mitwirkung des Auftraggebers entstehen, gehen nicht zulasten des
              Auftragnehmers. Vereinbarte Termine verschieben sich entsprechend.
            </p>
          </section>

          {/* §6 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">
              § 6 Leistungserbringung und Abnahme
            </h2>
            <p>
              (1) Der Auftragnehmer erbringt die Leistungen nach bestem
              fachlichen Wissen und Gewissen unter Berücksichtigung des
              aktuellen Stands der Technik.
            </p>
            <p className="mt-3">
              (2) Liefertermine sind nur verbindlich, wenn sie vom Auftragnehmer
              ausdrücklich schriftlich als verbindlich bestätigt wurden.
            </p>
            <p className="mt-3">
              (3) Nach Fertigstellung einer Leistung wird der Auftraggeber zur
              Abnahme aufgefordert. Die Abnahme gilt als erfolgt, wenn der
              Auftraggeber nicht innerhalb von 14 Tagen nach Aufforderung
              schriftlich begründete Mängel rügt.
            </p>
            <p className="mt-3">
              (4) KI-Systeme liefern Ergebnisse auf Basis der vom Auftraggeber
              bereitgestellten Daten. Der Auftragnehmer übernimmt keine
              Gewähr für die inhaltliche Richtigkeit der KI-generierten
              Ausgaben. Die Überprüfung und Freigabe der Ergebnisse obliegt
              dem Auftraggeber.
            </p>
          </section>

          {/* §7 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">
              § 7 Nutzungsrechte und geistiges Eigentum
            </h2>
            <p>
              (1) Der Auftraggeber erhält nach vollständiger Zahlung ein
              einfaches, zeitlich unbeschränktes Nutzungsrecht an den
              individuell erstellten Konfigurationen und Anpassungen.
            </p>
            <p className="mt-3">
              (2) Die eingesetzten Open-Source-Komponenten (u. a. Ollama,
              Qdrant, n8n, Open WebUI, Haystack) unterliegen ihren
              jeweiligen Open-Source-Lizenzen. Der Auftragnehmer erwirbt
              hieran keine eigenen Rechte und kann daher keine Rechte über die
              jeweilige Lizenz hinaus einräumen.
            </p>
            <p className="mt-3">
              (3) Wiederverwendbare Methoden, Frameworks und generische
              Vorlagen, die der Auftragnehmer im Rahmen der Leistungserbringung
              einsetzt oder entwickelt, verbleiben im geistigen Eigentum des
              Auftragnehmers.
            </p>
          </section>

          {/* §8 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">
              § 8 Datenschutz und Vertraulichkeit
            </h2>
            <p>
              (1) Der Auftragnehmer verpflichtet sich, alle ihm im Rahmen
              des Vertragsverhältnisses bekannt werdenden
              Geschäftsgeheimnisse und vertraulichen Informationen des
              Auftraggebers vertraulich zu behandeln und nicht an Dritte
              weiterzugeben. Diese Pflicht gilt auch über das Ende des
              Vertragsverhältnisses hinaus.
            </p>
            <p className="mt-3">
              (2) Soweit im Rahmen der Leistungserbringung personenbezogene
              Daten im Auftrag des Auftraggebers verarbeitet werden, schließen
              die Parteien einen Auftragsverarbeitungsvertrag gemäß Art. 28
              DSGVO.
            </p>
            <p className="mt-3">
              (3) Der Auftragnehmer setzt KI-Systeme ausschließlich auf der
              Infrastruktur des Auftraggebers (On-Premise) oder in deutschen
              bzw. europäischen Rechenzentren ein. Eine Übermittlung von
              Kundendaten an Server außerhalb der EU/des EWR erfolgt nicht,
              sofern nicht ausdrücklich vereinbart.
            </p>
          </section>

          {/* §9 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">
              § 9 Gewährleistung
            </h2>
            <p>
              (1) Der Auftragnehmer gewährleistet, dass die Leistungen der
              vereinbarten Leistungsbeschreibung entsprechen.
            </p>
            <p className="mt-3">
              (2) Mängel sind vom Auftraggeber unverzüglich nach Entdeckung
              schriftlich unter Beschreibung des Mangels anzuzeigen.
            </p>
            <p className="mt-3">
              (3) Bei berechtigten Mängelrügen ist der Auftragnehmer zur
              Nacherfüllung berechtigt. Die Nacherfüllung erfolgt nach Wahl des
              Auftragnehmers durch Beseitigung des Mangels oder Neuerbringung
              der Leistung.
            </p>
            <p className="mt-3">
              (4) Die Gewährleistungsfrist beträgt 12 Monate ab Abnahme der
              Leistung.
            </p>
          </section>

          {/* §10 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">
              § 10 Haftung
            </h2>
            <p>
              (1) Der Auftragnehmer haftet unbeschränkt für Schäden aus der
              Verletzung des Lebens, des Körpers oder der Gesundheit, die auf
              einer vorsätzlichen oder fahrlässigen Pflichtverletzung beruhen,
              sowie für Schäden, die auf vorsätzlichem oder grob fahrlässigem
              Verhalten beruhen.
            </p>
            <p className="mt-3">
              (2) Bei leicht fahrlässiger Verletzung wesentlicher
              Vertragspflichten (Kardinalpflichten) ist die Haftung auf den
              vertragstypischen, vorhersehbaren Schaden begrenzt.
            </p>
            <p className="mt-3">
              (3) Im Übrigen ist die Haftung für leichte Fahrlässigkeit
              ausgeschlossen.
            </p>
            <p className="mt-3">
              (4) Die Haftung nach dem Produkthaftungsgesetz bleibt unberührt.
            </p>
            <p className="mt-3">
              (5) Der Auftragnehmer haftet nicht für die inhaltliche
              Richtigkeit von KI-generierten Ausgaben. Die Verantwortung für
              geschäftliche Entscheidungen auf Basis von KI-Ergebnissen liegt
              beim Auftraggeber.
            </p>
          </section>

          {/* §11 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">
              § 11 Laufzeit und Kündigung
            </h2>
            <p>
              (1) Einmalige Projektaufträge enden mit der Abnahme der
              vereinbarten Leistung.
            </p>
            <p className="mt-3">
              (2) Retainer-Verträge (laufende Betreuung) haben eine
              Mindestlaufzeit von 3 Monaten und verlängern sich automatisch um
              jeweils einen weiteren Monat, sofern sie nicht mit einer Frist
              von 4 Wochen zum Ende eines Kalendermonats gekündigt werden.
            </p>
            <p className="mt-3">
              (3) Das Recht zur außerordentlichen Kündigung aus wichtigem Grund
              bleibt unberührt.
            </p>
            <p className="mt-3">
              (4) Kündigungen bedürfen der Schriftform (E-Mail genügt).
            </p>
          </section>

          {/* §12 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">
              § 12 Referenznennung
            </h2>
            <p>
              Der Auftragnehmer ist berechtigt, den Auftraggeber als
              Referenzkunden zu nennen und das Projekt in anonymisierter Form
              in Fallstudien darzustellen, sofern der Auftraggeber dem nicht
              ausdrücklich widerspricht.
            </p>
          </section>

          {/* §13 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">
              § 13 Schlussbestimmungen
            </h2>
            <p>
              (1) Es gilt das Recht der Bundesrepublik Deutschland unter
              Ausschluss des UN-Kaufrechts (CISG).
            </p>
            <p className="mt-3">
              (2) Gerichtsstand für alle Streitigkeiten aus oder im
              Zusammenhang mit diesem Vertrag ist — soweit gesetzlich
              zulässig — Hildesheim.
            </p>
            <p className="mt-3">
              (3) Sollten einzelne Bestimmungen dieser AGB unwirksam oder
              undurchführbar sein oder werden, so bleibt die Wirksamkeit der
              übrigen Bestimmungen davon unberührt. An die Stelle der
              unwirksamen oder undurchführbaren Bestimmung tritt diejenige
              wirksame und durchführbare Regelung, deren Wirkungen der
              wirtschaftlichen Zielsetzung am nächsten kommen, die die
              Vertragsparteien mit der unwirksamen bzw. undurchführbaren
              Bestimmung verfolgt haben (salvatorische Klausel).
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
