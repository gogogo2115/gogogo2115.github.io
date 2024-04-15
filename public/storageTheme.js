!(function () {
  "use strict";
  try {
    const st = (window?.localStorage?.getItem("theme") ?? "").toLowerCase(),
      is = ["dark", "light", "system", "gray"].includes(st),
      mt = window.matchMedia("(prefers-color-scheme: dark)")?.matches ? "dark" : "light",
      ft = is ? (st === "system" ? mt : st) : mt;

    document.body.dataset["theme"] = ft;
    if (!is) {
      window?.localStorage?.setItem("theme", "system");
    }
  } catch (e) {}
})();
