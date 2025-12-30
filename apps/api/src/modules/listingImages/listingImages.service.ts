import { eq, count } from "drizzle-orm";
import { db } from "config/db";
import { listingImages } from "./listingImages.model";
import { uploadToR2, deleteFromR2, getKeyFromUrl } from "../../plugins/r2";
import { ListingImageResponse, MAX_IMAGES_PER_LISTING } from "./listingImages.types";
import { ConflictError } from "../../utils/errors";

export const ListingImageService = {
  async getImagesByListingId(listingId: number): Promise<ListingImageResponse[]> {
    const images = await db
      .select({
        id: listingImages.id,
        url: listingImages.url,
        listingId: listingImages.listingId,
      })
      .from(listingImages)
      .where(eq(listingImages.listingId, listingId));

    return images;
  },

  async getImageById(imageId: number): Promise<ListingImageResponse | null> {
    const [image] = await db
      .select({
        id: listingImages.id,
        url: listingImages.url,
        listingId: listingImages.listingId,
      })
      .from(listingImages)
      .where(eq(listingImages.id, imageId))
      .limit(1);

    return image || null;
  },

  async getImageCount(listingId: number): Promise<number> {
    const [result] = await db
      .select({ count: count() })
      .from(listingImages)
      .where(eq(listingImages.listingId, listingId));

    return result?.count ?? 0;
  },

  async uploadImage(
    listingId: number,
    fileBuffer: Buffer,
    filename: string,
    mimetype: string
  ): Promise<ListingImageResponse> {
    const currentCount = await this.getImageCount(listingId);
    if (currentCount >= MAX_IMAGES_PER_LISTING) {
      throw new ConflictError(
        `Maximum of ${MAX_IMAGES_PER_LISTING} images per listing reached`
      );
    }

    const timestamp = Date.now();
    const sanitizedFilename = filename.replace(/[^a-zA-Z0-9.-]/g, "_");
    const key = `listings/${listingId}/${timestamp}-${sanitizedFilename}`;

    const url = await uploadToR2(key, fileBuffer, mimetype);

    const [newImage] = await db
      .insert(listingImages)
      .values({
        url,
        listingId,
      })
      .returning({
        id: listingImages.id,
        url: listingImages.url,
        listingId: listingImages.listingId,
      });

    return newImage;
  },

  async deleteImage(imageId: number): Promise<boolean> {
    const image = await this.getImageById(imageId);
    if (!image) {
      return false;
    }

    const key = getKeyFromUrl(image.url);
    await deleteFromR2(key);

    const result = await db
      .delete(listingImages)
      .where(eq(listingImages.id, imageId))
      .returning({ id: listingImages.id });

    return result.length > 0;
  },
};
