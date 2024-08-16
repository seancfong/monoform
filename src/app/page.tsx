import { validateRequest } from "@/lib/auth/validate-user";
import { redirect } from "next/navigation";

export default async function Home() {
  const { user } = await validateRequest();
  if (!user) {
    return redirect("/login");
  }

  return (
    <main className="flex min-h-screen flex-col justify-center items-center">
      <div>hello {user.email}</div>
    </main>
  );
}
