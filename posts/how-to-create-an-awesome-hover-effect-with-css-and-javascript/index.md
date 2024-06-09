---
title: 'How to Create an awesome hover effect with CSS and JavaScript'
date: '2021-12-05'
categories: ['css', 'html-tutorials', 'javascript', 'tricks-and-tips']
tags: ['css', 'hover-effects', 'javascript', 'ui']
---

In this tutorial, we'll make this awesome hover effect using CSS and JavaScript. You can see this effect in MacOs big Sur taskbar/bottom dock.

Here's what we'll do:

<figure>

![](https://www.tronic247.com/wp-content/uploads/2021/12/ezgif-2-5a4aedd131e0.gif)

<figcaption>

Our result

</figcaption>

</figure>

Nice isn't it? So let's get started!

## Getting Started

First, we'll prepare our HTML. Here's the HTML we'll use:

```html
<!doctype html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Document</title>
	</head>
	<style>
		/**
    CSS code goes here
    */
	</style>

	<body>
		<div id="middle">
			<div id="dock">
				<div class="item" data-name="Item-1"></div>
				<div class="item" data-name="Item-2"></div>
				<div class="item" data-name="Item-3"></div>
				<div class="item" data-name="Item-4"></div>
				<div class="item" data-name="Item-5"></div>
				<div class="item" data-name="Item-6"></div>
			</div>
		</div>

		<script>
			//JavaScript code goes here
		</script>
	</body>
</html>
```

Okay, now we can start coding. First, we'll style the 6 items in the dock.

```css
#middle {
	top: 200px;
	margin: 100px auto;
	width: max-content;
}

.item {
	height: 50px;
	width: 50px;
	margin: 5px;
	background: hsla(221, 100%, 50%, 1);
	display: inline-block;
	border-radius: 50%;
	cursor: pointer;
	position: relative;
	transition: all 0.4s ease;
}

.item:hover {
	transition: all 0.2s ease;
	box-shadow:
		0px 2.8px 2.2px rgba(0, 0, 0, 0.048),
		0px 6.7px 5.3px rgba(0, 0, 0, 0.069),
		0px 12.5px 10px rgba(0, 0, 0, 0.085),
		0px 22.3px 17.9px rgba(0, 0, 0, 0.101),
		0px 41.8px 33.4px rgba(0, 0, 0, 0.122),
		0px 100px 80px rgba(0, 0, 0, 0.17);
}

/**
* Tooltip
*/
.item::before {
	content: attr(data-name);
	background: #2f3136;
	color: #fff;
	position: absolute;
	top: 0;
	width: max-content;
	font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	font-size: 12px;
	padding: 4px;
	border-radius: 4px;
	left: 50%;
	opacity: 0;
	pointer-events: none;
	transform: translateX(-50%) translateY(200%) scale(0.8);
	transition: all 0.4s ease;
}

.item:hover::before {
	opacity: 1;
	transform: translateX(-50%) translateY(220%);
}
```

We can get this result:

<figure>

![](https://www.tronic247.com/wp-content/uploads/2021/12/image.png)

<figcaption>

The result

</figcaption>

</figure>

Now for the Javascript, let's first define our variables.

```js
let dock = document.querySelector('#dock');
let items = dock.querySelectorAll('.item');
let scale = (s) => {
	return `scale(${s})`;
};
```

And then this is the most important part. We'll use the `onmouseover` event to scale the items.

```js
items.forEach((item) => {
	item.addEventListener('mouseover', function () {
		let t = this;
		let next = t.nextElementSibling;
		let before = t.previousElementSibling;
		let active_scale = scale(1.4);
		let second_scale = scale(1.2);
		let third_scale = scale(1.1);

		if (next) {
			next.style.transform = second_scale;
			let next_next = next.nextElementSibling;
			if (next_next) {
				next_next.style.transform = third_scale;
			}
		}

		if (before) {
			before.style.transform = second_scale;
			let before_before = before.previousElementSibling;
			if (before_before) {
				before_before.style.transform = third_scale;
			}
		}
		t.style.transform = active_scale;
	});
});
```

Ah now, don't get confused. I'll explain the code.

The first line is `items.forEach(item => {`. This is a forEach loop. It's a loop that runs for each div with the class `item`.

Then for each item, we add an event listener to the `mouseover` event. Then the hovered item will scale up. And it checks if there is a before or after item. If there is, it will scale up the next or previous item. And again, it checks if there is a next or previous item. If there is, it will scale up the next or previous item.

Okay, now we can see the items scale up when hovered but, it doesn't scale down when the mouse leaves the item. Let's fix that.

```
dock.adjsdEventListener("mouseout", function(e) {
    items.forEach(item => {
       item.style.transform = scale(1);
    });
});
```

Okay, now we can see the items scale up when hovered and scale down when the mouse leaves the item.

## The End

And that's it! We've created an awesome hover effect using CSS and JavaScript. You can see the final result in the gif above. If you have any questions, feel free to ask in the comments below. Thanks for reading!
