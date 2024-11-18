ALTER TABLE "multiple_choice_responses" DROP CONSTRAINT "multiple_choice_responses_selected_option_id_multiple_choice_options_id_fk";
--> statement-breakpoint
ALTER TABLE "multiple_choice_options" DROP COLUMN IF EXISTS "id";--> statement-breakpoint
ALTER TABLE "multiple_choice_responses" DROP COLUMN IF EXISTS "selected_option_id";