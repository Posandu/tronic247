---
title: 'Creating a card with HTML and CSS'
date: '2021-02-19'
categories: ['css', 'html-tutorials']
updated: '2024-06-13'
---

Here's a simple way to create a card using HTML and CSS.

HTML

```html
<div class="card">
	<h1>Card title</h1>
	<img
		src="https://images.unsplash.com/photo-1612903351512-96acf84e5306?crop=entropy&cs=srgb&fm=jpg&ixid=MXwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHw&ixlib=rb-1.2.1&q=85"
	/>
	<p>This is the text</p>
	<div class="action-buttons">
		<button>Buttons</button>
		<button>Links</button>
	</div>
</div>
```

CSS

```css
.card {
	width: 30%;
	max-width: 30%;
	padding: 10px;
	border-radius: 4px;
	box-shadow: 0px 5px 50px #0040ff2b;
	background: #0040ff00;
	font-family: product sans;
}
.card img {
	max-width: 105%;
	width: 105%;
	margin-left: -11px;
}
.card h1 {
	text-align: center;
	font-size: 36px;
	text-indent: 0px;
	height: 100%;
}
.card p {
	text-align: center;
}
.action-buttons {
	text-align: right;
	padding: 9px;
	width: 100%;
	background: #f0f0f0;
	margin-left: -9px;
	margin-top: 20px;
}
button {
	padding: 10px 20px;
	background: #007cff;
	border: none;
	color: white;
	border-radius: 4px;
	box-shadow: 0px 4px 10px #0040ff4d;
	font-size: 14px;
	transition: all 0.2s;
	outline: none;
}
button:hover {
	background: #0058ff;
}
```
