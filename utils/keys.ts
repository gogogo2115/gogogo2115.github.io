export const buildPublicKey = ((): string => {
  const key = (process.env.BUILD_PUBLIC_KEY ?? "").trim();
  return key;
})();

export const buildPrivateKey = ((): string => {
  const key = (typeof window === "undefined" ? process.env.BUILD_PRIVATE_KEY ?? "" : "").trim();
  return key;
})();
