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
		description: 'Click here to sponsor Tronic247 and see your ad here',
		cta: 'Sponsor'
	}
];

const getAd = () => {
	return ADS[Math.floor(Math.random() * ADS.length)];
};

export { getAd };
