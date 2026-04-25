<script lang="ts">
    import type { Project } from "$lib/types";

    interface Props {
        projects: Project[];
    }
    let { projects }: Props = $props();

    const displayProjects = $derived(projects.slice(0, 4));
    const hasMore = $derived((projects?.length ?? 0) > 4);
</script>

<section class="projects-preview" aria-label="Selected Projects">
    <div class="projects-inner grid-container">
        <span class="label">Projects</span>
        <h2 class="section-title">Selected Work</h2>

        <div class="projects-grid">
            {#each displayProjects as project (project.id)}
                <a
                    href={project.link || `/projects#${project.id}`}
                    class="project-card"
                >
                    <div class="project-header">
                        <h3 class="project-title">{project.title}</h3>
                        <span class="project-year">{project.year}</span>
                    </div>
                    <p class="project-desc">{project.description}</p>
                    <div class="project-tags">
                        {#each project.tags as tag}
                            <span class="tag">{tag}</span>
                        {/each}
                    </div>
                </a>
            {/each}
        </div>

        {#if hasMore}
            <a href="/projects" class="show-more"> View all projects → </a>
        {/if}
    </div>
</section>

<style>
    .projects-preview {
        padding: var(--space-section) 0;
        border-top: 1px solid var(--color-border);
    }

    .projects-inner {
        margin: 0 auto;
        padding: 0 1.5rem;
    }

    .projects-preview .label {
        display: block;
        margin-bottom: 0.5rem;
    }

    .section-title {
        font-size: var(--text-2xl);
        font-weight: 700;
        letter-spacing: -0.02em;
        margin-bottom: var(--space-block);
    }

    .projects-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1px;
        background: var(--color-border);
        border: 1px solid var(--color-border);
    }

    @media (min-width: 768px) {
        .projects-grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    .project-card {
        display: block;
        padding: 1.5rem;
        background: var(--color-surface);
        transition: background var(--duration-fast) var(--ease-default);
    }

    .project-card:hover {
        background: var(--color-bg);
    }

    .project-header {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        gap: 1rem;
        margin-bottom: 0.75rem;
    }

    .project-title {
        font-size: var(--text-lg);
        font-weight: 600;
    }

    .project-year {
        font-size: var(--text-xs);
        font-weight: 600;
        letter-spacing: 0.05em;
        color: var(--color-text-muted);
        white-space: nowrap;
    }

    .project-desc {
        font-size: var(--text-sm);
        color: var(--color-text-muted);
        line-height: 1.6;
        margin-bottom: 0.75rem;
    }

    .project-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
    }

    .tag {
        font-size: var(--text-xs);
        font-weight: 500;
        letter-spacing: 0.03em;
        padding: 0.25rem 0.625rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-sm);
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
