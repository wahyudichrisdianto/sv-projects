<script lang="ts">
    import ThemeSwitcher from "$lib/components/ThemeSwitcher.svelte";
    import { mainNav, socialMedia } from "$lib/configs/navs";

    const currentYear = new Date().getFullYear();
</script>

<footer class="site-footer">
    <!-- Watermark background text -->
    <span class="footer-watermark" aria-hidden="true">Wahyudi Chrisdianto</span>

    <div class="footer-inner grid-container">
        <div class="footer-grid">
            <div class="footer-col">
                <span class="label">Navigation</span>
                <nav class="footer-nav" aria-label="Footer navigation">
                    {#each mainNav as item}
                        <a
                            href={item.href}
                            {...item.external
                                ? { target: "_blank", rel: "noopener" }
                                : {}}
                        >
                            {item.label}
                        </a>
                    {/each}
                </nav>
            </div>
            <div class="footer-col">
                <span class="label">Connect</span>
                <div class="footer-links">
                    {#each socialMedia as item}
                        <a
                            href={item.href}
                            {...item.external
                                ? { target: "_blank", rel: "noopener" }
                                : {}}
                        >
                            {item.label}
                        </a>
                    {/each}
                </div>
            </div>
            <div class="footer-col footer-col-theme">
                <span class="label">Theme</span>
            </div>
        </div>
        <div class="footer-bottom">
            <div class="flex justify-between items-center">
                <span class="label">© {currentYear} — WAHYUDI CHRISDIANTO</span>
                <ThemeSwitcher />
            </div>
        </div>
    </div>
</footer>

<style>
    .site-footer {
        position: relative;
        overflow: hidden;
        border-top: 1px solid var(--color-border);
        padding: var(--space-block) 0 5rem;
    }

    @media (min-width: 768px) {
        .site-footer {
            padding-bottom: 6rem;
        }
    }

    .footer-inner {
        margin: 0 auto;
        padding: 0 1.5rem;
    }

    .footer-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--space-block);
    }

    @media (min-width: 768px) {
        .footer-grid {
            grid-template-columns: repeat(3, 1fr);
        }
    }

    .footer-col-theme {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

    .footer-col .label {
        display: block;
        margin-bottom: 1rem;
    }

    .footer-nav,
    .footer-links {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .footer-nav a,
    .footer-links a {
        font-size: var(--text-sm);
        color: var(--color-text-muted);
        transition: color var(--duration-fast) var(--ease-default);
    }

    .footer-nav a:hover,
    .footer-links a:hover {
        color: var(--color-text);
    }

    .footer-bottom {
        margin-top: var(--space-block);
        padding-top: 0.5rem;
        border-top: 1px solid var(--color-border);
        margin-bottom: calc(var(--space-block) + 1rem);
    }

    /* ── Large watermark text ── */
    .footer-watermark {
        position: absolute;
        bottom: 0.2em;
        left: 50%;
        transition:
            transform 400ms cubic-bezier(0.4, 0, 0.2, 1),
            font-size 400ms cubic-bezier(0.4, 0, 0.2, 1);
        transform: translateX(-30%);
        font-size: clamp(8rem, 16vw, 18rem);
        opacity: 0.4;
        font-weight: 900;
        letter-spacing: -0.04em;
        line-height: 1;
        color: var(--color-text);
        white-space: nowrap;
        pointer-events: none;
        user-select: none;
        -webkit-mask-image: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.5) 0%,
            rgba(0, 0, 0, 0.1) 50%,
            rgba(0, 0, 0, 0) 100%
        );
        mask-image: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.5) 0%,
            rgba(0, 0, 0, 0.1) 50%,
            rgba(0, 0, 0, 0) 100%
        );
    }

    /* Dark mode — lighter mask + lower opacity */
    @media (prefers-color-scheme: dark) {
        .footer-watermark {
            opacity: 0.72;
            -webkit-mask-image: linear-gradient(
                to bottom,
                rgba(255, 255, 255, 0.3) 0%,
                rgba(255, 255, 255, 0.06) 50%,
                rgba(255, 255, 255, 0) 100%
            );
            mask-image: linear-gradient(
                to bottom,
                rgba(255, 255, 255, 0.3) 0%,
                rgba(255, 255, 255, 0.06) 50%,
                rgba(255, 255, 255, 0) 100%
            );
        }
    }

    @media (min-width: 768px) {
        .footer-watermark {
            transform: translateX(-50%);
            font-size: clamp(5rem, 16vw, 18rem);
        }
    }
</style>
