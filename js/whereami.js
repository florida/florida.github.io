function fetchJSONFile(path, callback) {
  var httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function() {
      if (httpRequest.readyState === 4) {
          if (httpRequest.status === 200) {
              var data = JSON.parse(httpRequest.responseText);
              if (callback) callback(data);
          }
      }
  };
  httpRequest.open('GET', path);
  httpRequest.send();
}

fetchJSONFile('https://api.foursquare.com/v2/users/self/checkins?oauth_token=X0OV54PKNCDPWAAGHTIM04HCACPRPWZ0BP3LZKQDUXZMLQ5T&v=20140323', function(data){
    document.getElementById("whereami").innerHTML = data.response.checkins.items[0].venue.name +
    " at " +
    data.response.checkins.items[0].venue.location.address.split(" ").splice(1,2).join(" ")
});
