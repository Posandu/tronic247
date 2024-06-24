type Page = {
	loc: string;
	title: string;
	excerpt: string;
	lastmod: string;
	changefreq?: string;
	priority?: string;
	excludeInRss?: boolean;
};

class SiteMap {
	pages: Page[] = [];
	sitemapRaw: string = '';
	rssFeedRaw: string = '';

	addPage(page: Page) {
		this.pages.push(page);
	}

	generate() {
		this.sitemapRaw = `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${this.pages
							.map((page) => {
								return `
                <url>
                    <loc>${page.loc}</loc>
                    <lastmod>${new Date(page.lastmod).toLocaleDateString('en-CA')}</lastmod>
                    ${page.changefreq ? `<changefreq>${page.changefreq}</changefreq>` : ''}
                    ${page.priority ? `<priority>${page.priority}</priority>` : ''}
                </url>
                `.trim();
							})
							.join(``)}
        </urlset>`;

		return this.sitemapRaw;
	}

	generateRssFeed() {
		this.rssFeedRaw = `<?xml version="1.0" encoding="UTF-8"?>
		<rss version="2.0">
			<channel>
				<title>Tronic247</title>
				<link>https://www.tronic247.com</link>
				<description>Posandu's personal blog</description>
				${this.pages
					.filter((page) => !page.excludeInRss)
					.map((page) => {
						return `
					<item>
						<title>${page.title}</title>
						<link>${page.loc}</link>
						<description>${page.excerpt}</description>
						<pubDate>${new Date(page.lastmod).toUTCString()}</pubDate>
					</item>
					`.trim();
					})
					.join(``)}
			</channel>
		</rss>`;

		return this.rssFeedRaw;
	}
}

export { SiteMap };
