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
        onLeave: function(origin, destination, direction){
            var leavingSection = this;
            if(origin.index == 1 && direction == 'up'){
                fullpage_api.setAutoScrolling(true);
            }
        },
        scrollOverflow: true,
        normalScrollElements: '#tripContent',
        normalScrollElements: '#map'
    });
});