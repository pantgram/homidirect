import { pgTable, serial, varchar, integer } from "drizzle-orm/pg-core";
import { listings } from "../listings/listings.model";

export const listingImages = pgTable("listing_images", {
  id: serial("id").primaryKey(),
  url: varchar("url", { length: 500 }).notNull(),
  listingId: integer("listing_id")
    .notNull()
    .references(() => listings.id, { onDelete: "cascade" }),
});
