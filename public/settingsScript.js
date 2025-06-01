((vt, vf, dk, dt, df) => {
  try {
    const s = (() => {
        try {
          const r = (localStorage.getItem(dk) ?? "").trim(),
            j = r ? JSON.parse(r) : {},
            t = String(j.theme).toLowerCase().trim(),
            f = Number(j.fontSize);
          return { theme: vt.includes(t) ? t : dt, fontSize: isNaN(f) ? df : Math.max(Math.min(...vf), Math.min(Math.max(...vf), Math.floor(f))) };
        } catch {
          return { theme: dt, fontSize: df };
        }
      })(),
      e = s.theme === "system" ? ("matchMedia" in window && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light") : s.theme,
      d = document.documentElement;
    d.setAttribute("data-theme", e);
    d.style.colorScheme = ["dark", "gray"].includes(e) ? "dark" : "light";
  } catch {}
})(["dark", "light", "system", "gray"], [1, 2, 3, 4, 5, 6], "settings", "system", "3");
