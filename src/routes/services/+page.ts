import { redirect } from '@sveltejs/kit';

export const load = async () => {
	throw redirect(301, 'https://posandu.com/skills');
};
