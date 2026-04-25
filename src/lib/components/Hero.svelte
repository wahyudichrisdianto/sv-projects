<script lang="ts">
    interface Props {
        label?: string;
        headline?: string;
        subtext?: string;
    }
    let {
        label = "Welcome",
        headline = "Creative Developer & Designer",
        subtext = "Building thoughtful digital experiences with clean code and intentional design.",
    }: Props = $props();
</script>

<section class="hero" aria-label="Hero">
    <div class="hero-inner grid-container">
        <span class="label hero-label">{label}</span>
        <div class=""></div>
        <div class=""></div>
        <h1 class="hero-headline">{headline}</h1>
        <p class="hero-subtext">{subtext}</p>
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
        font-size: var(--text-4xl);
        font-weight: 700;
        line-height: 1.1;
        letter-spacing: -0.03em;
        margin-bottom: var(--space-element);
        max-width: 14ch;
    }

    @media (min-width: 768px) {
        .hero-headline {
            font-size: var(--text-5xl);
            max-width: 16ch;
        }
    }

    .hero-subtext {
        font-size: var(--text-lg);
        color: var(--color-text-muted);
        max-width: 48ch;
        line-height: 1.6;
    }
</style>
