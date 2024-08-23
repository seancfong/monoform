import VerificationRequestForm from "@/app/(auth)/email-verification/components/verification-request-form";
import { validateRequest } from "@/lib/auth/validate-user";
import { redirect } from "next/navigation";

type Props = {};

export default async function EmailVerificationPage({}: Props) {
  const { user } = await validateRequest();

  if (!user) {
    return redirect("/login");
  }

  if (user.emailVerified) {
    redirect("/dashboard");
  }

  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <VerificationRequestForm />
    </div>
  );
}
