export const buildPrivateKey = ((): string => {
  try {
    return (typeof window === "undefined" ? process.env.BUILD_PRIVATE_KEY ?? "" : "").trim();
  } catch {
    return "";
  }
})();

export const buildPublicKey = ((): string => {
  try {
    return (process.env.BUILD_PUBLIC_KEY ?? "").trim();
  } catch {
    return "";
  }
})();
