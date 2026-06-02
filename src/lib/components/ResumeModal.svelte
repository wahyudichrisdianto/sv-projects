<script lang="ts">
    import { beforeNavigate } from "$app/navigation";
    import ResumeSheets from "$lib/components/ResumeSheets.svelte";

    let {
        open = $bindable(false),
        resume = null,
        experiences = [],
        education = [],
        certifications = [],
        printSrc = "/resume?print=1",
        title = "Résumé",
    }: {
        open?: boolean;
        resume?: any;
        experiences?: any[];
        education?: any[];
        certifications?: any[];
        printSrc?: string;
        title?: string;
    } = $props();

    let dialogEl = $state<HTMLDialogElement | null>(null);

    // The native <dialog> in the top layer is the single source of truth.
    // showModal() makes the page behind inert — navbar/footer cannot be reached.
    $effect(() => {
        const d = dialogEl;
        if (!d) return;
        if (open && !d.open) d.showModal();
        else if (!open && d.open) d.close();
    });

    function close() {
        open = false;
    }

    // Print ONLY the résumé via a transient hidden iframe pointing at the
    // dedicated print route (which paginates A4 + self-prints). No visible
    // new page/tab; nothing lingers in the DOM.
    function downloadPdf() {
        const frame = document.createElement("iframe");
        frame.setAttribute("aria-hidden", "true");
        frame.style.cssText =
            "position:fixed;right:0;bottom:0;width:0;height:0;border:0;opacity:0;pointer-events:none;";
        frame.src = printSrc;
        frame.onload = () => {
            // The print route paginates + calls print() itself on mount; once the
            // user dismisses the print dialog, drop the iframe so nothing lingers.
            const win = frame.contentWindow;
            if (win) win.onafterprint = () => frame.remove();
            // Hard fallback if afterprint never fires (some browsers).
            setTimeout(() => frame.remove(), 120000);
        };
        document.body.appendChild(frame);
    }

    // Never let the modal survive a client-side navigation.
    beforeNavigate(close);
</script>

<dialog
    bind:this={dialogEl}
    class="resume-modal"
    onclose={close}
    onclick={(e) => {
        if (e.target === dialogEl) close();
    }}
>
    {#if open}
        <!-- Children live inside the modal: closing the modal unmounts them. -->
        <div class="surface">
            <div class="scroll">
                <div class="sheet-wrap">
                    <ResumeSheets
                        {resume}
                        {experiences}
                        {education}
                        {certifications}
                    />
                </div>
            </div>

            <div class="menubar">
                <span class="mb-title">{title}</span>
                <div class="mb-actions">
                    <button class="dl" type="button" onclick={downloadPdf}>
                        Download PDF
                    </button>
                    <button
                        class="mb-close"
                        type="button"
                        aria-label="Close résumé"
                        onclick={close}>✕</button
                    >
                </div>
            </div>
        </div>
    {/if}
</dialog>

<style>
    /* Full-viewport top-layer modal. Light surround mirrors production. */
    .resume-modal {
        width: 100vw;
        max-width: 100vw;
        height: 100vh;
        height: 100dvh;
        max-height: 100dvh;
        margin: 0;
        padding: 0;
        border: none;
        background: oklch(95% 0.002 260);
        color: #111;
        overflow: hidden;
    }
    .resume-modal::backdrop {
        background: oklch(20% 0.01 260 / 0.55);
    }

    .surface {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
    }

    /* Scrollable surround that centres the white A4 sheet. */
    .scroll {
        flex: 1;
        min-height: 0;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        display: flex;
        justify-content: center;
        padding: clamp(1.5rem, 4vw, 3.5rem) 1rem
            calc(64px + clamp(1.5rem, 4vw, 3.5rem));
    }

    .sheet-wrap {
        width: 100%;
        max-width: 210mm;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        height: max-content;
    }

    .sheet-wrap :global(.sheet) {
        box-shadow: 0 12px 48px oklch(0% 0 0 / 0.18);
    }

    /* Bottom menubar pinned over the surround. */
    .menubar {
        flex-shrink: 0;
        height: 64px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 clamp(1rem, 4vw, 2.5rem);
        background: oklch(98% 0.002 260 / 0.92);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border-top: 1px solid oklch(0% 0 0 / 0.1);
    }

    .mb-title {
        font-size: 0.6875rem;
        font-weight: 600;
        letter-spacing: 0.16em;
        text-transform: uppercase;
        color: oklch(45% 0.01 260);
    }

    .mb-actions {
        display: flex;
        align-items: center;
        gap: 0.6rem;
    }

    .dl {
        padding: 0.6rem 1.4rem;
        font-size: 0.6875rem;
        font-weight: 600;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        background: #111;
        color: #fff;
        border: 1px solid #111;
        border-radius: 2px;
        cursor: pointer;
        transition: opacity 150ms ease;
    }
    .dl:hover {
        opacity: 0.85;
    }

    .mb-close {
        width: 2.25rem;
        height: 2.25rem;
        display: grid;
        place-items: center;
        background: transparent;
        color: #333;
        border: 1px solid oklch(0% 0 0 / 0.2);
        border-radius: 2px;
        cursor: pointer;
        font-size: 0.9rem;
        line-height: 1;
        transition:
            border-color 150ms ease,
            color 150ms ease;
    }
    .mb-close:hover {
        color: #000;
        border-color: oklch(0% 0 0 / 0.45);
    }
</style>
