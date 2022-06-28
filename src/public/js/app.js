import utils from './utils.js';

$(document).ready(async function(){

  await utils.buildSeasonUpcommingSlider({
    selector: '.swiper-list-season-upcomming',
    classData: 'seasons-upcomming-slide'
  });

  await utils.buildSeasonSlider({
    selector: '.swiper-list-seasons-now',
    classData: 'seasons-now-slide'
  });

  await utils.buildPopularSlider({
    selector: '.more-pupular-anime',
    classData: 'more-popular-slide'
  });

  // await utils.buildTopAiringAnime({
  //   selector: '.swiper-list-top-airing',
  //   classData: 'top-airing-slide'
  // });
});