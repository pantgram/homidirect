import { eq } from "drizzle-orm";
import { db } from "config/db";
import { listings } from "./listings.model";
import { CreateListingDTO, UpdateListingDTO, ListingResponse } from "./listings.types";

export const ListingService = {
  async getAllListings(): Promise<ListingResponse[]> {
    const allListings = await db
      .select({
        id: listings.id,
        title: listings.title,
        description: listings.description,
        price: listings.price,
        city: listings.city,
        bedrooms: listings.bedrooms,
        bathrooms: listings.bathrooms,
        area: listings.area,
        propertyType: listings.propertyType,
        available: listings.available,
        createdAt: listings.createdAt,
        landlordId: listings.landlordId,
      })
      .from(listings);

    return allListings;
  },

  async getListingById(id: number): Promise<ListingResponse | null> {
    const [listing] = await db
      .select({
        id: listings.id,
        title: listings.title,
        description: listings.description,
        price: listings.price,
        city: listings.city,
        bedrooms: listings.bedrooms,
        bathrooms: listings.bathrooms,
        area: listings.area,
        propertyType: listings.propertyType,
        available: listings.available,
        createdAt: listings.createdAt,
        landlordId: listings.landlordId,
      })
      .from(listings)
      .where(eq(listings.id, id))
      .limit(1);

    return listing || null;
  },

  async createListing(data: CreateListingDTO): Promise<ListingResponse> {
    const [newListing] = await db.insert(listings).values(data).returning({
      id: listings.id,
      title: listings.title,
      description: listings.description,
      price: listings.price,
      city: listings.city,
      bedrooms: listings.bedrooms,
      bathrooms: listings.bathrooms,
      area: listings.area,
      propertyType: listings.propertyType,
      available: listings.available,
      createdAt: listings.createdAt,
      landlordId: listings.landlordId,
    });

    return newListing;
  },

  async updateListing(
    id: number,
    data: UpdateListingDTO
  ): Promise<ListingResponse | null> {
    const [updatedListing] = await db
      .update(listings)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(listings.id, id))
      .returning({
        id: listings.id,
        title: listings.title,
        description: listings.description,
        price: listings.price,
        city: listings.city,
        bedrooms: listings.bedrooms,
        bathrooms: listings.bathrooms,
        area: listings.area,
        propertyType: listings.propertyType,
        available: listings.available,
        createdAt: listings.createdAt,
        landlordId: listings.landlordId,
      });

    return updatedListing || null;
  },

  async deleteListing(id: number): Promise<boolean> {
    const result = await db
      .delete(listings)
      .where(eq(listings.id, id))
      .returning({ id: listings.id });

    return result.length > 0;
  },
};
