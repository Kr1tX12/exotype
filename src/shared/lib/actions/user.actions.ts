"use server";

import { getServerSession } from "next-auth";
import { prisma } from "../../../prisma/prisma-client";
import { authOptions } from "../auth";

const handleError = (error: unknown, message: string) => {
  console.error(error, message);
};

export const deleteAccount = async (): Promise<{
  success: boolean;
  error?: string;
}> => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return { success: false, error: "Вы не авторизованы" };
  }

  try {
    await prisma.user.delete({ where: { email: session.user.email } });

    return { success: true };
  } catch (error) {
    handleError(error, "Ошибка при удалении аккаунта");
    return { success: false, error: "Ошибка сервера" };
  }
};
