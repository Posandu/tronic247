export const formattedTitle = (name: string) => `${name} - Tronic247`;

const IS_DEV = process.env.NODE_ENV === 'development';

export const SITE_URL = IS_DEV ? 'http://localhost:5173/' : 'https://www.tronic247.com/';

export const formatDate = (date: Date) =>
	new Date(date).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	});

export const makeID = (str: string) => '_' + str.replace(/\s/g, '_').toLowerCase();
