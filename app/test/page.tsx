const BUILD_DATE_ISO = (process.env.BUILD_DATE_ISO ?? "호출 실패").trim();
const BUILD_RAND_KEY = (process.env.BUILD_RAND_KEY ?? "호출 실패").trim();

const PACKAGE_NAME = (process.env.NEXT_PUBLIC_CONFIG_PACKAGE_NAME ?? "호출 실패").trim();
const PACKAGE_VERSION = (process.env.NEXT_PUBLIC_CONFIG_PACKAGE_VERSION ?? "호출 실패").trim();
const NEXT_VERSION = (process.env.NEXT_PUBLIC_CONFIG_NEXT_VERSION ?? "호출 실패").trim();

import SVG from "@/public/next.svg";

export default function TestPage() {
  return (
    <>
      <SVG />
      <div>{process.env.NODE_ENV}</div>
      <div>BUILD_DATE_ISO: {BUILD_DATE_ISO}</div>
      <div>BUILD_RAND_KEY: {BUILD_RAND_KEY}</div>
      <div>PACKAGE_NAME: {PACKAGE_NAME}</div>
      <div>PACKAGE_VERSION: {PACKAGE_VERSION}</div>
      <div>NEXT_VERSION: {NEXT_VERSION}</div>
    </>
  );
}
