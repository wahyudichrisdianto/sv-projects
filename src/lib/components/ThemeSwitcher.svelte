<script lang="ts">
	import { onMount } from 'svelte';
	import { getTheme, getEffectiveTheme, setTheme, type ThemeMode } from '$lib/stores/theme.svelte';

	const modes: { value: ThemeMode; label: string; icon: string }[] = [
		{ value: 'auto', label: 'Auto', icon: '◐' },
		{ value: 'light', label: 'Light', icon: '☀' },
		{ value: 'dark', label: 'Dark', icon: '☾' }
	];

	let current = $state<ThemeMode>('auto');
	let effective = $state<'light' | 'dark'>('light');

	onMount(() => {
		current = getTheme();
		effective = getEffectiveTheme();
	});

	function cycle() {
		const order: ThemeMode[] = ['auto', 'light', 'dark'];
		const next = order[(order.indexOf(current) + 1) % order.length];
		setTheme(next);
		current = next;
		effective = getEffectiveTheme();
	}
</script>

<button class="theme-switcher" onclick={cycle} aria-label="Toggle theme">
	<span class="theme-icon">{modes.find(m => m.value === current)?.icon}</span>
	<span class="theme-label">{current}</span>
</button>

<style>
	.theme-switcher {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.375rem 0.75rem;
		font-size: var(--text-xs);
		font-weight: 600;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--color-text-muted);
		background: none;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-sm);
		cursor: pointer;
		transition: color var(--duration-fast) var(--ease-default),
					border-color var(--duration-fast) var(--ease-default);
	}

	.theme-switcher:hover {
		color: var(--color-text);
		border-color: var(--color-border-hover);
	}

	.theme-icon {
		font-size: 0.875rem;
		line-height: 1;
	}
</style>
