import { Booking } from "./bookings.model";

export type BookingResponse = Pick<
  Booking,
  | "id"
  | "status"
  | "scheduledAt"
  | "meetLink"
  | "createdAt"
  | "candidateId"
  | "landlordId"
  | "listingId"
>;

export type CreateBookingDTO = {
  scheduledAt: Date;
  meetLink?: string;
  candidateId: number;
  landlordId: number;
  listingId: number;
};

export type UpdateBookingDTO = Partial<
  Omit<CreateBookingDTO, "candidateId" | "landlordId" | "listingId">
>;
