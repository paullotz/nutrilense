ALTER TABLE "nutrilense_user" ADD COLUMN "role" text DEFAULT 'user';--> statement-breakpoint
ALTER TABLE "nutrilense_user" ADD COLUMN "plan" text DEFAULT 'free';