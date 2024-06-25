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
import rehypeShiki from '@shikijs/rehype';
import theme from './theme.js';
import chalk from 'chalk';
import fs from 'fs';
import highwayhash from 'highwayhash';
import lazyLoadPlugin from 'rehype-plugin-image-native-lazy-loading';
import rehypeExternalLinks from 'rehype-external-links';
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

const VERBOSE = true;

/**
 * @param {string} content
 */
function escapeHtml(content) {
	content = content.replace(/{/g, '&#123;').replace(/}/g, '&#125;');

	return content;
}

let folderExists = false;
const VERSION = 'v4';
const pathForCache = process.cwd() + '/node_modules/.cache/md/';

const checkFolder = () => {
	if (!folderExists) {
		if (!fs.existsSync(pathForCache)) {
			fs.mkdirSync(pathForCache, { recursive: true });
		}

		folderExists = true;
	}
};

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
				const componentName = /<?([a-zA-Z]+)/g;

				/**
				 * @type {({name:string,path:string}|undefined)[]}
				 */
				let imports = [];

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
								<lite-youtube videoid="${id}" playlabel="${title}"></lite-youtube><noscript><p>Videos are disabled. <a href="https://www.youtube.com/watch?v=${id}">Click here to watch</a></p></noscript>
						`.trim();
					})
					.replace(stackBlitz, (_, id, open) => {
						imports.push(undefined);

						return `
								<StackBlitz id="${id}" openFile="${open}"></StackBlitz>
						`.trim();
					})
					.replace(component, (_, _name, path) => {
						const name = _name.match(componentName)[0];

						imports.push({ name, path });

						return `
								${_name.startsWith('<') ? `${name}` : `<${name} />`}
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
					.use(rehypeShiki, {
						theme: theme,
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

				const code = `<script context="module">
									import StackBlitz from '$lib/components/StackBlitz.svelte';

									export const meta = ${JSON.stringify(meta)};
									export const excerpt = ${JSON.stringify(excerpt)};
									export const length = ${html.length};
								</script>

								<script>
									${imports
										.filter((i) => typeof i !== 'undefined')
										// @ts-expect-error already checked
										.map(({ name, path }) =>
											`
											
												import ${name} from '$lib/components/md/${path}';
												
											`.trim()
										)}
								</script>
	
								${
									IS_DEV && !(imports.length > 0)
										? `

										{@html \` ${escapeHtml(html).replaceAll('`', '\\`')}  \`}

									`.trim()
										: escapeHtml(html)
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
