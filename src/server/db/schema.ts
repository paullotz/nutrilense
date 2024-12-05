import {
  text,
  timestamp,
  boolean,
  pgTableCreator,
  decimal,
  pgEnum,
  varchar,
} from "drizzle-orm/pg-core";
import { z } from "zod";
import { createSelectSchema } from "drizzle-zod";

export const createTable = pgTableCreator((name) => `nutrilense_${name}`);

// Enums
export const goalEnum = pgEnum("goal", [
  "gain_muscle",
  "loose_fat",
  "maintain",
]);

export const genderEnum = pgEnum("gender", ["male", "female", "divers"]);

export const activityLevelEnum = pgEnum("activity_level", [
  "low",
  "medium",
  "high",
]);

export const recipe = createTable("recipe", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar("name").notNull(),
  ingredients: varchar("ingredients").notNull(),
  instructions: varchar("instructions").notNull(),
  calories: decimal("calories").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  userId: text("userId")
    .notNull()
    .references(() => user.id),
});

export const food = createTable("food", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar("name").notNull(),
  protein: decimal("protein").notNull(),
  fat: decimal("fat").notNull(),
  carbs: decimal("carbs").notNull(),
  calories: decimal("calories").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  userId: text("userId")
    .notNull()
    .references(() => user.id),
});

export const profile = createTable("profile", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  height: decimal("height").notNull(),
  weight: decimal("weight").notNull(),
  gender: genderEnum("gender").default("divers").notNull(),
  goal: goalEnum("goal").default("gain_muscle").notNull(),
  goalCalories: decimal("goalCalories").notNull(),
  activityLevel: activityLevelEnum("activityLevel").default("low").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  userId: text("userId")
    .notNull()
    .references(() => user.id),
});

export const user = createTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("emailVerified").notNull(),
  image: text("image"),
  role: text("role").default("admin"),
  plan: text("plan").default("free"),
  createdAt: timestamp("createdAt").notNull(),
  updatedAt: timestamp("updatedAt").notNull(),
});

export const session = createTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expiresAt").notNull(),
  ipAddress: text("ipAddress"),
  userAgent: text("userAgent"),
  userId: text("userId")
    .notNull()
    .references(() => user.id),
});

export const account = createTable("account", {
  id: text("id").primaryKey(),
  accountId: text("accountId").notNull(),
  providerId: text("providerId").notNull(),
  userId: text("userId")
    .notNull()
    .references(() => user.id),
  accessToken: text("accessToken"),
  refreshToken: text("refreshToken"),
  idToken: text("idToken"),
  expiresAt: timestamp("expiresAt"),
  password: text("password"),
});

export const verification = createTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expiresAt").notNull(),
});

export const schema = {
  user,
  food,
  recipe,
  profile,
  session,
  account,
  verification,
};

export type User = z.infer<ReturnType<typeof createSelectSchema<typeof user>>>;
export type Food = z.infer<ReturnType<typeof createSelectSchema<typeof food>>>;
export type Recipe = z.infer<
  ReturnType<typeof createSelectSchema<typeof recipe>>
>;
export type Profile = z.infer<
  ReturnType<typeof createSelectSchema<typeof profile>>
>;
