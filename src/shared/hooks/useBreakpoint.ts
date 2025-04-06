import { useState, useEffect } from "react";

const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
};

const useBreakpoint = (size: "sm" | "md" | "lg" | "xl" | "2xl") => {
  const query = `(min-width: ${breakpoints[size]})`;
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const updateMatch = () => setMatches(media.matches);

    media.addEventListener("change", updateMatch);
    updateMatch();

    return () => media.removeEventListener("change", updateMatch);
  }, [query]);

  return matches;
};

export default useBreakpoint;
