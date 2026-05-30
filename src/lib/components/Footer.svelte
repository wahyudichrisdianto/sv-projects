<script lang="ts">
    import ThemeSwitcher from "$lib/components/ThemeSwitcher.svelte";
    import { mainNav, socialMedia, WHATSAPP_NUMBER } from "$lib/configs/navs";

    const currentYear = new Date().getFullYear();

    const waHref = `https://wa.me/${WHATSAPP_NUMBER}`;
    const waMessage = encodeURIComponent("Hei! Saya tertarik untuk ngobrol bareng kamu 👋");
    const waLink = `${waHref}?text=${waMessage}`;
</script>

<footer class="site-footer">
    <span class="footer-watermark" aria-hidden="true">Wahyudi Chrisdianto</span>

    <div class="footer-inner grid-container">
        <div class="footer-grid">
            <!-- Navigation -->
            <div class="footer-col">
                <span class="label">Navigation</span>
                <nav class="footer-nav" aria-label="Footer navigation">
                    {#each mainNav as item (item.href)}
                        <a
                            href={item.href}
                            {...item.external
                                ? { target: "_blank", rel: "noopener" }
                                : {}}
                        >{item.label}</a>
                    {/each}
                </nav>
            </div>

            <!-- Connect -->
            <div class="footer-col">
                <span class="label">Connect</span>
                <div class="footer-links">
                    {#each socialMedia as item (item.href)}
                        <a
                            href={item.href}
                            {...item.external
                                ? { target: "_blank", rel: "noopener" }
                                : {}}
                        >{item.label}</a>
                    {/each}
                </div>
            </div>

            <!-- Contact CTA -->
            <div class="footer-col footer-col-cta">
                <span class="label">Theme</span>
                <div class="footer-cta-group">
                    <a
                        href={waLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="wa-btn"
                        aria-label="Chat on WhatsApp"
                    >
                        <svg class="wa-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                        </svg>
                        <span>Chat with me</span>
                    </a>
                    <p class="wa-hint">Drop a message, I don't bite 🙂</p>
                </div>
            </div>
        </div>

        <div class="footer-bottom">
            <div class="footer-bottom-inner">
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

    .footer-col .label {
        display: block;
        margin-bottom: 1rem;
    }

    .footer-col-cta {
        display: flex;
        flex-direction: column;
    }

    .footer-cta-group {
        display: flex;
        flex-direction: column;
        gap: 0.625rem;
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

    /* ── WhatsApp CTA ── */
    .wa-btn {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 1rem;
        border-radius: var(--radius-md);
        background: transparent;
        border: 1px solid var(--color-border);
        color: var(--color-text);
        font-size: var(--text-sm);
        font-weight: 500;
        letter-spacing: 0.01em;
        text-decoration: none;
        width: fit-content;
        transition:
            background var(--duration-fast) var(--ease-default),
            border-color var(--duration-fast) var(--ease-default),
            transform var(--duration-fast) var(--ease-default);
    }

    .wa-btn:hover {
        background: var(--color-surface);
        border-color: var(--color-border-hover);
        transform: translateY(-1px);
    }

    .wa-btn:active {
        transform: translateY(0);
    }

    .wa-icon {
        width: 1rem;
        height: 1rem;
        flex-shrink: 0;
        color: oklch(65% 0.2 145);
    }

    .wa-hint {
        font-size: var(--text-xs);
        color: var(--color-text-muted);
        line-height: 1.4;
    }

    /* ── Footer bottom ── */
    .footer-bottom {
        margin-top: var(--space-block);
        padding-top: 0.5rem;
        border-top: 1px solid var(--color-border);
        margin-bottom: calc(var(--space-block) + 1rem);
    }

    .footer-bottom-inner {
        display: flex;
        justify-content: space-between;
        align-items: center;
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
