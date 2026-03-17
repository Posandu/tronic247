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
			boxShadow: {
				'elevation-0': 'none',
				'elevation-1': '0 1px 2px 0 rgba(0,0,0,0.3), 0 1px 3px 1px rgba(0,0,0,0.15)',
				'elevation-2': '0 1px 2px 0 rgba(0,0,0,0.3), 0 2px 6px 2px rgba(0,0,0,0.15)',
				'elevation-3': '0 4px 8px 3px rgba(0,0,0,0.15), 0 1px 3px 0 rgba(0,0,0,0.3)',
				'elevation-4': '0 6px 10px 4px rgba(0,0,0,0.15), 0 2px 3px 0 rgba(0,0,0,0.3)',
				'elevation-5': '0 8px 12px 6px rgba(0,0,0,0.15), 0 4px 4px 0 rgba(0,0,0,0.3)'
			},
			borderRadius: {
				small: '8px',
				medium: '12px',
				large: '16px',
				'extra-large': '28px'
			},
			fontSize: {
				'display-large': ['57px', { lineHeight: '64px', fontWeight: '400' }],
				'display-medium': ['45px', { lineHeight: '52px', fontWeight: '400' }],
				'display-small': ['36px', { lineHeight: '44px', fontWeight: '400' }],
				'headline-large': ['32px', { lineHeight: '40px', fontWeight: '400' }],
				'headline-medium': ['28px', { lineHeight: '36px', fontWeight: '400' }],
				'headline-small': ['24px', { lineHeight: '32px', fontWeight: '400' }],
				'title-large': ['22px', { lineHeight: '28px', fontWeight: '500' }],
				'title-medium': ['16px', { lineHeight: '24px', fontWeight: '500' }],
				'title-small': ['14px', { lineHeight: '20px', fontWeight: '500' }],
				'body-large': ['16px', { lineHeight: '24px', fontWeight: '400' }],
				'body-medium': ['14px', { lineHeight: '20px', fontWeight: '400' }],
				'body-small': ['12px', { lineHeight: '16px', fontWeight: '400' }],
				'label-large': ['14px', { lineHeight: '20px', fontWeight: '500' }],
				'label-medium': ['12px', { lineHeight: '16px', fontWeight: '500' }],
				'label-small': ['11px', { lineHeight: '16px', fontWeight: '500' }]
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
