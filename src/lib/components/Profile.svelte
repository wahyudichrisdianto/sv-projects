<script lang="ts">
    import { onMount, tick } from "svelte";

    interface Props {
        name?: string;
        title?: string;
        bio?: string;
        avatar?: string;
        startDate?: string; // "MMYYYY" or "YYYY-MM"
        projectCount?: string;
        archiveCount?: string;
    }

    let {
        name = "Wahyudi Chrisdianto",
        title = "Full Stack Developer",
        bio = "Versatile Full-Stack Software Engineer and UI/UX Designer with a product-first approach. 4+ years of experience in software house and startup environments, specializing in building fast, scalable, and maintainable web, mobile, and backend systems. Proven ability to translate complex business needs into high-performance applications, optimize development workflows, and mentor teams for effective product delivery.",
        avatar = "https://avatars.githubusercontent.com/u/52883909?v=4",
        startDate = "082020",
        projectCount = "30+",
        archiveCount = "12",
    }: Props = $props();

    // ── Dynamic experience calculator ──
    function parseStart(raw: string): Date {
        const digits = raw.replace(/[^0-9]/g, "");
        if (digits.length === 6) {
            // "MMYYYY" format
            const mm = digits.slice(0, 2);
            const yyyy = digits.slice(2);
            return new Date(parseInt(yyyy), parseInt(mm) - 1, 1);
        }
        // fallback: treat as ISO
        return new Date(raw);
    }

    function calcExp(start: string): { years: number; months: number } {
        const s = parseStart(start);
        const now = new Date();
        let years = now.getFullYear() - s.getFullYear();
        let months = now.getMonth() - s.getMonth();
        if (months < 0) {
            years--;
            months += 12;
        }
        if (years < 0) return { years: 0, months: 0 };
        return { years, months };
    }

    let exp = $state({ years: 0, months: 0 });

    $effect(() => {
        exp = calcExp(startDate);
    });

    // Recalculate every minute so it stays fresh
    onMount(() => {
        const id = setInterval(() => {
            exp = calcExp(startDate);
        }, 60_000);
        return () => clearInterval(id);
    });

    const experienceText = $derived(`${exp.years}+ Years`);

    const stats = $derived([
        { label: "Experience", value: experienceText },
        { label: "Projects", value: projectCount },
        { label: "Rchive", value: archiveCount },
    ]);
</script>

<section class="profile" aria-label="Profile">
    <div class="profile-inner grid-container">
        <div class="">
            <span class="label">Profile</span>
            <h2 class="profile-heading">About & Backgrounds</h2>
        </div>
        <div class="profile-grid">
            {#if avatar}
                <div class="profile-image">
                    <img src={avatar} alt={name} />
                </div>
            {/if}
            <div class="profile-content">
                <h3 class="profile-name">{name}</h3>
                <p class="profile-title">{title}</p>
                <p class="profile-bio">{bio}</p>
            </div>
            <div class="profile-stats">
                {#each stats as stat}
                    <div class="stat-item">
                        <span class="stat-value">{stat.value}</span>
                        <span class="stat-label">{stat.label}</span>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</section>

<style>
    .profile {
        padding: var(--space-section) 0;
        border-top: 1px solid var(--color-border);
    }

    .profile-inner {
        margin: 0 auto;
        padding: 0 1.5rem;
    }

    .profile-heading {
        font-size: var(--text-2xl);
        font-weight: 700;
        letter-spacing: -0.02em;
        margin-bottom: calc(var(--space-block) + 2rem);
    }

    .profile-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--space-block);
    }

    @media (min-width: 768px) {
        .profile-grid {
            grid-template-columns: 200px 1fr 200px;
            gap: 3rem;
            align-items: start;
        }
    }

    .profile-image {
        aspect-ratio: 1;
        border: 1px solid var(--color-border);
        overflow: hidden;
    }

    .profile-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        scale: 1.15;
        filter: grayscale(70%);
    }

    .profile-name {
        font-size: var(--text-2xl);
        font-weight: 700;
        letter-spacing: -0.02em;
        margin-bottom: 0.25rem;
    }

    .profile-title {
        font-size: var(--text-base);
        color: var(--color-text-muted);
        margin-bottom: var(--space-element);
    }

    .profile-bio {
        font-size: var(--text-base);
        line-height: 1.7;
        max-width: 56ch;
        color: var(--color-text-muted);
    }

    .profile-stats {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding-top: 0.5rem;
    }

    .stat-item {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid var(--color-border);
    }

    .stat-item:last-child {
        border-bottom: none;
    }

    .stat-value {
        font-size: var(--text-2xl);
        font-weight: 700;
        letter-spacing: -0.02em;
    }

    .stat-label {
        font-size: var(--text-xs);
        font-weight: 600;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--color-text-muted);
    }
</style>
