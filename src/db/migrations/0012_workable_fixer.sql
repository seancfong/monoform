ALTER TABLE "user_owns_workspaces" ADD COLUMN "workspace_id" integer NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_owns_workspaces" ADD CONSTRAINT "user_owns_workspaces_workspace_id_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspaces"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
