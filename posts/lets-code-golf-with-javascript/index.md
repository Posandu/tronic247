---
title: Code golfing with JavaScript
date: '2022-06-17'
categories: ['javascript', 'tricks-and-tips']
tags: ['tips', 'javascript', 'games']
img: /wp-content/uploads/2022/06/code-golf-in-js.png
updated: '2024-06-13'
excerpt: Making the shortest possible code using JavaScript.
---

In this article, we'll golf some JavaScript code. But first, we'll need to know what the heck is code-golf?



## What is code-golf?

Code golfing is trying to make the shortest possible code for a given task. It's mainly a game and very useful for improving your programming skills. There are many sites where you can code golf. Here's a list of some of the most popular sites:

- [https://code.golf](https://code.golf)
- [https://codingame.com](https://codingame.com)

## Get started!

We'll code-golf the easiest challenge that is Fizz-Buzz (https://code.golf/fizz-buzz). Our task is to print all the numbers from 1 to 100. But instead of printing the numbers, we'll print the word "Fizz" if the number is divisible by 3, "Buzz" if the number is divisible by 5, and "FizzBuzz" if the number is divisible by both 3 and 5.

So first we'll make a basic program that prints all the numbers from 1 to 100.

```js
for (let i = 1; i <= 100; i++) {
	console.log(i);
}
```

Now we can see all the numbers from 1 to 100. But we need to add the logic to print Fizz, Buzz, or FizzBuzz.

```js
for (let i = 1; i <= 100; i++) {
	if (i % 3 === 0 && i % 5 === 0) {
		console.log('FizzBuzz');
	} else if (i % 3 === 0) {
		console.log('Fizz');
	} else if (i % 5 === 0) {
		console.log('Buzz');
	} else {
		console.log(i);
	}
}
```

But that's 240 bytes! Now we code-golf it!

### Reduce the length of the for loop condition

The current for loop statement is:

```js
let i = 1;
i <= 100;
i++;
```

We can remove the `i++` part and replace `i<=100` with `i++<100`. So our for loop will look like this:

```js
let i = 0;
i++ < 100;
```

Now we reduced the code to 225 bytes.

### Convert if-else to a single line

We can make the if-else statement into a single line using the `?` operator.

```js
for (let i = 0; i++ < 100; ) {
	console.log(i % 3 === 0 ? (i % 5 === 0 ? 'FizzBuzz' : 'Fizz') : i % 5 === 0 ? 'Buzz' : i);
}
```

We removed 103 bytes.

### Remove the `let` keyword

Because we don't use any scope, we can remove the `let` keyword.

### Replace `console.log` with `print`

We can replace `console.log` with `print` and reduce the code to 112 bytes.

### Create a variable for saving `Fizz`

We'll create a variable like this.

```js
f = i % 3 ? '' : 'Fizz';
```

Look at the below diagram.

![Diagram](https://user-images.githubusercontent.com/76736580/174227472-7ad3f884-9f1a-4f2d-a32e-0295c292d863.png)

Now we use this logic in the `print` function.

```js
print(i % 5 ? f || i : f + 'Buzz');
```

Don't get confused ?. Here's how it works:

First, we check if `i % 5` is not zero. That means `i % 5` is not divisible by 5. So we again check if `f` is empty. If `f` is empty, we print `i` else we print `f`.

If `i % 5` returns zero, that means `i % 5` is divisible by 5. So we just print `f + "Buzz"`.

And that will make our code look like this:

```js
for (i = 0; i++ < 100; ) {
	f = i % 3 ? '' : 'Fizz';
	print(i % 5 ? f || i : f + 'Buzz');
}
```

That's 92 bytes.

### Move the `print` function to the loop header

We can move the `print` function to the loop header.

```js
for (i = 0; i++<100;print(i % 5 ? f || i : f + "Buzz"))
//..
```

And we can remove the `{}` braces because there's only one statement.

```js
for (i = 0; i++ < 100; print(i % 5 ? f || i : f + 'Buzz')) f = i % 3 ? '' : 'Fizz';
```

Our code is getting shorter and shorter. Now it's 79 bytes.

### Remove all spaces

This is the most basic thing, but I do it last.

<!-- prettier-ignore-start -->
```js
for(i=0;i++<100;print(i%5?f||i:f+"Buzz"))f=i%3?"":"Fizz";
```
<!-- prettier-ignore-end -->

Now we've made the shortest possible Fizz Buzz in JavaScript. Which is 56 bytes. You can try to make it shorter.
