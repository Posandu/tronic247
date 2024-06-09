---
title: "Glassmorphism login form with CSS"
date: "2021-09-22"
categories: ['css']
tags: ['css', 'glass', 'login']
---

In this article, you will learn how to create a Glassmorphism login form with CSS. Look below to see how it looks like.

![](https://user-images.githubusercontent.com/76736580/134297757-b162e3c7-aa5a-4445-ab29-fbf8c75fc96a.gif)

scroll down to the end if you want to get the code.

## Let's get started

First, as usual, we will prepare the HTML before we style it. We will create a `div` with the class `main` for the container and add a `div` with the class `login` for the login form. Now the code looks like this.

```
<div class="main">
	<div class="login">
	</div>
</div>
```

Then add a `h1` with the class `heading` for the heading. Inside the `h1` tag, type _Login to your account_ or **whatever you want.** Now, there's a heading.

Time for the most important component! .... It's the inputs (username, password).

For the `input`s we will create a `div` with the class `input`. And add a `label` and an `input` inside it. The component will look like this.

```
<div class="input">
	<label>Username</label>
	<input/>
</div>
```

Now that isn't fully complete without the attributes.

```
<div class="input">
    <label for="username">Username</label>
    <input type="text" id="username" autocomplete="false" />
</div>
```

We will create two inputs like this one for the username and one for the password.

```
<div class="input">
    <label for="username">Username</label>
    <input type="text" id="username" autocomplete="false" />
</div>

<div class="input">
    <label for="password">Password</label>
    <input type="password" id="password" autocomplete="false" />
</div>
```

Now there are inputs.

STOP TALKING inputs,inputs.. OK, It's over.

Then, after those i\*\*\*\*\*. We'll add the submit `button` with the class `login-btn`. And inside that type login or submit.

After the button add this other stuff.

```
<div class="social-icons">
 <button class="social-icon fb"><svg fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="30px" height="30px">    <path d="M15,3C8.373,3,3,8.373,3,15c0,6.016,4.432,10.984,10.206,11.852V18.18h-2.969v-3.154h2.969v-2.099c0-3.475,1.693-5,4.581-5 c1.383,0,2.115,0.103,2.461,0.149v2.753h-1.97c-1.226,0-1.654,1.163-1.654,2.473v1.724h3.593L19.73,18.18h-3.106v8.697 C22.481,26.083,27,21.075,27,15C27,8.373,21.627,3,15,3z"/></svg></button>
 <button class="social-icon pr"><svg fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="30px" height="30px"><path d="M25,2C12.318,2,2,12.317,2,25s10.318,23,23,23s23-10.317,23-23S37.682,2,25,2z M27.542,32.719c-3.297,0-4.516-2.138-4.516-2.138s-0.588,2.309-1.021,3.95s-0.507,1.665-0.927,2.591c-0.471,1.039-1.626,2.674-1.966,3.177c-0.271,0.401-0.607,0.735-0.804,0.696c-0.197-0.038-0.197-0.245-0.245-0.678c-0.066-0.595-0.258-2.594-0.166-3.946c0.06-0.88,0.367-2.371,0.367-2.371l2.225-9.108c-1.368-2.807-0.246-7.192,2.871-7.192c2.211,0,2.79,2.001,2.113,4.406c-0.301,1.073-1.246,4.082-1.275,4.224c-0.029,0.142-0.099,0.442-0.083,0.738c0,0.878,0.671,2.672,2.995,2.672c3.744,0,5.517-5.535,5.517-9.237c0-2.977-1.892-6.573-7.416-6.573c-5.628,0-8.732,4.283-8.732,8.214c0,2.205,0.87,3.091,1.273,3.577c0.328,0.395,0.162,0.774,0.162,0.774l-0.355,1.425c-0.131,0.471-0.552,0.713-1.143,0.368C15.824,27.948,13,26.752,13,21.649C13,16.42,17.926,11,25.571,11C31.64,11,37,14.817,37,21.001C37,28.635,32.232,32.719,27.542,32.719z"/></svg></button>
 <button class="social-icon in"><svg fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px">    <path d="M 8 3 C 5.239 3 3 5.239 3 8 L 3 16 C 3 18.761 5.239 21 8 21 L 16 21 C 18.761 21 21 18.761 21 16 L 21 8 C 21 5.239 18.761 3 16 3 L 8 3 z M 18 5 C 18.552 5 19 5.448 19 6 C 19 6.552 18.552 7 18 7 C 17.448 7 17 6.552 17 6 C 17 5.448 17.448 5 18 5 z M 12 7 C 14.761 7 17 9.239 17 12 C 17 14.761 14.761 17 12 17 C 9.239 17 7 14.761 7 12 C 7 9.239 9.239 7 12 7 z M 12 9 A 3 3 0 0 0 9 12 A 3 3 0 0 0 12 15 A 3 3 0 0 0 15 12 A 3 3 0 0 0 12 9 z"/></svg></button>
</div>
```

Yay! We finished our HTML (50% complete). Our full code looks like this

```
<div class="main">
 <div class="login">
  <h1 class="heading">Login to your account</h1>
  <div class="input">
   <label for="username">Username</label>
   <input type="text" id="username" autocomplete="false" />
  </div>
  <div class="input">
   <label for="password">Password</label>
   <input type="password" id="password" autocomplete="false" />
  </div>
  <div class="divider"></div>
  <button class="login-btn">Log In</button>
  <p class="meta-text">Too lazy ? Login with a social media account</p>
  <div class="social-icons">
   <button class="social-icon fb">
    <svg fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="30px" height="30px">
     <path
      d="M15,3C8.373,3,3,8.373,3,15c0,6.016,4.432,10.984,10.206,11.852V18.18h-2.969v-3.154h2.969v-2.099c0-3.475,1.693-5,4.581-5 c1.383,0,2.115,0.103,2.461,0.149v2.753h-1.97c-1.226,0-1.654,1.163-1.654,2.473v1.724h3.593L19.73,18.18h-3.106v8.697 C22.481,26.083,27,21.075,27,15C27,8.373,21.627,3,15,3z"
     />
    </svg>
   </button>
   <button class="social-icon pr">
    <svg fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="30px" height="30px">
     <path
      d="M25,2C12.318,2,2,12.317,2,25s10.318,23,23,23s23-10.317,23-23S37.682,2,25,2z M27.542,32.719c-3.297,0-4.516-2.138-4.516-2.138s-0.588,2.309-1.021,3.95s-0.507,1.665-0.927,2.591c-0.471,1.039-1.626,2.674-1.966,3.177c-0.271,0.401-0.607,0.735-0.804,0.696c-0.197-0.038-0.197-0.245-0.245-0.678c-0.066-0.595-0.258-2.594-0.166-3.946c0.06-0.88,0.367-2.371,0.367-2.371l2.225-9.108c-1.368-2.807-0.246-7.192,2.871-7.192c2.211,0,2.79,2.001,2.113,4.406c-0.301,1.073-1.246,4.082-1.275,4.224c-0.029,0.142-0.099,0.442-0.083,0.738c0,0.878,0.671,2.672,2.995,2.672c3.744,0,5.517-5.535,5.517-9.237c0-2.977-1.892-6.573-7.416-6.573c-5.628,0-8.732,4.283-8.732,8.214c0,2.205,0.87,3.091,1.273,3.577c0.328,0.395,0.162,0.774,0.162,0.774l-0.355,1.425c-0.131,0.471-0.552,0.713-1.143,0.368C15.824,27.948,13,26.752,13,21.649C13,16.42,17.926,11,25.571,11C31.64,11,37,14.817,37,21.001C37,28.635,32.232,32.719,27.542,32.719z"
     />
    </svg>
   </button>
   <button class="social-icon in">
    <svg fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px">
     <path
      d="M 8 3 C 5.239 3 3 5.239 3 8 L 3 16 C 3 18.761 5.239 21 8 21 L 16 21 C 18.761 21 21 18.761 21 16 L 21 8 C 21 5.239 18.761 3 16 3 L 8 3 z M 18 5 C 18.552 5 19 5.448 19 6 C 19 6.552 18.552 7 18 7 C 17.448 7 17 6.552 17 6 C 17 5.448 17.448 5 18 5 z M 12 7 C 14.761 7 17 9.239 17 12 C 17 14.761 14.761 17 12 17 C 9.239 17 7 14.761 7 12 C 7 9.239 9.239 7 12 7 z M 12 9 A 3 3 0 0 0 9 12 A 3 3 0 0 0 12 15 A 3 3 0 0 0 15 12 A 3 3 0 0 0 12 9 z"
     />
    </svg>
   </button>
  </div>
 </div>
</div>
```

## Time for the CSS

First, we import the [Poppins font](https://fonts.google.com/specimen/Poppins) and reset the layout like this.

```
@import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");
*,
:before,
:after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: inherit;
}
body {
    font-family: "Poppins", sans-serif;
}
```

Then we style the login form and the background like this.

```
.main {
    height: 100vh;
    width: 100%;
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: center;
    background: url(https://images.unsplash.com/photo-1506452305024-9d3f02d1c9b5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80);
    background-size: cover;
    background-repeat: no-repeat;
}
.login {
    position: relative;
    background: #686d6f7a;
    padding: 35px 40px;
    border-radius: 4px;
    z-index: 1;
    overflow: hidden;
    box-shadow: 0px 12px 31px #ffffff52, 0px 36px 31px #000000a1;
    animation: login 0.88s ease;
}
@keyframes login {
    0% {
        transform: translateY(-10%) scale(0.8);
        opacity: 0;
    }
    100% {
        transform: scale(1);
        opacity: 1;
    }
}
.login:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background: url(https://images.unsplash.com/photo-1506452305024-9d3f02d1c9b5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80);
    width: 100%;
    z-index: -1;
    background-size: 182vh;
    background-position: 28%, 83%;
    filter: blur(24px);
    background-repeat: no-repeat;
    opacity: 0.8;
}
```

Now we have our glass-like login form and background. It looks like this.

![](https://user-images.githubusercontent.com/76736580/134303015-25341e08-a393-4c2b-a707-018509dde343.png)

Nice. Then, we style the heading.

```
.heading {
    font-size: 24px;
    font-weight: 400;
    text-align: center;
    margin-bottom: 18px;
    color: white;
}
```

After that, the inputs.

```
.input {
    display: block;
    margin-bottom: 13px;
    margin-top: 11px;
}
.input label {
    display: block;
    margin-bottom: 3px;
    font-size: 13px;
    color: white;
    cursor: pointer;
}
.input input {
    width: 100%;
    padding: 10px;
    outline: none;
    border: none;
    font-size: 15px;
    border-radius: 4px;
    background: #0000002b;
    color: white;
    transition: all 0.2s ease;
}
.input input:hover {
    background: #3d434c;
}
.input input:focus {
    box-shadow: 0px 2px 2px #0000002b, 0px 5px 10px #00000036;
    background: #434343;
}
```

Now, we can see a beautifully designed login page like this. (80% done)

![](https://user-images.githubusercontent.com/76736580/134307557-ffbc5e7a-3b0f-4947-a51a-45e0346a0b21.png)

Then we style the buttons and the meta text.

```
.login-btn {
    margin-top: 10px;
    margin-bottom: 15px;
    padding: 8px 15px;
    font-size: 14px;
    background: #00000038;
    border: 2px solid #38363654;
    color: #e1e1e1;
    border-radius: 4px;
    width: 100%;
    transition: all 0.2s cubic-bezier(0.79, 0.14, 0.15, 0.86);
    cursor: pointer;
}
.login-btn:hover {
    background: #0663b4;
    transition: all 0.1s ease;
}
.login-btn:focus {
    box-shadow: 0px 0px 0px 2px #a7a7a7b5;
    background: #00000061;
}
.meta-text {
    font-size: 13px;
    margin-bottom: 15px;
    color: white;
}
.social-icons {
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
}
.social-icon {
    min-height: 40px;
    background: var(--c);
    margin-right: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 40px;
    max-width: 40px;
    max-height: 40px;
    border-radius: 28px;
    box-shadow: 0px 4px 8px #0c0b0b00;
    transition: all 0.2s ease;
    border: none;
    outline: none;
}
.social-icon:hover {
    box-shadow: 0px 4px 14px #0000007a;
}
.social-icon:focus {
    box-shadow: 0px 0px 0px 2px currentColor;
    transform: scale(0.9);
}
.social-icon * {
    pointer-events: none;
    fill: #fff;
}
.social-icon.fb {
    --c: #4267b2;
}
.social-icon.pr {
    --c: #e60023;
}
.social-icon.in {
    --c: #5b51d8;
}
```

Okay. We finished our work. Here is the full code so you can copy-paste it easily.

<script src="https://gist.github.com/posandu/c91f19f03d04da0d9a31ca24d308d28f.js"></script>

That's all for now then. You know now how to create a [Glassmorphism login form with CSS.](https://www.tronic247.com/glassmorphism-login-form-with-css/)
