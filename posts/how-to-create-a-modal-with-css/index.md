---
title: 'How to create a modal with CSS'
date: '2021-07-25'
categories: ['css', 'html-tutorials', 'posts', 'tricks-and-tips']
tags: ['css', 'modals']
---

Today, In this tutorial I will tell you how to create a modal with pure CSS!

## Markup

Here's the HTML markup for the code.

```html
<a href="#modal" class="modal-btn">Open modal</a>
<div class="modal-overlay" id="modal">
	<div class="modal">
		<h3 class="modal-title">Modal title</h3>
		<p>
			Lorem ipsum dolor sit amet, consectetur adipisicing, elit. Temporibus tempore aperiam deleniti
			consequatur, earum, consectetur et, possimus dolor laborum quia sint facere asperiores quidem
			repellat illum obcaecati, saepe a beatae?
		</p>
		<a href="#" class="modal-btn">Got It</a>
	</div>
</div>
```

## The CSS

```css
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

body {
	padding: 20px;
	font-family: 'Segoe ui', sans-serif;
}

.modal-overlay {
	position: fixed;
	top: 0;
	left: 0;
	opacity: 0;
	pointer-events: none;
	transition: all 0.2s ease;
	height: 100%;
	width: 100%;
	background: #0000004a;
}

.modal-overlay:target {
	opacity: 1;
	pointer-events: all;
}

.modal {
	position: fixed;
	top: 50%;
	left: 50%;
	max-width: 600px;
	width: 80%;
	transform: translate(-50%, -50%) scale(0.8);
	background: white;
	padding: 20px 30px;
	font-family: 'segoe ui', sans-serif;
	border-radius: 4px;
	transition: all 2s ease;
	box-shadow: 0px 8px 40px -20px black;
}

.modal-overlay:target .modal {
	transform: translate(-50%, -50%) scale(1);
	transition: all 0.2s ease;
}

.modal-title {
	font-size: 22px;
	color: #4b4b4b;
	font-weight: 600;
	margin-bottom: 10px;
}

p {
	font-size: 16px;
	line-height: 23px;
	color: #2a2a2a;
	margin-bottom: 10px;
}

.modal-btn {
	margin-top: 10px;
	background: #2962ff00;
	padding: 8px 14px;
	display: inline-block;
	color: #2962ff;
	text-decoration: none;
	transition: all 0.2s ease;
	border-radius: 3px;
	font-weight: 600;
	font-size: 14px;
	border: 1px solid #2962ff;
	user-select: none;
}

.modal-btn:hover {
	background: #2962ff4d;
}

.modal-btn:focus {
	background: #2962ff;
	color: white;
}
```

## Preview

<iframe src="https://codesandbox.io/embed/how-to-create-a-modal-with-css-ob6ok?autoresize=1&amp;fontsize=14&amp;hidenavigation=1&amp;theme=dark" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" title="how-to-create-a-modal-with-css" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>
