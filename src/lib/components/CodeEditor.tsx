/**
 * Forgive me for writing React in a *Svelte* project.
 */
import React from 'react';
import { Sandpack, type SandpackFiles } from '@codesandbox/sandpack-react';
import { createRoot } from 'react-dom/client';

const theme = {
	colors: {
		surface1: '#1a1b26',
		surface2: '#414868',
		surface3: '#2F2F2F',
		clickable: '#999999',
		base: '#808080',
		disabled: '#4D4D4D',
		hover: '#C5C5C5',
		accent: '#7dcfff',
		error: '#ff453a',
		errorSurface: '#ffeceb'
	},
	syntax: {
		plain: '#FFFFFF',
		comment: {
			color: '#757575',
			fontStyle: 'italic'
		},
		keyword: '#f7768e',
		tag: '#caa2a9',
		punctuation: '#ffffff',
		definition: '#f7768e',
		property: '#7dcfff',
		static: '#FF453A',
		string: '#9ece6a'
	},
	font: {
		body: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
		mono: '"Fira Mono", "DejaVu Sans Mono", Menlo, Consolas, "Liberation Mono", Monaco, "Lucida Console", monospace',
		size: '13px',
		lineHeight: '20px'
	}
} as any;

const App = ({ files = {}, template = undefined }: { files: SandpackFiles; template: any }) => {
	return (
		<Sandpack
			options={{
				resizablePanels: true,
				showConsole: true,
				showRefreshButton: true,
				wrapContent: true
			}}
			theme={theme}
			files={files}
			template={template}
		/>
	);
};

export const Render = (elm: HTMLElement, files: SandpackFiles, template: any) => {
	const root = createRoot(elm);
	root.render(<App files={files} template={template} />);
};
