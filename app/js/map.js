$(window).resize(function(){
    createMap(); 
    mapHeight();   
});

createMap();
mapHeight();

function setMarkers(map) {
    //Определяем область показа маркеров
    var latlngbounds = new google.maps.LatLngBounds();   
    var image = new google.maps.MarkerImage('/img/map-pointer.png',      
    new google.maps.Size(45, 65),      
    new google.maps.Point(0,0),      
    new google.maps.Point(0, 65)); 
     
    var myLatLng = new google.maps.LatLng(55.7096805,37.692549);
    //Добавляем координаты маркера в область
    latlngbounds.extend(myLatLng);
    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map, 
        icon: image,   
    }); 
};

function createMap() {
    var latlng = new google.maps.LatLng(55.7096805,37.692549);
    var myOptions = {
        zoom: 16,
        center: latlng,
        scrollwheel: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);    
    setMarkers(map); 
};

function mapHeight() {   
    //Высота гугл карты
    $('#map-canvas').css('height', $(window).height() - $('footer').outerHeight());
}
