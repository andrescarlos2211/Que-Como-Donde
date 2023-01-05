mapboxgl.accessToken = 'pk.eyJ1IjoiYW5kcmVzY2FybG9zMjIxMSIsImEiOiJjbGNqYmRleGswNXVnNDF0OWk0eTR5NHYyIn0.UY24vF15k-2db6b_rnhrNQ';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  zoom:10,
  center: [-71.5,-33.02],
  attributionControl: false

});

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
