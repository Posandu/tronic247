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
				primary: {
					DEFAULT: '#FF6B6B',
					light: '#FF9B9B',
					dark: '#FF3B3B',
					hover: '#FF8080',
					active: '#FF2525'
				},
				secondary: {
					DEFAULT: '#4ECDC4',
					light: '#7EDBD4',
					dark: '#2EBD94',
					hover: '#66D9D0',
					active: '#22ABA2'
				},
				accent: {
					DEFAULT: '#FFD93D',
					light: '#FFE574',
					dark: '#FFCD00',
					hover: '#FFDF66',
					active: '#FFC700'
				},
				neutral: {
					DEFAULT: '#F0F4F8',
					50: '#FFFFFF',
					100: '#F0F4F8',
					200: '#D9E2EC',
					300: '#BCCCDC',
					400: '#9FB3C8',
					500: '#829AB1',
					600: '#627D98',
					700: '#486581',
					800: '#334E68',
					900: '#243B53'
				}
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
