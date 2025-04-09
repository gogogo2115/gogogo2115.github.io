export const getMatchMediaTheme = (): "dark" | "light" => {
  if (typeof window === "undefined" || !("matchMedia" in window)) return "light";
  const query = "(prefers-color-scheme: dark)";
  const { matches } = window.matchMedia(query);
  return matches ? "dark" : "light";
};
