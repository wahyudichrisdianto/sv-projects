<script lang="ts">
    import { getPlatformIcon } from '$lib/utils/social';

    let name = $state('');
    let role = $state('');
    let image = $state('');
    let message = $state('');
    let urls = $state(['', '', '', '']);
    let submitting = $state(false);
    let success = $state(false);
    let error = $state('');

    async function handleSubmit(e: Event) {
        e.preventDefault();
        submitting = true;
        error = '';
        success = false;

        try {
            const res = await fetch('/api/testimonials', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, role, image, message, socialLinks: urls })
            });

            if (!res.ok) {
                const data = await res.json().catch(() => ({})) as { error?: string };
                throw new Error(data.error || 'Something went wrong');
            }

            success = true;
            name = '';
            role = '';
            image = '';
            message = '';
            urls = ['', '', '', ''];
        } catch (err) {
            error = (err instanceof Error ? err.message : 'Failed to submit testimonial');
        } finally {
            submitting = false;
        }
    }
</script>

<svelte:head>
    <title>Leave a Testimonial</title>
</svelte:head>

<section class="testimonial-form" aria-label="Submit testimonial">
    <div class="form-inner grid-container">
        <a href="/" class="back-link">← Back to home</a>

        <h1 class="form-heading">Leave a Testimonial</h1>
        <p class="form-subtext">Share your experience working with me. No account needed.</p>

        {#if success}
            <div class="alert alert-success">
                Thank you! Your testimonial has been submitted.
                <a href="/">Back to home</a>
            </div>
        {:else}
            <form onsubmit={handleSubmit} class="form">
                <div class="field">
                    <label for="name">Name *</label>
                    <input
                        id="name"
                        type="text"
                        bind:value={name}
                        required
                        placeholder="Your name"
                    />
                </div>

                <div class="field">
                    <label for="role">Role / From *</label>
                    <input
                        id="role"
                        type="text"
                        bind:value={role}
                        required
                        placeholder="e.g. Product Manager at Acme"
                    />
                </div>

                <div class="field">
                    <label for="image">Image URL</label>
                    <input
                        id="image"
                        type="url"
                        bind:value={image}
                        placeholder="https://example.com/avatar.jpg"
                    />
                    <span class="hint">Paste a direct link to your avatar image</span>
                </div>

                <div class="field">
                    <label for="message">Message *</label>
                    <textarea
                        id="message"
                        bind:value={message}
                        required
                        rows={5}
                        placeholder="Write your testimonial..."
                    ></textarea>
                </div>

                <div class="field">
                    <span class="field-label">Social Links</span>
                    <div class="social-fields">
                        {#each urls as _, i}
                            <div class="social-input-row">
                                <span class="social-icon" aria-hidden="true">
                                    {@html getPlatformIcon(urls[i])}
                                </span>
                                <input
                                    type="url"
                                    bind:value={urls[i]}
                                    placeholder="https://"
                                    class="social-input"
                                />
                            </div>
                        {/each}
                    </div>
                </div>

                {#if error}
                    <div class="alert alert-error">{error}</div>
                {/if}

                <button type="submit" class="submit-btn" disabled={submitting}>
                    {submitting ? 'Submitting...' : 'Submit Testimonial'}
                </button>
            </form>
        {/if}
    </div>
</section>

<style>
    .testimonial-form {
        padding: var(--space-section) 0;
        min-height: 100vh;
    }

    .form-inner {
        margin: 0 auto;
        padding: 0 1.5rem;
        max-width: 560px;
    }

    .back-link {
        display: inline-block;
        font-size: var(--text-sm);
        color: var(--color-text-muted);
        margin-bottom: 2rem;
        transition: color var(--duration-fast) var(--ease-default);
    }

    .back-link:hover {
        color: var(--color-text);
    }

    .form-heading {
        font-size: var(--text-2xl);
        font-weight: 700;
        letter-spacing: -0.02em;
        margin-bottom: 0.5rem;
    }

    .form-subtext {
        font-size: var(--text-base);
        color: var(--color-text-muted);
        margin-bottom: var(--space-block);
    }

    .form {
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
    }

    .field {
        display: flex;
        flex-direction: column;
        gap: 0.375rem;
    }

    .field label,
    .field-label {
        font-size: var(--text-xs);
        font-weight: 600;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        color: var(--color-text-muted);
    }

    .field input,
    .field textarea {
        padding: 0.75rem 1rem;
        font-size: var(--text-base);
        background: var(--color-surface);
        color: var(--color-text);
        border: 1px solid var(--color-border);
        transition: border-color var(--duration-fast) var(--ease-default);
        font-family: inherit;
    }

    .field input:focus,
    .field textarea:focus {
        border-color: var(--color-text);
        outline: none;
    }

    .field textarea {
        resize: vertical;
        min-height: 120px;
    }

    .hint {
        font-size: var(--text-xs);
        color: var(--color-text-muted);
    }

    .social-fields {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .social-input-row {
        display: flex;
        align-items: center;
        gap: 0.625rem;
        padding: 0 0.875rem;
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        transition: border-color var(--duration-fast) var(--ease-default);
    }

    .social-input-row:focus-within {
        border-color: var(--color-text);
    }

    .social-icon {
        width: 18px;
        height: 18px;
        flex-shrink: 0;
        color: var(--color-text-muted);
        transition: color var(--duration-fast) var(--ease-default);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .social-icon :global(svg) {
        width: 100%;
        height: 100%;
    }

    .social-input {
        flex: 1;
        padding: 0.625rem 0;
        font-size: var(--text-sm);
        background: transparent;
        color: var(--color-text);
        border: none;
        font-family: inherit;
        outline: none;
    }

    .social-input::placeholder {
        color: var(--color-text-muted);
        opacity: 0.5;
    }

    .submit-btn {
        padding: 0.875rem 2rem;
        font-size: var(--text-sm);
        font-weight: 600;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        background: var(--color-text);
        color: var(--color-surface);
        border: 1px solid var(--color-text);
        cursor: pointer;
        transition: all var(--duration-fast) var(--ease-default);
    }

    .submit-btn:hover:not(:disabled) {
        background: transparent;
        color: var(--color-text);
    }

    .submit-btn:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    .alert {
        padding: 1rem;
        font-size: var(--text-sm);
        border: 1px solid;
    }

    .alert-success {
        background: var(--color-surface);
        border-color: var(--color-border-hover);
        color: var(--color-text);
    }

    .alert-success a {
        display: inline-block;
        margin-top: 0.5rem;
        text-decoration: underline;
        color: var(--color-text-muted);
    }

    .alert-error {
        background: var(--color-surface);
        border-color: oklch(60% 0.15 25);
        color: oklch(60% 0.15 25);
    }
</style>
