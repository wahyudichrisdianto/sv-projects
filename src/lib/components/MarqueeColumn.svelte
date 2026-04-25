<script lang="ts">
    import { onMount } from 'svelte';
    import { getPlatformIcon } from '$lib/utils/social';

    interface Props {
        items: {
            id: string;
            name: string;
            role: string;
            image: string | null;
            message: string;
            socialLinks: string[] | null;
            createdAt: Date | null;
        }[];
        speed: number;
        colIdx: number;
    }

    let { items, speed, colIdx }: Props = $props();

    let trackEl = $state<HTMLDivElement | null>(null);
    let scrollPos = $state(0);
    let setHeight = $state(0);
    let ready = $state(false);

    const GAP = 14; // 0.875rem in px

    onMount(() => {
        if (!trackEl) return;

        // Measure the height of ONE set of items (first half of duplicated track)
        function measure() {
            const cards = trackEl!.querySelectorAll<HTMLElement>('.marquee-card');
            const half = Math.floor(cards.length / 2);
            let h = 0;
            for (let i = 0; i < half; i++) {
                h += cards[i].offsetHeight + GAP;
            }
            setHeight = h;
            ready = true;
        }

        // Initial measure after layout
        requestAnimationFrame(measure);

        // Remeasure on resize
        const ro = new ResizeObserver(() => {
            measure();
        });
        ro.observe(trackEl);

        // Animation loop
        let rafId: number;
        function tick() {
            if (setHeight > 0) {
                scrollPos += speed;
                if (scrollPos >= setHeight) {
                    scrollPos = 0; // Instant reset — seamless because second half mirrors first
                }
            }
            rafId = requestAnimationFrame(tick);
        }
        rafId = requestAnimationFrame(tick);

        return () => {
            cancelAnimationFrame(rafId);
            ro.disconnect();
        };
    });

    // Duplicate items for seamless loop
    const duplicated = [...items, ...items];
</script>

<div class="marquee-col">
    <div
        class="marquee-track"
        class:ready
        bind:this={trackEl}
        style="transform: translateY(-{scrollPos}px);"
    >
        {#each duplicated as t, i (t.id + '-col' + colIdx + '-dup' + i)}
            <article class="marquee-card">
                <blockquote class="card-message">"{t.message}"</blockquote>
                <div class="card-author">
                    {#if t.image}
                        <img src={t.image} alt={t.name} class="card-avatar" loading="lazy" />
                    {:else}
                        <div class="card-avatar-placeholder">{t.name.charAt(0).toUpperCase()}</div>
                    {/if}
                    <div class="card-meta">
                        <span class="card-name">{t.name}</span>
                        <span class="card-role">{t.role}</span>
                        {#if t.socialLinks && t.socialLinks.length > 0}
                            <div class="card-socials">
                                {#each t.socialLinks as url}
                                    <a href={url} target="_blank" rel="noopener noreferrer" class="card-social" title={url} aria-label={url}>
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
</div>

<style>
    .marquee-col {
        overflow: hidden;
        position: relative;
        mask-image: linear-gradient(to bottom, transparent, black 10%, black 90%, transparent);
        -webkit-mask-image: linear-gradient(to bottom, transparent, black 10%, black 90%, transparent);
    }

    .marquee-track {
        display: flex;
        flex-direction: column;
        gap: 0.875rem;
        will-change: transform;
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    .marquee-track.ready {
        opacity: 1;
    }

    /* Pause on hover */
    .marquee-col:hover .marquee-track {
        animation-play-state: paused;
    }

    .marquee-card {
        border: 1px solid var(--color-border);
        padding: 1.25rem;
        background: var(--color-surface);
        flex-shrink: 0;
        transition: border-color var(--duration-normal) var(--ease-default);
    }

    .marquee-card:hover {
        border-color: var(--color-border-hover);
    }

    .card-message {
        font-size: var(--text-sm);
        line-height: 1.65;
        color: var(--color-text-muted);
        margin-bottom: 1rem;
        quotes: none;
    }

    .card-author {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        border-top: 1px solid var(--color-border);
        padding-top: 0.875rem;
    }

    .card-avatar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        object-fit: cover;
        border: 1px solid var(--color-border);
        flex-shrink: 0;
    }

    .card-avatar-placeholder {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: var(--color-border);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: var(--text-xs);
        font-weight: 600;
        color: var(--color-text-muted);
        border: 1px solid var(--color-border);
        flex-shrink: 0;
    }

    .card-meta {
        display: flex;
        flex-direction: column;
        gap: 0.125rem;
        min-width: 0;
    }

    .card-name {
        font-size: var(--text-xs);
        font-weight: 600;
        color: var(--color-text);
    }

    .card-role {
        font-size: var(--text-xs);
        color: var(--color-text-muted);
    }

    .card-socials {
        display: flex;
        gap: 0.375rem;
        margin-top: 0.25rem;
    }

    .card-social {
        width: 14px;
        height: 14px;
        color: var(--color-text-muted);
        transition: color var(--duration-fast) var(--ease-default);
    }

    .card-social:hover {
        color: var(--color-text);
    }

    .card-social :global(svg) {
        width: 100%;
        height: 100%;
    }
</style>
