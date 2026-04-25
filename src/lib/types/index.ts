export interface NavItem {
	label: string;
	href: string;
	active?: boolean;
}

export interface SectionItem {
	id: string;
	label: string;
	wrap?: string; // short label for mobile when text would overlap
}

export interface Experience {
	id: string;
	role: string;
	company: string;
	startDate: string;
	endDate: string | 'Present';
	description: string;
	technologies: string[];
}

export interface BlogPost {
	id: string;
	title: string;
	excerpt: string;
	date: string;
	tags: string[];
	slug: string;
}

export interface Project {
	id: string;
	title: string;
	description: string;
	year: string;
	tags: string[];
	link?: string;
	image?: string;
}

export interface Colabo {
	id: string;
	name: string;
	role: string;
	description: string;
	year: string;
	link?: string;
}
