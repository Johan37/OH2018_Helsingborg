

$.getJSON("data/centroided_noise.json", function(json) {

  var noise_layer = L.heatLayer(
    json,
    {radius: 7, gradient: {0.2: 'yellow', 0.6: 'orange', 0.9: 'red'}}).addTo(mymap);

});

