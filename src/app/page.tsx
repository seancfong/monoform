import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-center items-center">
      <div>hello monoform</div>
      <Link href="/signup">Sign up</Link>
      <Link href="/login">Login</Link>
    </main>
  );
}
