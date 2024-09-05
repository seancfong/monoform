import VerificationRequestForm from "@/app/(auth)/email-verification/components/verification-request-form";
import { validateUser } from "@/lib/auth/validate-user";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify your email | Monoform",
};

type Props = {};

export default async function EmailVerificationPage({}: Props) {
  await validateUser();

  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <VerificationRequestForm />
    </div>
  );
}
