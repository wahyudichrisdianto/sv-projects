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

// ── Résumé / CV (singleton profile + managed sections, edited via ../sv_manager) ──
export const resume = sqliteTable('resume', {
	id: text('id').primaryKey().default('main'),
	fullName: text('full_name').notNull().default(''),
	headline: text('headline').notNull().default(''),
	location: text('location'),
	email: text('email'),
	phone: text('phone'),
	website: text('website'),
	linkedin: text('linkedin'),
	summary: text('summary'),
	skills: text('skills'), // JSON: [{ category, items: string[] }]
	includeProjects: integer('include_projects', { mode: 'boolean' }).notNull().default(false),
	includeCollaborations: integer('include_collaborations', { mode: 'boolean' })
		.notNull()
		.default(false),
	updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date())
});

export const resumeExperience = sqliteTable('resume_experience', {
	id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
	title: text('title').notNull(),
	company: text('company').notNull(),
	location: text('location'),
	startDate: text('start_date').notNull(),
	endDate: text('end_date').notNull().default('Present'),
	bullets: text('bullets'), // JSON: string[]
	techStack: text('tech_stack'),
	sort: integer('sort').notNull().default(0)
});

export const resumeEducation = sqliteTable('resume_education', {
	id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
	degree: text('degree').notNull(),
	institution: text('institution').notNull(),
	location: text('location'),
	period: text('period'),
	detail: text('detail'),
	sort: integer('sort').notNull().default(0)
});

export const resumeCertification = sqliteTable('resume_certification', {
	id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
	title: text('title').notNull(),
	issuer: text('issuer'),
	date: text('date'),
	sort: integer('sort').notNull().default(0)
});
