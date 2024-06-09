---
title: 'How to create your desktop app with HTML'
date: '2021-11-28'
categories: ['css', 'html-tutorials', 'tricks-and-tips']
tags: ['apps', 'css', 'electron', 'html', 'javascript']
---

In this post, I will show you how to create a desktop app with HTML, CSS, and JavaScript. We will use the [`electron`](https://electronjs.org/) framework to create the app. Our app will be a simple calculator. It will have a text field where you can enter the numbers, and a button to perform operations.

## What is Electron?

Electron is a framework for building cross-platform desktop applications with web technologies like HTML, CSS, and JavaScript. It is used to create desktop apps for Mac, Windows, and Linux.

### Who uses Electron?

Electron is used by a wide range of developers, from startups to large companies. Some popular apps built with Electron include Slack, Discord, Visual Studio Code, and WhatsApp.

## Getting things ready

Before we start, we need to install the [`electron`](https://electronjs.org/) framework. You will need to install these things.

1. Node.js (Latest version) - [`nodejs`](https://nodejs.org/en/)
2. A code editor like - [`Visual Studio code`](https://code.visualstudio.com/)

## Creating the app

We will create a new folder called `calculator-app`. And now open the terminal in that folder. And type the following command.

```sh
npm init
```

The above command will create a `package.json` file in the current folder. This file contains the information about the app.

![](https://user-images.githubusercontent.com/76736580/143735411-8af9b147-bf33-4388-b5bf-0f278950002e.png)

Then we will install the dependencies using the following command.

```sh
npm install --save-dev electron
```

![](https://user-images.githubusercontent.com/76736580/143735661-0c2dfd8e-1581-4aa1-b245-d8f9ed84d126.png)

Now create a file named `main.js` in the `calculator-app` folder, No need to put any code in this file.

Then, create a file named `index.html`. This file will contain the HTML code for the app.

```html
<!doctype html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>My Demo Calculator!</title>
		<link rel="stylesheet" href="style.css" />
	</head>

	<body>
		<div id="app">
			<h2>Type the math expression in the text field</h2>
			<textarea id="math"></textarea>
			<button id="calculate">Calculate</button>
			<h2>Result</h2>
			<div id="result"></div>
		</div>
		<script>
			let $ = (i) => {
				document.querySelectorAll(i);
			};

			document.querySelectorAll('#calculate')[0].addEventListener('click', () => {
				var math = document.querySelectorAll('#math')[0].value;
				var result = document.querySelectorAll('#result')[0];

				try {
					var _result = eval(math);
				} catch (a) {
					_result = 'Invalid math';
				}
				result.innerHTML = _result;
			});
		</script>
	</body>
</html>
```

Now we will create a file named `style.css`. This file will contain the CSS code for the app.

```css
* {
	font-family: system-ui;
	font-weight: 400;
}

div#app {
	background: #f7f7f7;
	border-radius: 5px;
	padding: 20px;
}

textarea#math {
	display: block;
	width: 100%;
	margin-bottom: 10px;
	height: 188px;
	border: 1px solid #ababab;
	border-radius: 3px;
}

button#calculate {
	padding: 10px 20px;
	font-size: 15px;
	border: 1px solid #e5e5e5;
	border-radius: 4px;
}
```

Now, in the `main.js` file, add the following code.

```js
/**
 * Init
 */
const { app, BrowserWindow } = require('electron');
const path = require('path');
function createWindow() {
	const mainWindow = new BrowserWindow({
		width: 800,
		height: 600
	});
	mainWindow.loadFile('index.html');
}
app.whenReady().then(() => {
	createWindow();
	app.on('activate', function () {
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
});
app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') app.quit();
});
```

Now let's start the app. In the `package.json` file, replace

```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
},
```

it with

```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "electron ."
},
```

And also replace

```json
"main": "index.js",
```

with

```json
"main": "main.js",
```

So that we can run the app using the following command.

```sh
npm start
```

Yay! We have created our app. Now, here's what we get.  
![](https://user-images.githubusercontent.com/76736580/143765122-7210211b-42eb-48b5-9517-a1a6fcb20f88.png)

## Developing the app

Now that we have created the app, we can start developing it. The first thing we need to do is to hide the menu bar. We can do this by adding the following code inside the `createWindow()` function.

```js
mainWindow.menuBarVisible = false;
```

Now the menu bar will be hidden.

## Creating an executable file

Now, we have created the app. We can create an executable file using the following command.

```sh
npm install electron-packager --save-dev
```

This will install the [`electron-packager`](https://www.npmjs.com/package/electron-packager) package.

After installing the package, we can create an executable file using the following command.

```js
electron-packager . calculator-app calculator --platform=win32 --arch=x64 --asar=true
```

Yay! We have created an executable file. Now, in the `calculator-app` folder, there is a folder named `calculator-win32-x64`. This folder contains the executable file. It's called `calculator-app-win32-x64.exe`.

## Conclusion

You now know how to create a desktop app. Using Electron. Now, you can create your desktop app.

You can learn more about Electron from the following links.

Get the code - [https://github.com/Posandu/create-electron-app/](https://github.com/Posandu/create-electron-app/)

### Electron Documentation

- [Electron Documentation](https://electronjs.org/docs/)
- [Electron Packager](https://www.npmjs.com/package/electron-packager)
- [Electron Starter](https://www.npmjs.com/package/electron-starter)
