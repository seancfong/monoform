ALTER TABLE "responses" DROP CONSTRAINT "responses_form_id_forms_id_fk";
--> statement-breakpoint
ALTER TABLE "sections" DROP CONSTRAINT "sections_form_id_forms_id_fk";
--> statement-breakpoint
ALTER TABLE "forms" DROP COLUMN IF EXISTS "id";