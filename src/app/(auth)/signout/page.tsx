import { logout } from "@/actions/auth";

export default async function Page() {
  return (
    <form action={logout}>
      <button>Sign out</button>
    </form>
  );
}
