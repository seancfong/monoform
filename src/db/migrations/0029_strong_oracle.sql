ALTER TABLE "multiple_choice_options" DROP CONSTRAINT "multiple_choice_options_block_id_blocks_id_fk";
--> statement-breakpoint
ALTER TABLE "blocks" DROP COLUMN IF EXISTS "id";--> statement-breakpoint
ALTER TABLE "multiple_choice_options" DROP COLUMN IF EXISTS "block_id";