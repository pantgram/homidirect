export const DOCUMENT_TYPES = [
  "UTILITY_BILL",
  "TITLE_DEED",
  "LEASE_AGREEMENT",
  "PROPERTY_TAX",
  "OTHER",
] as const;

export type DocumentType = (typeof DOCUMENT_TYPES)[number];

export const ALLOWED_DOCUMENT_MIME_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;

export type AllowedDocumentMimeType = (typeof ALLOWED_DOCUMENT_MIME_TYPES)[number];

export const MAX_DOCUMENT_SIZE = 10 * 1024 * 1024; // 10MB

export interface VerificationDocumentResponse {
  id: number;
  listingId: number;
  documentType: DocumentType;
  url: string;
  fileName: string;
  uploadedBy: number;
  createdAt: Date;
}

export interface VerificationStatusResponse {
  listingId: number;
  verificationStatus: "PENDING" | "APPROVED" | "REJECTED";
  verifiedAt: Date | null;
  documents: VerificationDocumentResponse[];
  history: VerificationHistoryResponse[];
  canResubmit: boolean;
}

export interface VerificationHistoryResponse {
  id: number;
  listingId: number;
  previousStatus: string | null;
  newStatus: string;
  notes: string | null;
  reviewedBy: number | null;
  createdAt: Date;
}

export interface SubmitVerificationRequest {
  documentType: DocumentType;
}

export interface AdminReviewRequest {
  status: "APPROVED" | "REJECTED";
  notes?: string;
}
