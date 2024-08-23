"use client";

import { signup } from "@/actions/auth/signup/action";
import {
  signupFormSchema,
  SignupFormState,
} from "@/actions/auth/signup/schema";
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
import { useNextForm } from "@/lib/hooks/useNextForm";

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
    },
  );

  return (
    <div className="grid gap-6">
      <Form {...form.formManager}>
        <form ref={form.ref} action={form.action} onSubmit={form.onSubmit}>
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
            <Button type="submit" disabled={form.isPending}>
              Sign up
            </Button>
          </div>
          {form.state.error && (
            <p className="text-red-500">{form.state.error}</p>
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
  );
}
