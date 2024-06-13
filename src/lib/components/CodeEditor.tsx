/**
 * Forgive me for writing React in a *Svelte* project.
 */
import React from 'react';
import {
	Sandpack,
	SandpackCodeEditor,
	SandpackFileExplorer,
	SandpackLayout,
	SandpackPreview,
	SandpackProvider
} from '@codesandbox/sandpack-react';
import { createRoot } from 'react-dom/client';
import { nightOwl } from '@codesandbox/sandpack-themes';

const App = () => {
	const files = {};

	return (
		<SandpackProvider files={files} theme={nightOwl} template="svelte">
			<SandpackLayout>
				<SandpackFileExplorer />
				<SandpackCodeEditor closableTabs showTabs />
				<SandpackPreview />
			</SandpackLayout>
		</SandpackProvider>
	);
};

export const Render = (elm: HTMLElement) => {
	const root = createRoot(elm);
	root.render(<App />);
};
