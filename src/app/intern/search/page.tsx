import { PageShell } from "@/components/intern/layout/page-shell";
import { SearchForm } from "@/components/intern/search/search-form";
import { FullScan } from "@/components/intern/search/full-scan";

export default function SearchPage() {
  return (
    <PageShell
      title="Lead-Suche"
      subtitle="Lokale Unternehmen über Google Places finden"
    >
      <div className="space-y-8">
        <FullScan />

        <div>
          <h3 className="text-xs uppercase tracking-[0.35em] text-white/40 mb-4">
            Einzelne Suche
          </h3>
          <SearchForm />
        </div>
      </div>
    </PageShell>
  );
}
