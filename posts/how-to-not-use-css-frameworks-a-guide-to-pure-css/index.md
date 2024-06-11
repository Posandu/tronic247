---
title: 'Pure CSS Framework'
date: '2022-02-05'
categories: ['css', 'html-tutorials', 'tricks-and-tips']
tags: ['css', 'design', 'frameworks', 'perfomance']
img: /wp-content/uploads/2022/02/How-to-not-use-CSS-frameworks_.png
---

Hey! So you came here to see another CSS framework? right? So time to worry, I am telling you how to create your CSS framework instead of using one. So let's begin!

## Contents

## But why?

Glad you asked now, go to a bootstrap site and then go to a vanilla CSS site. Now you see the difference I'm talking about.  
When the page with Bootstrap loads in 2s the page with vanilla CSS is loading in less than 1s ?.

## Let's get started!

So we'll build this using pure CSS!  
![](https://user-images.githubusercontent.com/76736580/152642555-27b7b050-10e3-4054-8fe9-39e0b0fc4f6f.png)

### 1\. Create the page with the framework

Yes, do this first in development. And follow the other steps.

## 2\. Inspect the styles

So this is the tricky part to do but wait! There are Firefox devtools for the rescue.

![](https://user-images.githubusercontent.com/76736580/152642671-a86947aa-da0a-40e2-909a-7cf42c15100c.png)

Now if you select an element and go to the computed tab there is the CSS we need! So I'll copy the HTML first.

```html
<div class="modal-sheet" tabindex="-1" role="dialog" id="modalSheet">
	<div class="modal-dialog" role="document">
		<div class="modal-content rounded-6 shadow">
			<div class="modal-header border-bottom-0">
				<h5 class="modal-title">Modal title</h5>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<div class="modal-body py-0">
				<p>
					This is a modal sheet, a variation of the modal that docs itself to the bottom of the
					viewport like the newer share sheets in iOS.
				</p>
			</div>
			<div class="modal-footer flex-column border-top-0">
				<button type="button" class="btn btn-lg btn-primary w-100 mx-0 mb-2">Save changes</button>
				<button type="button" class="btn btn-lg btn-light w-100 mx-0" data-bs-dismiss="modal">
					Close
				</button>
			</div>
		</div>
	</div>
</div>
```

I'll reduce some classes ?

```html
<div class="modal-sheet">
	<div class="dialog" role="document">
		<div class="content">
			<div class="header">
				<h5 class="title">Modal title</h5>
				<button type="button" class="close"></button>
			</div>
			<div class="body">
				<p>
					This is a modal sheet, a variation of the modal that docs itself to the bottom of the
					viewport like the newer share sheets in iOS.
				</p>
			</div>
			<div class="footer">
				<button type="button" class="btn primary">Save changes</button>
				<button type="button" class="btn" data-bs-dismiss="modal">Close</button>
			</div>
		</div>
	</div>
</div>
```

And before we start with the CSS, I'll apply some fixes.

```css
body {
	margin: 0;
	padding: 0;
	font-family:
		system-ui,
		-apple-system,
		'Segoe UI',
		Roboto,
		'Helvetica Neue',
		Arial,
		'Noto Sans',
		'Liberation Sans',
		sans-serif,
		'Apple Color Emoji',
		'Segoe UI Emoji',
		'Segoe UI Symbol',
		'Noto Color Emoji';
}

*,
*:after,
*:before {
	box-sizing: border-box;
}
```

So we will get something like this  
![](https://user-images.githubusercontent.com/76736580/152643552-0a0ff34b-9edf-47bd-ac80-36a1700db1ce.png)

Nice.  
Now, we'll first create the overlay. So with just basic CSS knowledge, you can do this

```css
.modal-sheet {
	display: flex;
	position: fixed;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	align-items: center;
	justify-content: center;
}
```

Now we have the items centred. Now, we need the background colour, How do we find that? easy! Select the element and go to the computed styles tab and there you will see its background-colour

![](https://user-images.githubusercontent.com/76736580/152643624-c614cd2c-3212-43db-9102-4ba2c049864e.png)

Now I'll add it.  
![](https://user-images.githubusercontent.com/76736580/152643665-434ea4ee-bdce-4019-8078-3d7bcf210528.png)

Nice. The next thing is to style the modal, so for this to I'll do the same stuff.

```css
.dialog {
	background: white;
	padding: 19px;
	max-width: 380px;
	border-radius: 10px;
	border: 1px solid rgba(0, 0, 0, 0.2);
}
```

![](https://user-images.githubusercontent.com/76736580/152643745-3d5ed4f2-bc1a-4186-9599-b19877aecaf4.png)

Yay! ?? but wait there's more. So I'll style the other stuff too.

```css
.header {
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.title {
	margin: 0;
	font-size: 20px;
	font-weight: 400;
	color: rgb(33, 37, 41);
}
.close {
	border: none;
	background: transparent
		url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23000'%3e%3cpath d='M.293.293a1 1 0 011.414 0L8 6.586 14.293.293a1 1 0 111.414 1.414L9.414 8l6.293 6.293a1 1 0 01-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 01-1.414-1.414L6.586 8 .293 1.707a1 1 0 010-1.414z'/%3e%3c/svg%3e")
		center/1em auto no-repeat;
	height: 32px;
	width: 32px;
	opacity: 0.6;
	border-radius: 4px;
}
.close:hover {
	opacity: 1;
}
.close:focus {
	box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
	opacity: 1;
}

.footer {
	display: grid;
}
```

So far we have this,  
![](https://user-images.githubusercontent.com/76736580/152643994-28558caf-2107-4659-808b-e932cd990317.png)

Now, I'll create an SCSS mixin for the buttons.

```css
@mixin button($color) {
	color: #fff;
	background: $color;
	&:hover {
		background: darken($color, 10%);
	}
	&:active {
		background: darken($color, 20%);
	}
	&:focus {
		box-shadow: 0px 0px 0px 4px rgba($color, 0.5);
	}
}

.btn {
	padding: 0.5rem 1rem;
	margin-bottom: 10px;
	border: none;
	font-size: 1.25rem;
	font-family: inherit;
	border-radius: 4px;
	transition: all 0.2s ease;
	background: transparent;

	&:focus {
		box-shadow: 0px 0px 0px 4px rgba(211, 212, 213, 0.5);
	}

	&.primary {
		@include button(#0d6efd);
	}
}
```

And we're done!

![](https://user-images.githubusercontent.com/76736580/152644279-65b554f1-4c4d-46b9-9179-92b642ea455a.png)

So you see how easy was that? You just need some patience and some effort and you can build optimized websites fast. So see you next time!
