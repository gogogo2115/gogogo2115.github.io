export default function TestPage() {
  const buildDate1 = (process.env.BUILD_DATE_ISO ?? "").trim();
  const buildDate2 = (process.env.NEXT_PUBLIC_BUILD_DATE_ISO ?? "").trim();

  return (
    <>
      <div>buildDate1: {buildDate1}</div>
      <div>buildDate2: {buildDate2}</div>
    </>
  );
}
