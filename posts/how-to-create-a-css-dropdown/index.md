---
title: 'Create a CSS dropdown'
date: '2021-02-16'
categories: ['css']
---

Dropdowns are elements that we use to describe a primary action. Here's how to create a simple CSS one.

## HTML

```html
<div class="dropdown">
	<span>Hover Me</span>
	<div class="content">
		<h1>Content</h1>
	</div>
</div>

<div class="dropdown">
	<span>Hover Me Again</span>
	<div class="content">
		<h1>Content 2</h1>
	</div>
</div>
```

## CSS

```css
.dropdown {
	font-family: product sans;
	background: #0058ff;
	width: max-content;
	padding: 11px 21px;
	border-radius: 100px;
	color: white;
}
.dropdown .content {
	pointer-events: none;
	position: absolute;
	width: max-content;
	height: max-content;
	background: #0070ff;
	margin-top: 14px;
	margin-left: -14px;
	opacity: 0;
	transition: all 0.3s;
	padding: 6px;
	font-size: 12px;
	border-radius: 2px;
	box-shadow: 0px 7px 10px #777;
}
.dropdown:hover .content {
	display: block;
	opacity: 1;
	pointer-events: all;
}
```
