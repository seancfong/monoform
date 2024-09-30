ALTER TABLE "workspace_folders" DROP CONSTRAINT "workspace_folders_workspace_id_workspaces_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "workspace_folders" ADD CONSTRAINT "workspace_folders_workspace_id_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspaces"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
