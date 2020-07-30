const request = require('request');

const fetchMyIP = function(callback) {
  request('https://api.ipify.org/?format=json', (error, response, body) => {
    if (error) {
      callback(error);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg));
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

const fetchCoordsByIP = (ip, callback) => {
  request('https://ipvigilante.com/' + ip, (error, response, body) => {
    if (error) {
      callback(error);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates. Response: ${body}`;
      callback(Error(msg));
      return;
    }
    const data = JSON.parse(body).data;
    callback(error, { latitude: data.latitude, longitude: data.longitude });
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      callback(error);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates. Response: ${body}`;
      callback(Error(msg));
      return;
    }
    const times = JSON.parse(body).response;
    callback(error, times);
  });
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      callback(error);
      return;
    }
    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        callback(error);
        return;
      }
      fetchISSFlyOverTimes(coords, (error, times) => {
        if (error) {
          callback(error);
          return;
        }
        callback(error, times);
      });
    });
  });
};


module.exports = nextISSTimesForMyLocation;