import { json, type RequestEvent } from '@sveltejs/kit';
import { getDb } from '$lib/server/db';
import { testimonial } from '$lib/server/db/schema';
import { desc } from 'drizzle-orm';

export async function GET({ platform }: RequestEvent) {
	if (!platform?.env?.DB) {
		return json([]);
	}
	const db = getDb(platform.env.DB);
	const rows = await db.select().from(testimonial).orderBy(desc(testimonial.createdAt));
	const parsed = rows.map(r => ({
		...r,
		socialLinks: r.socialLinks ? (() => { try { return JSON.parse(r.socialLinks); } catch { return null; } })() : null
	}));
	return json(parsed);
}

export async function POST({ request, platform }: RequestEvent) {
	if (!platform?.env?.DB) {
		return json({ error: 'Database not available' }, { status: 503 });
	}

	const body = await request.json() as Record<string, unknown>;

	const name = typeof body.name === 'string' ? body.name.trim() : '';
	const role = typeof body.role === 'string' ? body.role.trim() : '';
	const message = typeof body.message === 'string' ? body.message.trim() : '';
	const image = typeof body.image === 'string' ? body.image.trim() : '';

	// socialLinks: array of URL strings, max 4, filter empty
	let socialLinksJson: string | null = null;
	if (body.socialLinks && Array.isArray(body.socialLinks)) {
		const urls = (body.socialLinks as string[])
			.map(u => typeof u === 'string' ? u.trim() : '')
			.filter(u => u.length > 0 && u.startsWith('http'));
		if (urls.length > 4) {
			return json({ error: 'Maximum 4 social links' }, { status: 400 });
		}
		if (urls.length > 0) socialLinksJson = JSON.stringify(urls.slice(0, 4));
	}

	if (!name || !role || !message) {
		return json({ error: 'Name, role, and message are required' }, { status: 400 });
	}

	const db = getDb(platform.env.DB);
	const [row] = await db
		.insert(testimonial)
		.values({
			name,
			role,
			image: image || null,
			message,
			socialLinks: socialLinksJson
		})
		.returning();

	return json(row, { status: 201 });
}
