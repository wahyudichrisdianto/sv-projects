<script lang="ts">
    interface Props {
        id?: string;
        label?: string;
        headline?: string;
        description?: string;
        buttons?: { label: string; href: string; external?: boolean }[];
    }

    let {
        id,
        label = "Get in Touch",
        headline = "Let's work together",
        description = "Have a project in mind or want to collaborate? I'd love to hear from you.",
        buttons = [
            {
                label: "Email",
                href: "mailto:wahyudi.chrisdianto@gmail.com",
                external: true,
            },
            {
                label: "WhatsApp",
                href: "https://wa.me/6289687407837",
                external: true,
            },
        ],
    }: Props = $props();
</script>

<section {id} class="cta" aria-label="Call to action">
    <div class="cta-inner grid-container">
        <span class="label">{label}</span>
        <h2 class="cta-headline">{headline}</h2>
        <p class="cta-description">{description}</p>

        <div class="cta-buttons">
            {#each buttons as item}
                <a
                    class="cta-button"
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
</section>

<style>
    .cta {
        padding: var(--space-section) 0;
        border-top: 1px solid var(--color-border);
    }

    .cta-inner {
        margin: 0 auto;
        padding: 0 1.5rem;
        text-align: center;
    }

    .cta .label {
        display: block;
        margin-bottom: 1rem;
    }

    .cta-headline {
        font-size: var(--text-3xl);
        font-weight: 700;
        letter-spacing: -0.02em;
        margin-bottom: 1rem;
    }

    @media (min-width: 768px) {
        .cta-headline {
            font-size: var(--text-4xl);
        }
    }

    .cta-description {
        font-size: var(--text-base);
        color: var(--color-text-muted);
        max-width: 48ch;
        margin: 0 auto var(--space-element);
        line-height: 1.6;
    }

    .cta-buttons {
        display: flex;
        justify-content: center;
        gap: 0.75rem;
        flex-wrap: wrap;
    }

    .cta-button {
        display: inline-block;
        padding: 0.875rem 2.5rem;
        font-size: var(--text-sm);
        font-weight: 600;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        background: var(--color-text);
        color: var(--color-surface);
        border: 1px solid var(--color-text);
        transition: all var(--duration-fast) var(--ease-default);
    }

    .cta-button:hover {
        background: transparent;
        color: var(--color-text);
    }
</style>
