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
import remarkShikiTwoslash from 'remark-shiki-twoslash';
import theme from './theme.js';
import * as cheerio from 'cheerio';
import chalk from 'chalk';
import fs from 'fs';
import highwayhash from 'highwayhash';

/**
 * @param {string} content
 */
function escapeHtml(content) {
	content = content.replace(/{/g, '&#123;').replace(/}/g, '&#125;');

	return content;
}

let folderExists = false;
const pathForCache = process.cwd() + '/.postscache/';

const checkFolder = () => {
	if (!folderExists) {
		if (!fs.existsSync(pathForCache)) {
			fs.mkdirSync(pathForCache);
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

				console.log(chalk.gray(`Parsing ${pathname}`));

				/**
				 * Overengineered caching system
				 */
				const fileHashed = highwayhash.asString(
					Buffer.from('_'.repeat(32)),
					Buffer.from(fileContent)
				);

				const fileLoc = pathForCache + fileHashed;

				if (fs.existsSync(fileLoc)) {
					const code = fs.readFileSync(fileLoc, 'utf-8');

					console.log(chalk.green(`Successfully parsed ${pathname} (from cache)`));

					return {
						code
					};
				}

				let { content: markdownParsed, data: meta } = matter(fileContent);

				const embed = /{% embed src=(.*?) title="(.*?)" %}/g;
				const youtube = /{% youtube id="(.*?)" title="(.*?)" %}/g;

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
        					></iframe>
      					`.trim();
					})
					.replace(youtube, (_, id, title) => {
						return `
							<lite-youtube videoid="${id}" playlabel="${title}"></lite-youtube>
						`.trim();
					});

				const processor = await unified()
					.use(toMarkdownAST)
					.use([
						remarkGfm,
						remarkSmartypants,
						[remarkToc, { tight: true }],
						[
							// @ts-expect-error weird module
							remarkShikiTwoslash.default,
							{
								theme
							}
						]
					])
					.use(toHtmlAST, { allowDangerousHtml: true })
					.use([rehypeSlug, rehypeAutolinkHeadings])
					// @ts-expect-error idk
					.use(rehypeShiki, {
						theme
					})
					.use(toHtmlString, { allowDangerousHtml: true })
					.process(markdownParsed);

				const html = processor.toString();

				let excerpt = '';

				if (IS_DEV) {
					excerpt =
						'lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua';
				} else {
					const $ = cheerio.load(html);
					const text = $('html').text();

					excerpt = text.slice(0, 100).trim();
				}

				console.log(chalk.green(`Successfully parsed ${pathname}`));

				const code = `<script context="module">
								export const meta = ${JSON.stringify(meta)};
								export const excerpt = ${JSON.stringify(excerpt)};
							</script>

							${IS_DEV ? `{@html \`${escapeHtml(html).replaceAll('`', '\\`')}\`}` : escapeHtml(html)}
					`;

				fs.writeFileSync(fileLoc, code);

				return {
					code
				};
			}
		}
	};
}

export default markdown;
