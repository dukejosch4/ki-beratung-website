import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { leads, pipelineEvents } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import path from "path";
import fs from "fs";

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const lead = db.select().from(leads).where(eq(leads.id, id)).get();

  if (!lead) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  try {
    // Dynamic import to avoid bundling playwright in client
    const { chromium } = await import("playwright");

    // Ensure screenshots directory exists
    const screenshotsDir = path.join(process.cwd(), "data", "screenshots");
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true });
    }

    const filename = `mockup-${id}.png`;
    const filepath = path.join(screenshotsDir, filename);

    // Extract favicon if lead has a website
    let faviconParam = "";
    if (lead.websiteUrl) {
      try {
        const { extractFavicon } = await import("@/lib/favicon");
        const faviconUrl = await extractFavicon(lead.websiteUrl);
        if (faviconUrl) {
          faviconParam = `&favicon=${encodeURIComponent(faviconUrl)}`;
        }
      } catch {
        // Favicon extraction failed — use initials fallback
      }
    }

    // Get the base URL from environment or default
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const previewUrl = `${baseUrl}/intern/mockup-preview/${id}?${faviconParam}`;

    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage({
      viewport: { width: 1280, height: 800 },
    });

    await page.goto(previewUrl, { waitUntil: "networkidle" });
    await page.screenshot({ path: filepath, type: "png" });
    await browser.close();

    const now = new Date().toISOString();

    // Update lead with screenshot path
    db.update(leads)
      .set({
        mockupScreenshotPath: filename,
        updatedAt: now,
      })
      .where(eq(leads.id, id))
      .run();

    // Auto-advance pipeline to "mockup" if currently "neu"
    if (lead.pipelineStatus === "neu") {
      db.update(leads)
        .set({ pipelineStatus: "mockup", updatedAt: now })
        .where(eq(leads.id, id))
        .run();

      db.insert(pipelineEvents)
        .values({
          id: nanoid(),
          leadId: id,
          fromStatus: "neu",
          toStatus: "mockup",
          note: "Mockup automatisch erstellt",
          createdAt: now,
        })
        .run();
    }

    const updated = db.select().from(leads).where(eq(leads.id, id)).get();
    return NextResponse.json(updated);
  } catch (err) {
    console.error("Mockup generation failed:", err);
    return NextResponse.json(
      {
        error: "Mockup-Generierung fehlgeschlagen",
        details: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
