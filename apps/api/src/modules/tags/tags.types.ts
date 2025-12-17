import { Tag } from "./tags.model";

export type TagResponse = Pick<Tag, "id" | "name">;

export type CreateTagDTO = {
  name: string;
};

export type UpdateTagDTO = Partial<CreateTagDTO>;
