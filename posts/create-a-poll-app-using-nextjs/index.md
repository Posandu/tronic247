---
title: Poll App using Next.js
date: '2022-10-09'
categories: ['html-tutorials', 'javascript', 'nextjs', 'mysql']
tags: ['apps', 'css', 'frontend', 'javascript', 'mysql', 'react', 'nextjs']
img: /wp-content/uploads/2022/10/Create-a-poll-app.png
updated: '2024-06-13'
---

## Intro

In this tutorial, we'll make a poll app using NextJS, Prisma and MySQL. You can find the final code in the end of this article.

## Contents

## Prerequisites

You need some basic understanding of NextJS and TypeScript.

## Getting Started

First, we clone our starter code

```bash
git clone https://github.com/Posandu/nextjs-starter.git .
```

Then, we install the dependencies

```bash
npm install
```

After some time, we can run the development server

```bash
npm run dev
```

You can now view the app at [http://localhost:3000](http://localhost:3000) and you should see the following:

![](https://user-images.githubusercontent.com/76736580/194739102-11e84f12-e527-40dd-9d18-9da0393aee92.png)

## Database

We will be using a SQL database for this project. For running queries, we will be using Prisma. Prisma is an ORM that allows us to run queries simply. I will be using MySQL for this project, but you can use any SQL database you want.

So first, we need to install the Prisma CLI

```bash
npm install prisma --save-dev
```

Then, we need to initialize the Prisma CLI

```bash
npx prisma init
```

This will create a `prisma` folder in the root directory. Inside this folder, we will find a schema.prisma file. This file contains the schema of our database. We will be using the following schema for this project:

```prisma
model Poll {
  id        Int      @id @default(autoincrement())
  title     String
  createdAt DateTime @default(now())
  choices   String
}

model Vote {
  id        Int      @id @default(autoincrement())
  pollId    Int
  choice    String
}
```

That is, we have a `Poll` model and a Vote model. The `Poll` model contains the title of the poll and the choices. The Vote model contains the poll id, the choice, and the id of the vote.

Now set your data credentials in the .env file.

```env
DATABASE_URL="myqsl://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
```

After that, we need to migrate our database. This will create the tables in our database.

```bash
npx prisma migrate dev
```

Now the tables are created, we need to install the Prisma client

```bash
npm install @prisma/client
```

Now create a file `utils/prisma.ts` and add the following code:

```typescript
import { PrismaClient } from '@prisma/client';

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
//
// Learn more:
// https://pris.ly/d/help/next-js-best-practices

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
	prisma = new PrismaClient();
} else {
	// @ts-ignore
	if (!global.prisma) {
		// @ts-ignore
		global.prisma = new PrismaClient();
	}
	// @ts-ignore
	prisma = global.prisma;
}
export default prisma;
```

This will create a singleton instance of the Prisma client. This will prevent us from creating multiple instances of the Prisma client. Now if you go to `index.tsx` and import the client, you should see autocompletion for the Prisma client.

![](https://user-images.githubusercontent.com/76736580/194740388-25f6cbeb-2d87-4f4e-9662-65f93b0a143f.png)

## UI

Let's create a header that we will use on all the pages. Create a file `components/header/index.tsx` and add the following code:

```tsx
import ColormodeToggle from '@/colormodeToggle';
import { Box, Button, Flex } from '@chakra-ui/react';
import Link from 'next/link';

const Header = () => {
	return (
		<Flex mt={6}>
			<Box>
				<Link href="/">
					<Button variant="ghost">Polls</Button>
				</Link>
			</Box>

			<Box ml="auto">
				<Link href="/createPoll">
					<Button mr={4}>Create Poll</Button>
				</Link>

				<ColormodeToggle />
			</Box>
		</Flex>
	);
};

export default Header;
```

The header will look like this:

![](https://user-images.githubusercontent.com/76736580/194740832-7454cae3-61a2-4bb4-a92e-c5897aa60942.png)

Now let's create a page for creating a poll. Create a file `pages/createPoll.tsx` and add the following code:

```tsx
import { Alert, Button, Container, Flex, Heading, Input, Stack, StackItem } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Header from '@/header';
import { useState } from 'react';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';

const Home: NextPage = () => {
	const [title, setTitle] = useState('Do you like this poll?');
	const [options, setOptions] = useState(['Yes', 'No']);
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const submit = () => {
		setError('');

		// Validate title
		if (title.length < 5 || title.length > 60) {
			setError('Title must be between 5 and 100 characters');
			return;
		}

		// Validate options
		if (options.some((option) => option.length < 1 || option.length > 60)) {
			setError('Options must be between 1 and 30 characters');
			return;
		}

		// ... TODO: Send to API
	};

	return (
		<Container maxW="container.lg">
			<Header />

			<Container maxW="container.md" mt={6} shadow="lg" p={8} rounded="2xl">
				<Heading mb={4}>Create Poll</Heading>

				<Heading my={4} size="md">
					Title (Max 60)
				</Heading>

				<Input placeholder="Poll Title" value={title} onChange={(e) => setTitle(e.target.value)} />

				<Heading my={4} size="md">
					Options (Minimum 2, Maximum 10)
				</Heading>
				<Stack spacing={4}>
					{options.map((option, index) => (
						<StackItem key={index}>
							<Flex>
								<Input
									placeholder="Option"
									value={option}
									onChange={(e) => {
										const newOptions = [...options];
										newOptions[index] = e.target.value;
										setOptions(newOptions);
									}}
								/>

								<Stack direction="row" ml={2}>
									<Button
										onClick={() => {
											const newOptions = [...options];
											newOptions.splice(index, 1);
											setOptions(newOptions);
										}}
										disabled={options.length <= 2}
										colorScheme="red"
										variant="ghost"
									>
										<DeleteIcon />
									</Button>

									<Button
										onClick={() => {
											const newOptions = [...options];
											newOptions.push('');
											setOptions(newOptions);
										}}
										disabled={options.length >= 10 || index !== options.length - 1}
										colorScheme="green"
									>
										<AddIcon />
									</Button>
								</Stack>
							</Flex>
						</StackItem>
					))}
				</Stack>

				{error && (
					<Alert mt={4} status="error">
						{error}
					</Alert>
				)}

				<Button mt={4} colorScheme="blue" onClick={submit} isLoading={loading} disabled={loading}>
					Create Poll
				</Button>
			</Container>
		</Container>
	);
};

export default Home;
```

The page will look like this:

![](https://user-images.githubusercontent.com/76736580/194741709-af785836-5558-40da-b678-7010b9fbf84f.png)

This page also has validation for the title and options. The validation is pretty simple, but it's good enough for now.

Now let's create a page for viewing a poll. Create a file `pages/poll/[id].tsx` and add the following code:

```tsx
import Header from '@/header';
import { Button, Container, Heading, Progress, Stack, StackItem } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';

const Home: NextPage = () => {
	const router = useRouter();
	const { id } = router.query;

	const [pollData, setPollData] = useState({
		title: 'Sample Poll',
		options: [
			{
				name: 'Sample Option',
				votes: 40
			},
			{
				name: 'Sample Option 2',
				votes: 60
			}
		]
	});

	const [voted, setVoted] = useState(false);
	const [loading, setLoading] = useState(false);

	const totalVotes = pollData.options.reduce((acc, option) => acc + option.votes, 0);

	const maxIndex = pollData.options.reduce((acc, option, index) => {
		if (option.votes > pollData.options[acc].votes) {
			return index;
		}
		return acc;
	}, 0);

	const castVote = (index: number) => {
		setLoading(true);

		// TODO
		setTimeout(() => {
			setLoading(false);
			setVoted(true);
		}, 4000);
	};

	return (
		<Container maxW="container.lg">
			<Header />

			<Container maxW="container.md" mt={6} shadow="lg" p={8} rounded="2xl">
				<Heading my={4}>{pollData.title}</Heading>
				{voted ? (
					<Stack spacing={4} mb={4}>
						{pollData.options.map((option, index) => (
							<StackItem key={index} pos="relative">
								<Progress
									colorScheme={index === maxIndex ? 'green' : 'blue'}
									value={option.votes}
									height="8"
									max={totalVotes}
								/>
								<Heading size="sm" pos="absolute" top="0" mt="1" ml="2">
									{option.name}
								</Heading>
							</StackItem>
						))}
					</Stack>
				) : (
					<Stack spacing={2} mb={4}>
						{pollData.options.map((option, index) => (
							<Button
								key={index}
								onClick={() => castVote(index)}
								isLoading={loading}
								loadingText="Casting Vote"
								disabled={loading}
							>
								{option.name}
							</Button>
						))}
					</Stack>
				)}
			</Container>
		</Container>
	);
};

export default Home;
```

The page will look like this:

![](https://user-images.githubusercontent.com/76736580/194742813-87828802-52b0-4c06-9716-58e43fd0a58b.png)

Now, we've done the frontend. Let's move on to the backend.

## Backend

We will create 3 API endpoints for our backend. The first one will be for creating a poll. The second one will be for getting a poll. The third one will be for voting in a poll.

The first is for creating a poll. Create a file `pages/api/createPoll.ts` and add the following code:

```ts
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '$/prisma';

type Data = {
	message: string;
	error: boolean;
	data?: any;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	// Check if the request is a POST request
	if (req.method !== 'POST') {
		res.status(200).json({ message: 'Method not allowed', error: true });
		return;
	}

	// Check if the parameters `title` and `options` are present
	if (!req.body.title || !req.body.options) {
		res.status(200).json({ message: 'Missing parameters', error: true });
		return;
	}

	const { title, options } = req.body;

	// Check if the title is not empty
	if (title.length < 5 || title.length > 60) {
		res.status(200).json({
			message: 'Title must be between 5 and 60 characters',
			error: true
		});
		return;
	}

	// Check if the options are not empty
	if (options.length < 2 || options.length > 10) {
		res.status(200).json({
			message: 'You must provide between 2 and 10 options',
			error: true
		});
		return;
	}

	// Check if the options are not empty
	if (options.some((option: string) => option.length < 1 || option.length > 60)) {
		res.status(200).json({
			message: 'Options must be between 1 and 60 characters',
			error: true
		});
		return;
	}

	// Create the poll
	const data = await prisma.poll.create({
		data: {
			title,
			choices: options.join(',')
		}
	});

	res.status(200).json({ message: 'Poll created', error: false, data });
}
```

This endpoint will create a poll in the database. It will also return the poll ID. We will use this ID to get the poll data and to vote in the poll.

Now, quickly go to the `createPoll.tsx` and replace the submit function with the following code:

```ts
const submit = () => {
	setError('');

	// Validate title
	if (title.length < 5 || title.length > 60) {
		setError('Title must be between 5 and 100 characters');
		return;
	}

	// Validate options
	if (options.some((option) => option.length < 1 || option.length > 60)) {
		setError('Options must be between 1 and 30 characters');
		return;
	}

	type Data = {
		message: string;
		error: boolean;
		data?: any;
	};

	// API
	fetch('/api/createPoll', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			title,
			options
		})
	})
		.then((res) => res.json())
		.then((res) => {
			const resp: Data = res as any as Data;

			if (resp.error) {
				setError(resp.message);
			} else {
				window.location.href = `/poll/${resp.data.id}`;
			}
		});
};
```

If you go to the `/createPoll` page, you will see that the poll is created and you are redirected to the poll page.

So I make sure it was created by opening prisma studio.

```bash
npx prisma studio
```

![](https://user-images.githubusercontent.com/76736580/194743366-3b3b3b3b-3b3b-4b3b-3b3b-3b3b3b3b3b3b.png)

It works!

Now, let's create the second endpoint. This endpoint will be for getting a poll. Create a file `pages/api/getPoll.ts` and add the following code:

```ts
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '$/prisma';

type Data = {
	message: string;
	error: boolean;
	data?: any;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	// Check if the request is a POST request
	if (req.method !== 'POST') {
		res.status(200).json({ message: 'Method not allowed', error: true });
		return;
	}

	// Check if the parameter `id` is present
	if (!req.body.id) {
		res.status(200).json({ message: 'Missing parameters', error: true });
		return;
	}

	const { id } = req.body;

	// Get the poll
	const data = await prisma.poll.findUnique({
		where: {
			id: parseInt(id)
		}
	});

	// Check if the poll exists
	if (!data) {
		res.status(200).json({ message: 'Poll not found', error: true });
		return;
	}

	res.status(200).json({ message: 'Poll found', error: false, data });
}
```

After creating this endpoint, edit the `poll/[id].tsx` file and add the following code inside the function

```tsx
// ... imports
import { useEffect, useState } from 'react';

useEffect(() => {
	fetch(`/api/getPoll/`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			id
		})
	})
		.then((res) => res.json())
		.then((_data) => {
			type Data = {
				message: string;
				error: boolean;
				data?: any;
			};

			const data: Data = _data;

			if (!data.error) {
				const options = data.data.choices.split(',').map((choice: any) => {
					return {
						name: choice,
						votes: 0
					};
				});

				setPollData({
					...data.data,
					options
				});

				setLoading(false);
			}
		});
}, [id]);
```

This code will fetch the poll data from the database and set it to the pollData state. If no poll is found, it will just keep the loading state as `true`. (You can add a 404 page if you want)

Now, the last step is to update the `poll/[id].tsx` file to show the poll data. You can replace the whole file with the following code:

```tsx
import Header from '@/header';
import { Button, Container, Heading, Progress, Spinner, Stack, StackItem } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Home: NextPage = () => {
	const router = useRouter();
	const id = router.query.id;

	type Vote = {
		choice: string;
		votes: number;
	};

	type Poll = {
		title: string;
		choices: string[];
		id: string;
	};

	const [poll, setPoll] = useState<Poll>({} as Poll);
	const [votes, setVotes] = useState<Vote[]>([]);
	const [loading, setLoading] = useState(true);
	const [voted, setVoted] = useState(false);
	const [totalVotes, setTotalVotes] = useState(0);

	useEffect(() => {
		if (document.cookie.includes('voted_' + id)) {
			setVoted(true);
		}

		if (id) {
			fetch(`/api/getPoll`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ id })
			})
				.then((res) => res.json())
				.then(({ data }) => {
					data.choices = data.choices.split(',');
					setPoll(data);
					setLoading(false);

					const votes: Vote[] = [];

					data.choices.forEach((choice: any) => {
						const obj = {
							choice,
							votes: [...data.votes].filter((vote) => vote.choice === choice).length
						};

						votes.push(obj);
					});

					setVotes(votes);
					setTotalVotes(data.votes.length);
				});
		}
	}, [id]);

	function castVote(option: string) {
		fetch(`/api/castVote`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ option, id: poll.id })
		})
			.then((res) => res.json())
			.then(({ data }) => {
				const votes: Vote[] = [];

				poll.choices.forEach((choice) => {
					const obj = {
						choice,
						votes: [...data].filter((vote) => vote.choice === choice).length
					};

					votes.push(obj);
				});

				setVotes(votes);
				setVoted(true);
				setTotalVotes(data.length);

				document.cookie = 'voted_' + id + '=true';
			});
	}

	return (
		<Container maxW="container.lg">
			<Header />

			<Container maxW="container.md" mt={6} shadow="lg" p={8} rounded="2xl">
				{loading && <Spinner size="xl" />}

				{!loading && (
					<>
						<Heading my={4}>{poll.title}</Heading>
						{voted ? (
							<Stack spacing={4} mb={4}>
								{poll.choices.map((option, index) => (
									<StackItem key={index} pos="relative">
										<Progress
											colorScheme={'blue'}
											value={votes.find((vote) => vote.choice === option)?.votes}
											height="8"
											max={totalVotes}
										/>
										<Heading size="sm" pos="absolute" top="0" mt="1" ml="2">
											{option} ({votes.find((vote) => vote.choice === option)?.votes})
										</Heading>
									</StackItem>
								))}
							</Stack>
						) : (
							<Stack spacing={2} mb={4}>
								{poll.choices.map((option) => (
									<Button
										key={option}
										onClick={() => castVote(option)}
										isLoading={loading}
										loadingText="Casting Vote"
										disabled={loading}
									>
										{option}
									</Button>
								))}
							</Stack>
						)}
					</>
				)}
			</Container>
		</Container>
	);
};

export default Home;
```

Now save it and you're done!

![](https://user-images.githubusercontent.com/76736580/194750599-6ba820b9-ab85-4a0a-b6cb-b7d511d401d5.png)

## Conclusion

In this tutorial, we learned how to create a full-stack poll app using Next.js, TypeScript, and MySQL. We learned how to create a Next.js app and how to connect the Next.js app to the database. You can also add more features to this app like user authentication, IP address tracking, and more. I hope you enjoyed this tutorial. Thanks for reading!

The final code can be found [here](https://github.com/Posandu/poll-app-tutorial).
