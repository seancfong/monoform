import { validateUser } from "@/lib/auth/validate-user";
import React from "react";

type Props = {};

export default async function EditFormPage({}: Props) {
  const { user } = await validateUser();

  // TODO: check if user owns form

  return <div>EditFormPage</div>;
}
