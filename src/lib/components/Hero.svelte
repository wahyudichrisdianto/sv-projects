<script lang="ts">
    import type { Snippet } from "svelte";

    interface Props {
        id?: string;
        label?: string;
        title?: string;
        title2?: string;
        subtext?: string;
        children?: Snippet;
    }

    let {
        id,
        label = "Welcome",
        title = "Creative Developer",
        title2 = "",
        subtext = "Building thoughtful digital experiences with clean code and intentional design.",
        children,
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
</section>

<style>
    .hero {
        padding: calc(var(--space-section) * 1.5) 0 var(--space-section);
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
            oklch(55% 0.18 280),
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
