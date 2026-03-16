import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { db } from "@/lib/db";
import { leads, pipelineEvents } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const lead = db.select().from(leads).where(eq(leads.id, id)).get();

  if (!lead) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const events = db
    .select()
    .from(pipelineEvents)
    .where(eq(pipelineEvents.leadId, id))
    .all();

  return NextResponse.json({ ...lead, events });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const now = new Date().toISOString();

  const existing = db.select().from(leads).where(eq(leads.id, id)).get();
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // If pipeline status changed, create event
  if (body.pipelineStatus && body.pipelineStatus !== existing.pipelineStatus) {
    db.insert(pipelineEvents).values({
      id: nanoid(),
      leadId: id,
      fromStatus: existing.pipelineStatus,
      toStatus: body.pipelineStatus,
      note: body.statusNote || null,
      createdAt: now,
    }).run();
  }

  const updateData: Record<string, unknown> = { updatedAt: now };

  const allowedFields = [
    "name",
    "address",
    "city",
    "postalCode",
    "phone",
    "email",
    "websiteUrl",
    "industry",
    "category",
    "notes",
    "pipelineStatus",
    "opportunityScore",
    "hasSsl",
    "isMobileResponsive",
    "pageLoadMs",
    "hasMetaTags",
    "hasStructuredData",
    "mockupScreenshotPath",
  ];

  for (const field of allowedFields) {
    if (field in body) {
      updateData[field] = body[field];
    }
  }

  db.update(leads).set(updateData).where(eq(leads.id, id)).run();

  const updated = db.select().from(leads).where(eq(leads.id, id)).get();
  return NextResponse.json(updated);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // Delete related pipeline events first
  db.delete(pipelineEvents).where(eq(pipelineEvents.leadId, id)).run();
  db.delete(leads).where(eq(leads.id, id)).run();

  return NextResponse.json({ success: true });
}
