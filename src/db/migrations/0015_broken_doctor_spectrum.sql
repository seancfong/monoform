ALTER TABLE "forms" ADD COLUMN "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL;--> statement-breakpoint
ALTER TABLE "responses" DROP COLUMN IF EXISTS "form_id";--> statement-breakpoint
ALTER TABLE "sections" DROP COLUMN IF EXISTS "form_id";