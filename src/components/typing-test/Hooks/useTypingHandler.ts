import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export const useTypingHandler = () => {
  const [text, setText] = useState("");

  const needText = `Многие народы увлекаются расширением сознания. Для этого применяются различные вещества и заклинания. Расширив таким образом своё сознание, народы некоторое время охуевши наблюдают вращение бесконечного пространства, беседуют с Господом Богом или же с Сатаной — это кому как повезёт, а затем неизбежно возвращаются назад, домой — к толстой своей жене и аккуратным деткам, бреются и идут на службу.`;

  // Refs for the container with text and for the caret
  const containerRef = useRef<HTMLDivElement>(null);
  const caretRef = useRef<HTMLDivElement>(null);

  // Handler for keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore modifier keys
      if (
        e.key === "Shift" ||
        e.key === "Alt" ||
        e.key === "Control" ||
        e.key === "Meta"
      ) {
        return;
      }

      if (e.key === "Tab") {
        // Clear text on Tab press
        setText("");
      } else if (e.ctrlKey && e.key === "Backspace") {
        // Ctrl+Backspace – delete the previous word
        setText((prev) => {
          let i = prev.length - 1;
          while (i >= 0 && prev[i] === " ") i--;
          while (i >= 0 && prev[i] !== " ") i--;
          return prev.slice(0, i + 1);
        });
      } else if (e.key === "Backspace") {
        // Remove the last character
        setText((prev) => prev.slice(0, -1));
      } else if (e.key === "Enter") {
        // Optionally add a newline
        setText((prev) => prev + "\\n");
      } else if (e.key === " ") {
        setText((prev) => {
          // Prevent duplicate spaces if last character already is a space
          if (prev.length > 0 && prev[prev.length - 1] === " ") {
            return prev;
          }
          // Check if user is at the end of a word:
          // If at the beginning or if the current position in needText is a space,
          // then simply add a space.
          if (prev.length === 0 || needText[prev.length] === " ") {
            return prev + " ";
          }
          // Otherwise, user pressed space mid-word.
          // We determine the end of the current word in needText.
          let nextSpaceIndex = needText.indexOf(" ", prev.length);
          if (nextSpaceIndex === -1) {
            nextSpaceIndex = needText.length;
          }
          // Number of characters remaining in the current word.
          const missingLettersCount = nextSpaceIndex - prev.length;
          // Append spaces to effectively 'skip' the remainder of the word then add an extra space.
          return prev + " ".repeat(missingLettersCount) + " ";
        });
      } else if (e.key.length === 1) {
        // Append the typed character
        setText((prev) => prev + e.key);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [needText]);

  // Update the caret position when the text changes
  useEffect(() => {
    if (!containerRef.current || !caretRef.current) return;

    // Look for an element with data-index equal to the number of entered characters
    const index = text.length;
    const nextLetter = containerRef.current.querySelector(
      `[data-index="${index}"]`
    ) as HTMLElement;

    let target: HTMLElement | null = nextLetter;
    // If the element is not found (e.g. the entire text has been entered) – use the last letter
    if (!target) {
      const letters = containerRef.current.querySelectorAll(`[data-index]`);
      if (letters.length > 0) {
        target = letters[letters.length - 1] as HTMLElement;
      }
    }

    if (target) {
      // Calculate target's position relative to the container
      const containerRect = containerRef.current.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      const offsetX = targetRect.left - containerRect.left;
      const offsetY = targetRect.top - containerRect.top;
      gsap.to(caretRef.current, {
        x: offsetX - 1,
        y: offsetY,
        duration: 0.1,
      });
    }
  }, [text]);

  return { text, needText, containerRef, caretRef };
};

export default useTypingHandler;