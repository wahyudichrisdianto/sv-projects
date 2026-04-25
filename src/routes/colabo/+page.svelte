<script lang="ts">
	import SectionNav from '$lib/components/SectionNav.svelte';
	import CTA from '$lib/components/CTA.svelte';
	import { sections, socialMedia } from '$lib/configs/navs';
	import { colaborations } from '$lib/data/content';
</script>

<SectionNav sections={sections.colabo} />

<section id="collaborations" class="page-section">
	<div class="page-inner">
		<span class="label">Colabo</span>
		<h1 class="page-title">Collaborations & Contact</h1>
		<p class="page-subtitle">Partnerships, open source contributions, and community involvement.</p>

		<div class="colabo-list">
			{#each colaborations as colabo (colabo.id)}
				<article class="colabo-item" id={colabo.id}>
					<div class="colabo-header">
						<div>
							<span class="colabo-role">{colabo.role}</span>
							<h2 class="colabo-name">{colabo.name}</h2>
							<p class="colabo-desc">{colabo.description}</p>
						</div>
						<span class="colabo-year">{colabo.year}</span>
					</div>
					{#if colabo.link}
						<a href={colabo.link} class="colabo-link">View details →</a>
					{/if}
				</article>
			{/each}
		</div>
	</div>
</section>

<section id="contact" class="page-section">
	<div class="page-inner">
		<span class="label">Contact</span>
		<h2 class="page-title" style="font-size: var(--text-2xl);">Get in Touch</h2>
		<p class="page-subtitle">I'm always open to new opportunities and interesting conversations.</p>

		<div class="contact-grid">
			{#each socialMedia as item}
				<div class="contact-item">
					<span class="label">{item.label}</span>
					<a
						href={item.href}
						class="contact-link"
						{...(item.external ? { target: '_blank', rel: 'noopener' } : {})}
					>{item.href.replace('mailto:', '').replace('https://', '')}</a>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.page-section {
		padding: var(--space-section) 0;
	}

	.page-section:first-of-type {
		border-top: 1px solid var(--color-border);
	}

	.page-inner {
		max-width: 1200px;
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

	.colabo-list {
		display: flex;
		flex-direction: column;
	}

	.colabo-item {
		padding: var(--space-element) 0;
		border-top: 1px solid var(--color-border);
	}

	.colabo-item:last-child {
		border-bottom: 1px solid var(--color-border);
	}

	.colabo-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 2rem;
	}

	.colabo-role {
		display: inline-block;
		font-size: var(--text-xs);
		font-weight: 600;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--color-text-muted);
		margin-bottom: 0.5rem;
	}

	.colabo-name {
		font-size: var(--text-xl);
		font-weight: 600;
		margin-bottom: 0.5rem;
	}

	.colabo-desc {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		line-height: 1.6;
		max-width: 56ch;
	}

	.colabo-year {
		font-size: var(--text-xs);
		font-weight: 600;
		letter-spacing: 0.05em;
		color: var(--color-text-muted);
		white-space: nowrap;
	}

	.colabo-link {
		display: inline-block;
		margin-top: 0.75rem;
		font-size: var(--text-sm);
		font-weight: 600;
		letter-spacing: 0.03em;
		color: var(--color-text);
		border-bottom: 1px solid var(--color-border);
		padding-bottom: 1px;
		transition: border-color var(--duration-fast) var(--ease-default);
	}

	.colabo-link:hover {
		border-color: var(--color-text);
	}

	.contact-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 0;
		border: 1px solid var(--color-border);
	}

	@media (min-width: 768px) {
		.contact-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	.contact-item {
		padding: 1.25rem;
		border-bottom: 1px solid var(--color-border);
	}

	.contact-item:nth-child(odd) {
		border-right: 1px solid var(--color-border);
	}

	@media (min-width: 768px) {
		.contact-item:nth-child(odd) {
			border-right: none;
		}
		.contact-item:nth-child(1),
		.contact-item:nth-child(2) {
			border-bottom: 1px solid var(--color-border);
		}
		.contact-item:nth-child(3),
		.contact-item:nth-child(4) {
			border-bottom: none;
		}
	}

	.contact-item .label {
		display: block;
		margin-bottom: 0.5rem;
	}

	.contact-link {
		font-size: var(--text-base);
		color: var(--color-text);
		border-bottom: 1px solid var(--color-border);
		padding-bottom: 1px;
		transition: border-color var(--duration-fast) var(--ease-default);
	}

	.contact-link:hover {
		border-color: var(--color-text);
	}
</style>
