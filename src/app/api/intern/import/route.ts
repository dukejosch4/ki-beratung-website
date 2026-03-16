import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { db } from "@/lib/db";
import { leads } from "@/lib/db/schema";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const text = await file.text();
  const lines = text.split("\n").filter((l) => l.trim());

  if (lines.length < 2) {
    return NextResponse.json({ error: "CSV is empty" }, { status: 400 });
  }

  const headers = lines[0].split(",").map((h) => h.trim().toLowerCase());
  const now = new Date().toISOString();
  let imported = 0;

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(",").map((v) => v.trim().replace(/^"|"$/g, ""));
    const row: Record<string, string> = {};
    headers.forEach((h, idx) => {
      row[h] = values[idx] || "";
    });

    if (!row.name) continue;

    db.insert(leads).values({
      id: nanoid(),
      name: row.name,
      address: row.address || null,
      city: row.city || row.stadt || null,
      postalCode: row.postal_code || row.plz || null,
      phone: row.phone || row.telefon || null,
      email: row.email || null,
      websiteUrl: row.website_url || row.website || null,
      industry: row.industry || row.branche || "sonstige",
      category: row.category || row.kategorie || null,
      opportunityScore: 0,
      pipelineStatus: "neu",
      createdAt: now,
      updatedAt: now,
    }).run();

    imported++;
  }

  return NextResponse.json({ imported });
}
