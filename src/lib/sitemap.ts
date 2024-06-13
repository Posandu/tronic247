type Page = {
	loc: string;
	lastmod: string;
	changefreq?: string;
	priority?: string;
};

class SiteMap {
	pages: Page[] = [];
	sitemapRaw: string = '';

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
                    <lastmod>${page.lastmod}</lastmod>
                    ${page.changefreq ? `<changefreq>${page.changefreq}</changefreq>` : ''}
                    ${page.priority ? `<priority>${page.priority}</priority>` : ''}
                </url>
                `.trim();
							})
							.join(``)}
        </urlset>`;

		return this.sitemapRaw;
	}
}

export { SiteMap };
