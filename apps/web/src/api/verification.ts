import { apiClient } from "./client";

export type DocumentType =
  | "UTILITY_BILL"
  | "TITLE_DEED"
  | "LEASE_AGREEMENT"
  | "PROPERTY_TAX"
  | "OTHER";

export type VerificationStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface VerificationDocument {
  id: number;
  listingId: number;
  documentType: DocumentType;
  url: string;
  fileName: string;
  uploadedBy: number;
  createdAt: string;
}

export interface VerificationHistoryEntry {
  id: number;
  listingId: number;
  previousStatus: string | null;
  newStatus: string;
  notes: string | null;
  reviewedBy: number | null;
  createdAt: string;
}

export interface VerificationStatusResponse {
  listingId: number;
  verificationStatus: VerificationStatus;
  verifiedAt: string | null;
  documents: VerificationDocument[];
  history: VerificationHistoryEntry[];
  canResubmit: boolean;
}

export interface PendingVerificationListing {
  id: number;
  title: string;
  city: string;
  landlordId: number;
  verificationStatus: VerificationStatus;
  createdAt: string;
  documents: VerificationDocument[];
}

export const verificationApi = {
  async getStatus(listingId: number): Promise<VerificationStatusResponse> {
    const response = await apiClient.get<VerificationStatusResponse>(
      `/listings/${listingId}/verification`
    );
    return response.data;
  },

  async getDocuments(listingId: number): Promise<VerificationDocument[]> {
    const response = await apiClient.get<{ documents: VerificationDocument[] }>(
      `/listings/${listingId}/verification/documents`
    );
    return response.data.documents;
  },

  async getHistory(listingId: number): Promise<VerificationHistoryEntry[]> {
    const response = await apiClient.get<{ history: VerificationHistoryEntry[] }>(
      `/listings/${listingId}/verification/history`
    );
    return response.data.history;
  },

  async uploadDocument(
    listingId: number,
    file: File,
    documentType: DocumentType
  ): Promise<VerificationDocument> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("documentType", documentType);

    const response = await apiClient.post<{ document: VerificationDocument }>(
      `/listings/${listingId}/verification/documents`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data.document;
  },

  async deleteDocument(listingId: number, documentId: number): Promise<void> {
    await apiClient.delete(
      `/listings/${listingId}/verification/documents/${documentId}`
    );
  },

  async reviewVerification(
    listingId: number,
    status: "APPROVED" | "REJECTED",
    notes?: string
  ): Promise<void> {
    await apiClient.post(`/listings/${listingId}/verification/review`, {
      status,
      notes,
    });
  },

  async getPendingVerifications(): Promise<PendingVerificationListing[]> {
    const response = await apiClient.get<{ listings: PendingVerificationListing[] }>(
      "/admin/verifications/pending"
    );
    return response.data.listings;
  },
};
