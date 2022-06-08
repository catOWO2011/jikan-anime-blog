const BASE_URL = 'https://api.jikan.moe';
const URL_VERSION = 'v4';
const GET = 'GET';

const APIClient = function () {

  this.makeRequest = async ({ type, url }) => {
    return await new Promise((resolve, reject) => {
      $.ajax({
        type: type,
        url: url,
        dataType: 'json'
      }).done(function (response) {
        resolve(response.data);
      });
    });
  };

  this.getSeasonsList = async () => {

    const { data } = await this.makeRequest({
      type: 'GET',
      url: `${BASE_URL}/${URL_VERSION}/seasons`
    });

    return data;
  }

  this.getSeasonNow = async () => {

    let data = await this.makeRequest({
      type: GET,
      url: `${BASE_URL}/${URL_VERSION}/seasons/now`
    });

    if (data && data.length > 0) {
      const { season, year } = data[0];

      data = _.map(data, item => {
        const newItem = {};
        newItem.title = item.title;
        newItem.rank = item.rank;
        newItem.imageUrl = item.images.jpg.large_image_url;
        return newItem;
      });

      data.season = season;
      data.year = year;
    }

    return data;
  }
};

export default new APIClient();

