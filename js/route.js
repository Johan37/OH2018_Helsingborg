var StartLocAutoCompl, DestLocAutoCompl, StartLocCoord, DestLocCoord, StartMarker, DestMarker, CarRoute, CarBicycleRoute, SwitchToBicycleCoord, CarRouteDistance, BicycleCarRouteDistance;

var StartIcon = L.icon({
    iconUrl: 'icons/startflag.png',
    iconSize: [32,32],
    iconAnchor: [0, 32]
});

var DestIcon = L.icon({
    iconUrl: 'icons/destflag.png',
    iconSize: [32, 32],
    iconAnchor: [0, 32]
});

function initAutocomplete() {
  // Create the autocomplete object, restricting the search to geographical
  // location types.
   StartLocAutoCompl = new google.maps.places.Autocomplete(
      /** @type {!HTMLInputElement} */(document.getElementById('startlocinput')),
      {types: ['geocode']});
   DestLocAutoCompl = new google.maps.places.Autocomplete(
      /** @type {!HTMLInputElement} */(document.getElementById('destlocinput')),
      {types: ['geocode']});

  // When the user selects an address from the dropdown, populate the address
  // fields in the form.
  StartLocAutoCompl.addListener('place_changed', GetStartLocCoordinates);
  DestLocAutoCompl.addListener('place_changed', GetDestLocCoordinates);
}

function GetStartLocCoordinates() {
  // Get the place details from the autocomplete object.
  var place = StartLocAutoCompl.getPlace();
  StartLocCoord = [ place.geometry.location.lat(), place.geometry.location.lng() ];

  if( StartMarker ) {
      mymap.removeLayer( StartMarker );
  }

  StartMarker = L.marker( StartLocCoord, {icon:StartIcon} );
  StartMarker.addTo( mymap );

  AddCarRoute();
}

function GetDestLocCoordinates() {
  // Get the place details from the autocomplete object.
  var place = DestLocAutoCompl.getPlace();
  DestLocCoord = [ place.geometry.location.lat(), place.geometry.location.lng() ];

  if( DestMarker ) {
      mymap.removeLayer( DestMarker );
  }

  DestMarker = L.marker( DestLocCoord, {icon:DestIcon} );
  DestMarker.addTo( mymap );

  AddCarRoute();
}

function geolocate() {
      var circle = new google.maps.Circle({
        center: {lat: 56.044, lng: 12.71},
        radius: 50000 // 50 km
      });
      StartLocAutoCompl.setBounds(circle.getBounds());
      DestLocAutoCompl.setBounds(circle.getBounds());
}

function AddCarRoute() {

   if( StartLocCoord && DestLocCoord )
   {
      if( CarRoute ){
         mymap.removeControl( CarRoute )
      }

      CarRoute = L.Routing.control({
         waypoints: [
            L.latLng( StartLocCoord[ 0 ], StartLocCoord[ 1 ] ),
            L.latLng( DestLocCoord[ 0 ], DestLocCoord[ 1 ] )
         ],
         routeLine: function(route) {
            var line = L.Routing.line(route, {
                addWaypoints: false,
                extendToWaypoints: true,
                routeWhileDragging: false,
                autoRoute: true,
                useZoomParameter: true,
                draggableWaypoints: false,
                addWaypoints: false
            });

            CarRouteDistance = route.summary.totalDistance;

            return line;
         },
         lineOptions: { addWaypoints: false }
      });
      CarRoute.addTo( mymap );
   }

   AddCarBicycleRoute( $('#bicyclerange').val() * 1000 );
}

function AddCarBicycleRoute( MaxBicycleRange ) {

   if( StartLocCoord && DestLocCoord )
   {
      if( CarBicycleRoute ){
         mymap.removeControl( CarBicycleRoute );
      }

      ChangeCoord = calculate_best_route( MaxBicycleRange );

      if( ChangeCoord != null )
      {
         CarBicycleRoute = L.Routing.control({
            waypoints: [
               L.latLng( StartLocCoord[ 0 ], StartLocCoord[ 1 ] ),
               L.latLng( ChangeCoord[ 0 ], ChangeCoord[ 1 ] ),
               L.latLng( DestLocCoord[ 0 ], DestLocCoord[ 1 ] )
            ],
            routeLine: function(route) {
               var line = L.Routing.line(route, {
                   addWaypoints: false,
                   extendToWaypoints: true,
                   routeWhileDragging: false,
                   autoRoute: true,
                   useZoomParameter: true,
                   draggableWaypoints: false,
                   addWaypoints: false,
                   styles: [{color: 'black', opacity: 0.15, weight: 9}, {color: 'white', opacity: 0.8, weight: 6}, {color: 'green', opacity: 1, weight: 2}]
               });

               BicycleCarRouteDistance = route.summary.totalDistance;

               return line;
            },
            lineOptions: { addWaypoints: false }
         });
         CarBicycleRoute.addTo( mymap );
      }
   }
}

$(document).on('input change', '#bicyclerange', function() {
      console.log( $(this).val() );
      if( StartLocCoord && DestLocCoord )
      {
         AddCarBicycleRoute( $(this).val()*1000 );
      }
   } );