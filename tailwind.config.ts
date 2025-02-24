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
				mono: MONO_FONT,
				'--tw-prose-pre-bg': 'red'
			},
			colors: {
				base: {
					darkest: '#0f0e0e',
					dark: '#2c2626',
					light: '#999999',
					content: '#f7f7f6'
				}
			},
			typography: {
				DEFAULT: {
					css: {
						'--tw-prose-pre-bg': '#e6e7ed',
						'--tw-prose-code': '#292929',
						'--tw-prose-pre': '#292929',
					}
				}
			}
		}
	},

	plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')]
} satisfies Config;
