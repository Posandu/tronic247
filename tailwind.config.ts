import type { Config } from 'tailwindcss';

const MAIN_FONT =
	'"Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
const MONO_FONT = '"IBM Plex Mono", monospace';

export default {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./src/**.{html,js,svelte,ts}',
		'./src/**/**/**/.{html,js,svelte,ts}'
	],

	theme: {
		extend: {
			fontFamily: {
				sans: MAIN_FONT,
				mono: MONO_FONT
			},
			colors: {
				primary: '#e51b23',
				'primary-dark': '#b4000d'
			},
			typography: {
				DEFAULT: {
					css: {
						maxWidth: '100ch' // add required value here
					}
				}
			}
		},
		container: {
			padding: {
				DEFAULT: '1rem',
				sm: '2rem',
				lg: '4rem',
				xl: '5rem',
				'2xl': '6rem'
			}
		}
	},

	plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')]
} as Config;
