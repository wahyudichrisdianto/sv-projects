<script lang="ts">
    import { onMount } from "svelte";

    interface Props {
        id?: string;
        name?: string;
        title?: string;
        bio?: string;
        avatar?: string;
        startDate?: string;
        projectCount?: number;
        archiveCount?: number;
    }

    let {
        id,
        name = "Wahyudi Chrisdianto",
        title = "Full Stack Developer",
        bio = "Versatile Full-Stack Software Engineer and UI/UX Designer with a product-first approach. 4+ years of experience in software house and startup environments, specializing in building fast, scalable, and maintainable web, mobile, and backend systems.",
        avatar = "https://avatars.githubusercontent.com/u/52883909?v=4&s=4000",
        startDate = "082020",
        projectCount = 0,
        archiveCount = 12,
    }: Props = $props();

    function parseStart(raw: string): Date {
        const digits = raw.replace(/[^0-9]/g, "");
        if (digits.length === 6) {
            const mm = digits.slice(0, 2);
            const yyyy = digits.slice(2);
            return new Date(parseInt(yyyy), parseInt(mm) - 1, 1);
        }
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

    onMount(() => {
        const timer = setInterval(() => {
            exp = calcExp(startDate);
        }, 60_000);
        return () => clearInterval(timer);
    });

    // ── Animated counters ──
    let displayedYears = $state(0);
    let displayedProjects = $state(0);
    let displayedArchive = $state(0);
    let hasAnimated = $state(false);
    let statsEl = $state<HTMLDivElement | null>(null);

    function animateValue(
        from: number,
        to: number,
        setter: (v: number) => void,
        duration = 1400,
    ) {
        const startTime = performance.now();

        function tick(now: number) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            setter(Math.round(from + (to - from) * ease));

            if (progress < 1) {
                requestAnimationFrame(tick);
            } else {
                setter(to);
            }
        }

        requestAnimationFrame(tick);
    }

    function triggerAnimation() {
        if (hasAnimated) return;
        hasAnimated = true;

        animateValue(0, exp.years, (v) => (displayedYears = v), 1400);
        setTimeout(
            () =>
                animateValue(
                    0,
                    projectCount,
                    (v) => (displayedProjects = v),
                    1400,
                ),
            120,
        );
        setTimeout(
            () =>
                animateValue(
                    0,
                    archiveCount,
                    (v) => (displayedArchive = v),
                    1400,
                ),
            240,
        );
    }

    // Intersection Observer — animate when scrolled into view
    onMount(() => {
        if (!statsEl) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        triggerAnimation();
                        observer.disconnect();
                    }
                });
            },
            { threshold: 0.4, rootMargin: "0px 0px -40px 0px" },
        );

        observer.observe(statsEl);
        return () => observer.disconnect();
    });

    // Re-animate when values change after initial animation
    let prevProjectCount = $state(projectCount);
    $effect(() => {
        if (!hasAnimated) return;
        if (projectCount !== prevProjectCount) {
            animateValue(
                prevProjectCount,
                projectCount,
                (v) => (displayedProjects = v),
                800,
            );
            prevProjectCount = projectCount;
        }
    });

    let prevExpYears = $state(exp.years);
    $effect(() => {
        if (!hasAnimated) return;
        if (exp.years !== prevExpYears) {
            animateValue(
                prevExpYears,
                exp.years,
                (v) => (displayedYears = v),
                800,
            );
            prevExpYears = exp.years;
        }
    });

    const stats = $derived([
        { label: "Experience", value: `${displayedYears}+` },
        { label: "Projects", value: `${displayedProjects}+` },
        { label: "Archive", value: `${displayedArchive}` },
    ]);
</script>

<section {id} class="profile" aria-label="Profile">
    <div class="profile-inner grid-container">
        <div>
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
                <div class="profile-header">
                    <h3 class="profile-name">{name}</h3>
                    <p class="profile-title">{title}</p>
                </div>
                <p class="profile-bio">{bio}</p>
            </div>

            <div class="profile-stats" bind:this={statsEl}>
                {#each stats as stat}
                    <div class="stat-item">
                        <span class="stat-value">
                            {#if stat.label === "Experience"}
                                <span class="mobile-only">{displayedYears}+ Yr</span>
                                <span class="desktop-only">{displayedYears}+ Years</span>
                            {:else}
                                {stat.value}
                            {/if}
                        </span>
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

    /* ── Mobile: stack ── */
    .profile-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--space-element);
    }

    .profile-image {
        aspect-ratio: 2/3;
        border: 1px solid var(--color-border);
        overflow: hidden;
    }

    .profile-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        filter: grayscale(70%);
    }

    .profile-content {
        display: flex;
        flex-direction: column;
        gap: var(--space-element);
    }

    .profile-header {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }

    .profile-name {
        font-size: var(--text-2xl);
        font-weight: 700;
        letter-spacing: -0.02em;
    }

    .profile-title {
        font-size: var(--text-base);
        color: var(--color-text-muted);
    }

    .profile-bio {
        font-size: var(--text-base);
        line-height: 1.7;
        max-width: 56ch;
        color: var(--color-text-muted);
    }

    .profile-stats {
        display: flex;
        flex-direction: row;
        gap: 2rem;
        padding-top: 0.5rem;
    }

    .stat-item {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }

    .stat-value {
        font-size: var(--text-2xl);
        font-weight: 700;
        letter-spacing: -0.02em;
        font-variant-numeric: tabular-nums;
    }

    .stat-label {
        font-size: var(--text-xs);
        font-weight: 600;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--color-text-muted);
    }

    .mobile-only { display: inline; }
    .desktop-only { display: none; }

    /* ── Desktop: 3 cols ── */
    @media (min-width: 768px) {
        .profile-grid {
            grid-template-columns: 1fr 2fr 1fr;
            gap: 2rem;
            align-items: start;
        }

        .mobile-only { display: none; }
        .desktop-only { display: inline; }

        .profile-image {
            margin-top: 16px;
            max-width: none;
        }

        .profile-name {
            font-size: var(--text-3xl);
        }

        .profile-bio {
            max-width: none;
        }

        .profile-stats {
            flex-direction: column;
            gap: 1.25rem;
            padding-top: 0;
            border-left: 1px solid var(--color-border);
            padding-left: 1.5rem;
            align-self: stretch;
            justify-content: center;
        }
    }
</style>
