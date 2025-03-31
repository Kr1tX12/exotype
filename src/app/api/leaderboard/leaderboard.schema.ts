import { TestType } from "@prisma/client";
import z from "zod";

export const LeaderboardSchema = z.object({
  testType: z.nativeEnum(TestType).default("WORDS"),
  testValue: z.coerce.number().int().nonnegative().default(10),
  take: z.coerce.number().int().min(1).max(100).default(10),
  skip: z.coerce.number().int().nonnegative().default(0),
});

export type LeaderboradQuery = z.infer<typeof LeaderboardSchema>;
