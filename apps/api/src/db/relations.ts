import { relations } from "drizzle-orm";
import { users } from "../modules/users/users.model";
import { listings } from "../modules/listings/listings.model";
import { bookings } from "../modules/bookings/bookings.model";
import { tags } from "../modules/tags/tags.model";
import { listingTags } from "../schema/listingTags.model";
import { listingImages } from "../modules/listingImages/listingImages.model";
import { interestedListings } from "../schema/interestedListings.model";

// USERS
export const usersRelations = relations(users, ({ many }) => ({
  listings: many(listings),
  tenantBookings: many(bookings, { relationName: "tenant" }),
  landlordBookings: many(bookings, { relationName: "landlord" }),
  interestedListings: many(interestedListings),
}));

// LISTINGS
export const listingsRelations = relations(listings, ({ one, many }) => ({
  landlord: one(users, {
    fields: [listings.landlordId],
    references: [users.id],
  }),
  images: many(listingImages),
  tags: many(listingTags),
  bookings: many(bookings),
  interestedUsers: many(interestedListings),
}));

// BOOKINGS
// Defines relations for the bookings table, linking each booking to its tenant and landlord via relation names
// for clarity, and associating each booking with a specific listing.
export const bookingsRelations = relations(bookings, ({ one }) => ({
  tenant: one(users, {
    fields: [bookings.tenantId],
    references: [users.id],
    relationName: "tenant",
  }),
  landlord: one(users, {
    fields: [bookings.landlordId],
    references: [users.id],
    relationName: "landlord",
  }),
  listing: one(listings, {
    fields: [bookings.listingId],
    references: [listings.id],
  }),
}));

// TAGS
export const tagsRelations = relations(tags, ({ many }) => ({
  listingConnections: many(listingTags),
}));

// LISTING TAGS
export const listingTagsRelations = relations(listingTags, ({ one }) => ({
  listing: one(listings, {
    fields: [listingTags.listingId],
    references: [listings.id],
  }),
  tag: one(tags, {
    fields: [listingTags.tagId],
    references: [tags.id],
  }),
}));

// INTERESTED LISTINGS
export const interestedListingsRelations = relations(
  interestedListings,
  ({ one }) => ({
    user: one(users, {
      fields: [interestedListings.userId],
      references: [users.id],
    }),
    listing: one(listings, {
      fields: [interestedListings.listingId],
      references: [listings.id],
    }),
  })
);

// LISTING IMAGES
export const listingImagesRelations = relations(listingImages, ({ one }) => ({
  listing: one(listings, {
    fields: [listingImages.listingId],
    references: [listings.id],
  }),
}));
