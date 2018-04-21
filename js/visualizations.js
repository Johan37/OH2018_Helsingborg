
var greenIcon = new L.Icon({
  iconUrl: 'icons/bicycle.svg',
  iconSize: [15, 15],
  iconAnchor: [6, 15],
  popupAnchor: [1, -34]
});

var yellowIcon = new L.Icon({
  iconUrl: 'icons/parking.svg',
  iconSize: [15, 15],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34]
});

var blueIcon = new L.Icon({
  iconUrl: 'icons/charging.svg',
  iconSize: [15, 15],
  iconAnchor: [0, 0],
  popupAnchor: [1, -34]
});


generate_heatmap = function(data_path) {
  return $.getJSON(data_path).then(function(json) {
      return L.heatLayer(json, {radius: 7, gradient: {0.2: "white", 0.6: "gray", 0.98: "black"}}).addTo(mymap);
  })
};

var parking_positions = [];
var charge_positions = [];
var bike_pump_positions = [];


add_parking_markers = function(json_path, icon, description_field) {

  return $.getJSON(json_path).then(function(json) {

    var marker_info_list = [];
    for (var i = 0; i < json.length; i++) {
      var target = json[i];

      var description = target.fields[description_field];
      var lng = target.geometry.coordinates[0];
      var lat = target.geometry.coordinates[1];

      marker_info_list.push([lat, lng, description]);
    }

    parking_positions = marker_info_list;

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

add_bike_pump_markers = function(json_path, icon, description_field) {

  return $.getJSON(json_path).then(function(json) {

    var marker_info_list = [];
    for (var i = 0; i < json.length; i++) {
      var target = json[i];

      var description = target.fields[description_field];
      var lng = target.geometry.coordinates[0];
      var lat = target.geometry.coordinates[1];

      marker_info_list.push([lat, lng, description]);
    }

    bike_pump_positions = marker_info_list;

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

    charge_positions = marker_info_list;

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
  overlayMaps["Noise"] = returnval;
});

add_bike_pump_markers("data/cykelpumpar.json", greenIcon, "beskrivning").then(function(returnval) {
  overlayMaps["Bike pumps"] = returnval;
});

add_parking_markers("data/parkering_new.json", yellowIcon, "plats").then(function(returnval) {
  overlayMaps["Parkeringar"] = returnval;
});

add_markers_flat("data/laddata.json", blueIcon).then(function(returnval) {
  overlayMaps["Laddstationer"] = returnval;
  L.control.layers(null, overlayMaps).addTo(mymap);
});


// $(document).ready(function() {})
// var heatmap_layer = generate_heatmap("data/centroided_noise.json");
// var bike_pump_layer = add_markers("data/cykelpumpar.json", greenIcon, "beskrivning");
// var car_parking_layer = add_markers("data/parkering_new.json", yellowIcon, "plats");
// var charge_station_layer = add_markers_flat("data/laddata.json", blueIcon);

// var baseMaps = {
//   "Streets": streets
// };

