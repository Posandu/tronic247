---
title: 'Create a drawing app with React'
date: '2022-03-03'
categories: ['css', 'html-tutorials', 'javascript', 'tricks-and-tips']
tags: ['javascript', 'tips']
---

Today, we will be making this drawing app with React.

![](https://i.imgur.com/CVNybzr.gif)

## Contents

So let's get started!

## Creating the react app

First, we need to create a new react app, so I will run this in the terminal.

```sh
npx create-react-app drawing-app
```

Now this will create a new folder called drawing-app. Now we change our directory.

```sh
cd drawing-app
```

If we run the ls command you should see this.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1646296160034/2dVnrbEfM.png)

We're ready to go ?

## Starting the app

Now we have our app ready, we will start the app.

```sh
npm run start
```

Now open [localhost:3000](http://localhost:3000/) in your browser. You should see something like this.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1646296455860/0KKlCAt-N.png)

Now we open our editor and remove all the code in `App.js` and put this code.

```js
// Import dependencies
import { useEffect, useRef, useState } from 'react';

// Our code
export default function App() {
	return <div></div>;
}
```

First, we will create the canvas.

```htm
<canvas></canvas>
```

Then, we will use the `useRef` hook to select the canvas element.

```js
const canvasRef = useRef(null);
//.....
<canvas ref={canvasRef}></canvas>;
```

Now we have our canvas, now we will add the functionality to draw it. To do this we will create 2 functions one for setting the mouse position and one for drawing. Before we do that, we need to set our states.

```js
const [mouseData, setMouseData] = useState({ x: 0, y: 0 });
const [canvasCTX, setCanvasCTX] = useState(null);

// Set the canvas ctx as the state
useEffect(() => {
	const canvas = canvasRef.current; // Select the canvas element
	const ctx = canvas.getContext('2d'); // The canvas context
	canvas.width = window.innerWidth; // Set width of the canvas to the width of the screen
	canvas.height = window.innerHeight; // Set height of the canvas to the height of the screen
	setCanvasCTX(ctx); // Finally, set the state
}, [canvasRef]); // Do this everytime the canvas element is changed
```

### The function to save the position

```js
const SetPos = (e) => {
	// The e variable is the event
	setMouseData({
		x: e.clientX, // Mouse X position
		y: e.clientY // Mouse Y position
	});
};
```

Now we add event listeners to our canvas.

```jsx
<canvas
   ref={canvasRef}
   onMouseEnter={(e) => SetPos(e)}
   onMouseMove={(e) => SetPos(e)}
   onMouseDown={(e) => SetPos(e)}
</canvas>
```

Now every time we move the mouse, the state gets updated.

### Function to draw

Now before we create the `Draw` function, we need to save 2 states.

1. Color of the pen
2. Size of the pen

We can use the hook `useState` again.

```js
const [color, setColor] = useState('#000000'); // Default color is black
const [size, setSize] = useState(10); // Default size is 10
```

Now we have our states. Let's create the function now.

```js
const Draw = (e) => {
	if (e.buttons !== 1) return; // The left mouse button should be pressed
	const ctx = canvasCTX; // Our saved context
	ctx.beginPath(); // Start the line
	ctx.moveTo(mouseData.x, mouseData.y); // Move the line to the saved mouse location
	setMouseData({
		x: e.clientX, // Update the mouse location
		y: e.clientY // ^^^^^^^^^^^^^^^^^^^^^^^^^^^
	});
	ctx.lineTo(e.clientX, e.clientY); // Again draw a line to the mouse postion
	ctx.strokeStyle = color; // Set the color as the saved state
	ctx.lineWidth = size; // Set the size to the saved state
	// Set the line cap to round
	ctx.lineCap = 'round';
	ctx.stroke(); // Draw it!
};
```

Now we add our event listener to the canvas.

```html
<canvas ref="{canvasRef}" onMouseEnter="{(e)" ="">
	SetPos(e)} onMouseMove={(e) => {SetPos(e);Draw(e)}} onMouseDown={(e) => SetPos(e)} ></canvas
>
```

Now save the file and open [localhost:3000](http://localhost:3000/). Now you can draw some stuff. But wait, we need to add the controls.

```jsx
<div
	className="controlpanel"
	style={{
		position: 'absolute',
		top: '0',
		left: '0',
		width: '100%'
	}}
>
	<input
		type="range"
		value={size}
		max={40}
		onChange={(e) => {
			setSize(e.target.value);
		}}
	/>
	<input
		type="color"
		value={color}
		onChange={(e) => {
			setColor(e.target.value);
		}}
	/>
	<button
		onClick={() => {
			const ctx = canvasCTX;
			ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
		}}
	>
		Clear
	</button>
</div>
```

Now we have made our drawing app! ?That's all for now. See you next time. ?

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1646298495848/hRBpKHQMS.png)

And if you need to copy-paste the full code here it is.

```jsx
import { useEffect, useRef, useState } from 'react';

function App() {
	const [mouseData, setMouseData] = useState({ x: 0, y: 0 });
	const canvasRef = useRef(null);
	const [canvasCTX, setCanvasCTX] = useState(null);
	const [color, setColor] = useState('#000000');
	const [size, setSize] = useState(10);

	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext('2d');
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		setCanvasCTX(ctx);
	}, [canvasRef]);

	const SetPos = (e) => {
		setMouseData({
			x: e.clientX,
			y: e.clientY
		});
	};

	const Draw = (e) => {
		if (e.buttons !== 1) return;
		const ctx = canvasCTX;
		ctx.beginPath();
		ctx.moveTo(mouseData.x, mouseData.y);
		setMouseData({
			x: e.clientX,
			y: e.clientY
		});
		ctx.lineTo(e.clientX, e.clientY);
		ctx.strokeStyle = color;
		ctx.lineWidth = size;
		// Set the line cap to round
		ctx.lineCap = 'round';
		ctx.stroke();
	};

	return (
		<div>
			<canvas
				ref={canvasRef}
				onMouseEnter={(e) => SetPos(e)}
				onMouseMove={(e) => SetPos(e)}
				onMouseDown={(e) => SetPos(e)}
				onMouseMove={(e) => Draw(e)}
			></canvas>

			<div
				className="controlpanel"
				style={{
					position: 'absolute',
					top: '0',
					left: '0',
					width: '100%'
				}}
			>
				<input
					type="range"
					value={size}
					max={40}
					onChange={(e) => {
						setSize(e.target.value);
					}}
				/>
				<input
					type="color"
					value={color}
					onChange={(e) => {
						setColor(e.target.value);
					}}
				/>
				<button
					onClick={() => {
						const ctx = canvasCTX;
						ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
					}}
				>
					Clear
				</button>
			</div>
		</div>
	);
}

export default App;
```
