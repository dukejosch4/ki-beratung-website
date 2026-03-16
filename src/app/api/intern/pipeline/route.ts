import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { db } from "@/lib/db";
import { leads, pipelineEvents } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function PATCH(request: NextRequest) {
  const { leadId, toStatus, note } = await request.json();
  const now = new Date().toISOString();

  const lead = db.select().from(leads).where(eq(leads.id, leadId)).get();
  if (!lead) {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  }

  db.insert(pipelineEvents).values({
    id: nanoid(),
    leadId,
    fromStatus: lead.pipelineStatus,
    toStatus,
    note: note || null,
    createdAt: now,
  }).run();

  db.update(leads)
    .set({ pipelineStatus: toStatus, updatedAt: now })
    .where(eq(leads.id, leadId))
    .run();

  const updated = db.select().from(leads).where(eq(leads.id, leadId)).get();
  return NextResponse.json(updated);
}
