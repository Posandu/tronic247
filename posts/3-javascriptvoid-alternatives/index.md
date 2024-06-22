---
title: '3 javascript:void alternatives'
date: '2022-01-09'
categories: ['css', 'html-tutorials', 'javascript', 'tricks-and-tips']
img: /wp-content/uploads/2022/01/3-javascriptvoid-alternatives.png
updated: '2024-06-13'
excerpt: 'In this article, you will learn some javascript: void alternatives. Before we begin, I will do a brief introduction about javascript: void.'
---

In this article, you will learn some `javaScript: void` alternatives. Before we begin, I will do a brief introduction about `javascript: void`.

## What is it?

We use `javascript: void` when there's a link that we don't want to change webpage. So when a user clicks the link nothing will happen. This is mostly used in demo webpages, etc. So let's see the alternatives.

## Using [e.preventDefault;](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault)

We can set `href="#"` to the link and add a class `event` and add this javascript code.

```js
const links = document.querySelectorAll('a.event');
if (links) {
	links.forEach((link) => {
		link.addEventListener('click', (e) => {
			e.preventDefault();
		});
	});
}
```

Now, when we click the link nothing happens. You can read more about [e.preventDefault; here.](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault)

## Using #!

This is the easiest method. When we set `href="#"`, if the page is scrolling, it will scroll up. But if we set `href="#!"` it will stay the same.

## Using `return false`

Using `onclick="return: false" and` href="#"\` also works.

## Using a button instead of `a`

Using a `button` element instead of the `a` element also works. But if you want to use a link and can't live without it, you can use the methods I used before.
