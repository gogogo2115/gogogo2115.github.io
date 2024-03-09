(function () {
  "use static";
  try {
    const storedName = "theme";
    const datasetName = "theme";
    const storedTheme = window.localStorage.getItem(storedName)?.toLowerCase().trim() ?? "";
    const validTheme = ["dark", "light", "auto", "gray"].includes(storedTheme) ? storedTheme : "auto";
    const toDatasetTheme = validTheme === "auto" ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light") : validTheme;
    document.body.dataset[datasetName] = toDatasetTheme;
  } catch (error) {}
})();
