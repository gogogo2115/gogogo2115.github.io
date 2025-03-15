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

// const eslintConfig = [...compat.extends("next/core-web-vitals", "next/typescript")]; // 기본 초기 값
const eslintConfig = [
  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript"],
    rules: {
      "react/no-unescaped-entities": "off", // react에서 "를 &qout;로 변경하지 않고 사용할 수 있도록 변경
      "@next/next/no-img-element": "off", // nextjs에서 Image가 아닌 img를 사용할 수 있도록 설정 처리
      "@typescript-eslint/no-unused-vars": "warn", // 빌드시 사용하지 않는 변수를 경고로 완화(warn) 처리
    },
  }),
];

export default eslintConfig;
