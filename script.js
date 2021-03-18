$(document).ready(function() {
    $('#fullpage').fullpage({
        sectionsColor: [ 'rgb(178,194,179)', 'rgb(105,130,126)', '#4E6A6A'],
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
        }
    });
});