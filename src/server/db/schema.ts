import {
  text,
  timestamp,
  boolean,
  pgTableCreator,
  decimal,
  pgEnum,
} from "drizzle-orm/pg-core";
import { z } from "zod";
import { createSelectSchema } from "drizzle-zod";

export const createTable = pgTableCreator((name) => `nutrilense_${name}`);

// Enums
const goalEnum = pgEnum("goal", ["gain_muscle", "loose_fat", "maintain"]);
const genderEnum = pgEnum("gender", ["male", "female", "divers"]);
const activityLevelEnum = pgEnum("activity_level", ["low", "medium", "high"]);

export const profile = createTable("userProfile", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  height: decimal("height").notNull(),
  weight: text("name").notNull(),
  gender: genderEnum("gender").default("divers"),
  goal: goalEnum("goal").default("gain_muscle"),
  activityLevel: activityLevelEnum("activityLevel").default("low"),
  createdAt: timestamp("createdAt").notNull(),
  updatedAt: timestamp("updatedAt").notNull(),
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

export type User = z.infer<ReturnType<typeof createSelectSchema<typeof user>>>;
