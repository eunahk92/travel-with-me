const geocoder = new google.maps.Geocoder();
let map;
const listPage = $(document.querySelector('#tripDetailsSection'))
const locationsArray = [
    {
		name: "Honolulu,Hawaii",
		continent: 'North America',
		coord: {
			lat: 21.5010,
			long: -158.0377136
        },
		recommendations: [
            {
				name: "Giovanni Shrimp Truck",
				address: "66-472 Kamehameha Hwy, Haleiwa, HI 96712",
				types: ["seafood"],
				label: '',
				commentary: "My recommendation: Try the Shrimp Scampi Plate!",
				category: "toEat",
				coord: {
					lat: 21.5807083,
					long: -158.1050234
				},
            },
            {
				name: "Ahi Assassins Fish Co.",
				address: "2570 S Beretania St 2nd Fl, Honolulu, HI 96826",
				types: ["seafood"],
				label: '',
				commentary: "You can get poke everywhere, from Ahi Assassins to your local food market, like Foodland (like a publix). Offered in delicious different flavors.",
				category: "toEat",
				coord: {
					lat: 21.2925559,
					long: -157.8223049
				},
            },
            {
				name: "Leonard’s Bakery",
				address: "933 Kapahulu Ave, Honolulu, HI 96816",
				types: ["dessert"],
				label: '',
				commentary: "Similar to chinese donuts, sugary doughs. Recommendation: Try some plain, try some with fillings in them.",
				category: "toEat",
				coord: {
					lat: 21.2849227,
					long: -157.8132698
				},
            },
            {
				name: "Musubi Cafe Iyasume",
				address: "4211 Waialae Avenue, #G19, Honolulu, HI 96816",
				types: ["snack"],
				label: '',
				commentary: "Whether you get spam musubi from Musubi Cafe Iyasume or get them from the local gas station, these are great snacks to chow down on.",
				category: "toEat",
				coord: {
					lat: 21.2770925,
					long: -157.7863744
				},
            },
            {
				name: "MATSUMOTO’S SHAVE ICE",
				address: "66-111 Kamehameha Hwy 605, Haleiwa, HI 96712", 
				types: ["dessert"],
				label: '',
				commentary: "",
				category: "toEat",
				coord: {
					lat: 21.5911105,
					long: -158.1028563
				},
            },
            {
				name: "Waiola Shave Ice",
				address: "2135 Waiola St, Honolulu, HI 96826",
				types: ["dessert"],
				label: '',
				commentary: "",
				category: "toEat",
				coord: {
					lat: 21.2924603,
					long: -157.8286388
				},
            },
            {
				name: "Haleʻiwa Bowls",
				address: "66-030 Kamehameha Hwy, Haleiwa, HI 96712",
				types: ["snack"],
				label: '',
				commentary: "",
				category: "toEat",
				coord: {
					lat: 21.5927306,
					long: -158.1032127
				},
            },
            {
				name: "Marukame Udon Waikiki",
				address: "2310 Kūhiō Ave. 124, Honolulu, HI 96815",
				types: ["Japanese"],
				label: '',
				commentary: "Really delicious, authentic Japanese Udon noodles",
				category: "toEat",
				coord: {
					lat: 21.2796049,
					long: -157.8258319
				},
            },
            {
				name: "Waimea Bay, North Shore",
				address: "61-31 Kamehameha Hwy, Haleiwa, HI 96712",
				commentary: "Popular beach away from Waikiki tourists. Great for surfing and dolphins and turtle spottings!",
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
				category: "toDo",
				types: ["tour", "activity", "shop", "eat"],
				label: '',
				coord: {
					lat: 21.5260075,
					long: -158.0377136 
				},
            },
            {
				name: "Diamond Head",
				address: "Diamond Head, Honolulu, HI 96815",
				commentary: "Diamond Head is the iconic former volcano right off of Waikiki Beach. Hike up the trail and take a seat at one of the pill boxes up top to enjoy the view and breeze, or go to Kahala Lookout or Diamond Head lookout for one of the best views.",
				category: "toDo",
				types: ["hike"],
				label: '',
				coord: {
					lat: 21.261983,
					long: -157.8059987
				},
            },
            {
				name: "Hanauma Bay",
				address: "7455 Kalanianaʻole Hwy, Honolulu, HI 96825",
				commentary: "One of the most famous places on the entire island for Snorkel. There is also Hanauma Bay Lookout if you don't want to go for a dip!",
				category: "toDo",
				types: ["snorkel", "beach"],
				label: '',
				coord: {
					lat: 21.2725925,
					long: -157.6971959
				},
            },
            {
				name: "Hanauma Bay Lookout",
				address: "7514-7538 Kalanianaʻole Hwy, Honolulu, HI 96825",
				commentary: "There is also Hanauma Bay Lookout if you don't want to go for a dip with a hiking trail nearby!",
				category: "toDo",
				types: ["hike"],
				label: '',
				coord: {
					lat: 21.2751805,
					long: -157.6958748
				},
            },
            {
				name: "Koko Crater Trail",
				address: "7604 Koko Head Park Rd #7602, Honolulu, HI 96825",
				commentary: "",
				category: "toDo",
				types: ["hike"],
				label: '',
				coord: {
					lat: 21.2808481,
					long: -157.6920035
				},
            },
            {
				name: "Ala Moana Mall",
				address: "1450 Ala Moana Blvd, Honolulu, HI 96814",
				commentary: "Waikiki is Honolulu’s largest shopping mall. *If you're from Orlando, it's like the Mall of Millenia but even bigger.",
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

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

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
				map.addMarker({
					lat: coords.lat,
					lng: coords.long,
					title: name,
					label: label,
					infoWindow: {
						content: `lat is ${coords.lat} and long is ${coords.long}`
					},
					click: function(e) {
						let latLng = new google.maps.LatLng(coords.lat, coords.long);
						map.setZoom(13);
						map.panTo(latLng);
					}
				});
		});
    } catch (err) { if (err) throw (err) }
};

// generate Lat and Long for new entries
// moved this out of the renderMap due to google query limit 
generateGeocode = (arr) => {
	arr.forEach(location => {
		geocoder.geocode( { 'address': location.address }, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				let lat = results[0].geometry.location.lat();
				let long = results[0].geometry.location.lng();
				map.addMarker({
					lat: lat,
					lng: long,
					title: location.address,
					label: location.label,
					infoWindow: {
						content: `lat is ${lat} and long is ${long}`
					},
					click: function(e) {
						let latLng = new google.maps.LatLng(lat, long);
						map.setZoom(13);
						map.panTo(latLng);
						console.log(`${location.address}
						${lat}
						${long}
						`)
					}
				});
			} 
		}); 
	});
};

renderGoogleLinks = (address) => {
	let query = address.replaceAll(',', '%2C').replaceAll(' ', '+');
	const link = `https://www.google.com/maps/search/?api=1&query=${query}`
	return link;
};

sortLocationsAlphabetically = (arr) => {
	arr.sort((a, b) => {
        if (a.name === b.name) {
          return a.name > b.name ? 1 : -1
        }
        return a.name > b.name ? 1 : -1
	});
	return arr;
};

renderListOfRecommendations = (array, location) => {
	const sortedArr = sortLocationsAlphabetically(array);
	sortedArr.forEach(spot => {
		let { name, address, types, category, label } = spot;
		let query;
		if (address.includes('-')) {
			let param = name.concat(location);
			query = renderGoogleLinks(param);
		} else {
			query = renderGoogleLinks(address);
		}
		let icons = renderIcons(types);
		icons = icons.toString().replaceAll(',', '');
		const li = `
			<div class="row d-flex justify-content-start m-0 p-0">
				<a href="${query}" target="_blank" class="recommendationLink mr-3">
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

renderLocationLinks = () => {
	const sortedArr = sortLocationsAlphabetically(locationsArray);
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
	$('#locationTitle').attr('data-city', location);
	$('#tripContent-eateries-list').empty();
	$('#tripContent-adventures-list').empty();
	$('#tripContent-extra-list').empty();
	let markers = [];
	let res = locationsArray.filter(city => city.name == location);
	const { name, recommendations } = res[0];
	recommendations.forEach(spot => {
		markers.push({ name: spot.name, coords: spot.coord })
	});
	renderMap(markers, location);
	$('#locationTitle').text(name);
	$('#verticalLocationTitle').text(name);
	renderListOfRecommendations(recommendations, location);
};

renderIcons = (array) => {
	let icons = [];
	array.forEach(type => {
		switch (type) {
			case 'seafood':
				icons.push(`<i class="fas fa-fish"></i>`);
				break;
			case 'dessert':
				icons.push(`<i class="fas fa-ice-cream"></i>`);
				break;
			case 'hike':
				icons.push(`<i class="fas fa-hiking"></i>`);
				break;
			case 'shop':
				icons.push(`<i class="fas fa-shopping-bag"></i>`);
				break;
			case 'eat':
				icons.push(`<i class="fas fa-utensils"></i>`);
				break;
			case 'snorkel':
				icons.push(`<i class="fas fa-swimmer"></i>`);
				break;
			case 'bar':
				icons.push(`<i class="fas fa-glass-martini-alt"></i>`);
				break;
			case 'sightsee': 
				icons.push(`<i class="fas fa-camera-retro"></i>`);
				break;
			case 'spa': 
				icons.push(`<i class="fas fa-spa"></i>`);
				break;
		}	
	})
	return icons;
};

renderMarkerLabelsForLi = (num) => {
	if (num >= 10) {
		return `<span class="numberCircle2">${num}</span>`
	} else {
		return `<span class="numberCircle">${num}</span>`
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
	let intViewportWidth = window.innerWidth;
	if (intViewportWidth > 576) {
		$('#tripDetailsSection').addClass('fp-auto-height');
	} 
	console.log(intViewportWidth)
	renderLocationLinks();
	initMap();
});

$(document.querySelector('.recommendationListContainer')).on('click', '.locationLink', e => {
	let clickedLocation = e.target.innerText.trim();
	renderRecommendationsPage(clickedLocation);
});