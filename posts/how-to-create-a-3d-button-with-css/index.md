---
title: 'Create a 3d button with CSS'
date: '2021-03-30'
categories: ['css', 'html-tutorials']
img: /wp-content/uploads/2021/03/3d_btn.png
updated: '2024-06-13'
---

### Do you need a realistic 3d button for your website ?

Check The code I have posted below.

## The HTML

```html
<button>Click Me</button>
```

## The CSS

```css
button {
	background: #2f2f2f;
	border: none;
	padding: 10px 20px;
	font-size: 14px;
	border-radius: 4px;
	color: #c4c4c4;
	box-shadow:
		1px 1px 5px #000,
		-1px -1px 5px #6f6f6f,
		inset 1px 1px 5px #2b2b2b,
		inset -1px -1px 5px #424242;
	transition: all 0.1s;
}
body {
	background: #2f2f2f;
}
button:active {
	box-shadow:
		1px 1px 5px #5b5b5b,
		-1px -1px 5px #000,
		inset 1px 1px 5px #5b5b5b,
		inset -1px -1px 5px #000;
}
```

## How It Will Look Like

<iframe src="https://www.tronic247.com/trycode/?name=3d-button&amp;embed=true" height="400" title="3d button">Loading</iframe>
