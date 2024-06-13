---
title: 'Simple material design CSS animation'
date: '2021-09-01'
categories: ['css', 'html-tutorials', 'tricks-and-tips']
tags: ['animations', 'css']
img: /wp-content/uploads/2021/09/animating.png
updated: '2024-06-13'
---

Do you have heard of material design? It's the most popular design language in the world. In this tutorial, we will learn how to make a simple CSS animation following material design animation guidelines. So, let's get started!

## Contents

## Preparing the HTML

First, we have to prepare the HTML. Create an HTML file and put/or type the code below in that file.

```html
<div id="main">
	<div id="element">+</div>
</div>
```

Ok, now that we prepared our HTML we'll style the components.

## Styling the HTML components

Here, we will style the components that we made.

### Adding some padding and a background to the body

```css
body {
	background: #eceff1;
	padding: 20px;
}
```

### Styling the container

We'll style the resizing container.

```css
#main {
	position: relative;
	overflow: hidden;
	border-radius: 4px;
	height: 200px;
	width: 600px;
	background: rgba(255, 255, 255, 1);
	box-shadow:
		0 3px 1px -2px rgba(0, 0, 0, 0.2),
		0 2px 2px 0 rgba(0, 0, 0, 0.14),
		0 1px 5px 0 rgba(0, 0, 0, 0.12);
}
```

### Styling the button

Now that we have a container, we'll style the button (FAB).

```css
#element {
	position: absolute;
	bottom: 40px;
	right: 40px;
	display: flex;
	width: 50px;
	height: 50px;
	align-items: center;
	justify-content: center;
	font-size: 2rem;
	font-family: sans-serif;
	color: #fff;
	background: #c51162;
	border-radius: 50px;
	box-shadow:
		0 7px 8px -4px rgba(0, 0, 0, 0.2),
		0 12px 17px 2px rgba(0, 0, 0, 0.14),
		0 5px 22px 4px rgba(0, 0, 0, 0.12);
}

#element:after {
	content: '';
	border-radius: 50px;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%) scale(0);
	height: 100%;
	width: 100%;
	background: rgba(255, 255, 255, 1);
	z-index: 9;
}
```

This is what we get.

![](https://www.tronic247.com/wp-content/uploads/2021/09/6.png)

## Animating !

Here's the last step we'll start animating!

### Animating the container

We'll add the resizing animation to the container.

```css
#main {
	animation: mainanimation 4s ease infinite;
}

@keyframes mainanimation {
	0% {
		width: 300px;
		height: 400px;
	}
	25% {
		width: 400px;
		height: 200px;
	}
	50% {
		width: 700px;
		height: 600px;
	}
	75% {
		width: 400px;
		height: 600px;
		box-shadow:
			0 11px 15px -7px rgba(0, 0, 0, 0.2),
			0 24px 38px 3px rgba(0, 0, 0, 0.14),
			0 9px 46px 8px rgba(0, 0, 0, 0.12);
	}
	100% {
		width: 300px;
		height: 400px;
	}
}
```

### Animating the button

We'll add the ripple effect and clicking animation to the button.

```css
#element {
	animation: fabanimation 1s ease infinite;
}

#element:after {
	animation: fabripple 1s infinite ease;
}
@keyframes fabripple {
	0% {
		transform: translate(-50%, -50%) scale(0);
	}
	20% {
		transform: translate(-50%, -50%) scale(0.7);
		opacity: 0.8;
	}
	100% {
		transform: translate(-50%, -50%) scale(1);
		background: rgba(255, 255, 255, 0);
	}
}

@keyframes fabanimation {
	0%,
	100% {
		box-shadow:
			0 0px 0px -4px rgba(0, 0, 0, 0.2),
			0 12px 17px 2px rgba(0, 0, 0, 0.14),
			0 5px 22px 4px rgba(0, 0, 0, 0.12);
	}
	50% {
		box-shadow:
			0 11px 15px -7px rgba(0, 0, 0, 0.2),
			0 24px 38px 3px rgba(0, 0, 0, 0.14),
			0 9px 46px 8px rgba(0, 0, 0, 0.12);
		transform: scale(0.9);
	}
}
```

And that's it! We have successfully created a simple material design CSS animation.
