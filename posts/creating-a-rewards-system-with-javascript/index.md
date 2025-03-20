---
title: Creating a rewards system with JavaScript
date: '2023-01-03'
categories: ['css', 'html-tutorials', 'javascript', 'mysql']
tags: ['database', 'mysql', 'prisma', 'rewards', 'system', 'javascript', 'nextjs']
img: /wp-content/uploads/2023/01/Create-a-daily-badge-rewards-system.png
updated: '2024-06-13'
excerpt: A tutorial on how to create a daily badge rewards system with TypeScript, Prisma, and Next.js.
---

Losing users is a common problem for many apps. One way to keep users engaged is to reward them for their daily activities. A lot of apps do this by giving users a daily login bonus such as XP, coins, or a free award/badge. Some sites like coinmarketcap.com even give users a daily badge for visiting their site.

![](https://user-images.githubusercontent.com/76736580/212539495-995133a1-9c44-421a-b7be-d948102481af.png)

This is a great way to keep users engaged and coming back to your app every day. In this tutorial, we will be creating a daily badge rewards system for your users with JavaScript. The result will look like this:

![](https://user-images.githubusercontent.com/76736580/212539513-3b61fb84-598d-4431-8156-b609ac6bf7e4.png)



## Prerequisites

Before we get started, you will need to have some prior knowledge of the following.

- Next.js
- Prisma

## Getting Started

Before, we start. We need to plan out the rewards system. I made a simple logic to determine the rewards. The logic is as follows:

- Every day, when the user logs in, they will see a button to claim their daily reward.
- The reward will be a badge of the day.
- The badge will be different every day.
- A user can only claim their reward once a day but they can have many badges of the same type.
- The user can claim their reward anytime during the day.

We will be using Next.js and Prisma to build this app. And for the badges, I made some png images using Stable Diffusion. Those images are saved inside a folder called `badges` and contain the files.

```
?badges
 ┣ ?0.png <--- 0.png is the first badge (Monday)
 ┣ ?1.png
 ┣ ?2.png
 ┣ ?3.png
 ┣ ?4.png
 ┣ ?5.png
 ┗ ?6.png <--- 6.png is the last badge (Sunday)
```

## Setting up the project

First, we need to start a new Next.js project with Prisma. Previously, I wrote a tutorial on how to set up a Next.js project with Prisma. You can check it out [here](https://www.tronic247.com/how-to-add-prisma-to-a-next-js-project/). We will clone the git repo and install the dependencies.

```bash
git clone https://github.com/Posandu/prisma-nextjs-tutorial.git badge && cd badge && pnpm i
```

You can use `npm` or `yarn` instead of `pnpm` if you want.

Now we need to make our database schema. Open the `schema.prisma` located in the `prisma` folder and add the following code.

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model CollectedBadges {
  badgeId     Int
  userId      Int
  collectedAt DateTime @default(now())
  id          Int      @id @default(autoincrement())
}

model Users {
  id          Int    @id @default(autoincrement())
  name        String
  lastBadgeId Int?
}
```

We have two models in our schema. The `CollectedBadges` model will store the badges that the user has collected. The `Users` model will store the user's name and the last badge that they collected. The `lastBadgeId` field will be used to determine the next badge that the user will collect.

For example, if the user collected the badge for Monday, the `lastBadgeId` will be the ID of the last collected badge ID received from the `CollectedBadges` model.

![](https://user-images.githubusercontent.com/76736580/212940923-284ee8f7-b2fd-4e22-abb4-25f8600b56e4.png)

Oh, and we also need to add the `DATABASE_URL` environment variable to our `.env` file. Use the below format in your `.env` file.

```
DATABASE_URL='mysql://username:password@host:port/database'
```

Now we can migrate our database schema.

```bash
pnpm prisma db push
```

This will create all the required tables and columns in our database.

## Creating the frontend

Start the development server.

```bash
pnpm dev
```

![](https://user-images.githubusercontent.com/76736580/212947415-5a879343-de5a-471b-a1d7-7b2c428548dd.png)

Now, we need to create the pages. We will create two pages. Delete all the folders and files inside the `pages` folder except the `_app.tsx`,`_document.tsx`, and `index.tsx` files.

Copy the badges folder into the `public` folder. This will make the badges available to the public.

Edit the `index.tsx` file and add the following code.

```tsx
import {
	Box,
	Button,
	Container,
	Flex,
	Grid,
	Heading,
	Text,
	useColorModeValue,
	useToast
} from '@chakra-ui/react';
import type { NextPage } from 'next';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import ColormodeToggle from '@/colormodeToggle';

type Data = {
	collected: {
		m: number;
		t: number;
		w: number;
		th: number;
		f: number;
		s: number;
		su: number;
	};
};

const Home: NextPage = () => {
	const [collectedData, setCollectedData] = useState<Data>();
	const [update, setUpdate] = useState(0);
	const toast = useToast();

	const days = ['m', 't', 'w', 'th', 'f', 's', 'su'];

	useEffect(() => {
		fetch('/api/getCollectedBadges')
			.then((r) => r.json())
			.then((res) => {
				setCollectedData(res as Data);
				console.log(res);
			})
			.catch(() => {
				toast({
					title: 'Error',
					description: 'There was an error getting the badges',
					status: 'error',
					duration: 5000,
					isClosable: true
				});
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [update]);

	const boxBorder = useColorModeValue('gray.300', 'gray.700');
	const textColor = useColorModeValue('gray.600', 'gray.400');

	return (
		<Container maxW="6xl" p={4}>
			<Grid templateColumns="repeat(3, 1fr)" gap={4} mb={4}>
				<Heading>Welcome user!</Heading>

				<Flex justifyContent="flex-end">
					<ColormodeToggle />
				</Flex>
			</Grid>

			<Heading my={8} size="md">
				Here are the available badges
			</Heading>

			<Grid templateColumns="repeat(7, 1fr)" gap={4}>
				{[...Array(7)].map((_, i) => (
					<Box
						key={i}
						borderRadius="md"
						shadow="md"
						border="1px"
						borderColor={boxBorder}
						p={4}
						_hover={{
							shadow: 'lg'
						}}
					>
						<Image src={`/badges/${i}.png`} alt="badge" width={200} height={200} />

						<Text align="center" my={4}>
							{'Mon|Tues|Wenes|Thurs|Fri|Satur|Sun'.split('|')[i] + 'day'}
						</Text>

						<Text align="center" color={textColor}>
							{
								//@ts-ignore
								collectedData?.collected[days[i]]
							}{' '}
							collected
						</Text>
					</Box>
				))}
			</Grid>

			<Button
				mt={4}
				colorScheme="blue"
				onClick={() => {
					fetch('/api/collect')
						.then((r) => r.json())
						.then((res) => {
							if (res.collected) {
								toast({
									title: 'Success',
									description: 'You have collected a badge',
									status: 'success',
									duration: 5000,
									isClosable: true
								});

								setUpdate((prev) => prev + 1);
							} else {
								toast({
									title: 'Error',
									description: "You have already collected today's badge",
									status: 'error',
									duration: 5000,
									isClosable: true
								});
							}
						});
				}}
			>
				Collect badge
			</Button>
		</Container>
	);
};

export default Home;
```

Here we are fetching the badges from the API and displaying them. We are also adding a button to collect the badge which will call the API to collect the badge.

You will notice some error messages because we haven't created the API yet ?. Let's do that now.

## Creating the API

The first thing we need to do is create a new folder in the `pages` folder called `api`. This is where we will store all of our API routes. The first API is `collect.ts` which will be used to collect the badge.

We first import the types and the database library.

```ts
import prisma from 'db';
import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * Type for the response
 */
type Data = {
	collected: boolean;
	date?: any;
};
```

Then we create the handler function which will be called when the API is called. We make it async because we use the `await` keyword.

```ts
const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	// ...
};
```

We define a constant named `USER_ID` which will be used to identify the user. We use a static value for now because we haven't implemented authentication yet. Before we continue, you need to manually create a user in the database. You can do this by running the following command in the terminal.

```bash
npx prisma studio
```

This will open the Prisma Studio. You can then create a user by clicking on the add button.

![](https://user-images.githubusercontent.com/76736580/212959236-f656504d-6b25-43e0-8fb2-ed11f5f38bca.png)

After you have created the user, you can get the ID of the user by clicking on the user and copying the ID. In my case, the ID is `1`.

```ts
const USER_ID = 1;
```

Then we define some functions.

```ts
// Get server date
const serverDate = new Date();

// Get the number of the day name starting from monday
const dayNumber = serverDate.getDay() === 0 ? 7 : serverDate.getDay(); // 1-7
```

The `dayNumber` contains the number of the day starting from Monday. We do this because the database stores the days starting from Monday. If the day is Sunday, we set it to 7.

We then get the last collected badge ID of that user.

```ts
// Get user's last collected item
const lastCollected = await prisma.users.findUnique({
	where: { id: USER_ID }
});
```

Then the below code is self-explanatory.

```ts
let lastCollectedDate = new Date();

if (lastCollected?.lastBadgeId) {
	const data = await prisma.collectedBadges.findUnique({
		where: { id: lastCollected.lastBadgeId }
	});

	if (data) {
		lastCollectedDate = new Date(data.collectedAt);
	}
} else {
	// New user
	const data = await prisma.collectedBadges.create({
		data: {
			userId: USER_ID,
			badgeId: dayNumber
		}
	});

	await prisma.users.update({
		where: { id: USER_ID },
		data: {
			lastBadgeId: data.id
		}
	});

	return res.status(200).json({
		collected: true
	});
}

// If the last collected item is from today, return false
if (
	lastCollectedDate.getDate() === serverDate.getDate() && // Same day
	lastCollectedDate.getMonth() === serverDate.getMonth() && // Same month
	lastCollectedDate.getFullYear() === serverDate.getFullYear() // Same year
) {
	return res.status(200).json({
		collected: false,
		date: {
			lastCollectedDate,
			serverDate
		}
	});
} else {
	// Create new collected badge
	const data = await prisma.collectedBadges.create({
		data: {
			userId: USER_ID,
			badgeId: dayNumber
		}
	});

	// Update user's last collected badge id
	await prisma.users.update({
		where: { id: USER_ID },
		data: {
			lastBadgeId: data.id
		}
	});

	return res.status(200).json({
		collected: true
	});
}
```

After we have defined the handler function, we export it.

```ts
export default handler;
```

That's it for the `collect.ts` API. Now save the file and try clicking on the collect badge button. You should see a success message. Now if you explore the database, you will see that a new badge has been added to the `collectedBadges` table.

![](https://user-images.githubusercontent.com/76736580/213163139-6f5eabf6-31c4-49eb-ab2b-cd7507ec10a7.png)

Nice! Now let's create the next API which will be used to get the badges.

Create a new file called `getCollectedBadges.ts` in the `pages/api` folder. Then add the following code.

```ts
import prisma from 'db';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
	collected: {
		m: number;
		t: number;
		w: number;
		th: number;
		f: number;
		s: number;
		su: number;
	};
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const USER_ID = 1; // TODO: get user id from session

	const badges = await prisma.collectedBadges.findMany({
		where: {
			userId: USER_ID
		},
		select: {
			badgeId: true,
			collectedAt: false,
			id: false,
			userId: false
		}
	});

	const dateC = (d: number) => badges.filter((badge) => badge.badgeId === d).length;

	const collected = {
		m: dateC(1),
		t: dateC(2),
		w: dateC(3),
		th: dateC(4),
		f: dateC(5),
		s: dateC(6),
		su: dateC(7)
	};

	return res.status(200).json({
		collected
	});
};

export default handler;
```

The code is self-explanatory. We get the badges from the database and then return them. Now save the file and try refreshing the page. You should see the badges with the count.

![](https://user-images.githubusercontent.com/76736580/213163984-a96fc65c-2aea-4066-9a95-fbe2b7ab9694.png)

That's it for the API.

## Conclusion

So, that's a wrap for this tutorial. I hope you enjoyed it. If you have any questions, feel free to ask them in the comments. The code for this tutorial is available on [GitHub](https://github.com/Posandu/badges-app-tutorial).

Connect with me on [Twitter](https://twitter.com/Posandu) and [GitHub](https://github.com/Posandu)

Cheers!
