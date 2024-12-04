ALTER TABLE "nutrilense_userProfile" RENAME TO "nutrilense_profile";--> statement-breakpoint
ALTER TABLE "nutrilense_profile" DROP CONSTRAINT "nutrilense_userProfile_userId_nutrilense_user_id_fk";
--> statement-breakpoint
ALTER TABLE "nutrilense_profile" ALTER COLUMN "height" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "nutrilense_profile" ALTER COLUMN "weight" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "nutrilense_profile" ALTER COLUMN "gender" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "nutrilense_profile" ALTER COLUMN "goal" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "nutrilense_profile" ALTER COLUMN "goalCalories" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "nutrilense_profile" ALTER COLUMN "activityLevel" SET NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "nutrilense_profile" ADD CONSTRAINT "nutrilense_profile_userId_nutrilense_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."nutrilense_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
