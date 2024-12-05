CREATE TABLE IF NOT EXISTS "nutrilense_recipe" (
	"id" text PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"calories" numeric NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"userId" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "nutrilense_recipe" ADD CONSTRAINT "nutrilense_recipe_userId_nutrilense_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."nutrilense_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
