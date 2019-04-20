const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/8861a70c7bf9d9ede31af566b99979ad/${latitude},${longitude}?units=si`;

  request.get({ url, json: true }, (error, response) => {
    const { error: err, currently, daily } = response.body;
    if (error) {
      callback("Unable to connect to weather service", undefined);
    } else if (err) {
      callback("Unable to find location", undefined);
    } else {
      const { temperature, precipProbability } = currently;

      callback(
        undefined,
        `${
          daily.data[0].summary
        } It is currently ${temperature} degrees out. There is a ${precipProbability}% chance of rain.`
      );
    }
  });
};

module.exports = forecast;
