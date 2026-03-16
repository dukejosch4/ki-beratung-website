import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { leads } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { analyzeWebsite } from "@/lib/website-analyzer";
import { calculateOpportunityScore } from "@/lib/scoring";

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const lead = db.select().from(leads).where(eq(leads.id, id)).get();

  if (!lead) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (!lead.websiteUrl) {
    // No website — score already reflects this
    const score = calculateOpportunityScore({
      websiteUrl: null,
      hasSsl: null,
      isMobileResponsive: null,
      pageLoadMs: null,
      hasMetaTags: null,
      hasStructuredData: null,
      industry: lead.industry,
      googleRating: lead.googleRating,
      googleReviewCount: lead.googleReviewCount,
    });

    db.update(leads)
      .set({
        opportunityScore: score,
        updatedAt: new Date().toISOString(),
      })
      .where(eq(leads.id, id))
      .run();

    const updated = db.select().from(leads).where(eq(leads.id, id)).get();
    return NextResponse.json(updated);
  }

  const analysis = await analyzeWebsite(lead.websiteUrl);

  const score = calculateOpportunityScore({
    websiteUrl: lead.websiteUrl,
    hasSsl: analysis.hasSsl,
    isMobileResponsive: analysis.isMobileResponsive,
    pageLoadMs: analysis.pageLoadMs,
    hasMetaTags: analysis.hasMetaTags,
    hasStructuredData: analysis.hasStructuredData,
    industry: lead.industry,
    googleRating: lead.googleRating,
    googleReviewCount: lead.googleReviewCount,
  });

  db.update(leads)
    .set({
      hasSsl: analysis.hasSsl,
      isMobileResponsive: analysis.isMobileResponsive,
      pageLoadMs: analysis.pageLoadMs,
      hasMetaTags: analysis.hasMetaTags,
      hasStructuredData: analysis.hasStructuredData,
      opportunityScore: score,
      updatedAt: new Date().toISOString(),
    })
    .where(eq(leads.id, id))
    .run();

  const updated = db.select().from(leads).where(eq(leads.id, id)).get();
  return NextResponse.json(updated);
}
