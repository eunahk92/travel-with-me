$(document).ready(function() {
    $('#fullpage').fullpage({
        sectionsColor: ['#1F858F', '#F24C4E', 'rgb(255,204,103)'],
        fitToSection: false,
        autoScrolling: false,
        // resetSliders: true,
        // vertical pagination dots:
        // navigation: true,
        // navigationPosition: 'right',
        slidesNavigation: true,
        slidesNavPosition: "bottom",      
        menu: true,
        scrollOverflow: true,
        normalScrollElements: '#tripContent',
        normalScrollElements: '#map',
        // paddingTop: '40px'
    });
});