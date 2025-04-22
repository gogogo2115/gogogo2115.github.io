import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  // import.meta.dirname is available after Node.js v20.11.0
  // baseDirectory: import.meta.dirname,
  baseDirectory: __dirname,
});

// 기본 값
// const eslintConfig = [...compat.extends("next/core-web-vitals", "next/typescript")];

const eslintConfig = [
  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript"],
    rules: {
      "@typescript-eslint/no-unused-vars": "warn", // 사용하지 않는 변수를 warn 처리
    },
  }),
];

export default eslintConfig;
