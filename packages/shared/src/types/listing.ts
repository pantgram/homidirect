export type PropertyType = "apartment" | "house" | "studio" | "room";

export interface Listing {
  id: number;
  title: string;
  description: string;
  price: number;
  pricePerRoom?: number;
  city: string;
  postalCode?: string;
  country?: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  maxTenants?: number;
  shareable?: boolean;
  propertyType: PropertyType;
  available: boolean;
  landlordId: number;
  createdAt: string;
}

export interface CreateListingRequest {
  title: string;
  description: string;
  price: number;
  pricePerRoom?: number;
  city: string;
  postalCode?: string;
  country?: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  maxTenants?: number;
  shareable?: boolean;
  propertyType: PropertyType;
  available?: boolean;
}

export interface UpdateListingRequest extends Partial<CreateListingRequest> {}

export interface ListingsQueryParams {
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  propertyType?: PropertyType;
  available?: boolean;
  page?: number;
  limit?: number;
}

export interface SearchListingsParams {
  q?: string;
  propertyType?: PropertyType;
  city?: string;
  region?: string;
  country?: string;
  minPrice?: number;
  maxPrice?: number;
  minBedrooms?: number;
  maxBedrooms?: number;
  minBathrooms?: number;
  maxBathrooms?: number;
  minArea?: number;
  maxArea?: number;
  available?: boolean;
  isFeatured?: boolean;
  sortBy?: "featured" | "newest" | "oldest" | "price_asc" | "price_desc" | "area_asc" | "area_desc";
  page?: number;
  limit?: number;
}

export interface ListingSearchResult extends Listing {
  isFeatured: boolean;
  primaryImage?: ListingImage;
  verificationStatus?: "PENDING" | "VERIFIED" | "REJECTED";
}

export interface ListingImage {
  id: number;
  listingId: number;
  url: string;
  isPrimary: boolean;
  order: number;
  createdAt: string;
}
