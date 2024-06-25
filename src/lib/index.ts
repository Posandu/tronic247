// place files you want to import through the `$lib` alias in this folder.
export const formattedTitle = (name: string) => `${name} - Tronic247`;

const IS_DEV = process.env.NODE_ENV === 'development';

export const SITE_URL = IS_DEV ? 'http://localhost:5173/' : 'https://www.tronic247.com/';
