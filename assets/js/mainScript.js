$(document).ready(function() {
    $('#fullpage').fullpage({
        sectionsColor: ['#1F858F', '#F24C4E', 'rgb(255,204,103)'],
        fitToSection: true,
        autoScrolling: true,
        slidesNavigation: true,
        slidesNavPosition: "bottom",      
        menu: true,
        normalScrollElements: '#tripContent',
        normalScrollElements: '#map',
        scrollOverflow: true,
    });
});