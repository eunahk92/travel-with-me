$(document).ready(function() {
    $('#fullpage').fullpage({
        sectionsColor: [ '#d7d2ce', '#6ba292', '#a99282'],
        fitToSection: true,
        // autoScrolling: true,
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