---
title: Creating a Discord bot with JavaScript and hosting it
date: '2022-10-22'
categories: ['javascript']
tags: ['discord', 'javascript']
img: /wp-content/uploads/2022/10/create-a-discord-bot.png
---

Discord bots are a great way to automate tasks and make your server more fun. This guide will show you how to make a discord bot with JavaScript and host it for free. You will need some basic knowledge of JavaScript and Node.js to follow along with this guide.

## Contents

## Getting Started

First, we need to get the discord bot token. Go to the [Discord Developer Portal](https://discord.com/developers/applications). And create an application.

![](https://user-images.githubusercontent.com/76736580/197370443-83b75e78-ed8e-4a17-8904-ef58211f68fe.png)

![](https://user-images.githubusercontent.com/76736580/197370493-ac8a2c33-d550-466f-95d3-2f39ef169e0c.png)

Now, once you have created the application, the page will get redirected to the application page. You can edit the bot details here.

![](https://user-images.githubusercontent.com/76736580/197370562-22fbaa80-525c-4e03-9b3d-af697bd7ef9a.png)

Now go to the bot section and click on add bot. You will get a confirmation message. Click on yes, do it!

![](https://user-images.githubusercontent.com/76736580/197370579-3fc5305c-eb74-4c05-a69a-e17891e7d45e.png)

Now click on the Reset Token button. This will reset the bot token. You will get a confirmation message. Accept it and you will get the bot token. Copy the token and create a `.env` file in the project directory and add the following contents.

![](https://user-images.githubusercontent.com/76736580/197370610-3aa768eb-23b0-4c9a-830b-0c995ffd7114.png)

```
TOKEN=YOUR_TOKEN_HERE
```

Make sure to replace `YOUR_TOKEN_HERE` with your bot token.

Also, scroll bottom and toggle all the permissions to true.

![image](https://user-images.githubusercontent.com/76736580/197371747-b59d9ba2-f0ff-47e2-a307-0c5865dc261b.png)

Lastly, we should add the bot to a Discord server, to do this, we go to the Developer portal again and go to the Oauth2->Url Generator. Then, check on the `bot` checkbox and check `Administrator` on the bottom checkboxes list.

![](https://user-images.githubusercontent.com/76736580/197370875-7350bb5c-7fdf-4888-ab5f-e4a9716ea45f.png)

Now scroll to the bottom of the page and copy the URL.

![](https://user-images.githubusercontent.com/76736580/197370996-cc3c96fd-f043-41a1-b9a7-3aedf65e7c07.png)

After that, open it in a new tab and select the server you want to add the bot to. Click on authorize and you are done.

![](https://user-images.githubusercontent.com/76736580/197371048-eeb95ced-1616-4927-8c09-305385aab455.png)

Yaay! You have added the bot to your server.

![](https://user-images.githubusercontent.com/76736580/197371109-dc8dd6cb-f294-4387-b2ef-a0a72f74c3dd.png)

But, the bot is offline. We need to make it online. To do that, we need to code the bot. Let's get started.

## Creating the bot

Now that we have the bot token, we can create the bot. We will be using the [discord.js](https://discord.js.org/#/) library to create the bot. Install the library using the following command.

```bash
npm install discord.js # or pnpm install discord.js / yarn add discord.js
```

And for getting the token from the `.env` file, we will be using the [dotenv](https://www.npmjs.com/package/dotenv) package. Install it using the following command.

```bash
npm install dotenv
```

After that, open the `package.json` file and add the following scripts.

```json
{
	"scripts": {
		"start": "node index.js"
	}
}
```

Also, make sure to add the `type` field to the `package.json` file.

```json
{
	"type": "module"
}
```

Now, create a file named `index.js` and add the following contents.

```js
// Require the necessary discord.js classes
import { Client, Events, GatewayIntentBits } from 'discord.js';
import { config } from 'dotenv';

// Load environment variables from .env file
config();

const { TOKEN } = process.env;

// Create a new instance
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent
	]
});

// When the client is ready, run this code (only once)
client.once(Events.ClientReady, (c) => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

// Log in to Discord with your client's token
client.login(TOKEN);
```

This will create a new instance of the client and log in to the discord bot. Now, run the following command to start the bot.

```bash
npm start
```

The bot should be online now! ?

![](https://user-images.githubusercontent.com/76736580/197371380-5d160826-1442-4bf4-8ff6-2e9b154a5e5e.png)

### Adding commands

We'll add a simple ping command to the bot. Add the following code to the `index.js` file.

```js
// Command handler
const prefix = '!'; // Prefix for commands

client.on(Events.MessageCreate, (message) => {
	const content = message.content.trim();
	if (!content.startsWith(prefix)) return; // Ignore messages that don't start with the prefix

	const args = content.slice(prefix.length).trim().split(/ +/); // Split the message into arguments
	const command = args.shift().toLowerCase(); // Get the command name

	const commands = {
		ping: () => {
			message.reply(`Pong! Latency is ${Date.now() - message.createdTimestamp}ms.`);
		}
	};

	if (command in commands) {
		commands[command]();
	}
});
```

Restart the bot and try the command by typing `!ping` in the server.

Nice! We have created a simple ping command. Now, if you want to add more commands, you can add them to the `commands` object. Let's add a simple help command.

```js
const commands = {
	// ...
	help: () => {
		message.reply(`Available commands: ${Object.keys(commands).join(', ')}`);
	}
};
```

It also works!

![](https://user-images.githubusercontent.com/76736580/197372724-9511c04d-1ebd-4dc7-82b7-32c28d2febb5.png)

So, if you want to add more commands, you can add them to the `commands` object.

## Hosting the bot

Now that we have created the bot, we need to host it. You can use [Railway](https://go.tronic247.com/2zz5) to host the bot. Create an account and open the dashboard. Click on the `New Project`.

![](https://user-images.githubusercontent.com/76736580/197373091-36034d88-1efb-4a48-b453-086b8954a680.png)

Then select the `Create from GitHub` option. After that, select the repository with the bot code and click on `Create Project`.

Then select `edit variables` and add the `TOKEN` variable. Paste the bot token in the value field.

![](https://user-images.githubusercontent.com/76736580/197373216-f4a5a719-49d8-4a4a-a4fb-fd0a7a315cd7.png)

Now after some time, the bot should be online.

![](https://user-images.githubusercontent.com/76736580/197373249-b135b25e-6a51-4f36-bbe3-831b28612ce7.png)

And if you test the bot, it should work pretty fast.

![](https://user-images.githubusercontent.com/76736580/197373283-8d091726-d2d5-4b2a-ab3a-fc448234d9ef.png)

## Conclusion

You have successfully created a discord bot and hosted it. You can add more commands to the bot and make it more useful.

The code for this tutorial is available [here](https://github.com/Posandu/discord-bot-tutorial)
