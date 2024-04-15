!(function () {
  "use strict";
  try {
    const st = (window?.localStorage?.getItem("theme") ?? "").toLowerCase(),
      is = ["dark", "light", "system", "gray"].includes(st),
      mt = window.matchMedia("(prefers-color-scheme: dark)")?.matches ? "dark" : "light",
      tst = is ? st : "system",
      tdt = tst == "system" ? mt : tst;

    document.body.dataset["theme"] = tdt;
    if (!is) {
      window?.localStorage?.setItem("theme", "system");
    }
  } catch (e) {}
})();
