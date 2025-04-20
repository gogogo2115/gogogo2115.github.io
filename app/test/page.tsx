export default function TestPage() {
  return (
    <>
      <div>{process.env.NODE_ENV}</div>
      <div>env1: {process.env.MY_ENV_VAR}</div>
      <div>env2: {process.env.NEXT_PUBLIC_API_URL}</div>
    </>
  );
}
