---
title: 'Methods to Load Data in Svelte and SvelteKit'
date: '2024-06-19'
categories: ['svelte']
tags: ['svelte', 'fetch', 'sveltekit']
img: /thumbnails/methods-to-load-data-in-svelte.png
excerpt: 'Learn different methods to load data in Svelte and SvelteKit in both frontend and backend applications.'
---

Svelte and SvelteKit are great tools for building web applications. They both have built-in ways to load data from APIs or other sources. In this article, we'll explore different methods to load data in Svelte and SvelteKit.

## On the Frontend

If you're not using server-side rendering (SSR), you'll need to load data on the client side. Here are some common methods to load data in Svelte:

### Fetch API

The Fetch API is a common way to load data in any web application. Here's an example of how you can use the Fetch API in Svelte:

```svelte
<script lang="ts">
	import { onMount } from 'svelte';

	let data: Record<string, any> | undefined;

	onMount(async () => {
		const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
		data = await response.json();
	});
</script>

{#if data}
	<pre>{JSON.stringify(data, null, 2)}</pre>
{:else}
	<p>Loading...</p>
{/if}
```

The `onMount` function ensures the fetch is not called on the server side.

### Using the {#await} block

Svelte provides a built-in `{#await}` block to handle promises. We can combine this with the Fetch API to load data in a more Svelte-like way:

```svelte
{#await fetch('https://jsonplaceholder.typicode.com/todos/1')}
	<p>Loading...</p>
{:then data}
	{#await data.json()}
		<p>Loading...</p>
	{:then json}
		<pre>{JSON.stringify(json, null, 2)}</pre>
	{:catch error}
		<p>{error.message}</p>
	{/await}
{:catch error}
	<p>{error.message}</p>
{/await}
```

This approach can be verbose for complex data loading scenarios. We can simplify it using a custom `fetchJson` function:

```svelte
<script lang="ts">
	const fetchJson = async (url: string) => {
		const response = await fetch(url);
		return response.json();
	};
</script>

{#await fetchJson('https://jsonplaceholder.typicode.com/todos/1')}
	<p>Loading...</p>
{:then data}
	<pre>{JSON.stringify(data, null, 2)}</pre>
{:catch error}
	<p>{error.message}</p>
{/await}
```

This ensures that the code is more readable.

### Svelte Stores

Svelte stores can be shared across multiple components and used outside of Svelte components.

Create a separate file for data fetching logic and the store.

```ts
import { writable } from 'svelte/store';

export const data = writable<Record<string, any> | undefined>(undefined);

export const fetchData = async () => {
	const res = await fetch('https://jsonplaceholder.typicode.com/todos/1');
	const json = await res.json();
	data.set(json);
};
```

Then use this store in Svelte components:

```svelte
<script lang="ts">
	import { onMount } from 'svelte';
	import { data, fetchData } from './store';

	onMount(fetchData);
</script>

{#if $data}
	<pre>{JSON.stringify($data, null, 2)}</pre>
{:else}
	<p>Loading...</p>
{/if}
```

This approach is useful when sharing data across multiple components or loading data in multiple places.

{% stackblitz id="vitejs-vite-ik4jwx" open="src/App.svelte,src/lib/Child.svelte,src/lib/store.ts" %}

The above example shows how easy it is.

## On the Backend

SvelteKit provides multiple ways to load data on the server side:

### Load Data in `load` Function

Every page in SvelteKit can have a `load` function called on the server side before rendering. Use this function to load data from APIs or other sources.

Create a file named `+page.server.ts` in the same directory as your `+page.svelte` file:

```ts
export const load = async () => {
	const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
	const data = await response.json();

	return { data };
};
```

Access the loaded data in your Svelte component using the `data` prop:

```svelte
<script lang="ts">
	export let data;
</script>

<pre>{JSON.stringify(data, null, 2)}</pre>
```

### Load Data in Layout Functions

Similar to `load` functions in pages, layout functions are called on every page that uses the layout.

Suppose you have a file structure like this:

```
+page.svelte
/todos
  +page.svelte
  /first
    +page.svelte
```

Create a file named `+layout.server.ts` in the same `/todos` directory:

```ts
export const load = async () => {
	const response = await fetch('https://jsonplaceholder.typicode.com/todos/');
	const todos = await response.json();

	return { todos };
};
```

Access the loaded data in the `/todos` using the same `data` prop:

```svelte
<script lang="ts">
	export let data;
</script>

<h2>
	{data.todos.length} todos
</h2>
```

And in the `/todos/first` route, nothing changes:

```svelte
<script lang="ts">
	export let data;
</script>

<h2>The first todo:</h2>

<pre>{JSON.stringify(data.todos[0], null, 2)}</pre>
```

{% stackblitz id="sveltejs-kit-template-default-fqhsuk" open="src/routes/todos/+page.svelte,src/routes/todos/+layout.server.js,src/routes/todos/first/+page.svelte" %}

### Using Hooks

Hooks allow you to intercept responses from the server and modify them before they are sent to the client.

Hooks are more suitable for storing authentication data such as the user's session information.

Create a file named `hooks.server.ts` in the `src/` directory:

```ts
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event }) => {
	const data = await fetch('https://jsonplaceholder.typicode.com/todos');
	event.locals.todos = await data.json();

	const response = await resolve(event);
	return response;
};
```

Add relevant types to the `app.d.ts` file:

```ts
declare global {
	namespace App {
		interface Locals {
			todos: Record<string, any>[];
		}
	}
}

export {};
```

Access the `todos` in the `load` functions of pages and layouts:

```ts
export const load = async ({ locals }) => {
	return { todos: locals.todos };
};
```

Use the `todos` in your component:

```svelte
<script lang="ts">
	export let todos;
</script>

<pre>{JSON.stringify(todos, null, 2)}</pre>
```

Though hooks are powerful, using `load` functions in pages and layouts is recommended for most use cases.

## Conclusion

We explored multiple methods to load data in Svelte and SvelteKit. Each method has its use cases, and you can choose the one that fits your requirements. Whether you're building a simple frontend application or a complex server-rendered web app, Svelte and SvelteKit have you covered.

Happy coding!
