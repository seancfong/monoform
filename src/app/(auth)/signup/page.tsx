"use client";

import { useRef, useState } from "react";

import { signup } from "@/actions/auth/signup";
import { signupFormSchema } from "@/app/(auth)/signup/signupFormSchema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function LoginPage() {
  const [isPending, setIsPending] = useState(false);

  const [formState, formAction] = useFormState(
    async (_: any, formData: FormData) => {
      console.log(formData);

      const result = await signup(formData);
      setIsPending(false);
      return result;
    },
    {
      error: "",
    },
  );

  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const formRef = useRef<HTMLFormElement>(null);

  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Create an account
        </h1>
        <p className="text-sm text-zinc-500">
          Enter your information to create an account
        </p>
      </div>
      <div className="grid gap-6">
        <Form {...form}>
          <form
            ref={formRef}
            action={formAction}
            onSubmit={(e) => {
              setIsPending(true);

              form.handleSubmit(
                async () => {
                  await formAction(new FormData(formRef.current!));
                },
                () => {
                  setIsPending(false);
                },
              )(e);
            }}
          >
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="grid">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="name@example.com"
                        className="placeholder:text-zinc-400"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="grid">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        className="placeholder:text-zinc-400"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isPending}>
                Sign up
              </Button>
            </div>
            {formState.error && (
              <p className="text-red-500">{formState.error}</p>
            )}
          </form>
        </Form>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-zinc-50 px-2 text-zinc-400">or</span>
          </div>
        </div>
        <div className="grid gap-3">
          <Button variant="outline" type="button">
            Sign up with GitHub
          </Button>
          <Button variant="outline" type="button">
            Sign up with Google
          </Button>
        </div>
      </div>
      <p className="px-8 text-center text-sm text-zinc-400">
        Already have an account?{" "}
        <Link
          href="/login"
          className="underline underline-offset-4 hover:text-primary"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
