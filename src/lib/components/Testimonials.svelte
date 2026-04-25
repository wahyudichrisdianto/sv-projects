<script lang="ts">
    import { getPlatformIcon } from '$lib/utils/social';

    interface Props {
        testimonials: {
            id: string;
            name: string;
            role: string;
            image: string | null;
            message: string;
            socialLinks: string[] | null;
            createdAt: Date | null;
        }[];
    }

    let { testimonials }: Props = $props();
</script>

<section class="testimonials" aria-label="Testimonials">
    <div class="testimonials-inner grid-container">
        <span class="label">Testimonials</span>
        <h2 class="testimonials-heading">What People Say</h2>

        {#if testimonials.length === 0}
            <p class="testimonials-empty">No testimonials yet.</p>
        {:else}
            <div class="testimonials-grid">
                {#each testimonials as t (t.id)}
                    <article class="testimonial-card">
                        <blockquote class="testimonial-message">
                            "{t.message}"
                        </blockquote>
                        <div class="testimonial-author">
                            {#if t.image}
                                <img src={t.image} alt={t.name} class="testimonial-avatar" />
                            {:else}
                                <div class="testimonial-avatar-placeholder">
                                    {t.name.charAt(0).toUpperCase()}
                                </div>
                            {/if}
                            <div class="testimonial-meta">
                                <span class="testimonial-name">{t.name}</span>
                                <span class="testimonial-role">{t.role}</span>
                                {#if t.socialLinks && t.socialLinks.length > 0}
                                    <div class="social-links">
                                        {#each t.socialLinks as url}
                                            <a
                                                href={url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                class="social-link"
                                                title={url}
                                                aria-label={url}
                                            >
                                                {@html getPlatformIcon(url)}
                                            </a>
                                        {/each}
                                    </div>
                                {/if}
                            </div>
                        </div>
                    </article>
                {/each}
            </div>
        {/if}
    </div>
</section>

<style>
    .testimonials {
        padding: var(--space-section) 0;
        border-top: 1px solid var(--color-border);
    }

    .testimonials-inner {
        margin: 0 auto;
        padding: 0 1.5rem;
    }

    .testimonials-heading {
        font-size: var(--text-2xl);
        font-weight: 700;
        letter-spacing: -0.02em;
        margin-bottom: calc(var(--space-block) + 2rem);
    }

    .testimonials-empty {
        color: var(--color-text-muted);
        font-size: var(--text-base);
    }

    .testimonials-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--space-block);
    }

    @media (min-width: 768px) {
        .testimonials-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem;
        }
    }

    .testimonial-card {
        border: 1px solid var(--color-border);
        padding: 1.5rem;
        transition: border-color var(--duration-normal) var(--ease-default);
    }

    .testimonial-card:hover {
        border-color: var(--color-border-hover);
    }

    .testimonial-message {
        font-size: var(--text-base);
        line-height: 1.7;
        color: var(--color-text-muted);
        margin-bottom: 1.5rem;
        quotes: none;
    }

    .testimonial-author {
        display: flex;
        align-items: center;
        gap: 0.875rem;
        border-top: 1px solid var(--color-border);
        padding-top: 1rem;
    }

    .testimonial-avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
        border: 1px solid var(--color-border);
    }

    .testimonial-avatar-placeholder {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: var(--color-border);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: var(--text-sm);
        font-weight: 600;
        color: var(--color-text-muted);
        border: 1px solid var(--color-border);
    }

    .testimonial-meta {
        display: flex;
        flex-direction: column;
        gap: 0.125rem;
    }

    .testimonial-name {
        font-size: var(--text-sm);
        font-weight: 600;
        color: var(--color-text);
    }

    .testimonial-role {
        font-size: var(--text-xs);
        color: var(--color-text-muted);
    }

    .social-links {
        display: flex;
        gap: 0.5rem;
        margin-top: 0.375rem;
    }

    .social-link {
        width: 18px;
        height: 18px;
        color: var(--color-text-muted);
        transition: color var(--duration-fast) var(--ease-default);
    }

    .social-link:hover {
        color: var(--color-text);
    }

    .social-link :global(svg) {
        width: 100%;
        height: 100%;
    }
</style>
