let mobileResoCheck = window.matchMedia("(max-width: 700px)");
const locationsArray = [
	{
		title: "Honolulu, Hawaii",
		isInternational: false,
		placesToEat: [],
		placesToSee: [],
		thingsToDo: [],
	},
	{
		title: "Iceland",
		isInternational: true,
		placesToEat: [],
		placesToSee: [],
		thingsToDo: [],
	},
	{
		title: "Rome, Italy",
		isInternational: true,
		placesToEat: [],
		placesToSee: [],
		thingsToDo: [],
	},
	{
		title: "Venice, Italy",
		isInternational: true,
		placesToEat: [],
		placesToSee: [],
		thingsToDo: [],
	},
	{
		title: "Maui, Hawaii",
		isInternational: false,
		placesToEat: [],
		placesToSee: [],
		thingsToDo: [],
	},
	{
		title: "Seoul, Korea",
		isInternational: true,
		placesToEat: [],
		placesToSee: [],
		thingsToDo: [],
	},
	{
		title: "Atlanta, Georgia",
		isInternational: false,
		placesToEat: [],
		placesToSee: [],
		thingsToDo: [],
	},
	{
		title: "Thailand",
		isInternational: true,
		placesToEat: [],
		placesToSee: [],
		thingsToDo: [],
	},
	{
		title: "Dubai",
		isInternational: true,
		placesToEat: [],
		placesToSee: [],
		thingsToDo: [],
	},
]

$(document).ready(() => {
	locationsArray.forEach(location => {
		let locationLink = `
			<a class="locationLink" data-bs-toggle="collapse" href="#tripContentCollapse" role="button" aria-expanded="false" aria-controls="tripContentCollapse">
				<i class="fas fa-grip-lines"></i>
				${location.title}
			</a>
		`
		location.isInternational ? $(".internationalLocations").append(locationLink): $(".usLocations").append(locationLink);
	})
})

$(document.querySelector('#recommendationListDiv')).on('click', '.locationLink', (e) => {
  // let myAnimation = anime({
	// 	targets: '#recommendationListDiv',
	// 	translateX: !mobileResoCheck.matches ? -240 : 0,
	// 	easing: 'easeInOutExpo',
	// });

  console.log(e.target.innerText)
});
