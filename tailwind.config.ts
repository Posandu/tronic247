/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from 'tailwindcss';

const MAIN_FONT = '"Inter Variable", sans-serif';
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
			spacing: {
				'1': '8px',
				'2': '12px',
				'3': '16px',
				'4': '24px',
				'5': '32px',
				'6': '48px'
			},
			typography: {
				DEFAULT: {
					css: {
						maxWidth: '90ch',
						lineHeight: '1.75',
						pre: {
							backgroundColor: '#1a1b26',
							color: '#b2bbe3'
						}
					}
				}
			}
		}
	},

	plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')]
} satisfies Config;
