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

export const experience = sqliteTable('experience', {
	id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
	role: text('role').notNull(),
	company: text('company').notNull(),
	startDate: text('start_date').notNull(),
	endDate: text('end_date').notNull().default('Present'),
	description: text('description').notNull(),
	technologies: text('technologies'),
	createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date())
});

export const project = sqliteTable('project', {
	id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
	title: text('title').notNull(),
	description: text('description').notNull(),
	year: text('year').notNull(),
	image: text('image'),
	link: text('link'),
	tags: text('tags'),
	featured: integer('featured', { mode: 'boolean' }).notNull().default(false),
	createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date())
});
