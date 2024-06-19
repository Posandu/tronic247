// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			imgData: any;
			posts: {
				title: string;
				content: unknown;
				slug: string;
				date: Date;
				tags?: string[];
				img?: string;
				categories?: string[];
				excerpt: string;
				length?: number;
				lastModified?: string;
			}[];
			getImgObjects: (posts: App.Locals['posts']) => any;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
