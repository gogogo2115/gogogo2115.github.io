export const BUILD_PUBLIC_KEY = (): string | undefined => {
  return process.env.BUILD_PUBLIC_KEY;
};

export const BUILD_PRIVATE_KEY = (): string | undefined => {
  if (typeof window === "undefined") return process.env.BUILD_PUBLIC_KEY;
  return undefined;
};
