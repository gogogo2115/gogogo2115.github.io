((vt, vf, kn, dt, df) => {
  try {
    const gs = () => {
      try {
        const rw = (window.localStorage.getItem(kn) ?? "").trim(),
          s = rw ? JSON.parse(rw.trim()) : {},
          t = String(s.theme).toLowerCase().trim(),
          f = Number(s.fontSize);
        return { theme: vt.includes(t) ? t : dt, fontSize: isNaN(f) ? df : Math.max(Math.min(...vf), Math.min(Math.max(...vf), Math.floor(f))) };
      } catch {
        return { theme: dt, fontSize: df };
      }
    };
    const st = gs(),
      et = st.theme === "system" ? ("matchMedia" in window && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light") : st.theme,
      dk = et === "dark" || et === "gray",
      de = document.documentElement;
    de.setAttribute("data-theme", et);
    de.style.colorScheme = dk ? "dark" : "light";
  } catch (e) {}
})(["light", "dark", "system", "gray"], [1, 2, 3, 4, 5, 6], "settings", "system", 3);
