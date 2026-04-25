<script lang="ts">
    import { page } from "$app/state";
    import { slide } from "svelte/transition";
    import { mainNav } from "$lib/configs/navs";

    let mobileOpen = $state(false);

    function isActive(href: string): boolean {
        if (href === "/") return page.url.pathname === "/";
        return page.url.pathname.startsWith(href);
    }

    function toggle() {
        mobileOpen = !mobileOpen;
    }
</script>

<header class="site-header">
    <div class="header-inner grid-container">
        <a href="/" class="logo" aria-label="Home">
            <span class="logo-mark">◆</span>
        </a>

        <nav class="desktop-nav" aria-label="Main navigation">
            {#each mainNav as item}
                <a
                    href={item.href}
                    class="nav-link"
                    class:active={isActive(item.href)}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    {...item.external
                        ? { target: "_blank", rel: "noopener" }
                        : {}}
                >
                    {item.label}
                </a>
            {/each}
        </nav>

        <button
            class="mobile-toggle"
            onclick={toggle}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
        >
            <span class="toggle-line" class:open={mobileOpen}></span>
            <span class="toggle-line" class:open={mobileOpen}></span>
            <span class="toggle-line" class:open={mobileOpen}></span>
        </button>
    </div>

    {#if mobileOpen}
        <nav class="mobile-nav" aria-label="Mobile navigation" transition:slide>
            {#each mainNav as item}
                <a
                    href={item.href}
                    class="mobile-nav-link"
                    class:active={isActive(item.href)}
                    onclick={() => (mobileOpen = false)}
                >
                    {item.label}
                </a>
            {/each}
        </nav>
    {/if}
</header>

<style>
    /* ── Header shell ── */
    .site-header {
        position: sticky;
        top: 0;
        z-index: 100;
        background: var(--color-surface-glass-strong);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border-bottom: 1px solid var(--color-border-glass);
    }

    .header-inner {
        margin: 0 auto;
        padding: 0 1.5rem;
        height: 56px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    /* ── Logo ── */
    .logo {
        font-size: var(--text-lg);
        font-weight: 700;
        letter-spacing: -0.02em;
    }

    .logo-mark {
        display: inline-block;
    }

    /* ── Desktop nav (hidden on mobile) ── */
    .desktop-nav {
        display: none;
        gap: 2rem;
    }

    /* ── Mobile toggle (visible on mobile) ── */
    .mobile-toggle {
        display: flex;
        flex-direction: column;
        gap: 5px;
        background: none;
        border: none;
        cursor: pointer;
        padding: 4px;
    }

    /* ── Nav links ── */
    .nav-link {
        font-size: var(--text-xs);
        font-weight: 500;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        padding: 0.25rem 0;
        border-bottom: 1px solid transparent;
        transition: border-color var(--duration-fast) var(--ease-default);
    }

    .nav-link:hover {
        border-color: var(--color-border-hover);
    }

    .nav-link.active {
        border-color: var(--color-text);
    }

    /* ── Hamburger lines ── */
    .toggle-line {
        display: block;
        width: 22px;
        height: 1.5px;
        background: var(--color-text);
        transition:
            transform var(--duration-fast) var(--ease-default),
            opacity var(--duration-fast) var(--ease-default);
    }

    .toggle-line.open:nth-child(1) {
        transform: translateY(6.5px) rotate(45deg);
    }
    .toggle-line.open:nth-child(2) {
        opacity: 0;
    }
    .toggle-line.open:nth-child(3) {
        transform: translateY(-6.5px) rotate(-45deg);
    }

    /* ── Mobile nav dropdown ── */
    .mobile-nav {
        border-top: 1px solid var(--color-border);
        padding: 1rem 1.5rem;
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }

    .mobile-nav-link {
        display: block;
        padding: 0.75rem 0;
        font-size: var(--text-base);
        font-weight: 500;
        border-bottom: 1px solid var(--color-border);
    }

    .mobile-nav-link:last-child {
        border-bottom: none;
    }

    .mobile-nav-link.active {
        font-weight: 700;
    }

    /* ── Desktop breakpoint — swap visibility ── */
    @media (min-width: 768px) {
        .desktop-nav {
            display: flex;
        }

        .mobile-toggle {
            display: none;
        }
    }
</style>
