import { http } from "@/shared/api/http";
import { UserDto } from "./user.model";
import { UserApiError } from "./userApiError";

export const UserAPI = {
  getUserQueryOptions: (slug: string) => {
    return {
      queryKey: ["userBySlug", slug],
      queryFn: () => {
        try {
          return http(`api/user/${slug}?stats=true`, {
            method: "GET",
          }) as Promise<UserDto>;
        } catch (error) {
          throw new UserApiError(
            "Ошибка при запросе на пользователя",
            500,
            JSON.stringify(error)
          );
        }
      },
    };
  },
};
