---
title: Creating the smallest possible router in JavaScript
date: '2024-08-04'
categories: ['javascript']
tags: ['javascript', 'router', 'spa']
img: /thumbnails/smallest-router.png
excerpt: Code golfing a router in JavaScript to the smallest possible size.
---
Routing is the process of finding the best path to a specific endpoint. In the context of web development, routing is the process of determining which page to show based on the URL. So, here's my attempt at creating the smallest possible router in JavaScript.

Now let's see the code first and then I'll explain how it works.

```javascript
(onhashchange=_=>R.map(([i,r])=>(m=location.hash.match(i))&&r(...m)))()
```

Impressive, right? The code is just 71 characters long. It uses RegExp based routing and executes the matched route handler.

For example, here's how we implement a simple router using the above code.

```javascript
const renderElm = document.getElementById("app");

const R = [
    [
        "",  // fallback route
        () => {
            renderElm.innerHTML = `404`;
        },
    ],
    [
        "^\\s*$",  // regex for nothing
        () => {
            renderElm.innerHTML = `Home!`;
        },
    ],
    [
        "about", // #about
        () => {
            renderElm.innerHTML = `About`;
        },
    ],
    [
        "product/(\\d+)", // #product/123 (dynamic route)
        (_, id) => {
            renderElm.innerHTML = `Product ${id}`;
        },
    ],
];

(onhashchange=_=>R.map(([i,r])=>(m=location.hash.match(i))&&r(...m)))()
```

Nice. Now, let's see how it works.
## How does a router work?

Routers are used everywhere in the web. In fact, the page you are reading right now is served by a router. When you visit a URL, the router determines which page to show based on the URL. In this case, you are in the `creating-the-smallest-possible-router` route.

![image](https://github.com/user-attachments/assets/c4671201-53c9-4f35-9735-5123a402c8db)

In the simplest form, a router is a mapping between a URL and a function. When the URL matches a route, the corresponding function is executed.

## Creating the ungolfed version

Now that we know how a router works, let's get into the interesting part - coding the router. So, since we are using this in the **browser**, we can't use the `/` based routing because it uses the server to route the request, which will result in a 404 error. (You can still return the index.html file for all the routes, but we are not going to do that here).

So, we will use the `hash` based routing. The hash part of the URL is the part after the `#`. For example, in the URL `https://example.com/#about`, the hash part is `about`.

Even though # based routing was originally used for anchor links, it is now widely used for client-side routing in Single Page Applications (SPAs). 

Also, there's a built-in event called `hashchange` that is triggered whenever the hash part of the URL changes. We can use this to our advantage.

So, let's first define the routes and their corresponding handlers.

```javascript
const renderElm = document.getElementById("app");

const R = [
    [
        "",  // fallback route
        () => {
            renderElm.innerHTML = `404`;
        },
    ],
    [
        "^\\s*$",  // regex for nothing
        () => {
            renderElm.innerHTML = `Home!`;
        },
    ],
    [
        "about", // #about
        () => {
            renderElm.innerHTML = `About`;
        },
    ],
    [
        "product/(\\d+)", // #product/123 (dynamic route)
        (_, id) => {
            renderElm.innerHTML = `Product ${id}`;
        },
    ],
];
```


Now, here's what we need to do:

1. Get the hash part of the URL.
2. Go through each item in the `R` array and check if the hash matches the route.
3. Execute the corresponding handler.

Since regex is used, we don't need to worry about 404s. If no route matches, the fallback route will be executed (which is the first route in the array).

We'll first start with a function to match the routes.

```javascript
function matchRoutes() {
     // ..... 
}
```

And it gets executed when the page loads first and also when the hash changes.

```javascript
window.addEventListener("DOMContentLoaded", matchRoutes);
window.addEventListener("hashchange", matchRoutes);
```

Now inside the `matchRoutes` function, we do our magic.

```javascript
function matchRoutes() {
// [!code focus:10]
    const hash = location.hash;

    R.forEach(([route, callback]) => {
        const match = hash.match(new RegExp(route));

        if (match) {
            callback(...match);
        }
    });
}
```

:::note
The `forEach` method is not the best way to do this as it doesn't stop when a match is found. But for simplicity, we are using it here.
:::

The code above is self-explanatory. We get the hash part of the URL and then go through each route in the `R` array. If the hash matches the route, we execute the corresponding handler. 

## Golfing the router

Now that we have the ungolfed version, let's golf it down to the smallest possible size. The first thing is to remove all the `const` keywords. So, the code becomes:

```javascript
function matchRoutes() {
	const hash = location.hash; // [!code --]
	hash = location.hash; // [!code ++]

	R.forEach(([route, callback]) => {
		const match = hash.match(new RegExp(route)); // [!code --]
		match = hash.match(new RegExp(route)); // [!code ++]


		if (match) {
			callback(...match);
		}
	});
}
```

Nice, now that's 8 characters less. 

We can remove the function keyword and convert it to an arrow function.

```javascript
function matchRoutes() { // [!code --]
matchRoutes = _ => {  // [!code ++]
	// ....
};
```

That's 4 characters less (counting the space).

After that, the next thing is to remove useless declarations and inline the values instead.

```javascript
matchRoutes = _ => {
	hash = location.hash; // [!code --]

	R.forEach(([route, callback]) => {
		match = hash.match(new RegExp(route)); // [!code --]
		match = location.hash.match(new RegExp(route)); // [!code ++]

		if(match) {
			callback(...match);
		}
	});
};
```

Okay, now the hacky part begins. In JavaScript, a variable assignment returns the value assigned. For example, in the code below, `a=10` returns `10` and `a` is now `10`.

```javascript
console.log(a=10); // 10
console.log(a); // 10
```

This allows to remove the `match` variable declaration. 

```javascript
matchRoutes = _ => {
  R.forEach(([route, callback]) => {
    match = location.hash.match(new RegExp(route));  // [!code --]
    if (match) { // [!code --]
    if (match=location.hash.match(new RegExp(route))) { // [!code ++]
      callback(...match);
    }
  });
};
```

That's 1 line less. The current code for the `matchRoutes` function is:

```javascript
matchRoutes=_=>{
	R.forEach(([route, callback]) => {
		if (match=location.hash.match(new RegExp(route))) {
			callback(...match);
		}
	});
};
```
Now, since there is only one statement inside the arrow function, we can remove the curly braces and also use short-circuit evaluation to remove the `if` statement.

```javascript
matchRoutes=_=>{
    R.forEach(([route, callback]) => { // [!code --]
		if (match=location.hash.match(new RegExp(route))) { // [!code --]
			callback(...match); // [!code --]
		} // [!code --]
	}); // [!code --]
	
	R.forEach(([route, callback]) => (match=location.hash.match(new RegExp(route))) && callback(...match)); // [!code ++]
};
```

That's a lot of characters removed! Oh wait, we can also remove the curly braces from the function as well.

```javascript
matchRoutes=_=>
{ // [!code --]

} // [!code --]
```

Now we're left with these 2 event handlers.

```javascript
window.addEventListener("hashchange", matchRoutes);
window.addEventListener("DOMContentLoaded", matchRoutes);
```

If you didn't know, instead of using `addEventListener`, we can directly assign the event handler to the event. (only for certain events). So that allows us to remove the 1st event handler.

```javascript
onhashchange=matchRoutes;
```

After that, the other event handler can be removed by ... just executing the function.

```javascript
matchRoutes();
```

Which makes the event handle function to be:

```javascript
onhashchange=matchRoutes;
matchRoutes();
```

Déjà vu? Yes, we can use the same trick we used for `match` variable here.

```javascript
(onhashchange=matchRoutes)()
```

---

All the above steps will leave us this code

```javascript
(onhashchange=_=>R.forEach(([route, callback]) => (match=location.hash.match(new RegExp(route))) && callback(...m)))()
```

The next step is to just remove all the spaces and make the variable names shorter.

```javascript
(onhashchange=_=>R.forEach(([r,c])=>(m=location.hash.match(new RegExp(r)))&&c(...m)))()
```

Now it's getting harder and harder to golf. But the next step is to replace the `forEach` method with the `map` method.

```javascript
(onhashchange=_=>R.map(([r,c])=>(m=location.hash.match(new RegExp(r)))&&c(...m)))()
```

And replace the `new RegExp(str)` with just `str`. (This is because the `match` method can take a string as well).

```javascript
(onhashchange=_=>R.map(([r,c])=>(m=location.hash.match(r))&&c(...m)))()
```

And that's it! Everything is golfed down to the smallest possible size, 71 characters.


## Final thoughts

This was just another fun experiment of mine. The code is not suitable for production use (I'm using it anyway 😅). But it's a great exercise to understand how things work under the hood. Hope you enjoyed it!

Here's another code golfing post I did: [Code golfing with JavaScript](https://www.tronic247.com/lets-code-golf-with-javascript)