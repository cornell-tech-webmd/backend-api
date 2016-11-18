$(document).ready(function() {

	$('.caretypetab').click(function(){
		$('.caretypetab').removeClass('current');
		$(this).addClass('current');
	});
	
	var START_LAT = 40.741077;
	var START_LONG = -74.002160;
	var ZOOM = 15
	// Used to remember markers
	var markerStore = {};

	var myLatlng = new google.maps.LatLng(START_LAT,START_LONG);
    var myOptions = {
        zoom: ZOOM,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
    }
    var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

	getMarkers();

	function getMarkers() {
		console.log('getMarkers');
		$.get('/markers', {}, function(res,resp) {
			console.dir(res);
			for(var i=0, len=res.length; i<len; i++) {

				//Do we have this marker already?
				if(markerStore.hasOwnProperty(res[i].id)) {
					markerStore[res[i].id].setPosition(new google.maps.LatLng(res[i].position.lat,res[i].position.long));
				} else {
					var marker = new google.maps.Marker({
						position: new google.maps.LatLng(res[i].position.lat,res[i].position.long),
						title:res[i].name,
						map:map
					});	
					markerStore[res[i].id] = marker;
					console.log(marker.getTitle());
				}
			}
		}, "json");
	}
	
})
