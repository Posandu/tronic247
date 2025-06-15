<script lang="ts">
	import { formattedTitle } from '$lib';
	import SvelteSeo from 'svelte-seo';
</script>

<SvelteSeo title={formattedTitle('About')} />

<div class="mx-auto mt-16 max-w-5xl px-4">
	<div class="prose prose-invert">
		<h1>About Tronic247</h1>

		<p>
			Hi, I'm Posandu, a {new Date().getFullYear() - 2008} year old dev from Sri Lanka. Tronic247 is
			my blog where I share things I learn and things I build.
		</p>

		<p>
			It was started in 2020 as a YouTube channel where I made small tutorials about HTML and CSS
			while I was learning them. You can still find some of the videos on my channel. <a
				target="_blank"
				href="https://www.youtube.com/@Tronic247">https://www.youtube.com/@Tronic247</a
			>
		</p>

		<p>
			Even though I don't make videos anymore, I still write articles here and build a lot of
			things. I might even make videos again in the future.
		</p>

		<p>
			If you want to get in touch, you can find me on <a
				target="_blank"
				href="https://x.com/posandu">Twitter / X</a
			>, <a target="_blank" href="https://github.com/posandu">GitHub</a> or just visit my website
			<a target="_blank" href="https://posandu.com">posandu.com</a>.
		</p>

		<p>:D</p>
	</div>
</div>
