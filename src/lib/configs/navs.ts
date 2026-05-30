export type NavLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type SectionItem = {
  id: string;
  label: string;
  wrap?: string;
};

/* ── Main navigation (Header + Footer) ── */
export const mainNav: NavLink[] = [
  { label: "Index", href: "/" },
  { label: "Archive", href: "/archive" },
  { label: "Projects", href: "/projects" },
  { label: "Colabo", href: "/colabo" },
];

/* ── Contact config — edit WHATSAPP_NUMBER to your number (intl format, no +) ── */
export const WHATSAPP_NUMBER = '6281234567890';

/* ── Social links (Footer) ── */
export const socialMedia: NavLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/wahyudichrisdianto",
    external: true,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/wahyudichrisdianto",
    external: true,
  },
  { label: "Twitter", href: "https://twitter.com/foohyu_", external: true },
  { label: "Email", href: "mailto:wahyudichrisdianto@gmail.com" },
];

/* ── Section navigation per page ── */
export const sections = {
  home: [
    { id: "hero", label: "Hero" },
    { id: "profile", label: "Profile", wrap: "Pro" },
    { id: "experience", label: "Experience", wrap: "Exp" },
{ id: "testimonials", label: "Testimonials", wrap: "Testi" },
    { id: "contact", label: "Contact", wrap: "Chat" },
  ] as SectionItem[],

  archive: [
    { id: "articles", label: "All Articles" },
    { id: "rss", label: "RSS" },
  ] as SectionItem[],

  projects: [
    { id: "projects", label: "All Projects" },
    { id: "contact", label: "Contact" },
  ] as SectionItem[],

  colabo: [
    { id: "collaborations", label: "Collaborations" },
    { id: "contact", label: "Contact" },
  ] as SectionItem[],
};
