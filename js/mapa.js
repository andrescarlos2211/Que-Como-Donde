mapboxgl.accessToken = 'pk.eyJ1IjoiYW5kcmVzY2FybG9zMjIxMSIsImEiOiJjbGNqYmRleGswNXVnNDF0OWk0eTR5NHYyIn0.UY24vF15k-2db6b_rnhrNQ';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  zoom:10,
  center: [-71.5,-33.02],
  attributionControl: false

});

// setTimeout( 
//   function(){
  
// map.resize();
//   }
//   ,3000);


map.addControl(new mapboxgl.AttributionControl(), 'top-left');



map.addControl(
    new mapboxgl.GeolocateControl({
    positionOptions: {
    enableHighAccuracy: true
    },
    // When active the map will receive updates to the device's location as it changes.
    trackUserLocation: true,
    // Draw an arrow next to the location dot to indicate which direction the device is heading.
    showUserHeading: true
    })
    );

    map.scrollZoom.enable();
map.on('load', () => {
// Load an image from an external URL.
map.loadImage(
'https://cdn.shopify.com/s/files/1/1061/1924/products/Beer_Emoji_large.png',
(error, image) => {
if (error) throw error;
 
// Add the image to the map style.
map.addImage('cat', image);
 
// Add a data source containing one point feature.
map.addSource('point', {
'type': 'geojson',
'data': {
'type': 'FeatureCollection',
'features': [
{
'type': 'Feature',
'geometry': {
'type': 'Point',
'coordinates': [-71.5,-33.02]
}
}
]
}
});
 
// Add a layer to use the image to represent the data.
map.addLayer({
'id': 'points',
'type': 'symbol',
'source': 'point', // reference the data source
'layout': {
'icon-image': 'cat', // reference the image
'icon-size': 0.1
}
});
}
);
});
