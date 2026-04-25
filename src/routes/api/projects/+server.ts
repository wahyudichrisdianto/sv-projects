import { json, type RequestEvent } from '@sveltejs/kit';
import { getDb } from '$lib/server/db';
import { project } from '$lib/server/db/schema';
import { desc } from 'drizzle-orm';

export async function GET({ platform }: RequestEvent) {
	if (!platform?.env?.DB) {
		return json([]);
	}
	const db = getDb(platform.env.DB);
	const rows = await db.select().from(project).orderBy(desc(project.createdAt));

	// Parse tags JSON
	const parsed = rows.map(r => ({
		...r,
		tags: r.tags ? (() => { try { return JSON.parse(r.tags); } catch { return []; } })() : []
	}));

	return json(parsed);
}
