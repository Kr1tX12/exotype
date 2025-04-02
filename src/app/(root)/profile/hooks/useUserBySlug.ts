import { useQuery } from "@tanstack/react-query";

export const useUserBySlug = (slug: string) => {
  return useQuery({
    queryKey: ["userBySlug", slug],
    queryFn: async () => {
      const res = await fetch(`/api/user/${slug}`);
      if (!res.ok) throw new Error("Ошибка при загрузке пользователя");
      return res.json();
    },
  });
};
