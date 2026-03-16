export interface PlaceResult {
  placeId: string;
  name: string;
  address: string;
  city: string;
  postalCode: string;
  phone: string | null;
  websiteUrl: string | null;
  rating: number | null;
  reviewCount: number;
  category: string;
}

interface PlacesTextSearchResponse {
  places?: Array<{
    id: string;
    displayName?: { text: string };
    formattedAddress?: string;
    nationalPhoneNumber?: string;
    websiteUri?: string;
    rating?: number;
    userRatingCount?: number;
    primaryTypeDisplayName?: { text: string };
    addressComponents?: Array<{
      longText: string;
      types: string[];
    }>;
  }>;
  nextPageToken?: string;
}

export async function searchPlaces(
  query: string,
  lat: number,
  lng: number,
  radiusKm: number
): Promise<PlaceResult[]> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) {
    throw new Error("GOOGLE_PLACES_API_KEY is not set");
  }

  const allResults: PlaceResult[] = [];
  let pageToken: string | undefined;

  // Fetch up to 3 pages (max 60 results)
  for (let page = 0; page < 3; page++) {
    const body: Record<string, unknown> = {
      textQuery: query,
      locationBias: {
        circle: {
          center: { latitude: lat, longitude: lng },
          radius: radiusKm * 1000,
        },
      },
      languageCode: "de",
      maxResultCount: 20,
    };

    if (pageToken) {
      body.pageToken = pageToken;
    }

    const response = await fetch(
      "https://places.googleapis.com/v1/places:searchText",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask":
            "places.id,places.displayName,places.formattedAddress,places.nationalPhoneNumber,places.websiteUri,places.rating,places.userRatingCount,places.primaryTypeDisplayName,places.addressComponents,nextPageToken",
        },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Google Places API error: ${response.status} ${error}`);
    }

    const data: PlacesTextSearchResponse = await response.json();

    if (data.places) {
      for (const place of data.places) {
        const cityComponent = place.addressComponents?.find((c) =>
          c.types.includes("locality")
        );
        const postalComponent = place.addressComponents?.find((c) =>
          c.types.includes("postal_code")
        );

        allResults.push({
          placeId: place.id,
          name: place.displayName?.text || "Unbekannt",
          address: place.formattedAddress || "",
          city: cityComponent?.longText || "",
          postalCode: postalComponent?.longText || "",
          phone: place.nationalPhoneNumber || null,
          websiteUrl: place.websiteUri || null,
          rating: place.rating ?? null,
          reviewCount: place.userRatingCount ?? 0,
          category: place.primaryTypeDisplayName?.text || "",
        });
      }
    }

    pageToken = data.nextPageToken;
    if (!pageToken) break;

    // Google requires a delay between pagination requests
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }

  return allResults;
}
