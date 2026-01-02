import { Listing } from "./listings.model";

export type ListingResponse = Pick<
  Listing,
  | "id"
  | "title"
  | "description"
  | "price"
  | "city"
  | "bedrooms"
  | "bathrooms"
  | "area"
  | "propertyType"
  | "available"
  | "createdAt"
  | "landlordId"
>;

export type ListingImageBasic = {
  id: number;
  url: string;
  listingId: number | null;
  createdAt: Date;
};

export type ListingSearchResponse = ListingResponse & {
  isFeatured: boolean;
  verificationStatus: "PENDING" | "APPROVED" | "REJECTED";
  country: string | null;
  postalCode: string | null;
  primaryImage?: ListingImageBasic | null;
};

export type CreateListingDTO = {
  title: string;
  description: string;
  lastName: string;
  price: number;
  price_per_room?: number;
  city: string;
  postalCode?: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  country?: string;
  maxTenants?: number;
  shareable?: boolean;
  propertyType: "apartment" | "house" | "studio" | "room";
  available?: boolean;
  landlordId: number;
};

export type UpdateListingDTO = Partial<CreateListingDTO>;

export type SearchListingsParams = {
  // Full-text search
  q?: string;

  // Filters
  propertyType?: "apartment" | "house" | "studio" | "room";
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
  verificationStatus?: "PENDING" | "APPROVED" | "REJECTED";

  // Sort
  sortBy?: "featured" | "newest" | "oldest" | "price_asc" | "price_desc" | "area_asc" | "area_desc";

  // Pagination
  page?: number;
  limit?: number;
};

export type PaginatedResponse<T> = {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
};
