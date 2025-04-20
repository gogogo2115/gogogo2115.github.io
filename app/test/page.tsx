const buildDate1 = (process.env.BUILD_DATE_ISO ?? "호출 실패").trim();
const buildDate2 = (
  process.env.NEXT_PUBLIC_BUILD_DATE_ISO ?? "호출 실패"
).trim();

export default function TestPage() {
  return (
    <>
      <div>{process.env.NODE_ENV}</div>
      <div>buildDate1: {buildDate1}</div>
      <div>buildDate2: {buildDate2}</div>
    </>
  );
}
