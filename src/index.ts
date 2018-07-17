import './marker.extension';
declare const google;

const myLatLng = { lat: -25.363, lng: 131.044 };
const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center:new google.maps.LatLng(-25.363, 131.044)
});

var image = {
    url: '/img/psyduck.png',
    size: new google.maps.Size(72, 72),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(36, 36) 
};

var marker = new google.maps.Marker({
    position: new google.maps.LatLng(-25.363, 131.044),
    map: map,
    icon: image
});

map.addListener('click',(event)=>{
    marker.animateTo({
        latLng: event.latLng,
        duration: 2
    });
});