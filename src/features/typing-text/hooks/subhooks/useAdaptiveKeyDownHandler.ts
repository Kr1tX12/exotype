import { RefObject } from "react";
import { useKeyDownHandler } from "./useKeyDownHandler";
import { useMobileTyping } from "./useMobileTyping";

export const useAdaptiveKeyDownHandler = ({
  inputRef,
}: {
  inputRef: RefObject<HTMLInputElement | null>;
}) => {
  const { handleKeyDown } = useKeyDownHandler({ inputRef });
  const { handleMobileInput } = useMobileTyping({ handleKeyDown });
  return handleMobileInput;
};
