const nextISSTimesForMyLocation = require('./iss');

nextISSTimesForMyLocation((error, times) => {
  if (error) {
    console.log(error);
    return;
  }
  for (const time of times) {
    const fullTime = new Date(0);
    fullTime.setUTCSeconds(time.risetime);
    console.log(`Next pass at ${fullTime} for ${time.duration} seconds!`);
  }
});
