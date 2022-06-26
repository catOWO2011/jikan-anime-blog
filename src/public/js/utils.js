import apiClient from './api-client.js';

const Utils = function () {

  this.slides = [];

  this.getResponseData = (responseBody) => {
    const { data } = responseBody;
    return data;
  };

  this.parserQuery = (locationSearch) => {
    const tokens = locationSearch.substring(1).split('&');
    let params = {};

    tokens.forEach(paramToken => {
      const variable = paramToken.split('=');
      params[variable[0]] = decodeURIComponent(variable[1]);
    });

    return params;
  };

  this.formatThousandsUnit = (number) => {
    let formattedNumber = '';

    if (typeof number === 'number') {
      formattedNumber = number.toString();
    }
    formattedNumber = formattedNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    return formattedNumber;
  };

  this.buildSlider = async ({ selector, classData }) => {
    const data = await apiClient.getSeasonNow();

    let templateString = `
      <div>
        <p class="title-slide"><%- items.season %> <%- items.year %> Anime</p>
      </div>
      <div class="swiper ${classData}">
        <div class="swiper-wrapper">
          <%
            _.each(items, (item, key, list) => {
          %>
            <div class="swiper-slide">
              <div class="slide-card">
                <a type="link" href="anime-details.php?id=<%- item.id %>">
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
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  },

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
  },

  this.buildTopAiringAnime = async ({ selector, classData }) => {
    const data = await apiClient.getTopAnime({ filter: 'airing' });

    let templateString = `
      <div>
        <p class="title-slide">Top Airing Anime</p>
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
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  }

  this.buildAnimeDetails = async ({ selector, classData}) => {
    const locationSearch = window.location.search;
    const params = this.parserQuery(locationSearch);
    const data = await apiClient.getAnimeById(params.id);

    data.members = this.formatThousandsUnit(data.members);
    data.scored_by = this.formatThousandsUnit(data.scored_by);

    data.genres = data.genres.reduce((p, c) => {
      const { name } = c;
      return p + (p.length > 0 ? ', ' : '') + name;
    }, '');
    data.studios = data.studios.reduce((p, c) => {
      const { name } = c;
      return p + (p.length > 0 ? ', ' : '') + name;
    }, '');

    let templateString = `
      <div class="${classData}">
        <div class="header">
          <div class="title-header"\
            style="
            background:
              linear-gradient(196deg, #4533d5c7, rgb(60 245 193 / 77%)),
              url(<%- item.images.jpg.large_image_url %>);
            background-size: cover;"
          >
            <div class="title-content">
              <p class="title"><%- item.title %></p>
              <% if (item.title_english !== null) {%>
                <p class="english-title"><%- item.title_english %></p>
              <% } %>
            </div>
          </div>
          
          <div class="title-description">
            <div class="title-description-body">
              <div class="description-top">
                <p>Synopsis</p>
                <div class="quantity">
                  <div>
                    <span>Ranked:</span>
                    #<%- item.rank %>
                  </div>
                  <div>
                    <span>Popularity:</span>
                    #<%- item.popularity %>
                  </div>
                  <div>
                    <span>Members:</span>
                    <%- item.members %>
                  </div>
                </div>
              </div>
              <p class="synopsis-description">
                <%- item.synopsis %>
              </p>
            </div>
          </div>
          <img src="<%- item.images.jpg.large_image_url %>" />
          <div class="title-description-tags">
            <div class="score-tag">
              <span class="score-title">SCORE</span>
              <span class="score-points"><%- item.score %></span>
              <div class="score-by">
                <span><%- item.scored_by %></span><span>users</span>
              </div>
            </div>
            <div class="tags">
              <div><span>Type: </span> <%- item.type %></div>
              <div><span>Episodes: </span> <%- item.episodes %></div>
              <div><span>Genres: </span> <%- item.genres %></div>
              <div><span>Status: </span> <%- item.status %></div>
              <div><span>Aired: </span> <%- item.aired.string %></div>
              <div><span>Broadcast: </span> <%- item.broadcast.string %></div>
              <div><span>Studios: </span> <%- item.studios %></div>
            </div>
          </div>
        </div>
      </div>
    `;

    const htmlAnimeDetails = _.template(templateString)({ item: data });

    $(selector).html(htmlAnimeDetails);

    console.log(data, 'from utils');
  }
}

export default new Utils();