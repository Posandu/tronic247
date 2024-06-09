import matter from 'gray-matter';
import { unified } from 'unified';
import toMarkdownAST from 'remark-parse';
import toHtmlAST from 'remark-rehype';
import toHtmlString from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
// @ts-expect-error retarded module
import remarkSmartypants from 'remark-smartypants';
import remarkToc from 'remark-toc';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeShiki from '@shikijs/rehype';
import remarkShikiTwoslash from 'remark-shiki-twoslash';
import theme from '../../tokyo-night.json' with { type: 'json' };
import * as cheerio from 'cheerio';

/**
 * @param {string} content
 */
function escapeHtml(content) {
	content = content.replace(/{/g, '&#123;').replace(/}/g, '&#125;');

	const componentRegex = /<[A-Z].*/g;
	const components = content.match(componentRegex);
	components?.forEach((component) => {
		const replaced = component.replace('&#123;', '{').replace('&#125;', '}');
		content = content.replace(component, replaced);
	});

	return content;
}

/**
 * @param {string} content
 */
async function toHTML(content) {
	const processor = await unified()
		.use(toMarkdownAST)
		.use([
			remarkGfm,
			remarkSmartypants,
			[remarkToc, +{ ordered: true, tight: false }],
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
		.process(content);

	const html = processor.toString();

	return html;
}

/**
 * @param {string} content
 * @returns
 */
function frontmatter(content) {
	const { content: markdown, data } = matter(content);
	const meta = `
			export const metadata = ${JSON.stringify(data)}
	`;
	return { markdown, meta };
}

/**
 * @param {string} html
 * @param {number} pruneLength
 */
function genExcerpt(html, pruneLength) {
	const $ = cheerio.load(html);
	const text = $('body').text();

	if (text.length > pruneLength) {
		return text.slice(0, pruneLength) + '...';
	}

	return text;
}

function markdown() {
	return {
		name: 'markdown',
		/**
		 * @param {Object} params
		 * @param {string} params.content
		 * @param {string} params.filename
		 */
		async markup({ content, filename }) {
			if (filename.endsWith('.md')) {
				const { markdown, meta } = frontmatter(content);
				const html = await toHTML(markdown);

				return {
					code: `
							<script context="module">
								${meta} 
					
								export const excerpt = ${JSON.stringify(genExcerpt(html, 200))}
							</script>

					${escapeHtml(html)}

					{@html "<!-- ${new Date().toISOString()} -->"}

					`
				};
			}
		}
	};
}

export default markdown;
