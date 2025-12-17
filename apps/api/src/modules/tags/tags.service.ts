import { eq } from "drizzle-orm";
import { db } from "config/db";
import { tags } from "./tags.model";
import { CreateTagDTO, UpdateTagDTO, TagResponse } from "./tags.types";

export const TagService = {
  async getAllTags(): Promise<TagResponse[]> {
    const allTags = await db
      .select({
        id: tags.id,
        name: tags.name,
      })
      .from(tags);

    return allTags;
  },

  async getTagById(id: number): Promise<TagResponse | null> {
    const [tag] = await db
      .select({
        id: tags.id,
        name: tags.name,
      })
      .from(tags)
      .where(eq(tags.id, id))
      .limit(1);

    return tag || null;
  },

  async createTag(data: CreateTagDTO): Promise<TagResponse> {
    const [newTag] = await db.insert(tags).values(data).returning({
      id: tags.id,
      name: tags.name,
    });

    return newTag;
  },

  async updateTag(
    id: number,
    data: UpdateTagDTO
  ): Promise<TagResponse | null> {
    const [updatedTag] = await db
      .update(tags)
      .set(data)
      .where(eq(tags.id, id))
      .returning({
        id: tags.id,
        name: tags.name,
      });

    return updatedTag || null;
  },

  async deleteTag(id: number): Promise<boolean> {
    const result = await db
      .delete(tags)
      .where(eq(tags.id, id))
      .returning({ id: tags.id });

    return result.length > 0;
  },
};
