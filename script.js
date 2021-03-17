$(document).ready(function() {
    $('#fullpage').fullpage({
        sectionsColor: [ 'rgb(178,194,179)', 'rgb(105,130,126)', '#4E6A6A'],
        fitToSection: true,
        autoScrolling:true,
        scrollHorizontally: true,
        resetSliders: true,
        // vertical pagination dots:
        // navigation: true,
        // navigationPosition: 'right',
        slidesNavigation: true,
        slidesNavPosition: "bottom",      
        menu: true,
    });
});