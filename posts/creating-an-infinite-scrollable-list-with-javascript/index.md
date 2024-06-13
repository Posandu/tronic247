---
title: Infinite scrollable list with JavaScript
date: '2022-08-22'
categories: ['javascript', 'css', 'html-tutorials']
tags: ['javascript', 'css']
img: /wp-content/uploads/2022/08/Create-an-infinite-scrolling-list.png
updated: '2024-06-13'
---

Infinite scroll is a modern web development technique that allows you to create an infinitely scrollable list.
This is useful for creating a list of items that can be scrolled through without having to load the entire list into the browser.

Lots of websites use this technique to create an infinite scroll. Large websites like [Reddit](https://www.reddit.com) and [Twitter](https://twitter.com) use it extensively. So, we'll be creating an infinite scrollable list with JavaScript.

You can see the GIF below.

![20220822_165420](https://user-images.githubusercontent.com/76736580/185910340-06feb2b7-acf4-4a0d-927f-14b70f098457.gif)

## Contents

## Setup

First, we create an HTML file.

```html
<!doctype html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Document</title>

		<style>
			/* .. Styles */
		</style>
	</head>

	<body>
		<!-- HTML -->

		<script>
			// .. script here
		</script>
	</body>
</html>
```

Now, add some styles to reset the page layout.

```css
*,
*::before,
*::after {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	font-family: inherit;
}

body {
	font-family:
		system-ui,
		-apple-system,
		BlinkMacSystemFont,
		'Segoe UI',
		Roboto,
		'Helvetica Neue',
		sans-serif;
}
```

Now, we add a container and a list item to the page.

```html
<div class="container">
	<div id="articles">
		<!-- List items here -->

		<div class="article">
			<h1 class="article__title">Lorem ipsum dolor sit ame</h1>
			<p class="article__text">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.
			</p>
		</div>

		<!-- /List items here -->
	</div>
</div>
```

We get this result:

![](https://user-images.githubusercontent.com/76736580/185913214-853f5462-8d90-4e7b-8884-3ffbb20d009c.png)

Add some styles to make it look nice.

```css
.article {
	padding: 10px 20px;
	border: 1px solid #dbdbdb;
	border-radius: 5px;
	line-height: 37px;
	margin-bottom: 60px;
}

.container {
	max-width: 800px;
	margin: 30px auto;
}

.article:hover {
	background: #f7f7f7;
}

.article__title {
	font-size: 23px;
	font-weight: 400;
}

.article__text {
	color: #979797;
	font-size: 14px;
	font-weight: 400;
}
```

![](https://user-images.githubusercontent.com/76736580/185913830-2a5d1921-1bc5-479d-8e09-89b5c1557162.png)

Now, will add some space and status text.

```html
<div class="space"></div>

<div id="articles">
	<!-- List items here -->
</div>

<p id="status"></p>
```

```css
.space {
	height: 200vh;
}
```

## Making it work

Here comes JavaScript. Before we can start, we need to declare some variables and constants.

```js
const articlesContainer = document.querySelector('#articles'); // The container for the articles
const status = document.querySelector('#status'); // The status text

let loading = false; // Flag for loading
let lastLoadedArticle = 0; // The last article ID
```

And an `addArticle` function to add an article to the list.

```js
const addArticle = (title, desc) => {
	const article = document.createElement('div');

	article.classList.add('article');
	article.innerHTML = `
					<h1 class="article__title"></h1>
					<p class="article__text"></p>
				`;

	// We use this method to prevent HTML from rendering
	article.querySelector('.article__title').textContent = title;
	article.querySelector('.article__text').textContent = desc;

	articlesContainer.appendChild(article);
};
```

And an `update` function that fetches new articles and adds them to the list.

```js
const update = () => {
	articlesContainer.classList.add('loading');

	fetch(`index.json?${lastLoadedArticle}`)
		.then((data) => data.json())
		.then(({ title, body }) => {
			addArticle(title + lastLoadedArticle, body);
			lastLoadedArticle++;
			loading = false;
			articlesContainer.classList.remove('loading');
		})
		.catch(() => {
			articlesContainer.classList.remove('loading');
			alert('Something went wrong');
		});

	if (lastLoadedArticle > 99) {
		// We only want to load 100 articles
		document.removeEventListener('scroll', loadArticle);
	}
};
```

Our `index.json` file looks like this:

```js
{
    "title": "test!",
    "body": "lorem ispum dolor sit amet blah blah"
}
```

Now here comes the `loadArticle` function. This function is called when the user scrolls to the bottom of the page.

```js
const loadArticle = (e) => {
	if (loading) return; // If we are already loading, do nothing

	if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
		// If the user is at the bottom of the page
		loading = true;

		setTimeout(() => {
			status.textContent = 'Loading more...';

			update();
		}, 400);
	}
};
```

Now we can add the event listener to the document.

```js
document.addEventListener('scroll', loadArticle);
```

Congratulations! You now have a working infinite scroll.

## The End

This is the end of the tutorial. If you want to see the full source code, you can find it [here](https://gist.github.com/Posandu/c72f022e2f7bc9df3a570a65a4417e18).
