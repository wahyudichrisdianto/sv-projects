<script lang="ts">
    import type { Snippet } from "svelte";
    import ProjectsMarquee from "./ProjectsMarquee.svelte";

    interface Project {
        id: string;
        title: string;
        description: string;
        year: string;
        image: string | null;
        link: string | null;
        tags: string[];
    }

    interface Props {
        id?: string;
        label?: string;
        title?: string;
        title2?: string;
        subtext?: string;
        children?: Snippet;
        projects?: Project[];
        stripLabel?: string;
    }

    let {
        id,
        label = "Welcome",
        title = "Creative Developer",
        title2 = "",
        subtext = "Building thoughtful digital experiences with clean code and intentional design.",
        children,
        projects = [],
        stripLabel = "Bringing ambitious ideas into reality.",
    }: Props = $props();
</script>

<section {id} class="hero" aria-label="Hero">
    <div class="hero-inner grid-container">
        {#if label}
            <span class="label hero-label">{label}</span>
        {/if}

        <h1 class="hero-headline">
            {#if children}
                {@render children()}
            {:else}
                {#if title}
                    <span class="hero-title">{title}</span>
                {/if}
                {#if title2}
                    <span class="hero-title2">{title2}</span>
                {/if}
            {/if}
        </h1>

        {#if subtext}
            <p class="hero-subtext">{subtext}</p>
        {/if}
    </div>

    {#if projects && projects.length > 0}
        <div class="hero-strip mx-auto">
            <div class="hero-strip-inner">
                <div class="hero-strip-label-col">
                    <span class="hero-strip-label">{stripLabel}</span>
                </div>
                <div class="hero-strip-marquee">
                    <ProjectsMarquee
                        items={projects}
                        speed={1.2}
                        flat={true}
                        cardWidth={180}
                        cardHeight={96}
                    />
                </div>
            </div>
        </div>
    {/if}
</section>

<style>
    .hero {
        padding: calc(var(--space-section) * 1.5) 0 0;
    }

    .hero-strip {
        margin-top: var(--space-section);
        max-width: 1260px;
        border-top: 1px solid var(--color-border);
        border-bottom: 1px solid var(--color-border);
        overflow: hidden;
    }

    .hero-strip-inner {
        display: grid;
        grid-template-columns: minmax(180px, 22ch) 1fr;
        align-items: stretch;
    }

    .hero-strip-label-col {
        display: flex;
        align-items: center;
        padding: 1.25rem 1.5rem;
        border-right: 1px solid var(--color-border);
        flex-shrink: 0;
    }

    .hero-strip-label {
        font-size: var(--text-xs);
        font-weight: 600;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--color-text-muted);
        line-height: 1.5;
    }

    .hero-strip-marquee {
        overflow: hidden;
        min-width: 0;
    }

    @media (max-width: 767px) {
        .hero-strip-inner {
            grid-template-columns: 1fr;
        }

        .hero-strip-label-col {
            border-right: none;
            border-bottom: 1px solid var(--color-border);
            padding: 1rem 1.25rem;
        }
    }

    .hero-inner {
        margin: 0 auto;
        padding: 0 1.5rem;
    }

    .hero-label {
        display: block;
        margin-bottom: var(--space-element);
    }

    .hero-headline {
        font-size: var(--text-5xl);
        font-weight: 700;
        line-height: 1.1;
        letter-spacing: -0.03em;
        margin-bottom: var(--space-element);
        max-width: 16ch;
    }

    .hero-title {
        display: block;
    }

    .hero-title2 {
        display: block;
        font-size: 26px;
        background: linear-gradient(
            135deg,
            var(--color-accent),
            oklch(65% 0.2 200)
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    @media (min-width: 768px) {
        .hero-headline {
            font-size: var(--text-5xl);
            max-width: 18ch;
        }
    }

    .hero-subtext {
        font-size: var(--text-lg);
        color: var(--color-text-muted);
        max-width: 48ch;
        line-height: 1.6;
    }
</style>
