import { privateDecrypt, publicEncrypt } from "crypto";

const validatePrivateKey = (privateKey: string): boolean => {
  try {
    if (typeof window !== "undefined") throw new Error("서버환경에서만 실행 가능합니다.");

    const testMessage = "ValidationTest";
    const publicKey = process.env.BUILD_PUBLIC_KEY;

    const encrypted = publicEncrypt(publicKey, Buffer.from(testMessage));
    const decrypted = privateDecrypt(privateKey, encrypted).toString("utf-8");

    return testMessage === decrypted;
  } catch {
    return false;
  }
};

export default function TestPage() {
  const BUILD_DATE_ISO = process.env.BUILD_DATE_ISO ?? "";
  const BUILD_RAND_KEY = process.env.BUILD_RAND_KEY ?? "";
  return (
    <>
      <div>BUILD_DATE_ISO: {BUILD_DATE_ISO}</div>
      <div>BUILD_RAND_KEY: {BUILD_RAND_KEY}</div>
      <div>{process.env.BUILD_PUBLIC_KEY}</div>
      <div>{process.env.BUILD_PRIVATE_KEY}</div>

      <div>validatePrivateKey: {validatePrivateKey(process.env.BUILD_PRIVATE_KEY ?? "") ? "정상" : "비정상"}</div>
    </>
  );
}
