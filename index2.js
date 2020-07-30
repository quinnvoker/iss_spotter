const { nextISSTimesForMyLocation } = require('./iss_promised');

nextISSTimesForMyLocation()
  .then(times => {
    for (const time of times) {
      const fullTime = new Date(0);
      fullTime.setUTCSeconds(time.risetime);
      console.log(`Next pass at ${fullTime} for ${time.duration} seconds!`);
    }
  })
  .catch(error => {
    console.log(`It didn't work:`, error.message);
  });