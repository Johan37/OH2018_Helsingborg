
get_bike_pumps_positions = function() {

  var path = "data/cykelpumpar.json";
  return $.getJSON(path).then(function(json) {

    var marker_info_list = [];
    for (var i = 0; i < json.length; i++) {
      var target = json[i];
      var lng = target[1];
      var lat = target[0];
      marker_info_list.push([lat, lng]);
    }
    return marker_info_list;
  });
};

get_charge_station_positions = function() {
  var path = "data/laddata.json";

  return $.getJSON(path).then(function(json) {
    var marker_info_list = [];
    for (var i = 0; i < json.length; i++) {
      var target = json[i];
      var lng = target[1];
      var lat = target[0];
      marker_info_list.push([lat, lng]);
    }
    return marker_info_list;
  });
};

get_parking_positions = function() {
  var path = "data/parkering_new.json";
  return $.getJSON(path).then(function(json) {

    var marker_info_list = [];
    for (var i = 0; i < json.length; i++) {
      var target = json[i];
      var lng = target[1];
      var lat = target[0];
      marker_info_list.push([lat, lng]);
    }
    return marker_info_list;
  });
};