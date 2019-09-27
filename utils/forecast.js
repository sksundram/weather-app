const request = require('request');
require('dotenv').config();

// Display weather information for a given location
const forecast = (lat, long, callback) => {
  request(
    {
      url: `https://api.darksky.net/forecast/${process.env.DARKSKY_API_KEY}/${lat},${long}`,
      json: true,
      qs: { units: 'si', exclude: 'minutely,hourly,alerts,flags' }
    },
    (err, { body }) => {
      if (err) {
        callback('Unable to connect to weather service!');
      } else if (body.error) {
        callback('Unable to find location!');
      } else {
        callback(
          undefined,
          `${body.daily.data[0].summary}\nIt is currently ${body.currently.temperature} degrees celsius out there with a ${body.currently.precipProbability}% chance of rain.`
        );
      }
    }
  );
};

module.exports = forecast;
