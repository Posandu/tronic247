---
title: Firebase authentication in Next.js
date: '2022-11-15'
categories: ['html-tutorials', 'javascript', 'nextjs']
tags: ['frontend', 'javascript', 'nextjs']
img: /wp-content/uploads/2022/11/Adding-Firebase-auth-to-a-Next.js-project.png
updated: '2024-06-13'
excerpt: A tutorial on how to add Firebase authentication to a Next.js app.
---

In this tutorial, we'll learn how to add Firebase authentication to a Next.js app. We'll use Firebase's authentication service to create a login page with Google authentication.

## Prerequisites

- `pnpm` installed globally - _you still can use npm or yarn but make sure to replace `pnpm` with `npm` or `yarn` accordingly_

The first thing is to create a Next.js app. I'm going to create one app using the following command.

```
pnpm create next-app
```

## Adding Firebase

After creating the app, we need to create a Firebase project. Go to the [Firebase console](https://console.firebase.google.com/) and create a new project. After creating it, you should be able to see the project dashboard.

Now, go to Build > Authentication and enable the Google sign-in method. You can enable other sign-in methods as well. But, for this tutorial, we will only use the Google sign-in method.

![](https://user-images.githubusercontent.com/76736580/201916923-3487692f-1cda-4b9e-a250-6c6059486736.png)

Nice! Now, we need to create a Firebase app. Go to Project settings > General and click on the `</>` icon to add a new app.

![](https://user-images.githubusercontent.com/76736580/201917627-ed8a559a-67ec-44b7-973c-7c5aa19e5615.png)

Now, you should be able to see the Firebase SDK snippet. Go to the Next.js app and create a new file called `firebaseConfig.js` in the root directory. Copy the Firebase SDK snippet and paste it into the `firebaseConfig.js` file. And then, export the config by adding the following code to the `firebaseConfig.js` file.

```js
export { app, firebaseConfig };
```

After that, install the Firebase SDK for the Web using the following command.

```
pnpm install firebase
```

We now have the Firebase SDK installed. The next thing is to add authentication to the app.

## Adding authentication

Go to the `firebaseConfig.js` file and add the following code.

```js
import { initializeApp } from 'firebase/app';

// Auth
import { getAuth } from 'firebase/auth';

// ...

// Auth
const auth = getAuth();

export { app, firebaseConfig, auth };
```

Open the app by running the following command.

```
pnpm run dev
```

Let's edit the `pages/index.js` file and add the following code.

```js
export default function Home() {
	return (
		<div>
			<h1>Firebase Auth Tutorial</h1>
			<p>This is a tutorial on how to use Firebase Auth in a Next.js app.</p>

			<p>Click the button below to sign in with Google.</p>

			<button>Sign in with Google</button>

			<p>Debug info:</p>

			<pre></pre>
		</div>
	);
}
```

We have a minimal UI.

![](https://user-images.githubusercontent.com/76736580/201920187-322d710d-f50e-42ab-af43-ae8944028a1f.png)

We now add the sign-in functionality. Go to the `pages/index.js` file and add replace the code with the following code.

```js
import { auth } from '../firebaseConfig';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useState } from 'react';

export default function Home() {
	const [user, setUser] = useState(null);
	const [log, setLog] = useState('Logs...');
	const provider = new GoogleAuthProvider();

	const addLog = (log) => {
		setLog((prev) => prev + '\n' + JSON.stringify(log));
	};

	const signInWithGoogle = () => {
		signInWithPopup(auth, provider)
			.then((result) => {
				setUser(result);
			})
			.catch((error) => {
				addLog(error.message);
			});
	};

	return (
		<div>
			<h1>Firebase Auth Tutorial</h1>
			<p>This is a tutorial on how to use Firebase Auth in a Next.js app.</p>

			<p>Click the button below to sign in with Google.</p>

			<button
				onClick={() => {
					signInWithGoogle();
				}}
			>
				Sign in with Google
			</button>

			<p>Debug info:</p>

			{user && <p>User: {JSON.stringify(user)}</p>}

			<pre>
				<code>{log}</code>
			</pre>
		</div>
	);
}
```

We have added the `signInWithGoogle` function. Now, we need to add the `onClick` event to the button. We also added a `pre` tag to display the debug info.

Try clicking the button. You should be able to see the following.

![](https://user-images.githubusercontent.com/76736580/201921975-51330893-abde-4203-83a5-c07871deb44d.png)

After signing in, you should be able to see the user object in the debug info.

![](https://user-images.githubusercontent.com/76736580/201923415-03e4ecf3-47b6-46e2-bd94-30cbb534b962.png)

We can use that user object to get the user's name, email, and profile picture.

```js
{
	user && (
		<div>
			<h1>Welcome {user.user.displayName}</h1>
			<img src={user.user.photoURL} alt="user photo" />
		</div>
	);
}
```

![](https://user-images.githubusercontent.com/76736580/201923621-075ff307-7c45-46e7-a02d-d219a0351f07.png)

And that's it! We have successfully added authentication to a Next.js app using Firebase.

## Conclusion

In this tutorial, we learned how to add authentication to a Next.js app using Firebase. We also learned how to get the user's name, email, and profile picture. The code for this tutorial is available on [GitHub](https://github.com/Posandu/nextjs-firebase-auth-tutorial).

Connect with me

- [Twitter](https://twitter.com/Posandu)
- [GitHub](https://github.com/Posandu)
