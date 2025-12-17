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
