import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";

export const searches = sqliteTable("searches", {
  id: text("id").primaryKey(),
  industry: text("industry").notNull(),
  region: text("region").notNull(),
  radiusKm: integer("radius_km").notNull(),
  resultsCount: integer("results_count").notNull().default(0),
  createdAt: text("created_at").notNull(),
});

export const leads = sqliteTable("leads", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  address: text("address"),
  city: text("city"),
  postalCode: text("postal_code"),
  phone: text("phone"),
  email: text("email"),
  websiteUrl: text("website_url"),
  googlePlaceId: text("google_place_id").unique(),
  googleRating: real("google_rating"),
  googleReviewCount: integer("google_review_count").default(0),
  category: text("category"),
  industry: text("industry"),
  hasSsl: integer("has_ssl", { mode: "boolean" }),
  isMobileResponsive: integer("is_mobile_responsive", { mode: "boolean" }),
  pageLoadMs: integer("page_load_ms"),
  hasMetaTags: integer("has_meta_tags", { mode: "boolean" }),
  hasStructuredData: integer("has_structured_data", { mode: "boolean" }),
  opportunityScore: integer("opportunity_score").notNull().default(0),
  websiteScreenshotPath: text("website_screenshot_path"),
  mockupScreenshotPath: text("mockup_screenshot_path"),
  pipelineStatus: text("pipeline_status").notNull().default("neu"),
  notes: text("notes"),
  searchId: text("search_id").references(() => searches.id),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

export const pipelineEvents = sqliteTable("pipeline_events", {
  id: text("id").primaryKey(),
  leadId: text("lead_id")
    .notNull()
    .references(() => leads.id),
  fromStatus: text("from_status").notNull(),
  toStatus: text("to_status").notNull(),
  note: text("note"),
  createdAt: text("created_at").notNull(),
});
