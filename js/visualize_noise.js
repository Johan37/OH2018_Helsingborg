

// var mymap = L.map('mapid').setView([56.044, 12.71], 12);

// L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
//   maxZoom: 18,
//   attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
//   '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
//   'Imagery © <a href="http://mapbox.com">Mapbox</a>',
//   id: 'mapbox.streets'
// }).addTo(mymap);


$.getJSON("data/centroided_noise.json", function(json) {
  console.log(json);
});

var heat = L.heatLayer(
  [[56.044, 12.71, 10]],
  {radius: 120, gradient: {0.2: 'yellow', 0.6: 'orange', 0.9: 'red'}}).addTo(mymap);


// $.ajax({
//   type: "POST",
//   url: 'https://openhack-catch22.herokuapp.com/confirmation',
//   data: { number: phone_number },
//   dataType: 'application/json'
// });


// var heat = L.heatLayer([
//   [50.5, 30.5, 0.2], // lat, lng, intensity
//   [50.6, 30.4, 0.5]
// ], {radius: 25}).addTo(map);

