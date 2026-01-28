import { AvailabilitySlot } from "./availabilitySlots.model";

export type AvailabilitySlotResponse = Pick<
  AvailabilitySlot,
  | "id"
  | "listingId"
  | "landlordId"
  | "startTime"
  | "endTime"
  | "isBooked"
  | "createdAt"
>;

export type CreateAvailabilitySlotDTO = {
  listingId: number;
  landlordId: number;
  startTime: Date;
  endTime: Date;
  isBooked?: boolean;
};

export type UpdateAvailabilitySlotDTO = Partial<
  Omit<CreateAvailabilitySlotDTO, "listingId" | "landlordId">
>;
