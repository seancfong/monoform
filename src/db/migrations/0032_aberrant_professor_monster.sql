ALTER TABLE "multiple_choice_options" ADD COLUMN "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL;--> statement-breakpoint
ALTER TABLE "multiple_choice_responses" ADD COLUMN "selected_option_id" uuid;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "multiple_choice_responses" ADD CONSTRAINT "multiple_choice_responses_selected_option_id_multiple_choice_options_id_fk" FOREIGN KEY ("selected_option_id") REFERENCES "public"."multiple_choice_options"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
