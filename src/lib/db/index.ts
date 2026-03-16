import Database from "better-sqlite3";
import { drizzle, BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
import * as schema from "./schema";
import path from "path";
import fs from "fs";

let _db: BetterSQLite3Database<typeof schema> | null = null;

function getDb(): BetterSQLite3Database<typeof schema> {
  if (_db) return _db;

  const dataDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const dbPath = path.join(dataDir, "leads.db");
  const sqlite = new Database(dbPath);

  sqlite.pragma("journal_mode = WAL");
  sqlite.pragma("busy_timeout = 5000");
  sqlite.pragma("foreign_keys = ON");

  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS searches (
      id TEXT PRIMARY KEY,
      industry TEXT NOT NULL,
      region TEXT NOT NULL,
      radius_km INTEGER NOT NULL,
      results_count INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS leads (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      address TEXT,
      city TEXT,
      postal_code TEXT,
      phone TEXT,
      email TEXT,
      website_url TEXT,
      google_place_id TEXT UNIQUE,
      google_rating REAL,
      google_review_count INTEGER DEFAULT 0,
      category TEXT,
      industry TEXT,
      has_ssl INTEGER,
      is_mobile_responsive INTEGER,
      page_load_ms INTEGER,
      has_meta_tags INTEGER,
      has_structured_data INTEGER,
      opportunity_score INTEGER NOT NULL DEFAULT 0,
      website_screenshot_path TEXT,
      pipeline_status TEXT NOT NULL DEFAULT 'neu',
      notes TEXT,
      search_id TEXT REFERENCES searches(id),
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS pipeline_events (
      id TEXT PRIMARY KEY,
      lead_id TEXT NOT NULL REFERENCES leads(id),
      from_status TEXT NOT NULL,
      to_status TEXT NOT NULL,
      note TEXT,
      created_at TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_leads_city ON leads(city);
    CREATE INDEX IF NOT EXISTS idx_leads_pipeline_status ON leads(pipeline_status);
    CREATE INDEX IF NOT EXISTS idx_leads_opportunity_score ON leads(opportunity_score);
    CREATE INDEX IF NOT EXISTS idx_leads_search_id ON leads(search_id);
    CREATE INDEX IF NOT EXISTS idx_pipeline_events_lead_id ON pipeline_events(lead_id);
  `);

  // Migration: add mockup_screenshot_path column if missing
  try {
    sqlite.exec(`ALTER TABLE leads ADD COLUMN mockup_screenshot_path TEXT`);
  } catch {
    // Column already exists
  }

  _db = drizzle(sqlite, { schema });
  return _db;
}

export const db = new Proxy({} as BetterSQLite3Database<typeof schema>, {
  get(_target, prop) {
    const instance = getDb();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const value = (instance as any)[prop];
    if (typeof value === "function") {
      return value.bind(instance);
    }
    return value;
  },
});
