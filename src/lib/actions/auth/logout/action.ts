"use server";

import { lucia } from "@/lib/auth";
import { validateRequest } from "@/lib/auth/validate-user";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface ActionResult {
  error: string;
}

export async function logout(): Promise<ActionResult> {
  const { session } = await validateRequest();
  if (!session) {
    return {
      error: "Unauthorized",
    };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  redirect("/login");
}
