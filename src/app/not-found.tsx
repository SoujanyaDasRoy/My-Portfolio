import Link from "next/link";
import s from "./page.module.css";

export default function NotFound() {
  return (
    <main className={s.notFound}>
      <p>404</p>
      <h1>This page does not exist</h1>
      <Link href="/">Back to home</Link>
    </main>
  );
}
