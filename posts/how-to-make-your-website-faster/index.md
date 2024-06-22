---
title: 'Methods to make your website faster'
date: '2021-10-12'
categories: ['web-dev', 'tricks-and-tips']
tags: ['cloudflare', 'perfomance', 'tips']
img: /wp-content/uploads/2021/10/How-to-increase-your-websites-speed.png
updated: '2024-06-13'
excerpt: Methods to make your website faster and improve the user experience using several techniques like lazyloading, compressing images, caching, and more.
---

Hello, fellow devs! In this article, I will tell some awesome tips to make your website faster. So, before we start, let's brainstorm why the speed of the website is important.

## Contents

## So, Why the speed is important?

Imagine you are searching in Google. Normally, it takes about 1-2 seconds. But, what if it takes more than 1 or 2 seconds? You know right? So that's why speed is important. Let's see how to make our websites faster.

## Use Cloudflare

My first tip is to use [Cloudflare](https://www.cloudflare.com/). Why? It's because it offers you page cache, CDN and also a Firewall. [Tronic247](https://www.tronic247.com) also uses Cloudflare. See this report to see how fast it made my site.

![](/wp-content/uploads/2021/10/image.png)

## Lazyload! Don't be lazy

And another thing is lazyloading. As the title says it's the process of running or loading images, videos, embeds, etc when we scroll to it. Check out this link to learn more about lazyloading.

[MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/Performance/Lazy_loading)

## Compress images

And another important thing is to Compress images. For example, open [this image](https://images.unsplash.com/photo-1500349812227-3264f5f54181?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1485&q=80). Pretty fast huh? Now open [this image](https://images.unsplash.com/photo-1500349812227-3264f5f54181). Oh.. you get it? The first image is compressed. The second image is just the high res image. That's why compressing images also should be done.

## Cache Pages

This step is very easy if you have Cloudflare, Caching is saving the page's content in the browser's cache when the visitor visits a page the first time.

![How caching works and helps to increase speed](/wp-content/uploads/2021/10/Users-Visit-the-page-first-time-2-3-seconds-to-fully-load.png)

If you want to see a live example. Open [tronic247.com](https://www.tronic247.com) in a new private window. Then open a new tab and close the tab you opened first. Then, again go to [tronic247.com](https://www.tronic247.com). Now you will experience the speed.

## Preload

As the title says Pre-Load. What happens when you hover a link? An ajax request sents to the page and the page is preloaded and saved in a cache and when the user clicks, the browser will use the cached version! These snippets may be helping you.

### Preload Google Fonts

```html
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="preload" href="https://fonts.googleapis.com/css?family=Roboto&display=swap" as="style" />
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto&display=swap" />
```

Make sure to change "Roboto" to your font.

### Preload links

Add this small snippet and your website will work fast as a rocket!

```html
<script
	src="https://cdnjs.cloudflare.com/ajax/libs/instantclick/3.1.0/instantclick.min.js"
	integrity="sha512-K0LA7hRSqNt0GOikeLRmpKEecaOy7uizFEA/b3SMMyGycCy1qRLoezkVbuXQUFVq6pwEjCszMCn3TT4dRRie+g=="
	crossorigin="anonymous"
	referrerpolicy="no-referrer"
	data-no-instant
></script>
<script data-no-instant>
	InstantClick.init();
</script>
```

And that's all you need to add! The script will do its thing.

## Use a CDN

Lastly, I recommended you use a CDN. It'll save your website's bandwidth. So the requests to your website get decreased and the page will be fast.

## Conclusion

Now that you know how to speed up your website, go on! Try the thing I said. And comment down there.
