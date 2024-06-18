/**
 * Forgive me for writing React in a *Svelte* project.
 */
import React from 'react';
import { Sandpack, type SandpackFiles } from '@codesandbox/sandpack-react';
import { createRoot } from 'react-dom/client';
import { nightOwl } from '@codesandbox/sandpack-themes';

const App = ({ files = {}, template = undefined }: { files: SandpackFiles; template: any }) => {
	return (
		<Sandpack
			options={{
				resizablePanels: true,
				showConsole: true,
				showRefreshButton: true,
				wrapContent: true
			}}
			theme={nightOwl}
			files={files}
			template={template}
		/>
	);
};

export const Render = (elm: HTMLElement, files: SandpackFiles, template: any) => {
	const root = createRoot(elm);
	root.render(<App files={files} template={template} />);
};
