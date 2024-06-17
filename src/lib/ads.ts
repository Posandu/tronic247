const ADS: {
	img?: string;
	url: string;
	title: string;
	description: string;
	cta: string;
}[] = [
	{
		url: '/sponsor',
		title: 'This might be your ad',
		description: 'Click here to sponsor Tronic247',
		cta: 'Sponsor'
	},
	{
		url: '/sponsor',
		title: 'Like the above content?',
		description: 'Consider sponsoring Tronic247',
		cta: 'Sponsor'
	},
	{
		url: 'https://github.com/tronic247/web',
		title: 'Spotted a bug or typo?',
		description: 'File an issue or PR on GitHub',
		cta: 'GitHub'
	}
];

const getAd = () => {
	return ADS[Math.floor(Math.random() * ADS.length)];
};

export { getAd };
