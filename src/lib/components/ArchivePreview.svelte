<script lang="ts">
    import type { BlogPost } from "$lib/types";

    interface Props {
        posts: BlogPost[];
    }
    let { posts }: Props = $props();

    const displayPosts = $derived(posts.slice(0, 4));
    const hasMore = $derived((posts?.length ?? 0) > 4);
</script>

<section class="archive-preview" aria-label="Recent Articles">
    <div class="archive-inner grid-container">
        <span class="label">Archive</span>
        <h2 class="section-title">Recent Writing</h2>

        <div class="posts-grid">
            {#each displayPosts as post (post.id)}
                <a href={`/archive#${post.id}`} class="post-card">
                    <div class="post-meta">
                        <time datetime={post.date}>{post.date}</time>
                        {#each post.tags as tag}
                            <span class="post-tag">{tag}</span>
                        {/each}
                    </div>
                    <h3 class="post-title">{post.title}</h3>
                    <p class="post-excerpt">{post.excerpt}</p>
                </a>
            {/each}
        </div>

        {#if hasMore}
            <a href="/archive" class="show-more"> View all articles → </a>
        {/if}
    </div>
</section>

<style>
    .archive-preview {
        padding: var(--space-section) 0;
        border-top: 1px solid var(--color-border);
    }

    .archive-inner {
        margin: 0 auto;
        padding: 0 1.5rem;
    }

    .archive-preview .label {
        display: block;
        margin-bottom: 0.5rem;
    }

    .section-title {
        font-size: var(--text-2xl);
        font-weight: 700;
        letter-spacing: -0.02em;
        margin-bottom: var(--space-block);
    }

    .posts-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1px;
        background: var(--color-border);
        border: 1px solid var(--color-border);
    }

    @media (min-width: 768px) {
        .posts-grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    .post-card {
        display: block;
        padding: 1.5rem;
        background: var(--color-surface);
        transition: background var(--duration-fast) var(--ease-default);
    }

    .post-card:hover {
        background: var(--color-bg);
    }

    .post-meta {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        margin-bottom: 0.75rem;
    }

    .post-meta time {
        font-size: var(--text-xs);
        font-weight: 600;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        color: var(--color-text-muted);
    }

    .post-tag {
        font-size: 0.625rem;
        font-weight: 500;
        padding: 0.125rem 0.5rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-sm);
        color: var(--color-text-muted);
    }

    .post-title {
        font-size: var(--text-lg);
        font-weight: 600;
        line-height: 1.3;
        margin-bottom: 0.5rem;
    }

    .post-excerpt {
        font-size: var(--text-sm);
        color: var(--color-text-muted);
        line-height: 1.6;
    }

    .show-more {
        display: inline-block;
        margin-top: var(--space-element);
        padding: 0.75rem 1.5rem;
        font-size: var(--text-sm);
        font-weight: 600;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        border: 1px solid var(--color-border);
        transition: all var(--duration-fast) var(--ease-default);
    }

    .show-more:hover {
        border-color: var(--color-text);
        background: var(--color-text);
        color: var(--color-surface);
    }
</style>
