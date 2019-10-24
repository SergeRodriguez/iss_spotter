/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const request = require("request")

const fetchMyIP = function (callback) {
  const URL = "https://api.ipify.org?format=json"
  // use request to fetch IP address from JSON API

  request(URL, (error, response, content) => {
    if (error) {
      callback(error.message, null)
    } else {
      if (response.statusCode !== 200) {
        const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${content}`;
        callback(Error(msg), null);
        return;
      }
      const ip = JSON.parse(content).ip
      callback(null, ip)
    }
  })
}

const fetchCoordsByIP = function (ip, callback) {
  request("https://ipvigilante.com/" + ip, (error, response, content) => {
    if (error) {
      callback(error.message, null)
    } else {
      if (response.statusCode !== 200) {
        const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${content}`;
        callback(Error(msg), null);
        return;
      }
      let coordinates = {};
      myCoordinates = JSON.parse(content)
      coordinates.latitude = myCoordinates.data.latitude
      coordinates.longitude = myCoordinates.data.longitude
      callback(null, coordinates)
    }
  })
}

const fetchISSFlyOverTimes = function(coords, callback) {
  let LAT = coords.latitude;
  let LON = coords.longitude;
  request(`http://api.open-notify.org/iss-pass.json?lat=${LAT}&lon=${LON}`, (error, response, content) => {
    if (error) {
      callback(error.message, null)
    } else {
      if (response.statusCode !== 200) {
        const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${content}`;
        callback(Error(msg), null);
        return;
      }
     
      callback(null, content)
    }
  })
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };