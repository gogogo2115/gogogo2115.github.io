export default function DevPage() {
  return (
    <div>
      <div>next version: {process.env.NEXT_PUBLIC_NEXT_VERSION}</div>
      <div>react version: {process.env.NEXT_PUBLIC_REACT_VERSION}</div>
      <div>build iso: {process.env.BUILD_DATE_ISO}</div>
    </div>
  );
}
