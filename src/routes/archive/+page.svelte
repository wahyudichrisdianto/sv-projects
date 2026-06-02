<script lang="ts">
	import SectionNav from '$lib/components/SectionNav.svelte';
	import CTA from '$lib/components/CTA.svelte';
	import { sections } from '$lib/configs/navs';
	import { blogPosts } from '$lib/data/content';
</script>

<SectionNav sections={sections.archive} />

<section id="articles" class="page-section">
	<div class="page-inner">
		<span class="label">Archive</span>
		<h1 class="page-title">Writing & Articles</h1>
		<p class="page-subtitle">Thoughts on development, design, and building for the web.</p>

		<div class="articles-list">
			{#each blogPosts as post (post.id)}
				<article class="article-item" id={post.id}>
					<div class="article-meta">
						<time datetime={post.date}>{post.date}</time>
						{#each post.tags as tag}
							<span class="tag">{tag}</span>
						{/each}
					</div>
					<h2 class="article-title">{post.title}</h2>
					<p class="article-excerpt">{post.excerpt}</p>
					<a href={`/blog/${post.slug}`} class="article-link">Read more →</a>
				</article>
			{/each}
		</div>
	</div>
</section>

<section id="rss">
	<CTA
		label="RSS Feed"
		headline="Never miss an article"
		description="Subscribe to my RSS feed and get new posts delivered directly to your reader. No spam, no algorithms."
		buttons={[
			{ label: 'Subscribe RSS', href: '/rss.xml' }
		]}
	/>
</section>

<style>
	.page-section {
		padding: var(--space-section) 0;
	}

	.page-inner {
		max-width: 860px;
		margin: 0 auto;
		padding: 0 1.5rem;
	}

	.page-section .label {
		display: block;
		margin-bottom: 0.5rem;
	}

	.page-title {
		font-size: var(--text-3xl);
		font-weight: 700;
		letter-spacing: -0.02em;
		margin-bottom: 0.5rem;
	}

	@media (min-width: 768px) {
		.page-title {
			font-size: var(--text-4xl);
		}
	}

	.page-subtitle {
		font-size: var(--text-base);
		color: var(--color-text-muted);
		max-width: 48ch;
		margin-bottom: var(--space-block);
	}

	.articles-list {
		display: flex;
		flex-direction: column;
	}

	.article-item {
		padding: var(--space-element) 0;
		border-top: 1px solid var(--color-border);
	}

	.article-item:last-child {
		border-bottom: 1px solid var(--color-border);
	}

	.article-meta {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		margin-bottom: 0.5rem;
	}

	.article-meta time {
		font-size: var(--text-xs);
		font-weight: 600;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		color: var(--color-text-muted);
	}

	.article-title {
		font-size: var(--text-xl);
		font-weight: 600;
		margin-bottom: 0.5rem;
	}

	.article-excerpt {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		line-height: 1.6;
		margin-bottom: 0.75rem;
		max-width: 64ch;
	}

	.article-link {
		font-size: var(--text-sm);
		font-weight: 600;
		letter-spacing: 0.03em;
		color: var(--color-text);
		border-bottom: 1px solid var(--color-border);
		padding-bottom: 1px;
		transition: border-color var(--duration-fast) var(--ease-default);
	}

	.article-link:hover {
		border-color: var(--color-text);
	}

	.tag {
		font-size: var(--text-xs);
		font-weight: 500;
		letter-spacing: 0.03em;
		padding: 0.25rem 0.625rem;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-sm);
	}
</style>
