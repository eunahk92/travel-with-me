$(document).ready(function() {
    $('#fullpage').fullpage({
        sectionsColor: ['#129793', '#FF7260', 'whitesmoke'],
        fitToSection: true,
        autoScrolling: true,
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