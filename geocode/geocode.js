const axios = require('axios');
const prompt = require('prompt');

const { geocodeMapBoxKey } = require('../api_keys');

var geocodeAddress = async (address, callback) => {
  try {
    const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json`, {
      params: {
        access_token: geocodeMapBoxKey
      }
    });
    var features = response.data.features;
    console.log(`${response.data.features.length} results found for \"${address}\"\nPlease select one from the following`);
    features.forEach((feature, i) => {
      console.log(`${i+1}. (${feature.place_type[0]}) - ${feature.place_name}`);
    });

    prompt.start();
    prompt.get([{
      name: 'row_number',
      type: 'integer',
      default: 1,
      conform: (value) => value <= response.data.features.length && value >= 0,
      message: `Please enter values between 0 and ${response.data.features.length}`
    }], (err, result) => {
      if (err) callback(undefined, "There was some error prompting the message to the console");
      callback(undefined, {
        address: features[result.row_number-1].place_name,
        placeType: features[result.row_number-1].place_type[0],
        latitude: features[result.row_number-1].geometry.coordinates[1],
        longitude: features[result.row_number-1].geometry.coordinates[0],
      });
    });
  } catch (err) {
    if (err.response != undefined) {
      var statusCode = err.response.status;
      if (statusCode === 401) callback(`Given Access token is invalid`, undefined);
      else if (statusCode === 403) callback(`This request is forbidden`, undefined);
      else if (statusCode === 404) callback(`The requested URL was not found or you didn't provide an address to the url`, undefined);
      else if (statusCode === 422) callback(`Check the type you used in the query`, undefined);
      else if (statusCode === 429) callback(`You have exceeded your set rate limit. Please try again later`, undefined);
      else callback(`There was some error fetching data from requested API`, undefined);
    } else {
      callback(`There was some error fetching data from requested API`, undefined)
    }
  }
}

module.exports = {
  geocodeAddress,
}
