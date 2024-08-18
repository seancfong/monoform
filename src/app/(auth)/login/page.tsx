"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

type Props = {};

export default function LoginPage({}: Props) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
        <p className="text-sm text-zinc-500">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-4">
        <form onSubmit={onSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                placeholder="name@example.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading}
                required
                className="placeholder:text-zinc-400"
              />
            </div>
            <div className="grid gap-1">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/password-recovery"
                  className="text-sm text-zinc-400 underline hover:text-zinc-800"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                required
                disabled={isLoading}
              />
            </div>
            <Button disabled={isLoading}>Login</Button>
          </div>
        </form>
        <div className="grid gap-3">
          <Button variant="outline" type="button" disabled={isLoading}>
            Login with GitHub
          </Button>
          <Button variant="outline" type="button" disabled={isLoading}>
            Login with Google
          </Button>
        </div>
      </div>
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
