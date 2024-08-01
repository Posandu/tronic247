/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from 'tailwindcss';

const MAIN_FONT =
	'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
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
					DEFAULT: '#e51b23',
					light: '#f04c52',
					dark: '#b81419',
					hover: '#f26065',
					active: '#a11216'
				},
				secondary: {
					DEFAULT: '#2c3e50',
					light: '#3c5269',
					dark: '#1c2a37',
					hover: '#4c6885',
					active: '#0c1821'
				},
				neutral: {
					DEFAULT: '#1f2937',
					100: '#f3f4f6',
					200: '#e5e7eb',
					300: '#d1d5db',
					400: '#9ca3af',
					500: '#6b7280',
					600: '#4b5563',
					700: '#374151',
					800: '#1f2937',
					900: '#0D1018'
				}
			}
,			
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
