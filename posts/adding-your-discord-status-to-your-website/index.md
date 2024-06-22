---
title: Adding your discord status to a website
date: '2022-11-21'
categories: ['html-tutorials', 'javascript']
tags: ['discord', 'status', 'website', 'html', 'javascript']
img: /wp-content/uploads/2022/11/discord-status.png
updated: '2024-06-13'
excerpt: Learn how to add your Discord status to your website using Lanyard.
---

Using a status message is a great way to show info about you. Discord, the most popular chat app for devs has some advanced status features. They include:

- Normal text messages
- Song playing on Spotify
- Game playing
- Streaming on Twitch
- And more!

My portfolio [posandu.me](https://posandu.me) has a status message that shows what I'm currently listening to on Spotify.

![](https://user-images.githubusercontent.com/76736580/203030021-af07d7ca-8884-4f1a-a5a1-386a8aa02f9c.png)

PS: It updates automatically when the song is changed.

In this post, I will show you how to add your discord status to your website. We won't be using Discord's API, but instead, we will be using a service called [Lanyard](https://github.com/Phineas/lanyard). Lanyard is a service that allows you to get your discord status in JSON format. It is very easy to use and has a lot of features. Let's get started!

## Step 1: Join the Lanyard Discord server

The first step is to join the Lanyard Discord server. We need to do it because there is a bot that watches your status and updates the JSON file. You can join the server [here](https://discord.gg/UrXF2cfJ7F). (You can mute the server if you want)

## Step 2: Get your Discord ID

Head to your Discord settings and go to the "Advanced" tab. And enable "Developer Mode". This will allow you to get your Discord user ID.

![](https://user-images.githubusercontent.com/76736580/203031168-477f9d7b-5b74-4fba-9a7d-14ac8dc02c5a.png)

Now navigate to a server and locate your profile and right-click it.

![](https://user-images.githubusercontent.com/76736580/203031589-2373282a-35c7-4dd9-adb3-4e74ea72af6d.png)

Click on "Copy ID" and paste it somewhere. We will need it later.

## Step 3: Test the API

Now get your ID and replace \*\*\* with it in the URL below.

```
https://api.lanyard.rest/v1/users/***
```

If everything worked fine, you should get the following JSON response.

```json
{
	"success": true,
	"data": {
		"spotify": {
			"track_id": "0ct6r3EGTcMLPtrXHDvVjc",
			"timestamps": { "start": 1669035382600, "end": 1669035559258 },
			"song": "The Nights",
			"artist": "Avicii",
			"album_art_url": "https://i.scdn.co/image/ab67616d0000b2730ae4f4d42e4a09f3a29f64ad",
			"album": "The Days / Nights"
		},
		"listening_to_spotify": true,
		"kv": {},
		"discord_user": {
			"username": "Posandu",
			"public_flags": 4194560,
			"id": "961161387101536296",
			"discriminator": "4040",
			"bot": false,
			"avatar": "623cfa0d63b37ed91202fccac745aba1"
		},
		"discord_status": "dnd",
		"activities": [
			{
				"type": 2,
				"timestamps": { "start": 1669035382600, "end": 1669035559258 },
				"sync_id": "0ct6r3EGTcMLPtrXHDvVjc",
				"state": "Avicii",
				"session_id": "e4227bf5701601b286974ff07f3aeee6",
				"party": { "id": "spotify:961161387101536296" },
				"name": "Spotify",
				"id": "spotify:1",
				"flags": 48,
				"details": "The Nights",
				"created_at": 1669035385904,
				"assets": {
					"large_text": "The Days / Nights",
					"large_image": "spotify:ab67616d0000b2730ae4f4d42e4a09f3a29f64ad"
				}
			}
		],
		"active_on_discord_web": true,
		"active_on_discord_mobile": false,
		"active_on_discord_desktop": false
	}
}
```

? wow! That's a lot of data. Let's break it down.

- `spotify` - This is the song you are currently listening to on Spotify. If you are not listening to anything, it will be `null`.

- `listening_to_spotify` - This is a boolean value that tells you if you are listening to Spotify or not.

- `discord_user` - This is your Discord user info.

- `discord_status` - This is your Discord status. It can be `online`, `idle`, `dnd`, or `offline`.

- `activities` - This is an array of activities you are doing. It can be a game, a stream, or a custom status.

- `active_on_discord_(web/mobile/desktop)` - These are booleans that tell you if you are active on Discord on a specific platform.

## Step 4: Create a mockup

Now that we have the API working, we can add it to our website. I will be using [Next.js](https://nextjs.org/) and [Chakra UI](https://chakra-ui.com/) for this tutorial. You can use any framework you want. But, I will be using this one because I'm familiar with it.

First, clone the Next.js template.

```bash
git clone https://github.com/Posandu/nextjs-starter.git
```

Install the dependencies and run the development server.

```bash
cd nextjs-starter && npm install && npm run dev
```

Edit the `pages/index.tsx` file and add the following code.

```tsx
import {
	Avatar,
	AvatarBadge,
	Container,
	Flex,
	Grid,
	GridItem,
	Heading,
	Text
} from '@chakra-ui/react';
import type { NextPage } from 'next';

import ColormodeToggle from '@/colormodeToggle';

const Home: NextPage = () => {
	return (
		<Container maxW="4xl" p={4}>
			<Flex alignItems="center" justifyContent="space-between" my={6}>
				<Heading>My Discord status</Heading>
				<ColormodeToggle />
			</Flex>

			<Grid templateColumns="repeat(10, 1fr)" gap={6}>
				<GridItem>
					<Avatar src="https://discord.c99.nl/widget/theme-1/1234567890.png">
						<AvatarBadge boxSize="1.25em" bg="green.500" />
					</Avatar>
				</GridItem>
				<GridItem>
					<Text fontSize="2xl">
						Username
						<Text as="span" color="gray.400">
							#6942
						</Text>
					</Text>

					<Text color="gray.400">Playing Minecraft</Text>
				</GridItem>
			</Grid>
		</Container>
	);
};

export default Home;
```

Which will give us this.

![](https://user-images.githubusercontent.com/76736580/203040105-1689c903-ede7-4338-a08d-2144b1a4847d.png)

Now we need to add the data which we will do in the next step.

## Step 5: Adding the things

We get the data from the server and update the state. We will use the `useEffect` and `useState` hooks for this.

```tsx
interface Resp {
	discord_status: 'online' | 'dnd' | 'idle';
	username: string;
	discriminator: string;
	discord_user: {
		username: string;
		discriminator: string;
		avatar: string;
		id: string;
	};
	spotify: {
		track_id: string;
		song: string;
		artist: string;
		album_art: string;
	};
}

const [data, setData] = useState<Resp>();
const [loading, setLoading] = useState(true);

useEffect(() => {
	const ID = '961161387101536296';

	fetch(`https://api.lanyard.rest/v1/users/${ID}`)
		.then((res) => res.json())
		.then((res) => {
			setData(res.data);
			setLoading(false);
		});
}, []);
```

And edit the JSX to use the data.

```tsx
{
	!loading && data && (
		<Grid templateColumns="repeat(10, 1fr)" gap={6}>
			<GridItem>
				<Avatar
					src={`https://cdn.discordapp.com/avatars/${data.discord_user.id}/${data.discord_user.avatar}.png`}
				>
					<AvatarBadge
						boxSize="1.25em"
						bg={
							data.discord_status === 'online'
								? 'green.500'
								: data.discord_status === 'dnd'
									? 'red.500'
									: data.discord_status === 'idle'
										? 'yellow.500'
										: 'gray.500'
						}
					/>
				</Avatar>
			</GridItem>
			<GridItem>
				<Text fontSize="2xl">
					{data.discord_user.username}
					<Text as="span" color="gray.400">
						#{data.discord_user.discriminator}
					</Text>
				</Text>
				<Text color="gray.400">
					{data.spotify
						? `${data.spotify.song} by ${data.spotify.artist} on ${data.spotify.album}`
						: '...'}
				</Text>
			</GridItem>
		</Grid>
	);
}
```

Now open Discord and listen to some music on Spotify. You should see the following.

![](https://user-images.githubusercontent.com/76736580/203062139-ba8406e8-6a42-4aea-85c3-afa33e935e78.png)

Make sure you have Spotify connected to your Discord account and that you have enabled the "Show currently playing game as a status message" option in your Discord settings.

So, that's it! You can use this to show your Discord status on your website. You can also use this to show the status of your friends. Just replace the ID with the ID of your friend(make sure they are in the Lanyard server).

## Conclusion

Thanks for reading this tutorial. I hope you learned something new. If you have any questions, feel free to ask them in the comments.
