---
title: 'Add Material Design colors to TailwindCSS'
---

To add Material Design colors to TailwindCSS, just copy the content from this Gist and save it as a `.js` file. You can find the Gist here:

[https://gist.github.com/Posandu/76ac596d64bc66178df4fb583f7a8c88](https://gist.github.com/Posandu/76ac596d64bc66178df4fb583f7a8c88)

After that, update your Tailwind CSS configuration like this:

```js
const { colors } = require('file_you_saved.js'); // If you're using CommonJS
// or, if you're using ES6 modules
import { colors } from 'file_you_saved.js';

/** @type {import('tailwindcss').Config} */
module.exports = {
	theme: {
		//...
		colors
	}
};
```

Alternatively, you can simply copy the object inside the Gist and use it as the `colors` option in your configuration:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
	theme: {
		//...
		colors: {} // Paste the object here
	}
};
```
