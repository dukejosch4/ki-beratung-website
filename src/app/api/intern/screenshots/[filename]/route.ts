import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  const { filename } = await params;

  // Sanitize filename to prevent path traversal
  const sanitized = path.basename(filename);
  if (sanitized !== filename || !filename.endsWith(".png")) {
    return NextResponse.json({ error: "Invalid filename" }, { status: 400 });
  }

  const filepath = path.join(process.cwd(), "data", "screenshots", sanitized);

  if (!fs.existsSync(filepath)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const buffer = fs.readFileSync(filepath);

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
