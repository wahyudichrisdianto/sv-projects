<script lang="ts">
    import type { SectionItem } from "$lib/types";
    import { onMount } from "svelte";

    interface Props {
        sections: SectionItem[];
    }
    let { sections }: Props = $props();

    let activeId = $state<string>("");
    let pendingId = $state<string>("");
    let dockEl = $state<HTMLDivElement | null>(null);
    let dockWidth = $state(0);
    let useWrap = $state(false);
    let shouldWrap = $state(false);

    // Char width estimate for 0.625rem uppercase font (~6.5px per char)
    const CHAR_WIDTH = 6.5;
    const GAP = 4; // 0.25rem
    const ITEM_PAD_X = 12; // 0.375rem * 2 sides (from .nav-item padding)

    $effect(() => {
        const firstId = sections[0]?.id;
        if (firstId && !activeId) {
            activeId = firstId;
        }
    });

    // Detect overlap: on mobile, check if labels would exceed available width
    $effect(() => {
        if (!dockEl || sections.length === 0) return;

        const isMobile = window.innerWidth < 1024;
        if (!isMobile) {
            useWrap = false;
            shouldWrap = false;
            return;
        }

        const count = sections.length;
        const totalGap = (count - 1) * GAP;
        const totalPadding = count * ITEM_PAD_X;
        const availableTextWidth = dockWidth - totalGap - totalPadding;
        const widthPerItem = availableTextWidth / count;
        const maxChars = Math.floor(widthPerItem / CHAR_WIDTH);

        // If any label exceeds maxChars AND has a wrap fallback → enable wrapping
        const needsWrap = sections.some(
            (s) => s.label.length > maxChars && s.wrap,
        );
        useWrap = needsWrap;

        // If more than 6 items, enable flex-wrap
        shouldWrap = count > 7;
    });

    function scrollTo(id: string) {
        pendingId = id;
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        // Fallback: if IntersectionObserver never fires (e.g. same section), clear after a delay
        setTimeout(() => {
            if (pendingId === id) pendingId = "";
        }, 1200);
    }

    onMount(() => {
        const ro = new ResizeObserver((entries) => {
            for (const entry of entries) {
                dockWidth = entry.contentRect.width;
            }
        });

        if (dockEl) ro.observe(dockEl);

        const onResize = () => {
            // Trigger reactivity on window resize crossing the 1024px breakpoint
            if (dockEl) dockWidth = dockEl.getBoundingClientRect().width;
        };
        window.addEventListener("resize", onResize);

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => {
                        const aRect = a.boundingClientRect;
                        const bRect = b.boundingClientRect;
                        return aRect.top - bRect.top;
                    });

                if (visible.length > 0) {
                    activeId = visible[0].target.id;
                    if (pendingId === activeId) pendingId = "";
                }
            },
            {
                rootMargin: "-10% 0px -55% 0px",
                threshold: [0, 0.25, 0.5, 0.75, 1],
            },
        );

        sections.forEach((section) => {
            const el = document.getElementById(section.id);
            if (el) observer.observe(el);
        });

        return () => {
            ro.disconnect();
            window.removeEventListener("resize", onResize);
            observer.disconnect();
        };
    });
</script>

<nav class="section-nav" aria-label="Section navigation">
    <div class="nav-dock" class:wrap={shouldWrap} bind:this={dockEl}>
        {#each sections as item}
            <button
                class="nav-item"
                class:active={activeId === item.id}
                class:pending={pendingId === item.id}
                onclick={() => scrollTo(item.id)}
            >
                <span class="nav-label">
                    {useWrap && item.wrap ? item.wrap : item.label}
                </span>
                <span class="nav-indicator"></span>
            </button>
        {/each}
    </div>
</nav>

<style>
    .section-nav {
        position: fixed;
        z-index: 100;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 0 1rem 0.75rem;
        pointer-events: none;
    }

    .nav-dock {
        display: flex;
        gap: 0.25rem;
        margin: 0 auto;
        max-width: 480px;
        background: color-mix(in oklch, var(--color-surface) 72%, transparent);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border: 1px solid
            color-mix(in oklch, var(--color-border) 50%, transparent);
        padding: 0.375rem;
        box-shadow:
            0 1px 3px oklch(0% 0 0 / 0.06),
            0 4px 12px oklch(0% 0 0 / 0.04);
        pointer-events: auto;
        transition:
            transform 350ms var(--ease-default),
            box-shadow 350ms var(--ease-default);
    }

    .nav-dock.wrap {
        flex-wrap: wrap;
    }

    .nav-item {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.25rem;
        padding: 0.5rem 0.375rem;
        font-size: 0.625rem;
        font-weight: 600;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        color: var(--color-text-muted);
        background: none;
        border: none;
        cursor: pointer;
        transition: color var(--duration-fast) var(--ease-default);
        position: relative;
        min-width: 0;
    }

    .nav-dock.wrap .nav-item {
        flex: 1 1 calc(33.333% - 0.25rem);
        min-width: 72px;
    }

    .nav-item:hover {
        color: var(--color-text);
    }

    .nav-item.active {
        color: var(--color-text);
        background: var(--color-bg);
    }

    .nav-item.pending {
        color: var(--color-text);
    }

    .nav-item.pending .nav-indicator {
        background: var(--color-text);
    }

    .nav-indicator {
        margin-top: -2px;
        width: 10px;
        height: 1.5px;
        background: transparent;
        transition: background var(--duration-fast) var(--ease-default);
    }

    .nav-item.active .nav-indicator {
        background: var(--color-text);
    }

    .nav-label {
        white-space: nowrap;
        line-height: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 100%;
    }

    /* ── Desktop: vertical right-aligned dock ── */
    @media (min-width: 1024px) {
        .section-nav {
            top: auto;
            right: 0;
            left: auto;
            bottom: 10vh;
            padding: 0;
            display: flex;
            align-items: center;
        }

        .nav-dock {
            max-width: none;
            margin: 0;
            flex-direction: column;
            gap: 0.25rem;
            padding: 0.5rem 0.5rem 0.5rem 0;
            background: color-mix(
                in oklch,
                var(--color-surface) 22%,
                transparent
            );
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid
                color-mix(in oklch, var(--color-border) 20%, transparent);
            box-shadow:
                0 1px 4px oklch(0% 0 0 / 0.01),
                0 8px 24px oklch(0% 0 0 / 0.02);
            transform: scale(0.75) translateX(calc(100% - 3.5rem));
            transition:
                transform 350ms var(--ease-default),
                box-shadow 350ms var(--ease-default);
        }

        .section-nav:hover .nav-dock {
            transform: scale(1.05) translateX(0);
            box-shadow:
                0 2px 8px oklch(0% 0 0 / 0.02),
                0 12px 32px oklch(0% 0 0 / 0.1);
        }

        .nav-item {
            flex: none;
            flex-direction: row-reverse;
            justify-content: flex-end;
            gap: 0.625rem;
            padding: 0.5rem 0.75rem;
            font-size: 0.6875rem;
            letter-spacing: 0.08em;
            min-width: 8rem;
        }

        .nav-dock.wrap .nav-item {
            flex: none;
            min-width: 8rem;
        }

        .nav-item.active {
            color: var(--color-text);
            background: var(--color-bg);
        }

        .nav-item.pending {
            color: var(--color-text);
        }

        .nav-indicator {
            margin-top: 0px;
            width: 2px;
            height: 14px;
        }

        .nav-label {
            white-space: nowrap;
            overflow: visible;
            text-overflow: clip;
            max-width: none;
        }
    }
</style>
