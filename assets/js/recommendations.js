const locationsArray = [
	{
		title: "Honolulu,Hawaii",
		isInternational: false,
		coord: {
			lat: 21.5260075,
			long: -158.0377136
		},
		recommendations: [
			{
				name: "Giovanni Shrimp Truck",
				where: "North Shore Beach",
				address: "66-472 Kamehameha Hwy, Haleiwa, HI 96712",
				knownFor: "Shrimp dishes",
				commentary: "My recommendation: Try the Shrimp Scampi Plate!",
				category: "toEat"
			},
			{
				name: "Ahi Assassins",
				where: "Everywhere",
				address: "",
				knownFor: "Poke",
				commentary: "You can get poke everywhere, from Ahi Assassins to your local food market, like Foodland (like a publix). Offered in delicious different flavors.",
				category: "toEat"
			},
			{
				name: "Leonard’s Bakery",
				address: "933 Kapahulu Ave, Honolulu, HI 96816",
				knownFor: "Malasadas",
				commentary: "Similar to chinese donuts, sugary doughs. Recommendation: Try some plain, try some with fillings in them.",
				category: "toEat"
			},
			{
				name: "Musubi Cafe Iyasume",
				where: "Waikiki",
				address: "4211 Waialae Avenue, #G19, Honolulu, HI 96816",
				knownFor: "Musubi",
				commentary: "Whether you get spam musubi from Musubi Cafe Iyasume or get them from the local gas station, these are great snacks to chow down on.",
				category: "toEat"
			},
			{
				name: "MATSUMOTO’S SHAVE ICE",
				where: "66-111 Kamehameha Hwy 605, Haleiwa, HI 96712", 
				address: "",
				knownFor: "Shaved Ice",
				commentary: "",
				category: "toEat"
			},
			{
				name: "Waiola Shave Ice",
				where: "",
				address: "",
				knownFor: "Shaved Ice",
				commentary: "",
				category: "toEat"
			},
			{
				name: "Haleʻiwa Bowls",
				where: "66-030 Kamehameha Hwy, Haleiwa, HI 96712", 
				address: "",
				knownFor: "Acai bowls",
				commentary: "",
				category: "toEat"
			},
			{
				name: "Marukame Udon Waikiki",
				where: "2310 Kūhiō Ave. 124, Honolulu, HI 96815", 
				address: "",
				knownFor: "Really delicious, authentic Japanese Udon noodles",
				commentary: "",
				category: "toEat"
			},
			{
				name: "Waimea Bay, North Shore",
				address: "61-31 Kamehameha Hwy, Haleiwa, HI 96712",
				commentary: "Popular beach away from Waikiki tourists. Great for surfing and dolphins and turtle spottings!",
				category: "toDo"
			},
			{
				name: "Dole Pineapple Farm",
				address: "64-1550 Kamehameha Hwy, Wahiawa, HI 96786",
				commentary: "On the way to North Shore Beach, stop by the famous Dole Pineapple Farm! Recommendation: You have to try the delicious pineapple soft serve and there is also a pineapple maze you can partake in.",
				category: "toDo"
			},
			{
				name: "Diamond Head",
				address: "Diamond Head, Honolulu, HI 96815",
				commentary: "Diamond Head is the iconic former volcano right off of Waikiki Beach. Hike up the trail and take a seat at one of the pill boxes up top to enjoy the view and breeze, or go to Kahala Lookout or Diamond Head lookout for one of the best views.",
				category: "toDo"
			},
			{
				name: "Hanauma Bay",
				address: "7455 Kalanianaʻole Hwy, Honolulu, HI 96825",
				commentary: "One of the most famous places on the entire island for snorkeling. There is also Hanauma Bay Lookout if you don't want to go for a dip!",
				category: "toDo"
			},
			{
				name: "Hanauma Bay Lookout",
				address: "",
				commentary: "There is also Hanauma Bay Lookout if you don't want to go for a dip with a hiking trail nearby!",
				category: "toDo"
			},
			{
				name: "Koko Crater Trail",
				address: "",
				commentary: "",
				category: "toDo"
			},
			{
				name: "Ala Moana Mall",
				address: "1450 Ala Moana Blvd, Honolulu, HI 96814",
				commentary: "Waikiki is Honolulu’s largest shopping mall. *If you're from Orlando, it's like the Mall of Millenia but even bigger.",
				category: "toDo"
			},
			{
				name: "Waikiki Beach",
				address: "",
				commentary: "It’s the main touristy area of town where there’s a numerous hotels/ resorts, stores, and restaurants lining up the beach. A lot of beautiful beaches (Waikiki beach, Kuhio Beach, Kahanamoku Beach) to choose from. This is also where the more mainland restaurant brands will be.",
				category: "toDo"
			}
		]
	},
	{
		title: "Iceland",
		isInternational: true,
		coord: {
			lat: 64.1420229,
			long: -21.9265493
		},
		recommendations: [
			{
				name: "Hallgrimskirkja Church",
				where: "Reykjavik",
				address: "Hallgrímstorg 1, 101 Reykjavík, Iceland",
				commentary: "Beautiful church/ unique",
				category: "toDo"
			},
		]
	}
];

const geocoder = new google.maps.Geocoder();
let map, query;
let allMarkers = [];
let specificMarkers = [];

locationsArray.forEach(location => {
	let value = location.recommendations;
	value.forEach(spot => spot.address ? allMarkers.push(spot) : "");
});

renderMap = (array, location) => {
	array.forEach(spot => {
		geocoder.geocode( { 'address': spot.address }, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				let lat = results[0].geometry.location.lat();
				let long = results[0].geometry.location.lng();
				map.addMarker({
					lat: lat,
					lng: long,
					title:'here',
					click: function(e) {
						console.log(`${spot.where} lat is ${lat} and long is ${long}`);
					}
				});
			} 
		}); 
	})
	if (array === allMarkers) {
		map = new GMaps({
			div: '#map',
			zoom: 1,
			lat: 28.5383,
			lng: -99.3792
		});
	} else {
		locationsArray.forEach(spot => {
			if (spot.title === location) {
				map = new GMaps({
					div: '#map',
					zoom: 10,
					lat: spot.coord.lat,
					lng: spot.coord.long
				});
			}
		})
	}
};

renderLocationContent = (location) => {
	$('#locationTitle').attr('data-city', location);
	$("#tripContent-eateries-list").empty();
	$("#tripContent-adventures-list").empty();
	$("#tripContent-extra-list").empty();
	let res = locationsArray.filter(city => city.title == location);
	let value = res[0].recommendations;
	specificMarkers = value.filter(spot => spot.address);
	renderMap(specificMarkers, location);
	const { title, recommendations } = res[0];
	$('#locationTitle').text(title);
	renderList(recommendations);
};

checkDivDisplay = (location) => {
	let dataValue = $('#locationTitle').attr('data-city');
	if ($("#tripContent").css('display') == 'none') {
		$("#tripContent").css('display', 'block');
		renderLocationContent(location);
	} else if ($("#tripContent").css('display') == 'block' && dataValue == location) {
		$("#tripContent").css('display', 'none'); 
	} else if ($("#tripContent").css('display') == 'block' && dataValue != location) {		
		$("#tripContent").css('display', 'block');
		renderLocationContent(location);
	}
}

renderList = (array) => {
	array.forEach(spot => {
		const { name, address, where, knownFor, category, commentary } = spot;
		address ? 
			query = address.replaceAll(',', '%2C').replaceAll(' ', '+') :
			query = name.replaceAll(',', '%2C').replaceAll(' ', '+') ;
		let test = `<a href="https://www.google.com/maps/search/?api=1&query=${query}" target="_blank" class="recommendationLink mr-3"><small>${name}</small><br>`
		switch (category) {
			case "toEat":
				$("#tripContent-eateries").append(test);
				break;
			case "toDo":
				$("#tripContent-adventures").append(test);
				break;
		}
	})
};

renderLocationLinks = () => {
	locationsArray.forEach(location => {
		const locationLink = `
			<a class="locationLink" data-bs-toggle="collapse" href="#tripContentCollapse" role="button" aria-expanded="false" aria-controls="tripContentCollapse">
				<i class="fas fa-grip-lines"></i>
				${location.title}
			</a>
		`
		location.isInternational ? $(".internationalLocations").append(locationLink) : $(".usLocations").append(locationLink);
	});
};

$(document).ready(() => {
	let intViewportWidth = window.innerWidth;
	intViewportWidth < 576 ? "" : renderMap(allMarkers);
	renderLocationLinks();
});

$(document.querySelector('.recommendationListContainer')).on('click', '.locationLink', e => {
	let clickedLocation = e.target.innerText.trim();
	checkDivDisplay(clickedLocation);
});