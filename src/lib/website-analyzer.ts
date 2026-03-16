export interface AnalysisResult {
  hasSsl: boolean;
  isMobileResponsive: boolean;
  pageLoadMs: number;
  hasMetaTags: boolean;
  hasStructuredData: boolean;
  finalUrl: string;
}

export async function analyzeWebsite(url: string): Promise<AnalysisResult> {
  let normalizedUrl = url;
  if (!normalizedUrl.startsWith("http")) {
    normalizedUrl = `https://${normalizedUrl}`;
  }

  const startTime = Date.now();
  let html = "";
  let finalUrl = normalizedUrl;
  let hasSsl = false;

  try {
    const response = await fetch(normalizedUrl, {
      redirect: "follow",
      signal: AbortSignal.timeout(10000),
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; veqtis-analyzer/1.0; +https://veqtis.de)",
      },
    });

    finalUrl = response.url;
    hasSsl = finalUrl.startsWith("https://");
    html = await response.text();
  } catch {
    // If HTTPS fails, try HTTP
    try {
      const httpUrl = normalizedUrl.replace("https://", "http://");
      const response = await fetch(httpUrl, {
        redirect: "follow",
        signal: AbortSignal.timeout(10000),
        headers: {
          "User-Agent":
            "Mozilla/5.0 (compatible; veqtis-analyzer/1.0; +https://veqtis.de)",
        },
      });
      finalUrl = response.url;
      hasSsl = finalUrl.startsWith("https://");
      html = await response.text();
    } catch {
      return {
        hasSsl: false,
        isMobileResponsive: false,
        pageLoadMs: 10000,
        hasMetaTags: false,
        hasStructuredData: false,
        finalUrl: normalizedUrl,
      };
    }
  }

  const pageLoadMs = Date.now() - startTime;

  // Check for viewport meta tag (mobile responsiveness)
  const isMobileResponsive =
    /meta[^>]*name=["']viewport["'][^>]*content=["'][^"']*width/i.test(html);

  // Check for title and meta description
  const hasTitle = /<title[^>]*>[^<]+<\/title>/i.test(html);
  const hasDescription =
    /<meta[^>]*name=["']description["'][^>]*content=["'][^"']+["']/i.test(
      html
    );
  const hasMetaTags = hasTitle && hasDescription;

  // Check for JSON-LD structured data
  const hasStructuredData =
    /type=["']application\/ld\+json["']/i.test(html);

  return {
    hasSsl,
    isMobileResponsive,
    pageLoadMs,
    hasMetaTags,
    hasStructuredData,
    finalUrl,
  };
}
