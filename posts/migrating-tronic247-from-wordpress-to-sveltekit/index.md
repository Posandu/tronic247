---
title: Migrating Tronic247 from WordPress to SvelteKit
date: '2024-06-15'
categories: ['migration']
tags: ['sveltekit', 'wordpress']
img: '/thumbnails/migrating-from-wp-to-sveltekit.png'
---

I was with my friends in a rural area, discussing websites and how they are made. When I showed them my blog on my phone, it took about 30 seconds to load, and some images were still loading. Initially, I blamed the slow internet connection, but back home with a fast connection, my site was still sluggish.

This made me rethink my blog's performance. I had been using WordPress for a while and I loved it when I started blogging, and I was tired of the slow load times. That's when I decided to migrate my blog from WordPress to SvelteKit.

This big decision required a lot of planning and preparation, which I procrastinated on for a while.

## Why Migrate?

The main reason is performance. WordPress is a great platform, but it's not the fastest. Even with Cloudflare, my blog's performance was lacking.

Additionally, WordPress doesn't offer much flexibility for front-end customization. There are many themes, yet none of them matched my design expectations, and PHP's performance is slower compared to a statically rendered site. (I still love WordPress and PHP, though.)

Another motivation was my urge to learn. I've been using Svelte and really enjoy it. Rewriting my blog in SvelteKit would be a great way to solidify my knowledge of Svelte and other technologies.

Finally, I wanted more control over my blog. With WordPress, I was limited to its features. SvelteKit offers me the freedom to build whatever I want, and the developer experience (DX) is far superior. Building the blog in Svelte will also help me to improve my portfolio.

## Preparing for the Migration

Migrating from WordPress to SvelteKit wasn't easy and required thorough planning. I started by creating a new SvelteKit project using the default template, adding Tailwind CSS, and setting up the project's basic structure.

Here's what it looked like after a few days of work:

```
posts/
snippets/
src/
┣ lib/
┃ ┣ components/
┃ ┃ ┣ md/
┣ routes/
┃ ┣ archive/
┃ ┣ category/
┃ ┣ search/
┃ ┣ sitemap.xml/
┃ ┣ snippets/
┃ ┣ sponsor/
┃ ┣ tag/
┃ ┣ trycode/
┃ ┣ [slug]/
┣ app.css
┣ app.d.ts
┗ app.html
static/
```

I kept it simple and avoided using monorepos or other complex setups, as they were unnecessary for a simple blog.

## Tech Stack

Obviously, the blog is powered by SvelteKit. Here's the tech stack I used:

- TailwindCSS for styling
- Markdown for writing articles
- Shiki for syntax highlighting
- Windows PowerToys for image scaling (The SvelteKit image component was not working as expected)
- Frontmatter for metadata
- Unified for parsing markdown
- Vercel for hosting (better than GitHub Pages for my needs)

The blog is prerendered at build time, making it **blazing ✨ fast** without needing a database.

## The Markdown Preprocessor

For Next.js, there's MDX, and for SvelteKit, there's MDsvex. While MDsvex is a great tool, I wanted more control over markdown parsing. So, I wrote my own markdown preprocessor.

My preprocessor is overengineered a lot but includes features like:

- Syntax highlighting rendered on the server!
- Frontmatter
- Custom Svelte components
- Caching (crucial for performance)
- Live reload

The preprocessor reads each markdown file, compares checksums, and re-renders files if necessary, saving time during development as only modified files are re-rendered.

Rendering a markdown file took about 8s on average, but with caching, it's down to 100ms. This is crucial for a fast development experience.

## Migrating the Content

After setting up the project and writing the markdown preprocessor, it was time to migrate the content. This task was harder than writing the code. A quick Google search led me to [wordpress-export-to-markdown](https://github.com/lonekorean/wordpress-export-to-markdown), which exported posts, pages, and media to markdown files quickly. The tool was a lifesaver, I couldn't imagine doing it manually.

However, I still had to fix frontmatter, images, and links manually. I also converted shortcodes to Svelte components, and about 10% of the posts were broken, requiring rewrites.

Here's what a typical post looks like:

```markdown
---
title: Migrating Tronic247 from WordPress to SvelteKit
date: '2024-06-15'
categories: ['migration']
tags: ['sveltekit', 'wordpress']
img: 'https://example.com/image.png'
---

The content of the post goes here.
```

After a few days of hard work, I finally migrated all the content to SvelteKit.

## SEO

SEO is crucial for a blog. While WordPress has plugins to handle SEO, with SvelteKit, you do it manually. Thankfully, I found [svelte-seo](https://github.com/artiebits/svelte-seo), which makes adding SEO metadata easy.

With this tool and ChatGPT's help, I generated metadata for all posts and pages.

I wrote a sitemap generator in SvelteKit to generate a sitemap.xml file. It's a simple script that reads all posts and generates a sitemap.

The `sitemap.xml` file isn't actually a file but a route in SvelteKit. It's generated at build time and served as an XML file.

And... that's it! I successfully migrated my blog from WordPress to SvelteKit. The blog is now faster, more customizable, and more enjoyable to work on.

## Comments

The comments section is powered by [Utterances](https://utteranc.es/), a GitHub issue-based commenting system. It's simple, fast, and doesn't require a database.

## Conclusion

Migrating from WordPress to SvelteKit was a great decision. I learned a lot and made my blog faster and more customizable. I'm thrilled with the result and look forward to writing more articles on my new blog.

If you're considering migrating your blog from WordPress to SvelteKit, I highly recommend it. It's challenging but definitely worth it.

The source code for the blog is available on [GitHub](https://github.com/Posandu/tronic247). Feel free to use it as a reference if you want to migrate your blog to SvelteKit.

Thanks for reading!
