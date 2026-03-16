import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { db } from "@/lib/db";
import { leads, searches } from "@/lib/db/schema";
import { searchPlaces } from "@/lib/google-places";
import { calculateOpportunityScore } from "@/lib/scoring";
import { INDUSTRIES, REGIONS } from "@/lib/constants";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  const { industry, region, radiusKm = 10 } = await request.json();

  const regionConfig = REGIONS.find((r) => r.value === region);
  if (!regionConfig) {
    return NextResponse.json({ error: "Invalid region" }, { status: 400 });
  }

  const industryConfig = INDUSTRIES.find((i) => i.value === industry);
  if (!industryConfig) {
    return NextResponse.json({ error: "Invalid industry" }, { status: 400 });
  }

  const query = `${industryConfig.label} in ${regionConfig.label}`;

  // Create search record
  const searchId = nanoid();
  const now = new Date().toISOString();

  db.insert(searches).values({
    id: searchId,
    industry,
    region,
    radiusKm,
    resultsCount: 0,
    createdAt: now,
  }).run();

  try {
    const places = await searchPlaces(
      query,
      regionConfig.lat,
      regionConfig.lng,
      radiusKm
    );

    let insertedCount = 0;

    for (const place of places) {
      // Check for duplicates
      const existing = db
        .select()
        .from(leads)
        .where(eq(leads.googlePlaceId, place.placeId))
        .get();

      if (existing) continue;

      const score = calculateOpportunityScore({
        websiteUrl: place.websiteUrl,
        hasSsl: null,
        isMobileResponsive: null,
        pageLoadMs: null,
        hasMetaTags: null,
        hasStructuredData: null,
        industry,
        googleRating: place.rating,
        googleReviewCount: place.reviewCount,
      });

      db.insert(leads).values({
        id: nanoid(),
        name: place.name,
        address: place.address,
        city: place.city || regionConfig.label,
        postalCode: place.postalCode,
        phone: place.phone,
        websiteUrl: place.websiteUrl,
        googlePlaceId: place.placeId,
        googleRating: place.rating,
        googleReviewCount: place.reviewCount,
        category: place.category,
        industry,
        opportunityScore: score,
        pipelineStatus: "neu",
        searchId,
        createdAt: now,
        updatedAt: now,
      }).run();

      insertedCount++;
    }

    // Update search results count
    db.update(searches)
      .set({ resultsCount: insertedCount })
      .where(eq(searches.id, searchId))
      .run();

    return NextResponse.json({
      searchId,
      totalFound: places.length,
      newLeads: insertedCount,
      duplicatesSkipped: places.length - insertedCount,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Search failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
