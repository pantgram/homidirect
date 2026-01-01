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

export interface ListingImage {
  id: number;
  listingId: number;
  url: string;
  isPrimary: boolean;
  order: number;
  createdAt: string;
}
