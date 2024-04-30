"use client";

import styles from "@/styles/page.module.css";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {}, []);

  return (
    <main className={styles.main}>
      <Link href={"/web-safe-colors"} title="web safe colors 페이지 이동">
        web safe colors
      </Link>
    </main>
  );
}
// import { cookies } from "next/headers";
// import { MouseEvent } from "react";

// export default function Home() {
//   const handleLogin = async (formData: FormData) => {
//     "use server";

//     const email = String(formData.get("email"));
//     const password = String(formData.get("password"));

//     // perform database operations and generate token

//     cookies().set("auth-token", "some-auth-token-by-server-comp", {
//       maxAge: 48 * 60 * 60, // valid for 2 days
//       secure: process.env.NODE_ENV === "production",
//       httpOnly: true,
//     });
//   };

//   const onClick1 = async (e: MouseEvent<HTMLButtonElement>) => {
//     "use server";

//     // perform database operations and generate token

//     cookies().set("aaaa", "some-auth-token-by-server-comp", {
//       maxAge: 48 * 60 * 60, // valid for 2 days
//       secure: process.env.NODE_ENV === "production",
//       httpOnly: true,
//     });
//   };

//   return (
//     <main className="flex mx-3 flex-col items-center justify-center">
//       <h1 className="my-5 text-center text-2xl font-bold">Getting and Setting Cookies in Next.js</h1>

//       <div>
//         <h2 className="mt-10 text-center text-3xl font-semibold">Set Cookie</h2>
//         <form action={handleLogin}>
//           <input type="email" className="bg-transparent px-2 py-2 block my-2 border-2 border-slate-800 rounded-md" placeholder="key" name="email" />
//           <input type="password" className="bg-transparent px-2 py-2 block my-2 border-2 border-slate-800 rounded-md" placeholder="value" name="password" />
//           <button className="bg-blue-600 rounded-md px-6 py-2 w-full text-white">Login</button>
//         </form>

//         <button type="button" onClick={onClick1}>
//           aa
//         </button>
//       </div>
//     </main>
//   );
// }
