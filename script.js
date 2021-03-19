$(document).ready(function() {
    $('#fullpage').fullpage({
        sectionsColor: ['#1F858F', '#F24C4E', 'rgb(255,204,103)'],
        fitToSection: true,
        autoScrolling: true,
        resetSliders: true,
        // vertical pagination dots:
        // navigation: true,
        // navigationPosition: 'right',
        slidesNavigation: true,
        slidesNavPosition: "bottom",      
        menu: true,
        scrollOverflow: true,
        normalScrollElements: ['#tripContent-tips-list', '#tripContent-eateries-list', '#tripContent-adventures-list', '#tripContent-extra-list', '#map']
    });
});