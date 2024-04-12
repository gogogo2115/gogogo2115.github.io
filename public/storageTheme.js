!(function () {
  "use strict";
  try {
    const st = (window?.localStorage?.getItem("theme") ?? "").toLowerCase(),
      is = ["dark", "light", "system", "gray"].includes(st),
      mm = window.matchMedia("(prefers-color-scheme: dark)"),
      mt = mm.matches ? "dark" : "light";

    if (is) {
      if (st === "system") {
        document.body.dataset["theme"] = mt;
        return;
      }
      document.body.dataset["theme"] = st;
      return;
    }
    document.body.dataset["theme"] = mt;
    window?.localStorage?.setItem("theme", "system");
    return;
  } catch (e) {}
})();
