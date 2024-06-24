/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from 'tailwindcss';

const MAIN_FONT = '"Source Sans 3", sans-serif';
const MONO_FONT = '"Roboto Mono", monospace';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	darkMode: 'class',

	theme: {
		extend: {
			fontFamily: {
				sans: MAIN_FONT,
				mono: MONO_FONT
			},
			colors: {
				primary: '#e51b23',
				'primary-dark': '#b4000d',
				'muted-dark': '#9b9bb1'
			},
			typography: {
				DEFAULT: {
					css: {
						maxWidth: '90ch',
						lineHeight: '1.75'
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
} satisfies Config;
