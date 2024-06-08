Drizzle ORM is a lightweight, fast, and easy-to-use ORM for Node.js, written in TypeScript. It supports all major databases, including MySQL, PostgreSQL, SQLite, and MongoDB. It's also a good alternative to Prisma. In this article, we'll learn how to use Drizzle ORM with SvelteKit.

## Setting up the project

First, we'll need to create a new SvelteKit project.

```bash
npm create svelte@latest
```

Select the following options when prompted:

```bash
create-svelte version 5.3.2

┌  Welcome to SvelteKit!
│
◇  Where should we create your project?
│  .
│
◇  Which Svelte app template?
│  Skeleton project
│
◇  Add type checking with TypeScript?
│  Yes, using TypeScript syntax
│
◇  Select additional options (use arrow keys/space bar)
│  none
│
└  Your project is ready!
```

We can now install Drizzle ORM and its dependencies. We'll use a [https://planetscale.com/](https://planetscale.com/) database for this tutorial, but you can use any database you want. Just make sure to install the appropriate driver.

```bash
npm i drizzle-orm @planetscale/database
```

We first need to set up our database credentials. Create a `.env` file in the root of your project and add the following:

```bash
DATABASE_HOST= # your database host
DATABASE_USERNAME= # your database username
DATABASE_PASSWORD= # your database password
```

Next, we'll need to create 2 files in our project: `src/lib/server/db.ts` and `src/lib/server/schema.ts`. The first file will contain our database connection, and the second will contain our database schema.

Let's start with `src/lib/server/db.ts`. Add the following code to the file:

```ts
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";
import {
    DATABASE_HOST,
    DATABASE_PASSWORD,
    DATABASE_USERNAME,
} from "$env/static/private";

// create the connection
const connection = connect({
    host: DATABASE_HOST,
    username: DATABASE_USERNAME,
    password: DATABASE_PASSWORD,
});

const db = drizzle(connection);

export default db;
```

This code is pretty straightforward. We import the `drizzle` function from `drizzle-orm/planetscale-serverless`, which is the driver we'll be using. And we import the `connect` function from `@planetscale/database`, which is provided by the Planetscale SDK. We then create a connection to our database using the `connect` function and pass it to the `drizzle` function to create our database object.

Also, notice that we're importing our database credentials from the `.env` file via imports 🤯 that's a cool feature of SvelteKit!

Next, let's create our database schema. We'll make a simple todo app because that's what everyone does when they're learning a new framework 😅

Create a `src/lib/server/schema.ts` file and add the following code:

```ts
import {
    boolean,
    timestamp,
    int,
    mysqlTable,
    varchar,
} from "drizzle-orm/mysql-core";

export const todos = mysqlTable("todos", {
    id: int("id").autoincrement().primaryKey(),
    content: varchar("title", { length: 600 }).notNull(),
    completed: boolean("completed").notNull().default(false),
    createdAt: timestamp("created_at").defaultNow(),
});
```

We're using the `boolean`, `timestamp`, `int`, and `varchar` functions from `drizzle-orm/mysql-core` to create our table columns. We then use the `mysqlTable` function to create our table. This function takes 2 arguments: the table name and an object containing the table columns. We're also using the `autoincrement`, `primaryKey`, `notNull`, and `default` functions to set the appropriate constraints on our columns.

Did you also notice that this schema is written in TypeScript? That's another cool feature of Drizzle ORM! We can write our schema in TypeScript, and Drizzle ORM will automatically generate the SQL for us. This is a huge improvement over Prisma, which requires us to write our schema in a custom DSL. Here's the SQL that Drizzle ORM generates for us:

```sql
CREATE TABLE `todos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(600) NOT NULL,
  `completed` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);
```

Now, that we're done with our database schema, we need to push it to our database. We can do this with the tool provided by Drizzle called `drizzle-kit`. Install it by running the following command:

```bash
npm i drizzle-kit dotenv mysql2
```

Next, we need to create a `drizzle.config.ts` file at the root of our project. Add the following code to the file:

```ts
import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config();

export default {
    schema: "./src/lib/server/schema.ts",
    out: "./drizzle",
    driver: "mysql2",
    dbCredentials: {
        uri: `mysql://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}/${process.env.DATABASE_NAME}?ssl={"rejectUnauthorized":true}`,
    },
} satisfies Config;
```

You also need to update the `.env` file with the following

```bash
DATABASE_NAME= # your database name
```

Now update the `package.json` file with the following scripts:

```json
{
    "scripts": {
        "db:push": "drizzle-kit push:mysql",
        "db:studio": "drizzle-kit studio"
    }
}
```

The `db:push` script will push our schema to the database, and the `db:studio` script will open the Drizzle Studio, which is a GUI for managing our database.

Now, run the following command to push our schema to the database:

```bash
npm run db:push
```

You should see the following output:

```bash
> svelte-drizzle@0.0.1 db:push @\svelte-drizzle
> drizzle-kit push:mysql

drizzle-kit: v0.20.4
drizzle-orm: v0.29.0

No config path provided, using the default path
Reading config file 'F:\development\blog\svelte-drizzle\drizzle.config.ts'
Reading schema files:
F:\development\blog\svelte-drizzle\src\lib\server\schema.ts

[✓] Changes applied
```

Now, run the following command to open the Drizzle Studio:

```bash
npm run db:studio
```

Open [https://local.drizzle.studio/](https://local.drizzle.studio/) in your browser, and you should see the following:

![](https://github-production-user-asset-6210df.s3.amazonaws.com/76736580/285513001-bbdb9222-c6b7-4622-ac95-92a5c452bf8d.png)

Woohoo! We've successfully set up our database and pushed our schema to it. Now, let's create our SvelteKit app.

## Creating the SvelteKit app

First, run the dev server if you haven't already:

```bash
npm run dev
```

We'll create a simple to-do app with only 1 page. Create a `src/routes/+page.svelte` file and add the following code:

```svelte
<h1>
    Todo app
</h1>

<form action="?/add" method="post">
    <input type="text" name="content" placeholder="Content" />
    <input type="submit" value="Add" />
</form>
```

Add this to the `<head>` of `app.html` so that we don't need to write CSS.

```html
<link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/water.css@2/out/water.css"
/>
```

![image](https://github-production-user-asset-6210df.s3.amazonaws.com/76736580/285513855-dc7b9958-1710-43a1-8d13-b7337ff3d62c.png)

Now, let's add some functionality to our app. We'll use Svelte server actions to handle our form submission. Create a `src/routes/+page.server.ts` file and add the following code:

```ts
import db from "$lib/server/db";
import { todos } from "$lib/server/schema";
import { fail } from "@sveltejs/kit";

export const actions = {
    add: async ({ request }) => {
        /**
         * Get the form data from the request
         */
        const formData = await request.formData();

        /**
         * Get the title from the form data
         */
        const content = formData.get("content");

        if (!content) {
            return fail(400, { message: "Title is required" });
        }

        /**
         * Finally, add the page to the database
         */
        await db.insert(todos).values({
            content,
        });

        return { message: "Todo added successfully" };
    },
};
```

We'll then update our frontend to show the `message` returned by the server action. Update the `src/routes/+page.svelte` file with the following code:

```svelte
<script lang="ts">
    export let form;
</script>

<h1>Todo app</h1>

{#if form?.message}
    <p>{form.message}</p>
{/if}

<form action="/?/add" method="post">
    <input type="text" name="content" placeholder="Content" />
    <input type="submit" value="Add" />
</form>
```

Now, try adding a todo and check Drizzle Studio. You should see that the todo has been added to the database.

![](https://github-production-user-asset-6210df.s3.amazonaws.com/76736580/285515460-e37e2b51-1276-47b7-b0a5-f3b09fdcd1de.png)

We then can add a `load` function to load all the todos from the database. Add the following code to `src/routes/+page.server.ts`:

```ts
import { desc } from "drizzle-orm";

//... other code

export const load = async () => {
    return {
        todos: await db.select().from(todos).orderBy(desc(todos.createdAt)),
    };
};
```

And update the `src/routes/+page.svelte` file with the following code:

```svelte
<script lang="ts">
    export let form;
    export let data; // data returned by the load function
</script>

<h1>Todo app</h1>

{#if form?.message}
    <p>{form.message}</p>
{/if}

<form action="/?/add" method="post" class="flex">
    <input type="text" name="content" placeholder="Content" />
    <input type="submit" value="Add" />
</form>

<br>

{#if data?.todos}
    {#each data.todos as todo}
        <div class="flex">
            <form action="/?/update" method="post">
                <input type="hidden" name="id" value={todo.id} />
                <input type="text" name="content" value={todo.content} />
                <input type="checkbox" name="completed" checked={todo.completed} />
                <input type="submit" value="Update" />
            </form>

            <form action="/?/delete" method="post">
                <input type="hidden" name="id" value={todo.id} />
                <input type="submit" value="Delete" />
            </form>

            <p>
                {todo.createdAt?.toLocaleString()}
            </p>
        </div>
    {/each}
{/if}

<style>
    .flex *,
    .flex {
        display: flex;
        align-items: center;
    }
</style>
```

Now, we can update and delete todos. Add the following actions to the `src/routes/+page.server.ts` file:

```c {1,2,8-10}
int id = 0;
int idx = 0;

void main() {
    printf("Hello, world!\n");

    id = 5;

    idx = id + 1;

    for (int i = 0; i < 10; i++) {
        printf("i: %d\n", i);
    }

    printf("idx: %d\n", idx);
}
```

Now test it out! You should be able to add, update, and delete todos. You can also check Drizzle Studio to see the changes in the database.

![](https://github-production-user-asset-6210df.s3.amazonaws.com/76736580/285518961-3a8bfb1b-7678-49fb-afda-c38235fe3873.png)

![](https://github-production-user-asset-6210df.s3.amazonaws.com/76736580/285519107-bc846f01-225f-4bb3-b044-721262f191b6.png)

## Conclusion

Now that you've learned how to use Drizzle ORM with SvelteKit, you can use it in your own projects. You can also check out the [Github Repo](https://github.com/Posandu/svelte-drizzle) as well as the [Demo](https://svelte-drizzle.vercel.app/) for this project.

Here are the sources I used to write this article:

- https://orm.drizzle.team/docs/column-types/mysql
- https://orm.drizzle.team/docs/select
- https://orm.drizzle.team/docs/insert
- https://orm.drizzle.team/docs/update
- https://orm.drizzle.team/docs/delete

If you have any questions, feel free to reach out to me on [Twitter](https://twitter.com/posandu) or drop a comment below. Thanks for reading!
