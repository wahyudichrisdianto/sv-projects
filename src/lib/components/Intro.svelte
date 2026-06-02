<script lang="ts">
    import type { Snippet } from "svelte";

    interface Props {
        id?: string;
        name?: string;
        greeting?: string;
        avatar?: string;
        links?: { label: string; href: string; external?: boolean }[];
        onResume?: () => void;
        lead?: Snippet;
    }

    let {
        id = "intro",
        name = "Wahyudi Chrisdianto",
        greeting = "Hi there.",
        avatar = "https://avatars.githubusercontent.com/u/52883909?v=4",
        links = [],
        onResume,
        lead,
    }: Props = $props();
</script>

<section {id} class="intro">
    <div class="intro-inner grid-container">
        <div class="avatar">
            <img src={avatar} alt={name} width="168" height="168" />
        </div>

        <h1 class="greeting">{greeting}</h1>

        <div class="lead">
            {#if lead}{@render lead()}{/if}
        </div>

        <nav class="links" aria-label="Profile links">
            {#each links as link (link.label)}
                <a
                    href={link.href}
                    class="ilink"
                    {...link.external
                        ? { target: "_blank", rel: "noopener" }
                        : {}}
                >
                    {link.label}
                </a>
            {/each}
            {#if onResume}
                <button type="button" class="ilink as-button" onclick={onResume}>
                    Resume
                </button>
            {/if}
        </nav>
    </div>
</section>

<style>
    .intro {
        padding: calc(var(--space-section) * 1.15) 0 var(--space-section);
    }

    .intro-inner {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

    .avatar {
        width: clamp(108px, 16vw, 168px);
        aspect-ratio: 1;
        border-radius: 50%;
        overflow: hidden;
        border: 1px solid var(--color-border);
        margin-bottom: clamp(2.25rem, 5vw, 3.75rem);
    }

    .avatar img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        filter: grayscale(100%);
    }

    .greeting {
        font-size: clamp(3rem, 8vw, 5.5rem);
        font-weight: 700;
        line-height: 0.95;
        letter-spacing: -0.04em;
        margin-bottom: clamp(1.5rem, 4vw, 2.5rem);
    }

    .lead {
        /* Matches prod exactly: type props on .lead so `ch` resolves against the
           lead font (54ch ≈ 745px line length), readable + proportional. */
        max-width: 54ch;
        font-size: clamp(1.0625rem, 2.2vw, 1.4rem);
        line-height: 1.6;
        color: var(--color-text-muted);
    }

    .lead :global(p) {
        margin: 0;
    }

    .lead :global(strong) {
        color: var(--color-text);
        font-weight: 600;
    }

    .links {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: clamp(1.25rem, 3vw, 2rem);
        margin-top: clamp(2.5rem, 6vw, 4rem);
    }

    .ilink {
        font-size: var(--text-xs);
        font-weight: 600;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: var(--color-text-muted);
        transition: color var(--duration-fast) var(--ease-default);
    }

    .ilink:hover {
        color: var(--color-text);
    }

    .as-button {
        background: none;
        border: none;
        padding: 0;
        cursor: pointer;
        font-family: inherit;
    }
</style>
