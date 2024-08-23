"use client";

import { login } from "@/actions/auth/login/action";
import { loginFormSchema, LoginFormState } from "@/actions/auth/login/schema";
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
    },
  );

  return (
    <div className="grid gap-4">
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
              Login
            </Button>
          </div>
          {form.state.error && (
            <p className="text-red-500">{form.state.error}</p>
          )}
        </form>
      </Form>
      <div className="grid gap-3">
        <Button variant="outline" type="button" disabled={form.isPending}>
          Login with GitHub
        </Button>
        <Button variant="outline" type="button" disabled={form.isPending}>
          Login with Google
        </Button>
      </div>
    </div>
  );
}
