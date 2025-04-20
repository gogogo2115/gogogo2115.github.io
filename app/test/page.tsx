const buildDate = (process.env.BUILD_DATE_ISO ?? "호출 실패").trim();

export default function TestPage() {
  return (
    <>
      <div>{process.env.NODE_ENV}</div>
      <div>buildDate: {buildDate}</div>
    </>
  );
}
