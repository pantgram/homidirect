import { z } from "zod";

export const listingImageParamsSchema = z.object({
  listingId: z.string().regex(/^\d+$/, "Listing ID must be a valid number"),
});

export const deleteImageParamsSchema = z.object({
  listingId: z.string().regex(/^\d+$/, "Listing ID must be a valid number"),
  imageId: z.string().regex(/^\d+$/, "Image ID must be a valid number"),
});

export type ListingImageParams = z.infer<typeof listingImageParamsSchema>;
export type DeleteImageParams = z.infer<typeof deleteImageParamsSchema>;
