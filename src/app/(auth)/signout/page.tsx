import { logout } from "@/lib/actions/auth/logout/action";

export default async function Page() {
  return (
    <form action={logout}>
      <button>Sign out</button>
    </form>
  );
}
