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
      const rw = (window.localStorage.getItem(kn) ?? "").trim();
      const s = rw ? JSON.parse(rw.trim()) : {};
      return { theme: ct(s.theme), fontSize: cf(s.fontSize) };
    } catch {
      return { theme: dt, fontSize: df };
    }
  };
  const mt = () => {
    return "matchMedia" in window ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light") : "light";
  };
  try {
    const st = gs();
    const et = st.theme === "system" ? mt() : st.theme;
    const de = document.documentElement;
    de.setAttribute("data-theme", et);
    de.setAttribute("data-font-size", st.fontSize);
    const dk = et === "dark" || et === "gray";
    de.style.colorScheme = dk ? "dark" : "light";
  } catch {}
})(["light", "dark", "system", "gray"], [1, 2, 3, 4, 5, 6], "settings", "system", 3);
