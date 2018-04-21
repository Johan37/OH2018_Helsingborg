
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

function measure(lat1, lon1, lat2, lon2){  // generally used geo measurement function
    var R = 6378.137; // Radius of earth in KM
    var dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
    var dLon = lon2 * Math.PI / 180 - lon1 * Math.PI / 180;
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    return d * 1000; // meters
}

var mid_marker;

function calculate_best_route( MaxBicycleRange ) {


  var find_charge_station = $('#useChargeStation').is(":checked");
  // console.log($('#useChargeStation'));
  console.log(find_charge_station);

  console.log("Calculating route");
  console.log(charge_positions.length);
  console.log(parking_positions.length);
  console.log(bike_pump_positions.length);

  console.log(typeof(parking_positions));
  console.log(parking_positions);

  var start_coords = retrieve_start_coords();
  var dest_coords = retrieve_destination_coords();
  var best_path = null;

  var target_list;
  if (find_charge_station) {
    target_list = charge_positions;
  }
  else {
    target_list = parking_positions;
  }

  for (var i = 0; i < target_list.length; i++) {
    var curr_pos = target_list[i];
    var curr_path = {};
    curr_path['mid'] = curr_pos;
    curr_path['car_dist'] = measure(start_coords[0], start_coords[1], curr_pos[0], curr_pos[1]);
    curr_path['bike_dist'] = measure(curr_pos[0], curr_pos[1], dest_coords[0], dest_coords[1]);
    curr_path['tot_dist'] = curr_path['car_dist'] + curr_path['bike_dist'];

    if (best_path === null && MaxBicycleRange >= curr_path['bike_dist'] ) {
      best_path = curr_path;
    }
    else if(best_path != null && curr_path['car_dist'] < best_path['car_dist'] && MaxBicycleRange >= curr_path['bike_dist'] ) {
        best_path = curr_path;
    }
   }

  if( best_path != null )
  {
     var best_mid_coord = [best_path['mid'][0], best_path['mid'][1]];
     console.log(best_mid_coord);

     if( mid_marker ) {
       mymap.removeLayer( mid_marker );
     }

     mid_marker = L.marker( best_mid_coord, {icon:StartIcon} );
     mid_marker.addTo( mymap );

     return(best_mid_coord);
  }
  else
  {
     return( null );
  }
}
