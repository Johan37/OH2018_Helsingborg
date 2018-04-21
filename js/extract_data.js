
// get_bike_pumps_positions = function() {
//
//   var path = "data/cykelpumpar.json";
//   return $.getJSON(path).then(function(json) {
//
//     var marker_info_list = [];
//     for (var i = 0; i < json.length; i++) {
//       var target = json[i];
//       var lng = target[1];
//       var lat = target[0];
//       marker_info_list.push([lat, lng]);
//     }
//     return(marker_info_list);
//   });
// };
//
// get_charge_station_positions = function() {
//   var path = "data/laddata.json";
//
//   return $.getJSON(path).then(function(json) {
//     var marker_info_list = [];
//     for (var i = 0; i < json.length; i++) {
//       var target = json[i];
//       var lng = target[1];
//       var lat = target[0];
//       marker_info_list.push([lat, lng]);
//     }
//     return(marker_info_list);
//   });
// };
//
// get_parking_positions = function() {
//   var path = "data/parkering_new.json";
//   return $.getJSON(path).then(function(json) {
//
//     var marker_info_list = [];
//     for (var i = 0; i < json.length; i++) {
//       var target = json[i];
//       var lng = target[1];
//       var lat = target[0];
//       marker_info_list.push([lat, lng]);
//     }
//     console.log(marker_info_list);
//     return(marker_info_list);
//     // return(marker_info_list);
//   });
// };

function retrieve_start_coords() {
  // Get the place details from the autocomplete object.
  var place = StartLocAutoCompl.getPlace();
  var start_coord = [ place.geometry.location.lat(), place.geometry.location.lng() ];
  return start_coord;
}

function retrieve_destination_coords() {
  // Get the place details from the autocomplete object.
  var place = DestLocAutoCompl.getPlace();
  var dest_coord = [ place.geometry.location.lat(), place.geometry.location.lng() ];
  return dest_coord;
}

function calculate_dist(point1, point2) {
  var x_dist = Math.abs(point1[0] - point2[0]);
  var y_dist = Math.abs(point1[1] - point2[1]);
  var dist = Math.sqrt(x_dist * x_dist + y_dist * y_dist);
  return(dist);
}

var mid_marker;

function calculate_best_route() {

  console.log("Calculating route");
  console.log(charge_positions.length);
  console.log(parking_positions.length);
  console.log(bike_pump_positions.length);

  console.log(typeof(parking_positions));
  console.log(parking_positions);

  var start_coords = retrieve_start_coords();
  var dest_coords = retrieve_destination_coords();
  var best_path = null;

  for (var i = 0; i < parking_positions.length; i++) {
    var curr_pos = parking_positions[i];
    var curr_path = {};
    curr_path['mid'] = curr_pos;
    curr_path['car_dist'] = calculate_dist(start_coords, curr_pos);
    curr_path['bike_dist'] = calculate_dist(curr_pos, dest_coords);
    curr_path['tot_dist'] = curr_path['car_dist'] + curr_path['bike_dist'];

    if (best_path === null) {
      best_path = curr_path;
    }
    else {
      if (curr_path['car_dist'] < best_path['car_dist']) {
        best_path = curr_path;
      }
    }
  }
  var best_mid_coord = [best_path['mid'][0], best_path['mid'][1]];
  console.log(best_mid_coord);

  if( mid_marker ) {
    mymap.removeLayer( mid_marker );
  }

  mid_marker = L.marker( best_mid_coord, {icon:StartIcon} );
  mid_marker.addTo( mymap );

  return(best_mid_coord);
}
