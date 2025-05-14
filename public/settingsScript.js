(function (vt, vf, kn, dt, df) {
  const ct = (tm) => {
    const lw = String(tm).toLowerCase().trim();
    return vt.includes(lw) ? lw : dt;
  };
  const cf = (fs) => {
    const nm = Number(fs);
    if (isNaN(nm)) return df;
    return vf.includes(nm) ? nm : Math.max(Math.min(...vf), Math.min(Math.max(...vf), Math.floor(nm)));
  };
  const gs = () => {
    try {
      const s = JSON.parse((window.localStorage.getItem(kn) ?? "{}").trim());
      const t = ct(s.theme);
      const f = cf(s.fontSize);
      return { theme: t, fontSize: f };
    } catch {
      return { theme: dt, fontSize: df };
    }
  };
  const mt = () => {
    return "matchMedia" in window ? (window.matchMedia("(prefers-color-scheme:dark)").matches ? "dark" : "light") : "light";
  };
  try {
    const st = gs();
    const et = st.theme === "system" ? mt() : st.theme;
    const de = document.documentElement;
    de.setAttribute("data-theme", et);
    de.setAttribute("data-font-size", st.fontSize);
    if (et === "dark") {
      de.style.colorScheme = "dark";
    } else if (et === "light" || et === "gray") {
      de.style.colorScheme = "light";
    } else {
      de.style.colorScheme = "";
    }
  } catch (e) {}
})(["light", "dark", "system", "gray"], [1, 2, 3, 4, 5, 6], "settings", "system", 3);
