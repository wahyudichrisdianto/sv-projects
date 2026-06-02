<script lang="ts">
	import type { Pathname } from '$app/types';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { locales, localizeHref } from '$lib/paraglide/runtime';
	import '$lib/styles/global.css';
	import favicon from '$lib/assets/favicon.svg';
	import Preloader from '$lib/components/Preloader.svelte';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';

	const SITE_URL = 'https://kaiyu.dev';
	const SITE_NAME = 'Wahyudi Chrisdianto';
	const SITE_TITLE = 'Wahyudi Chrisdianto — Full Stack Developer';
	const SITE_DESCRIPTION =
		'Wahyudi Chrisdianto (Kaiyu) is a Full Stack Software Engineer and UI/UX Designer based in Banten, Indonesia. Specializing in Svelte, React, Node.js, TypeScript, cloud-native web applications, and product-first development.';
	const OG_IMAGE = `${SITE_URL}/og-image.png`;

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />

	<!-- Primary SEO -->
	<title>{SITE_TITLE}</title>
	<meta name="description" content={SITE_DESCRIPTION} />
	<meta name="author" content={SITE_NAME} />
	<meta name="keywords" content="Wahyudi Chrisdianto, Kaiyu, full stack developer, UI UX designer, Svelte developer, SvelteKit, React, Node.js, TypeScript, cloud-native web applications, software engineer Indonesia, Banten developer, frontend engineer, product-first development, Svelte 5, TailwindCSS, PostgreSQL, Cloudflare Workers" />
	<meta name="robots" content="index, follow" />
	<meta name="googlebot" content="index, follow" />
	<link rel="canonical" href={SITE_URL} />

	<!-- Open Graph / Facebook -->
	<meta property="og:site_name" content="Wahyudi Chrisdianto" />
	<meta property="og:title" content={SITE_TITLE} />
	<meta property="og:description" content={SITE_DESCRIPTION} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={SITE_URL} />
	<meta property="og:image" content={OG_IMAGE} />
	<meta property="og:image:alt" content="Wahyudi Chrisdianto — Full Stack Developer" />
	<meta property="og:locale" content="en_US" />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={SITE_TITLE} />
	<meta name="twitter:description" content={SITE_DESCRIPTION} />
	<meta name="twitter:image" content={OG_IMAGE} />
	<meta name="twitter:image:alt" content="Wahyudi Chrisdianto — Full Stack Developer" />

	<!-- JSON-LD Structured Data -->
	<script type="application/ld+json">
		{{
			"@context": "https://schema.org",
			"@type": "Person",
			"name": "Wahyudi Chrisdianto",
			"alternateName": "Kaiyu",
			"url": SITE_URL,
			"jobTitle": "Full Stack Software Engineer",
			"description": SITE_DESCRIPTION,
			"address": {
				"@type": "Place",
				"addressLocality": "Banten",
				"addressCountry": "ID"
			},
			"knowsAbout": [
				"Svelte",
				"SvelteKit",
				"React",
				"TypeScript",
				"JavaScript",
				"Node.js",
				"TailwindCSS",
				"PostgreSQL",
				"Cloudflare Workers",
				"UI/UX Design",
				"Full Stack Development",
				"Product Development"
			],
			"sameAs": [
				"https://www.linkedin.com/in/wahyudichrisdianto",
				"https://github.com/wahyudichrisdianto",
				"https://portoshare.com"
			]
		}}
	</script>

	<!-- WebSite Schema (for Google Sitelinks Search Box) -->
	<script type="application/ld+json">
		{{
			"@context": "https://schema.org",
			"@type": "WebSite",
			"name": "Wahyudi Chrisdianto",
			"url": SITE_URL,
			"description": "Personal portfolio of Wahyudi Chrisdianto — Full Stack Developer"
		}}
	</script>
</svelte:head>

<Preloader />
<Header />
<main>
	{@render children()}
</main>
<Footer />

<div style="display:none">
	{#each locales as locale (locale)}
		<a
			href={resolve(localizeHref(page.url.pathname, { locale }) as Pathname)}
		>{locale}</a>
	{/each}
</div>
