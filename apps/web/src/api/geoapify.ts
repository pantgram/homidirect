import { env } from "@/config/env";

export interface GeoapifyFeature {
  type: "Feature";
  properties: {
    datasource: {
      sourcename: string;
      attribution: string;
    };
    country: string;
    country_code: string;
    state?: string;
    county?: string;
    city?: string;
    municipality?: string;
    postcode?: string;
    suburb?: string;
    quarter?: string;
    neighbourhood?: string;
    street?: string;
    housenumber?: string;
    lon: number;
    lat: number;
    formatted: string;
    address_line1: string;
    address_line2: string;
    result_type: string;
    rank: {
      importance: number;
      popularity: number;
      confidence: number;
      confidence_city_level: number;
      match_type: string;
    };
    place_id: string;
  };
  geometry: {
    type: "Point";
    coordinates: [number, number];
  };
}

export interface GeoapifyAutocompleteResponse {
  features: GeoapifyFeature[];
}

export interface LocationResult {
  placeId: string;
  formatted: string;
  city: string;
  country: string;
  suburb?: string;
  neighbourhood?: string;
  quarter?: string;
  postalCode?: string;
  resultType: string;
  lat: number;
  lon: number;
}

const GEOAPIFY_BASE_URL = "https://api.geoapify.com/v1/geocode";

export async function searchLocations(
  query: string,
  options?: {
    type?: "country" | "state" | "city" | "postcode" | "street" | "amenity" | "locality";
    countryCode?: string;
    limit?: number;
    lang?: string;
  }
): Promise<LocationResult[]> {
  if (!query || query.length < 2) {
    return [];
  }

  if (!env.geoapifyApiKey) {
    console.warn("Geoapify API key not configured");
    return [];
  }

  const params = new URLSearchParams({
    text: query,
    apiKey: env.geoapifyApiKey,
    limit: String(options?.limit || 10),
    lang: options?.lang || "el",
    format: "json",
  });

  if (options?.type) {
    params.append("type", options.type);
  }

  if (options?.countryCode) {
    params.append("filter", `countrycode:${options.countryCode}`);
  }

  try {
    const response = await fetch(`${GEOAPIFY_BASE_URL}/autocomplete?${params}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Geoapify API error:", response.status, errorText);
      throw new Error(`Geoapify API error: ${response.status}`);
    }

    const data = await response.json();

    // Geoapify returns results in 'results' array when format=json
    const results = data.results || [];

    if (env.isDev) {
      console.log("Geoapify response:", data);
    }

    return results.map((result: any) => ({
      placeId: result.place_id || `${result.lat}-${result.lon}`,
      formatted: result.formatted || "",
      city: result.city || result.municipality || result.county || result.name || "",
      country: result.country || "",
      suburb: result.suburb,
      neighbourhood: result.neighbourhood,
      quarter: result.quarter,
      postalCode: result.postcode,
      resultType: result.result_type || "unknown",
      lat: result.lat || 0,
      lon: result.lon || 0,
    }));
  } catch (error) {
    console.error("Error fetching locations:", error);
    return [];
  }
}

export async function searchCities(
  query: string,
  countryCode?: string
): Promise<LocationResult[]> {
  return searchLocations(query, {
    type: "city",
    countryCode,
    limit: 10,
  });
}

export async function searchGreekLocations(
  query: string
): Promise<LocationResult[]> {
  return searchLocations(query, {
    countryCode: "gr",
    limit: 10,
    lang: "el",
  });
}

const COUNTRIES = [
  { code: "GR", name: "Greece", nameEl: "Ελλάδα" },
  { code: "CY", name: "Cyprus", nameEl: "Κύπρος" },
  { code: "AL", name: "Albania", nameEl: "Αλβανία" },
  { code: "BG", name: "Bulgaria", nameEl: "Βουλγαρία" },
  { code: "TR", name: "Turkey", nameEl: "Τουρκία" },
  { code: "IT", name: "Italy", nameEl: "Ιταλία" },
  { code: "DE", name: "Germany", nameEl: "Γερμανία" },
  { code: "FR", name: "France", nameEl: "Γαλλία" },
  { code: "GB", name: "United Kingdom", nameEl: "Ηνωμένο Βασίλειο" },
  { code: "ES", name: "Spain", nameEl: "Ισπανία" },
  { code: "PT", name: "Portugal", nameEl: "Πορτογαλία" },
  { code: "NL", name: "Netherlands", nameEl: "Ολλανδία" },
  { code: "BE", name: "Belgium", nameEl: "Βέλγιο" },
  { code: "AT", name: "Austria", nameEl: "Αυστρία" },
  { code: "CH", name: "Switzerland", nameEl: "Ελβετία" },
  { code: "SE", name: "Sweden", nameEl: "Σουηδία" },
  { code: "NO", name: "Norway", nameEl: "Νορβηγία" },
  { code: "DK", name: "Denmark", nameEl: "Δανία" },
  { code: "FI", name: "Finland", nameEl: "Φινλανδία" },
  { code: "PL", name: "Poland", nameEl: "Πολωνία" },
  { code: "CZ", name: "Czech Republic", nameEl: "Τσεχία" },
  { code: "HU", name: "Hungary", nameEl: "Ουγγαρία" },
  { code: "RO", name: "Romania", nameEl: "Ρουμανία" },
  { code: "HR", name: "Croatia", nameEl: "Κροατία" },
  { code: "RS", name: "Serbia", nameEl: "Σερβία" },
  { code: "MK", name: "North Macedonia", nameEl: "Βόρεια Μακεδονία" },
  { code: "ME", name: "Montenegro", nameEl: "Μαυροβούνιο" },
  { code: "SI", name: "Slovenia", nameEl: "Σλοβενία" },
  { code: "SK", name: "Slovakia", nameEl: "Σλοβακία" },
  { code: "UA", name: "Ukraine", nameEl: "Ουκρανία" },
  { code: "RU", name: "Russia", nameEl: "Ρωσία" },
  { code: "US", name: "United States", nameEl: "Ηνωμένες Πολιτείες" },
  { code: "CA", name: "Canada", nameEl: "Καναδάς" },
  { code: "AU", name: "Australia", nameEl: "Αυστραλία" },
  { code: "AE", name: "United Arab Emirates", nameEl: "Ηνωμένα Αραβικά Εμιράτα" },
];

export function getCountries(lang: "en" | "el" = "en") {
  return COUNTRIES.map((c) => ({
    code: c.code,
    name: lang === "el" ? c.nameEl : c.name,
  }));
}

export function getCountryCode(countryName: string): string | undefined {
  const country = COUNTRIES.find(
    (c) =>
      c.name.toLowerCase() === countryName.toLowerCase() ||
      c.nameEl.toLowerCase() === countryName.toLowerCase()
  );
  return country?.code.toLowerCase();
}
