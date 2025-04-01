import { isMobile } from "react-device-detect";
import { KeyDownHandlerProps } from "./useKeyDownHandler";

export const useMobileTyping = ({
  handleKeyDown,
}: {
  handleKeyDown: (props: KeyDownHandlerProps) => void;
}) => {
  const handleMobileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isMobile) return;

    const inputValue = e.target.value;

    if (inputValue === "") {
      // Нет ввода, значит бэкспейс
      handleKeyDown(createKeyDownProps("", true));
    } else {
      for (const char of inputValue) {
        handleKeyDown(createKeyDownProps(char, false));
      }
    }

    e.target.value = "";
  };

  const createKeyDownProps = (
    typed: string,
    isBackspace: boolean
  ): KeyDownHandlerProps => ({
    typed,
    isMeta: false,
    ctrlKey: false,
    isBackspace,
    isEnter: false,
  });

  return { handleMobileInput };
};
