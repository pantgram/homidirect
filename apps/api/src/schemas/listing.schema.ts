import { z } from "zod";

/**
 * Listing ID parameter schema
 */
export const listingIdParamSchema = z.object({
  id: z.string().regex(/^\d+$/, "Listing ID must be a valid number"),
});

/**
 * Create listing schema
 */
export const createListingSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(255, "Title must not exceed 255 characters"),
  description: z.string().optional(),
  price: z.number().positive("Price must be a positive number"),
  city: z
    .string()
    .min(1, "City is required")
    .max(100, "City must not exceed 100 characters"),
  postalCode: z
    .string()
    .min(1, "Postal code is required")
    .max(20, "Postal code must not exceed 20 characters")
    .optional(),
  bedrooms: z.number().int().min(0, "Bedrooms must be 0 or greater").optional(),
  bathrooms: z.number().int().min(0, "Bathrooms must be 0 or greater").optional(),
  area: z.number().positive("Area must be a positive number").optional(),
  country: z
    .string()
    .min(1, "Country is required")
    .max(100, "Country must not exceed 100 characters")
    .optional(),
  propertyType: z.enum(["apartment", "house", "studio", "room"], {
    errorMap: () => ({
      message: "Property type must be one of: apartment, house, studio, room",
    }),
  }),
  available: z.boolean().optional(),
  landlordId: z.number().int().positive().optional(), // Set by middleware
  uploadSessionId: z.string().uuid().optional(), // For associating pending images
});

/**
 * Update listing schema
 */
export const updateListingSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(255, "Title must not exceed 255 characters")
    .optional(),
  description: z.string().optional(),
  price: z.number().positive("Price must be a positive number").optional(),
  city: z
    .string()
    .min(1, "City is required")
    .max(100, "City must not exceed 100 characters")
    .optional(),
  postalCode: z
    .string()
    .min(1, "Postal code is required")
    .max(20, "Postal code must not exceed 20 characters")
    .optional(),
  bedrooms: z.number().int().min(0, "Bedrooms must be 0 or greater").optional(),
  bathrooms: z.number().int().min(0, "Bathrooms must be 0 or greater").optional(),
  area: z.number().positive("Area must be a positive number").optional(),
  country: z
    .string()
    .min(1, "Country is required")
    .max(100, "Country must not exceed 100 characters")
    .optional(),
  propertyType: z
    .enum(["apartment", "house", "studio", "room"], {
      errorMap: () => ({
        message: "Property type must be one of: apartment, house, studio, room",
      }),
    })
    .optional(),
  available: z.boolean().optional(),
});

/**
 * Search listings query schema
 */
export const searchListingsSchema = z.object({
  // Full-text search
  q: z.string().max(200).optional(),

  // Filters
  propertyType: z
    .enum(["apartment", "house", "studio", "room"])
    .optional(),
  city: z.string().max(100).optional(),
  region: z.string().max(100).optional(),
  country: z.string().max(100).optional(),
  minPrice: z.coerce.number().positive().optional(),
  maxPrice: z.coerce.number().positive().optional(),
  minBedrooms: z.coerce.number().int().min(0).optional(),
  maxBedrooms: z.coerce.number().int().min(0).optional(),
  minBathrooms: z.coerce.number().int().min(0).optional(),
  maxBathrooms: z.coerce.number().int().min(0).optional(),
  minArea: z.coerce.number().positive().optional(),
  maxArea: z.coerce.number().positive().optional(),
  available: z.coerce.boolean().optional(),
  isFeatured: z.coerce.boolean().optional(),
  verificationStatus: z.enum(["PENDING", "APPROVED", "REJECTED"]).optional(),

  // Sort options
  sortBy: z
    .enum(["featured", "newest", "oldest", "price_asc", "price_desc", "area_asc", "area_desc"])
    .default("featured"),

  // Pagination
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(15),
});

export type ListingIdParam = z.infer<typeof listingIdParamSchema>;
export type CreateListingInput = z.infer<typeof createListingSchema>;
export type UpdateListingInput = z.infer<typeof updateListingSchema>;
export type SearchListingsQuery = z.infer<typeof searchListingsSchema>;
