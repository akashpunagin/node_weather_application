const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

var argv = yargs
  .options({
    address: {
      demand: true,
      describe: "Address to check weather",
      alias: "a",
      string: true,
    },
  })
  .command("temp", "Configure Temperature", {
    units: {
      describe: "Set Metric. Accepted values - 'standard (K)', 'metric (*C)', 'imperial (F)' (defaults to 'metric')",
      alias: "u"
    }
  })
  .check((argv) => {
    if(argv.units) {
      if (argv.units === "standard" || argv.units === "metric" || argv.units === "imperial") {
        return true;
      } else {
        throw new Error(`Invalid arguement '${argv.units}'. Accepted values - 'standard (K)', 'metric (*C)', 'imperial (F)'`);
      }
    } else {
      argv.units = "metric";
      return true;
    }
  })
  .help()
  .alias("help", "h")
  .argv;

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
  if(errorMessage) {
    console.log(errorMessage);
  } else {
    console.log("Address: ", results.address);
    weather.getWeather(results.latitude, results.longitude, argv.units, (errorMessage, weatherResults) => {
      if(errorMessage) {
        console.log(errorMessage);
      } else {
        console.log("----------------");
        console.log(`${weatherResults.weather} - ${weatherResults.weather_description}`);
        console.log(`Temperature is ${weatherResults.temp}, feels like ${weatherResults.feels_like}`);
        console.log(`Min temp: ${weatherResults.temp_min}. Max temp: ${weatherResults.temp_max}`);
        console.log(`Humidity: ${weatherResults.humidity}`);
      }
    });
  }
});
