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
    import { blogPosts } from "$lib/data/content";

    let { data } = $props();
</script>

<SectionNav sections={sections.home} />

<Hero
    id="hero"
    label=""
    title="Creative Developer"
    title2="* Tukang Pecut AI"
    subtext="Vibing with AI to Building thoughtful digital experiences with clean code and intentional design."
/>

<Profile
    id="profile"
    name="Wahyudi Chrisdianto"
    title="Full Stack Developer"
    bio="Saya adalah Full-Stack Software Engineer dengan pendekatan product-first, berfokus pada membangun web, mobile, dan backend system yang cepat, scalable, dan mudah dipelihara. Saya terbiasa menerjemahkan kebutuhan bisnis yang kompleks menjadi solusi teknis yang solid, efisien, dan berdampak.
 /n Saya juga berpengalaman dalam mengoptimalkan workflow pengembangan, menjaga kualitas implementasi, serta membantu tim bekerja lebih efektif agar produk dapat dirilis dengan lebih baik."
    projectCount={data.projectCount}
/>

<ExperienceTimeline id="experience" experiences={data.experiences} />

<ProjectsPreview id="work" projects={data.projects} />

<Testimonials id="testimonials" testimonials={data.testimonials} />

<CTA id="contact" />
