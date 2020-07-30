const request = require('request');

const fetchMyIP = function(callback) {
  request('https://api.ipify.org/?format=json', (error, response, body) => {
    if (error) {
      callback(error);
      return;
    }
    const data = JSON.parse(body);
    if (data.length < 1) {
      callback('Did not recieve valid IP object');
      return;
    }
    callback(error, data.ip);
  });
};

module.exports = { fetchMyIP };