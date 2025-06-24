"use client";

import dynamic from "next/dynamic";

const TestPageClientComponent = () => {
  const BUILD_DATE_ISO = process.env.BUILD_DATE_ISO ?? "";
  const BUILD_RAND_KEY = process.env.BUILD_RAND_KEY ?? "";
  return (
    <>
      <div>BUILD_DATE_ISO: {BUILD_DATE_ISO}</div>
      <div>BUILD_RAND_KEY: {BUILD_RAND_KEY}</div>
    </>
  );
};

const TestPageClient = dynamic(async () => TestPageClientComponent, { ssr: false });
export default TestPageClient;
