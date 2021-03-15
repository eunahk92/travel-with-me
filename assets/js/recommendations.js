const locationsArray = [
	{
		title: "Honolulu, Hawaii",
		isInternational: false,
		placesToEat: [
			{
				name: "Giovanni Shrimp Truck",
				where: "North Shore Beach",
				knownFor: "Shrimp dishes",
				foodCategory: "Entree",
				commentary: "Recommendation: Try the Shrimp Scampi Plate!! You won't be disappointed.",
			},
			{
				name: "Ahi Assassins",
				where: "Everywhere",
				knownFor: "Poke",
				foodCategory: "Entree",
				commentary: "You can get poke everywhere, from Ahi Assassins to your local food market, like Foodland (like a publix). Offered in delicious different flavors."
			},
			{
				name: "Leonard’s Bakery",
				where: "",
				knownFor: "Malasadas",
				foodCategory: "Dessert",
				commentary: "Similar to chinese donuts, sugary doughs. Recommendation: Try some plain, try some with fillings in them."
			},
			{
				name: "Musubi Cafe Iyasume",
				where: "",
				knownFor: "Musubi",
				foodCategory: "Snack",
				commentary: "Whether you get spam musubi from Musubi Cafe Iyasume or get them from the local gas station, these are great snacks."
			},
			{
				name: "MATSUMOTO’S SHAVE ICE",
				where: "", 
				knownFor: "Shaved Ice",
				foodCategory: "Dessert",
				commentary: ""
			},
			{
				name: "Waiola Shave Ice",
				where: "",
				knownFor: "Shaved Ice",
				foodCategory: "Dessert",
				commentary: ""
			}
		],
		adventures: [
			{
				title: "North Shore Beach",
				address: "",
				commentary: ""
			},
			{
				title: "Dole Pineapple Farm",
				address: "64-1550 Kamehameha Hwy, Wahiawa, HI 96786",
				commentary: "On the way to North Shore Beach, stop by the famous Dole Pineapple Farm! Recommendation: You have to try the delicious pineapple soft serve and there is also a pineapple maze you can partake in."
			},
			{
				title: "Diamond Head",
				address: "",
				commentary: "Diamond Head is the iconic former volcano that stands tall at Waikiki Beach. Take a seat at one of the pill boxes and enjoy the view and breeze!"
			},
			{
				title: "Hanauma Bay",
				address: "",
				commentary: "On the very east side of Honolulu, near an area of town called Hawaii Kai, is Hanauma Bay, one of the most famous places on the entire island for snorkeling."
			},
			{
				title: "Koko Crater Trail",
				address: "",
				commentary: ""
			},
			{
				title: "Ala Moana Mall",
				address: "",
				commentary: "Waikiki is Honolulu’s largest shopping mall. *If you're from Orlando, it's like the Mall of Millenia but bigger."
			},
			{
				title: "Waikiki",
				address: "",
				commentary: "It’s the main touristy area of town where there’s a numerous hotels/ resorts, stores, and restaurants lining up the beach."
			}
		],
		barsToVisit: [],
		wantToTry: []
	},
	{
		title: "Iceland",
		isInternational: true,
		placesToEat: [
			{
				name: "Giovanni Shrimp Truck",
				where: "North Shore Beach",
				knownFor: "Shrimp dishes",
				foodCategory: "Entree",
				commentary: "Try the Shrimp Scampi Plate!! You won't be disappointed!"
			},
		],
		adventures: [
			{
				title: "North Shore Beach",
				address: "",
				commentary: ""
			},
		],
		barsToVisit: [],
		wantToTry: []
	},
];

// map
const geocoder = new google.maps.Geocoder();
let map;
let address = "64-1550 Kamehameha Hwy, Wahiawa, HI 96786";

$(document).ready(function(){
	map = new GMaps({
		div: '#map',
		lat: 28.5383,
		lng: 81.3792
	});

	geocoder.geocode( { 'address': address }, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			let lat = results[0].geometry.location.lat();
			let long = results[0].geometry.location.lng();
			console.log(`lat is ${lat} long is ${long}`)
			map.addMarker({
				lat: lat,
				lng: long,
				title:'here',
				click: function(e) {
					console.log('You clicked in this marker');
				}
			});
		} 
	}); 

});

renderLocationContent = e => {
	$("#tripContent").empty();
	$("#tripContent").addClass('boxTransformation');
	const clickedLocation = e.target.innerText.trim();
	const res = locationsArray.filter(location => location.title === clickedLocation);
	const { title, placesToEat, adventures, barsToVisit, wantToTry } = res[0];
	const tripDetailsContainer = `
		<h4>${title}</h4>
		<ul class="placesToEatList"></ul>
		<ul class="adventuresList"></ul>
		<ul class="barsToVisitList"></ul>
		<ul class="wantToTryList"></ul>
	`
	$("#tripContent").append(tripDetailsContainer);
	renderList(placesToEat);
};

renderList = (array) => {
	array.forEach(spot => {
		const { name, where, knownFor, foodCategory, commentary } = spot;
		let test = `<p>${name}</p>`
		$(".placesToEatList").append(test);
		// const recommendationLi = `
		// 	<li class="recommendationLi">
		// 		<div class="liIcon">
		// 			<i class="fas fa-utensils"></i>
		// 		</div>
		// 		<div class="liInfo">
		// 			<h4>${name}</h4>
		// 			<p>${where}</p>
		// 			<p>${knownFor}</p>
		// 			<p class="smallText">${foodCategory}</p>
		// 			<p class="smallText">${commentary}</p>
		// 		</div>
		// 		<div class="liBtn">
		// 			<i class="fas fa-bookmark fa-2x p-2"></i>
		// 		</div>
		// 	</li>
		// `
		// $(".placesToEatList").append(recommendationLi);
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

$(document).ready(renderLocationLinks());

$(document.querySelector('.recommendationListContainer')).on('click', '.locationLink', renderLocationContent);