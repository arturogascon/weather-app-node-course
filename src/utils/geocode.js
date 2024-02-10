const axios = require('axios');

const geocode = (address, callback) => {
  const MAPBOX_URL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?limit=1&access_token=${process.env.MAPBOX_API_KEY}`;

  axios
    .get(MAPBOX_URL)
    .then(({data: {features} = {}}) => {
      if (!features?.length) {
        throw new Error('No location found');
      }
      const {
        place_name: location,
        center: [longitude, latitude],
      } = features[0];
      callback(undefined, {location, latitude, longitude});
    })
    .catch((e) => {
      if (e.request) {
        callback('No response from the API');
      } else if (e) {
        callback(e.message);
      } else {
        callback('Unable to connect to Mapbox API');
      }
    });
};

module.exports = geocode;
