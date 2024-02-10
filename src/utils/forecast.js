const axios = require('axios');

const geocode = (latitude, longitude, callback) => {
  const WEATHERSTACK_URL = `http://api.weatherstack.com/current?access_key=${process.env.WEATHERSTACK_API_KEY}&query=${latitude},${longitude}`;

  axios
    .get(WEATHERSTACK_URL)
    .then(({data: {current, error} = {}}) => {
      if (error) {
        throw new Error(error.info);
      }

      callback(
        undefined,
        `${current.weather_descriptions?.[0]}. It is currently ${current.temperature}°C. With a chance of rain of ${
          current.precip * 100
        }%.`
      );
    })
    .catch((e) => {
      if (e.request) {
        callback('No response from the Weather Stack API');
      } else if (e) {
        callback(e);
      } else {
        callback('Unable to connect to Weather Stack API');
      }
    });
};

module.exports = geocode;
