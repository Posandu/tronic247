---
title: 'Create the sidebar in Google drive with CSS and HTML'
date: '2021-09-20'
categories: ['css', 'html-tutorials', 'tricks-and-tips']
tags: ['clone', 'css']
img: /wp-content/uploads/2021/09/google_drive_sidebar_clone.png
---

In this post, you will learn how to create the sidebar in Google drive with CSS and HTML.

## Preparing the HTML

First, let's create a `div` with the class `sidebar`. This is where we put our code.

```html
<div class="sidebar">
	<!-- Code -->
</div>
```

Then, we'll add the primary button inside the `div`.

```html
<button class="new-btn">
	<span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36"><path fill="#34A853" d="M16 16v14h4V20z"/><path fill="#4285F4" d="M30 16H20l-4 4h14z"/><path fill="#FBBC05" d="M6 16v4h10l4-4z"/><path fill="#EA4335" d="M20 16V6h-4v14z"/><path fill="none" d="M0 0h36v36H0z"/></svg></span></span>
	<span class="name">New</span>
</button>
```

We are using a `button` element and two `span` elements inside that. One for the icon and one for the label.

Now create another `div` element with the class `items` and add an item like this.

```html
<a class="item active">
	<span class="icon"
		><svg width="24px" height="24px" viewBox="0 0 24 24" fill="#000000" focusable="false">
			<path
				d="M19 2H5C3.9 2 3 2.9 3 4V20C3 21.1 3.9 22 5 22H19C20.1 22 21 21.1 21 20V4C21 2.9 20.1 2 19 2ZM19 20H5V19H19V20ZM19 17H5V4H19V17Z"
			></path>
			<path
				d="M13.1215 6H10.8785C10.5514 6 10.271 6.18692 10.0841 6.46729L7.14019 11.6075C7 11.8878 7 12.215 7.14019 12.4953L8.26168 14.4579C8.40187 14.7383 8.72897 14.9252 9.05608 14.9252H15.0374C15.3645 14.9252 15.6449 14.7383 15.8318 14.4579L16.9533 12.4953C17.0935 12.215 17.0935 11.8878 16.9533 11.6075L13.9159 6.46729C13.7757 6.18692 13.4486 6 13.1215 6ZM10.1776 12.0748L12.0467 8.8972L13.8692 12.0748H10.1776Z"
			></path></svg
	></span>
	<span class="name">My Drive</span>
</a>
```

Now, repeat this step 4 times. (Check below to get the final code)

Then the final code will look like this

```html
<div class="items">
	<a class="item active">
		<span class="icon"
			><svg width="24px" height="24px" viewBox="0 0 24 24" fill="#000000" focusable="false">
				<path
					d="M19 2H5C3.9 2 3 2.9 3 4V20C3 21.1 3.9 22 5 22H19C20.1 22 21 21.1 21 20V4C21 2.9 20.1 2 19 2ZM19 20H5V19H19V20ZM19 17H5V4H19V17Z"
				></path>
				<path
					d="M13.1215 6H10.8785C10.5514 6 10.271 6.18692 10.0841 6.46729L7.14019 11.6075C7 11.8878 7 12.215 7.14019 12.4953L8.26168 14.4579C8.40187 14.7383 8.72897 14.9252 9.05608 14.9252H15.0374C15.3645 14.9252 15.6449 14.7383 15.8318 14.4579L16.9533 12.4953C17.0935 12.215 17.0935 11.8878 16.9533 11.6075L13.9159 6.46729C13.7757 6.18692 13.4486 6 13.1215 6ZM10.1776 12.0748L12.0467 8.8972L13.8692 12.0748H10.1776Z"
				></path></svg
		></span>
		<span class="name">My Drive</span>
	</a>
	<a class="item">
		<span class="icon"
			><svg width="24px" height="24px" viewBox="0 0 24 24" fill="#000000" focusable="false">
				<path d="M0 0h24v24H0z" fill="none"></path>
				<path
					d="M4 6h18V4H4c-1.1 0-2 .9-2 2v11H0v3h14v-3H4V6zm19 2h-6c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1zm-1 9h-4v-7h4v7z"
				></path></svg
		></span>
		<span class="name">Computers</span>
	</a>
	<a class="item">
		<span class="icon"
			><svg width="24px" height="24px" viewBox="0 0 24 24" fill="#000000" focusable="false">
				<path d="M0 0h24v24H0z" fill="none"></path>
				<path
					xmlns="http://www.w3.org/2000/svg"
					d="M15 8c0-1.42-.5-2.73-1.33-3.76.42-.14.86-.24 1.33-.24 2.21 0 4 1.79 4 4s-1.79 4-4 4c-.43 0-.84-.09-1.23-.21-.03-.01-.06-.02-.1-.03A5.98 5.98 0 0 0 15 8zm1.66 5.13C18.03 14.06 19 15.32 19 17v3h4v-3c0-2.18-3.58-3.47-6.34-3.87zM9 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2m0 9c-2.7 0-5.8 1.29-6 2.01V18h12v-1c-.2-.71-3.3-2-6-2M9 4c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4zm0 9c2.67 0 8 1.34 8 4v3H1v-3c0-2.66 5.33-4 8-4z"
				></path></svg
		></span>
		<span class="name">Shared with me</span>
	</a>
	<a class="item">
		<span class="icon"
			><svg width="24px" height="24px" viewBox="0 0 24 24" fill="#000000" focusable="false">
				<path
					d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
				></path>
				<path d="M0 0h24v24H0z" fill="none"></path>
				<path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path></svg
		></span>
		<span class="name">Recent</span>
	</a>
	<a class="item">
		<span class="icon"
			><svg width="24px" height="24px" viewBox="0 0 24 24" focusable="false" fill="#000000">
				<path
					d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"
				></path></svg
		></span>
		<span class="name">Starred</span>
	</a>
	<a class="item">
		<span class="icon"
			><svg
				width="24px"
				height="24px"
				viewBox="0 0 24 24"
				fill="#000000"
				focusable="false"
				class=" "
			>
				<path d="M0 0h24v24H0z" fill="none"></path>
				<path
					d="M15 4V3H9v1H4v2h1v13c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V6h1V4h-5zm2 15H7V6h10v13z"
				></path>
				<path d="M9 8h2v9H9zm4 0h2v9h-2z" style=""></path></svg
		></span>
		<span class="name">Trash</span>
	</a>
	<div class="divider"></div>
</div>
```

After doing that, add this code after the `div` with the class `items`.

```html
<div class="items">
	<a class="item">
		<span class="icon"
			><svg width="24px" height="24px" viewBox="0 0 24 24" focusable="false" fill="#6f6f6f">
				<path d="M0 0h24v24H0z" fill="none"></path>
				<path
					d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4s1.79-4 4-4h.71C7.37 7.69 9.48 6 12 6c3.04 0 5.5 2.46 5.5 5.5v.5H19c1.66 0 3 1.34 3 3s-1.34 3-3 3z"
				></path></svg
		></span>
		<span class="name">Storage</span>
	</a>
</div>

<div class="bottom">
	<div class="progress" style="--v:1%"></div>
	<span class="meta-text">312.9 MB of 15 GB used</span>
	<button class="outlined-button">Buy Storage</button>
</div>
```

Now here's our full code.

```html
<div class="sidebar">
	<button class="new-btn">
		<span class="icon"
			><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36">
				<path fill="#34A853" d="M16 16v14h4V20z" />
				<path fill="#4285F4" d="M30 16H20l-4 4h14z" />
				<path fill="#FBBC05" d="M6 16v4h10l4-4z" />
				<path fill="#EA4335" d="M20 16V6h-4v14z" />
				<path fill="none" d="M0 0h36v36H0z" /></svg
		></span>
		<span class="name">New</span>
	</button>

	<div class="items">
		<a class="item active">
			<span class="icon"
				><svg width="24px" height="24px" viewBox="0 0 24 24" fill="#000000" focusable="false">
					<path
						d="M19 2H5C3.9 2 3 2.9 3 4V20C3 21.1 3.9 22 5 22H19C20.1 22 21 21.1 21 20V4C21 2.9 20.1 2 19 2ZM19 20H5V19H19V20ZM19 17H5V4H19V17Z"
					></path>
					<path
						d="M13.1215 6H10.8785C10.5514 6 10.271 6.18692 10.0841 6.46729L7.14019 11.6075C7 11.8878 7 12.215 7.14019 12.4953L8.26168 14.4579C8.40187 14.7383 8.72897 14.9252 9.05608 14.9252H15.0374C15.3645 14.9252 15.6449 14.7383 15.8318 14.4579L16.9533 12.4953C17.0935 12.215 17.0935 11.8878 16.9533 11.6075L13.9159 6.46729C13.7757 6.18692 13.4486 6 13.1215 6ZM10.1776 12.0748L12.0467 8.8972L13.8692 12.0748H10.1776Z"
					></path></svg
			></span>
			<span class="name">My Drive</span>
		</a>
		<a class="item">
			<span class="icon"
				><svg width="24px" height="24px" viewBox="0 0 24 24" fill="#000000" focusable="false">
					<path d="M0 0h24v24H0z" fill="none"></path>
					<path
						d="M4 6h18V4H4c-1.1 0-2 .9-2 2v11H0v3h14v-3H4V6zm19 2h-6c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1zm-1 9h-4v-7h4v7z"
					></path></svg
			></span>
			<span class="name">Computers</span>
		</a>
		<a class="item">
			<span class="icon"
				><svg width="24px" height="24px" viewBox="0 0 24 24" fill="#000000" focusable="false">
					<path d="M0 0h24v24H0z" fill="none"></path>
					<path
						xmlns="http://www.w3.org/2000/svg"
						d="M15 8c0-1.42-.5-2.73-1.33-3.76.42-.14.86-.24 1.33-.24 2.21 0 4 1.79 4 4s-1.79 4-4 4c-.43 0-.84-.09-1.23-.21-.03-.01-.06-.02-.1-.03A5.98 5.98 0 0 0 15 8zm1.66 5.13C18.03 14.06 19 15.32 19 17v3h4v-3c0-2.18-3.58-3.47-6.34-3.87zM9 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2m0 9c-2.7 0-5.8 1.29-6 2.01V18h12v-1c-.2-.71-3.3-2-6-2M9 4c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4zm0 9c2.67 0 8 1.34 8 4v3H1v-3c0-2.66 5.33-4 8-4z"
					></path></svg
			></span>
			<span class="name">Shared with me</span>
		</a>
		<a class="item">
			<span class="icon"
				><svg width="24px" height="24px" viewBox="0 0 24 24" fill="#000000" focusable="false">
					<path
						d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
					></path>
					<path d="M0 0h24v24H0z" fill="none"></path>
					<path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path></svg
			></span>
			<span class="name">Recent</span>
		</a>
		<a class="item">
			<span class="icon"
				><svg width="24px" height="24px" viewBox="0 0 24 24" focusable="false" fill="#000000">
					<path
						d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"
					></path></svg
			></span>
			<span class="name">Starred</span>
		</a>
		<a class="item">
			<span class="icon"
				><svg
					width="24px"
					height="24px"
					viewBox="0 0 24 24"
					fill="#000000"
					focusable="false"
					class=" "
				>
					<path d="M0 0h24v24H0z" fill="none"></path>
					<path
						d="M15 4V3H9v1H4v2h1v13c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V6h1V4h-5zm2 15H7V6h10v13z"
					></path>
					<path d="M9 8h2v9H9zm4 0h2v9h-2z" style=""></path></svg
			></span>
			<span class="name">Trash</span>
		</a>
		<div class="divider"></div>
	</div>

	<div class="items">
		<a class="item">
			<span class="icon"
				><svg width="24px" height="24px" viewBox="0 0 24 24" focusable="false" fill="#6f6f6f">
					<path d="M0 0h24v24H0z" fill="none"></path>
					<path
						d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4s1.79-4 4-4h.71C7.37 7.69 9.48 6 12 6c3.04 0 5.5 2.46 5.5 5.5v.5H19c1.66 0 3 1.34 3 3s-1.34 3-3 3z"
					></path></svg
			></span>
			<span class="name">Storage</span>
		</a>
	</div>

	<div class="bottom">
		<div class="progress" style="--v:1%"></div>
		<span class="meta-text">312.9 MB of 15 GB used</span>
		<button class="outlined-button">Buy Storage</button>
	</div>
	<!-- Code -->
</div>
```

Don't worry ! We'll style this

## Styling the HTML

Now that we created our HTML, we can style it.

First, we'll start with the primary button.

```css
.new-btn {
	display: flex;
	align-items: center;
	margin-left: 8px;
	margin-top: 10px;
	margin-bottom: 10px;
	box-shadow:
		0 1px 2px 0 rgba(60, 64, 67, 0.302),
		0 1px 3px 1px rgba(60, 64, 67, 0.149);
	border: none;
	background: white;
	padding: 5px 16px;
	border-radius: 100px;
	transition: all 0.2s ease;
	cursor: pointer;
}
.new-btn * {
	pointer-events: none;
}
.new-btn:hover {
	box-shadow:
		0 1px 3px 0 rgba(60, 64, 67, 0.302),
		0 4px 8px 3px rgba(60, 64, 67, 0.149);
	background: #f8f9fa;
}
.new-btn:focus {
	background-color: #f8f9fa;
}
.new-btn:active {
	background-color: #e8f0fe;
}
.new-btn .icon {
	margin-right: 10px;
}
.new-btn .name {
	font-size: 14px;
	font-weight: 500;
	margin-right: 9px;
	color: #3c4043;
}
```

The thing we are doing to center the content inside the button is simple, We add `display:flex` to the button and `align-items:center` so we can center the items. Then, we do the basic styling. After that, we can see the result like this.

![Our button!](https://user-images.githubusercontent.com/76736580/133988452-df027150-b6a4-45d2-9a7b-721b3a1edc80.png)

Then we must style the items with the same logic we used for the button.

```css
.items {
	display: block;
	max-height: 54vh;
	overflow: auto;
	margin-top: 10px;
}

.item {
	display: flex;
	align-items: center;
	padding: 6px 26px;
	background: white;
	border-radius: 0px 100px 100px 0px;
	cursor: pointer;
	transition: all 0.041s ease;
	justify-content: flex-start;
}
.item.active {
	background: #e8f0fe;
}
.item.active .name {
	color: #226ed4;
}
.item.active .icon svg {
	fill: #226ed4;
}
.item .name {
	font-weight: 600;
	font-size: 13px;
	margin-left: 20px;
	color: #5f6368;
}
.item * {
	pointer-events: none;
}
.item .icon svg {
	fill: #5f6368;
}
.item:not(.active):hover {
	background: rgba(0, 0, 0, 0.04);
}
```

We will get a result like this.

![The list](https://user-images.githubusercontent.com/76736580/133988734-751fbf7a-ba3a-4608-b9ff-68531f7434d8.png)

Then for the divider use this code.

```css
.divider {
	background: #dadce0;
	width: 100%;
	height: 1px;
	margin-top: 6px;
	margin-bottom: 2px;
}
```

We use `background` instead of `border` is because we can customize it more easily hard but nice than `border`.

Then, we style the progress bar.

```css
.progress {
	height: 4px;
	background: #e0e0e0;
	border-radius: 4px;
	margin-bottom: 13px;
	position: relative;
	overflow: hidden;
	margin-top: 7px;
}
.progress:after {
	content: '';
	position: absolute;
	height: 100%;
	width: var(--v, 0%);
	background: #1a73e8;
}
```

After that, the progress bar will look like this.

![The progress bar](https://user-images.githubusercontent.com/76736580/133989294-d894fe60-122b-4381-b335-6433d6379197.png)

We use a `div` because the native `progress` isn't fully customizable.

Then let's customize the other elements using the CSS code below.

```css
.meta-text {
	font-size: 13px;
	color: #5f6368;
	display: block;
	margin-bottom: 13px;
}
.outlined-button {
	border: 1px solid #dadce0;
	color: #15c;
	background: white;
	border-radius: 4px;
	padding: 10px 23px;
	font-size: 14px;
	font-weight: 500;
	cursor: pointer;
	transition: all 0.2s ease;
}
.outlined-button:hover {
	border-color: #dadce0;
	color: #185abc;
	background: #f6f9fe;
}
.outlined-button:active {
	background: #e3eefd;
}
.outlined-button:focus {
	background: #e3eefd;
}
```

And I almost forgot! we must import the [Roboto](https://fonts.google.com/specimen/Roboto?query=roboto) font. Add this code to `head` of the body.

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
	href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap"
	rel="stylesheet"
/>
```

If you are confused about what the code does, It imports the fonts and preloads them so the page load is faster.

## Finally

Phew ! We're finished :D here's what we got

![Our result](https://user-images.githubusercontent.com/76736580/133990237-ea791b2b-8bf8-40ed-ab27-43d7d18a776b.png)

Now that you know how to create the sidebar in Google drive with CSS and HTML, That's all for now.
