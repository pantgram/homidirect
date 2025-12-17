import { Booking } from "./bookings.model";

export type BookingResponse = Pick<
  Booking,
  "id" | "status" | "scheduledAt" | "meetLink" | "createdAt" | "tenantId" | "landlordId" | "listingId"
>;

export type CreateBookingDTO = {
  scheduledAt: Date;
  meetLink?: string;
  tenantId: number;
  landlordId: number;
  listingId: number;
};

export type UpdateBookingDTO = Partial<Omit<CreateBookingDTO, "tenantId" | "landlordId" | "listingId">>;
