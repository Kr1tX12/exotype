import { RefObject } from "react";
import { useCaretAnimation } from "./useCaretAnimation";
import { usePartialText } from "./usePartialText";

export const useCaretWithPartialText = ({
  containerRef,
  caretRef,
}: {
  containerRef: RefObject<HTMLDivElement | null>;
  caretRef: RefObject<HTMLDivElement | null>;
}) => {
  const { update } = usePartialText({ containerRef });
  useCaretAnimation({
    onScroll: update,
    containerRef,
    caretRef,
  });
};
