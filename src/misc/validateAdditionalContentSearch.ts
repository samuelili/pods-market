import {z} from "zod";

export const additionalContentSchema = z.object({
  postId: z.string().default('').optional(),
  userId: z.string().default('').optional(),
}).optional();