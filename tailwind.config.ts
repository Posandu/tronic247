/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from 'tailwindcss';

const MAIN_FONT = "'IBM Plex Sans Variable', sans-serif;";
const MONO_FONT = '"JetBrains Mono Variable", monospace';

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
					darkest: 'var(--md-sys-color-surface-container-lowest)',
					dark: 'var(--md-sys-color-surface-container-low)',
					light: 'var(--md-sys-color-on-surface-variant)',
					content: 'var(--md-sys-color-on-surface)'
				}
			},
			typography: {
				DEFAULT: {
					css: {
						'--tw-prose-pre-bg': 'var(--md-sys-color-surface-container)',
						'--tw-prose-code': 'var(--md-sys-color-on-surface)',
						'--tw-prose-pre': 'var(--md-sys-color-on-surface)'
					}
				}
			}
		}
	},

	plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')]
} satisfies Config;
