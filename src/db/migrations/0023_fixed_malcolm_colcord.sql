ALTER TABLE "forms" DROP CONSTRAINT "forms_workspace_folder_id_workspace_folders_id_fk";
--> statement-breakpoint
ALTER TABLE "workspace_folders" DROP COLUMN IF EXISTS "id";--> statement-breakpoint
ALTER TABLE "forms" DROP COLUMN IF EXISTS "workspace_folder_id";