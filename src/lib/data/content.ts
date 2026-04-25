import type { Experience, BlogPost, Project, Colabo } from '$lib/types';

export const experiences: Experience[] = [
	{
		id: 'exp-1',
		role: 'Senior Frontend Engineer',
		company: 'TechCorp Inc.',
		startDate: '2023-01',
		endDate: 'Present',
		description: 'Leading the frontend architecture migration to Svelte 5. Improved performance metrics by 40% through component optimization and code splitting strategies.',
		technologies: ['Svelte', 'TypeScript', 'TailwindCSS']
	},
	{
		id: 'exp-2',
		role: 'Full Stack Developer',
		company: 'Digital Studio',
		startDate: '2021-06',
		endDate: '2022-12',
		description: 'Built and maintained client-facing web applications with modern JavaScript frameworks. Collaborated with design teams to implement pixel-perfect interfaces.',
		technologies: ['React', 'Node.js', 'PostgreSQL']
	},
	{
		id: 'exp-3',
		role: 'Junior Developer',
		company: 'StartupXYZ',
		startDate: '2020-03',
		endDate: '2021-05',
		description: 'Developed responsive web applications and contributed to the company\'s design system. Implemented automated testing pipelines.',
		technologies: ['Vue.js', 'Python', 'Docker']
	},
	{
		id: 'exp-4',
		role: 'Web Development Intern',
		company: 'Agency Co.',
		startDate: '2019-09',
		endDate: '2020-02',
		description: 'Assisted in building client websites and learned production-level development workflows.',
		technologies: ['HTML', 'CSS', 'JavaScript']
	}
];

export const blogPosts: BlogPost[] = [
	{
		id: 'blog-1',
		title: 'Building Reactive Layouts with Svelte 5 Runes',
		excerpt: 'Exploring how $state, $derived, and $effect create more intuitive component architectures for modern web applications.',
		date: '2024-03-15',
		tags: ['Svelte', 'Frontend'],
		slug: 'reactive-layouts-svelte-5'
	},
	{
		id: 'blog-2',
		title: 'The Case for Swiss Minimalism in Web Design',
		excerpt: 'How International Typographic Style principles translate to cleaner, more effective digital experiences.',
		date: '2024-02-28',
		tags: ['Design', 'Typography'],
		slug: 'swiss-minimalism-web-design'
	},
	{
		id: 'blog-3',
		title: 'TypeScript Performance Patterns for Large Apps',
		excerpt: 'Practical strategies for maintaining fast compile times and smooth developer experience as your codebase grows.',
		date: '2024-01-20',
		tags: ['TypeScript', 'Performance'],
		slug: 'typescript-performance-patterns'
	},
	{
		id: 'blog-4',
		title: 'Designing with Constraints: A Developer\'s Guide',
		excerpt: 'Why limiting your design choices leads to more coherent and maintainable interfaces.',
		date: '2024-01-05',
		tags: ['Design', 'Development'],
		slug: 'designing-with-constraints'
	},
	{
		id: 'blog-5',
		title: 'Edge Functions and the Future of Web Architecture',
		excerpt: 'How Cloudflare Workers and similar platforms are reshaping how we think about server-side rendering.',
		date: '2023-12-10',
		tags: ['Architecture', 'Edge'],
		slug: 'edge-functions-future'
	},
	{
		id: 'blog-6',
		title: 'Accessibility as a First-Class Concern',
		excerpt: 'Moving beyond compliance checklists to build genuinely inclusive web experiences from the ground up.',
		date: '2023-11-22',
		tags: ['Accessibility', 'UX'],
		slug: 'accessibility-first-class'
	}
];

export const projects: Project[] = [
	{
		id: 'proj-1',
		title: 'E-Commerce Platform Redesign',
		description: 'Complete redesign and rebuild of a high-traffic e-commerce platform, focusing on performance and conversion optimization.',
		year: '2024',
		tags: ['SvelteKit', 'Stripe', 'TailwindCSS'],
		link: '#'
	},
	{
		id: 'proj-2',
		title: 'Design System Library',
		description: 'An open-source component library built with Svelte 5, featuring 50+ accessible components with comprehensive documentation.',
		year: '2024',
		tags: ['Svelte', 'Storybook', 'a11y'],
		link: '#'
	},
	{
		id: 'proj-3',
		title: 'Real-time Analytics Dashboard',
		description: 'Live data visualization platform processing millions of events daily with sub-second latency.',
		year: '2023',
		tags: ['D3.js', 'WebSockets', 'Cloudflare'],
		link: '#'
	},
	{
		id: 'proj-4',
		title: 'Portfolio CMS',
		description: 'Headless CMS designed for creatives, with markdown support, asset management, and customizable themes.',
		year: '2023',
		tags: ['Node.js', 'Drizzle', 'S3'],
		link: '#'
	}
];

export const colaborations: Colabo[] = [
	{
		id: 'col-1',
		name: 'Open Source Design Tokens',
		role: 'Co-creator',
		description: 'Collaborated on a design token system that bridges the gap between design and development teams.',
		year: '2024',
		link: '#'
	},
	{
		id: 'col-2',
		name: 'Community Workshop Series',
		role: 'Instructor',
		description: 'Led a series of workshops on modern web development practices for local developer communities.',
		year: '2023',
		link: '#'
	},
	{
		id: 'col-3',
		name: 'Research Publication',
		role: 'Co-author',
		description: 'Contributed to research on developer experience metrics and framework adoption patterns.',
		year: '2023',
		link: '#'
	}
];
