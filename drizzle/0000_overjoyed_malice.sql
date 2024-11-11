CREATE TABLE IF NOT EXISTS "nutrilense_account" (
	"id" text PRIMARY KEY NOT NULL,
	"accountId" text NOT NULL,
	"providerId" text NOT NULL,
	"userId" text NOT NULL,
	"accessToken" text,
	"refreshToken" text,
	"idToken" text,
	"expiresAt" timestamp,
	"password" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "nutrilense_userProfile" (
	"id" text PRIMARY KEY NOT NULL,
	"height" numeric NOT NULL,
	"name" text NOT NULL,
	"gender" "gender" DEFAULT 'divers',
	"goal" "goal" DEFAULT 'gain_muscle',
	"activityLevel" "activity_level" DEFAULT 'low',
	"createdAt" timestamp NOT NULL,
	"updatedAt" timestamp NOT NULL,
	"userId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "nutrilense_session" (
	"id" text PRIMARY KEY NOT NULL,
	"expiresAt" timestamp NOT NULL,
	"ipAddress" text,
	"userAgent" text,
	"userId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "nutrilense_user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"emailVerified" boolean NOT NULL,
	"image" text,
	"createdAt" timestamp NOT NULL,
	"updatedAt" timestamp NOT NULL,
	CONSTRAINT "nutrilense_user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "nutrilense_verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expiresAt" timestamp NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "nutrilense_account" ADD CONSTRAINT "nutrilense_account_userId_nutrilense_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."nutrilense_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "nutrilense_userProfile" ADD CONSTRAINT "nutrilense_userProfile_userId_nutrilense_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."nutrilense_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "nutrilense_session" ADD CONSTRAINT "nutrilense_session_userId_nutrilense_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."nutrilense_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
