---
title: 'CSS button design ideas'
date: '2021-02-13'
categories: ['css']
---

Do you need some cool CSS buttons. Look no further, see this code I have posted below.

## Spacing button

CSS

```css
.btn-1 {
	background: #0058ff;
	border: none;
	color: white;
	padding: 8px 9px;
	border-radius: 3px;
	box-shadow: 0px 3px 60px #0c49d7;
	transition: all 0.5s !important;
}

.btn-1:hover {
	background: #0004ff;
	letter-spacing: 2px;
}
```

The HTML

```
<button class="btn-1">Button</button>
```

## Pressing button

CSS

```
.btn-2 {
  background: #ff6000;
  padding: 11px 24px;
  font-size: 21px;
  border: 0px;
  color: white;
  box-shadow: 0px 4px 0px #b50f0f;
  transition: all 0.1s;
  outline: navajowhite;
}
.btn-2:active {
  box-shadow: 0px 2px 0px #b50f0f;
  transform: translateY(6px);
}

```

The HTML

```
<button class="btn-2">Button 2</button>
```

## Hidden text button

CSS

```
.btn-3 {
  padding: 15px 23px;
  background: #773dca;
  color: white;
  font-size: 20px;
  border: none;
  outline: none;
  border-radius: 100px 0px 100px 100px;
  transition: all 0.3s;
}

.btn-3 span {
  opacity: 0;
  margin-left: -20px;
  transition: all 0.5s;
  color: #ffd4d4;
}
.btn-3:hover span {
  opacity: 1;
  margin-left: 2px;
}
.btn-3:hover {
  box-shadow: 0px 0px 70px #773dcaab;
}
```

The HTML

```
<button class="btn-3">
Button 2 <span>Go</span>
</button>
```
