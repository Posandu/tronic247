// Squelch warnings of image imports from your assets dir
declare module '#lib/assets/*' {
	let meta;
	export default meta;
}

interface Window {
	// Simple Analytics pageview function, loaded from a script tag in app.html
	sa_pageview?: (path: string) => void;
}
