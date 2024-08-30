"use client";

import { signup } from "@/lib/actions/auth/signup/action";
import {
  signupFormSchema,
  SignupFormState,
} from "@/lib/actions/auth/signup/schema";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormButton,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useNextForm } from "@/lib/hooks/useNextForm";
import Link from "next/link";

type Props = {};

export default function SignupForm({}: Props) {
  const form = useNextForm<typeof signupFormSchema, SignupFormState>(
    signup,
    signupFormSchema,
    {
      defaultFields: {
        email: "",
        password: "",
      },
      initialState: {
        error: "",
      },
      mode: "onBlur",
    },
  );

  return (
    <div className="grid gap-6">
      <Form {...form.formManager}>
        <form action={form.action}>
          <div className="grid gap-4">
            <FormField
              control={form.formManager.control}
              name="email"
              render={({ field }) => (
                <FormItem className="grid">
                  <FormLabel>Email</FormLabel>
                  <FormControl clearErrorsOnFocus>
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
              control={form.formManager.control}
              name="password"
              render={({ field }) => (
                <FormItem className="grid">
                  <FormLabel>Password</FormLabel>
                  <FormControl clearErrorsOnFocus>
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
            <FormButton type="submit">Sign up</FormButton>
          </div>
          {form.state.error && (
            <p className="text-destructive">{form.state.error}</p>
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
        <Link
          className={buttonVariants({ variant: "outline" })}
          href="/login/github"
        >
          Login with GitHub
        </Link>
        <Link
          className={buttonVariants({ variant: "outline" })}
          href="/login/google"
        >
          Login with Google
        </Link>
      </div>
    </div>
  );
}
