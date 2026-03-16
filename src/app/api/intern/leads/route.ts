import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { db } from "@/lib/db";
import { leads } from "@/lib/db/schema";
import { desc, asc, eq, like, sql } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "50");
  const sort = searchParams.get("sort") || "opportunity_score";
  const order = searchParams.get("order") || "desc";
  const status = searchParams.get("status");
  const industry = searchParams.get("industry");
  const city = searchParams.get("city");
  const search = searchParams.get("search");
  const hasWebsite = searchParams.get("hasWebsite");

  const offset = (page - 1) * limit;

  const conditions: ReturnType<typeof eq>[] = [];

  if (status) {
    conditions.push(eq(leads.pipelineStatus, status));
  }
  if (industry) {
    conditions.push(eq(leads.industry, industry));
  }
  if (city) {
    conditions.push(eq(leads.city, city));
  }
  if (search) {
    conditions.push(like(leads.name, `%${search}%`));
  }
  if (hasWebsite === "true") {
    conditions.push(sql`${leads.websiteUrl} IS NOT NULL`);
  } else if (hasWebsite === "false") {
    conditions.push(sql`${leads.websiteUrl} IS NULL`);
  }

  const analyzed = searchParams.get("analyzed");
  if (analyzed === "false") {
    conditions.push(sql`${leads.hasSsl} IS NULL AND ${leads.websiteUrl} IS NOT NULL`);
  }

  const where =
    conditions.length > 0
      ? sql`${sql.join(conditions, sql` AND `)}`
      : undefined;

  const sortColumn =
    sort === "name"
      ? leads.name
      : sort === "city"
        ? leads.city
        : sort === "created_at"
          ? leads.createdAt
          : sort === "pipeline_status"
            ? leads.pipelineStatus
            : leads.opportunityScore;

  const orderFn = order === "asc" ? asc : desc;

  const results = db
    .select()
    .from(leads)
    .where(where)
    .orderBy(orderFn(sortColumn))
    .limit(limit)
    .offset(offset)
    .all();

  const countResult = db
    .select({ count: sql<number>`count(*)` })
    .from(leads)
    .where(where)
    .get();

  const total = countResult?.count ?? 0;

  return NextResponse.json({
    leads: results,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const now = new Date().toISOString();

  const id = nanoid();
  db.insert(leads).values({
    id,
    name: body.name,
    address: body.address || null,
    city: body.city || null,
    postalCode: body.postalCode || null,
    phone: body.phone || null,
    email: body.email || null,
    websiteUrl: body.websiteUrl || null,
    industry: body.industry || "sonstige",
    category: body.category || null,
    opportunityScore: 0,
    pipelineStatus: "neu",
    createdAt: now,
    updatedAt: now,
  }).run();

  const lead = db.select().from(leads).where(eq(leads.id, id)).get();

  return NextResponse.json(lead, { status: 201 });
}
