ALTER TABLE "workspace_folders" ADD COLUMN "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL;--> statement-breakpoint
ALTER TABLE "forms" ADD COLUMN "workspace_folder_id" uuid NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "forms" ADD CONSTRAINT "forms_workspace_folder_id_workspace_folders_id_fk" FOREIGN KEY ("workspace_folder_id") REFERENCES "public"."workspace_folders"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
