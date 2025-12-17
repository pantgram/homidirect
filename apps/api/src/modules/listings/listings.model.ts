import {
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
  integer,
  real,
  pgEnum,
  boolean,
} from "drizzle-orm/pg-core";
import { users } from "../users/users.model";

export const propertyTypeEnum = pgEnum("property_type", [
  "apartment",
  "house",
  "studio",
  "room",
]);

export const listings = pgTable("listings", {
  id: serial("id").primaryKey(),
  description: text("description").notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),
  title: varchar("title", { length: 100 }).notNull().unique(),
  price: real("price").notNull(),
  price_per_room: real("price_per_room"),
  city: varchar("city", { length: 100 }).notNull(),
  postalCode: varchar("postal_code", { length: 50 }),
  bedrooms: integer("bedrooms").notNull(),
  bathrooms: integer("bathrooms").notNull(),
  area: real("area").notNull(),
  country: varchar("country", { length: 255 }).default("Greece"),
  maxTenants: integer("max_tenants"),
  shareable: boolean("shareable").default(false).notNull(),
  propertyType: propertyTypeEnum("property_type").notNull(),
  available: boolean("available").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  landlordId: integer("landlord_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});

export type Listing = typeof listings.$inferSelect;
export type NewListing = typeof listings.$inferInsert;
