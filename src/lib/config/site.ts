// Site configuration - Update these values as needed
export const siteConfig = {
	name: "The Pilgrimage",
	tagline: "A Call to Life",
	description: "854 kilometers through India's Mahakumbh Mela - A documentary uniting humanity across faiths, cultures, and sacred traditions",
	url: "https://pilgrimage.love",

	// Social links
	social: {
		instagram: "https://instagram.com/pilgrimage.love",
		// Add more social links as needed
	},

	// Contact
	email: {
		general: "hello@pilgrimage.love",
		press: "press@pilgrimage.love",
	},

	// Fundraising
	fundraising: {
		goal: 10000,
		raised: 2253,
		currency: "USD",
		chuffedUrl: "https://chuffed.org/project/the-pilgrimage"
	},

	// Video embeds (YouTube or Vimeo)
	videos: {
		trailer3min: {
			url: "https://www.youtube.com/watch?v=SaXCou56Tyw",
			title: "The Pilgrimage - 3 Minute Trailer"
		}
	},

	// Donation tiers
	donationTiers: [
		{
			amount: 25,
			label: "$25",
			benefits: ["Name in film credits", "Email updates"]
		},
		{
			amount: 50,
			label: "$50",
			benefits: ["All $25 benefits", "Exclusive behind-the-scenes content"]
		},
		{
			amount: 100,
			label: "$100",
			benefits: ["All $50 benefits", "Invitation to virtual premiere screening"]
		},
		{
			amount: 250,
			label: "$250",
			benefits: ["All $100 benefits", "Signed poster"]
		},
		{
			amount: 500,
			label: "$500",
			benefits: ["All $250 benefits", "Private Zoom call with John Dass or featured pilgrim"]
		}
	],

	// Pilgrims
	pilgrims: [
		{
			id: "siriani-txana",
			name: "Siriani Txana",
			title: "Huni Kuin Shaman from the Amazon",
			shortBio: "Young shaman navigating the chaos of India in search of wisdom to support her community and land.",
			fullBio: `Siriani Txana is a young Huni Kuin shaman from the Amazon rainforest. She traveled to India's Mahakumbh Mela to seek wisdom that could help her community face the climate crisis and protect their ancestral lands. Her journey represents the bridge between indigenous traditions and the urgent need for global ecological healing.`,
			image: "/images/pilgrims/siriani.jpg", // Add your image path
			quote: "We are all connected to the same Earth, breathing the same air."
		},
		{
			id: "yonatan-hoffman",
			name: "Yonatan Hoffman",
			title: "Ex-IDF Soldier Seeking Peace",
			shortBio: "Former Israeli general grappling with his past and discovering purpose through service.",
			fullBio: `Yonatan Hoffman left his role as a General in the Israeli Defense Forces to seek a life of peace. His pilgrimage through India became a journey of healing, as he confronted the trauma of war and his role in conflict. Through sacred acts of service on the pilgrimage, he discovered a newfound sense of purpose.`,
			image: "/images/pilgrims/yonatan.jpg",
			quote: "Peace begins within, and then ripples outward to the world."
		},
		{
			id: "john-fatima",
			name: "John Ellison & Fatima Ghedira",
			title: "Interfaith Couple",
			shortBio: "Building life together across Christianity, Judaism, and Islam after navigating pain and tumult.",
			fullBio: `John and Fatima are an interfaith married couple crossing boundaries between Christianity, Judaism, and Islam. Both have navigated significant periods of difficulties and pain, and their union represents hope for a world divided by religious differences. Their pilgrimage was a celebration of love transcending all boundaries.`,
			image: "/images/pilgrims/john-fatima.jpg",
			quote: "Love knows no borders, no religions, no divisions."
		},
		{
			id: "swami-ogi",
			name: "Swami Ogi",
			title: "From Silicon Valley to Swami",
			shortBio: "Former host of Silicon Valley billionaire retreats, now walking the Shakti path.",
			fullBio: `Swami Ogi once hosted spiritual retreats for Silicon Valley billionaires, but left that world behind to become a devoted practitioner on the Shakti path with Swami Ogunanda. His transformation represents the growing hunger in Western culture for authentic spiritual practice beyond material success.`,
			image: "/images/pilgrims/swami-ogi.jpg",
			quote: "True wealth is found in devotion and service."
		},
		{
			id: "luke-ram",
			name: "Luke Ram",
			title: "Australian Rediscovering Heritage",
			shortBio: "Reconnecting with his land, family, and indigenous wisdom keepers in Colombia.",
			fullBio: `Luke Ram's story is one of homecoming—reconnecting to his Australian land, his family, and his heritage. His journey extended to Colombia's Sierra Nevada to meet with the Kogis and Arhuacos, deepening his understanding of indigenous wisdom and earth-based spirituality.`,
			image: "/images/pilgrims/luke.jpg",
			quote: "To know where we're going, we must remember where we come from."
		},
		{
			id: "swami-nardanand",
			name: "Swami Nardanand (Guruji)",
			title: "Spiritual Teacher",
			shortBio: "Living embodiment of compassion who began meditating under a tree at age 14.",
			fullBio: `Guru Swami Nardanand began his spiritual practice at the age of 14, meditating under a tree. Decades later, he has become a living embodiment of compassion, silence, and grace, introducing countless seekers to the Shaktipat tradition. His teachings guide pilgrims through ancient rituals, sacred fires, and riverside initiations designed to catalyze inner potential.`,
			image: "/images/pilgrims/guruji.jpg",
			quote: "The blessing is free and available to all. You need only open your heart."
		}
	]
};

// Helper function to calculate funding progress
export function getFundingProgress() {
	const { raised, goal } = siteConfig.fundraising;
	const percentage = (raised / goal) * 100;
	const remaining = goal - raised;
	return {
		raised,
		goal,
		percentage: Math.min(percentage, 100),
		remaining: Math.max(remaining, 0),
		isComplete: raised >= goal
	};
}
