import utils from './utils.js';

$(document).ready(function(){

  utils.buildSlider({
    selector: '.swiper-list-seasons-now',
    classData: 'seasons-now-slide'
  });

  utils.buildPopularSlider({
    selector: '.more-pupular-anime',
    classData: 'more-popular-slide'
  });
});