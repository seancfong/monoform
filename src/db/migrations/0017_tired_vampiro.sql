ALTER TABLE "user_owns_workspaces" ADD COLUMN "order_num" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "user_owns_workspaces" ADD COLUMN "slug" text NOT NULL;--> statement-breakpoint
ALTER TABLE "workspaces" ADD COLUMN "created_at" timestamp with time zone DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "workspaces" ADD COLUMN "updated_at" timestamp with time zone DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "user_owns_workspaces" DROP COLUMN IF EXISTS "created_at";--> statement-breakpoint
ALTER TABLE "user_owns_workspaces" DROP COLUMN IF EXISTS "updated_at";--> statement-breakpoint
ALTER TABLE "user_owns_workspaces" ADD CONSTRAINT "user_owns_workspaces_user_id_slug_unique" UNIQUE("user_id","slug");--> statement-breakpoint
ALTER TABLE "user_owns_workspaces" ADD CONSTRAINT "user_owns_workspaces_user_id_workspace_id_order_num_unique" UNIQUE("user_id","workspace_id","order_num");