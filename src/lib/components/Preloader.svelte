<script lang="ts">
    import { onMount } from "svelte";

    let pct = $state(0); // 0–100, shown text
    let fill = $state(0); // 0–1, bar scaleX (float, smooth)
    let done = $state(false); // triggers slide-up exit

    const DURATION = 2200; // ms — timed fake progress
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    onMount(() => {
        let raf = 0;
        let hideTimer: ReturnType<typeof setTimeout>;

        // Once per session, and never for reduced-motion users.
        const skip =
            !!sessionStorage.getItem("kaiyu:preloaded") ||
            window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (skip) {
            pct = 100;
            fill = 1;
            done = true;
            document.documentElement.setAttribute("data-preloaded", "");
            return;
        }

        const start = performance.now();
        const tick = (now: number) => {
            const progress = Math.min((now - start) / DURATION, 1);
            const eased = easeOutCubic(progress);
            fill = eased;
            pct = Math.round(eased * 100);
            if (progress < 1) {
                raf = requestAnimationFrame(tick);
            } else {
                sessionStorage.setItem("kaiyu:preloaded", "1");
                done = true;
                // After the slide-up transition, drop it from the layer entirely.
                hideTimer = setTimeout(
                    () =>
                        document.documentElement.setAttribute(
                            "data-preloaded",
                            "",
                        ),
                    650,
                );
            }
        };
        raf = requestAnimationFrame(tick);

        return () => {
            cancelAnimationFrame(raf);
            clearTimeout(hideTimer);
        };
    });
</script>

<div class="preloader" class:done aria-hidden="true">
    <div class="pl-main">
        <span class="pct">{pct}%</span>
        <p class="greet">
            Hey, I'm Kaiyu. Creative developer. Vibing with AI, shipping clean
            code.
        </p>
    </div>
    <div class="pl-bottom">
        <span class="bar-label">Processing request…</span>
        <div class="bar">
            <span class="bar-fill" style="transform: scaleX({fill})"></span>
        </div>
    </div>
</div>

<style>
    .preloader {
        position: fixed;
        inset: 0;
        z-index: 2000;
        background: var(--color-bg);
        min-height: 100dvh;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        transition:
            transform 0.6s var(--ease-default),
            opacity 0.4s var(--ease-default);
    }

    .preloader.done {
        opacity: 0;
        transform: translateY(-100%);
    }

    .pl-main {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-end;
        gap: clamp(1rem, 4vw, 3rem);
        padding: 0 clamp(1.5rem, 5vw, 4rem) clamp(1.75rem, 4vw, 3rem);
    }

    .pct {
        color: var(--color-text);
        font-size: clamp(4rem, 14vw, 9rem);
        font-weight: 700;
        line-height: 0.85;
        letter-spacing: -0.04em;
        font-variant-numeric: tabular-nums;
    }

    .greet {
        max-width: 34ch;
        margin-bottom: 0.65rem;
        font-size: var(--text-sm);
        font-weight: 500;
        line-height: 1.5;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--color-text-muted);
    }

    .pl-bottom {
        display: flex;
        flex-direction: column;
        gap: 0.4rem;
    }

    .bar-label {
        padding: 0 clamp(1.5rem, 5vw, 4rem);
        font-size: var(--text-xs);
        font-weight: 600;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: var(--color-text-muted);
    }

    .bar {
        width: 100%;
        height: 2px;
        background: var(--color-border);
    }

    .bar-fill {
        display: block;
        width: 100%;
        height: 100%;
        background: var(--color-text);
        transform-origin: 0;
    }

    /* Returning-visitor / reduced-motion guard (set pre-paint by app.html). */
    :global(html[data-preloaded]) .preloader {
        display: none !important;
    }

    @media (max-width: 767px) {
        .pl-main {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
        }
        .greet {
            margin-bottom: 0;
        }
    }

    @media (prefers-reduced-motion: reduce) {
        .preloader {
            transition: none;
        }
    }
</style>
