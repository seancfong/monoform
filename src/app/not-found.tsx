import type { Metadata } from "next";
import Link from "next/link";

type Props = {};

export const metadata: Metadata = {
  title: "404 | Monoform",
};

export default function NotFound({}: Props) {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center gap-10 bg-zinc-50">
      <div className="space-y-2 text-center">
        <h2 className="text-9xl font-extrabold text-zinc-200 sm:text-[12rem] lg:text-[20rem]">
          404
        </h2>
        <h1 className="font-mono text-zinc-300">Not found</h1>
      </div>
      <div>
        <Link
          href="/"
          className="font-mono text-zinc-400 underline underline-offset-4"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
