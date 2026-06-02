<script lang="ts">
    interface Skill {
        category: string;
        items: string[];
    }
    interface Exp {
        title: string;
        company: string;
        location?: string | null;
        startDate: string;
        endDate: string;
        bullets: string[];
        techStack?: string | null;
    }
    interface Edu {
        degree: string;
        institution: string;
        location?: string | null;
        period?: string | null;
        detail?: string | null;
    }
    interface Cert {
        title: string;
        issuer?: string | null;
        date?: string | null;
    }
    interface ResumeData {
        fullName: string;
        headline: string;
        location?: string | null;
        email?: string | null;
        phone?: string | null;
        website?: string | null;
        linkedin?: string | null;
        summary?: string | null;
        skills: Skill[];
    }

    let {
        resume,
        experiences = [],
        education = [],
        certifications = [],
    }: {
        resume: ResumeData | null;
        experiences?: Exp[];
        education?: Edu[];
        certifications?: Cert[];
    } = $props();

    const strip = (u?: string | null) =>
        (u ?? "").replace(/^https?:\/\//, "").replace(/\/$/, "");

    const contacts = $derived(
        resume
            ? [
                  resume.location,
                  strip(resume.website),
                  resume.email,
                  resume.phone,
                  strip(resume.linkedin),
              ].filter(Boolean)
            : [],
    );
</script>

{#if resume}
    <article class="sheet">
        <header class="head">
            <h1>{resume.fullName}</h1>
            <p class="role">{resume.headline}</p>
        </header>

        {#if contacts.length}
            <p class="contact">{contacts.join("  ·  ")}</p>
        {/if}

        {#if resume.summary}
            <p class="summary">{resume.summary}</p>
        {/if}

        {#if resume.skills.length}
            <section class="block">
                <h2 class="block-label">Skills</h2>
                {#each resume.skills as s (s.category)}
                    <p class="skill">
                        <strong>{s.category}</strong> — {s.items.join(" · ")}
                    </p>
                {/each}
            </section>
        {/if}

        {#if experiences.length}
            <section class="block">
                <h2 class="block-label">Work Experience</h2>
                {#each experiences as e (e.company + e.title + e.startDate)}
                    <div class="entry">
                        <p class="entry-title">
                            <strong>{e.company}</strong>
                            <span class="sep">/</span>
                            {e.title}
                        </p>
                        <p class="entry-meta">
                            {e.startDate} — {e.endDate}{#if e.location} ·
                                {e.location}{/if}
                        </p>
                        {#each e.bullets as b, i (i)}
                            <p class="bullet">{b}</p>
                        {/each}
                    </div>
                {/each}
            </section>
        {/if}

        {#if education.length}
            <section class="block">
                <h2 class="block-label">Education</h2>
                {#each education as ed (ed.degree + ed.institution)}
                    <div class="entry">
                        <p class="entry-title">
                            <strong>{ed.degree}</strong>
                            <span class="sep">/</span>
                            {ed.institution}
                        </p>
                        {#if ed.period || ed.location}
                            <p class="entry-meta">
                                {ed.period ?? ""}{#if ed.location} ·
                                    {ed.location}{/if}
                            </p>
                        {/if}
                        {#if ed.detail}<p class="bullet">{ed.detail}</p>{/if}
                    </div>
                {/each}
            </section>
        {/if}

        {#if certifications.length}
            <section class="block">
                <h2 class="block-label">Certifications</h2>
                {#each certifications as c (c.title)}
                    <p class="cert">
                        <strong>{c.title}</strong>{#if c.issuer} —
                            {c.issuer}{/if}{#if c.date} · {c.date}{/if}
                    </p>
                {/each}
            </section>
        {/if}
    </article>
{:else}
    <article class="sheet">
        <p class="summary">Résumé not available.</p>
    </article>
{/if}

<style>
    .sheet {
        width: 210mm;
        max-width: 100%;
        background: #fff;
        color: #111;
        padding: 16mm 16mm 18mm;
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        font-size: 10pt;
        line-height: 1.5;
        box-sizing: border-box;
    }

    .head {
        border-bottom: 2px solid #111;
        padding-bottom: 0.5rem;
    }

    .head h1 {
        margin: 0;
        font-size: 21pt;
        font-weight: 800;
        letter-spacing: 0.02em;
        text-transform: uppercase;
        color: #111;
    }

    .role {
        margin: 0.4rem 0 0.5rem;
        font-size: 10pt;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: #6a6a6a;
    }

    .contact {
        margin: 0.7rem 0 0;
        font-family: ui-monospace, "SF Mono", Menlo, Consolas, monospace;
        font-size: 8pt;
        letter-spacing: 0.02em;
        color: #6a6a6a;
    }

    .summary {
        margin: 0.9rem 0 0;
        font-size: 10pt;
        color: #333;
    }

    .block {
        margin-top: 1.4rem;
    }

    .block-label {
        margin: 0 0 0.7rem;
        font-size: 9pt;
        font-weight: 700;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        color: #6a6a6a;
        border-bottom: 1px solid #c4c4c4;
        padding-bottom: 0.35rem;
    }

    .skill {
        margin: 0 0 0.35rem;
        color: #444;
    }
    .skill strong {
        color: #111;
        font-weight: 700;
    }

    .entry {
        margin-bottom: 0.95rem;
        break-inside: avoid;
    }
    .entry-title {
        margin: 0;
        font-size: 10.5pt;
        color: #6a6a6a;
    }
    .entry-title strong {
        color: #111;
        font-weight: 700;
    }
    .entry-title .sep {
        color: #c4c4c4;
    }
    .entry-meta {
        margin: 0.15rem 0 0.4rem;
        font-family: ui-monospace, "SF Mono", Menlo, Consolas, monospace;
        font-size: 7.5pt;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        color: #9a9a9a;
    }
    .bullet {
        margin: 0 0 0.35rem;
        color: #333;
    }

    .cert {
        margin: 0 0 0.35rem;
        color: #444;
    }
    .cert strong {
        color: #111;
    }

    @media print {
        .sheet {
            width: auto;
            padding: 0;
        }
    }
</style>
