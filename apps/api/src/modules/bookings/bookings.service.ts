import { eq } from "drizzle-orm";
import { db } from "config/db";
import { bookings } from "./bookings.model";
import {
  CreateBookingDTO,
  UpdateBookingDTO,
  BookingResponse,
} from "./bookings.types";

export const BookingService = {
  async getAllBookings(): Promise<BookingResponse[]> {
    const allBookings = await db
      .select({
        id: bookings.id,
        status: bookings.status,
        scheduledAt: bookings.scheduledAt,
        meetLink: bookings.meetLink,
        createdAt: bookings.createdAt,
        candidateId: bookings.candidateId,
        landlordId: bookings.landlordId,
        listingId: bookings.listingId,
      })
      .from(bookings);

    return allBookings;
  },

  async getBookingById(id: number): Promise<BookingResponse | null> {
    const [booking] = await db
      .select({
        id: bookings.id,
        status: bookings.status,
        scheduledAt: bookings.scheduledAt,
        meetLink: bookings.meetLink,
        createdAt: bookings.createdAt,
        candidateId: bookings.candidateId,
        landlordId: bookings.landlordId,
        listingId: bookings.listingId,
      })
      .from(bookings)
      .where(eq(bookings.id, id))
      .limit(1);

    return booking || null;
  },

  async createBooking(data: CreateBookingDTO): Promise<BookingResponse> {
    data.scheduledAt = new Date(data.scheduledAt);
    console.log(data);
    const [newBooking] = await db.insert(bookings).values(data).returning({
      id: bookings.id,
      status: bookings.status,
      scheduledAt: bookings.scheduledAt,
      meetLink: bookings.meetLink,
      createdAt: bookings.createdAt,
      candidateId: bookings.candidateId,
      landlordId: bookings.landlordId,
      listingId: bookings.listingId,
    });

    return newBooking;
  },

  async updateBooking(
    id: number,
    data: UpdateBookingDTO
  ): Promise<BookingResponse | null> {
    const [updatedBooking] = await db
      .update(bookings)
      .set(data)
      .where(eq(bookings.id, id))
      .returning({
        id: bookings.id,
        status: bookings.status,
        scheduledAt: bookings.scheduledAt,
        meetLink: bookings.meetLink,
        createdAt: bookings.createdAt,
        candidateId: bookings.candidateId,
        landlordId: bookings.landlordId,
        listingId: bookings.listingId,
      });

    return updatedBooking || null;
  },

  async deleteBooking(id: number): Promise<boolean> {
    const result = await db
      .delete(bookings)
      .where(eq(bookings.id, id))
      .returning({ id: bookings.id });

    return result.length > 0;
  },
};
