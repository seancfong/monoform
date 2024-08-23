"use client";
import handleEmailVerification from "@/actions/auth/handle-email-verification/action";
import {
  verifyEmailCodeFormSchema,
  VerifyEmailCodeFormState,
} from "@/actions/auth/handle-email-verification/schema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useNextForm } from "@/lib/hooks/useNextForm";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";

type Props = {
  message: string;
};

export default function EnterCodeForm({ message }: Props) {
  const form = useNextForm<
    typeof verifyEmailCodeFormSchema,
    VerifyEmailCodeFormState
  >(handleEmailVerification, verifyEmailCodeFormSchema, {
    defaultFields: {
      code: "",
    },
    initialState: {
      error: "",
    },
  });

  return (
    <div className="flex flex-col items-center space-y-8 text-center">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Enter verification code
        </h1>
        <p className="text-sm text-zinc-500">{message}</p>
      </div>
      <Form {...form.formManager}>
        <form
          ref={form.ref}
          action={form.action}
          onSubmit={form.onSubmit}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={form.formManager.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Verification Code</FormLabel>
                <FormControl>
                  <InputOTP
                    maxLength={6}
                    pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                    {...field}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
