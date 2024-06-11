---
title: 'Node.js copy to clipboard'
---

We can use the `clipboardy` npm package to copy text to the clipboard or read the clipboard.

Install it by running `npm i clipboardy`

Usage:

```javascript
const clipboardy = require('clipboardy');

// Copy some text to the clipboard
clipboardy.writeSync('Lorem ipsum dolor sit amet');

// Read the text from the clipboard
clipboardy.readSync();
```
