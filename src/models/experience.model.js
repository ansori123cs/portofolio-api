import {
  pgTable,
  serial,
  integer,
  varchar,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';

import { portofolio } from './portofolio.model.js';

export const experience = pgTable('experience', {
  id: serial('id').primaryKey(),
  portofolio_id: integer('portofolio_id')
    .notNull()
    .references(() => portofolio.id, { onDelete: 'cascade' }),
  company_name: varchar('company_name', { length: 255 }).notNull(),
  posicion: varchar('posicion', { length: 255 }).notNull(),
  description: text('description'),
  starting_year: varchar('starting_year', { length: 10 }),
  year_ends: varchar('year_ends', { length: 10 }),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});
