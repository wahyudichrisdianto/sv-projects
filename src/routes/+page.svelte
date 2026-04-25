<script lang="ts">
    import SectionNav from "$lib/components/SectionNav.svelte";
    import Hero from "$lib/components/Hero.svelte";
    import Profile from "$lib/components/Profile.svelte";
    import ExperienceTimeline from "$lib/components/ExperienceTimeline.svelte";
    import ArchivePreview from "$lib/components/ArchivePreview.svelte";
    import ProjectsPreview from "$lib/components/ProjectsPreview.svelte";
    import Testimonials from "$lib/components/Testimonials.svelte";
    import CTA from "$lib/components/CTA.svelte";
    import { sections } from "$lib/configs/navs";
    import { experiences, blogPosts, projects } from "$lib/data/content";

    let { data } = $props();
</script>

<SectionNav sections={sections.home} />

<section id="hero">
    <Hero
        label=""
        headline="Fullstack Developer & Designer + AI Power"
        subtext="Vibing with AI to Building thoughtful digital experiences with clean code and intentional design."
    />
</section>

<section id="profile">
    <Profile
        name="Wahyudi Chrisdianto"
        title="Full Stack Developer"
        bio="Versatile Full-Stack Software Engineer and UI/UX Designer with a product-first approach. 4+ years of experience in software house and startup environments, specializing in building fast, scalable, and maintainable web, mobile, and backend systems. Proven ability to translate complex business needs into high-performance applications, optimize development workflows, and mentor teams for effective product delivery."
    />
</section>

<section id="experience">
    <ExperienceTimeline {experiences} />
</section>

<section id="writing">
    <ArchivePreview posts={blogPosts} />
</section>

<section id="work">
    <ProjectsPreview {projects} />
</section>

<section id="testimonials">
    <Testimonials testimonials={data.testimonials} />
</section>

<section id="contact">
    <CTA />
</section>
