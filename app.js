const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// Fetch address from user as a command line argument
const address = process.argv[2];

if (address) {
  geocode(address, (err, { lat, long, location }) => {
    if (err) return console.log(err);

    forecast(lat, long, (err, forecastData) => {
      if (err) return console.log(err);

      console.log(location);
      console.log(forecastData);
    });
  });
} else {
  console.log('Please provide address as an argument!');
}
