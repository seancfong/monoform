ALTER TABLE "user_owns_workspaces" DROP CONSTRAINT "user_owns_workspaces_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "user_owns_workspaces" DROP CONSTRAINT "user_owns_workspaces_workspace_id_workspaces_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_owns_workspaces" ADD CONSTRAINT "user_owns_workspaces_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_owns_workspaces" ADD CONSTRAINT "user_owns_workspaces_workspace_id_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspaces"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
