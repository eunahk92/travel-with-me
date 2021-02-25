const mobileResoCheck = window.matchMedia("(max-width: 700px)");
let locationsArray = [
	{
		title: "Honolulu, Hawaii",
		isInternational: false,
		placesToEat: [
			{
				name: "Giovanni Shrimp Truck",
				where: "North Shore Beach",
				knownFor: "Shrimp dishes",
				foodCategory: "Entree",
				commentary: "Try the Shrimp Scampi Plate!! You won't be disappointed!"
			},
			{
				name: "Ahi Assassins",
				where: "Everywhere",
				knownFor: "Poke",
				foodCategory: "Entree",
				commentary: "You can get poke everywhere, from Ahi Assassins to your local food market. Delicious different styles to eat them too."
			},
			{
				name: "Leonard’s Bakery",
				where: "",
				knownFor: "Malasadas",
				foodCategory: "Dessert",
				commentary: "Similar to chinese donuts, sugary doughs."
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
				title: "Diamond Head",
				address: "",
				commentary: "Diamond Head is the iconic former volcano that stands tall at Waikiki Beach. Take a seat at one of the pill boxes and enjoy the view!"
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


async function renderLocationContent(e) {
	try {
		$("#tripContent").empty();
		$("#tripContent").addClass('boxTransformation');
		const clickedLocation = await e.target.innerText.trim();
		const res = await locationsArray.filter(location => location.title === clickedLocation);
		const { title, placesToEat, adventures, wantToTry } = res[0];
		const tripDetails = `
			<h4>${title}</h4>
			<p class="smallFont">Places to eat at:</p>
			${placesToEat.length}
		`
		$("#tripContent").append(tripDetails);
	} catch (err) { if (err) throw (err) }
}

$(document).ready(() => {
	locationsArray.forEach(location => {
		const locationLink = `
			<a class="locationLink" data-bs-toggle="collapse" href="#tripContentCollapse" role="button" aria-expanded="false" aria-controls="tripContentCollapse">
				<i class="fas fa-grip-lines"></i>
				${location.title}
			</a>
		`
		location.isInternational ? $(".internationalLocations").append(locationLink) : $(".usLocations").append(locationLink);
	})
});

$(document.querySelector('.recommendationListContainer')).on('click', '.locationLink', renderLocationContent);

// let myAnimation = anime({
// 	targets: '#recommendationListDiv',
// 	translateX: !mobileResoCheck.matches ? -240 : 0,
// 	easing: 'easeInOutExpo',
// });