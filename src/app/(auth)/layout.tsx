import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Authentication",
};

type Props = {
  children: React.ReactNode;
};

export default function AuthenticationLayout({ children }: Props) {
  return (
    <main className="flex h-screen w-screen items-center justify-center bg-zinc-50 sm:bg-zinc-100 sm:p-8">
      <div className="container relative grid min-h-[700px] max-w-sm flex-col items-center justify-center overflow-hidden rounded-lg border-zinc-200 bg-zinc-50 sm:max-w-md sm:border-1 lg:max-w-screen-xl lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col overflow-hidden bg-gradient-to-br from-zinc-900 to-zinc-600 p-10 text-white dark:border-r lg:flex">
          <div className="relative z-20 flex items-center text-2xl font-medium">
            <Link href="/">monoform</Link>
          </div>
          <div className="absolute bottom-0 right-0 h-2/3 w-5/6 rounded-tl-xl border-l-1 border-t-1 border-zinc-400 bg-zinc-100 opacity-75 shadow-2xl shadow-zinc-400"></div>
        </div>
        <div className="text-zinc-800 lg:p-8">{children}</div>
      </div>
    </main>
  );
}
