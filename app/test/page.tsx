export default function TestPage() {
  const buildDate = (process.env.BUILD_DATE_ISO ?? "").trim();
  return <>{buildDate}</>;
}
