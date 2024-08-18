import { validateRequest } from "@/lib/auth/validate-user";
import { redirect } from "next/navigation";
import React from "react";

type Props = {};

export default async function DashboardPage({}: Props) {
  const { user } = await validateRequest();

  if (!user) {
    return redirect("/login");
  }

  if (!user.emailVerified) {
    return redirect("/email-verification");
  }

  return <div>DashboardPage</div>;
}
