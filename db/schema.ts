import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
export const packing = sqliteTable('packing', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  owner: text('owner').notNull(),
  done: integer('done', {mode: 'boolean'}).notNull().default(false),
  version: integer('version').notNull().default(1),
});
