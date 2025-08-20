export default function DevPage() {
  return (
    <div>
      <div>next version: {process.env.NEXT_PUBLIC_NEXT_VERSION ?? "정보 없음"}</div>
      <div>react version: {process.env.NEXT_PUBLIC_REACT_VERSION ?? "정보 없음"}</div>
      <div>build iso: {process.env.BUILD_DATE_ISO ?? "정보 없음"}</div>
    </div>
  );
}
