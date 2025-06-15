import matter from 'gray-matter';
import { unified } from 'unified';
import toMarkdownAST from 'remark-parse';
import toHtmlAST from 'remark-rehype';
import toHtmlString from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import remarkSmartypants from 'remark-smartypants';
import remarkToc from 'remark-toc';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { theme } from './theme.js';
import chalk from 'chalk';
import fs from 'fs';
import highwayhash from 'highwayhash';
import lazyLoadPlugin from 'rehype-plugin-image-native-lazy-loading';
import rehypeExternalLinks from 'rehype-external-links';
import rehypePrettyCode from 'rehype-pretty-code';
import {
	transformerNotationDiff,
	transformerNotationHighlight,
	transformerNotationFocus,
	transformerMetaHighlight
} from '@shikijs/transformers';
import rehypeCodeTitles from 'rehype-code-titles';
import remarkDirective from 'remark-directive';
//@ts-expect-error no types
import remarkCalloutDirectives from '@microflash/remark-callout-directives';
import sharp from 'sharp';

const VERBOSE = 0;

/**
 * @param {string} imagePath
 * @returns {Promise<[number, number, number]|undefined>}
 */
async function getColorFromURL(imagePath) {
	try {
		const { data, info } = await sharp(imagePath)
			.resize(1, 1)
			.raw()
			.toBuffer({ resolveWithObject: true });

		const [r, g, b] = data;
		return [r, g, b];
	} catch (error) {
		console.error('Error getting color from image:', error);
		return undefined;
	}
}

/**
 * @param {number} r
 * @param {number} g
 * @param {number} b
 * @returns {[number, number, number]}
 */
function rgbToHsl(r, g, b) {
	r /= 255;
	g /= 255;
	b /= 255;
	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	let h = 0;
	let s = 0;
	let l = (max + min) / 2;

	if (max === min) {
		h = s = 0;
	} else {
		const d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		switch (max) {
			case r:
				h = (g - b) / d + (g < b ? 6 : 0);
				break;
			case g:
				h = (b - r) / d + 2;
				break;
			case b:
				h = (r - g) / d + 4;
				break;
		}
		h /= 6;
	}
	return [h, s, l];
}

/**
 * @param {number} h
 * @param {number} s
 * @param {number} l
 * @returns {[number, number, number]}
 */
function hslToRgb(h, s, l) {
	/**
	 * @param {number} p
	 * @param {number} q
	 * @param {number} t
	 * @returns {number}
	 */
	function hue2rgb(p, q, t) {
		if (t < 0) t += 1;
		if (t > 1) t -= 1;
		if (t < 1 / 6) return p + (q - p) * 6 * t;
		if (t < 1 / 2) return q;
		if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
		return p;
	}

	let r, g, b;
	if (s === 0) {
		r = g = b = l;
	} else {
		const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
		const p = 2 * l - q;
		r = hue2rgb(p, q, h + 1 / 3);
		g = hue2rgb(p, q, h);
		b = hue2rgb(p, q, h - 1 / 3);
	}
	return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

/**
 * @param {number} r
 * @param {number} g
 * @param {number} b
 * @param {number} minLightness
 * @param {number} maxLightness
 * @returns {[number, number, number]}
 */
function adjustBrightnessHSL(r, g, b, minLightness = 0.3, maxLightness = 0.7) {
	const [h, s, l] = rgbToHsl(r, g, b);

	let newL = l;
	if (l > maxLightness) {
		newL = maxLightness;
	} else if (l < minLightness) {
		newL = minLightness;
	}

	return hslToRgb(h, s, newL);
}

/**
 * @param {string} content
 */
function escapeHtml(content) {
	content = content.replace(/{/g, '&#123;').replace(/}/g, '&#125;');

	return content;
}

let folderExists = false;
const VERSION = '1.38.svelte';
const pathForCache = process.cwd() + '/node_modules/.cache/md/';

const checkFolder = () => {
	if (!folderExists) {
		if (!fs.existsSync(pathForCache)) {
			fs.mkdirSync(pathForCache, { recursive: true });
		}

		folderExists = true;
	}
};

/**
 *
 * @param {String} content
 * @returns
 */
function fastPathHash(content) {
	return 'Img' + highwayhash.asString(Buffer.from('_'.repeat(32)), Buffer.from(content));
}

function markdown() {
	const IS_DEV = process.env.NODE_ENV === 'development';

	return {
		name: 'markdown',
		/**
		 * @param {Object} params
		 * @param {string} params.content
		 * @param {string} params.filename
		 */
		async markup({ content: fileContent, filename: pathname }) {
			if (pathname.endsWith('.md')) {
				checkFolder();

				if (VERBOSE) console.log(chalk.gray(`Compiling ${pathname}`));

				/**
				 * Overengineered caching system
				 */
				const fileHashed = highwayhash.asString(
					Buffer.from('_'.repeat(32)),
					Buffer.from(fileContent)
				);

				const slug = pathname.split('/').at(-2);

				const fileLoc =
					pathForCache +
					(IS_DEV ? slug + '_' + fileHashed.toString() + '.svelte' : fileHashed + '.cache') +
					VERSION;

				if (fs.existsSync(fileLoc)) {
					const code = fs.readFileSync(fileLoc, 'utf-8');

					if (VERBOSE) console.log(chalk.green(`Successfully compiled from cache`));

					return {
						code
					};
				}

				let { content: markdownParsed, data: meta } = matter(fileContent);

				const embed = /{% embed src="(.*?)" title="(.*?)" %}/g;
				const youtube = /{% youtube id="(.*?)" title="(.*?)" %}/g;
				const stackBlitz = /{% stackblitz id="(.*?)" open="(.*?)" %}/g;
				const component = /{% component (.*)\/(.*) %}/g;
				const image = /{% img (.*) %}/g;
				const componentName = /<?([a-zA-Z]+)/g;

				/**
				 * @type {({name:string,path:string}|undefined)[]}
				 */
				let componentImports = [];

				/**
				 * @type {({name:string,path:string}|undefined)[]}
				 */
				let imageImports = [];

				/**
				 * Replace regexes
				 */
				markdownParsed = markdownParsed
					.replace(embed, (_, src, title) => {
						return `
								<iframe
								  title="${title}"
								  src="${src}"
								  loading="lazy"
								  height="455"
								></iframe>
						`.trim();
					})
					.replace(youtube, (_, id, title) => {
						return `
								<lite-youtube videoid="${id}" playlabel="${title}"></lite-youtube><noscript>Videos are disabled. <a href="https://www.youtube.com/watch?v=${id}">Click here to watch</a></noscript>
						`.trim();
					})
					.replace(stackBlitz, (_, id, open) => {
						componentImports.push(undefined);

						return `
								<StackBlitz id="${id}" openFile="${open}"></StackBlitz>
						`.trim();
					})
					.replace(component, (_, _name, path) => {
						const name = _name.match(componentName)[0];

						componentImports.push({ name, path });

						return `
								${_name.startsWith('<') ? `${name}` : `<${name} />`}
						`.trim();
					})
					.replace(image, (_, src) => {
						const hash = fastPathHash(src);

						imageImports.push({ name: hash, path: src });

						return `
								<img src=___startC${hash}___endC alt="${src}" />
						`.trim();
					});

				const processor = await unified()
					.use(toMarkdownAST)
					.use([
						remarkDirective,
						remarkCalloutDirectives,
						remarkGfm,
						remarkSmartypants,
						[remarkToc, { tight: true }]
					])
					.use(toHtmlAST, { allowDangerousHtml: true })
					.use([rehypeSlug, rehypeAutolinkHeadings])
					//@ts-expect-error some weird error, but it works
					.use(lazyLoadPlugin)
					.use(rehypeCodeTitles)
					.use(rehypePrettyCode, {
						theme,
						transformers: [
							transformerNotationDiff(),
							transformerNotationHighlight(),
							transformerNotationFocus(),
							transformerMetaHighlight()
						]
					})
					.use(rehypeExternalLinks, {
						target: '_blank',
						rel: ['noopener', 'noreferrer']
					})
					.use(toHtmlString, { allowDangerousHtml: true })
					.process(markdownParsed);

				let html = processor.toString();

				const excerpt = meta?.excerpt?.trim() || '';
				const img = meta?.img?.trim();

				if (img && typeof img === 'string' && img !== 'undefined') {
					const color = await getColorFromURL(process.cwd() + '/static/' + img);

					if (!color) return;

					const brightnessAdjusted = adjustBrightnessHSL(color[0], color[1], color[2]);
					meta.color = brightnessAdjusted;

					if (VERBOSE) console.log(chalk.green(`Successfully got color from image - ${color}`));
				}

				const code = `<script context="module">
									import StackBlitz from '$lib/components/StackBlitz.svelte';

									export const meta = ${JSON.stringify(meta)};
									export const excerpt = ${JSON.stringify(excerpt)};
									export const length = ${html.length};

									${componentImports
										.filter((i) => typeof i !== 'undefined')
										.map(({ name, path }) =>
											`

												import ${name} from '$lib/components/md/${path}/${name}.svelte';

											`.trim()
										)
										.join('\n')}

									${imageImports
										.filter((i) => typeof i !== 'undefined')
										.map(({ name, path }) =>
											`

												import ${name} from '$lib/images/${path}';

											`.trim()
										)
										.join('\n')}
								</script>

								${
									IS_DEV && !(componentImports.length > 0 || imageImports.length > 0)
										? `

										{@html \` ${escapeHtml(html)
											.replaceAll('`', '\\`')
											.replace(/<style>:root[^<]*<\/style>/g, '')
											.replaceAll(/___startC/g, '{')
											.replaceAll(/___endC/g, '}')}  \`}

									`.trim()
										: escapeHtml(html).replaceAll('___startC', '{').replaceAll('___endC', '}')
								}
						`;

				fs.writeFileSync(fileLoc, code);

				if (VERBOSE) console.log(chalk.green(`Successfully compiled`));

				return {
					code
				};
			}
		}
	};
}

export default markdown;
