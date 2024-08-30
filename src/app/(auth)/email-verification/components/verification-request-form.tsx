"use client";
import sendEmailVerification from "@/lib/actions/auth/send-email-verification/action";
import EnterCodeForm from "@/app/(auth)/email-verification/components/enter-code-form";
import { Button } from "@/components/ui/button";
import { useFormState, useFormStatus } from "react-dom";

type Props = {};

export default function VerificationRequestForm({}: Props) {
  const [state, action] = useFormState(sendEmailVerification, {
    message: "",
    success: false,
  });

  if (state.success) {
    return <EnterCodeForm message={state.message} />;
  }

  return (
    <>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Verify your email
        </h1>
        <p className="text-sm text-zinc-500">
          We just want to make sure that it&apos;s really you.
        </p>
      </div>
      <form action={action} className="flex flex-col">
        <SendButton />
      </form>
    </>
  );
}

function SendButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      Send verification code
    </Button>
  );
}
