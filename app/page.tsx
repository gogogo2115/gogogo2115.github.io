import Image from "next/image";
import styles from "@/styles/page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <Image src="/vercel.svg" alt="Vercel Logo" className={styles.vercelLogo} width={100} height={24} priority />
      <Image className={styles.logo} src="/next.svg" alt="Next.js Logo" width={180} height={37} priority />
    </main>
  );
}
