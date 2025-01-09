import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-100 p-4 tracking-tight">
      <div className="w-full max-w-md md:max-w-2xl xl:max-w-5xl">
        <p className="text-lg font-semibold text-zinc-500">monoform</p>
      </div>
      <div className="flex w-full max-w-md flex-grow flex-col justify-center md:max-w-2xl xl:max-w-5xl">
        <div className="max-w-xl space-y-2 md:space-y-3 xl:max-w-3xl">
          <span className="flex w-fit justify-center rounded-full border-1 border-zinc-200 bg-zinc-200/10 px-4 font-mono text-sm text-zinc-400">
            v.0.0
          </span>
          <h1 className="text-4xl font-semibold text-zinc-800 md:text-5xl xl:text-6xl">
            The next step to building remarkable forms
          </h1>
          <p className="tracking-normal text-zinc-400">
            An open-source drag and drop form builder with minimal configuration
            and intuitive design.
          </p>
          <div className="mt-4 flex items-center gap-2">
            <Button asChild className="w-fit px-6">
              <Link href="/workspace">Get Started</Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className="w-fit border-2 border-zinc-200 px-6"
            >
              <Link href="https://github.com/seancfong/monoform">GitHub</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
