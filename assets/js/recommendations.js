const geocoder = new google.maps.Geocoder();
let infowindow = new google.maps.InfoWindow();
let map;
let markers = [];
const listPage = $(document.querySelector('#tripDetailsSection'));
const categoryArr = [
	{ type: "seafood", icon: `<i class="fas fa-fish" alt="key: seafood"></i>` },
	{ type: "dessert", icon: `<i class="fas fa-ice-cream" alt="key: dessert"></i>` },
	{ type: "hike", icon: `<i class="fas fa-hiking" alt="key: hike"></i>` },
	{ type: "shop", icon: `<i class="fas fa-shopping-bag" alt="key: shop"></i>` },
	{ type: "eat", icon: `<i class="fas fa-utensils" alt="key: eat"></i>` },
	{ type: "snorkel", icon: `<i class="fas fa-swimmer" alt="key: snorkel"></i>` },
	{ type: "bar", icon: `<i class="fas fa-glass-martini-alt" alt="key: bar"></i>` },
	{ type: "coffee", icon: `<i class="fas fa-coffee" alt="key: coffee"></i>` },
	{ type: "sightsee", icon: `<i class="fas fa-camera-retro" alt="key: sightsee"></i>` },
	{ type: "spa", icon: `<i class="fas fa-spa" alt="key: spa"></i>` },
	{ type: "asian", icon: `<i class="material-icons" alt="key: asian food">ramen_dining</i>` },
	{ type: "local", icon: `<i class="material-icons" alt="key: local food">local_dining</i>` },
	{ type: "beach", icon: `<i class="fas fa-umbrella-beach" alt="key: beach"></i>` },
	{ type: "pastry", icon: `<i class="fas fa-bread-slice" alt="key: pastry"></i>` },
	
];
const locationsArray = [
    {
		name: "Honolulu,Hawaii",
		continent: 'North America',
		cityTips: [
			"The delicious Hawaiian treat is called SHAVE ice, not SHAVED ice. If ever you see a place offering 'shaved ice' (in Hawaii or elsewhere), it is definitely not authentic.", "Traffic! There is only 1 major highway so expect heavy traffic during rush hour.", ""
		],
		coord: {
			lat: 21.5010,
			long: -158.0377136
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
				name: "Giovanni Shrimp Truck",
				address: "66-472 Kamehameha Hwy, Haleiwa, HI 96712",
				commentary: "Food truck style, not many seats",
				tips: ["Try the Shrimp Scampi Plate!"],
				category: "toEat",
				types: ["seafood"],
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
				category: "toDo",
				types: ["sightsee"],
				label: '',
				coord: {
					lat: 21.3665445,
					long: -157.9393778
				}
			},
            {
				name: "Ahi Assassins Fish Co.",
				address: "2570 S Beretania St 2nd Fl, Honolulu, HI 96826",
				commentary: "You can get poke everywhere, from Ahi Assassins to your local food market, like Foodland (like a publix).",
				tips: [],
				category: "toEat",
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
				category: "toDo",
				types: ["hike"],
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
				tips: ["Try one with filling in it!"],
				category: "toEat",
				types: ["pastry"],
				label: '',
				coord: {
					lat: 21.2849227,
					long: -157.8132698
				},
            },
            {
				name: "Musubi Cafe Iyasume",
				address: "4211 Waialae Avenue, #G19, Honolulu, HI 96816",
				commentary: "Whether you get spam musubi from Musubi Cafe Iyasume or get them from the local gas station, these are great snacks to chow down on.",
				tips: [],
				category: "toEat",
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
				commentary: "Try either here or Waiola, or both!",
				tips: [],
				category: "toEat",
				types: ["dessert"],
				label: '',
				coord: {
					lat: 21.5911105,
					long: -158.1028563
				},
            },
            {
				name: "Waiola Shave Ice",
				address: "2135 Waiola St, Honolulu, HI 96826",
				commentary: "",
				tips: [""],
				category: "toEat",
				types: ["dessert"],
				label: '',
				coord: {
					lat: 21.2924603,
					long: -157.8286388
				},
            },
            {
				name: "Haleʻiwa Bowls",
				address: "66-030 Kamehameha Hwy, Haleiwa, HI 96712",
				commentary: "",
				tips: [],
				category: "toEat",
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
				commentary: "Really delicious, authentic Japanese Udon noodles",
				tips: [],
				category: "toEat",
				types: ["asian"],
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
				category: "",
				types: ["hike"],
				label: '',
				coord: {
					lat: 21.3413975,
					long: -157.7996972
				}
			},
            {
				name: "Waimea Bay, North Shore",
				address: "61-31 Kamehameha Hwy, Haleiwa, HI 96712",
				commentary: "Popular beach away from Waikiki tourists. Great for surfing and dolphins and turtle spottings!",
				tips: [],
				category: "toDo",
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
				commentary: "On the way to North Shore Beach, stop by the famous Dole Pineapple Farm! Recommendation: You have to try the delicious pineapple soft serve and there is also a pineapple maze you can partake in.",
				tips: [],
				category: "toDo",
				types: ["tour", "shop", "eat"],
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
				tips: [""],
				category: "extra",
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
				category: "toEat",
				types: ["dessert"],
				label: '',
				coord: {
					lat: 21.2785713,
					long: -157.7048431
				}
			},
			{
				name: "Lucky Belly",
				address: "50 N Hotel St, Honolulu, HI 96817",
				commentary: "",
				tips: ["My favorites were pork belly bao, oxtail dumplings, & the gyoza."],
				category: "toEat",
				types: ["asian"],
				label: '',
				coord: {
					lat: 21.3117452,
					long: -157.8623772
				}
			},
            {
				name: "Diamond Head",
				address: "Diamond Head, Honolulu, HI 96815",
				commentary: "Diamond Head is the iconic former volcano right off of Waikiki Beach. Hike up the trail and take a seat at one of the pill boxes up top to enjoy the view and breeze, or go to Kahala Lookout or Diamond Head lookout for one of the best views.",
				tips: [],
				category: "toDo",
				types: ["hike"],
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
				category: "toDo",
				types: ["hike"],
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
				tips: [],
				category: "toDo",
				types: ["snorkel", "beach"],
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
				category: "toEat",
				types: ["local", ""],
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
				category: "",
				types: ["coffee", ""],
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
				category: "toEat",
				types: ["pastry"],
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
				category: "extra",
				types: ["hike", "shop"],
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
				category: "toEat",
				types: ["eat", "drink"],
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
				category: "toDo",
				types: ["hike"],
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
				category: "toDo",
				types: [ "shop", "eat"],
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
				category: "toDo",
				types: ["beach", "shop", "eat"],
				label: '',
				coord: {
					lat: 21.2762651,
					long: -157.8271082
				},
            }
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
            "Pack noodles and and go grocery shopping for snacks/ sandwiches: meat and to-go food is very expensive.",
            "Prepay for a gas card and use it to pump gas. Credit cards at gas stations will ask for a pin."
        ],
		recommendations: [
            {
				name: "Hallgrimskirkja Church",
				address: "Hallgrímstorg 1, 101 Reykjavík, Iceland",
				commentary: "Beautiful church/ unique",
				tips: [],
				category: "toDo",
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
				category: "toDo",
				types: ["spa"],
				label: '',
				coord: {
					lat: 63.8830498,
					long: -22.4306755
				},
            },
            {
				name: "Thingvellir National Park Silfra Fissure",
				address: "Thingvellir, 801 Selfoss, Iceland",
				commentary: "Snorkeling in Silfra Fissure is a MUST! Be prepared to go in water that is -16°(F). Silfra is said to have the clearest water in the world; feel free to have a sip of this pristine water at any point during your dive or snorkel (not kidding)!",
				tips: [
                    "Book through a company and they will provide wet suit and gear. I don't know if you can do it without booking a tour."
                ],
				category: "toDo",
				types: ["snorkel", "hike"],
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
				category: "toDo",
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
				category: "toDo",
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
				category: "toDo",
				types: ["sightsee"],
				label: '',
				coord: {
					lat: 63.4186315,
					long: -19.0060479
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
		tips: [],
		recommendations: [
            {
				name: "Dragon Hill Spa",
				address: "40 Hangang-daero 21na-gil, Hangangno 3(sam)-ga, Yongsan-gu, Seoul, South Korea",
				commentary: "One of the best in Seoul! Spa, sauna, golf course, & cinema all in one!",
				tips: [],
				category: "toDo",
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
				category: "toDo",
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
				category: "toDo",
				types: ["sightsee", "eat", "shop"],
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
				category: "toDo",
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
				category: "toDo",
				types: ["sightsee", "eat", "shop"],
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
				category: "toDo",
				types: ["sightsee", "shop", "eat"],
				label: '',
				coord: {
					lat: 37.5111158,
					long: 127.098167
				},
            },
            {
				name: "Bukhansan National Park",
				address: "262 Bogukmun-ro, Jeongneung 4(sa)-dong, Seongbuk-gu, Seoul, South Korea",
				commentary: "Hike up Bukhansan Mountain (follow markers for levels of hike).",
				tips: [],
				category: "toDo",
				types: ["hike"],
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
				category: "toDo",
				types: ["shop", "eat"],
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
				category: "toDo",
				types: ["sightsee", "shop"],
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
				category: "toDo",
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
				category: "toDo",
				types: ["shop","eat"],
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
				category: "toDo",
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
				category: "toDo",
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
				category: "extra",
				types: ["eat"],
				label: '',
				coord: {
					lat: 37.5677037,
					long: 126.9798457
				},
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
		recommendations: [
            {
				name: "Jumeirah Mosque",
				address: "JumeirahJumeirah 1 - Dubai - United Arab Emirates",
				commentary: "mosque",
				tips: [],
				category: "toDo",
				types: ["sightsee"],
				label: '',
				coord: {
					lat: 25.2338,
					long: 55.2655
				},
            }
        ]
    },
    {
		name: "Italy, Rome",
		continent: "Europe",
		coord: {
			lat: 41.9028,
			long: 12.4964
        },
		recommendations: [
            {
				name: "Hallgrimskirkja Church",
				address: "Hallgrímstorg 1, 101 Reykjavík, Iceland",
				commentary: "Beautiful church/ unique",
				tips: [],
				category: "toDo",
				types: ["sightsee"],
				label: '',
            }
        ]
    },
    {
		name: "Atlanta,Georgia",
		continent: "North America",
		coord: {
			lat: 33.7490,
			long: 84.3880
        },
		recommendations: [
            {
				name: "Hallgrimskirkja Church",
				address: "Hallgrímstorg 1, 101 Reykjavík, Iceland",
				commentary: "Beautiful church/ unique",
				tips: [],
				category: "toDo",
				types: ["sightsee"],
				label: '',
            }
        ]
    },
];

async function renderMarkerLabelsForMap(arr, location) {
	try {
		await arr.forEach(obj => {
			let reccomIndex = arr.indexOf(obj);
			let labelIndex = reccomIndex + 1;
			obj.label = labelIndex.toString(); // for label prop
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
				if (location.includes('Hawaii')) {
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
			const { coords, name, label } = spot;
			if (coords) {
				let m = map.addMarker({
					lat: coords.lat,
					lng: coords.long,
					title: name,
					label: label,
					infoWindow: {
						content: `${name} - lat is ${coords.lat} and long is ${coords.long}`
					},
					click: function(e) {
						let latLng = new google.maps.LatLng(coords.lat, coords.long);
						map.setZoom(13);
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

renderGoogleLinks = (address) => {
	let query = address.replaceAll(',', '%2C').replaceAll(' ', '+');
	const link = `https://www.google.com/maps/search/?api=1&query=${query}`
	return link;
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

renderListOfRecommendations = (array, location) => {
	const sortedArr = sortAlphabetically(array);
	generateGeocode(sortedArr);
	sortedArr.forEach(spot => {
		let { name, types, category, label } = spot;
		let icons = renderIcons(types);
		icons = icons.toString().replaceAll(',', '');
		const li = `
			<div class="row d-flex justify-content-start m-0 p-0">
				<a href="#recommendationsSection" class="recommendationLink mr-3" data-label=${label}>
					<small>${label ? renderMarkerLabelsForLi(label) : ''} ${name} ${icons}</small>
				</a>
			</div>`
		switch (category) {
			case "toEat":
				$("#tripContent-eateries-list").append(li);
				break;
			case "toDo":
				$("#tripContent-adventures-list").append(li);
				break;
			case "extra":
				$("#tripContent-extra-list").append(li);
				break;
		};
	})
};

renderLocationTips = (arr) => {
	if (arr) {
		arr.forEach(tip => {
			const index = arr.indexOf(tip) + 1;
			const li = `
				<p class="smallText">${renderMarkerLabelsForLi(index)} ${tip}</p>
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
	$('#tripContent-extra-list').empty();
	$('#tripContent-tips-list').empty();
	let markers = [];
	let res = locationsArray.filter(city => city.name == location);
	const { name, recommendations, cityTips } = res[0];
	recommendations.forEach(spot => {
		markers.push({ name: spot.name, coords: spot.coord })
	});
	renderMap(markers, location);
	$('.locationTitle').text(name);
	renderLocationTips(cityTips);
	renderListOfRecommendations(recommendations, location);
	// renderLegend(categoryArr);
};

// renderLegend = (categoryArray) => {
// 	categoryArray.forEach(cat => {
// 		const li = `
// 			${cat.icon} <small>${cat.type}</small>
// 		`
// 		$('#legendContainer').append(li);
// 	})
// }

renderIcons = (array) => {
	let icons = [];
	array.forEach(type => {
		categoryArr.forEach(cat => {if (cat.type === type) icons.push(cat.icon)});
	});
	return icons;
};

renderMarkerLabelsForLi = (index) => {
	if (index >= 10) {
		return `<span class="numberCircle2">${index}</span>`
	} else {
		return `<span class="numberCircle">${index}</span>`
	}
};

renderRecommendationsPage = (location) => {
	let dataValue = $('#locationTitle').attr('data-city');
	if ($('#tripContent').css('display') == 'none') {
		$('#tripContent').css('display', 'block');
		$('.pictureSection').css('display', 'none');
		renderLocationContent(location);
		fullpage_api.moveSectionDown();
		fullpage_api.setAutoScrolling(false);
	} else if ($('#tripContent').css('display') == 'block' && dataValue == location) {
		fullpage_api.moveTo(2);
		fullpage_api.setAutoScrolling(false);
	} else if ($('#tripContent').css('display') == 'block' && dataValue != location) {	
		renderLocationContent(location);
		fullpage_api.moveSectionDown();
		fullpage_api.setAutoScrolling(false);

	} 
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
		<h2 class="text-end locationTitle" id="locationTitleV" data-city="city"></h2>
	`
	let title2 = `
		<h2 class="text-end locationTitle" id="locationTitleH" data-city="city"></h2>
	`
	let intViewportWidth = window.innerWidth;
	if (intViewportWidth > 576) {
		$('#tripDetailsSection').addClass('fp-auto-height');
		$('#recommendationsSection').append(title2)
	} else {
		$('#tripContent').append(title);
	}
	renderLocationLinks();
	initMap();
});

$(document.querySelector('.recommendationListContainer')).on('click', '.locationLink', e => {
	let clickedLocation = e.target.innerText.trim();
	renderRecommendationsPage(clickedLocation);
});

$(document.querySelector('#tripContent')).on('click', '.recommendationLink', e => {
	const clicked = $(e.currentTarget).data('label');
	infowindow.close();
	markers.forEach(marker => {
		if (marker.label == clicked) {
			let i = markers.indexOf(marker);
			// const latLng = new google.maps.LatLng(marker.lat, marker.long);
			fullpage_api.moveSectionUp();
			map.setZoom(20);
			map.panTo(marker.getPosition());		
			google.maps.event.trigger(markers[i], 'click');
		}
	});
});