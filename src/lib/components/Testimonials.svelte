<script lang="ts">
    import MarqueeColumn from './MarqueeColumn.svelte';

    interface Props {
        id?: string;
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

    let { id, testimonials }: Props = $props();

    // Deterministic shuffle — same on SSR and CSR
    function shuffle<T>(arr: T[], seed: number): T[] {
        const a = [...arr];
        let s = seed;
        for (let i = a.length - 1; i > 0; i--) {
            s = (s * 16807) % 2147483647;
            const j = s % (i + 1);
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    // Each column gets ALL testimonials shuffled differently
    const COL_CONFIG = [
        { seed: 42, speed: 0.35 },
        { seed: 13, speed: 0.50 },
        { seed: 99, speed: 0.70 },
        { seed: 7,  speed: 0.90 },
    ];

    const columns = COL_CONFIG.map(cfg => ({
        items: shuffle(testimonials, cfg.seed),
        speed: cfg.speed,
    }));
</script>

<section {id} class="testimonials" aria-label="Testimonials">
    <div class="testimonials-inner">
        <div class="testimonials-header">
            <span class="label">Testimonials</span>
            <h2 class="testimonials-heading">What People Say</h2>
        </div>

        {#if testimonials.length === 0}
            <p class="testimonials-empty">No testimonials yet.</p>
        {:else}
            <div class="marquee-grid">
                {#each columns as col, colIdx}
                    {#if col.items.length > 0}
                        <MarqueeColumn items={col.items} speed={col.speed} colIdx={colIdx} />
                    {/if}
                {/each}
            </div>
        {/if}
    </div>
</section>

<style>
    .testimonials {
        padding: var(--space-section) 0;
        border-top: 1px solid var(--color-border);
        overflow: hidden;
    }

    .testimonials-inner {
        margin: 0 auto;
        padding: 0 1.5rem;
        max-width: 1100px;
        container-type: inline-size;
        container-name: testimonials;
    }

    .testimonials-header {
        text-align: center;
        margin-bottom: calc(var(--space-block) + 2rem);
    }

    .testimonials-heading {
        font-size: var(--text-2xl);
        font-weight: 700;
        letter-spacing: -0.02em;
    }

    .testimonials-empty {
        color: var(--color-text-muted);
        text-align: center;
    }

    /* ── Marquee grid: default 1 column ── */
    .marquee-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1rem;
        height: 460px;
        position: relative;
    }

    /* Hide extra columns by default */
    .marquee-grid :global(.marquee-col:nth-child(n+2)) {
        display: none;
    }

    /* Fade masks at top & bottom */
    .marquee-grid::before,
    .marquee-grid::after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        height: 80px;
        z-index: 10;
        pointer-events: none;
    }

    .marquee-grid::before {
        top: 0;
        background: linear-gradient(to bottom, var(--color-bg), transparent);
    }

    .marquee-grid::after {
        bottom: 0;
        background: linear-gradient(to top, var(--color-bg), transparent);
    }

    /* ── Container queries: reveal more columns as width grows ── */

    /* 2 columns */
    @container testimonials (min-width: 520px) {
        .marquee-grid {
            grid-template-columns: repeat(2, 1fr);
        }
        .marquee-grid :global(.marquee-col:nth-child(2)) {
            display: block;
        }
    }

    /* 3 columns */
    @container testimonials (min-width: 800px) {
        .marquee-grid {
            grid-template-columns: repeat(3, 1fr);
        }
        .marquee-grid :global(.marquee-col:nth-child(3)) {
            display: block;
        }
    }

    /* 4 columns */
    @container testimonials (min-width: 1040px) {
        .marquee-grid {
            grid-template-columns: repeat(4, 1fr);
        }
        .marquee-grid :global(.marquee-col:nth-child(4)) {
            display: block;
        }
    }

    /* Viewport fallback for browsers without container query support */
    @media (min-width: 520px) and (max-width: 799px) {
        .marquee-grid {
            grid-template-columns: repeat(2, 1fr);
        }
        .marquee-grid :global(.marquee-col:nth-child(2)) {
            display: block;
        }
    }

    @media (min-width: 800px) and (max-width: 1039px) {
        .marquee-grid {
            grid-template-columns: repeat(3, 1fr);
        }
        .marquee-grid :global(.marquee-col:nth-child(2)),
        .marquee-grid :global(.marquee-col:nth-child(3)) {
            display: block;
        }
    }

    @media (min-width: 1040px) {
        .marquee-grid {
            grid-template-columns: repeat(4, 1fr);
        }
        .marquee-grid :global(.marquee-col:nth-child(2)),
        .marquee-grid :global(.marquee-col:nth-child(3)),
        .marquee-grid :global(.marquee-col:nth-child(4)) {
            display: block;
        }
    }

    @media (prefers-reduced-motion: reduce) {
        .marquee-grid :global(.marquee-track) {
            animation: none !important;
        }
    }
</style>
