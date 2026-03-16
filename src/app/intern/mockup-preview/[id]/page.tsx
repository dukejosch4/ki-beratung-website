import { db } from "@/lib/db";
import { leads } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { getTemplateForIndustry } from "@/lib/mockup-templates";
import { ArztTemplate } from "@/components/intern/mockup-templates/arzt-template";
import { HandwerkerTemplate } from "@/components/intern/mockup-templates/handwerker-template";
import { AnwaltTemplate } from "@/components/intern/mockup-templates/anwalt-template";
import { GastroTemplate } from "@/components/intern/mockup-templates/gastro-template";

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ favicon?: string }>;
}

export default async function MockupPreviewPage({ params, searchParams }: Props) {
  const { id } = await params;
  const { favicon } = await searchParams;

  const lead = db.select().from(leads).where(eq(leads.id, id)).get();

  if (!lead) {
    return (
      <div className="flex items-center justify-center h-screen bg-white text-black">
        <p>Lead nicht gefunden</p>
      </div>
    );
  }

  const template = getTemplateForIndustry(lead.industry);
  const faviconUrl = favicon || null;

  const templateProps = {
    name: lead.name,
    phone: lead.phone,
    address: lead.address,
    city: lead.city,
    faviconUrl,
  };

  switch (template.key) {
    case "arzt":
      return <ArztTemplate {...templateProps} />;
    case "handwerker":
      return <HandwerkerTemplate {...templateProps} />;
    case "anwalt":
      return <AnwaltTemplate {...templateProps} />;
    case "gastro":
      return <GastroTemplate {...templateProps} />;
    default:
      return <HandwerkerTemplate {...templateProps} />;
  }
}
