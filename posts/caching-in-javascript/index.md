---
title: 'Caching in JavaScript'
excerpt: 'There are many ways to cache data in JavaScript to improve performance and reduce server load. Learn about common caching strategies and how to implement them in your applications.'
date: 2024-06-26
categories: ['JavaScript']
tags: ['caching', 'performance', 'javascript']
img: /thumbnails/caching-in-javascript.png
---

## What is caching?

Caching is a temporary storage mechanism that stores data so that future requests for that data can be served faster. In JavaScript, caching can be used to store the results of expensive operations, such as network requests or complex calculations, so that they can be retrieved quickly when needed again.

## Why caching is crucial

1. **Speed**: Your app will run faster because it won't have to recalculate or refetch data every time.
2. **Less server load**: Caching can reduce the load on your server by serving cached data instead of making repeated requests.
3. **Better user experience**: Faster load times mean happier users.

## Common caching strategies

### 1. The Simple Object Cache

This is the most straightforward way to cache stuff.

```javascript
const cache = {};

function expensiveOperation(input) {
  if (cache[input]) {
    console.log("Cached result!");
    return cache[input];
  }

  console.log("Calculating...");
  const result = /* Some time-consuming calculation */;
  cache[input] = result;
  return result;
}

// First time: slow
console.log(expensiveOperation("foo"));

// Second time: lightning fast!
console.log(expensiveOperation("foo"));
```

This method is recommended for small-scale caching needs. If you need something more robust, consider using a library like [lru-cache](https://www.npmjs.com/package/lru-cache) or [node-cache](https://www.npmjs.com/package/node-cache).

### 2. Memoization

This is used to cache the results of function calls based on their input parameters. This is also based on the simple object cache, but it's more focused on functions.

```javascript
function memoize(fn) {
	const cache = {};
	return function (...args) {
		const key = JSON.stringify(args);
		if (key in cache) {
			console.log('Memoized result!');
			return cache[key];
		}
		const result = fn.apply(this, args);
		cache[key] = result;
		return result;
	};
}

// Let's use our fancy memoize function
const slowAdd = (a, b) => {
	console.log('Calculating...');
	return a + b;
};

const fastAdd = memoize(slowAdd);

console.log(fastAdd(5, 3)); // Slow the first time
console.log(fastAdd(5, 3)); // Super fast the second time!
```

### 3. Using the Cache API (for browser-side caching)

:::assert
This is only available in **secure contexts** (i.e., HTTPS), and in **service workers**.
:::

Another underutilized caching mechanism is the Cache API - this is provided by the browser itself. It allows you to cache network requests and other resources in the browser, you can use this instead of using local storage or session storage.

```javascript
// Check if the browser supports the Cache API
if ('caches' in window) {
	// Open or create a cache named 'my-cache'
	caches.open('my-cache').then((cache) => {
		// Cache a response to '/api/data'
		cache.add('/api/data');

		// Or add multiple items at once
		cache.addAll(['/api/data', '/api/more-data']);
	});

	// Later, when you need the data:
	caches.match('/api/data').then((response) => {
		if (response) {
			console.log('Cached data found!');
			return response.json();
		} else {
			console.log('No cached data.');
			// Fetch from network
		}
	});
}
```

## Wrapping up

Caching is a powerful tool that can help speed up your JavaScript applications and improve the user experience. By using caching strategies like the ones outlined above, you can reduce the load on your server, improve performance, and create a more responsive application. So next time you find yourself writing code that performs expensive operations, consider implementing a caching mechanism to store the results and serve them up quickly when needed.
