export const siteConfig = {
	name: 'Pilgrimage',
	tagline: 'A film. A seed. A living prayer.',
	description:
		'27 pilgrims. 5 continents. 854 kilometres through the Mahakumbh Mela. A documentary about the only force that crosses every border.',
	url: 'https://pilgrimage.love',

	social: {
		instagram: 'https://instagram.com/pilgrimage.love'
	},

	email: {
		general: 'hello@pilgrimage.love',
		press: 'press@pilgrimage.love'
	},

	contact: {
		john: 'john@john-ellison.com'
	},

	fundraising: {
		raised: 45570,
		ask: 16000,
		ambitious: 35000,
		currency: 'USD',
		fiscalHost: 'The Fountain',
		chuffedUrl: 'https://chuffed.org/project/the-pilgrimage'
	},

	videos: {
		trailer: {
			url: 'https://www.youtube.com/watch?v=SaXCou56Tyw',
			title: 'Pilgrimage — Trailer'
		}
	},

	// Where the $45,570 was raised
	raisedFrom: [
		{ label: 'John Ellison', sublabel: 'private donation', amount: 40570 },
		{ label: 'Swami Ogi', sublabel: 'Foundation', amount: 5000 }
	],

	// Where the $45,570 went — production transparency
	invested: [
		{ label: 'Crew & talent', amount: 18000 },
		{ label: 'Travel, flights & visas', amount: 10000 },
		{ label: 'Equipment, kit & materials', amount: 4570 },
		{ label: 'Insurance, permits & logistics', amount: 5000 },
		{ label: 'Editing — rough cut with Fede', amount: 8000 }
	],

	// What the $16K ask covers
	askItems: [
		{ label: 'Final edit week (Fede)', amount: 3000 },
		{ label: 'Colour & sound finish', amount: 1000 },
		{ label: 'Additional interview filming', amount: 2000 },
		{ label: 'Direction & production (Massi)', amount: 5000 },
		{ label: 'Original score', amount: 5000 }
	],

	// Stretch items beyond the $16K baseline
	stretchItems: [
		{ label: 'Return shoot in India', amount: 7000 },
		{ label: 'Second camera & stills', amount: 4000 },
		{ label: 'Motion graphics & VFX', amount: 4000 },
		{ label: 'Festival & distribution', amount: 2000 },
		{ label: 'Marketing & launch', amount: 2000 }
	],

	// Community donation tiers (online, smaller amounts)
	donationTiersSmall: [
		{
			amount: 100,
			label: '$100',
			benefits: ['Name in the film credits', 'Digital updates from the road']
		},
		{
			amount: 250,
			label: '$250',
			benefits: ['Above + signed archival poster']
		},
		{
			amount: 500,
			label: '$500',
			benefits: ['Above + invitation to the private virtual première']
		},
		{
			amount: 1000,
			label: '$1,000',
			benefits: ['Patron — named in credits, digital première, community access']
		}
	],

	// Major gift tiers (matching the deck)
	donationTiersLarge: [
		{
			name: 'Patron',
			range: '$1,000–5,000',
			amountCents: 100000,
			benefits: 'Named in the film credits. Invited to the digital première.',
			featured: false,
			isDaf: false
		},
		{
			name: 'Sponsor',
			range: '$5,000–15,000',
			amountCents: 500000,
			benefits: 'Credit. Community access. Private in-person screening with the team.',
			featured: false,
			isDaf: false
		},
		{
			name: 'Executive Producer',
			range: '$25,000+',
			amountCents: 2500000,
			benefits:
				'EP credit. Advisory seat. Full participation in the next leg — Sierra Nevada · Vatican · Giza.',
			featured: true,
			isDaf: false
		},
		{
			name: 'DAF Recommendation',
			range: '$5,000–10,000',
			amountCents: 500000,
			benefits:
				'Recommend a grant from your Donor-Advised Fund. Fiscally sponsored by The Fountain (501c3).',
			featured: false,
			isDaf: true
		}
	],

	// The six featured team members / pilgrims
	pilgrims: [
		{
			id: 'guru-ji',
			name: 'Guru Swami Nardanand',
			title: 'Spiritual Director',
			role: 'Spiritual Director',
			image: '/images/guru-ji-eyes.jpg',
			quote: 'We need to remember why we are here.',
			shortBio: 'Living embodiment of compassion who began meditating under a tree at age 14.',
			fullBio: 'Guru Swami Nardanand began his spiritual practice at the age of 14. Decades later, he has become a living embodiment of compassion, silence, and grace — introducing countless seekers to the Shaktipat tradition. His teachings guide pilgrims through ancient rituals, sacred fires, and riverside initiations designed to catalyse inner potential.'
		},
		{
			id: 'siriani',
			name: 'Siriani Txana & Gabi',
			title: 'Spiritual Director',
			role: 'Spiritual Director',
			image: '/images/siri-gabi.jpeg',
			quote: 'We are all connected to the same Earth.',
			shortBio: 'Huni Kuin shaman from the Amazon, carrying the medicine of her people into the sacred waters of India.',
			fullBio: 'Siriani Txana is a Huni Kuin shaman and spiritual carrier from the Amazon rainforest. She arrived at the Mahakumbh Mela not as a tourist of another tradition, but as a fellow keeper of ancient medicine — seeking the threads that connect indigenous wisdom across continents. Her presence on the pilgrimage carries the weight of her people, their land, and the urgent question of how the Earth\'s wisdom traditions can speak to one another before it is too late. Gabi walks beside her as partner, witness, and co-creator.'
		},
		{
			id: 'massi',
			name: 'Massimiliano Bulgheroni',
			title: 'Filmmaker · Director',
			role: 'Filmmaker · Director',
			image: '/images/massi.jpg',
			quote: '',
			shortBio: 'Italian filmmaker with a rare gift for capturing the sacred in the ordinary.',
			fullBio: 'Massimiliano Bulgheroni is an Italian filmmaker whose lens has followed spiritual journeys across continents. Directing Pilgrimage — Ganga\'s Grace, he brings both the intimacy of a pilgrim and the eye of a master cinematographer.'
		},
		{
			id: 'john',
			name: 'John Ellison',
			title: 'Executive Producer',
			role: 'Executive Producer',
			image: '/images/john.jpg',
			quote: '',
			shortBio: 'Founder and producer of Pilgrimage, walking the intersection of technology and spirit.',
			fullBio: 'John Ellison is the executive producer and founder of Pilgrimage. Based in Bali, he has dedicated himself to building a regenerative media ecosystem that gives the world\'s wisdom keepers a platform to share their teachings.'
		},
		{
			id: 'swami-ogi',
			name: 'Swami Ogananda',
			title: 'Wisdom Keeper',
			role: 'Wisdom Keeper',
			image: '/images/swami-ogi.jpg',
			quote: 'True wealth is found in devotion and service.',
			shortBio: 'Former Silicon Valley retreat host turned devoted practitioner on the Shakti path.',
			fullBio: 'Swami Ogananda once hosted spiritual retreats for Silicon Valley\'s inner circle, but left that world behind to walk the Shakti path with full dedication. His transformation represents the growing hunger in Western culture for authentic practice beyond material success.'
		},
		{
			id: 'fatma',
			name: 'Fatma Ghedira',
			title: 'Community & Pilgrim',
			role: 'Community & Pilgrim',
			image: '/images/fatma.jpg',
			quote: '',
			shortBio: 'Bringing the Sufi healing tradition into dialogue with India\'s river of grace.',
			fullBio: 'Fatma Ghedira carries the thread of Sufi sound healing into the pilgrimage, weaving North African spiritual traditions with the deep currents of Indic wisdom at the Mahakumbh Mela.'
		}
	],

	// Pill tags for the opening question section
	pilgrimPills: [
		'Huni Kuin Shaman',
		'Indian Guru',
		'Ex-IDF General',
		'Sufi Sound Healer',
		'Crypto Entrepreneur',
		'Italian Filmmaker',
		'Swiss Skateboarder',
		'Austrian Student',
		'Thai Healer',
		'Hong Kong Banker',
		'Dutch Sociologist',
		'Viennese Mystic'
	]
};

// Progress toward the current $16K ask (starts at 0, updated as donations arrive)
export function getFundingProgress() {
	const { ask } = siteConfig.fundraising;
	const currentlyRaised = 0;
	return {
		ask,
		currentlyRaised,
		percentage: Math.min((currentlyRaised / ask) * 100, 100),
		remaining: Math.max(ask - currentlyRaised, 0),
		isComplete: currentlyRaised >= ask
	};
}
