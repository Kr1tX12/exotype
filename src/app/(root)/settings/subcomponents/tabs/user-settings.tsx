import { SettingsWrapper } from "../general/settings-wrapper";
import { SettingButton } from "../general/setting-button";
import { Trash2 } from "lucide-react";
import { deleteAccount } from "@/lib/actions/user.actions";
import { signOut } from "next-auth/react";

export const UserSettings = () => {
  return (
    <SettingsWrapper>
      <SettingButton
        variant="destructive"
        Icon={Trash2}
        title="Удалив аккаунт, вы потеряете весь свой прогресс и все свои данные."
        description="Вы не сможете отменить это действие"
        warning
        textToConfirm="УДАЛИТЬ АККАУНТ"
        warningText="Удаление аккаунта"
        onClick={async () => {
          const result = await deleteAccount();
          if (result.success) {
            await signOut({ callbackUrl: "/" });
          }

          return result;
        }}
      >
        Удалить аккаунт
      </SettingButton>
    </SettingsWrapper>
  );
};
