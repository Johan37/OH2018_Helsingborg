

$.getJSON("data/centroided_noise.json", function(json) {

  var noise_layer = L.heatLayer(
    json,
    {radius: 7, gradient: {0.2: 'yellow', 0.6: 'orange', 0.9: 'red'}}).addTo(mymap);

});


var greenIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

var yellowIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// L.marker([51.5, -0.09], {icon: greenIcon}).addTo(map);

// var redMarker = L.AwesomeMarkers.icon({
//   icon: 'coffee',
//   markerColor: 'red'
// });

add_markers = function(json_path, icon, description_field) {

  $.getJSON(json_path, function(json) {
    console.log(json);
    // L.marker([56.044, 12.71]).addTo(mymap);
    var markers = [];

    for (var i = 0; i < json.length; i++) {
      var target = json[i];
      var lng = target.geometry.coordinates[0];
      var lat = target.geometry.coordinates[1];
      var description = target.fields[description_field];
      markers.push([lat, lng, description]);
    }

    for (var j = 0; j < markers.length; j++) {
      var marker = markers[j];
      var marker_pos = marker.slice(0,2);
      var marker_text = marker[2];
      L.marker(marker_pos, {icon: icon}).bindPopup(marker_text).addTo(mymap);
    }

  });

};

add_markers("data/cykelpumpar.json", greenIcon, "beskrivning");
add_markers("data/parkering_new.json", yellowIcon, "plats");
