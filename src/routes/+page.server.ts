import { getDb } from '$lib/server/db';
import { testimonial } from '$lib/server/db/schema';
import { desc } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ platform }) => {
	if (!platform?.env?.DB) {
		return { testimonials: [] };
	}

	const db = getDb(platform.env.DB);
	const testimonials = await db
		.select()
		.from(testimonial)
		.orderBy(desc(testimonial.createdAt));

	const parsed = testimonials.map(t => ({
		...t,
		socialLinks: t.socialLinks ? (() => { try { return JSON.parse(t.socialLinks); } catch { return null; } })() : null
	}));

	return { testimonials: parsed };
};
