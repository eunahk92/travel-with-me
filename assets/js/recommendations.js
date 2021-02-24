var mobileResoCheck = window.matchMedia("(max-width: 700px)");


$(document.querySelector('#recommendationListDiv')).on('click', '.locationLink', (e) => {
  // let myAnimation = anime({
	// 	targets: '#recommendationListDiv',
	// 	translateX: !mobileResoCheck.matches ? -240 : 0,
	// 	easing: 'easeInOutExpo',
	// });

  console.log(e.target.innerText)
});
