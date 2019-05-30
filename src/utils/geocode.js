const request = require('request');

const geoCode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoicHJhc2FkcGF0aWwiLCJhIjoiY2p3NTUxeG0yMHIwMTN6bWc0ams0b21xYiJ9.rPALkdmmoFwAenyB906xKg`;
  request(
    url,
    {
      json: true
    },
    (err, { body }) => {
      if (err) {
        callback('Unable to connect weather service');
      } else if (body.message || (body && !body.features.length)) {
        callback('Unable to find location.');
      } else {
        const features = body.features[0];
        callback(null, {
          latitude: features.center[1],
          longitude: features.center[0],
          location: features.place_name
        });
      }
    }
  );
};

module.exports = geoCode;
