import { db } from "@/src/db";
import { usersTable } from "@/src/db/schema";

export default async function Home() {
  const users = await db.select().from(usersTable);

  return (
    <main className="flex min-h-screen flex-col justify-center items-center">
      <div>hello monoform!</div>
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </main>
  );
}
