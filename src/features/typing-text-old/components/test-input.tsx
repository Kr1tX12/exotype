import { Dispatch, SetStateAction } from "react";
import { AlwaysFocusedInput } from "./always-focused-input";
import { useTypingRefs } from "./refs-context";

export const TestInput = ({
  isFocused,
  setIsFocused,
}: {
  isFocused: boolean;
  setIsFocused: Dispatch<SetStateAction<boolean>>;
}) => {
  const { inputRef } = useTypingRefs();

  return (
    <AlwaysFocusedInput
      ref={inputRef}
      isFocused={isFocused}
      setIsFocused={setIsFocused}
    />
  );
};
