ALTER TABLE "multiple_choice_responses" DROP CONSTRAINT "multiple_choice_responses_response_id_responses_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "multiple_choice_responses" ADD CONSTRAINT "multiple_choice_responses_response_id_responses_id_fk" FOREIGN KEY ("response_id") REFERENCES "public"."responses"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
