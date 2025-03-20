---
title: Nprogress with SvelteKit
date: '2023-03-18'
categories: ['html-tutorials', 'javascript', 'svelte', 'tricks-and-tips', 'css']
tags: ['nprogress', 'sveltekit', 'svelte', 'css']
img: /wp-content/uploads/2023/03/Nprogress-.png
updated: '2024-06-13'
excerpt: A simple guide to add Nprogress to SvelteKit to show a progress bar when navigating between pages.
---

You may be wondering how to add Nprogress to SvelteKit. This is a simple guide to help you get started.



## What is Nprogress?

NProgress is a JavaScript library that provides a slim progress bar at the top of your website or web application when loading content or making asynchronous requests. It is designed to give users a visual cue that something is happening in the background, and can help improve the user experience by reducing perceived load times. NProgress is easy to implement and highly customizable, making it a popular choice for many web developers.

![](https://user-images.githubusercontent.com/76736580/226861236-c4abfb9e-0f73-42e9-bfdc-f5993bcf56e2.png)

You can view more [here](https://rstacruz.github.io/nprogress/ 'here').

<span style="opacity:0;position:absolute;pointer-events:none">nprogress sveltekit</span>

## Step 1: Install Nprogress

We first need to install nprogress to SvelteKit. To do this, we can run the following command:

```bash
npm install nprogress # or pnpm install nprogress or yarn add nprogress
```

## Step 2: Modify the layout

We need to modify the layout to add the nprogress bar. Create or modify the layout file in `src/routes/+layout.svelte` to add the following code:

```html
<script>
	import 'nprogress/nprogress.css';
	import NProgress from 'nprogress';
	import { navigating } from '$app/stores';

	NProgress.configure({
		// Full list: https://github.com/rstacruz/nprogress#configuration
		minimum: 0.16
	});

	$: {
		if ($navigating) {
			NProgress.start();
		} else NProgress.done();
	}
</script>
```

Here we are importing the nprogress css and the nprogress library. We are also importing the navigating store from the app store. We are then configuring the nprogress bar. We are then using a `$:` block to check if the user is navigating. If they are, we start the nprogress bar. If they are not, we stop the nprogress bar.

## Typescript

Here is the typescript version of the above code:

```html
<script lang="ts">
	import 'nprogress/nprogress.css';
	import NProgress from 'nprogress';
	import { navigating } from '$app/stores';

	NProgress.configure({
		// Full list:
		minimum: 0.16
	});

	$: {
		if ($navigating) {
			NProgress.start();
		} else NProgress.done();
	}
</script>
```

Make sure to add the `lang="ts"` attribute to the script tag. And also install the typescript types for nprogress:

```bash
npm install @types/nprogress # or pnpm install @types/nprogress or yarn add @types/nprogress
```

## Conclusion

That's it! You now have nprogress added to your SvelteKit app. You can now navigate around your app and see the nprogress bar.
