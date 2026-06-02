<script lang="ts">
    import SectionNav from "$lib/components/SectionNav.svelte";
    import Intro from "$lib/components/Intro.svelte";
    import ExperienceTimeline from "$lib/components/ExperienceTimeline.svelte";
    import Testimonials from "$lib/components/Testimonials.svelte";
    import CTA from "$lib/components/CTA.svelte";
    import ResumeModal from "$lib/components/ResumeModal.svelte";
    import { sections, socialMedia } from "$lib/configs/navs";

    let { data } = $props();
    let resumeOpen = $state(false);

    // GitHub / LinkedIn / Email from the shared social config; Résumé opens the modal.
    const introLinks = socialMedia.filter((l) =>
        ["GitHub", "LinkedIn", "Email"].includes(l.label),
    );
</script>

<SectionNav sections={sections.home} />

<Intro
    id="intro"
    name="Wahyudi Chrisdianto"
    greeting="Hi there."
    links={introLinks}
    onResume={() => (resumeOpen = true)}
>
    {#snippet lead()}
        <p>
            I'm <strong>Wahyudi Chrisdianto</strong>, a full-stack engineer and
            UI/UX designer with a <strong>product-first</strong> mindset. I work
            across <strong>web</strong>, <strong>mobile</strong>, and
            <strong>backend systems</strong>, turning complex requirements into
            solutions that are fast, scalable, and built to last.
        </p>
    {/snippet}
</Intro>

<ExperienceTimeline id="experience" experiences={data.experiences} />

<Testimonials id="testimonials" testimonials={data.testimonials} />

<CTA id="contact" />

<ResumeModal
    bind:open={resumeOpen}
    resume={data.resume}
    experiences={data.resumeExperiences}
    education={data.resumeEducation}
    certifications={data.resumeCertifications}
    printSrc="/resume?print=1"
/>
