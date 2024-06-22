---
title: Learn the basics of React using this cheat sheet
date: '2022-09-22'
categories: ['html-tutorials', 'javascript']
tags: ['javascript', 'react', 'tips']
img: /wp-content/uploads/2022/09/React-Cheat-Sheet-Learn-the-basics-of-React.png
updated: '2024-06-13'
excerpt: React is a JavaScript library for building interactive user interfaces. In this article, you can find a React cheat sheet that will help you to learn React quickly.
---

React is a JavaScript library for building interactive user interfaces. It is maintained by Facebook and a community of individual developers and companies. React can be used as a base in the development of single-page or mobile applications. So, in this article, you can find a React cheat sheet that will help you to learn React quickly.

## Contents

## Prerequisites

- Basic knowledge of HTML, CSS, and JavaScript.
- Basic knowledge of ES6 features.
- Basic knowledge of Node.js and npm.

## Initializing a React Project

You can use this npm command to create a new React project with Vite:

```bash
npm create vite
```

Just select the React template and you are ready to go.

![](https://user-images.githubusercontent.com/76736580/191727816-91a45e97-340c-4c84-ab75-d090d9002b9b.png)

Now, go to the project directory and run the following command to start the development server:

```bash
npm i && npm run dev
```

Now you should be able to see the React app running on http://localhost:5173. If you open the app in the browser, you will see the following screen:

![](https://user-images.githubusercontent.com/76736580/191728285-9d06e5c5-0bfc-46ce-aa90-654e053bd8e1.png)

For more information about Vite, you can check out this [guide](https://vitejs.dev/guide/#trying-vite-online).

## React Components

React components are like lego blocks. You use them to build your UI. React components are reusable and can be used to build complex UIs. You can create a React component using the following syntax:

```jsx
function App() {
	return <h1>Hello World</h1>;
}
```

You can also use ES6 classes to create React components:

**Not recommended because functional components are easier to read and test.**

```jsx
class App extends React.Component {
	render() {
		return <h1>Hello World</h1>;
	}
}
```

You can also use arrow functions to create React components:

```jsx
const App = () => {
	return <h1>Hello World</h1>;
};
```

So basically a React component is a JavaScript function that returns a React element. They can be used like this:

```jsx
<App />
```

And also components **must** start with a capital letter or else React will treat them as DOM tags.

Also, you can embed inline JavaScript expressions in JSX using curly braces:

```jsx
const name = 'John';
const App = () => {
	return (
		<h1>
			Hello {name}, you have {Math.floor(Math.random() * 10)} unread messages.
		</h1>
	);
};
```

## React props

Imagine if you have a component that renders a profile card. You can either hardcode the data or you can pass it as props. Props are like function arguments in React. You can pass data to a component using props. You can access the props in a component using the `props` object. For example, if you have a component called `ProfileCard` and you want to pass the name of the user as a prop, you can do it like this:

```jsx
<ProfileCard name="John Doe" />
```

And then you can access the name prop in the `ProfileCard` component like this:

```jsx
function ProfileCard(props) {
	return <h1>{props.name}</h1>;
}
```

If you like destructuring, you can do it like this:

```jsx
function ProfileCard({ name }) {
	return <h1>{name}</h1>;
}
```

But, what if you want to pass other props? (For example, the class attribute, aria-label, etc.) You can do it like this using the spread operator:

```jsx
function ProfileCard({ name, ...rest }) {
	return <h1 {...rest}>{name}</h1>;
}
```

And then you can pass the other props like this:

```jsx
<ProfileCard name="John Doe" style={{ color: 'red' }} />
```

![](https://user-images.githubusercontent.com/76736580/191730118-258d7ae8-6113-4ef5-952f-1542d4d9ef6f.png)

If you want to use default prop values, you can do it like this:

```jsx
function ProfileCard({ name = 'John Doe' }) {
	return <h1>{name}</h1>;
}
```

Now if you don't pass the name prop, it will use the default value.

## React events

If you want to add an event listener to a React element, you can do it like this:

```jsx
function App() {
	return <button onClick={() => alert('Hello World')}>Click me</button>;
}
```

The thing the above code does is that it passes an anonymous function to the `onClick` prop. You can also pass a named function:

```jsx
function handleClick() {
	alert('Hello World');
}

function App() {
	return <button onClick={handleClick}>Click me</button>;
}
```

## React state

The state is a major part of React. It is used to store data that changes over time. You can use the `useState` hook to create a state variable. For example, if you want to create a counter, you can do it like this:

```jsx
import { useState } from 'react';

function Counter() {
	const [count, setCount] = useState(0);

	return (
		<div>
			<h1>{count}</h1>
			<button onClick={() => setCount(count + 1)}>Increment</button>
			<button onClick={() => setCount(count - 1)}>Decrement</button>
		</div>
	);
}
```

Now, if you click the increment button, the count will increase by 1 and if you click the decrement button, the count will decrease by 1.

## React useEffect

By default, React runs the effects after every render. But, if you want to run the effects only when a certain value changes, you can pass an array as a second argument to the `useEffect` hook. For example, if you want to run the effect only when the count changes, you can do it like this:

```jsx
import { useState, useEffect } from 'react';

function Counter() {
	// ...

	useEffect(() => {
		document.title = `You clicked ${count} times`;
	}, [count]);

	// ...
}
```

Now every time the count changes, the document title will change.

Also, this can be very useful for running an effect only once when the component mounts. For example, if you want to fetch data from an API when the component mounts, you can do it like this:

```jsx
import { useState, useEffect } from 'react';

function App() {
	const [data, setData] = useState(null);

	useEffect(() => {
		fetch('https://jsonplaceholder.typicode.com/todos/1')
			.then((response) => response.json())
			.then((json) => setData(json));
	}, []);

	// ...
}
```

## React hooks

Hooks are basically functions that let you interact with React features. You can use hooks to create state variables, fetch data, etc. You already used hooks such as `useState` and `useEffect`. You can also create your own hooks.

Normally, hooks must be inside a React function component and they must start with the word `use`.

## React loops

If you have an array of data like this:

```json
[
	{
		"id": 1,
		"title": "Hello World"
	},
	{
		"id": 2,
		"title": "Hello World 2"
	}
]
```

You can combine it with the `map` method (JavaScript array method) to render a list of React elements. For example, if you want to render a list of todos, you can do it like this:

```jsx
import { useState } from 'react';

function App() {
	const [todos, setTodos] = useState([
		{
			id: 1,
			title: 'Hello World'
		},
		{
			id: 2,
			title: 'Hello World 2'
		}
	]);

	return (
		<ul>
			{todos.map((todo) => (
				<li key={todo.id}>{todo.title}</li>
			))}
		</ul>
	);
}
```

Will render:

![](https://user-images.githubusercontent.com/76736580/191736827-472a961c-ba4c-420e-aed9-d7c6e2df20e6.png)

Also, use the `key` prop when rendering a list of React elements inside a loop to prevent React from rendering the same element twice.

## React conditional rendering

If you want to render a React element only if a certain condition is true, you can do it like this:

```jsx
function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	return <div>{isLoggedIn && <h1>Hello World</h1>}</div>;
}
```

This is just using the logical AND operator. If the `isLoggedIn` variable is true, it will render the `<h1>Hello World</h1>` element. If it is false, it will render nothing.

You can also use this to display a message if the `isLoggedIn` variable is false:

```jsx
{
	isLoggedIn ? <h1>Hello World</h1> : <h1>You are not logged in</h1>;
}
```

Or you can conditionally return from a function:

```jsx
function App() {
	if (isLoggedIn) {
		return <h1>Hello World</h1>;
	} else {
		return <h1>You are not logged in</h1>;
	}
}
```

## Conclusion

Now you know the basics of React. You can use these to create your own React apps. If you want to learn more, you can check out the [React documentation](https://reactjs.org/docs/getting-started.html). Good luck!
