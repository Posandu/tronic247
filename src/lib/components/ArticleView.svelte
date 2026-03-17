<script lang="ts">
	import { formatDate } from '$lib';
	import Img from '@zerodevx/svelte-img';
	import { ripple } from 'svelte-ripple-action';

	interface Props {
		slug: string;
		title: string;
		excerpt: string;
		date: Date;
		img?: string | { src: string; w: number; h: number }[];
		class?: string;
		color?: [number, number, number];
	}

	let { slug, title, excerpt, date, img = undefined, class: classes = '', color }: Props = $props();

	const backgroundStyle = color ? `background-color: rgba(${color.join(',')}, 0.3)` : '';
	const rippleColor = color ? `rgba(${color.join(',')}, 0.4)` : undefined;
</script>

<article class="{classes} col-span-1">
	<a
		href="/{slug}"
		use:ripple={{ color: rippleColor }}
		class="article-card"
		style={backgroundStyle}
		aria-label="Read article: {title}"
	>
		{#if img}
			<div class="article-image">
				<Img src={img} alt={title} loading="lazy" class="object-cover rounded-xl w-full" />
			</div>
		{/if}

		<time datetime={date.toISOString()} class="article-date">
			{formatDate(date)}
		</time>

		<h2 class="article-title">
			{title}
		</h2>

		<p class="article-excerpt">
			{excerpt}
		</p>
	</a>
</article>

<style>
	.article-card {
		display: block;
		height: 100%;
		min-height: 12rem;
		width: 100%;
		padding: 2rem;
		overflow: hidden;
		border-radius: var(--md-sys-shape-corner-extra-large, 28px);
		background: var(--md-sys-color-surface-container);
		box-shadow: var(--md-sys-elevation-1);
		transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
	}

	.article-card:hover {
		box-shadow: var(--md-sys-elevation-2);
		transform: scale(1.01);
	}

	.article-image {
		margin-bottom: 2rem;
		aspect-ratio: 16 / 9;
		overflow: hidden;
		border-radius: 12px;
	}

	.article-date {
		display: block;
		margin-bottom: 1rem;
		color: var(--md-sys-color-on-surface);
		opacity: 0.8;
		font-size: 0.875rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.article-title {
		color: var(--md-sys-color-on-surface);
		font-size: 1.875rem;
		font-weight: 600;
		line-height: 2.5rem;
	}

	.article-excerpt {
		margin-top: 1rem;
		max-width: 20rem;
		overflow: hidden;
		overflow-wrap: break-word;
		color: var(--md-sys-color-on-surface-variant);
		opacity: 0.7;
		line-height: 1.5;
	}
</style>
