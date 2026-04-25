import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const task = sqliteTable('task', {
	id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
	title: text('title').notNull(),
	priority: integer('priority').notNull().default(1)
});

export const testimonial = sqliteTable('testimonial', {
	id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
	name: text('name').notNull(),
	role: text('role').notNull(),
	image: text('image'),
	message: text('message').notNull(),
	socialLinks: text('social_links'),
	createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date())
});
