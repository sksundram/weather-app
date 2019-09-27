const request = require('request');
require('dotenv').config();

// Fetch location coordinates of an address
const geocode = (address, callback) => {
  request(
    {
      baseUrl: 'https://api.mapbox.com/geocoding/v5/',
      url: `/mapbox.places/${encodeURIComponent(address)}.json`,
      json: true,
      qs: {
        access_token: process.env.MAPBOX_API_KEY,
        limit: 1,
        autocomplete: false
      }
    },
    (err, { body }) => {
      if (err) {
        callback('Unable to connect to location service!');
      } else if (body.message || body.features.length === 0) {
        callback('Unable to find location!');
      } else {
        callback(undefined, {
          lat: body.features[0].center[1],
          long: body.features[0].center[0],
          location: body.features[0].place_name
        });
      }
    }
  );
};

module.exports = geocode;
