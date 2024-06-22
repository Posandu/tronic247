---
title: 'Return type of setTimeout and setInterval in JavaScript'
date: '2024-06-22'
categories: ['javascript']
tags: ['javascript', 'typescript']
img: /thumbnails/return-type-of-timeout-fns.png
excerpt: The `setTimeout` and `setInterval` functions in JavaScript return values that can be used to clear the timers. Here's how you can get the return type of these functions in TypeScript.
---

While working on a TypeScript project, I had to save a reference to the `setTimeout` function. That's when I needed to know the return type of the `setTimeout` function in JavaScript. There are three different ways to get the return type of the `setTimeout` and `setInterval` functions in JavaScript.

## Using `:number`

Normally, the return type of the above functions is just a number. This number is the ID of the timer that can be used to clear the timer using the `clearTimeout` or `clearInterval` functions.

```typescript twoslash
let timer: number;

//....

timer = setTimeout(() => {
	console.log('Hello, World!');
}, 1000);
```

## Using `NodeJS.Timeout`

The first thing GitHub Copilot suggested to me was to use the `NodeJS.Timeout` type. This type is provided by the `@types/node` package and is a more specific type for the return value of the `setTimeout` function.

```typescript
let timer: NodeJS.Timeout;

//....

timer = setTimeout(() => {
	console.log('Hello, World!');
}, 1000);
```

However, I'm not sure if this type is available in the browser environment and whether it is a number or a node-specific type.

So, here's the most generic way to get the return type of the `setTimeout` function.

## Using `ReturnType<typeof setTimeout>`

The `ReturnType` utility type, provided by TypeScript, extracts the return type of a function. We can use this utility type to get the return type of the `setTimeout` function.

```typescript twoslash
let timer: ReturnType<typeof setTimeout>;

//....

timer = setTimeout(() => {
	console.log('Hello, World!');
}, 1000);
```

This way, we can get the return type of the `setTimeout` function in JavaScript, no matter if we are working in a Node.js environment or a browser environment.

## Conclusion

Even though there are multiple ways to get the return type of the above functions, I recommend using the `ReturnType<typeof setTimeout>` method as it is the most generic way.
