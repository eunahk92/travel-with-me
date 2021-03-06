$(document).ready(function() {
    let windowsHeight = $('.universal-container').height();
    $('#fullpage').fullpage({
        sectionsColor: ['#1F858F', '#F24C4E', 'rgb(255,204,103)'],
        anchors: ['about-me', 'recommendations', 'details', 'pictures'],
        css3: true,
        fitToSection: false,
        autoScrolling: false,
        slidesNavigation: true,
        slidesNavPosition: "bottom",      
        menu: true,
        normalScrollElements: '#tripContent',
        normalScrollElements: '#map',
    });
});