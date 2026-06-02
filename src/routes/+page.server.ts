import { getDb } from '$lib/server/db';
import {
	testimonial,
	project,
	experience,
	resume,
	resumeExperience,
	resumeEducation,
	resumeCertification
} from '$lib/server/db/schema';
import { asc, desc, eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

function parse<T>(raw: string | null, fallback: T): T {
	if (!raw) return fallback;
	try {
		return JSON.parse(raw) as T;
	} catch {
		return fallback;
	}
}

export const load: PageServerLoad = async ({ platform }) => {
	if (!platform?.env?.DB) {
		return {
			testimonials: [],
			projects: [],
			projectCount: 0,
			experiences: [],
			resume: null,
			resumeExperiences: [],
			resumeEducation: [],
			resumeCertifications: []
		};
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

	// Résumé data — rendered directly inside the home page's résumé modal (no iframe).
	const [profileRows, resumeExp, resumeEdu, resumeCert] = await Promise.all([
		db.select().from(resume).where(eq(resume.id, 'main')),
		db.select().from(resumeExperience).orderBy(asc(resumeExperience.sort)),
		db.select().from(resumeEducation).orderBy(asc(resumeEducation.sort)),
		db.select().from(resumeCertification).orderBy(asc(resumeCertification.sort))
	]);

	const profile = profileRows[0];

	return {
		testimonials: testimonialsParsed,
		projects: projectsParsed,
		projectCount: projects.length,
		experiences: experiencesParsed,
		resume: profile
			? { ...profile, skills: parse<{ category: string; items: string[] }[]>(profile.skills, []) }
			: null,
		resumeExperiences: resumeExp.map((e) => ({ ...e, bullets: parse<string[]>(e.bullets, []) })),
		resumeEducation: resumeEdu,
		resumeCertifications: resumeCert
	};
};
