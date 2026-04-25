<script lang="ts">
    import SectionNav from "$lib/components/SectionNav.svelte";
    import CTA from "$lib/components/CTA.svelte";
    import { sections } from "$lib/configs/navs";
    import { projects } from "$lib/data/content";
</script>

<SectionNav sections={sections.projects} />

<section id="projects" class="page-section">
    <div class="page-inner">
        <span class="label">Projects</span>
        <h1 class="page-title">Selected Work</h1>
        <p class="page-subtitle">
            A collection of projects spanning web applications, design systems,
            and developer tools.
        </p>

        <div class="projects-list">
            {#each projects as project (project.id)}
                <article class="project-item" id={project.id}>
                    <div class="project-header">
                        <div>
                            <h2 class="project-title">{project.title}</h2>
                            <p class="project-desc">{project.description}</p>
                        </div>
                        <span class="project-year">{project.year}</span>
                    </div>
                    <div class="project-footer">
                        <div class="project-tags">
                            {#each project.tags as tag}
                                <span class="tag">{tag}</span>
                            {/each}
                        </div>
                        {#if project.link}
                            <a href={project.link} class="project-link"
                                >View project →</a
                            >
                        {/if}
                    </div>
                </article>
            {/each}
        </div>
    </div>
</section>

<section id="contact">
    <CTA
        label="Collaboration"
        headline="Have a project in mind?"
        description="I'm always interested in new challenges and opportunities to build something meaningful."
        buttonText="Let's Talk"
        buttonLink="/colabo"
    />
</section>

<style>
    .page-section {
        padding: var(--space-section) 0;
    }

    .page-inner {
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

    .projects-list {
        display: flex;
        flex-direction: column;
    }

    .project-item {
        padding: var(--space-element) 0;
        border-top: 1px solid var(--color-border);
    }

    .project-item:last-child {
        border-bottom: 1px solid var(--color-border);
    }

    .project-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 2rem;
        margin-bottom: 1rem;
    }

    .project-title {
        font-size: var(--text-xl);
        font-weight: 600;
        margin-bottom: 0.5rem;
    }

    .project-desc {
        font-size: var(--text-sm);
        color: var(--color-text-muted);
        line-height: 1.6;
        max-width: 56ch;
    }

    .project-year {
        font-size: var(--text-xs);
        font-weight: 600;
        letter-spacing: 0.05em;
        color: var(--color-text-muted);
        white-space: nowrap;
    }

    .project-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
        flex-wrap: wrap;
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

    .project-link {
        font-size: var(--text-sm);
        font-weight: 600;
        letter-spacing: 0.03em;
        color: var(--color-text);
        border-bottom: 1px solid var(--color-border);
        padding-bottom: 1px;
        transition: border-color var(--duration-fast) var(--ease-default);
    }

    .project-link:hover {
        border-color: var(--color-text);
    }
</style>
