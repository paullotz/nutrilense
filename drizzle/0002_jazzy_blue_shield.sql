ALTER TABLE "nutrilense_food" ALTER COLUMN "name" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "nutrilense_food" ADD COLUMN "calories" numeric NOT NULL;--> statement-breakpoint
ALTER TABLE "nutrilense_userProfile" ADD COLUMN "goalCalories" numeric;