---
title: Creating a mini programming language
date: '2022-07-01'
categories: ['javascript']
tags: ['javascript', 'programming']
img: /wp-content/uploads/2022/07/Create-a-mini-programming-language.png
updated: '2024-06-13'
---

In this tutorial, we will create a mini programming language that compiles:

```json
center,
left 100,
color blue,
top 10,
right 100,
```

to

```js
_center();
_draw();
_left(100);
_draw();
_setColor('blue');
_draw();
_top(10);
_draw();
_right(100);
_draw();
```

which we will use to draw interesting stuff on the HTML `<canvas>`.

![Diagram](https://user-images.githubusercontent.com/76736580/176864599-f0a714c6-3c34-438a-9981-3546d251199e.png)

## Contents

So let's start!

## Basic stuff

Before doing the code, we need to know the logic.

### Lexing

First, we lex the code. This is the process of splitting the code into tokens and removing unnecessary characters.

![Lexing Diagram](https://user-images.githubusercontent.com/76736580/176866612-d9f57432-779c-4324-a6bf-ae25f0578ac0.png)

### Validating

Then, we validate the code by checking if the tokens are valid.

### Compiling

Then, we compile the code to JavaScript.

## Programming part

We will name our mini-language `drawlang`. Its syntax looks like this:

- `center`, `left`, `top`, `right`, `bottom`, `color` are keywords.
- `,` is also a keyword that draws.
- Any color like `red`, `blue`, `green`, `black`, `white`, etc., is a color.
- Any number is a number.

### Setting the basic stuff

First, I'll create an `index.js` file and add this code.

```js
const fs = require('fs'); // File system

const code = `
center,
left 100,
color blue,
top 10,
right 100,
`; // Sample code to test during the tutorial
```

We import the `fs` module to read the file.

### Creating the lexer

I'll create a function named `tokenize` that accepts a string as an argument.

```js
function tokenize(code) {
	// ...
}
```

Now, keep variables to store the tokens and keep track of the current position.

```js
const tokens = [];
let i = 0;
```

And a utility function to add a token to the tokens array.

```js
function addToken(type, value) {
	tokens.push({
		type,
		value
	});
}
```

Now, we can start tokenizing the code. We will use a while loop to iterate over the code.

```js
while (i < code.length) {
	// ...
}
```

Then we get the current character.

```js
const char = code[i];
```

We will use a switch statement to determine the type of the token.

```js
switch (
	char
	// ...
) {
}
```

We ignore all the whitespace characters.

```js
case " ":
case "\t":
case "\n":
case "\r":
    i++;
    break;
```

If it's a comma, we add a `COMMA` token.

```js
case ",":
    addToken("COMMA", char);
    i++;
    break;
```

Else, we check if it's a number or a keyword.

```js
default:
    const isDigit = /\d/.test(char); // Returns true if it's a digit
    const isLetter = /[a-z]/i.test(char); // Returns true if it's a letter

    if (isDigit) {
        let number = ""; // Stores the number
        while (i < code.length && /\d/.test(code[i])) { // While the current character is a digit
            number += code[i];
            i++;
        }
        addToken("NUMBER", number); // Finally, we add the token
    } else if (isLetter) {
        let name = ""; // Stores the name
        while (i < code.length && /[a-z]/i.test(code[i])) { // While the current character is a letter
            name += code[i];
            i++;
        }
        addToken("NAME", name); // Finally, we add the token
    } else {
        throw new Error(`Unknown character: ${char}`); // Error
    }
    break;
```

And we finally escape the while loop and return the tokens.

```js
return tokens;
```

Now try adding this code and running `node index.js` and see the output.

```js
const tokens = tokenize(code);
console.log(tokens);
```

![Tokens Output](https://user-images.githubusercontent.com/76736580/176869463-7e6414bb-c3d7-4fcf-866f-86bf66e3d567.png)

Nice! We have created the lexer/tokenizer.

### Validating and compiling to JavaScript

We will create a function named `compile` that accepts an array of tokens as an argument.

```js
function compile(tokens) {
	// ...
}
```

Then add some variables to store the compiled code and keep track of the current position.

```js
let i = 0;
let out = '';

let addCode = (code) => {
	out += code + '\n';
};
```

Again, we use a while loop to iterate over the tokens.

```js
while (i < tokens.length) {
	// ...
	i++;
}
```

This time we create a function to get the current token.

```js
const token = () => tokens[i];
```

And a function named `expect` to check if the next token is the expected one and if not, throw an error.

```js
function expect(type) {
	if (tokens[++i].type !== type) {
		throw new Error(`Expected ${type}, got ${tokens[i].type}`);
	}
}
```

After that, we use a switch statement to determine the type of the token.

```js
switch (
	token().type
	// ...
) {
}
```

If it's a `COMMA`, we add `_draw()` to the compiled code.

```js
case "COMMA":
    addCode("_draw()");
    break;
```

Else, we check if it's a `NAME` token.

```js
case "NAME":
    if (token().value === "center") {
        addCode(`_center();`);
    } else if (token().value === "color") {
        expect("NAME");
        addCode(`_setColor("${token().value}");`);
    } else if (
        token().value === "left" ||
        token().value === "right" ||
        token().value === "top" ||
        token().value === "bottom"
    ) {
        expect("NUMBER");
        const value = parseInt(token().value);
        addCode(`_${tokens[i - 1].value}(${value});`);
    } else {
        throw new Error(`Unknown name: ${token().value}`);
    }
    break;
```

At last, we finally escape the while loop and return the compiled code.

```js
return out;
```

Now try adding this code and running `node index.js` and see the output.

```js
const tokens = tokenize(code);
const compiled = compile(tokens);
console.log(compiled);
```

If you did it right, you should see the following output:

![Compiled Code Output](https://user-images.githubusercontent.com/76736580/176871283-339487e7-7589-44fd-87ea-74d1be110c79.png)

We'll write the code in a file named `out.js` so you can run it in the browser.

```js
const tokens = tokenize(code);
const compiled = compile(tokens);

console.log('Compiled code successfully!');
fs.writeFileSync('out.js', compiled);
```

Nice! We now create a `framework.js` file that will contain the code for the framework.

```js
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 900;
canvas.height = 900;

let x, y, lastX, lastY, color;
x = y = lastX = lastY = 0;
color = 'transparent';

function setX(newX) {
	lastX = x;
	x = newX;
}

function setY(newY) {
	lastY = y;
	y = newY;
}

function _center() {
	setX(canvas.width / 2);
	setY(canvas.height / 2);
}

ctx.beginPath();

function _draw() {
	ctx.moveTo(lastX, lastY);
	ctx.lineTo(x, y);
	ctx.strokeStyle = color;
	ctx.stroke();
}

function _left(distance) {
	setX(x - distance);
}

function _right(distance) {
	setX(x + distance);
}

function _top(distance) {
	setY(y - distance);
}

function _bottom(distance) {
	setY(y + distance);
}

function _setColor(newColor) {
	color = newColor;
}
```

In the `HTML` file, we'll add the canvas and the script tag.

```html
<!doctype html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Document</title>
	</head>
	<body>
		<canvas id="canvas"></canvas>

		<script src="framework.js"></script>
		<script src="out.js"></script>
	</body>
</html>
```

And if you open the HTML file, you will see the following output. ![Final
Output](https://user-images.githubusercontent.com/76736580/176872335-f1ee9ff8-efd8-4826-a8d9-31d1fb1d9562.png)

## Conclusion

Thank you for reading the tutorial. The complete code is on [GitHub](https://github.com/username/repo).
