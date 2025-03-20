---
title: 'Discovering Svelte: Things I Learned While Using Svelte'
date: '2023-07-22'
categories: ['svelte', 'tricks-and-tips']
tags: ['svelte', 'tricks-and-tips']
img: /wp-content/uploads/2023/07/Discovering-Svelte-Things-I-Learned-While-Using-Svelte.png
updated: '2024-06-13'
excerpt: 'Discover some cool features of Svelte, and learn how to use them to build awesome web applications.'
---

So, I've been playing around with Svelte, this unique JavaScript compiler, for a while now, and let me tell you, it's awesome! As someone who's experienced with React, using Svelte feels like a refreshing change of pace. I'm not here to pit React against Svelte - plenty of articles already do that. Instead, I want to share some cool stuff I've learned while using Svelte.



## Svelte Spring

Svelte comes with a built-in spring animation library that's super easy to use and lightning-fast! You just specify the spring parameters and boom! The animation takes care of itself. Check out this example:

```svelte
<script>
	import { spring } from 'svelte/motion';

	let x = spring(0, {
		stiffness: 0.1,
		damping: 0.1
	});
</script>

<svelte:body on:mousemove={({ clientX }) => (x = clientX)} />

<div style="transform: translateX({$x}px)"></div>
```

And voila! You get a nice springy animation! It's that simple.

![Svelte Spring Animation](https://github.com/Posandu/posandu.github.io/assets/76736580/9d2733b1-621f-4fc1-8465-ffa483970030)

Learn more: [Svelte Tutorial - Tweened](https://svelte.dev/tutorial/tweened), [Svelte Tutorial - Spring](https://svelte.dev/tutorial/spring)

## Svelte Transitions

But wait, there's more! Svelte not only has spring animations, but it also comes with a transition library. Adding a transition is a piece of cake - just slap the `transition` attribute on an element.

```svelte
<script>
	import { slide } from 'svelte/transition';
	let show = true;
</script>

<label>
	<input type="checkbox" bind:checked={show} />
	slide
</label>

{#if show}
	<h1 transition:slide>Hey🫡👀</h1>
{/if}
```

You've got a sliding effect like magic!

![Svelte Slide Transition](https://github.com/finnhvman/matter/assets/76736580/a8685a0b-857e-4918-b9ec-92b6794483a6)

Svelte also has something called _Deferred Transitions_, which only run when an element is added or removed from the DOM. Check out this icon morphing to a div example:

![Svelte Deferred Transition](https://github.com/Posandu/posandu.github.io/assets/76736580/bbf8f7c4-78cf-4f9e-8afa-c8a5ed971170)

The best part? It's less than 90 lines of code!

```svelte
<script>
	import { quintInOut } from 'svelte/easing';
	import { crossfade } from 'svelte/transition';

	let openApp = '';
	let apps = [
		'🐦',
		'🐱',
		'🐶',
		'🐭',
		'🐹',
		'🐰',
		'🦊',
		'🐻',
		'🐼',
		'🐨',
		'🐯',
		'🦁',
		'🐮',
		'🐷',
		'🐸',
		'🐵',
		'🐔',
		'🐧',
		'🐤'
	];

	const [send, receive] = crossfade({
		duration: 500,
		easing: quintInOut
	});
</script>

{#each apps as app}
	{#if openApp !== app}
		<button
			class="icon"
			on:click={() => (openApp = app)}
			in:receive|global={{ key: app }}
			out:send|global={{ key: app }}
		>
			{app}
		</button>
	{:else}
		<div class="app" in:receive|global={{ key: app }} out:send|global={{ key: app }}>
			<h1>App {app}</h1>
			<button on:click={() => (openApp = '')}>Close</button>
		</div>
	{/if}
{/each}
```

Learn more: [Svelte Tutorial - Transition](https://svelte.dev/tutorial/transition), [Svelte Deferred Transitions](https://svelte.dev/examples/deferred-transitions)

## Keyed Each Blocks

When it comes to lists in Svelte, you use the `each` block. Svelte handles the key for you by default, but if you want more control, you can specify a key yourself.

```svelte
<script>
	let items = [
		{ id: 1, name: 'Joe' },
		{ id: 2, name: 'John' },
		{ id: 3, name: 'Jane' }
		// ...
	];
</script>

{#each items as item (item.id)}
	<div>
		<h1>{item.name}</h1>
	</div>
{/each}
```

Just add `(item.id)` after the `each` block to specify the key.

## Awaited Blocks

Here's a nifty feature: using `awaited` blocks when you want to wait for a promise to resolve before rendering something.

Take this example using the `fetch` API to get a random number from a server:

```svelte
<script>
	let promise = getRandomNumber();

	async function getRandomNumber() {
		const res = await fetch(`/tutorial/random-number`);
		const text = await res.text();

		if (res.ok) {
			return text;
		} else {
			throw new Error(text);
		}
	}

	function handleClick() {
		promise = getRandomNumber();
	}
</script>

<button on:click={handleClick}>Generate Random Number</button>

{#await promise}
	<p>...waiting</p>
{:then number}
	<p>The number is {number}</p>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}
```

## Sending Messages Between Components

Picture this: you've got a component rendering a list of items, and each item has a button that deletes it. You want
to update the list when an item is deleted, but how do you do that?

With Svelte's `createEventDispatcher` function, you can send a message from the child component to the parent component.

<img style="max-width:400px;min-width:300px;width:100%" src="https://github.com/Posandu/posandu.github.io/assets/76736580/2cb629bf-40a5-4613-a692-137d2da85e91" alt="example">

In the child component, create a dispatcher and dispatch a message when the button is clicked:

```svelte
<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function sendMsg() {
		dispatch('refresh');
	}

	export let item = '';
</script>

<button on:click={sendMsg}>
	Send Message
	{item}
</button>
```

In the parent component, listen for the message and update the list:

```svelte
<script>
	import { onMount } from 'svelte';
	import Inner from './Inner.svelte';

	let items = [];

	function handleRefresh() {
		items = [...items, Math.random().toString(36).split('').slice(2, 15)];
	}

	onMount(() => {
		handleRefresh();
	});
</script>

{#each items as item}
	<Inner on:refresh={handleRefresh} {item} />
	<br />
{/each}
```

![Svelte Sending Messages Example](https://github.com/Posandu/posandu.github.io/assets/76736580/2458959b-bd21-48c8-8595-5f468f9ce706)

## Named Slots

In Svelte, when you're working with slots, you have the option to name them, which comes in handy when you want to pass multiple slots to a component.

Let's say we have a card component like this:

```svelte
<div>
	<h1>
		<slot name="title" />
	</h1>

	<div>
		<slot name="content" />
	</div>

	<slot name="footer">
		<p>I'm the default footer. I'll be used if no other footer is provided.</p>
	</slot>

	<div>
		<button>Interesting</button>
	</div>
</div>
```

We can use our card component like this:

```svelte
<Card>
	<h1 slot="title">Default title</h1>
	<p slot="content">Default content</p>
</Card>
```

By adding a `slot` attribute to the element we want to pass to the slot and setting the value to the name of the slot, we can achieve this. It allows us to customize different parts of the card easily.

![Named Slots in Svelte](https://github.com/Posandu/posandu.github.io/assets/76736580/0a8ed537-d3aa-4d95-a10a-4b6b60e0000d)

## Named Exports

By default, Svelte exports a component as the default export. However, if you need additional exports, you can use named exports.

In your component file:

```svelte
<script context="module">
	export const name = 'Svelte';
</script>

<script>
	let test = 'test';
</script>
```

By adding the `context="module"` attribute to the first script tag, Svelte recognizes it as a module script.

You can then import the named export like this:

```svelte
<script>
	import { name } from './Component.svelte';
</script>
```

This allows you to have multiple exports from a single component.

## `@const` and `@html` Tags

While less known, the `@const` and `@html` tags can be useful in certain situations.

### `@const`

Inside an `{#if}` or `{#each}` block, you can use the `@const` tag to create a constant variable within the block.

```svelte
{#each items as item}
	{@const index = item.index}

	<!-- Some code -->

	<p>{index}</p>

	<!-- Some code -->

	<pre>I'm index {index}</pre>
{/each}
```

This saves time by avoiding repetitive code and duplications.

### `@html`

The `@html` tag allows you to render HTML inside a component. Unlike React's `dangerouslySetInnerHTML`, Svelte's `@html` is straightforward to use. However, be cautious when using it, as it can lead to XSS attacks.

```svelte
<script>
	let html = '<h1>HTML</h1>';
</script>

{@html html}
```

It provides a way to insert dynamic HTML content into your component, but be sure to sanitize any user-generated content before using it to prevent security issues.

![Using @html Tag in Svelte](https://github.com/Posandu/posandu.github.io/assets/76736580/6190975f-58e4-4e68-ad6d-6be2fde8ea44)

## Conclusion

In conclusion, Svelte has proven to be a fantastic JavaScript compiler with its intuitive features like spring animations, transitions, named slots, and more. It offers a refreshing alternative to other frameworks. So, give it a try and start building amazing web applications with Svelte today!
