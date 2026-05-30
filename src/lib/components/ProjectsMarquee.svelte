<script lang="ts">
    import { onMount } from "svelte";

    interface Props {
        items: {
            id: string;
            title: string;
            description: string;
            year: string;
            image: string | null;
            link: string | null;
            tags: string[];
        }[];
        speed?: number;
        flat?: boolean;
        cardWidth?: number;
        cardHeight?: number | null;
    }

    let {
        items,
        speed = 100,
        flat = true,
        cardWidth = 360,
        cardHeight = null,
    }: Props = $props();

    let trackEl = $state<HTMLDivElement | null>(null);
    let rowEl = $state<HTMLDivElement | null>(null);
    let scrollPos = $state(0);
    let setWidth = $state(0);
    let ready = $state(false);
    let paused = $state(false);

    // Drag state
    let isDragging = $state(false);
    let dragStartX = $state(0);
    let dragStartScroll = $state(0);

    const GAP = flat ? 0 : 16;

    onMount(() => {
        if (!trackEl || !rowEl) return;

        function measure() {
            const cards =
                trackEl!.querySelectorAll<HTMLElement>(".project-card");
            const half = Math.floor(cards.length / 2);
            let w = 0;
            for (let i = 0; i < half; i++) {
                w += cards[i].offsetWidth + GAP;
            }
            setWidth = w;
            ready = true;
        }

        requestAnimationFrame(measure);
        const ro = new ResizeObserver(() => measure());
        ro.observe(trackEl);

        // ── Drag / Swipe handlers ──
        function onPointerDown(e: PointerEvent) {
            isDragging = true;
            dragStartX = e.clientX;
            dragStartScroll = scrollPos;
            rowEl!.setPointerCapture(e.pointerId);
            rowEl!.style.cursor = "grabbing";
        }

        function onPointerMove(e: PointerEvent) {
            if (!isDragging) return;
            const delta = dragStartX - e.clientX;
            scrollPos = dragStartScroll + delta;
            // Wrap around while dragging
            if (setWidth > 0) {
                scrollPos = ((scrollPos % setWidth) + setWidth) % setWidth;
            }
        }

        function onPointerUp(e: PointerEvent) {
            isDragging = false;
            rowEl!.releasePointerCapture(e.pointerId);
            rowEl!.style.cursor = "grab";
            // Resume auto-scroll after 1.5s
            setTimeout(() => {
                if (!isDragging) paused = false;
            }, 1500);
        }

        rowEl.addEventListener("pointerdown", onPointerDown);
        rowEl.addEventListener("pointermove", onPointerMove);
        rowEl.addEventListener("pointerup", onPointerUp);
        rowEl.addEventListener("pointercancel", onPointerUp);

        // Hover pause
        const onMouseEnter = () => {
            paused = true;
        };
        const onMouseLeave = () => {
            if (!isDragging) paused = false;
        };
        rowEl.addEventListener("mouseenter", onMouseEnter);
        rowEl.addEventListener("mouseleave", onMouseLeave);

        let rafId: number;
        function tick() {
            if (!paused && !isDragging && setWidth > 0) {
                scrollPos += speed;
                if (scrollPos >= setWidth) {
                    scrollPos = 0;
                }
            }
            if (trackEl) {
                trackEl.style.transform = `translateX(-${scrollPos}px)`;
            }
            rafId = requestAnimationFrame(tick);
        }
        rafId = requestAnimationFrame(tick);

        return () => {
            cancelAnimationFrame(rafId);
            ro.disconnect();
            rowEl.removeEventListener("pointerdown", onPointerDown);
            rowEl.removeEventListener("pointermove", onPointerMove);
            rowEl.removeEventListener("pointerup", onPointerUp);
            rowEl.removeEventListener("pointercancel", onPointerUp);
            rowEl.removeEventListener("mouseenter", onMouseEnter);
            rowEl.removeEventListener("mouseleave", onMouseLeave);
        };
    });

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

    const shuffled = shuffle(items, 123);
    const duplicated = [...shuffled, ...shuffled];
</script>

<div class="marquee-row" class:flat bind:this={rowEl}>
    <div class="marquee-track" class:ready bind:this={trackEl}>
        {#each duplicated as project, i (project.id + "-dup" + i)}
            <article
                class="project-card"
                class:dragging={isDragging}
                style:width="{cardWidth}px"
                style:height={cardHeight ? `${cardHeight}px` : null}
                style:aspect-ratio={cardHeight ? "auto" : null}
            >
                {#if project.image}
                    <div class="project-image">
                        <img
                            src={project.image}
                            alt={project.title}
                            loading="lazy"
                            draggable="false"
                        />
                    </div>
                {:else}
                    <div class="project-image project-placeholder">
                        <span class="placeholder-text"
                            >{project.title
                                .split(" ")
                                .map((w) => w[0])
                                .join("")
                                .slice(0, 2)
                                .toUpperCase()}</span
                        >
                    </div>
                {/if}

                <!-- Hover overlay -->
                <div class="project-overlay">
                    <div class="project-content">
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
                        {#if project.link}
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                class="project-link"
                            >
                                View Project →
                            </a>
                        {/if}
                    </div>
                </div>
            </article>
        {/each}
    </div>
</div>

<style>
    .marquee-row {
        overflow: hidden;
        position: relative;
        cursor: grab;
        touch-action: pan-y; /* Allow vertical scroll, we handle horizontal */
        user-select: none;
        rotate: -1.5deg;
    }

    .marquee-row.flat {
        rotate: 0deg;
    }

    .marquee-row:active {
        cursor: grabbing;
    }

    .marquee-track {
        display: flex;
        gap: 1rem;
        will-change: transform;
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    .marquee-track.ready {
        opacity: 1;
    }

    .project-card {
        flex-shrink: 0;
        width: 360px;
        aspect-ratio: var(--aspect-video);
        border: 1px solid var(--color-border);
        background: var(--color-surface);
        overflow: hidden;
        position: relative;
    }

    .project-card.dragging {
        pointer-events: none; /* Prevent hover flicker while dragging */
    }

    .project-image {
        position: absolute;
        inset: 0;
        z-index: 1;
    }

    .project-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        transition: transform var(--duration-normal) var(--ease-default);
        pointer-events: none;
        -webkit-user-drag: none;
    }

    .project-card:hover .project-image img {
        transform: scale(1.08);
    }

    .project-placeholder {
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(
            135deg,
            oklch(30% 0.03 260),
            oklch(20% 0.02 280)
        );
    }

    .placeholder-text {
        font-size: 3rem;
        font-weight: 700;
        letter-spacing: -0.02em;
        color: oklch(60% 0.02 260);
        user-select: none;
    }

    /* Overlay — hidden by default, shown on hover */
    .project-overlay {
        position: absolute;
        inset: 0;
        z-index: 2;
        background: linear-gradient(
            to top,
            oklch(10% 0.02 260 / 0.92) 0%,
            oklch(10% 0.02 260 / 0.6) 50%,
            oklch(10% 0.02 260 / 0.2) 100%
        );
        opacity: 0;
        transition: opacity var(--duration-normal) var(--ease-default);
        pointer-events: none;
    }

    .project-card:hover .project-overlay {
        opacity: 1;
        pointer-events: auto;
    }

    .project-content {
        position: absolute;
        inset: 0;
        padding: 1.25rem;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        transform: translateY(8px);
        transition: transform var(--duration-normal) var(--ease-default);
    }

    .project-card:hover .project-content {
        transform: translateY(0);
    }

    .project-header {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        gap: 1rem;
        margin-bottom: 0.5rem;
    }

    .project-title {
        font-size: var(--text-base);
        font-weight: 600;
        line-height: 1.3;
        color: oklch(95% 0.01 260);
    }

    .project-year {
        font-size: var(--text-xs);
        font-weight: 600;
        letter-spacing: 0.05em;
        color: oklch(75% 0.01 260);
        white-space: nowrap;
        flex-shrink: 0;
    }

    .project-desc {
        font-size: var(--text-sm);
        color: oklch(80% 0.01 260);
        line-height: 1.5;
        margin-bottom: 0.625rem;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .project-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.375rem;
        margin-bottom: 0.625rem;
    }

    .tag {
        font-size: 0.625rem;
        font-weight: 500;
        letter-spacing: 0.03em;
        padding: 0.2rem 0.5rem;
        border: 1px solid oklch(60% 0.01 260 / 0.4);
        border-radius: var(--radius-sm);
        color: oklch(80% 0.01 260);
        background: oklch(20% 0.01 260 / 0.4);
    }

    .project-link {
        display: inline-block;
        font-size: var(--text-xs);
        font-weight: 600;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        color: oklch(90% 0.01 260);
        text-decoration: none;
        transition: color var(--duration-fast) var(--ease-default);
        pointer-events: auto;
    }

    .project-link:hover {
        color: oklch(99% 0.02 260);
    }

    /* ── Mobile ── */
    @media (max-width: 767px) {
        .marquee-row:not(.flat) {
            rotate: -2.5deg;
        }
    }

    @media (prefers-reduced-motion: reduce) {
        .marquee-track {
            animation: none !important;
        }
    }

    /* ── Flat mode — hero strip (Laravel-style cells) ── */
    .marquee-row.flat .marquee-track {
        gap: 0;
    }

    .marquee-row.flat .project-card {
        border: none;
        border-right: 1px solid var(--color-border);
        background: transparent;
        transition: border-color var(--duration-normal) var(--ease-default);
    }

    .marquee-row.flat .project-card:hover {
        border-color: var(--color-border-hover);
    }

    .marquee-row.flat .project-placeholder {
        background: transparent;
    }

    .marquee-row.flat .placeholder-text {
        font-size: 1.5rem;
        font-weight: 700;
        letter-spacing: 0.06em;
        color: var(--color-text-muted);
        opacity: 0.5;
        transition:
            color var(--duration-normal) var(--ease-default),
            opacity var(--duration-normal) var(--ease-default);
    }

    .marquee-row.flat .project-card:hover .placeholder-text {
        color: var(--color-accent);
        opacity: 1;
    }

    .marquee-row.flat .project-overlay {
        background: var(--color-accent-muted);
        border-top: 2px solid var(--color-accent-border);
    }

    .marquee-row.flat .project-content {
        justify-content: center;
        align-items: center;
        text-align: center;
        transform: none;
        padding: 0.75rem 1rem;
    }

    .marquee-row.flat .project-card:hover .project-content {
        transform: none;
    }

    .marquee-row.flat .project-desc,
    .marquee-row.flat .project-tags,
    .marquee-row.flat .project-link {
        display: none;
    }

    .marquee-row.flat .project-header {
        flex-direction: column;
        align-items: center;
        gap: 0.2rem;
        margin-bottom: 0;
    }

    .marquee-row.flat .project-title {
        font-size: var(--text-xs);
        font-weight: 600;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        color: var(--color-accent);
    }

    .marquee-row.flat .project-year {
        font-size: 0.625rem;
        color: var(--color-text-muted);
        letter-spacing: 0.04em;
    }
</style>
