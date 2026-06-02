<script lang="ts">
    import ResumeSheets from "$lib/components/ResumeSheets.svelte";
    import { page } from "$app/state";
    import { onMount } from "svelte";

    let { data } = $props();

    const embed = $derived(page.url.searchParams.has("embed"));
    const printMode = $derived(page.url.searchParams.has("print"));
    const bare = $derived(embed || printMode);

    onMount(() => {
        if (printMode) {
            // Standalone document: paginate via the browser's print-to-PDF once painted.
            const t = setTimeout(() => window.print(), 500);
            return () => clearTimeout(t);
        }
    });
</script>

<svelte:head>
    <title>Wahyudi Chrisdianto — Résumé</title>
    {#if bare}
        <!-- Strip site chrome so only the résumé sheet shows (iframe / print). -->
        <style>
            :global(.site-header),
            :global(.site-footer),
            :global(.section-nav) {
                display: none !important;
            }
            :global(main) {
                padding: 0 !important;
            }
        </style>
    {/if}
    {#if bare}
        <!-- A4 print rules so both the in-modal iframe print and direct print yield a clean PDF. -->
        <style media="print">
            @page {
                size: A4;
                margin: 12mm;
            }
            :global(html),
            :global(body) {
                background: #fff !important;
            }
        </style>
    {/if}
</svelte:head>

<div class="resume-screen" class:bare>
    <ResumeSheets
        resume={data.resume}
        experiences={data.experiences}
        education={data.education}
        certifications={data.certifications}
    />
</div>

<style>
    .resume-screen {
        display: flex;
        justify-content: center;
        padding: clamp(1.5rem, 5vw, 4rem) 1rem;
        background: var(--color-bg);
        min-height: 100%;
    }

    /* Embedded in the home modal / print: dark surround, centered white sheet. */
    .resume-screen.bare {
        background: oklch(13% 0.01 260);
        min-height: 100vh;
        min-height: 100dvh;
        align-items: flex-start;
    }

    .resume-screen :global(.sheet) {
        box-shadow: 0 12px 48px oklch(0% 0 0 / 0.18);
    }

    @media print {
        .resume-screen {
            padding: 0;
            background: #fff;
            display: block;
        }
        .resume-screen :global(.sheet) {
            box-shadow: none;
        }
    }
</style>
