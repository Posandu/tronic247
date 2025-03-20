---
title: 'Learn all the Array methods in JavaScript'
date: '2022-05-26'
categories: ['javascript', 'tricks-and-tips']
tags: ['tips', 'javascript']
img: /wp-content/uploads/2022/05/all-js-arr-methods.png
updated: '2024-06-13'
excerpt: All the array methods in JavaScript with examples, so you can learn them easily.
---

In this article, we'll learn about the array methods in JavaScript with some examples. Before we start, let's look at some methods of the `Array` class.



## Array()

Accepts 1 integer argument and returns an array with those elements.

```js
Array(10); // Array(10) [ <10 empty slots> ]
Array(); // Array []
```

## .from()

We use this method to create an array. It accepts two arguments, the first one accepts an array or some iterable object.

```js
Array.from('never'); // Array(5) [ "n", "e", "v", "e", "r" ]
```

The second argument is for the mapping function (scroll below to learn more about map), it is optional.

```js
Array.from('never', (el, i) => el + i);
// Array(5) [ "n0", "e1", "v2", "e3", "r4" ]
```

## .isArray()

This method accepts 1 argument and returns if it's an array.

```js
Array.isArray(''); // false
Array.isArray(); // false
Array.isArray(42); // false
Array.isArray([]); // true
```

Now, we'll go to the main part of this article.

## .at()

Returns the element of the array of the given position. You can use negative numbers instead of doing `array[array.length-1]`.

```js
['a', 'b', 'c', 'd', 'e']
	.at(0) // a
	[('a', 'b', 'c', 'd', 'e')].at(-1) // e
	[('a', 'b', 'c', 'd', 'e')].at(42); // undefined
```

## .concat()

Merges all the arguments to one array.

```js
['hello'].concat('world', 'bye', 'world', [5]);
// Array(5) [ "hello", "world", "bye", "world", 5 ]
```

## .copyWithin()

Copies the array within a range. Accepts 3 arguments.

```js
['1', '2', '3', '4', '5', '6']
	.copyWithin(0)
	[
		// Array(6) [ "1", "2", "3", "4", "5", "6" ]

		('1', '2', '3', '4', '5', '6')
	].copyWithin(3, 0)
	[
		// Array(6) [ "1", "2", "3", "1", "2", "3" ]

		('1', '2', '3', '4', '5', '6')
	].copyWithin(3, 0, 4);
// Array(6) [ "1", "2", "3", "1", "2", "3" ]
```

## .every()

Accepts a test function and returns a boolean if all the elements of the array pass the test.

```js
['gonna', 'give', 'you']
	.every((element) => element.startsWith('g')) // false

	[('apple', 'android', 'aluminium')].every((element) => element.startsWith('a')); // true
```

## .fill()

Fills the array with a given value. Accepts 3 arguments. 1st argument is the value we need to fill. The 2nd argument is the starting index. The last argument is the ending index. The last two parameters are optional.

```js
Array(10).fill(1); // Array(10) [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]

Array(10).fill(1, 5);
// Array(10) [ <5 empty slots>, 1, 1, 1, 1, 1 ]

Array(10).fill(1, 2, 4);
// Array(10) [ <2 empty slots>, 1, 1, <6 empty slots> ]
```

## .filter()

Accepts a test function to loop each array element and remove that element if failed the test.

```js
['eating', 'sleeping', 'coding', 'playing']
	.filter((element) => element != 'sleeping')
	[
		// Array(3) [ "eating", "coding", "playing" ]

		(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
	].filter((element) => element % 2);
// Array(5) [ 1, 3, 5, 7, 9 ]
```

## .find()

Again, this accepts a test function and returns the element that the test function passed.

```js
const people = ['John', 'Anna', 'Peter', 'Rick', 'Elon'];
const search = (name) => people.find((element) => element.startsWith(name));

search('Jo'); // "John"
search('Rick'); // "Rick"
search('Ben'); // undefined
```

## .findIndex()

Does the same thing as `.find()`. Instead of returning the value, returns the position of the element in the array.

```js
const people = ['John', 'Anna', 'Peter', 'Rick', 'Elon'];
const search = (name) => people.findIndex((element) => element.startsWith(name));

search('Jo'); // 0
search('Rick'); // 3
search('Ben'); // -1
```

## .flat()

Flats the array to a given depth. The depth will be 1 if no value.

```js
[1, [2, [3, [4]]], 5]
	.flat() // Array(4) [ 1, 2, (2) […], 5 ]

	[(1, [2, [3, [4]]], 5)].flat(2) // Array(5) [ 1, 2, 3, (1) […], 5 ]

	[(1, [2, [3, [4]]], 5)].flat(3); // Array(5) [ 1, 2, 3, 4, 5 ]
```

## .forEach()

Accepts an argument that will call for each element of the array

```js
['one', 'two', 'three', 'four'].forEach(alert); // Alerts 4 times
```

## .includes()

Returns if the array contain the given value. Also, this is case-sensitive.

```js
['ant', 'bat', 'cat', 'rat', 'man']
	.includes('man') // true
	[('ant', 'bat', 'cat', 'rat', 'man')].includes('Man') // false
	[('ant', 'bat', 'cat', 'rat', 'man')].includes('dog'); // false
```

## .indexOf()

Returns the least index of an element of the array (if found) after searching the value. Returns -1 if not found. The 2nd argument specifies the position to start the search.

```js
['ant', 'bat', 'cat', 'rat', 'man']
	.indexOf('man') // 4

	[('ant', 'bat', 'cat', 'rat', 'man')].includes('Man') // -1

	[('ant', 'bat', 'cat', 'rat', 'man')].includes('ant', 2); // -1
```

## .join()

Joins all the array elements into a string with a separator (if given).

```js
['up', 'never', 'gonna', 'let', 'you', 'down'].join` `;
```

## .lastIndexOf()

Does the same thing as `.indexOf`. Instead of giving the least index, this gives you the largest index.

```js
['a', 'aaa', 'aaa', 'aa', 'a', 'aaa']
	.lastIndexOf('aaa') // 5
	[('a', 'aaa', 'aaa', 'aa', 'a', 'aaa')].lastIndexOf('b'); // -1
```

## .map()

Loops for each element of the array and executes the given function and change the value to the output of the function.

```js
['a', 'b', 'c', 'd', 'e', 'f', 'g'].map((e) => e.toUpperCase());
// Array(7) [ "A", "B", "C", "D", "E", "F", "G" ]
```

## .pop()

Removes the last element of the array and returns it. (You may know stack operations)

```js
let arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
console.log(arr.pop()); // g
console.log(arr); // ["a","b","c","d","e","f"]
```

## .shift()

Removes the first element and return that element.

```js
let arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
console.log(arr.shift()); // a
console.log(arr); // ["b","c","d","e","f","g"]
```

## .push()

Push the given value to the array. Then, return the new length of the array.

```js
let h = ['hello'];
console.log(h.push('world')); // 2
console.log(h); // Array [ "hello", "world" ]
```

## .unshift()

Does the same as `.push` but adds the elements to the first.

```js
let h = ['hello'];
console.log(h.unshift('world')); // 2
console.log(h); // Array [ "world", "hello"]
```

## .reduce()

Accepts a reducer function as the first argument and executes it. If you can't understand that, see below. The second arguments show the initial value, and it's optional.

To calculate the sum of an array, we can do this.

```js
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let initialValue = 0;
const sum = numbers.reduce((acc, val) => acc + val, initialValue);
console.log(sum); // 55
```

We have a variable named `initialValue`, that will be the initial value of the accumulator variable (or we can say the returned value). This will be passed to the reducer function. As the reducer function starts to execute, the value of the first parameter `acc` is the value of the `initialValue`, and the value of `val` is the first element of the array. When the reducer function is executed, the value of `acc` is the value it returned. Then the `val` parameter will be the second element of the array and it keeps going until the last element of the array.

```js
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((acc, val) => acc + val);
console.log(sum); // 15
```

If the initial value is not given, the reducer function will start from the second element of the array, and the first element will be the initial value.

## .reduceRight()

Does the same thing as `.reduce` but works from right to left.

```js
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduceRight((acc, val) => acc + val);
console.log(sum); // 15
```

## .reverse()

Reverses the array.

```js
const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
console.log(letters.reverse()); // Array(7) [ "g", "f", "e", "d", "c", "b", "a" ]
```

## .slice()

Returns a shallow copy of an array within the range of the given start and end arguments. (The end argument is exclusive). If no arguments are given, it will copy the whole array.

```js
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(numbers.slice(3, 6)); // Array(3) [ 4, 5, 6 ]
console.log(numbers.slice(4)); // Array(6) [ 5, 6, 7, 8, 9, 10 ]
console.log(numbers.slice()); // Array(10) [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
```

## .some()

Accepts a function and checks if some of the elements passed the test.

```js
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
numbers.some((val) => val > 5); // true
```

## .sort()

Accepts a sorting function and sorts the array.

```js
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
numbers.sort((a, b) => b - a); // Array(10) [ 10, 9, 8, 7, 6, 5, 4, 3, 2, 1 ]
```

## .splice()

Changes the content of the array by removing or replacing the elements. Accepts any number of arguments. The first argument is the starting position of the array. The second one is the delete count (how many elements to be removed). Then, the rest of the arguments are the elements to be added to the array.

```js
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
numbers.splice(2, 0, 13, 15, 21);
// Array(13) [ 1, 2, 13, 15, 21, 3, 4, 5, 6, 7, 8, 9, 10 ]

numbers.splice(5, 3, 42);
// Array(11) [ 1, 2, 13, 15, 21, 42, 7, 8, 9, 10 ]

numbers.splice(1, 1);
// Array(10) [ 1, 13, 15, 21, 42, 7, 8, 9, 10 ]
```

## .toString()

Returns the string of the elements.

```js
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
numbers.toString(); // 1,2,3,4,5,6,7,8,9,10
```

## .values()

Returns an array iterator that contains the values of each index.

```js
const iterator = numbers.values();
console.log(iterator.next().value); // 1
console.log(iterator.next().value); // 2
console.log(iterator.next().value); // 3
console.log(iterator.next().value); // 4
console.log(iterator.next().value); // 5
```

Now, we know about the built-in methods of the `Array` class. Some array methods are very similar to those methods that we can use with other classes. For example, `.find()`, `.findIndex()`, and `.some()` are the same as in `String` class.

Thanks for reading! If you have any questions or suggestions, leave a comment below.
