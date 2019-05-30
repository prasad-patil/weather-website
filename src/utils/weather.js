const request = require('request');

const weather = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/8b19bce4ba8633d1941b05f028939846/${latitude},${longitude}?units=si`;
  request(
    url,
    {
      json: true
    },
    (err, { body }) => {
      if (err) {
        callback('Unable to connect weather service');
      } else if (body.error) {
        callback('Unable to find location.');
      } else {
        callback(
          null,
          `${body.daily.summary} The current tempture is ${
            body.currently.apparentTemperature
          }. There is ${body.currently.precipProbability}% chance of rain.`
        );
      }
    }
  );
};

module.exports = weather;
