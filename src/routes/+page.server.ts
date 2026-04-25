import { getDb } from '$lib/server/db';
import { testimonial, project, experience } from '$lib/server/db/schema';
import { desc } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ platform }) => {
	if (!platform?.env?.DB) {
		return { testimonials: [], projects: [], projectCount: 0, experiences: [] };
	}

	const db = getDb(platform.env.DB);

	const testimonials = await db
		.select()
		.from(testimonial)
		.orderBy(desc(testimonial.createdAt));

	const testimonialsParsed = testimonials.map(t => ({
		...t,
		socialLinks: t.socialLinks ? (() => { try { return JSON.parse(t.socialLinks); } catch { return null; } })() : null
	}));

	const projects = await db
		.select()
		.from(project)
		.orderBy(desc(project.createdAt));

	const projectsParsed = projects.map(p => ({
		...p,
		tags: p.tags ? (() => { try { return JSON.parse(p.tags); } catch { return []; } })() : []
	}));

	const experiences = await db
		.select()
		.from(experience)
		.orderBy(desc(experience.createdAt));

	const experiencesParsed = experiences.map(e => ({
		...e,
		technologies: e.technologies ? (() => { try { return JSON.parse(e.technologies); } catch { return []; } })() : []
	}));

	return {
		testimonials: testimonialsParsed,
		projects: projectsParsed,
		projectCount: projects.length,
		experiences: experiencesParsed
	};
};
