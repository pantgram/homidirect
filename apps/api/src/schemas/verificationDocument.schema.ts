import { z } from "zod";

export const verificationDocumentParamsSchema = z.object({
  listingId: z.string().regex(/^\d+$/, "Listing ID must be a valid number"),
});

export const deleteVerificationDocumentParamsSchema = z.object({
  listingId: z.string().regex(/^\d+$/, "Listing ID must be a valid number"),
  documentId: z.string().regex(/^\d+$/, "Document ID must be a valid number"),
});

export const reviewVerificationBodySchema = z.object({
  status: z.enum(["APPROVED", "REJECTED"], {
    errorMap: () => ({ message: "Status must be APPROVED or REJECTED" }),
  }),
  notes: z.string().max(1000, "Notes must be less than 1000 characters").optional(),
});

export type VerificationDocumentParams = z.infer<typeof verificationDocumentParamsSchema>;
export type DeleteVerificationDocumentParams = z.infer<typeof deleteVerificationDocumentParamsSchema>;
export type ReviewVerificationBody = z.infer<typeof reviewVerificationBodySchema>;
