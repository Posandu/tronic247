---
title: 'Pure CSS checkboxes with one element'
date: '2021-07-27'
categories: ['css', 'html-tutorials', 'tricks-and-tips']
tags: ['css', 'checkboxes']
img: /wp-content/uploads/2021/07/pure_css_checkbox.png
updated: '2024-06-13'
---

Here is a Pure CSS checkbox with only one element. It's also accessibility friendly.

## HTML

```html
<input type="checkbox" data-name="Item 3" class="checkbox" />
```

## The CSS

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');

.checkbox {
	appearance: none;
	height: 100px;
	width: 100px;
	background-image: radial-gradient(
		circle farthest-corner at 10% 20%,
		rgba(37, 145, 251, 0.98) 0.1%,
		rgba(0, 7, 128, 1) 99.8%
	);
	background-size: 360% 100%;
	border-radius: 4px;
	position: relative;
	overflow: hidden;
	cursor: pointer;
}

.checkbox:after {
	content: attr(data-name);
	top: 50%;
	position: absolute;
	left: 50%;
	transform: translate(-50%, -50%);
	font-size: 16px;
	font-family: 'Inter', sans-serif;
	color: #3f3f3f;
	z-index: 99;
	transition: all 0.2s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}

.checkbox:before {
	content: '';
	position: absolute;
	top: 0%;
	left: 0px;
	height: 200%;
	width: 200%;
	background: #e9e9e9;
	z-index: 0;
	transition: all 0.2s linear;
	transform: scale(0.6) translate(-50%, -50%);
}
.checkbox:hover:before,
.checkbox:focus-visible:before {
	background: #cacaca;
	top: -4%;
	left: 20%;
}
.checkbox:checked:before {
	opacity: 0;
	transform: scale(0.9);
}
.checkbox:checked:after {
	color: white;
}
.checkbox:checked {
	box-shadow: 0px 4px 10px -6px black;
}

.checkbox:focus-visible {
	outline: none;
	box-shadow: 0px 0px 0px 5px #480f5d;
}
```

## The result

<iframe src="https://codesandbox.io/embed/pure-css-accesi-check-lp5hs?fontsize=14&amp;hidenavigation=1&amp;theme=dark" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" title="pure-css-accesi-check" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>
