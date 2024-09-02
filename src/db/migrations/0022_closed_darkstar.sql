CREATE TABLE IF NOT EXISTS "users_own_workspaces" (
	"user_id" text NOT NULL,
	"workspace_id" integer NOT NULL,
	"order_num" integer NOT NULL,
	"slug" text NOT NULL,
	CONSTRAINT "users_own_workspaces_user_id_workspace_id_pk" PRIMARY KEY("user_id","workspace_id"),
	CONSTRAINT "users_own_workspaces_user_id_slug_unique" UNIQUE("user_id","slug"),
	CONSTRAINT "users_own_workspaces_user_id_workspace_id_order_num_unique" UNIQUE("user_id","workspace_id","order_num")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_own_workspaces" ADD CONSTRAINT "users_own_workspaces_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_own_workspaces" ADD CONSTRAINT "users_own_workspaces_workspace_id_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspaces"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
