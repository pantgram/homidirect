import {
  pgTable,
  serial,
  varchar,
  integer,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";
import { users } from "../users/users.model";
import { listings } from "../listings/listings.model";

export const bookingStatusEnum = pgEnum("booking_status", [
  "PENDING",
  "CONFIRMED",
  "DECLINED",
  "CANCELLED",
]);

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  status: bookingStatusEnum("status").default("PENDING"),
  scheduledAt: timestamp("scheduled_at").notNull(),
  meetLink: varchar("meet_link", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow(),

  candidateId: integer("candidate_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  landlordId: integer("landlord_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  listingId: integer("listing_id")
    .notNull()
    .references(() => listings.id, { onDelete: "cascade" }),
});

export type Booking = typeof bookings.$inferSelect;
export type NewBooking = typeof bookings.$inferInsert;
