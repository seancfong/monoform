ALTER TABLE "blocks" DROP CONSTRAINT "blocks_section_id_sections_id_fk";
--> statement-breakpoint
ALTER TABLE "blocks" DROP COLUMN IF EXISTS "section_id";--> statement-breakpoint
ALTER TABLE "sections" DROP COLUMN IF EXISTS "id";