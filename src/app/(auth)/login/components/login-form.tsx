"use client";

import { login } from "@/lib/actions/auth/login/action";
import {
  loginFormSchema,
  LoginFormState,
} from "@/lib/actions/auth/login/schema";
import { buttonVariants } from "@/components/ui/button";
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

export default function LoginForm({}: Props) {
  const form = useNextForm<typeof loginFormSchema, LoginFormState>(
    login,
    loginFormSchema,
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
    <div className="grid gap-4">
      <Form {...form.formManager}>
        <form action={form.action}>
          <div className="grid gap-4">
            <FormField
              control={form.formManager.control}
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
              control={form.formManager.control}
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
            <FormButton type="submit">Login</FormButton>
          </div>
          {form.state.error && (
            <p className="text-red-500">{form.state.error}</p>
          )}
        </form>
      </Form>
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
