<script lang="ts">
    import type { Experience } from "$lib/types";

    interface Props {
        experiences: Experience[];
    }
    let { experiences }: Props = $props();
    let visibleCount = $state(3);

    $effect(() => {
        if (visibleCount > experiences.length) {
            visibleCount = experiences.length;
        }
    });

    const visible = $derived(experiences.slice(0, visibleCount));
    const hasMore = $derived(visibleCount < experiences.length);
</script>

<section class="experience" aria-label="Experience">
    <div class="experience-inner grid-container">
        <span class="label">Experience</span>
        <h2 class="section-title">Career Timeline</h2>

        <div class="timeline">
            {#each visible as exp, i (exp.id)}
                <div class="timeline-item">
                    <div class="timeline-marker">
                        <span class="timeline-dot"></span>
                        {#if i < visible.length - 1}
                            <span class="timeline-line"></span>
                        {/if}
                    </div>
                    <div class="timeline-content">
                        <div class="timeline-header">
                            <h3 class="timeline-role">{exp.role}</h3>
                            <span class="timeline-date"
                                >{exp.startDate} — {exp.endDate}</span
                            >
                        </div>
                        <p class="timeline-company">{exp.company}</p>
                        <p class="timeline-desc">{exp.description}</p>
                        <div class="timeline-tags">
                            {#each exp.technologies as tech}
                                <span class="tag">{tech}</span>
                            {/each}
                        </div>
                    </div>
                </div>
            {/each}
        </div>

        {#if hasMore}
            <button
                class="show-more"
                onclick={() => (visibleCount = experiences.length)}
            >
                Show all {experiences.length} experiences
            </button>
        {/if}
    </div>
</section>

<style>
    .experience {
        padding: var(--space-section) 0;
        border-top: 1px solid var(--color-border);
    }

    .experience-inner {
        margin: 0 auto;
        padding: 0 1.5rem;
    }

    .experience .label {
        display: block;
        margin-bottom: 0.5rem;
    }

    .section-title {
        font-size: var(--text-2xl);
        font-weight: 700;
        letter-spacing: -0.02em;
        margin-bottom: var(--space-block);
    }

    .timeline {
        position: relative;
        padding-left: 1.5rem;
    }

    .timeline-item {
        position: relative;
        padding-bottom: var(--space-block);
    }

    .timeline-item:last-child {
        padding-bottom: 0;
    }

    .timeline-marker {
        position: absolute;
        left: -1.5rem;
        top: 0.35rem;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .timeline-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: var(--color-text);
        flex-shrink: 0;
    }

    .timeline-line {
        width: 1px;
        flex: 1;
        background: var(--color-border);
        margin-top: 0.5rem;
    }

    .timeline-header {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        gap: 1rem;
        margin-bottom: 0.25rem;
    }

    .timeline-role {
        font-size: var(--text-lg);
        font-weight: 600;
    }

    .timeline-date {
        font-size: var(--text-xs);
        font-weight: 600;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        color: var(--color-text-muted);
        white-space: nowrap;
    }

    .timeline-company {
        font-size: var(--text-base);
        color: var(--color-text-muted);
        margin-bottom: 0.75rem;
    }

    .timeline-desc {
        font-size: var(--text-sm);
        color: var(--color-text-muted);
        line-height: 1.6;
        margin-bottom: 0.75rem;
    }

    .timeline-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
    }

    .tag {
        font-size: var(--text-xs);
        font-weight: 500;
        letter-spacing: 0.03em;
        padding: 0.25rem 0.625rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-sm);
    }

    .show-more {
        margin-top: var(--space-element);
        padding: 0.75rem 1.5rem;
        font-size: var(--text-sm);
        font-weight: 600;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        background: none;
        border: 1px solid var(--color-border);
        cursor: pointer;
        transition: all var(--duration-fast) var(--ease-default);
    }

    .show-more:hover {
        border-color: var(--color-text);
        background: var(--color-text);
        color: var(--color-surface);
    }
</style>
