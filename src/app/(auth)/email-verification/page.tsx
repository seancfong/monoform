import { validateRequest } from "@/lib/auth/validate-user";
import { redirect } from "next/navigation";
import React from "react";

type Props = {};

export default async function EmailVerificationPage({}: Props) {
  const { user } = await validateRequest();

  if (!user) {
    return redirect("/login");
  }

  return <div>Verify your email</div>;
}
