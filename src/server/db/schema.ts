import {
  text,
  timestamp,
  boolean,
  pgtablecreator,
  varchar,
} from "drizzle-orm/pg-core";
import { z } from "zod";
import { createselectschema } from "drizzle-zod";

export const createtable = pgtablecreator((name) => `nutrilense_${name}`);

export const user = createtable("user", {
  id: text("id").primarykey(),
  name: text("name").notnull(),
  email: text("email").notnull().unique(),
  emailverified: boolean("emailverified").notnull(),
  image: text("image"),
  createdat: timestamp("createdat").notnull(),
  updatedat: timestamp("updatedat").notnull(),
});

export const session = createtable("session", {
  id: text("id").primarykey(),
  expiresat: timestamp("expiresat").notnull(),
  ipaddress: text("ipaddress"),
  useragent: text("useragent"),
  userid: text("userid")
    .notnull()
    .references(() => user.id),
});

export const account = createtable("account", {
  id: text("id").primarykey(),
  accountid: text("accountid").notnull(),
  providerid: text("providerid").notnull(),
  userid: text("userid")
    .notnull()
    .references(() => user.id),
  accesstoken: text("accesstoken"),
  refreshtoken: text("refreshtoken"),
  idtoken: text("idtoken"),
  expiresat: timestamp("expiresat"),
  password: text("password"),
});

export const verification = createtable("verification", {
  id: text("id").primarykey(),
  identifier: text("identifier").notnull(),
  value: text("value").notnull(),
  expiresat: timestamp("expiresat").notnull(),
});

export type check = z.infer<
  returntype<typeof createselectschema<typeof check>>
>;
export type user = z.infer<returntype<typeof createselectschema<typeof user>>>;
