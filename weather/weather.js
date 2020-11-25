const axios = require('axios');

const { weatherAppId } = require('../api_keys');

var getWeather = async (latitude, longitude, units, callback) => {
  var temp_units;
  if (units === "metric") temp_units = "*C";
  else if(units === "standard") temp_units = "K";
  else temp_units = "F";

  try {
    const response = await axios.get("http://api.openweathermap.org/data/2.5/weather", {
      params: {
        appid: weatherAppId,
        lat: latitude,
        lon: longitude,
        units: units
      }
    });
    callback(undefined, {
      temp: `${response.data.main.temp} ${temp_units}`,
      feels_like: `${response.data.main.feels_like} ${temp_units}`,
      temp_min: `${response.data.main.temp_min} ${temp_units}`,
      temp_max: `${response.data.main.temp_max} ${temp_units}`,
      humidity: response.data.main.humidity,
      weather: response.data.weather[0].main,
      weather_description: response.data.weather[0].description,
    });
  } catch (err) {
    if (err.response != undefined) {
      var statusCode = err.response.status;
      if (statusCode === 400) callback(`Couldn't fetch weather information of current location`, undefined);
      else if (statusCode === 401) callback(`The provided API key is invalid`, undefined);
      else if (statusCode === 404) callback(`The API request was invalid`, undefined);
      else if (statusCode === 429) callback(`Your Quota has been expired, please try again later`, undefined);
    } else {
      callback(`Unable to fetch Weather Information ${err}`, undefined)
    }
  }
}

module.exports = {
  getWeather,
}
