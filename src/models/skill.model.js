import {
  pgTable,
  serial,
  integer,
  varchar,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';

import { portofolio } from './portofolio.model.js';

export const skill = pgTable('skill', {
  id: serial('id').primaryKey(),
  portofolio_id: integer('portofolio_id')
    .notNull()
    .references(() => portofolio.id, { onDelete: 'cascade' }),
  skill_name: varchar('skill_name', { length: 255 }).notNull(),
  level: varchar('level', { length: 50 }).default('mid'),
  description: text('description'),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});
