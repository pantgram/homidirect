import { listingImages } from "./listingImages.model";

export type ListingImage = typeof listingImages.$inferSelect;
export type NewListingImage = typeof listingImages.$inferInsert;

export type ListingImageResponse = {
  id: number;
  url: string;
  listingId: number | null;
  uploadSessionId: string | null;
  createdAt: Date;
};

export type PendingImageResponse = {
  id: number;
  url: string;
  uploadSessionId: string;
  createdAt: Date;
};

export const MAX_IMAGES_PER_LISTING = 10;
export const MAX_IMAGES_PER_SESSION = 10;
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const PENDING_IMAGE_EXPIRY_HOURS = 24;
export const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;
