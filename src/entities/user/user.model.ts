import { User, UserStats } from "@prisma/client";

export type SimplifiedUser = {
  username?: string;
  avatar?: string;
  slug?: string;
};

export type UserDto = User & { stats: UserStats };
