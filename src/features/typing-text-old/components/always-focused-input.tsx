import { cn } from "@/shared/lib/utils";
import React, {
  Dispatch,
  forwardRef,
  HTMLProps,
  memo,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { useAdaptiveKeyDownHandler } from "../hooks/subhooks/useAdaptiveKeyDownHandler";

interface AlwaysFocusedInputProps extends HTMLProps<HTMLInputElement> {
  isFocused: boolean;
  setIsFocused: Dispatch<SetStateAction<boolean>>;
}

export const AlwaysFocusedInput = memo(
  forwardRef<HTMLInputElement, AlwaysFocusedInputProps>(
    ({ isFocused, setIsFocused, ...props }, forwardedRef) => {
      const localRef = useRef<HTMLInputElement>(null);
      const inputRef = forwardedRef || localRef;

      const getRef = useCallback((): HTMLInputElement | null => {
        if (typeof inputRef === "function") return null;
        return inputRef?.current ?? null;
      }, [inputRef]);

      const isEditableElement = useCallback(
        (element: Element | null): boolean => {
          return (
            !!element &&
            (element.tagName === "INPUT" ||
              element.tagName === "TEXTAREA" ||
              (element as HTMLElement).isContentEditable ||
              element.getAttribute("role") === "textbox")
          );
        },
        []
      );

      const handleFocus = useCallback(() => {
        setIsFocused(true);
      }, [setIsFocused]);

      const handleBlur = useCallback(() => {
        if (document.visibilityState !== "visible" || !document.hasFocus()) {
          setIsFocused(false);
          return;
        }

        const activeEl = document.activeElement;

        if (!isEditableElement(activeEl)) {
          requestAnimationFrame(() => {
            if (!isEditableElement(document.activeElement)) {
              getRef()?.focus();
            }
          });
        }

        setIsFocused(getRef() === activeEl);
      }, [isEditableElement, setIsFocused, getRef]);

      const handleContainerClick = useCallback(() => {
        if (
          isEditableElement(document.activeElement) ||
          document.visibilityState !== "visible" ||
          !document.hasFocus()
        ) {
          return;
        }
        getRef()?.focus();
      }, [isEditableElement, getRef]);

      useEffect(() => {
        const handleVisibilityChange = () => {
          const ref = getRef();
          if (document.visibilityState === "visible" && document.hasFocus()) {
            ref?.focus();
          } else {
            ref?.blur();
            setIsFocused(false);
          }
        };

        const handleGlobalBlur = () => {
          setTimeout(() => {
            if (
              document.visibilityState === "visible" &&
              document.hasFocus() &&
              !isEditableElement(document.activeElement)
            ) {
              getRef()?.focus();
            }
          }, 0);
        };

        getRef()?.focus();
        document.addEventListener("visibilitychange", handleVisibilityChange);
        document.addEventListener("focusout", handleGlobalBlur);
        return () => {
          document.removeEventListener(
            "visibilitychange",
            handleVisibilityChange
          );
          document.removeEventListener("focusout", handleGlobalBlur);
        };
      }, [isEditableElement, setIsFocused, getRef]);

      const handleMobileInput = useAdaptiveKeyDownHandler({
        inputRef: { current: getRef() },
      });

      return (
        <input
          {...props}
          ref={inputRef}
          autoFocus
          tabIndex={-1}
          className={cn(
            "absolute opacity-0 -top-4 -left-4 -right-4 -bottom-4",
            isFocused ? "cursor-none" : "cursor-pointer"
          )}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleMobileInput}
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          onClick={handleContainerClick}
        />
      );
    }
  )
);

AlwaysFocusedInput.displayName = "AlwaysFocusedInput";
