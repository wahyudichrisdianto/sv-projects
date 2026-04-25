<script lang="ts">
    import ProjectsMarquee from "./ProjectsMarquee.svelte";

    interface Props {
        id?: string;
        projects: {
            id: string;
            title: string;
            description: string;
            year: string;
            image: string | null;
            link: string | null;
            tags: string[];
        }[];
    }

    let { id, projects }: Props = $props();
</script>

<section {id} class="projects-preview" aria-label="Selected Projects">
    <div class="projects-header grid-container">
        <span class="label">Projects</span>
        <h2 class="section-title">The Showcases</h2>
    </div>

    {#if projects.length === 0}
        <p class="projects-empty grid-container">No projects yet.</p>
    {:else}
        <div class="marquee-wrapper">
            <ProjectsMarquee items={projects} speed={0.6} />
        </div>
    {/if}
</section>

<style>
    .projects-preview {
        padding: var(--space-section) 0;
        border-top: 1px solid var(--color-border);
        overflow: hidden;
    }

    .projects-header {
        margin: 0 auto;
        padding: 0 1.5rem;
        margin-bottom: 4px;
    }

    .projects-preview .label {
        display: block;
        margin-bottom: 0.5rem;
    }

    .section-title {
        font-size: var(--text-2xl);
        font-weight: 700;
        letter-spacing: -0.02em;
    }

    .projects-empty {
        color: var(--color-text-muted);
        font-size: var(--text-base);
    }

    .marquee-wrapper {
        /* Full width — breaks out of container */
        width: 100vw;
        margin-left: calc(-50vw + 50%);
    }
</style>
