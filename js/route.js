var StartLocAutoCompl, DestLocAutoCompl, StartLocCoord, DestLocCoord, StartMarker, DestMarker;

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
}

function geolocate() {
      var circle = new google.maps.Circle({
        center: {lat: 56.044, lng: 12.71},
        radius: 50000 // 50 km
      });
      StartLocAutoCompl.setBounds(circle.getBounds());
}