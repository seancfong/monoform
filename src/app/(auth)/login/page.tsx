import LoginForm from "@/app/(auth)/login/components/login-form";
import Link from "next/link";

type Props = {};

export default function LoginPage({}: Props) {
  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
        <p className="text-sm text-zinc-500">
          Enter your email below to login to your account
        </p>
      </div>
      <LoginForm />
      <p className="px-8 text-center text-sm text-zinc-400">
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="underline underline-offset-4 hover:text-zinc-800"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}
