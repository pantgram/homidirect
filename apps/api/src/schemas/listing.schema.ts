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

export type ListingIdParam = z.infer<typeof listingIdParamSchema>;
export type CreateListingInput = z.infer<typeof createListingSchema>;
export type UpdateListingInput = z.infer<typeof updateListingSchema>;
