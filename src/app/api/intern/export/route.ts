import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { leads } from "@/lib/db/schema";

export async function GET() {
  const allLeads = db.select().from(leads).all();

  const headers = [
    "name",
    "address",
    "city",
    "postal_code",
    "phone",
    "email",
    "website_url",
    "category",
    "industry",
    "google_rating",
    "google_review_count",
    "has_ssl",
    "is_mobile_responsive",
    "page_load_ms",
    "has_meta_tags",
    "has_structured_data",
    "opportunity_score",
    "pipeline_status",
    "notes",
    "created_at",
  ];

  const csvLines = [headers.join(",")];

  for (const lead of allLeads) {
    const values = [
      lead.name,
      lead.address || "",
      lead.city || "",
      lead.postalCode || "",
      lead.phone || "",
      lead.email || "",
      lead.websiteUrl || "",
      lead.category || "",
      lead.industry || "",
      lead.googleRating?.toString() || "",
      lead.googleReviewCount?.toString() || "",
      lead.hasSsl?.toString() || "",
      lead.isMobileResponsive?.toString() || "",
      lead.pageLoadMs?.toString() || "",
      lead.hasMetaTags?.toString() || "",
      lead.hasStructuredData?.toString() || "",
      lead.opportunityScore.toString(),
      lead.pipelineStatus,
      lead.notes || "",
      lead.createdAt,
    ];

    csvLines.push(
      values.map((v) => `"${v.replace(/"/g, '""')}"`).join(",")
    );
  }

  const csv = csvLines.join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="leads-export-${new Date().toISOString().split("T")[0]}.csv"`,
    },
  });
}
