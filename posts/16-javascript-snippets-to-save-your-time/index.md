---
title: 16+ JavaScript snippets to save your time
date: '2022-08-30'
categories: ['javascript', 'tricks-and-tips', 'html-tutorials']
tags: ['javascript', 'snippets']
img: /wp-content/uploads/2022/08/16-JavaScript-snippets-to-save-your-time.png
updated: '2024-06-13'
excerpt: A collection of JavaScript snippets to save you some time.
---

I made some [JavaScript](/tag/javascript/) snippets to save you some time. See them below and let me know your thoughts!



## Detect if dark mode

This snippet detects if the user is in dark mode. And if so, it returns true.

```js
const isDarkMode = () => globalThis.matchMedia?.('(prefers-color-scheme:dark)').matches ?? false;

// Usage
isDarkMode();
```

## Copy to clipboard

This snippet copies the given text to the clipboard.

```js
const copyToClipboard = (text) => navigator?.clipboard?.writeText(text) ?? false;

// Usage
copyToClipboard('Hello World!');
```

## Make items in an array unique

This snippet makes items in an array unique.

```js
const uniqueArray = (array) => [...new Set(array)];

// Usage
uniqueArray([1, 2, 3, 4, 5, 1, 2, 3, 4, 5]); // [1, 2, 3, 4, 5]
```

## Get random number

```js
const getRandomNumber = (min, max) => ~~(Math.random() * (max - min + 1)) + min;

// Usage
getRandomNumber(1, 10); // Random number between 1 and 10
```

## Get random hex color

This snippet returns a random hex color. It first generates a random number between 0 and 255, then converts it to hex.

```js
const getRandomHexColor = () => '#' + ((Math.random() * 0xffffff) << 0).toString(16);

// Usage
getRandomHexColor(); // Random hex color
```

## Shuffle array

This snippet shuffles an array.

```js
const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

// Usage
shuffleArray([1, 2, 3, 4, 5]); // Randomly shuffled array
```

## Loop a function x times

This snippet loops a function x times. Useful if you have many loops.

```js
const loop = (x, fn) => [...Array(x)].forEach(fn);

// Usage
loop(10, () => console.log('Hello World!'));
```

## Get random element from array

This snippet returns a random element from an array.

```js
const getRandomElement = (array) => array[~~(Math.random() * array.length)];

// Usage
getRandomElement([1, 2, 3, 4, 5]); // Random element from array
```

## Get random string

This snippet returns a random string.

```js
const getRandomString = (length) =>
	[...Array(length)].map(() => String.fromCharCode(~~(Math.random() * 26) + 97)).join('');

// Usage
getRandomString(10); // Random string with 10 characters
```

## Get random boolean

This snippet returns a random boolean.

```js
const getRandomBoolean = () => Math.random() >= 0.5;

// Usage
getRandomBoolean(); // Random boolean
```

## Get random number between two numbers

This snippet returns a random number between two numbers.

```js
const getRandomNumberBetween = (min, max) => ~~(Math.random() * (max - min + 1)) + min;

// Usage
getRandomNumberBetween(1, 10); // Random number between 1 and 10
```

## Get cookie

This snippet returns the value of a cookie.

```js
const getCookie = (name) => ('; ' + document.cookie).split(`; ${name}=`).pop().split(';')[0];

// Usage
getCookie('name'); // Value of cookie "name"
```

## Clear all cookies

```js
const clearCookies = () =>
	document.cookie
		.split(';')
		.forEach(
			(c) =>
				(document.cookie = c
					.replace(/^ +/, '')
					.replace(/=.*/, '=;expires=Thu, 01 Jan 1970 00:00:00 UTC'))
		);

// Usage
clearCookies(); // Clear all cookies
```

## Scroll to top of element

```js
const scrollToTop = (element) => element.scrollIntoView({ behavior: 'smooth' });

// Usage
scrollToTop(document.querySelector('#element'));
```

## Get average of numbers

```js
const avg = (...numbers) => numbers.reduce((a, b) => a + b, 0) / numbers.length;

// Usage
avg(1, 2, 3, 4, 5); // 3
```

## Validate email

This snippet validates an email using a regex.

```js
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// Usage
validateEmail('obama@gmail.com'); // true
```

## Validate object

This snippet validates an object using a rules object.

```js
const validateObject = (object, rules) =>
	Object.keys(rules).every((key) => rules[key](object[key]));

// Usage
const rules = {
	name: (name) => name.length > 0,
	email: (email) => validateEmail(email),
	password: (password) => password.length > 0
};

validateObject({ name: '', email: '', password: '' }, rules); // false
```

## Chunk array

Chunks the array into x length chunks.

```js
const chunkArray = (array, chunkSize) =>
	[...Array(Math.ceil(array.length / chunkSize))].map((_, index) =>
		array.slice(index * chunkSize, (index + 1) * chunkSize)
	);

// Usage
chunkArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3); // [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]]
```

## RGB to HEX

```js
const rgbToHex = (r, g, b) => '#' + ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0');

// Usage
rgbToHex(255, 0, 0); // #ff0000
```

## Raw String to normal string

This is useful if you're having a situation like this:

```js
formatFn('string') + formatFn('string');
```

Instead of doing that, you can use the power of ES6's raw string syntax:

```js
const f = (...args) => String.raw(...args); // This returns a normal string

formatFn(f`string` + f`string`);
```

## Compare two objects

```js
const compareObjects = (obj1, obj2) => {
	const c = Object.keys(obj1),
		n = Object.keys(obj2);
	return c.length === n.length && c.every((c) => obj1[c] === obj2[c]);
};

// Usage
compareObjects({ a: 1, b: 2 }, { a: 1, b: 2 }); // true
```

## Get selected text

```js
const getSelectedText = () => window.getSelection().toString();

// Usage
getSelectedText(); // Selected text
```

## Get object of query params in the url

```js
const getQueryParams = (url) => new URLSearchParams(url.split('?')[1]);

// Usage
getQueryParams('https://example.com?a=1&b=2'); // { a: "1", b: "2" }
```

## Convert number to word

Converts large numbers like `1000000` to `"1M"`.

```js
const numToWord = (number) => number.toLocaleString('en-US', { notation: 'compact' });

// Usage
numToWord(1000000); // "1M"
```

## Count number of duplicates in array

Returns an object with the number of duplicates in the array.

```js
const countDuplicates = (c) => {
	const t = {};
	return c.forEach((c) => (t[c] = (t[c] || 0) + 1)), t;
};

// Usage
countDuplicates([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]); // { 1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1, 7: 1, 8: 1, 9: 1, 10: 1 }
```

## Generate tree from depth

If you need some testing JSON, you can use this snippet to generate a tree of depth `depth`.

```js
const generateTree = (depth) => [...Array(depth)].map(() => ({ tree: generateTree(depth - 1) }));

// Usage
generateTree(3); // [{ tree: [{ tree: [{ tree: [] }, { tree: [] }] }, { tree: [{ tree: [] }, { tree: [] }] }] }, { tree: [{ tree: [] }, { tree: [] }] }]
```
