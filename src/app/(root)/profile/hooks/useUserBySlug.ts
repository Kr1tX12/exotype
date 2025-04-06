import { User, UserStats } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export type UserDto = User & { stats: UserStats };
export const useUserBySlug = (slug: string) => {
  return useQuery({
    queryKey: ["userBySlug", slug],
    queryFn: async () => {
      const res = await fetch(`/api/user/${slug}?stats=true`);
      if (!res.ok) throw new Error("Ошибка при загрузке пользователя");
      return res.json() as Promise<UserDto>;
    },
  });
};
