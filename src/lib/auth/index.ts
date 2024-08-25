import { db } from "@/db";
import { sessions, users } from "@/db/schema";
import { Subset } from "@/lib/types/inferences";
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { InferSelectModel } from "drizzle-orm";
import { Lucia } from "lucia";

const adapter = new DrizzlePostgreSQLAdapter(db, sessions, users);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    // this sets cookies with super long expiration
    // since Next.js doesn't allow Lucia to extend cookie expiration when rendering pages
    expires: false,
    attributes: {
      // set to `true` when using HTTPS
      secure: process.env.VERCEL_ENV === "production",
    },
  },
  getUserAttributes: (attributes) => {
    return {
      email: attributes.email,
      emailVerified: attributes.emailVerified,
    };
  },
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

type DatabaseUserAttributes = Subset<
  InferSelectModel<typeof users>,
  {
    email: string;
    emailVerified: boolean;
  }
>;
