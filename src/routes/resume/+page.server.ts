import { getDb } from '$lib/server/db';
import {
	resume,
	resumeExperience,
	resumeEducation,
	resumeCertification
} from '$lib/server/db/schema';
import { asc, eq } from 'drizzle-orm';
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
		return { resume: null, experiences: [], education: [], certifications: [] };
	}

	const db = getDb(platform.env.DB);

	const [profileRows, experiences, education, certifications] = await Promise.all([
		db.select().from(resume).where(eq(resume.id, 'main')),
		db.select().from(resumeExperience).orderBy(asc(resumeExperience.sort)),
		db.select().from(resumeEducation).orderBy(asc(resumeEducation.sort)),
		db.select().from(resumeCertification).orderBy(asc(resumeCertification.sort))
	]);

	const profile = profileRows[0];

	return {
		resume: profile
			? {
					...profile,
					skills: parse<{ category: string; items: string[] }[]>(profile.skills, [])
				}
			: null,
		experiences: experiences.map((e) => ({ ...e, bullets: parse<string[]>(e.bullets, []) })),
		education,
		certifications
	};
};
