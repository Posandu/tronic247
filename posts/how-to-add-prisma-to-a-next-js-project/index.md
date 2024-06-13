---
title: How to add Prisma to a Next.js project
date: '2022-12-11'
categories: ['mysql', 'javascript']
tags: ['database', 'mysql', 'prisma', 'nextjs']
img: /wp-content/uploads/2022/12/Adding-Prisma-to-a-Next.js-project.png
updated: '2024-06-13'
---

In this article, you will learn how to add Prisma to a Next.js project. You will learn how to set up Prisma and connect it to a MySQL database. Let's get started!

## Contents

## What is Prisma?

[Prisma](https://www.prisma.io/) is an open-source database toolkit that makes it easy to query data from a database inside a TypeScript application. For example, you can use Prisma to query data from a MySQL database inside a Next.js application. Instead of writing plain SQL like this:

```sql
SELECT * FROM User WHERE id = 1
```

You can write the same query using Prisma's query builder like this:

```ts
const user = await prisma.user.findUnique({
	where: {
		id: 1
	}
});
```

And did I mention that Prisma is TypeScript-first? That means that you get full type-safety and auto-completion in your editor when writing queries. It's cool!

## Prerequisites

This tutorial assumes that you have the following tools installed:

- [Node.js](https://nodejs.org/en/)
- [pnpm](https://pnpm.io/) (or [npm](https://www.npmjs.com/)
- [Git](https://git-scm.com/)

And a MySQL database. If you don't have a MySQL database, you can use [PlanetScale](https://planetscale.com/) to get a free database.

## Step 1: Create a Next.js project

First, let's create a Next.js project. I will use the [Next.js Starter](https://github.com/Posandu/nextjs-starter) for this tutorial. You can use any Next.js project.

```bash
git clone https://github.com/Posandu/nextjs-starter.git nextjs-prisma && cd nextjs-prisma
```

You now have a Next.js project with TypeScript and ESLint set up. Let's add Prisma to this project.

## Step 2: Add Prisma to the project

Next, let's add Prisma to the project. First, install the Prisma CLI:

```bash
pnpm install prisma --save-dev
```

We need to initialize Prisma in the project. Run the following command:

```bash
pnpx prisma init
```

This will create a `prisma` directory in the project. The `prisma` directory contains a `schema.prisma` file. This file contains the database schema. You can edit this file to change the database schema.

Also, it will create a `.env` file in the root of the project. This file contains the database connection URL. You can edit this file to change the database connection URL. In PlanetScale, you can find the database connection URL after creating a database.

![](https://user-images.githubusercontent.com/76736580/206892281-7e00e09a-2a15-450a-a885-6828d1f0a390.png)

Click connect in the dashboard to get the connection URL.

![](https://user-images.githubusercontent.com/76736580/206892315-22d77d77-089e-4126-a0a8-3ae626147303.png)

In the modal, select the `Prisma` option and copy the connection URL.

![](https://user-images.githubusercontent.com/76736580/206892391-bb6f3b77-2eb8-48ce-9197-ebf1d953922a.png)

Now, open the `.env` file and paste the connection URL in the `.env` file.

```env
DATABASE_URL='mysql://************:**********************@us-east.connect.psdb.cloud/mini-shop?sslaccept=strict'
```

Now, you can connect to the database using Prisma.

## Step 3: Create a database schema

The `schema.prisma` file contains the database schema. You can edit this file to change the database schema. For our mini shop, we need a `Product` model. Let's add a `Product` model to the `schema.prisma` file.

```prisma
model Product {
  id        Int      @id @default(autoincrement())
  name      String
  price     Int
  img       String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

The SQL equivalent of this schema is:

```sql
CREATE TABLE "Product" (
  "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "name" TEXT NOT NULL,
  "price" INTEGER NOT NULL,
  "img" TEXT NOT NULL,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL
);
```

Now you won't regret using Prisma ?.

And oh, you need to change

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

to

```prisma
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
```

Because we are using MySQL.

## Step 4: Push the database schema

Now that we have a database schema, let's push it to the database. Run the following command:

```bash
pnpx prisma db push
```

It will push the database schema.

## Step 5: Install Prisma Client

Now that we have a database schema, let's install Prisma Client. We need Prisma Client to query the database. Run the following command:

```bash
pnpm install @prisma/client
```

And generate the types for Prisma Client:

```bash
pnpx prisma generate
```

## Step 6: Add Prisma to the Next.js project

Create a folder called `lib` and create a file called `prisma.ts` in the `lib` folder. This file will contain the Prisma Client instance. Add the following code to the `prisma.ts` file:

```ts
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
	if (!global.prisma) {
		global.prisma = new PrismaClient();
	}
	prisma = global.prisma;
}
export default prisma;
```

This code will create a Prisma Client instance and export it.

For including the prisma client in the project easily, we will add a typescript path alias. Add the following code to the `tsconfig.json` file:

```json
{
	"compilerOptions": {
		"baseUrl": ".",
		"paths": {
			"@/*": ["components/*"],
			"$/*": ["utils/*"],
			"db": ["lib/prisma"]
		}
	}
}
```

Now, we can import the Prisma Client instance using `import prisma from "db"`.

## Query the database

Run the following command to start the development server:

```bash
pnpm dev
```

We will create the API routes for creating a product and getting all the products. Add the following codes to the `pages/api` folder:

### `pages/api/createProduct.ts`

This API route will create a product in the database.

```ts
import prisma from 'db';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
	success: boolean;
	info?: any;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	let { name, img, price } = req.body;

	if (!name || !img || !price) {
		res.status(200).json({ success: false });
	}

	price = parseInt(price);

	await prisma.product.create({
		data: {
			name,
			img,
			price
		}
	});

	res.status(200).json({ success: true });
}
```

### `pages/api/getProducts.ts`

```ts
import prisma from 'db';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
	success: boolean;
	data?: any;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	try {
		const products = await prisma.product.findMany();
		res.status(200).json({ success: true, data: products });
	} catch (error) {
		res.status(200).json({ success: false });
	}
}
```

This API route will get all the products from the database.

Now let's create a page to create a product and get all the products. Add the following code to the `pages` folder:

### `pages/index.tsx`

```tsx
import { Box, Button, Container, Flex, Grid, Heading, Text } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import ColormodeToggle from '@/colormodeToggle';

const Home: NextPage = () => {
	const [items, setItems] = useState([]);

	useEffect(() => {
		fetch('/api/getProducts')
			.then((res) => res.json())
			.then(({ data }) => setItems(data));
	}, []);

	return (
		<Container maxW="4xl" p={4}>
			<Grid templateColumns="repeat(3, 1fr)" gap={4} mb={4}>
				<Heading>Home</Heading>

				<Link href="/add">
					<Button colorScheme="teal" variant="outline">
						Add product
					</Button>
				</Link>

				<Flex justifyContent="flex-end">
					<ColormodeToggle />
				</Flex>
			</Grid>

			<Grid templateColumns="repeat(3, 1fr)" gap={4}>
				{items &&
					items.map((item: any) => (
						<Box key={item.id} p={4} shadow="md" borderWidth="1px">
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img src={item.img} alt={item.name} />
							<Text fontSize="xl">{item.name}</Text>
							<Text fontSize="lg">{item.price}</Text>
							<Button colorScheme="teal" variant="outline">
								Add to cart
							</Button>
						</Box>
					))}

				{!items.length && (
					<Box p={4} shadow="md" borderWidth="1px">
						<Text fontSize="xl">No items found</Text>
					</Box>
				)}
			</Grid>
		</Container>
	);
};

export default Home;
```

This page will show all the products in the database. We will also add a button to create a product.

### `pages/add.tsx`

```tsx
import { Box, Button, Container, Flex, Grid, Heading, Input, Text } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useState } from 'react';

import ColormodeToggle from '@/colormodeToggle';

const Home: NextPage = () => {
	const [data, setData] = useState({
		name: '',
		price: '',
		img: ''
	});

	const add = () => {
		fetch('/api/createProduct', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
			.then((res) => res.json())
			.then(({ data }) => console.log(data));
	};

	return (
		<Container maxW="4xl" p={4}>
			<Grid templateColumns="repeat(3, 1fr)" gap={4} mb={4}>
				<Heading>Add product</Heading>

				<Link href="/">
					<Button colorScheme="teal" variant="outline">
						Return to home
					</Button>
				</Link>

				<Flex justifyContent="flex-end">
					<ColormodeToggle />
				</Flex>
			</Grid>

			{['name', 'price', 'img'].map((item) => (
				<Box key={item}>
					<Text fontSize="xl">{item.replace(/^\w/, (c) => c.toUpperCase())}</Text>

					<Input
						placeholder={item}
						value={
							// @ts-ignore
							data[item]
						}
						onChange={(e) => setData({ ...data, [item]: e.target.value })}
						mb={4}
					/>
				</Box>
			))}

			<Button colorScheme="teal" onClick={add}>
				Add
			</Button>
		</Container>
	);
};

export default Home;
```

This page will allow us to create a product. We will add a button to return to the home page.

Now, add some products to the database from the `/add` page.

After adding some products, you should see something like this:

![](https://user-images.githubusercontent.com/76736580/206902355-4c8e9dd9-6019-4966-bd2a-1a8784d7ac2f.png)

It works! Now, you can improve some stuff like adding a cart page, adding a delete button, etc.

## Conclusion

You can find the complete code on [GitHub](https://github.com/Posandu/prisma-nextjs-tutorial). And if you have any questions, feel free to ask them in the comments or on [Twitter](https://twitter.com/Posandu).

If you liked this tutorial, please consider supporting me on [Buy Me a Coffee](https://www.buymeacoffee.com/posandu).

Thanks for reading!
