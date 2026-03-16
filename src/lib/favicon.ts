/**
 * Extract favicon URL from a website domain.
 * Tries /favicon.ico first, then parses <link rel="icon"> from HTML.
 */
export async function extractFavicon(
  websiteUrl: string
): Promise<string | null> {
  try {
    const url = new URL(websiteUrl);
    const origin = url.origin;

    // Try /favicon.ico
    const faviconUrl = `${origin}/favicon.ico`;
    const faviconRes = await fetch(faviconUrl, {
      method: "HEAD",
      redirect: "follow",
      signal: AbortSignal.timeout(5000),
    });

    if (
      faviconRes.ok &&
      faviconRes.headers.get("content-type")?.includes("image")
    ) {
      return faviconUrl;
    }

    // Parse HTML for <link rel="icon">
    const htmlRes = await fetch(origin, {
      redirect: "follow",
      signal: AbortSignal.timeout(5000),
    });

    if (!htmlRes.ok) return null;

    const html = await htmlRes.text();
    const iconMatch = html.match(
      /<link[^>]*rel=["'](?:shortcut )?icon["'][^>]*href=["']([^"']+)["']/i
    );

    if (iconMatch?.[1]) {
      const href = iconMatch[1];
      if (href.startsWith("http")) return href;
      if (href.startsWith("//")) return `${url.protocol}${href}`;
      if (href.startsWith("/")) return `${origin}${href}`;
      return `${origin}/${href}`;
    }

    return null;
  } catch {
    return null;
  }
}
