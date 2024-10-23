import Link from "next/link";

export default function TestPage() {
  return (
    <>
      <h1>Home</h1>
      <Link href="/about">About</Link>
    </>
  );
}
