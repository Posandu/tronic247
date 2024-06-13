---
title: 'Snowfall with Javascript'
date: '2021-12-13'
categories: ['css', 'html-tutorials', 'javascript', 'tricks-and-tips']
tags: ['animations', 'christmas', 'css', 'javascript']
img: /wp-content/uploads/2021/12/How-to-create-a-snowfall-with-Javascript.png
updated: '2024-06-13'
---

Hello people! It’s Christmas time! So let’s create a snowfall effect with JavaScript. It’s only pure JavaScript. No jQuery or other libraries. Just plain JavaScript. So let’s create snowfall with Javascript.

## Step 1

Open your favourite code editor.

And now create an HTML file with the following code:

```html
<!doctype html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>My Snowfall</title>
	</head>
	<body>
		<script>
			// our hero code
		</script>
	</body>
</html>
```

And we’ll make the background darker.

```html
<style>
	body {
		background: #1d1d1d;
	}
</style>
```

Now let’s start with JavaScript.

## Step 2

Let’s create a function named `addSnow`.

```js
let addSnow = () => {
	// code goes here
};
```

Then inside the function, we put these variables:

```js
const random = (min, max) => Math.random() * (max - min) + min;
let screenWidth = window.innerWidth;
let screenHeight = window.innerHeight;
```

Now we’ll create a `div`.

```js
let snow = document.createElement('div');
```

Then we’ll add some styles to the `div`.

```js
snow.style.position = 'fixed';
snow.style.top = '-2px';
snow.style.right = random(0, screenWidth) + 'px';
snow.style.width = '10px';
snow.style.height = '10px';
snow.style.backgroundColor = '#fff';
snow.style.borderRadius = '50%';
snow.style.zIndex = '999';
snow.style.pointerEvents = 'none';
```

These styles will create something like this (Smaller):

![](https://ak.picdn.net/shutterstock/videos/1060304588/thumb/3.jpg?ip=x480)

After that animate the `div`.

```js
const animateSnow = () => {
	snow.style.top = parseInt(snow.style.top) + 2 + 'px';
	snow.style.right = parseInt(snow.style.right) + random(0, 2) + 'px';
	/**
	 * If it's out of the screen, move it to the top
	 * and randomize it's position
	 * */
	if (parseInt(snow.style.top) > screenHeight) {
		snow.style.right = random(0, screenWidth) + 'px';
		snow.style.top = parseInt('-' + random(0, 20) + 'px');
	}
	window.requestAnimationFrame(animateSnow);
};
window.requestAnimationFrame(animateSnow);
```

And finally, we’ll add the `div` to the body.

```js
document.body.appendChild(snow);
```

Ah, don’t forget to close the function.

```js
};
```

And to add the snow we’ll just call the function 60 times.

```js
for (let i = 0; i < 60; i++) {
	setTimeout(addSnow, i * 100);
}
```

And that’s it! Here’s the result:

![](https://s10.gifyu.com/images/ezgif-2-409e59e71a11.gif)

## Conclusion

Here's a minified version of the code:

```js
let t = () => {
	const t = (t, e) => Math.random() * (e - t) + t;
	let e = window.innerWidth,
		n = window.innerHeight,
		s = document.createElement('div');
	(s.style.position = 'fixed'),
		(s.style.top = '-2px'),
		(s.style.right = t(0, e) + 'px'),
		(s.style.width = '10px'),
		(s.style.height = '10px'),
		(s.style.backgroundColor = '#fff'),
		(s.style.borderRadius = '50%'),
		(s.style.zIndex = '999'),
		(s.style.style.pointerEvents = 'none');
	const i = () => {
		(s.style.top = parseInt(s.style.top) + 2 + 'px'),
			(s.style.right = parseInt(s.style.right) + t(0, 2) + 'px'),
			parseInt(s.style.top) > n &&
				((s.style.right = t(0, e) + 'px'), (s.style.top = parseInt('-' + t(0, 20) + 'px'))),
			window.requestAnimationFrame(i);
	};
	window.requestAnimationFrame(i), document.body.appendChild(s);
};
for (let e = 0; e < 60; e++) setTimeout(t, 100 * e);
```

And that’s it! You can now create a snowfall effect with JavaScript. Enjoy your Christmas! 🎄
