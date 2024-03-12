!(function () {
"use static";
  try {
    const t = document.body.dataset.theme,
      e = (window.localStorage.getItem("theme") ?? "").toLowerCase().trim(),
      a = ["dark", "light", "auto", "gray"].includes(e) ? e : "auto",
      o = "auto" === a ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light") : a;
    t !== o && (document.body.dataset.theme = o);
  } catch (r) {}
})();
