const geocoder = new google.maps.Geocoder();
let infowindow = new google.maps.InfoWindow();
let map;
let markers = [];
let intViewportWidth = window.innerWidth;
const listPage = $(document.querySelector('#tripDetailsSection'));
const categoryArr = [
	{ type: "desserts", icon: `<i class="fas fa-ice-cream"></i>` },
	{ type: "hiking", icon: `<i class="fas fa-hiking"></i>` },
	{ type: "shopping", icon: `<i class="fas fa-shopping-bag"></i>` },
	{ type: "eating", icon: `<i class="fas fa-utensils"></i>` },
	{ type: "swimming", icon: `<i class="fas fa-swimmer"></i>` },
	{ type: "snorkeling", icon: `<i class="fas fa-fish"></i>` },
	{ type: "bar", icon: `<i class="fas fa-glass-martini-alt"></i>` },
	{ type: "coffee", icon: `<i class="fas fa-coffee"></i>` },
	{ type: "sightsee", icon: `<i class="fas fa-binoculars"></i>` },
	{ type: "spa", icon: `<i class="fas fa-spa"></i>` },
	{ type: "local food", icon: `<i class="fas fa-utensils"></i>` },
	{ type: "beach", icon: `<i class="fas fa-umbrella-beach"></i>` },
	{ type: "pastries", icon: `<i class="fas fa-bread-slice"></i>` },
	
];
const locationsArray = [
    {
		name: "Honolulu,Hawaii",
		continent: 'North America',
		cityTips: [
			"The delicious Hawaiian treat is called SHAVE ice, not SHAVED ice. If ever you see a place offering 'shaved ice' (in Hawaii or elsewhere), it is definitely not authentic.", "Traffic, traffic, traffic... Beware! Expect heavy traffic during rush hour."
		],
		coord: {
			lat: 21.5010,
			long: -158.0377136
        },
		recommendations: [
            {
				name: "Giovanni Shrimp Truck",
				address: "66-472 Kamehameha Hwy, Haleiwa, HI 96712",
				commentary: "Food truck style, not many seats",
				tips: ["Try the Shrimp Scampi Plate!"],
				category: "foodAndDrinks",
				types: [],
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
				name: "Ahi Assassins Fish Co.",
				address: "2570 S Beretania St 2nd Fl, Honolulu, HI 96826",
				commentary: "You can get poke everywhere, from Ahi Assassins to your local food market, like Foodland (like a publix).",
				tips: [],
				category: "foodAndDrinks",
				types: [],
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
				commentary: "Love their acai bowls",
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
				types: [],
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
				types: ["tour", "shopping", "eating"],
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
				commentary: "",
				tips: ["Friend recommended the pork belly bao, oxtail dumplings, & the gyoza."],
				category: "extra",
				types: [],
				label: '',
				coord: {
					lat: 21.3117452,
					long: -157.8623772
				}
			},
			{
				name: "The Pig and The Lady",
				address: "83 N King St, Honolulu, HI 96817",
				commentary: "",
				tips: [],
				category: "foodAndDrinks",
				types: [],
				label: '',
				coord: {
					lat: 21.3114491,
					long: -157.8636749
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
				tips: [],
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
				category: "extra",
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
				types: ["eating", "bar"],
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
				types: [ "shopping", "eating"],
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
				types: ["beach", "shopping", "eating"],
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
            "I recommend not getting accommodations in one city as you'll be doing a lot of driving back and forth. If you do, plan your days appropriately, gas ain't cheap.", "Look out for speed trap signs, and slow down if you see it!! They literally warn you that a speed trap device is approaching. If you see the sign, it's guaranteed there is one coming right up.", "Pack noodles and go grocery shopping for snacks/ sandwiches: meat and to-go food is very expensive.", "Prepay for a gas card and use it at gas pumps. Credit cards at gas stations will ask for a pin.", "Rent a car and make sure to get insurance, Iceland's weather has a mind of it's own."
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
				name: "Thingvellir National Park Silfra Fissure",
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
			"Don't rely on google maps, instead use KakaoMap (more detailed) or Naver Maps.", "Get a T-Money card from any convenience store to ride the subway; best way to get around the city. Download Subway Korea App for directions.", "Expect to pay cover at Korean clubs, even gals. Drinks at bars and clubs are expensive so you can buy from a convenience store to pregame.", "There are no open-container laws in Korea so you'll see people drinking practically anywhere, but DON'T drive while intoxicated, that law still applies."
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
				types: ["sightsee", "eating", "shopping"],
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
				types: ["sightsee", "eating", "shopping"],
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
				types: ["sightsee", "shopping", "eating"],
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
				types: ["shopping", "eating"],
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
				types: ["shopping","eating"],
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
				category: "extra",
				types: ["eating"],
				label: '',
				coord: {
					lat: 37.5677037,
					long: 126.9798457
				},
            },
        ]
    },
    // {
	// 	name: "Dubai,UAE",
	// 	continent: "Asia",
	// 	coord: {
	// 		lat: 25.2442856,
	// 		long: 55.2858641
    //     },
	// 	recommendations: [
    //         {
	// 			name: "Jumeirah Mosque",
	// 			address: "JumeirahJumeirah 1 - Dubai - United Arab Emirates",
	// 			commentary: "mosque",
	// 			tips: [],
	// 			category: "adventures",
	// 			types: ["sightsee"],
	// 			label: '',
	// 			coord: {
	// 				lat: 25.2338,
	// 				long: 55.2655
	// 			},
    //         }
    //     ]
    // },
    // {
	// 	name: "Italy,Rome",
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
	// 			// tips: [""],
	// 			// category: "",
	// 			// types: [],
	// 			// label: '',
	// 			// coord: {
	// 			// 	lat: 0,
	// 			// 	long: 0
	// 			// }
	// 		//},
    //         {
	// 			name: "",
	// 			address: "",
	// 			commentary: "",
	// 			tips: [""],
	// 			category: "",
	// 			types: [],
	// 			label: '',
	// 			coord: {
	// 				lat: 0,
	// 				long: 0
	// 			}
	// 		},
    //     ]
    // },
	// {
	// 	name: "Orlando,Florida",
	// 	continent: "North America",
	// 	cityTips: [
	// 		""
	// 	],
	// 	coord: {
	// 		lat: 28.3852,
	// 		long: -81.3792
    //     },
	// 	recommendations: [
	// 		// Most updated obj properties:
	// 		// {
	// 			// name: "",
	// 			// address: "",
	// 			// commentary: "",
	// 			// tips: [""],
	// 			// category: "",
	// 			// types: ["",""],
	// 			// label: '',
	// 			// coord: {
	// 			// 	lat: 0,
	// 			// 	long: 0
	// 			// }
	// 		//},
	// 		{
	// 			name: "The Wellborn",
	// 			address: "211 N Lucerne Cir W, Orlando, FL 32801",
	// 			commentary: "",
	// 			tips: ["Parking can be tough here so uber if you can."],
	// 			category: "foodAndDrinks",
	// 			types: ["bar"],
	// 			label: '',
	// 			coord: {
	// 				lat: 28.535778,
	// 				long: -81.3756003
	// 			}
	// 		},
	// 		{
	// 			name: "Tori Tori",
	// 			address: "720 N Mills Ave, Orlando, FL 32803",
	// 			commentary: "Japanese pub with delicious craft cocktails",
	// 			tips: ["They don't take reserverations, it's first come, first serve", "Recommend the Salmon or Crab fried rice!"],
	// 			category: "foodAndDrinks",
	// 			types: ["bar"],
	// 			label: '',
	// 			coord: {
	// 				lat: 28.5539774,
	// 				long: -81.36475399999999
	// 			}
	// 		},
	// 		{
	// 			name: "Santiago's Bodega",
	// 			address: "802 Virginia Dr, Orlando, FL 32803",
	// 			commentary: "Delicious brunch spot!",
	// 			tips: [""],
	// 			category: "foodAndDrinks",
	// 			types: ["bar"],
	// 			label: '',
	// 			coord: {
	// 				lat: 28.5638579,
	// 				long: -81.3671597
	// 			}
	// 		},
    //         {
	// 			name: "The Guesthouse",
	// 			address: "1321 N Mills Ave, Orlando, FL 32803",
	// 			commentary: "Delicious craft cocktails",
	// 			tips: ["They don't serve food inside but usually will have a food truck outdoor or the pizza place next door is delicious!", "Street parking is available or the lot behind the building."],
	// 			category: "foodAndDrinks",
	// 			types: ["bar"],
	// 			label: '',
	// 			coord: {
	// 				lat: 28.5629081,
	// 				long: -81.36421419999999
	// 			}
	// 		},
	// 		{
	// 			name: "East End Market",
	// 			address: "3201 Corrine Dr, Orlando, FL 32803",
	// 			commentary: "A hipster spot that showcases local businesses! From fresh juice to freshly baked goods, check it out.",
	// 			tips: ["Gideon cookies is a MUST TRY!"],
	// 			category: "adventures",
	// 			types: ["bar", "local", "shopping", "eating", "dessert"],
	// 			label: '',
	// 			coord: {
	// 				lat: 28.5683585,
	// 				long: -81.3437659
	// 			}
	// 		},
	// 		{
	// 			name: "Hanson’s Shoe Repair",
	// 			address: "27 E Pine St, Orlando, FL 32801",
	// 			commentary: "Speakeasy bar with some of the best craft cocktails in town, hands down.",
	// 			tips: ["You need a password to get in: check their twitter."],
	// 			category: "foodAndDrinks",
	// 			types: ["bar"],
	// 			label: '',
	// 			coord: {
	// 				lat: 28.5415,
	// 				long: -81.3784136
	// 			}
	// 		},
	// 		{
	// 			name: "Kadence",
	// 			address: "1809 Winter Park Rd, Orlando, FL 32803",
	// 			commentary: "Small, reservations-only, Japanese restaurant featuring multi-course sushi meals plus sake (Omakase).",
	// 			tips: ["Must make reservations online"],
	// 			category: "foodAndDrinks",
	// 			types: [],
	// 			label: '',
	// 			coord: {
	// 				lat: 0,
	// 				long: 0
	// 			}
	// 		},
    //     ]
    // },
    {
		name: "Maui, Hawaii",
		continent: "North America",
		cityTips: [
			"(Road to Hana tip) Download GyPSy audio guide for Road to Hana! It is $6.99 but it will be worth it 100%. Load it up on your phone before you go so it follows along your trip. It's a self guided tour audio with turn by turn directions!", "(Road to Hana tip) Leave early, like 5am early: it's an all day affair and you don't want to get stuck on the winding roads at night. I recommend being back in Paia by sunset or a little after, Road to Hana roads are scary at night for the unexperienced", "(Road to Hana tip) Plan your stops to make most of your time, there's a lot of stops along the way so make sure to see the ones you want!", "(Road to Hana tip) PREPARE: Gas up, pack snacks and drinks, and don't forget toilteries", "(Road to Hana tip) Plan extra time for unexpected stops along the way (for pics or unplanned trails)", "(Road to Hana tip) Rule of thumb for driving on this road: if you see somesone behind you driving faster, pull over to the next available side of the road and let them pass (locals drive on this road every day too) but for your safety, please don't drive like the locals! Drive slow and safe, there's nothing wrong with that!", "(Road to Hana tip) Hana is on the 'wet' side of the island, so prepare for light showers or muddy hikes. Which also means prepare the bug spray."
		],
		coord: {
			lat: 20.7984,
			long: -156.3319
        },
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
				tips: [""],
				category: "foodAndDrinks",
				types: ["bar"],
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
				tips: [""],
				category: "foodAndDrinks",
				types: ["bar"],
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
				tips: [""],
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
				tips: [""],
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
				tips: [""],
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
				tips: [""],
				category: "adventures",
				types: ["shopping", "eating"],
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
				tips: [""],
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
				tips: [""],
				category: "adventures",
				types: ["hiking", "sightsee"],
				label: '',
				coord: {
					lat: 20.6633583,
					long: -156.0514384
				}
			},
			{
				name: "",
				address: "",
				commentary: "",
				tips: [""],
				category: "",
				types: [],
				label: '',
				// coord: {
				// 	lat: 0,
				// 	long: 0
				// }
			},
			{
				name: "",
				address: "",
				commentary: "",
				tips: [""],
				category: "",
				types: [],
				label: '',
				// coord: {
				// 	lat: 0,
				// 	long: 0
				// }
			},
			{
				name: "",
				address: "",
				commentary: "",
				tips: [""],
				category: "",
				types: [],
				label: '',
				// coord: {
				// 	lat: 0,
				// 	long: 0
				// }
			},
        ]
    },
];

var popover = new bootstrap.Popover(document.querySelector('.popover-dismiss'), {
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
				if (location.includes('Hawaii')) {
					map.setZoom(10);
				} else if (location.includes('Iceland') || location.includes('Orlando')) {
					map.setZoom(6);
				} else {
					map.setZoom(12);
				}
				let latLng = new google.maps.LatLng(city.coord.lat, city.coord.long);
				map.panTo(latLng);
			}
		});
		await array.forEach(spot => {
			const { coord, name, label, address, commentary, tips } = spot;
			if (coord) {
				let m = map.addMarker({
					lat: coord.lat,
					lng: coord.long,
					title: name,
					label: label.toString(),
					infoWindow: {
						maxWidth: 400,
						content: `
							<h4 class="text-center">${name}</h4> 
							<div class="d-flex align-content-start flex-wrap">
								<p><i class="fas fa-map-pin mx-1"></i>${address}<br>
								<i class="far fa-comments mx-1"></i>${commentary}<br><br>
								${tips ? tips.map(tip => 
									`[<b>Tip ${tips.indexOf(tip) +1}</b>]${tip}<br>`
									).join('') : ""}
							</div>
							<p>lat is ${coord.lat} and long is ${coord.long}</p>
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
				case "extra":
					$("#tripContent-extras-list").append(li);
					extrasCounter++;
					break;
			};
		});
	if (!extrasCounter) {
		$("#tripContent-extras-list").append(`<p class="mx-2 smallText">Recommend something new for me to try :)</p>`);
	} else if (!eateriesCounter) {
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
	$('#tripContent-extras-list').empty();
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
			<p class="smallText">${cat.icon} ${cat.type}</p>
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

renderRecommendationsPage = (location) => {
	let dataValue = $('#locationTitle').attr('data-city');
	if ($('#tripContent').css('display') == 'none') {
		$('#tripContent').css('display', 'block');
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
	if (intViewportWidth > 576) {
		$('#recommendationsSection').append(title2);
	} else {
		$('#tripContent').append(title);
	}
	renderLocationLinks();
	initMap();
});

$(document.querySelector('.recommendationListContainer')).on('click', '.locationLink', e => {
	let clickedLocation = e.target.innerText.trim();
	renderRecommendationsPage(clickedLocation);
	if (intViewportWidth < 576) {
		$('.pictureSection').css('display', 'none');
	} 	
});

$(document.querySelector('#tripContent')).on('click', '.recommendationLink', e => {
	const clicked = $(e.currentTarget).data('label');
	infowindow.close();
	markers.forEach(marker => {
		if (marker.label == clicked) {
			let i = markers.indexOf(marker);
			// const latLng = new google.maps.LatLng(marker.lat, marker.long);
			fullpage_api.moveSectionUp();
			map.setZoom(15);
			map.panTo(marker.getPosition());		
			google.maps.event.trigger(markers[i], 'click');
		}
	});
});