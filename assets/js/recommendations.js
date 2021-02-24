const cities = ['Honolulu, Hawaii', 'Iceland']

let myAnimation = anime({
    targets: '.listOfLocations',
    translateX: 10,
  easing: 'easeInOutExpo'
});

citiesAnimation = () => {
    console.log('clicked.')
};

$(document.querySelector(".listOfLocations")).on('click', '.citiesLink', citiesAnimation);