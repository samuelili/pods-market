import {z} from "zod";

export const additionalContentSchema = z.object({
  postId: z.string().default(''),
  userId: z.string().default(''),
});