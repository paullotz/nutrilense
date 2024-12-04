CREATE TABLE IF NOT EXISTS "nutrilense_food" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"protein" numeric NOT NULL,
	"fat" numeric NOT NULL,
	"carbs" numeric NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"userId" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "nutrilense_food" ADD CONSTRAINT "nutrilense_food_userId_nutrilense_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."nutrilense_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
