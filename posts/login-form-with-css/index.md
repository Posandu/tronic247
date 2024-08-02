---
title: 'Login form with CSS'
date: '2021-08-27'
categories: ['css', 'html-tutorials']
tags: ['css', 'login-forms']
img: /wp-content/uploads/2021/08/loginfrm.png
updated: '2024-06-13'
excerpt: Creating a simple login form using CSS.
---

In this tutorial, I'll show you how to create a login form with pure CSS. First, look the video above to see how I make the login form. Then after the video, there's a preview and the code of the result.

## Video

{% youtube id="9X6kUu20OjE" title="Login form with CSS" %}

## The HTML

```html
<form action="#!" id="main">
	<h2>Login to your account</h2>

	<div class="input-parent">
		<label for="username">Username or Email</label>
		<input type="text" id="username" />
	</div>

	<div class="input-parent">
		<label for="password">Password</label>
		<input type="password" id="password" />
	</div>

	<button type="submit">Login</button>
</form>
```

## The CSS

```css
*,
*:before,
*:after {
	margin: 0;
	padding: 0;
	font-family: inherit;
	box-sizing: border-box;
}
#main {
	width: max-content;
	margin: 40px auto;
	font-family: 'Segoe UI', sans-serif;
	padding: 25px 28px;
	background: #151414;
	border-radius: 4px;
	border: 1px solid #302d2d;
	animation: popup 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}
@keyframes popup {
	0% {
		transform: scale(0.2);
		opacity: 0;
	}
	100% {
		transform: scale(1);
		opacity: 1;
	}
}
h2 {
	text-align: center;
	font-size: 28px;
	margin-bottom: 20px;
	font-weight: 400;
	color: #e7e7e7;
}
.input-parent {
	display: block;
	margin-bottom: 20px;
}
label {
	display: block;
	font-size: 16px;
	margin-bottom: 8px;
	color: #a4a4a4;
}
.input-parent input {
	padding: 10px 8px;
	width: 100%;
	font-size: 16px;
	background: #323131;
	border: none;
	color: #c7c7c7;
	border-radius: 4px;
	outline: none;
	transition: all 0.2s ease;
}
.input-parent input:hover {
	background: #404040;
}
.input-parent input:focus {
	box-shadow: 0px 0px 0px 1px #0087ff;
}
button {
	padding: 10px 18px;
	font-size: 15px;
	background: #1a3969;
	width: 100%;
	border: none;
	border-radius: 4px;
	color: #f4f4f4;
	transition: all 0.2s ease;
}
button:hover {
	opacity: 0.9;
}
button:focus {
	box-shadow: 0px 0px 0px 3px black;
}
body {
	background: #1c1b1b;
}
```

{% embed src="https://codepen.io/posandu/embed/preview/vYwemeX?default-tab=result&editable=true" title="Codepen" %}
