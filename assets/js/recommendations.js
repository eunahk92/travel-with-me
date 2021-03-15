const locationsArray = [
	{
		title: "Honolulu, Hawaii",
		isInternational: false,
		coord: {
			lat: 21.5260075,
			long: -158.0377136
		},
		recommendations: [
			{
				name: "Giovanni Shrimp Truck",
				where: "North Shore Beach",
				address: "",
				knownFor: "Shrimp dishes",
				foodCategory: "Entree",
				commentary: "Recommendation: Try the Shrimp Scampi Plate!! You won't be disappointed.",
				category: "toEat"
			},
			{
				name: "Ahi Assassins",
				where: "Everywhere",
				address: "",
				knownFor: "Poke",
				foodCategory: "Entree",
				commentary: "You can get poke everywhere, from Ahi Assassins to your local food market, like Foodland (like a publix). Offered in delicious different flavors.",
				category: "toEat"
			},
			{
				name: "Leonard’s Bakery",
				where: "",
				address: "",
				knownFor: "Malasadas",
				foodCategory: "Dessert",
				commentary: "Similar to chinese donuts, sugary doughs. Recommendation: Try some plain, try some with fillings in them.",
				category: "toEat"
			},
			{
				name: "Musubi Cafe Iyasume",
				where: "",
				address: "",
				knownFor: "Musubi",
				foodCategory: "Snack",
				commentary: "Whether you get spam musubi from Musubi Cafe Iyasume or get them from the local gas station, these are great snacks.",
				category: "toEat"
			},
			{
				name: "MATSUMOTO’S SHAVE ICE",
				where: "", 
				address: "",
				knownFor: "Shaved Ice",
				foodCategory: "Dessert",
				commentary: "",
				category: "toEat"
			},
			{
				name: "Waiola Shave Ice",
				where: "",
				address: "",
				knownFor: "Shaved Ice",
				foodCategory: "Dessert",
				commentary: "",
				category: "toEat"
			},
			{
				name: "North Shore Beach",
				address: "",
				commentary: "",
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
				address: "",
				commentary: "Diamond Head is the iconic former volcano that stands tall at Waikiki Beach. Take a seat at one of the pill boxes and enjoy the view and breeze!",
				category: "toDo"
			},
			{
				name: "Hanauma Bay",
				address: "",
				commentary: "On the very east side of Honolulu, near an area of town called Hawaii Kai, is Hanauma Bay, one of the most famous places on the entire island for snorkeling.",
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
				address: "",
				commentary: "Waikiki is Honolulu’s largest shopping mall. *If you're from Orlando, it's like the Mall of Millenia but bigger.",
				category: "toDo"
			},
			{
				name: "Waikiki",
				address: "",
				commentary: "It’s the main touristy area of town where there’s a numerous hotels/ resorts, stores, and restaurants lining up the beach.",
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
let map;
let allMarkers = [];
let specificMarkers = [];

locationsArray.forEach(location => {
	let value = location.recommendations;
	value.forEach(spot => spot.address ? allMarkers.push(spot) : "");
});

renderMap = (array, location) => {
	array.forEach(spot => {
		console.log(spot)
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

renderLocationContent = e => {
	$("#tripContent-eateries").empty();
	$("#tripContent-adventures").empty();
	$("#tripContent-extra").empty();
	const clickedLocation = e.target.innerText.trim();
	let res = locationsArray.filter(location => location.title === clickedLocation);
	let value = res[0].recommendations;
	specificMarkers = value.filter(spot => spot.address);
	renderMap(specificMarkers, clickedLocation);
	const { title, recommendations } = res[0];
	$('#locationTitle').text(title);
	renderList(recommendations);
};

renderList = (array) => {
	array.forEach(spot => {
		const { name, where, knownFor, category, commentary } = spot;
		let test = `<small>${name}</small><br>`
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

renderLocationLinks();

$(document).ready(renderMap(allMarkers));

$(document.querySelector('.recommendationListContainer')).on('click', '.locationLink', renderLocationContent);