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
      "@typescript-eslint/no-unused-vars": "warn", // 사용하지 않는 변수를 경고(warn) 처리
      "react/no-unescaped-entities": "off", // 이스케이프 처리 않은 특수문자를 그대로 사용할 수 있도록 허용(off)
      "@next/next/no-img-element": "off", // Next.js의 Image 대신 <img> 사용이 필요할 수 있으므로 규칙을 비활성화(off)
    },
  }),
];

export default eslintConfig;
