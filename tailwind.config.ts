/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from 'tailwindcss';

const MAIN_FONT = "'Inter Variable', sans-serif;";
const MONO_FONT = '"Roboto Mono", monospace';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			fontFamily: {
				sans: MAIN_FONT,
				mono: MONO_FONT
			},
			colors: {
				base: {
					darkest: '#0f0e0e',
					dark: '#2c2626',
					light: '#999999',
				}
			}
		}
	},

	plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')]
} satisfies Config;
