---
title: 'Get the time distance as words in JavaScript'
---

You can use the [date-fns](https://www.npmjs.com/package/date-fns 'date-fns') library to do that.

```javascript
import { formatDistanceToNow } from 'date-fns';

const timeDistance = (time) => formatDistanceToNow(time, { addSuffix: true });

timeDistance(new Date()); // 1 second ago (results may vary)
```
