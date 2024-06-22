---
title: Show GitHub contributors of a file
date: '2023-01-27'
categories: ['html-tutorials', 'javascript']
tags: ['github', 'javascript']
img: /wp-content/uploads/2023/01/Get-Github-Commits-of-a-file.png
updated: '2024-06-13'
excerpt: Learn how to show the GitHub contributors of a file in a repository using the GitHub API and Alpine.js.
---

While browsing the Ant Design documentation, I noticed that they show the GitHub contributors of a file at the bottom of the page. I thought it was a nice feature and wanted to blog about it.

![](https://user-images.githubusercontent.com/76736580/215069794-05144e8e-03d9-4c72-aa07-595e1ce8446c.png)

## Contents

## The GitHub API

The GitHub API is a great resource to get information about a repository. It is very well-documented and has a lot of endpoints. The endpoint we are interested in is the [commits](https://docs.github.com/en/rest/reference/repos#commits) endpoint. It returns a list of commits for a repository. We can use the `path` parameter to filter the commits by a file path and filter the commits by a specific author with the `author` parameter. For example, the following request returns the commits for the `README.md` file in the `gatsby` repository:

```
https://api.github.com/repos/gatsbyjs/gatsby/commits?path=README.md
```

it will give us an array of commits like this:

```js
[
	{
		sha: '',
		node_id: '',
		commit: {
			author: {
				name: '',
				email: '',
				date: '2022-11-08T07:08:16Z'
			},
			committer: {
				name: '',
				email: 'noreply@github.com',
				date: '2022-11-08T07:08:16Z'
			},
			message: 'chore: Update main README (#36954)',
			tree: {
				sha: '041fd9524aae99d573dbf6bd03a09953faa87ad8',
				url: 'https://api.github.com/repos/gatsbyjs/gatsby/git/trees/041fd9524aae99d573dbf6bd03a09953faa87ad8'
			},
			url: 'https://api.github.com/repos/gatsbyjs/gatsby/git/commits/5e8e621bef0d4244f718d3b42d668d63504260e7',
			comment_count: 0,
			verification: {
				verified: true,
				reason: 'valid',
				signature: '',
				payload: ''
			}
		}
	}
];
```

## Creating a frontend to show the contributors

We will create a mini frontend to show getting the commits for a file and showing the contributors. We will use [Alpine.js](https://alpinejs.dev) and [PicoCSS](https://picocss.com) to create the frontend because they are small and easy to use. First, create an `index.html` file with the following content:

```html
<!doctype html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Document</title>
		<script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>
		<link rel="stylesheet" href="https://unpkg.com/@picocss/pico@latest/css/pico.min.css" />

		<style>
			.avatar {
				border-radius: 50%;
			}
		</style>
	</head>
	<body>
		<div class="container" x-data>
			<h1>Some stuff</h1>

			<p>
				Lorem ipsum dolor, sit amet consectetur adipisicing elit. A quasi nobis in. Neque harum
				assumenda, mollitia voluptatibus voluptatum laudantium, magnam quasi ipsum error voluptas at
				rerum libero placeat. Molestiae, obcaecati.
			</p>

			<h2>Contributors</h2>

			<!-- Contributors will be shown here -->
		</div>

		<script>
			/** Alpine.js stuff */
		</script>
	</body>
</html>
```

Here we have a simple HTML page that looks like this:

![](https://user-images.githubusercontent.com/76736580/215071221-5f137fc7-dd43-48da-b728-7ef59924952c.png)

Now I will save a sample response as `test.json` because I can't send a request every time I refresh the page. That will be a bad thing to do and we can get a rate limited.

## Getting the commits

In the scripting part, we will first define a constant to the API URL we want.

```javascript
const API_PATH = './test.json'; // https://api.github.com/repos/ant-design/ant-design/commits?path=components/button/index.en-US.md
```

Then we define an [alpine.js store](https://alpinejs.dev/globals/alpine-store) to hold the commits.

```javascript
const cStore = {
	contribs: [],

	setContribs(contribs) {
		this.contribs = contribs;
	}
};
```

We then initialize the store with the `Alpine.store()` function.

```javascript
document.addEventListener('alpine:init', () => {
	Alpine.store('cStore', cStore);
});
```

After that, we will fetch the commits and parse them to JSON.

```javascript
const commitsData = fetch(API_PATH).then((res) => res.json());
```

We will create a function to format the commits to the format we want. We will use the `reduce()` function to get the unique contributors and the `map()` function to get the commits for each contributor.

```javascript
const format = (data) =>
	data
		.map((item) => ({
			name: item.commit.author.name || item.author.login,
			id: item.author.id,
			username: item.author.login,
			link: item.author.html_url,
			avatar: item.author.avatar_url
		}))
		.filter((item, index, self) => self.findIndex((t) => t.id === item.id) === index);
```

You can learn more about array methods [here](https://www.tronic247.com/learn-all-the-array-methods-in-javascript/).

Finally, we will call the `format()` function with the `commitsData` and set the `contribs` store to the result.

```javascript
commitsData.then((data) => {
	Alpine.store('cStore').setContribs(format(data));
});
```

Our final script will look like this:

```javascript
const API_PATH = './test.json'; // https://api.github.com/repos/ant-design/ant-design/commits?path=components/button/index.en-US.md

const cStore = {
	contribs: [],

	setContribs(contribs) {
		this.contribs = contribs;
	}
};

document.addEventListener('alpine:init', () => {
	Alpine.store('cStore', cStore);
});

const commitsData = fetch(API_PATH).then((res) => res.json());

const format = (data) =>
	data
		.map((item) => ({
			name: item.commit.author.name || item.author.login,
			id: item.author.id,
			username: item.author.login,
			link: item.author.html_url,
			avatar: item.author.avatar_url
		}))
		.filter((item, index, self) => self.findIndex((t) => t.id === item.id) === index);

commitsData.then((data) => {
	Alpine.store('cStore').setContribs(format(data));
});
```

Now we will create a component to show the contributors. We will use the `x-for` directive to loop through the contributors and show them.

```html
<div x-show="!$store.cStore.contribs.length">
	<p>There are no contributors</p>
</div>

<div x-show="$store.cStore.contribs.length">
	<template x-for="contrib in $store.cStore.contribs" :key="contrib.id">
		<a :href="contrib.link" target="_blank" :title="contrib.name">
			<img :src="contrib.avatar" :alt="contrib.name" width="50" height="50" class="avatar" />
		</a>
	</template>
	<br /><br />
	<p x-text="$store.cStore.contribs.length+` Contributors`"></p>
</div>
```

And save the file. Now when we refresh the page,

and Voila! We have our contributors.

![](https://user-images.githubusercontent.com/76736580/215093403-74616c20-cee9-4349-af24-116a9069f970.png)

## Conclusion

In this tutorial, we learned how to get the contributors of a file in a GitHub repository using the GitHub API. We also learned how to use Alpine.js to show the contributors on a simple HTML page. I hope this tutorial was helpful to you and get a taste of Alpine.js' simplicity and power.
