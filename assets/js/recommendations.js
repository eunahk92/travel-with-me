const geocoder = new google.maps.Geocoder();
let infowindow = new google.maps.InfoWindow();
let map;
let markers = [];
let intViewportWidth = window.innerWidth;
const listPage = $(document.querySelector('#tripDetailsSection'));
const categoryArr = [
	{ type: "desserts", icon: `<i class="fas fa-ice-cream"></i>` },
	{ type: "local food/ drinks", icon: `<i class="fas fa-utensils"></i>` },
	{ type: "pastries", icon: `<i class="fas fa-bread-slice"></i>` },
	{ type: "seafood", icon: `<i class="fas fa-fish"></i>` },
	{ type: "asian food", icon: `<span class="material-icons align-middle tiny">set_meal</span>` },
	{ type: "american food", icon: `<span class="material-icons align-middle tiny">lunch_dining</span>` },
	{ type: "breakfast food", icon: `<span class="material-icons align-middle tiny">breakfast_dining</span>` },
	{ type: "bar", icon: `<i class="fas fa-glass-martini-alt"></i>` },
	{ type: "brewery", icon: `<i class="fas fa-beer"></i>` },
	{ type: "hiking", icon: `<i class="fas fa-hiking"></i>` },
	{ type: "shopping", icon: `<i class="fas fa-shopping-bag"></i>` },
	{ type: "food available", icon: `<span class="material-icons align-middle tiny">dining</span>` },
	{ type: "swimming", icon: `<i class="fas fa-swimmer"></i>` },
	{ type: "snorkeling", icon: `<span class="material-icons align-middle">pool</span>` },
	{ type: "coffee", icon: `<i class="fas fa-coffee"></i>` },
	{ type: "sightsee", icon: `<i class="fas fa-binoculars"></i>` },
	{ type: "spa", icon: `<i class="fas fa-spa"></i>` },
	{ type: "beach", icon: `<i class="fas fa-umbrella-beach"></i>` },
];
const locationsArray = [
    {
		name: "Honolulu,Hawaii",
		continent: 'North America',
		cityTips: [
			"The delicious Hawaiian treat is called SHAVE ice, not SHAVED ice. If ever you see a place offering 'shaved ice' (in Hawaii or elsewhere), it is definitely not authentic.", "Traffic, traffic, traffic... Traffic going towards Honolulu is worst between 5am-8am, and traffic heading out of Honolulu tends to snarl up from 3pm-6pm. Expect heavy traffic during rush hour.", "Be aware of the signs posted on the beaches you visit. Depending on when you visit, there may be conditions like rip currents, dangerous shorebreak, brown water advisories, or box jellyfish in the waters", "If you’re going to hike Diamond Head/ Koko Head/ Makapu’u Lighthouse Trail, go as early as you can. There's hardly any shade at those locations.", "When snorkeling, don't step/ stand on the coral reef's.", "Don't feed or touch marine life, it can come with expensive consequences in certain areas (especially the turtles).", "Bring your own snorkeling gear, save money!"
		],
		coord: {
			lat: 21.5010,
			long: -158.0377136
        },
		imgPaths: [
			"./assets/photos/honolulu/IMG_2813.jpg", 
			"./assets/photos/honolulu/IMG_2814.jpg", 
			"./assets/photos/honolulu/IMG_2801.jpg", 
			"./assets/photos/honolulu/IMG_2800.jpg", 
			"./assets/photos/honolulu/IMG_2799.jpg",
			"./assets/photos/honolulu/IMG_2798.jpg"
		],
		recommendations: [
            {
				name: "Giovanni Shrimp Truck",
				address: "66-472 Kamehameha Hwy, Haleiwa, HI 96712",
				commentary: "Food truck style, not many seats",
				tips: ["Try the Shrimp Scampi Plate!"],
				category: "foodAndDrinks",
				types: ["local"],
				label: '',
				coord: {
					lat: 21.5807083,
					long: -158.1050234
				},
            },
			{
				name: "Pearl Harbor National Memorial",
				address: "1 Arizona Memorial Pl, Honolulu, HI 96818",
				commentary: "",
				tips: ["Book your tickets ahead of time! It gets packed."],
				category: "adventures",
				types: ["sightsee"],
				label: '',
				coord: {
					lat: 21.3665445,
					long: -157.9393778
				}
			},
			{
				name: "Shark's Cove",
				address: "59-727 Kamehameha Hwy, Haleiwa, HI 96712",
				commentary: "A part of Pupukea Beach Park & is a lava-rock beach. Known for its' underwater rock formation and marine life.",
				tips: ["Wear reef shoes or fins when snorkeling to avoid sharp lava rocks", "No actual sharks here, but a variety of vish, sea turtles, and maybe a moray eel or 2"],
				category: "adventures",
				types: ["snorkeling", "swimming", "beach"],
				label: '',
				coord: {
					lat: 21.6637445,
					long: -158.050678
				}
			},
			{
				name: "Haiku Gardens",
				address: "46-336 Haiku Rd, Kaneohe, HI 96744",
				commentary: "Beautiful garden with jaw-droppign mountain backdrops.",
				tips: [],
				category: "adventures",
				types: ["sightsee"],
				label: '',
				coord: {
					lat: 21.414335,
					long: -157.8152957
				}
			},
			{
				name: "Makapu'u Tidepools",
				address: "8 7th St, Honolulu, HI 96819",
				commentary: "",
				tips: [],
				category: "adventures",
				types: ["sightsee", "swimming"],
				label: '',
				coord: {
					lat: 21.3450216,
					long: -157.88107
				}
			},
			{
				name: "Makapu'u Lighthouse Trail",
				address: "Makapuʻu Point Lighthouse Trail, Waimanalo, HI 96795",
				commentary: "Hiking trail to the lighthouse. Sometimes you can do whale watching depending on the season!",
				tips: [],
				category: "adventures",
				types: ["sightsee", "hiking"],
				label: '',
				coord: {
					lat: 21.3038214,
					long: -157.6535015
				}
			},
			{
				name: "Tantalus Lookout",
				address: "Nutridge St, Honolulu, HI 96822",
				commentary: "A great city view of Honolulu. You can see inside the Diamond Head Crater from the top.",
				tips: [],
				category: "adventures",
				types: ["sightsee"],
				label: '',
				coord: {
					lat: 21.3147841,
					long: -157.8205714
				}
			},
			{
				name: "Mermaid Caves",
				address: "Keaulana Ave, Hawaii 96792",
				commentary: "Follow the rocky shoreline to the left for a few minutes and you'll see the opening for the caves. You can walk/ swim in the caves and (sometimes) jump off of the far cliffs",
				tips: ["Check the tide levels before you go, you can only access the caves with low tide."],
				category: "adventures",
				types: ["swimming", "beach", "sightsee"],
				label: '',
				coord: {
					lat: 21.3732293,
					long: -158.1399859
				}
			},
            {
				name: "Ahi Assassins Fish Co.",
				address: "2570 S Beretania St 2nd Fl, Honolulu, HI 96826",
				commentary: "You can get poke everywhere, from Ahi Assassins to your local food market, like Foodland (like a publix).",
				tips: [],
				category: "foodAndDrinks",
				types: ["seafood"],
				label: '',
				coord: {
					lat: 21.2925559,
					long: -157.8223049
				},
            },
			{
				name: "Koko Crater Railway Trail",
				address: "7604 Koko Head Park Rd #7602, Honolulu, HI 96825",
				commentary: "Better known as 'Koko Head Stairs' as it's basically a StairMasters workout. The abandoned railway is used as the stairs that you hike up. Take a seat at one of the pillbox bunkers at the top and enjoy the view!",
				tips: ["Park at Koko Head District Park parking lot & you'll find signs that lead you to the trail.", "Don't forget to take a picture with the Koko Crater Arch (an unbelievable rock formation on the edge of the crater)."],
				category: "adventures",
				types: ["hiking"],
				label: '',
				coord: {
					lat: 21.2808481,
					long: -157.6920035
				}
			},
            {
				name: "Leonard’s Bakery",
				address: "933 Kapahulu Ave, Honolulu, HI 96816",
				commentary: "Similar to chinese donuts, sugary doughs.",
				tips: ["Try one with filling in it, you won't regret it."],
				category: "foodAndDrinks",
				types: ["pastries"],
				label: '',
				coord: {
					lat: 21.2849227,
					long: -157.8132698
				},
            },
			{
				name: "Wow-Wow Lemonade Oahu",
				address: "66-526 Kamehameha Hwy, Haleiwa, HI 96712",
				commentary: "Fresh pressed juice with cute souvenir jars",
				tips: [],
				category: "foodAndDrinks",
				types: ["local"],
				label: '',
				coord: {
					lat: 21.5795363,
					long: -158.1052039
				},
            },
            {
				name: "Musubi Cafe Iyasume",
				address: "4211 Waialae Avenue, #G19, Honolulu, HI 96816",
				commentary: "Whether you get spam musubi from Musubi Cafe Iyasume or get them from the local gas station, these are great snacks to chow down on.",
				tips: [],
				category: "foodAndDrinks",
				types: ["local"],
				label: '',
				coord: {
					lat: 21.2770925,
					long: -157.7863744
				},
            },
            {
				name: "MATSUMOTO’S SHAVE ICE",
				address: "66-111 Kamehameha Hwy 605, Haleiwa, HI 96712", 
				commentary: "Try either here or the shave ice at Waiola, or both!",
				tips: [],
				category: "foodAndDrinks",
				types: ["desserts"],
				label: '',
				coord: {
					lat: 21.5911105,
					long: -158.1028563
				},
            },
            {
				name: "Waiola Shave Ice",
				address: "2135 Waiola St, Honolulu, HI 96826",
				commentary: "Another great spot for shave ice",
				tips: [],
				category: "foodAndDrinks",
				types: ["desserts"],
				label: '',
				coord: {
					lat: 21.2924603,
					long: -157.8286388
				},
            },
            {
				name: "Haleʻiwa Bowls",
				address: "66-030 Kamehameha Hwy, Haleiwa, HI 96712",
				commentary: "A little hut known for their acai bowls",
				tips: [],
				category: "foodAndDrinks",
				types: ["local"],
				label: '',
				coord: {
					lat: 21.5927306,
					long: -158.1032127
				},
            },
            {
				name: "Marukame Udon Waikiki",
				address: "2310 Kūhiō Ave. 124, Honolulu, HI 96815",
				commentary: "Authentic Japanese Udon noodles",
				tips: [],
				category: "foodAndDrinks",
				types: ["asian food"],
				label: '',
				coord: {
					lat: 21.2796049,
					long: -157.8258319
				},
            },
			{
				name: "Manoa Falls",
				address: "Na Ala Hele: Aihualama Trail, Honolulu, HI 96822",
				commentary: "Can be from 1-2 hours long and leads to a beautiful large waterfall.",
				tips: ["Don't swim in the water under the waterfall!! High risk of being infected with Leptospirosis...", "Great self hike but recommend booking a tour if you're interested in the explanation of local floral and fauna that's unique to Ohau."],
				category: "adventures",
				types: ["hiking"],
				label: '',
				coord: {
					lat: 21.3413975,
					long: -157.7996972
				}
			},
            {
				name: "Waimea Bay, North Shore",
				address: "61-31 Kamehameha Hwy, Haleiwa, HI 96712",
				commentary: "Popular beach away from Waikiki tourists. Great for surfing and dolphins and turtle spotings!",
				tips: [],
				category: "adventures",
				types: ["beach", "surfing"],
				label: '',
				coord: {
					lat: 21.639903,
					long: -158.062769
				},
            },
            {
				name: "Dole Pineapple Plantation",
				address: "64-1550 Kamehameha Hwy, Wahiawa, HI 96786",
				commentary: "On the way to North Shore Beach, stop by the famous Dole Pineapple Farm! There is a pineapple maze (world's largest maze?) and little shops and dessert spots.",
				tips: ["Recommendation: You have to try the delicious pineapple soft serve"],
				category: "adventures",
				types: ["tour", "shopping", "food available"],
				label: '',
				coord: {
					lat: 21.5260075,
					long: -158.0377136 
				},
            },
			{
				name: "The ManiFest",
				address: "32 N Hotel St, Honolulu, HI 96817",
				commentary: "A coffee shop by day and a bar by night!",
				tips: [],
				category: "extra-food",
				types: ["coffee", "bar"],
				label: '',
				coord: {
					lat: 21.3114794,
					long: -157.8622457
				}
			},
			{
				name: "Bubbies Homemade Desserts",
				address: "7192 Kalanianaʻole Hwy d103, Honolulu, HI 96825",
				commentary: "Known for their handmade ice cream and mochi!",
				tips: ["I recommend their homemade mochi ice cream"],
				category: "foodAndDrinks",
				types: ["desserts"],
				label: '',
				coord: {
					lat: 21.2785713,
					long: -157.7048431
				}
			},
			{
				name: "Lucky Belly",
				address: "50 N Hotel St, Honolulu, HI 96817",
				commentary: "Asian Fusion Cuisine",
				tips: ["Friend recommended the pork belly bao, oxtail dumplings, & the gyoza.", "San Francisco-inspired craft cocktails"],
				category: "extra-food",
				types: ["bar", "asian"],
				label: '',
				coord: {
					lat: 21.3117452,
					long: -157.8623772
				}
			},
			{
				name: "The Pig and The Lady",
				address: "83 N King St, Honolulu, HI 96817",
				commentary: "Viet food inspired by Hawaiian Regional cruisine",
				tips: ["Stop by Lucky Belly for Happy Hour"],
				category: "foodAndDrinks",
				types: ["asian"],
				label: '',
				coord: {
					lat: 21.3114491,
					long: -157.8636749
				}
			},
			{
				name: "Egg N Things",
				address: "2464 Kalakaua Ave, Honolulu, HI 96815",
				commentary: "Breakfast joint with multiple locations",
				tips: ["Try their Macadamia Nut Pancakes with whipped cream, mouth watering!"],
				category: "foodAndDrinks",
				types: ["local", "breakfast"],
				label: '',
				coord: {
					lat: 21.2748533,
					long: -157.8242609
				}
			},
			{
				name: "Mai Tai Bar",
				address: "2259 Kalakaua Ave, Honolulu, HI 96815",
				commentary: "Great service, food and drinks. Located inside Royal Hawaiian Hotel on the beach so sit outside and relax",
				tips: [],
				category: "extra-food",
				types: ["bar", "food available"],
				label: '',
				coord: {
					lat: 21.2772621,
					long: -157.8287186
				}
			},
			{
				name: "Roy's",
				address: "6600 Kalanianaʻole Hwy, Honolulu, HI 96825",
				commentary: "If you're looking for more of an extravagant meal or to celebrate an occasion, this is the spot to try.",
				tips: ["Make a reservation! It's hard to get a table here without one."],
				category: "foodAndDrinks",
				types: ["seafood"],
				label: '',
				coord: {
					lat: 21.2832851,
					long: -157.7143291
				}
			},
            {
				name: "Diamond Head",
				address: "Diamond Head, Honolulu, HI 96815",
				commentary: "Diamond Head is the iconic former volcano right off of Waikiki Beach. Hike up the trail and take a seat at one of the pill boxes up top to enjoy the view and breeze, or go to Kahala Lookout or Diamond Head lookout for one of the best views.",
				tips: [],
				category: "adventures",
				types: ["hiking"],
				label: '',
				coord: {
					lat: 21.261983,
					long: -157.8059987
				},
            },
			{
				name: "Lanikai Pillbox Hike",
				address: "265 Kaelepulu Dr, Kailua, HI 96734",
				commentary: "One of the easier/ shorter trails to hike that offer a panoramic view of Lanikai Beach. 2 Pillbox's that you can hangout at, at the top.",
				tips: ["Recommend a sunrise or sunset hike!"],
				category: "adventures",
				types: ["hiking"],
				label: '',
				coord: {
					lat: 21.3903466,
					long: -157.7191491
				}
			},
            {
				name: "Hanauma Bay",
				address: "7455 Kalanianaʻole Hwy, Honolulu, HI 96825",
				commentary: "One of the most famous places on the entire island for Snorkel. There is also Hanauma Bay Lookout if you don't want to go for a dip!",
				tips: ["Hanauma Bay's waters are clearest first thing on Wednesday morning since it's closed on Tuesdays"],
				category: "adventures",
				types: ["snorkeling", "beach"],
				label: '',
				coord: {
					lat: 21.2725925,
					long: -157.6971959
				},
            },
			{
				name: "Rainbow Drive-In",
				address: "3308 Kanaina Ave, Honolulu, HI 96815",
				commentary: "Iconic spot that serves local Hawaiian plates!",
				tips: [],
				category: "foodAndDrinks",
				types: ["local"],
				label: '',
				coord: {
					lat: 21.2759342,
					long: -157.8145272
				},
            },
			{
				name: "Hawaiian Crown Cafe",
				address: "159 Ka’iulani Ave 105, Honolulu, HI 96815",
				commentary: "Farm-to-table cafe & store serving up healthy & delicious items.",
				tips: [],
				category: "foodAndDrinks",
				types: ["coffee"],
				label: '',
				coord: {
					lat: 21.2772182,
					long: -157.8241953
				},
            },
			{
				name: "Kamehameha Bakery",
				address: "1284 Kalani St Unit D106, Honolulu, HI 96817",
				commentary: "Local favorite for pastries.",
				tips: ["Try the Poi donuts!!"],
				category: "foodAndDrinks",
				types: ["pastries"],
				label: '',
				coord: {
					lat: 21.3214786,
					long: -157.8760417
				}
			},
			{
				name: "Kualoa Ranch",
				address: "49-560 Kamehameha Hwy, Kaneohe, HI 96744",
				commentary: "Private 4,000 acre nature reserve & cattle ranch where JURASSIC PARK was filmed! & the show Five-0. There are a lot of things to do here: zipline, ATV, horseback, boat cruise, helicopter ride, jungle jeep expedition, etc.",
				tips: ["All day affair, pack appropriately", "Book a package for the outdoor adventures/ tour."],
				category: "extra-adv",
				types: ["hiking", "shopping"],
				label: '',
				coord: {
					lat: 21.520742,
					long: -157.837278
				}
			},
			{
				name: "Hideout at the Laylow",
				address: "2299 Kuhio Ave, Honolulu, HI 96815",
				commentary: "The Laylow in general is Instagram heaven and the Hideout is no exception. Food is good here too but at a minimum, stop by for a drink and snap some pics!",
				tips: [],
				category: "foodAndDrinks",
				types: ["food available", "bar"],
				label: '',
				coord: {
					lat: 21.2792893,
					long: -157.8264033
				},
            },
            {
				name: "Hanauma Bay Lookout",
				address: "7514-7538 Kalanianaʻole Hwy, Honolulu, HI 96825",
				commentary: "There is also Hanauma Bay Lookout if you don't want to go for a dip with a hiking trail nearby!",
				tips: [],
				category: "adventures",
				types: ["hiking"],
				label: '',
				coord: {
					lat: 21.2751805,
					long: -157.6958748
				},
            },
            {
				name: "Ala Moana Mall",
				address: "1450 Ala Moana Blvd, Honolulu, HI 96814",
				commentary: "Waikiki is Honolulu’s largest shopping mall. *If you're from Orlando, it's like the Mall of Millenia but even bigger.",
				tips: [],
				category: "adventures",
				types: [ "shopping", "food available"],
				label: '',
				coord: {
					lat: 21.291298,
					long: -157.8433791
				},
            },
            {
				name: "Waikiki Beach",
				address: "Waikiki Beach, Honolulu, HI 96815",
				commentary: "It’s the main touristy area of town where there’s a numerous hotels/ resorts, stores, and restaurants lining up the beach. A lot of beautiful beaches (Waikiki beach, Kuhio Beach, Kahanamoku Beach) to choose from. This is also where the more mainland restaurant brands will be.",
				tips: [],
				category: "adventures",
				types: ["beach", "shopping", "food available"],
				label: '',
				coord: {
					lat: 21.2762651,
					long: -157.8271082
				},
            },
			{
				name: "House Without A Key",
				address: "2199 Kalia Rd, Honolulu, HI 96815",
				commentary: "For sunset mai tai's and live music with hula dancers. Ocean front restaurant, great for sunset views.",
				tips: ["Must try Merriman’s famous Mai Tai"],
				category: "extra-food",
				types: ["bar", "local", "food available"],
				label: '',
				coord: {
					lat: 21.2782153,
					long: -157.8318756
				}
			},
			{
				name: "Merriman's",
				address: "1108 Auahi St 170, Honolulu, HI 96814",
				commentary: "Modern Hawaiian gastropub",
				tips: ["Recommend the smoked oysters and Merriman's signature Mai Tai"],
				category: "extra-food",
				types: ["bar", "local", "food available"],
				label: '',
				coord: {
					lat: 21.2936254,
					long: -157.8525764
				}
			},
			{
				name: "Island Vintage Wine Bar",
				address: "2301 Kalakaua Ave, Honolulu, HI 96815",
				commentary: "Wine bar on the second floor with some great light menu items like poke or steamed clams in white wine.",
				tips: [],
				category: "extra-food",
				types: ["bar", "coffee"],
				label: '',
				coord: {
					lat: 21.2781681,
					long: -157.828336
				}
			},
        ]
    },
    {
		name: "Iceland",
		continent: "Europe",
		coord: {
			lat: 65.03270,
			long: -20.1199478
        },
		cityTips: [
            "I recommend not getting accommodations in one city as you'll be doing a lot of driving back and forth. If you do, plan your days appropriately, gas ain't cheap.", "Look out for speed trap signs, and slow down if you see it!! They literally warn you that a speed trap device is approaching. If you see the sign, it's guaranteed there is one coming right up.", "Pack noodles and go grocery shopping for snacks/ sandwiches: meat and to-go food is very expensive.", "Don't have any food spots listed since we practically only ate gas station food, ramen noodles, and thai food (family style), due to tip #3", "Prepay for a gas card and use it at gas pumps. Credit cards at gas stations will ask for a pin.", "Rent a car and make sure to get insurance, Iceland's weather has a mind of it's own. (Our door almost got ripped off due a crazy wind storm that appeared out of no where).", "If you see a spot ending with 'foss', it means 'falls' like waterfall."
        ],
		imgPaths: [
			"./assets/photos/iceland/IMG_1710.jpg", 
			"./assets/photos/iceland/IMG_2354.jpg", 
			"./assets/photos/iceland/IMG_2364.jpg", 
			"./assets/photos/iceland/IMG_2841.jpg", 
			"./assets/photos/iceland/IMG_5129.jpg",
			"./assets/photos/iceland/IMG_8413.jpg"
		],
		recommendations: [
            {
				name: "Hallgrimskirkja Church",
				address: "Hallgrímstorg 1, 101 Reykjavík, Iceland",
				commentary: "Beautiful church/ unique",
				tips: [],
				category: "adventures",
				types: ["sightsee"],
				label: '',
				coord: {
					lat: 64.1420229,
					long: -21.9265493
				},
            },
            {
				name: "Blue Lagoon",
				address: "Norðurljósavegur, Iceland",
				commentary: "",
				tips: ['PREBOOK YOUR TIX ONLINE for the date & time you want to visit! We booked the comfort package when we went (~$45).'
                ],
				category: "adventures",
				types: ["spa"],
				label: '',
				coord: {
					lat: 63.8830498,
					long: -22.4306755
				},
            },
            {
				name: "Silfra Fissure at Thingvellir",
				address: "Thingvellir, 801 Selfoss, Iceland",
				commentary: "Snorkeling in Silfra Fissure is a MUST! Be prepared to go in water that is -16°(F). Silfra is said to have the clearest water in the world; feel free to have a sip of this pristine water at any point during your dive or snorkel (not kidding)!",
				tips: [
                    "Book through a company and they will provide wet suit and gear. I don't know if you can do it without booking a tour."
                ],
				category: "adventures",
				types: ["snorkeling", "hiking"],
				label: '',
				coord: {
					lat: 64.25591960000001,
					long: -21.1295497
				},
            },
			{
				name: "Thingvellir National Park",
				address: "Thingvellir, 801 Selfoss, Iceland",
				commentary: "This national park sits in a rift valley. This is where the tectonic plates of N America and Europe are drifting apart and you can see the results of mother nature doing it's work. If you want to dive between the 2 continental plates, look at my recommendation 'Silfra Fissure at Thingvellir'.",
				tips: [
                    "Look out for Öxará River - which falls off the side of one of the plates leading into a series of waterfalls in the Drekkingarhylur Pool", "You can walk alongside both plates"
                ],
				category: "adventures",
				types: ["snorkeling", "hiking"],
				label: '',
				coord: {
					lat: 64.25591960000001,
					long: -21.1295497
				},
            },
            {
				name: "Harpa Concert Hall",
				address: "Austurbakki 2, 101 Reykjavík, Iceland",
				commentary: "",
				tips: [],
				category: "adventures",
				types: ["sightsee"],
				label: '',
				coord: {
					lat: 64.15041,
					long: -21.932082
				},
            },
            {
				name: "Gullfoss Waterfall",
				address: "Gullfoss, Golden Circle, Iceland",
				commentary: "If you're doing the Golden Circle Tour, this a recommended stop. It's like 2 draw dropping waterfalls into 1!",
				tips: [],
				category: "adventures",
				types: ["sightsee"],
				label: '',
				coord: {
					lat: 64.3270716,
					long: -20.1199478
				},
            },
            {
				name: "Solheimasandur Plane Wreck",
				address: "Vik, Iceland",
				commentary: "Be prepared to walk! Google 'Parking for Sólheimasandur Plane Wreck' for better free parking but be prepared to walk ~45 mins to get to the plane wreck.",
				tips: ["Pack snacks and drinks, long walk!"],
				category: "adventures",
				types: ["sightsee"],
				label: '',
				coord: {
					lat: 63.4186315,
					long: -19.0060479
				},
            },
			{
				name: "Strokkur",
				address: "Haukadalsvegur, Iceland",
				commentary: "a fountain-type geyser located in a geothermal area and erupts every 6-10 minutes",
				tips: [],
				category: "adventures",
				types: ["sightsee"],
				label: '',
				coord: {
					lat: 64.3193048,
					long: -20.2930999
				},
            },
			{
				name: "Urridafoss Waterfall",
				address: "Urriðafossvegur, Iceland",
				commentary: "Iceland's most voluminous waterfall",
				tips: [],
				category: "adventures",
				types: ["sightsee"],
				label: '',
				coord: {
					lat: 63.905218,
					long: -20.7061601
				},
            },
			{
				name: "Seljalandsfoss",
				address: "Seljalandsfoss, Iceland",
				commentary: "Breathtakingly beautiful and one of the best known waterfalls in Iceland (this is the one where you can walk behind the waterfall).",
				tips: ["Bring a rain jacket - you WILL get wet"],
				category: "adventures",
				types: ["sightsee"],
				label: '',
				coord: {
					lat: 63.61562319999999,
					long: -19.9885688
				},
            },
			{
				name: "Dyrhólaey",
				address: "871 Vik, Iceland",
				commentary: "'The Arch with the Hole' is what it's called",
				tips: [],
				category: "adventures",
				types: ["sightsee"],
				label: '',
				coord: {
					lat: 63.4186315,
					long: -19.0060479
				},
            },
			{
				name: "Reynisfjara Black Sand Beach",
				address: "Reynisfjara Black Sand Beach, Iceland",
				commentary: "Enormous basalt stacks and black-sand made up of lava rocks, it's a beautiful site to see",
				tips: ["Fun fact: The basalt stacks were featured in Game of Thrones"],
				category: "adventures",
				types: ["sightsee"],
				label: '',
				coord: {
					lat: 63.40574040000001,
					long: -19.0716193
				},
            },
			{
				name: "Kerid Crater",
				address: "Kerid Crater, Iceland",
				commentary: "Volcanic crater lake that is surrounded by rare red volcanic rock",
				tips: ["Fun fact: The basalt stacks were featured in Game of Thrones"],
				category: "adventures",
				types: ["sightsee"],
				label: '',
				coord: {
					lat: 64.0413,
					long: -20.8851
				},
            },
			{
				name: "Vatnajokull Glacier",
				address: "Vatnajokull, Iceland",
				commentary: "Go ice cave exploring",
				tips: ["You can only do this in winter really, for safety reasons (you don't want to get stuck in a melting ice cave, do you?)", "Book with tour group so they provide equipment and transportation!"],
				category: "adventures",
				types: ["sightsee"],
				label: '',
				coord: {
					lat: 64.42196899999999,
					long: -16.7902035
				},
            },
			{
				name: "Fjadrargljufur Canyon",
				address: "Fjadrargljufur Canyon, Iceland",
				commentary: "This canyon is over 100 meters deep and is believed to be over 2 million years old",
				tips: [],
				category: "adventures",
				types: ["sightsee"],
				label: '',
				coord: {
					lat: 63.771279,
					long: -18.1718158
				},
            },
			{
				name: "Olgerdin Brewery",
				address: "Grjóthálsi 7-11, 110 Reykjavík, Iceland",
				commentary: "Oldest brewery in all of Iceland!",
				tips: ["Try some Icelandic beer or honey wine while you're there"],
				category: "foodAndDrinks",
				types: ["brewery"],
				label: '',
				coord: {
					lat: 64.12327619999999,
					long: -21.8020381
				},
            },
        ]
    },
    {
		name: "Seoul,Korea",
		continent: "Asia",
		coord: {
			lat: 37.5509473,
			long: 126.9892965
        },
		cityTips: [
			"Rent a wifi egg (pocket wifi) at the airport for your stay (return before you depart Korea). Recommend that over a prepaid SIM card.", "Don't rely on google maps, instead use KakaoMap (more detailed) or Naver Maps.", "Get a T-Money card from any convenience store to ride the subway; best way to get around the city. Download Subway Korea App for directions.", "Expect to pay cover at Korean clubs, even gals. Drinks at bars and clubs are expensive so you can buy from a convenience store to pregame.", "There are no open-container laws in Korea so you'll see people drinking practically anywhere, but DON'T drive while intoxicated, that law still applies.", "Don't be afraid to eat at that sidewalk kiosks or tents, it's better than restaurants sometimes!", "Things to pack (hard to find in Korea): deodorant and tampons (if you're very particular on size, material, or brand)"
		],
		imgPaths: [
			"./assets/photos/seoul/IMG_2804.jpg", 
			"./assets/photos/seoul/IMG_2805.jpg", 
			"./assets/photos/seoul/IMG_2806.jpg", 
			"./assets/photos/seoul/IMG_2807.jpg", 
			"./assets/photos/seoul/IMG_2808.jpg",
			"./assets/photos/seoul/IMG_2809.jpg"
		],
		recommendations: [
            {
				name: "Dragon Hill Spa",
				address: "40 Hangang-daero 21na-gil, Hangangno 3(sam)-ga, Yongsan-gu, Seoul, South Korea",
				commentary: "One of the best in Seoul! Spa, sauna, golf course, & cinema all in one!",
				tips: [],
				category: "adventures",
				types: ["spa"],
				label: '',
				coord: {
					lat: 37.5273486,
					long: 126.9640848
				},
            },
            {
				name: "Itaewon Land Sauna",
				address: "732-20 Hannam-dong, Yongsan-gu, Seoul, South Korea",
				commentary: "A less touristy jimjilbang (sauna). They have a big traditional oak wood sauna",
				tips: [],
				category: "adventures",
				types: ["spa"],
				label: '',
				coord: {
					lat: 37.534083,
					long: 126.9972736
				},
            },
            {
				name: "N Seoul Tower",
				address: "105 Namsangongwon-gil, Yongsan 2(i)ga-dong, Yongsan-gu, Seoul, South Korea",
				commentary: "Go on a clear day or at night for a great view of Seoul. You've probably seen the famous padlock bridge in K-dramas (& Netflix's To All The Boys: Always & Forever)!",
				tips: [
                    "PREBOOK your ticket online (~$9)! Gets busy/ packed, especially on weekends.",
                    "I recommend taking the cable car up and taking the stairs down."
                ],
				category: "adventures",
				types: ["sightsee", "food available", "shopping"],
				label: '',
				coord: {
					lat: 37.5509473,
					long: 126.9892965
				},
            },
            {
				name: "Gyeongbokgung Palace",
				address: "161 Sajik-ro, Jongno 1(il).2(i).3(sam).4(sa), Jongno-gu, Seoul, South Korea",
				commentary: "",
				tips: [
                    "Make sure to see the changing of the guards' ceremony (done twice: 10am & 2pm - except Tuesdays).",
                    "Outside of the palace are Hanbok shops where you can rent Hanboks by the hour or the whole day (you'll see many people do this and walk around/ in the palace)."
                ],
				category: "adventures",
				types: ["sightsee"],
				label: '',
				coord: {
					lat: 37.5773616,
					long: 126.9766844
				},
            },
            {
				name: "Bukchon Hanok Village",
				address: "31-112 Gahoe-dong, Jongno-gu, Seoul, South Korea",
				commentary: "Well preserved, traditional, Korean village: taking a walk around the village is like being transported back in time.",
				tips: [
                    "Stop by the Tourist Info Center and get a map (shows you all the main points to see).",
                    ""
                ],
				category: "adventures",
				types: ["sightsee", "food available", "shopping"],
				label: '',
				coord: {
					lat: 37.5833149,
					long: 126.9829637
				},
            },
            {
				name: "Lotte World",
				address: "240 Olympic-ro, Jamsil-dong, Songpa-gu, Seoul, South Korea",
				commentary: "It's like Disney world but not Disney. A day's worth activities: world's largest indoor theme park, shopping malls, outdoor amusement park, sports facilities, and more!",
				tips: [],
				category: "adventures",
				types: ["sightsee", "shopping", "food available"],
				label: '',
				coord: {
					lat: 37.5111158,
					long: 127.098167
				},
            },
            {
				name: "Bukhansan National Park",
				address: "262 Bogukmun-ro, Jeongneung 4(sa)-dong, Seongbuk-gu, Seoul, South Korea",
				commentary: "Hike up Bukhansan Mountain for a view over the city center of Seoul and the Hangang River (follow markers for levels of hike).",
				tips: [],
				category: "adventures",
				types: ["hiking"],
				label: '',
				coord: {
					lat: 37.6197679,
					long: 126.9955839
				},
            },
            {
				name: "Myeongdong Market",
				address: "Myeong-dong, Jung-gu, Seoul, South Korea",
				commentary: "Myeongdong Market is one of South Korea’s prime shopping districts – you’ll find department stores, shopping malls, and independent shops, together with a host of trendy restaurants and cafes.",
				tips: [],
				category: "adventures",
				types: ["shopping", "food available"],
				label: '',
				coord: {
					lat: 37.55998,
					long: 126.9858296
				},
            },
            {
				name: "Starfield Coex Library",
				address: "513 Yeongdong-daero, Samseong 1(il)-dong, Gangnam-gu, Seoul, South Korea",
				commentary: "Inside Coex Mall: THE most beautiful library EVER. Over 50,000 books and 2 stories. You've probably seen this library in K-dramas (like Record of Youth).",
				tips: [],
				category: "adventures",
				types: ["sightsee", "shopping"],
				label: '',
				coord: {
					lat: 37.51168500000001,
					long: 127.0593394
				},
            },
            {
				name: "Seoul City Wall Trail",
				address: "622-83 Changsin-dong, Jongno-gu, Seoul, South Korea",
				commentary: "Usually seen in K-Dramas where they go and sit on the wall! 'The Fortress Wall of Seoul' with a skyline view of the city and mountains. Recommend going during sunset.",
				tips: [],
				category: "adventures",
				types: ["sightsee"],
				label: '',
				coord: {
					lat: 37.5779633,
					long: 127.0084459
				},
            },
            {
				name: "Namdaemun Market",
				address: "21 Namdaemunsijang 4-gil, Hoehyeon-dong, Jung-gu, Seoul, South Korea",
				commentary: "Largest traditional market",
				tips: ["FYI market is closed on Sunday"],
				category: "adventures",
				types: ["shopping","food available"],
				label: '',
				coord: {
					lat: 37.55914730000001,
					long: 126.977641
				},
            },
            {
				name: "Changdeok Palace",
				address: "99 Yulgok-ro, Waryong-dong, Jongno-gu, Seoul, South Korea",
				commentary: "Part of the Five Grand Palaces made by the Joseon Dynasty King. The rear garden at the palace was done to create the ideal resting place for the royal family members.",
				tips: [
                    "PREBOOK tickets online to avoid lines (~2.50)"
                ],
				category: "adventures",
				types: ["sightsee"],
				label: '',
				coord: {
					lat: 37.5794309,
					long: 126.9910426
				},
            },
            {
				name: "Banpo Bridge",
				address: "Banpo 2(i)-dong, Seocho-gu, Seoul, South Korea",
				commentary: "2 tier bridge over the famous Han River.",
				tips: [
                    "Watch the Rainbow Fountain Show (best location for best view is from Banpo Hangang Park!): Check the times online (usually once at noon and a few at night)."
                ],
				category: "adventures",
				types: ["sightsee"],
				label: '',
				coord: {
					lat: 37.5044869,
					long: 126.9944423
				},
            },
            {
				name: "Mugyodong Bugeokukjib",
				address: "38 Eulji-ro 1-gil, Mugyo-dong, Jung-gu, Seoul, South Korea",
				commentary: "Very unique experience: They serve only one local dish per day, there is no menu and the meal comes with many small side dishes to combine with the entree.",
				tips: [],
				category: "extra-food",
				types: ["food available", "local"],
				label: '',
				coord: {
					lat: 37.5677037,
					long: 126.9798457
				},
            },
			{
				name: "Seonyudo Park",
				address: "1 Dangsan-dong, Yeongdeungpo-gu, Seoul, South Korea",
				commentary: "An island on the Hangang River that is a popular film location for Kdramas. The best part is the Seonyudo Bridge (pedestrian-only) that connects to the island (it's very romantic at night).",
				tips: [],
				category: "extra-adv",
				types: ["sightsee", "coffee"],
				label: '',
				coord: {
					lat: 37.543569,
					long: 126.8997156
				},
            },
			{
				name: "Hongdae",
				address: "365-8 Seogyo-dong, Mapo-gu, Seoul, South Korea",
				commentary: "Basically our version of a college town (like Athens, GA but smaller and closer together). Hongdae is also one of Seoul's biggest nightlife destinations and home to the city's biggest bars and  clubs. Streets are lined with lots of stores and an assortment of amazing (affordable) restaurants (it is a college town afterall). You'll see students busking (amateur street performers) as well during the day and night.",
				tips: [],
				category: "adventures",
				types: ["sightsee", "shopping", "food available", "bar"],
				label: '',
				coord: {
					lat: 37.553166,
					long: 126.9218031
				},
            },
			{
				name: "Choigozip Hongdae",
				address: "25, World Cup buk-ro 2-gil, Mapo-gu, Seoul 121-898 South Korea",
				commentary: "Popular KBBQ spot in Hongdae",
				tips: [],
				category: "foodAndDrinks",
				types: ["local"],
				label: '',
				coord: {
					lat: 37.5564249,
					long: 126.9220821
				},
            },
			{
				name: "Okrumong",
				address: "402-18 Seogyo-dong, Mapo-gu, Seoul, South Korea",
				commentary: "Popular Bingsu (shaved ice dessert) and Juk (porridge) spot.",
				tips: [],
				category: "foodAndDrinks",
				types: ["dessert"],
				label: '',
				coord: {
					lat: 37.5487208,
					long: 126.9202828
				},
            },
			{
				name: "J. Vinyl",
				address: "61-1 Wausan-ro, Mapo-gu, Seoul, South Korea",
				commentary: "Small bar that offers their affordable cocktails to go in a little plastic bag. If you want to skip chugging soju that was bought from the convience store.",
				tips: ["it is NOT illegal to drink on the streets in Korea"],
				category: "extra-food",
				types: ["bar"],
				label: '',
				coord: {
					lat: 37.5500295,
					long: 126.9228849
				},
            },
			{
				name: "Stylenanda Pink Pool Cafe",
				address: "23 Wausan-ro 29da-gil, Seogyo-dong, Mapo-gu, Seoul, South Korea",
				commentary: "Trendy, Instagram spot - everything's pink",
				tips: [],
				category: "extra-food",
				types: ["coffee", "shopping"],
				label: '',
				coord: {
					lat: 37.554642,
					long: 126.9275229
				},
            },
			{
				name: "Common Ground",
				address: "200 Achasan-ro, Jayang 4(sa)-dong, Gwangjin-gu, Seoul, South Korea",
				commentary: "Hip, modern mall constructed from 200 shipping containers, featuring fashion & lifestyle shops & dining. (If you're from Orlando: It's like Boxi Park but BIGGER and with shops)",
				tips: [],
				category: "extra-food",
				types: ["shopping", "food available"],
				label: '',
				coord: {
					lat: 37.5411175,
					long: 127.0660706
				},
            },
			{
				name: "Byeongbangchi Skywalk",
				address: "225 Byeongbangchi-gil, Jeongseon-eup, Jeongseon-gun, Gangwon-do, South Korea",
				commentary: "A skywalk (a tempered glass floor) that offers breathtaking views of a nearby Korean peninsula and Donggang River. The view is similar to Grand Canyon's Horseshoe Bend.",
				tips: ["Have to pay for admission (buy tickets ahead of time)", "Friends have recommended doing the zipline (apparently the longest and fastest zipline in Asia)"],
				category: "extra-adv",
				types: ["sightsee", "hiking"],
				label: '',
				coord: {
					lat: 37.340895,
					long: 128.6333483
				},
            },
			{
				name: "Wolchulsan Cloud Bridge",
				address: "280-43 Cheonhwangsa-ro, Yeongam-eup, Yeongam-gun, Jeollanam-do 58424 South Korea",
				commentary: "One of the more challenging hikes with numerous steep steel ladders and staircases to reach the peak. The bright red bridge connects the 2 peaks and has became a tourist attraction due to the beautiful views from a great vantage point.",
				tips: ["Using Naver, type in “Wolchulsan National Park” it will route you to the parking lot", "This is an intermediate to advance labeled hike"],
				category: "extra-adv",
				types: ["hiking"],
				label: '',
				coord: {
					lat: 34.7750486,
					long: 126.7218085
				},
            },
			{
				name: "Itaewon Land",
				address: "732-20 Hannam-dong, Yongsan-gu, Seoul, South Korea",
				commentary: "Giant traditional Korean jjimjilbang (spa). Specifically known for getting water for their baths from underground. They have guestrooms if you prefer to stay here instead of a hotel.",
				tips: ["open 24 hours"],
				category: "extra-adv",
				types: ["spa"],
				label: '',
				coord: {
					lat: 37.534083,
					long: 126.9972736
				}
			},
			{
				name: "Itaewon Antique Street",
				address: "Itaewon-dong, Yongsan-gu, Seoul",
				commentary: "A unique shopping experience unlike the other shopping districts. The street is lined with antique shops selling all sorts of Asian and European goodies.",
				tips: [],
				category: "extra-adv",
				types: ["shopping"],
				label: '',
				coord: {
					lat: 37.5400456,
					long: 126.9921017
				}
			},
			{
				name: "G.N. Perfume Studio",
				address: "2F, 53, Myeongdong 2-gil, Jung-gu, Seoul",
				commentary: "A unique experience- you get to create your own perfume scent! Customize the perfume from its' base and natural flavors to the bottle and label inscription.",
				tips: ["Advance booking required - go on their website"],
				category: "extra-adv",
				types: ["shopping"],
				label: '',
				coord: {
					lat: 37.5610562,
					long: 126.9833297
				}
			},
			{
				name: "Sour Pongdang",
				address: "6 Noksapyeong-daero 54-gil, Itaewon-dong, Yongsan-gu, Seoul",
				commentary: "Korean craft beers! & this is the first bar in Asia to specialize in sours. Over 80 different imported bottles and a great selection of domestic beers like the 'Jeju Island Tangerine Gose' for all my beer lovers.",
				tips: ["Closed Mondays"],
				category: "extra-food",
				types: ["brewery", "bar"],
				label: '',
				coord: {
					lat: 37.5392274,
					long: 126.9876058
				}
			},
			{
				name: "Softree Ice Cream",
				address: "24-12 Itaewon-ro 49-gil, Hannam-dong, Yongsan-gu, Seoul, South Korea",
				commentary: "Highly recommended by a friend and known for unique ice-cream desserts, like vanilla ice cream with real honeycomb.",
				tips: [],
				category: "extra-food",
				types: ["dessert"],
				label: '',
				coord: {
					lat: 37.5373286,
					long: 126.999518
				}
			},
			{
				name: "Lobster Bar",
				address: "140-1 Itaewon-ro, Yongsan-gu, Seoul, Korea",
				commentary: "",
				tips: ["Recommended to try the Maine Lobster Roll or Lobster Mac & Cheese"],
				category: "extra-food",
				types: ["food available", "seafood"],
				label: '',
				coord: {
					lat: 37.5339468,
					long: 126.9893291
				}
			},
			{
				name: "Seoulism",
				address: "48-7 Songpa-dong, Songpa-gu, Seoul, South Korea",
				commentary: "Stunning views of the city from this rooftop view",
				tips: ["A very popular cafe so go during less-popular times or expect a wait, especially for pics.", "Due to its popularity, the cafe prices here are high."],
				category: "extra-food",
				types: ["food available", "seafood"],
				label: '',
				coord: {
					lat: 37.509745,
					long: 127.1115349
				}
			},
        ]
    },
    {
		name: "Dubai,UAE",
		continent: "Asia",
		coord: {
			lat: 25.2442856,
			long: 55.2858641
        },
		cityTips: [
            "If you have time, I recommend booking a desert excursion - an all day affair: picked up in the morning/ afternoon and get taken out to the dunes for sandboarding, camel rides, etc. (depending on what you booked). Ends with a dinner and a show out the desert.", "Recommended dressing modestly, in respect for their culture (jeans & t-shirts, not anything that shows too much skin like tanktops and shorts).", "Show respect during Ramadan (can't eat or drink in public)."
        ],
		imgPaths: [
			"./assets/photos/dubai/IMG_0402.jpg", 
			"./assets/photos/dubai/IMG_2811.jpg", 
			"./assets/photos/dubai/IMG_2812.jpg", 
			"./assets/photos/dubai/IMG_3851.JPG", 
			"./assets/photos/dubai/IMG_3852.jpg",
			"./assets/photos/dubai/IMG_9238.jpg"
		],
		recommendations: [
			{
				name: "Burj Khalifa",
				address: "1 Sheikh Mohammed bin Rashid Blvd - Downtown Dubai - Dubai - United Arab Emirates",
				commentary: "The tallest building in the world and is equally impressive looking at it from the ground or at the top. Highly recommend going to the top and enjoying that 360 degree view of Dubai.",
				tips: ["Book tickets in advance, they only allow x amount of people at a time."],
				category: "adventures",
				types: ["sightsee"],
				label: '',
				coord: {
					lat: 25.1975148,
					long: 55.27487319999999
				}
			},
			{
				name: "Dubai Mall",
				address: "Financial Center Street, Along Sheikh Zayed Road, Next to Burj Khalifa - Dubai - United Arab Emirates",
				commentary: "One of the biggest shopping malls in the world and has so many activities inside the mall, aside from just shopping, like the aquarium, an indoor ski resort, etc.",
				tips: ["Don't forget to see the iconic Dubai Mall Waterfall", "There is an extravagant (free) fountain show at the Dubai Fountains in front of the mall, recommend just seeing this at least once."],
				category: "adventures",
				types: ["sightsee", "shopping"],
				label: '',
				coord: {
					lat: 25.198765,
					long: 55.2796053
				}
			},
			{
				name: "Gold and Spice Souks",
				address: "Gold Corner Building, 3rd Floor - Gold Souq - Deira - Dubai - United Arab Emirates",
				commentary: "Traditional outdoor markets. There is the Gold Souk, famous for its bona fide gold jewerly shops, and few minutes down is the traiditonal Spice Souk, where almost every kind of spice and herb is available. Even if you don't buy anything, it's a great experience just strolling through them.",
				tips: [],
				category: "adventures",
				types: ["shopping"],
				label: '',
				coord: {
					lat: 25.2686016,
					long: 55.2974063
				}
			},
			{
				name: "Dubai Frame",
				address: "Zabeel Park Jogging Track - Za'abeelAl Kifaf - Dubai - United Arab Emirates",
				commentary: "A huge picture-frame-like structure that is strategically placed to capture the city's skyline in the frame. There is an observation deck where you can get a great view of both Dubai's old and new town.",
				tips: ["Buy tickets ahead of time to skip the lines."],
				category: "adventures",
				types: ["sightsee"],
				label: '',
				coord: {
					lat: 25.23556,
					long: 55.3003639
				}
			},
			{
				name: "Jumeirah Mosque",
				address: "JumeirahJumeirah 1 - Dubai - United Arab Emirates",
				commentary: "Beautiful mosque in Dubai.",
				tips: [],
				category: "adventures",
				types: ["sightsee"],
				label: '',
				coord: {
					lat: 25.2442856,
					long: 55.2858641
				}
			},
        ]
    },
    // {
	// 	name: "Rome,Italy",
	// 	continent: "Europe",
	// 	cityTips: [

	// 	],
	// 	coord: {
	// 		lat: 41.9028,
	// 		long: 12.4964
    //     },
	// 	recommendations: [
	// 		// Most updated obj properties:
	// 		// {
	// 			// name: "",
	// 			// address: "",
	// 			// commentary: "",
	// 			// tips: [],
	// 			// category: "",
	// 			// types: [],
	// 			// label: '',
	// 			// coord: {
	// 			// 	lat: 0,
	// 			// 	long: 0
	// 			// }
	// 		//},
	// 		{
	// 			name: "Colesseum",
	// 			address: "",
	// 			commentary: "",
	// 			tips: ["Buy tickets ahead of time to skip lines (you can also get an audio tour guide)."],
	// 			category: "adventures",
	// 			types: ["sightsee"],
	// 			label: '',
	// 			// coord: {
	// 			// 	lat: 0,
	// 			// 	long: 0
	// 			// }
	// 		},
	// 		{
	// 			name: "Palatine Hill",
	// 			address: "",
	// 			commentary: "",
	// 			tips: [],
	// 			category: "adventures",
	// 			types: ["sightsee"],
	// 			label: '',
	// 			// coord: {
	// 			// 	lat: 0,
	// 			// 	long: 0
	// 			// }
	// 		},
	// 		{
	// 			name: "Roman Forum",
	// 			address: "",
	// 			commentary: "",
	// 			tips: [],
	// 			category: "adventures",
	// 			types: ["sightsee"],
	// 			label: '',
	// 			// coord: {
	// 			// 	lat: 0,
	// 			// 	long: 0
	// 			// }
	// 		},
	// 		{
	// 			name: "Arch of Constantine",
	// 			address: "",
	// 			commentary: "",
	// 			tips: [],
	// 			category: "adventures",
	// 			types: ["sightsee"],
	// 			label: '',
	// 			// coord: {
	// 			// 	lat: 0,
	// 			// 	long: 0
	// 			// }
	// 		},
	// 		{
	// 			name: "Pantheon",
	// 			address: "",
	// 			commentary: "",
	// 			tips: [],
	// 			category: "adventures",
	// 			types: ["sightsee"],
	// 			label: '',
	// 			// coord: {
	// 			// 	lat: 0,
	// 			// 	long: 0
	// 			// }
	// 		},
	// 		{
	// 			name: "Trevi Fountain",
	// 			address: "",
	// 			commentary: "Like seen in the Lizzie Maguire Movie lol",
	// 			tips: ["Gets VERY crowded and they don't allow you to sit on the fountain edge (unless you can do it before they yell at you)."],
	// 			category: "adventures",
	// 			types: ["sightsee"],
	// 			label: '',
	// 			// coord: {
	// 			// 	lat: 0,
	// 			// 	long: 0
	// 			// }
	// 		},
	// 		{
	// 			name: "Spanish Steps",
	// 			address: "",
	// 			commentary: "",
	// 			tips: [],
	// 			category: "adventures",
	// 			types: ["sightsee"],
	// 			label: '',
	// 			// coord: {
	// 			// 	lat: 0,
	// 			// 	long: 0
	// 			// }
	// 		},
	// 		{
	// 			name: "Vatican City",
	// 			address: "",
	// 			commentary: "Prepare this to be an all day event",
	// 			tips: [],
	// 			category: "adventures",
	// 			types: ["sightsee"],
	// 			label: '',
	// 			// coord: {
	// 			// 	lat: 0,
	// 			// 	long: 0
	// 			// }
	// 		},
    //     ]
    // },
	{
		name: "Venice,Italy",
		continent: "Europe",
		cityTips: [
			"Get lost in Venice; I recommend just wandering around once in a while, you'll find a lot of hidden gems."
		],
		coord: {
			lat: 45.4408,
			long: 12.3155
        },
		imgPaths: [
			"./assets/photos/venice/IMG_1984.jpg", 
			"./assets/photos/venice/IMG_4176.jpg", 
			"./assets/photos/venice/IMG_4278.jpg", 
			"./assets/photos/venice/IMG_4314.jpg", 
			"./assets/photos/venice/IMG_8429.jpg",
			"./assets/photos/venice/IMG_9800.jpg"
		],
		recommendations: [
			{
				name: "Piazza San Marco",
				address: "P.za San Marco, 30100 Venezia VE, Italy",
				commentary: "St. Mark's Square: The heart of Venice. Holds 3 major sites: The Basilica di San Marco, The Torre dell'Orologio, and The Doges' Palace.",
				tips: ["Recommend grabbing something to eat or some coffee at one of the side outdoor restaurants/ cafe and relaxing (or people watching)."],
				category: "adventures",
				types: ["sightsee", "food available", "coffee"],
				label: '',
				coord: {
					lat: 45.4342798,
					long: 12.338111
				}
			},
			{
				name: "Rialto Bridge",
				address: "Sestiere San Polo, 30125 Venezia VE, Italy",
				commentary: "Enjoy a beautiful view of the city while watching gondolas, vaporettos, and ferries travelling up and down the Grand Canal.",
				tips: ["Gets very packed"],
				category: "adventures",
				types: ["sightsee"],
				label: '',
				coord: {
					lat: 45.4376436,
					long: 12.3290729
				}
			},
			{
				name: "Bridge of Sighs",
				address: "P.za San Marco, 1, 30124 Venezia VE, Italy",
				commentary: "Inside the Doges' Palace, prisoners on their way to execution would have one final view of the city through this window. You can view the Bridge of Signs from inside and walk through it (and look through the window that shows a unique view of the city), or view the bridge from the outside, facing the Doges' Palace with the Grand Canyon behind you. Recommend both views, equally unique and esquiste",
				tips: ["Book tickets ahead of time for Doges' Palace"],
				category: "adventures",
				types: ["sightsee"],
				label: '',
				coord: {
					lat: 45.4336664,
					long: 12.3401954
				}
			},
			{
				name: "Campanile Di San Marco",
				address: "P.za San Marco, 30124 Venezia VE, Italy",
				commentary: "Bell tower that sits in St. Mark's Square with a great view up top",
				tips: [],
				category: "adventures",
				types: ["sightsee"],
				label: '',
				coord: {
					lat: 45.4342798,
					long: 12.338111
				}
			},
			{
				name: "Libreria Acqua Alta",
				address: "Calle Lunga Santa Maria Formosa, 5176b, 30122 Venezia VE, Italy",
				commentary: "Chaotic yet charming book shop, great instagram spot but also a great hidden gem, with a stiarcase made from old, vibrant books.",
				tips: [],
				category: "adventures",
				types: ["sightsee", "shopping"],
				label: '',
				coord: {
					lat: 45.43797980000001,
					long: 12.342292
				}
			},
			{
				name: "A La Vecia Papussa",
				address: "Fondamenta Misericordia, 2612, 30121 Venezia VE, Italy",
				commentary: "A secret bar that is one of the local's favorites",
				tips: [],
				category: "foodAndDrinks",
				types: ["bar"],
				label: '',
				coord: {
					lat: 45.4451216,
					long: 12.3306499
				}
			},
			{
				name: "Dal Moro's",
				address: "Calle Casseleria, 5324, 30122 Venezia VE, Italy",
				commentary: "A great take out spot for fresh pasta",
				tips: ["Try the squid ink pasta!"],
				category: "foodAndDrinks",
				types: ["local"],
				label: '',
				coord: {
					lat: 45.4363112,
					long: 12.3400581
				}
			},
		]
	},
	{
		name: "Florence,Italy",
		continent: "Europe",
		cityTips: [
			"Don't leave without trying the Florentine Steak at least once! Usually offered at any restaurant around town. It's huge in size, some restaurants will state that it's for 2 people. Don't underestimate it.", "Not many food spots listed since I ate at any of the little shops in the piazzas I visited"
		],
		coord: {
			lat: 43.7696,
			long: 11.2558
        },
		imgPaths: [
			"./assets/photos/florence/IMG_2811.jpg", 
			"./assets/photos/florence/IMG_4088.jpg", 
			"./assets/photos/florence/IMG_4107.jpg", 
			"./assets/photos/florence/IMG_2805.jpg", 
			"./assets/photos/florence/IMG_2806.jpg",
			"./assets/photos/florence/IMG_2809.jpg"
		],
		recommendations: [
			{
				name: "Ponte Vecchio",
				address: "Ponte Vecchio, 50125 Firenze FI, Italy",
				commentary: "One of the oldest bridges in Florence, and the most recognizable. It is filled with little shops and stalls.",
				tips: ["The market is usally filled with people.", "Don't forget to get the views from the bridge, but also of the bridge on the outside."],
				category: "adventures",
				types: ["sightsee", "shopping"],
				label: '',
				coord: {
					lat: 43.767925,
					long: 11.2531435
				}
			},
			{
				name: "Duomo di Firenze",
				address: "Piazza del Duomo, 50122 Firenze FI, Italy",
				commentary: "Full name is Cattedrale di Santa Maria del Fiore, more commonly known as Duomo. It is easily one of the biggest buildings in Florence (can't miss it). It is as exquiste from the outside as it is from the inside.",
				tips: ["Book a tour: they'll take you inside and to the top of the Duomo."],
				category: "adventures",
				types: ["sightsee"],
				label: '',
				coord: {
					lat: 43.7730912,
					long: 11.2554649
				}
			},
			{
				name: "La Terrazza Bar",
				address: "Vicolo dell'Oro, 6, 50123 Firenze FI, Italy",
				commentary: "Rooftop bar perched within the Consorti Tower for great views while relaxing on some Tuscan wine.",
				tips: [],
				category: "foodAndDrinks",
				types: ["bar"],
				label: '',
				coord: {
					lat: 43.7687485,
					long: 11.2533492
				}
			},
			{
				name: "Boboli Gardens",
				address: "Piazza de' Pitti, 1, 50125 Firenze FI, Italy",
				commentary: "A very serene spot with beautiful and intricate designs, if you want to get away from all the people and city vibes.",
				tips: [],
				category: "adventures",
				types: ["sightsee"],
				label: '',
				coord: {
					lat: 43.7652537,
					long: 11.2499219
				}
			},
			{
				name: "Tomb of Galileo",
				address: "Piazza di Santa Croce, 16, 50122 Firenze FI, Italy",
				commentary: "",
				tips: [],
				category: "adventures",
				types: ["sightsee"],
				label: '',
				coord: {
					lat: 43.7685641,
					long: 11.2622774
				}
			},
			{
				name: "Piazza della Signoria",
				address: "P.za della Signoria, 50122 Firenze FI, Italy",
				commentary: "This Piazza is filled with statues, but most noteables are the 500-year-old Fountain of Neptune (can't miss this one, it's huge), Perseus with the head of Medusa, and Michelangelo's David (this one is a replica- original David is in Academia Gallery).",
				tips: ["See if you can spot the signs for the execution site of Savonarola and the fire of the Vanities that occured in this Piazza."],
				category: "adventures",
				types: ["sightsee", "coffee", "food available"],
				label: '',
				coord: {
					lat: 43.7695499,
					long: 11.2560046
				}
			},
			{
				name: "Giotto's Bell Tower",
				address: "Piazza del Duomo, 50122 Firenze FI, Italy",
				commentary: "Right next to the Florence Cathedral, you can't miss this tower. You can climb up this tower, about 400-500 steps to get to the top, but the views are incredible and worth the effort!",
				tips: ["No lift, so be prepared to work out. You can get a gelato or a refreshing Aperol Spritz after."],
				category: "adventures",
				types: ["sightsee", "hiking"],
				label: '',
				coord: {
					lat: 43.7730912,
					long: 11.2554649
				}
			},
			{
				name: "Piazzale Michelangelo",
				address: "50125 Firenze FI, Italy",
				commentary: "Top of this hill is a great spot to watch the sunset over Florence with views of the city and mountains.",
				tips: ["Make sure to come beforehand to enjoy the view and claim your spot for the sunset. This area can fill up quickly."],
				category: "adventures",
				types: ["sightsee"],
				label: '',
				coord: {
					lat: 43.7437096,
					long: 11.2580472
				}
			},
			{
				name: "Galleria dell'Accademia",
				address: "Via Ricasoli, 58/60, 50129 Firenze FI, Italy",
				commentary: "Home of the original Michelangelo's David sculpture and other masterpieces of Renaissance art.",
				tips: ["Take a look at David's eyes if you can, I was told by my guide that his eyes are facing directly at Rome"],
				category: "adventures",
				types: ["sightsee"],
				label: '',
				coord: {
					lat: 43.7767682,
					long: 11.2585778
				}
			},
			{
				name: "Gelateria La Carraia",
				address: "Piazza Nazario Sauro, 25/r, 50124 Firenze FI, Italy",
				commentary: "Silky and creamy gelato spot",
				tips: ["My favorite was the dark chocolate with orange and strawberry cheesecake flavor"],
				category: "foodAndDrinks",
				types: ["dessert"],
				label: '',
				coord: {
					lat: 43.7696221,
					long: 11.2466711
				}
			},
		]
	},
	{
		name: "Orlando,Florida",
		continent: "North America",
		cityTips: [
			"Expect traffic on I4 highway, especially around Disney area.", "For the beer lovers- Orlando house over 25 local craft breweries. I listed the ones I've been to, but highly recommend checking at least 1 of these local breweries out."
		],
		imgPaths: [
			"./assets/photos/orlando/IMG_2830.jpg", 
			"./assets/photos/orlando/IMG_4516.jpg",
			"./assets/photos/orlando/IMG_2831.jpg", 
			"./assets/photos/orlando/IMG_2832.jpg", 
			"./assets/photos/orlando/IMG_5240.jpg",
			"./assets/photos/orlando/IMG_2828.jpg"
		],
		coord: {
			lat: 28.535778,
			long: -81.3756003
        },
		recommendations: [
			// Most updated obj properties:
			// {
				// name: "",
				// address: "",
				// commentary: "",
				// tips: [""],
				// category: "",
				// types: ["",""],
				// label: '',
				// coord: {
				// 	lat: 0,
				// 	long: 0
				// }
			//},
			{
				name: "The Wellborn",
				address: "211 N Lucerne Cir W, Orlando, FL 32801",
				commentary: "A very hipster/ instagram spot with delicious craft cocktails. The place is huge, outdoor seating available as well as 2 floors inside with patio seating upstairs.",
				tips: ["Parking can be tough here so uber if you can."],
				category: "foodAndDrinks",
				types: ["bar"],
				label: '',
				coord: {
					lat: 28.535778,
					long: -81.3756003
				}
			},
			{
				name: "Tori Tori",
				address: "720 N Mills Ave, Orlando, FL 32803",
				commentary: "Japanese pub with delicious craft cocktails and small bites.",
				tips: ["They don't take reserverations, it's first come, first serve", "I always order the salmon or crab fried rice, the gyoza, beef yakatori with chimichurri skewer, and the chicken oysters skewer."],
				category: "foodAndDrinks",
				types: ["bar", "asian"],
				label: '',
				coord: {
					lat: 28.5539774,
					long: -81.36475399999999
				}
			},
			{
				name: "Domu",
				address: "3201 Corrine Dr Suite 100, Orlando, FL 32803",
				commentary: "Adjacent to the East End Market is Domu, a very stylish Asian restaurant and craft bar.",
				tips: ["They don't take reserverations, it's first come, first serve", "Cannot order ramen at the bar, only in the dining room. Recommend ordering small plates (apps) and a drink at the bar while waiting for a table.", "If you try anything at all here, it has to be the Domu Wings", "Parking can be hard here, especially on weekends.", "Not open for lunch on weekdays, but open for brunch on weekends."],
				category: "foodAndDrinks",
				types: ["bar", "asian"],
				label: '',
				coord: {
					lat: 28.5683585,
					long: -81.3437659
				}
			},
            {
				name: "The Guesthouse",
				address: "1321 N Mills Ave, Orlando, FL 32803",
				commentary: "Delicious craft cocktails",
				tips: ["They don't serve food inside but usually will have a food truck outdoor or the pizza place next door is delicious!", "Street parking is available or the parking lot behind the building."],
				category: "foodAndDrinks",
				types: ["bar"],
				label: '',
				coord: {
					lat: 28.5629081,
					long: -81.36421419999999
				}
			},
			{
				name: "East End Market",
				address: "3201 Corrine Dr, Orlando, FL 32803",
				commentary: "A hipster, indoor farmers market that showcases local businesses! From fresh juice to freshly baked goods, check it out.",
				tips: ["Gideon cookies is a MUST TRY!", "Parking can be hard, especially on weekends."],
				category: "adventures",
				types: ["bar", "local", "food available", "dessert", "shopping"],
				label: '',
				coord: {
					lat: 28.5683585,
					long: -81.3437659
				}
			},
			{
				name: "Hanson’s Shoe Repair",
				address: "27 E Pine St, Orlando, FL 32801",
				commentary: "Speakeasy bar with some of the best craft cocktails in town, hands down.",
				tips: ["You need a password to get in: check their twitter."],
				category: "foodAndDrinks",
				types: ["bar"],
				label: '',
				coord: {
					lat: 28.5415,
					long: -81.3784136
				}
			},
			{
				name: "Kadence",
				address: "1809 Winter Park Rd, Orlando, FL 32803",
				commentary: "Small, reservations-only, Japanese restaurant featuring multi-course sushi meals plus sake (Omakase).",
				tips: ["Must make reservations online"],
				category: "foodAndDrinks",
				types: ["seafood"],
				label: '',
				coord: {
					lat: 28.568412,
					long: -81.345923
				}
			},
			{
				name: "Susuru",
				address: "8548 Palm Pkwy, Orlando, FL 32836",
				commentary: "If you're by Disney Springs area, this is a must try. Vintage ads & decor elevate this buzzing Japanese hangout serving drinks, ramen & grilled snacks.",
				tips: ["Open for dinner only"],
				category: "foodAndDrinks",
				types: ["asian"],
				label: '',
				coord: {
					lat: 28.3841325,
					long: -81.50091789999999
				}
			},
			{
				name: "Hillstone",
				address: "215 S Orlando Ave, Winter Park, FL 32789",
				commentary: "If you're looking for an upscale dinner, I recommend Hillstone in Winter Park. Their outdoor seating overlooks a lake and is beautiful during Golden Hour.",
				tips: [],
				category: "foodAndDrinks",
				types: ["american"],
				label: '',
				coord: {
					lat: 28.597102,
					long: -81.3660213
				}
			},
			{
				name: "Park Avenue",
				address: "S Park AveOrlando, FL 32789",
				commentary: "A very cute local spot that is lined with local restaurants and shops. Almost all the restaurants offer outdoor seating if you want to people watch.",
				tips: ["Recommend the Wine Room - offers over 100+ wines to taste at your own expense"],
				category: "adventures",
				types: ["shopping", "food available", "bar"],
				label: '',
				coord: {
					lat: 28.5949682,
					long: -81.35085219999999
				}
			},
			{
				name: "The Ravenous Pig",
				address: "565 W Fairbanks Ave, Winter Park, FL 32789",
				commentary: "Stylish American Gastropub where the menu is practically changing everyday due to their Farm-to-Table ingredients. There is nothing that I have tried that I did not like.",
				tips: ["Closed on Mondays", "After dinner, check out their Beer Garden for their personally brewed craft beers!"],
				category: "foodAndDrinks",
				types: ["american"],
				label: '',
				coord: {
					lat: 28.5933844,
					long: -81.3559685
				}
			},
			{
				name: "Ravenous Pig Beer Garden",
				address: "511 W Fairbanks Ave, Winter Park, FL 32789",
				commentary: "Behind Ravenous Pig (the restaurant), they opened an outdoor, family and dog-friendly Beer Garden for their craft beer. They also serve wine and cocktails.",
				tips: ["Closed on Mondays"],
				category: "foodAndDrinks",
				types: ["brewery"],
				label: '',
				coord: {
					lat: 28.5933907,
					long: -81.3555844
				}
			},
			{
				name: "The Glass Knife",
				address: "276 S Orlando Ave, Winter Park, FL 32789",
				commentary: "Beautiful, sleek exterior and interior, this cafe is modern yet feminine with jaw dropping cakes and pasteries. It feels like you fell into Alice in Wonderland's tea time, but without the chaotic guests.",
				tips: ["No cash"],
				category: "foodAndDrinks",
				types: ["dessert", "coffee", "pastries", "food available"],
				label: '',
				coord: {
					lat: 28.5959398,
					long: -81.3648096
				}
			},
			{
				name: "Mochi Dochi",
				address: "1222 E Colonial, suite B, Orlando, FL 32803",
				commentary: "A new twist to donuts! Fresh, house-crafted Japaense donuts made with mochi with flavors that compliment the texture of the donut, such as ube glaze, matcha-orea, etc.",
				tips: ["Go early as they get packed and tend to sell out sometimes (mainly on weekends).", "Only open until mid-afternoon"],
				category: "foodAndDrinks",
				types: ["pastries"],
				label: '',
				coord: {
					lat: 28.5529026,
					long: -81.3635082
				}
			},
			{
				name: "Wekiwa Springs State Park",
				address: "1800 Wekiwa Cir, Apopka, FL 32712",
				commentary: "A great spot for paddle boarding, kayaking, canoeing, or swimming that is closer to 'Orlando'.",
				tips: [],
				category: "adventures",
				types: ["swimming"],
				label: '',
				coord: {
					lat: 28.7114806,
					long: -81.4628178
				}
			},
			{
				name: "Blue Springs State Park",
				address: "2100 W French Ave, Orange City, FL 32763",
				commentary: "A dedicated manatee refuge and a great spot for paddle boarding, canoeing, scuba diving, kayaking, tubing, or swimming. During the right season, you can kayak/ canoe along manatees in the crystal clear waters of Blue Springs. The water stays around 72-degrees, perfect under the blazing Florida sun.",
				tips: ["You CANNOT swim with the manatees", "If you swim upstream, you can reach the spring boil where you can snorkel in deeper waters for an amazing underwater view.", "You must be a certified diver for scuba diving here."],
				category: "adventures",
				types: ["snorkeling", "swimming", "hiking"],
				label: '',
				coord: {
					lat: 28.9465852,
					long: -81.3402342
				}
			},
			{
				name: "Disney Springs",
				address: "1486 Buena Vista Dr, Lake Buena Vista, FL 32830",
				commentary: "An outdoor shopping, dining, and entertainment center right outside of Disney World.",
				tips: ["Numerous parking garages and outdoor parking lots. Orange garage is one of the closer garages, with minimal walking to the plaza, but one of the busiest.", "Recommendations to eat at: Raglan Road (Irish pub), Morimoto Asia (Asian/ sushi restaurant - highly recommend reservations for dinner), Blaze Pizza (Pizza), & The Boathouse (Seafood - highly recommend reservations for dinner)."],
				category: "adventures",
				types: ["shopping", "food available"],
				label: '',
				coord: {
					lat: 28.3701571,
					long: -81.5163054
				}
			},
			{
				name: "Lake Eola Park",
				address: "512 E Washington St, Orlando, FL 32801",
				commentary: "In the heart of Downtown Orlando, Lake Eola is a great spot for a daily stroll, a picnic next to the lake, going for a swan boat ride, or (if you're there on a Sunday) enjoy the farmer's market. It's beautiful during Christmas time with decorated lights.",
				tips: ["Parking can be limited, beware of signage for private spots or time-limited parking."],
				category: "adventures",
				types: ["sightsee", "shopping", "food available"],
				label: '',
				coord: {
					lat: 28.5432783,
					long: -81.3708109
				}
			},
			{
				name: "Ivanhoe Park Brewing Co.",
				address: "1300 Alden Rd, Orlando, FL 32803",
				commentary: "Craft brewery and tasting room located in the historic Ivahoe district.",
				tips: ["Occasionally has food trucks outside"],
				category: "foodAndDrinks",
				types: ["brewery"],
				label: '',
				coord: {
					lat: 28.5631432,
					long: -81.3722714
				}
			},
			{
				name: "Orlando Brewing",
				address: "1301 Atlanta Ave, Orlando, FL 32806",
				commentary: "One of the oldest Orlando breweries that serve craft beer that exclusively uses organic ingredients. They're the only U.S.D.A.-certified organic brewery east of Colorado.",
				tips: ["Does not serve food"],
				category: "foodAndDrinks",
				types: ["brewery"],
				label: '',
				coord: {
					lat: 28.5264039,
					long: -81.3826012
				}
			},
			{
				name: "Sideward Brewing",
				address: "210 N Bumby Ave suite c, Orlando, FL 32803",
				commentary: "Family owned brewery located in a 100-year-old warehouse. They're known for their unique and fruit inspired brews.",
				tips: [],
				category: "foodAndDrinks",
				types: ["brewery"],
				label: '',
				coord: {
					lat: 28.5453923,
					long: -81.35216609999999
				}
			},
			{
				name: "Player 1 Video Game Bar",
				address: "8562 Palm Pkwy, Orlando, FL 32836",
				commentary: "It's like taking a step back in the 90's. This bar offers classic arcade games with a selection of craft beers, meads, wines, and more.",
				tips: ["$5 cover charge"],
				category: "adventures",
				types: ["bar"],
				label: '',
				coord: {
					lat: 28.38413,
					long: -81.5017177
				}
			},			
			{
				name: "Pig Floyds",
				address: "1326 N Mills Ave, Orlando, FL 32803",
				commentary: "A rustic counter-service restaurant that serves mouth watering, flavorful BBQ dishes.",
				tips: ["Street parking available or parking behind the building."],
				category: "foodAndDrinks",
				types: ["american"],
				label: '',
				coord: {
					lat: 28.5630657,
					long: -81.36466810000002
				}
			},
			{
				name: "King Cajun Crawfish",
				address: "924 N Mills Ave, Orlando, FL 32803",
				commentary: "Authentic cajun (with their little twist of modern flavors) Seafood boil",
				tips: ["Get the ShaBang sauce with your desired level of spice for your chosen platter, won't regret it!", "Get their fries on the side, they're great"],
				category: "foodAndDrinks",
				types: ["seafood"],
				label: '',
				coord: {
					lat: 28.5575064,
					long: -81.36475399999999
				}
			},
			{
				name: "Vietnam Cuisine",
				address: "1224 E Colonial Dr, Orlando, FL 32803",
				commentary: "One of my favorite spots for pho! Small restaurant located in Orlando's Viet town.",
				tips: ["The Ban Cuon and Pho is my favorite here"],
				category: "foodAndDrinks",
				types: ["asian"],
				label: '',
				coord: {
					lat: 28.552967,
					long: -81.3634594
				}
			},
			{
				name: "Lazy Moon Pizza",
				address: "1011 E Colonial Dr Suite 101, Orlando, FL 32803",
				commentary: "A hipster pizzeria that is known for their JUMBO pizza slices. The pizza is so big that it doesn't even all fit on their provided plate. Although they are huge, they are slightly on the thinner side.",
				tips: [],
				category: "foodAndDrinks",
				types: ["american"],
				label: '',
				coord: {
					lat: 28.5534424,
					long: -81.365977
				}
			},
        ]
    },
    {
		name: "Maui,Hawaii",
		continent: "North America",
		cityTips: [
			"(Road to Hana tip) Download GyPSy audio guide for Road to Hana! It is $6.99 but it will be worth it 100%. Load it up on your phone before you go so it follows along your trip. It's a self guided tour audio with turn by turn directions!", "(Road to Hana tip) Leave early, like 5am early: it's an all day affair and you don't want to get stuck on the winding roads at night. I recommend being back in Paia by sunset or a little after, Road to Hana roads are scary at night for the unexperienced", "(Road to Hana tip) Plan your stops to make most of your time, there's a lot of stops along the way so make sure to see the ones you want!", "(Road to Hana tip) PREPARE: Gas up, pack snacks and drinks, and don't forget toilteries", "(Road to Hana tip) Plan extra time for unexpected stops along the way (for pics or unplanned trails)", "(Road to Hana tip) Rule of thumb for driving on this road: if you see somesone behind you driving faster, pull over to the next available side of the road and let them pass (locals drive on this road every day too) but for your safety, please don't drive like the locals! Drive slow and safe, there's nothing wrong with that!", "(Road to Hana tip) Hana is on the 'wet' side of the island, so prepare for light showers or muddy hikes. Which also means prepare the bug spray."
		],
		coord: {
			lat: 20.7984,
			long: -156.3319
        },
		imgPaths: [
			"./assets/photos/maui/IMG_0626.jpg", 
			"./assets/photos/maui/IMG_0645.jpg", 
			"./assets/photos/maui/IMG_0659.jpg", 
			"./assets/photos/maui/IMG_0663.jpg", 
			"./assets/photos/maui/IMG_0709.jpg",
			"./assets/photos/maui/IMG_0711.jpg"
		],
		recommendations: [
			{
				name: "Molokini Crater",
				address: "Maui, HI 96708",
				commentary: "Remains of a volcanic eruption that is now a GORGEOUS spot for snorkeling/ scuba diving.",
				tips: ["Need to book a tour as you can only reach it by boat"],
				category: "adventures",
				types: ["snorkeling"],
				label: '',
				coord: {
					lat: 0,
					long: 0
				}
			},
			{
				name: "Maui Brewing Company",
				address: "605 Lipoa Pkwy, Kihei, HI 96753",
				commentary: "1 of the 2 biggest breweries on Maui",
				tips: [],
				category: "foodAndDrinks",
				types: ["brewery"],
				label: '',
				coord: {
					lat: 20.7494953,
					long: -156.4378451
				}
			},
			{
				name: "Kohola Brewery",
				address: "910 HI-30 #55, Lahaina, HI 96761",
				commentary: "1 of the 2 biggest breweries on Maui",
				tips: [],
				category: "foodAndDrinks",
				types: ["brewery"],
				label: '',
				coord: {
					lat: 20.8815705,
					long: -156.6786294
				}
			},
			{
				name: "Haleakala Crater",
				address: "Mile Marker 41 Hana Hwy, Hana, HI 96713",
				commentary: "",
				tips: [],
				category: "adventures",
				types: ["hiking", "sightsee"],
				label: '',
				coord: {
					lat: 20.9178805,
					long: -156.2657185
				}
			},
			{
				name: "Wai’anapanapa Black Sand Beach",
				address: "Waianapanapa, Hana, HI 96713",
				commentary: "",
				tips: ["starting in 2021 you will need to make advanced reservations for entry and parking at this famous beach"],
				category: "adventures",
				types: ["sightsee", "beach"],
				label: '',
				coord: {
					lat: 20.7865103,
					long: -156.0026796
				}
			},
			{
				name: "Ululani’s Shave Ice",
				address: "61 S Kihei Rd, Kihei, HI 96753",
				commentary: "Best shave ice on Maui and known for their unique flavors!",
				tips: [],
				category: "foodAndDrinks",
				types: ["dessert"],
				label: '',
				coord: {
					lat: 20.7819153,
					long: -156.4625842
				}
			},
			{
				name: "Mama’s Fish House",
				address: "799 Poho Pl, Paia, HI 96779",
				commentary: "Very famous restaurant with fresh seafood and a great view",
				tips: ["Make reservations! Gets very busy."],
				category: "foodAndDrinks",
				types: [],
				label: '',
				coord: {
					lat: 20.9289879,
					long: -156.3670266
				}
			},
			{
				name: "Aunty Sandy's Banana Bread",
				address: "210 Keanae Rd, Ke‘Anae, HI 96708",
				commentary: "BEST BANANA BREAD HANDS DOWN!",
				tips: [],
				category: "foodAndDrinks",
				types: ["pastries"],
				label: '',
				coord: {
					lat: 20.8631696,
					long: -156.1472777
				}
			},
			{
				name: "Paia Town",
				address: "",
				commentary: "The last city you'll see when doing Road to Hana!",
				tips: [],
				category: "adventures",
				types: ["shopping", "food available"],
				label: '',
				// coord: {
				// 	lat: 0,
				// 	long: 0
				// }
			},
			{
				name: "Waikamoi Nature Trail",
				address: "HI-360, Haiku, HI 96708",
				commentary: "2 hiking options: the longer route and the shorter route (whichever you have time for!)",
				tips: ["If you're short on time on the Road to Hana, do the shorter one"],
				category: "adventures",
				types: ["hiking", "sightsee"],
				label: '',
				coord: {
					lat: 20.8559388,
					long: -156.1602646
				}
			},
			{
				name: "Ka Haku Smoke Shack",
				address: "10301 Hana Hwy, Haiku, HI 96708",
				commentary: "It may look run down and shady, but their food is delicious! Each plate comes with a free coconut.",
				tips: ["The grilled chicken is amazing"],
				category: "foodAndDrinks",
				types: ["local"],
				label: '',
				coord: {
					lat: 20.9145089,
					long: -156.2563433
				}
			},
			{
				name: "Garden of Eden",
				address: "10600 Hana Hwy, Haiku, HI 96708",
				commentary: "Beautiful garden and arboretum that overlooks the waters. A little pricey but very stunning.",
				tips: [],
				category: "adventures",
				types: ["sightsee"],
				label: '',
				coord: {
					lat: 20.8686482,
					long: -156.1798823
				}
			},
			{
				name: "Seven Sacred Pools",
				address: "Hana, HI 96713",
				commentary: "7 swimming holes connected by waterfalls",
				tips: ["Get there early as possible, it's usually packed"],
				category: "adventures",
				types: ["hiking", "swimming"],
				label: '',
				coord: {
					lat: 20.6633583,
					long: -156.0446149
				}
			},
			{
				name: "Pīpīwai Trail",
				address: "Hana, HI 96713",
				commentary: "About 4 mile trail - Known for their bamboo trees in their tropical rainforest.",
				tips: [],
				category: "adventures",
				types: ["hiking", "sightsee"],
				label: '',
				coord: {
					lat: 20.6633583,
					long: -156.0514384
				}
			},
        ]
    },
];

let popover = new bootstrap.Popover(document.querySelector('.popover-dismiss'), {
	trigger: 'focus'
});

async function renderMarkerLabelsForMap(arr, location) {
	try {
		await arr.forEach(obj => {
			let reccomIndex = arr.indexOf(obj);
			let labelIndex = reccomIndex + 1;
			const locationObj = locationsArray.filter(x => x.name == location); // find city obj 
			const cityIndex = locationsArray.indexOf(locationObj[0]);
			locationObj[0].recommendations.forEach(y => {
				if (y.name == obj.name) {
					locationsArray[cityIndex].recommendations[reccomIndex].label = labelIndex;
				}
			});
		});
	} catch (err) { if (err) throw (err) }
};

async function renderMap(array, location) {
	try {
		markers = [];
		await renderMarkerLabelsForMap(array, location);
		await locationsArray.forEach(city => {
			if (city.name == location) {
				map.removeMarkers();
				if (location.includes('Hawaii') || location.includes('Orlando')) {
					map.setZoom(10);
				} else if (location.includes('Iceland')) {
					map.setZoom(6);
				} else {
					map.setZoom(12);
				}
				let latLng = new google.maps.LatLng(city.coord.lat, city.coord.long);
				map.panTo(latLng);
			}
		});
		await array.forEach(spot => {
			const { coord, name, label, address, commentary, tips, types } = spot;
			if (coord) {
				let query = `${name} ${address}`
				let m = map.addMarker({
					lat: coord.lat,
					lng: coord.long,
					title: name,
					label: label.toString(),
					infoWindow: {
						maxWidth: 400,
						minWidth: 275,
						content: `
							<h4 class="text-center">${name}</h4> 
							<div class="d-flex align-content-start flex-wrap">
								<p><i class="fas fa-map-pin mx-1"></i>${address}<br>
								<i class="far fa-comments mx-1"></i>${commentary}<br><br>
								${tips ? tips.map(tip => 
									`[<b>Tip ${tips.indexOf(tip) +1}</b>] ${tip}<br>`
									).join('') : ""} 
								</p>
							</div>
							<div class="d-flex justify-content-end">
								<a href="${renderGoogleLinks(query)}">google me here</a>
							</div>
						`
					},
					click: function(e) {
						let latLng = new google.maps.LatLng(coord.lat, coord.long);
						map.panTo(latLng);
					}
				});
				markers.push(m);
			}
		});
    } catch (err) { if (err) throw (err) }
};

// generate Lat and Long for new entries
// moved this out of the renderMap due to google query limit 
generateGeocode = (array) => {
	array.forEach(location => {
		if (!location.coord) {
			geocoder.geocode( { 'address': location.address }, function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					let lat = results[0].geometry.location.lat();
					let long = results[0].geometry.location.lng();
					console.log(`${location.name} lat is ${lat} and long is ${long}`)
				} 
			}); 
		}
	});
};

generatePhotos = (photoArr, location) => {
	for(let i=1; i<photoArr.length + 1; i++) {
		let photoIndex = i - 1;
		let element = `#photo${i}`
		$(element).attr('src', photoArr[photoIndex]);
		$(element).attr('alt', `Eunah in ${location}`);
	}
};

sortAlphabetically = (arr) => {
	arr.sort((a, b) => {
        if (a.name === b.name) {
          return a.name > b.name ? 1 : -1
        }
        return a.name > b.name ? 1 : -1
	});
	return arr;
};

renderListOfRecommendations = async (array, location) => {
	try {
		let eateriesCounter = 0;
		let extrasCounter = 0;
		const sortedArr = sortAlphabetically(array);
		generateGeocode(sortedArr);
		await sortedArr.forEach(spot => {
			let { name, types, category, label } = spot;
			let icons = renderIcons(types);
			if (icons) icons = icons.toString().replaceAll(',', '');
			const li = `
				<div class="row d-flex justify-content-start m-0 p-0">
					<a href="#recommendationsSection" class="recommendationLink mr-3" data-label=${label}>
						<small>${label ? renderMarkerLabelsForLi(label) : ''} ${name} ${icons ? icons : ''}</small>
					</a>
				</div>`
			switch (category) {
				case "foodAndDrinks":
					$("#tripContent-eateries-list").append(li);
					eateriesCounter++;
					break;
				case "adventures":
					$("#tripContent-adventures-list").append(li);
					break;
				case "extra-adv":
					$("#tripContent-adv-extras-list").append(li);
					extrasCounter++;
					break;
				case "extra-food":
					$("#tripContent-food-extras-list").append(li);
					extrasCounter++;
					break;
			};
		});
	if (!extrasCounter) {
		$('.noneMsg').remove();
		$("#foodieSpots").css('display', 'none');
		$("#advSpots").css('display', 'none');
		$("#tripContent-adv-extras-list").css('display', 'none');
		$("#tripContent-food-extras-list").css('display', 'none');
		$("#tripContent-extras-list").append(`<p class="mx-2 smallText noneMsg">Recommend something new for me to try :)</p>`);
	} else {
		$('.noneMsg').remove();
		$("#foodieSpots").css('display', 'block');
		$("#advSpots").css('display', 'block');
		$("#tripContent-adv-extras-list").css('display', 'block');
		$("#tripContent-food-extras-list").css('display', 'block');
	}
	if (!eateriesCounter) {
		$("#tripContent-eateries-list").append(`<p class="mx-2 smallText">soon to come...</p>`);
	}
	} catch { err => console.log(err)}
};

renderLocationTips = (arr) => {
	if (arr) {
		arr.forEach(tip => {
			const index = arr.indexOf(tip) + 1;
			const li = `
				<p class="smallText"><i class="fas fa-ellipsis-v mx-1"></i>${tip}</p>
			`
			$("#tripContent-tips-list").append(li);
		});
	} else return;
};

renderLocationLinks = () => {
	const sortedArr = sortAlphabetically(locationsArray);
	sortedArr.forEach(location => {
		const locationLink = `
			<a class="locationLink"><small>${location.name}</small></a>
		`
		if (location.continent === 'North America') {
			$('.usLocations').append(locationLink);
		} else if (location.continent === 'Europe') {
			$('.europeLocations').append(locationLink);
		} else {
			$('.asiaLocations').append(locationLink);
		}
	});
};

renderLocationContent = (location) => {
	$('.locationTitle').attr('data-city', location);
	$('#tripContent-eateries-list').empty();
	$('#tripContent-adventures-list').empty();
	$('#tripContent-food-extras-list').empty();
	$('#tripContent-adv-extras-list').empty();
	$('#tripContent-tips-list').empty();
	let markers = [];
	let res = locationsArray.filter(city => city.name == location);
	const { name, recommendations, cityTips } = res[0];
	recommendations.forEach(spot => {
		markers.push(spot)
	});
	renderMap(markers, location);
	$('.locationTitle').text(name);
	renderLocationTips(cityTips);
	renderListOfRecommendations(recommendations, location);
	renderLegend(categoryArr);
};

renderLegend = (categoryArray) => {
	let content = categoryArray.map(cat => {
		return `<div class="row d-flex justify-content-start m-0 p-0">
		<p>${cat.icon} <span class="smallText">${cat.type}</span></p>
		</div>`
	}).join('');
	$('.popover-dismiss').attr('data-bs-content', content)
};

renderIcons = (array) => {
	let icons = [];
	if (array.length > 0) {
		array.forEach(type => {
			categoryArr.forEach(cat => {if (cat.type.includes(type)) icons.push(cat.icon)});
		});
		return icons;
	} else { return };
};

renderMarkerLabelsForLi = (index) => {
	if (index >= 10) {
		return `<span class="numberCircle2">${index}</span>`
	} else {
		return `<span class="numberCircle">${index}</span>`
	}
};

renderGoogleLinks = (address) => {
	let query = address.replaceAll(',', '%2C').replaceAll(' ', '+');
	const link = `https://www.google.com/maps/search/?api=1&query=${query}`
	return link;
};


renderRecommendationsPage = (location) => {
	if ($('#tripContent').css('display') == 'none') {
		$('#tripContent').css('display', 'block');
	}
	renderLocationContent(location);
	fullpage_api.moveSectionDown();
};

initMap = () => {
	map = new GMaps({
		div: '#map',
		zoom: 1.5,
		lat: 28.5383,
		lng: -99.3792
	});

	locationsArray.forEach(city => {
		map.addMarker({
			lat: city.coord.lat,
			lng: city.coord.long,
			title: city.name,
			label: city.recommendations.length.toString(),
			click: function(e) {
				renderRecommendationsPage(e.title);
			}
		});
	})
};

$(document).ready(() => {
	let title = `
		<h2 class="text-center locationTitle" id="locationTitleV" data-city="city"></h2>
	`
	let title2 = `
		<h2 class="text-end locationTitle" id="locationTitleH" data-city="city"></h2>
	`
	if (intViewportWidth > '576') {
		$('#recommendationsSection').append(title2);
	} else {
		$('#cityName').append(title);
	}
	renderLocationLinks();
	initMap();
});

$(document.querySelector('.recommendationListContainer')).on('click', '.locationLink', e => {
	let clickedLocation = e.target.innerText.trim();
	$('.locationTitle').css('data-city', clickedLocation)
	let array = locationsArray.filter(locations => locations.name == clickedLocation);
	renderRecommendationsPage(clickedLocation);
	generatePhotos(array[0].imgPaths, clickedLocation);
});

$(document.querySelector('#tripContent')).on('click', '.recommendationLink', e => {
	const clicked = $(e.currentTarget).data('label');
	infowindow.close();
	markers.forEach(marker => {
		if (marker.label == clicked) {
			let i = markers.indexOf(marker);
			// const latLng = new google.maps.LatLng(marker.lat, marker.long);
			map.setZoom(15);
			map.panTo(marker.getPosition());		
			google.maps.event.trigger(markers[i], 'click');
		}
	});
	fullpage_api.moveTo(2);
});