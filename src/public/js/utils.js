import apiClient from './api-client.js';

const Utils = function () {

  this.slides = [];

  this.getResponseData = (responseBody) => {
    const { data } = responseBody;
    return data;
  };

  this.buildSlider = async ({ selector, classData }) => {
    const data = await apiClient.getSeasonNow();

    let templateString = `
      <div>
        <p><%- items.season %> <%- items.year %> Anime</p>
      </div>
      <div class="swiper ${classData}">
        <div class="swiper-wrapper">
          <%
            _.each(items, (item, key, list) => {
          %>
            <div class="swiper-slide">
              <div class="slide-card">
                <a type="link" href="">
                  <img src="<%- item.imageUrl %>" />
                  <div class="title"><p><%- item.title %></p></div>
                </a>
              </div>
            </div>
          <%
            });
          %>
        </div>
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-pagination"></div>
      </div>`;

    const htmlSlide = _.template(templateString)({ items: data });

    $(selector).html(htmlSlide);

    const swiper = new Swiper(`.${classData}`, {
      slidesPerView: 4,
      spaceBetween: 40,
      autoHeight: false,
      loop: true,
      // pagination: {
      //   el: ".swiper-pagination",
      //   clickable: true,
      // },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  }

  this.buildPopularSlider = async ({ selector, classData }) => {
    let data = await apiClient.getSeasonNow();

    data.sort((itemA, itemB) => {
      return itemB.rank - itemA.rank;
    });

    if (data.length > 10) {
      data = data.slice(0, 10);
    }

    let templateString = `
      <div class="swiper ${classData}">
        <div class="swiper-wrapper">
          <%
            _.each(items, (item, key, list) => {
          %>
            <div class="swiper-slide">
              <div class="description-card">
                <div class="image-card" style="background-image:url('<%- item.imageUrl %>');">
                </div>
                <div class="description-text">
                  <h2><%- item.title %></h2>
                </div>
              </div>
            </div>
          <%
            });
          %>
        </div>
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-pagination"></div>
      </div>`;

    const htmlSlide = _.template(templateString)({ items: data });

    $(selector).html(htmlSlide);

    const swiper = new Swiper(`.${classData}`, {
      slidesPerView: 1,
      spaceBetween: 1,
      autoHeight: false,
      loop: false,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        type: 'progressbar'
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });

    swiper.on('slideChange', function ({ activeIndex }) {
      $('.menu-body')
        .attr('style', `background-image:linear-gradient(196deg, #4533d5c7, rgb(60 245 193 / 77%)),
          url(${data[activeIndex].imageUrl});`
        );
    });

    $('.menu-body')
      .attr('style', `background-image:linear-gradient(196deg, #4533d5c7, rgb(60 245 193 / 77%)),
        url(${data[0].imageUrl});`
      );
  }
}

export default new Utils();