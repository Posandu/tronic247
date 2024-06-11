const ADS: {
	img: string;
	url: string;
	title: string;
	description: string;
	cta: string;
}[] = [
	{
		img: 'https://via.placeholder.com/150',
		url: '/sponsor',
		title: 'This might be your ad',
		description: 'Click here to sponsor Tronic247',
		cta: 'Sponsor'
	},
	{
		img: 'https://via.placeholder.com/150',
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
