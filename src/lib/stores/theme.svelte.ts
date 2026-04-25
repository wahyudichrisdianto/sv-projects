import { onMount } from 'svelte';

export type ThemeMode = 'auto' | 'light' | 'dark';

let currentTheme = $state<ThemeMode>('auto');
let effectiveTheme = $state<'light' | 'dark'>('light');

function getSystemPreference(): 'light' | 'dark' {
	if (typeof window === 'undefined') return 'light';
	return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(mode: ThemeMode) {
	const resolved = mode === 'auto' ? getSystemPreference() : mode;
	document.documentElement.setAttribute('data-theme', resolved);
	effectiveTheme = resolved;
}

function loadSavedTheme(): ThemeMode {
	if (typeof window === 'undefined') return 'auto';
	const saved = localStorage.getItem('theme');
	if (saved === 'light' || saved === 'dark' || saved === 'auto') return saved;
	return 'auto';
}

function saveTheme(mode: ThemeMode) {
	if (typeof window === 'undefined') return;
	localStorage.setItem('theme', mode);
}

export function getTheme() {
	return currentTheme;
}

export function getEffectiveTheme() {
	return effectiveTheme;
}

export function setTheme(mode: ThemeMode) {
	currentTheme = mode;
	saveTheme(mode);
	applyTheme(mode);
}

export function toggleTheme() {
	const modes: ThemeMode[] = ['auto', 'light', 'dark'];
	const idx = modes.indexOf(currentTheme);
	const next = modes[(idx + 1) % modes.length];
	setTheme(next);
}

export function useTheme() {
	onMount(() => {
		const saved = loadSavedTheme();
		currentTheme = saved;
		applyTheme(saved);

		const mq = window.matchMedia('(prefers-color-scheme: dark)');
		const handler = () => {
			if (currentTheme === 'auto') {
				applyTheme('auto');
			}
		};
		mq.addEventListener('change', handler);

		return () => mq.removeEventListener('change', handler);
	});

	return {
		get current() { return currentTheme; },
		get effective() { return effectiveTheme; },
		set: setTheme,
		toggle: toggleTheme
	};
}
