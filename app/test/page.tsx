const buildDate = (process.env.BUILD_DATE_ISO ?? "호출 실패").trim();
const buildRand = (process.env.BUILD_RAND_KEY ?? "호출 실패").trim();
export default function TestPage() {
  return (
    <>
      <div>{process.env.NODE_ENV}</div>
      <div>buildDate: {buildDate}</div>
      <div>buildRand: {buildRand}</div>
    </>
  );
}
