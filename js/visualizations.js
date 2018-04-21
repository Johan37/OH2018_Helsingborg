
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

var blueIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
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


// var data = $.parseJSON($.ajax({
//       url:  'ajaxload.php',
//       dataType: "json",
//       async: false
//     }).responseText); // This will wait until you get a response from the ajax request.

generate_heatmap = function(data_path) {
  return $.getJSON(data_path).then(function(json) {
      return L.heatLayer(json, {radius: 7, gradient: {0.2: "white", 0.6: "gray", 0.98: "black"}}).addTo(mymap);
  })
};

add_markers = function(json_path, icon, description_field) {

  return $.getJSON(json_path).then(function(json) {

    var marker_info_list = [];
    for (var i = 0; i < json.length; i++) {
      var target = json[i];

      var description = target.fields[description_field];
      var lng = target.geometry.coordinates[0];
      var lat = target.geometry.coordinates[1];

      marker_info_list.push([lat, lng, description]);
    }

    var markers = [];

    for (var j = 0; j < marker_info_list.length; j++) {
      var marker_info = marker_info_list[j];
      var marker_pos = marker_info.slice(0,2);
      var marker_text = marker_info[2];
      var marker = L.marker(marker_pos, {icon: icon}).bindPopup(marker_text).addTo(mymap);
      markers.push(marker);
    }

    return(L.layerGroup(markers));
  });
};



add_markers_flat = function(json_path, icon) {

  return $.getJSON(json_path).then(function(json) {

    var marker_info_list = [];
    for (var i = 0; i < json.length; i++) {
      var target = json[i];
      var lng = target[1];
      var lat = target[0];
      marker_info_list.push([lat, lng]);
    }

    var markers = [];

    for (var j = 0; j < marker_info_list.length; j++) {
      var marker_info = marker_info_list[j];
      var marker_pos = marker_info.slice(0,2);
      var marker = L.marker(marker_pos, {icon: icon}).addTo(mymap);
      markers.push(marker);
    }

    return(L.layerGroup(markers));
  });
};


var overlayMaps = {
  // "Noise": heatmap_layer
};

generate_heatmap("data/centroided_noise.json").then(function(returnval) {
  var heatmap_layer = returnval;
  overlayMaps["Noise"] = heatmap_layer;
});

add_markers("data/cykelpumpar.json", greenIcon, "beskrivning").then(function(returnval) {
  var bike_pump_layer = returnval;
  overlayMaps["Bike pumps"] = bike_pump_layer;
});

add_markers("data/parkering_new.json", yellowIcon, "plats").then(function(returnval) {
  var parkering_new = returnval;
  overlayMaps["Parkeringar"] = parkering_new;
});

add_markers_flat("data/laddata.json", blueIcon).then(function(returnval) {
  var charge_layer = returnval;
  overlayMaps["Laddstationer"] = charge_layer;
  L.control.layers(null, overlayMaps).addTo(mymap);
});

// <script type="text/javascript">
//   $(document).ready(function(){
//     var data = $.parseJSON($.ajax({
//       url:  'ajaxload.php',
//       dataType: "json",
//       async: false
//     }).responseText); // This will wait until you get a response from the ajax request.
//
//     // Now you can use data.posX, data.posY later in your code and it will work.
//     var x = data.posX;
//     var y = data.posY;
//     alert(x+" "+y);
//     alert(data.posX+" "+data.posY);
//   });
// </script>

// $(document).ready(function() {})
// var heatmap_layer = generate_heatmap("data/centroided_noise.json");
// var bike_pump_layer = add_markers("data/cykelpumpar.json", greenIcon, "beskrivning");
// var car_parking_layer = add_markers("data/parkering_new.json", yellowIcon, "plats");
// var charge_station_layer = add_markers_flat("data/laddata.json", blueIcon);

// var baseMaps = {
//   "Streets": streets
// };

