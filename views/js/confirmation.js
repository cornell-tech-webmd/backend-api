

function GetURLParameter(sParam) {
	var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++)
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam)
        {
            return sParameterName[1];
        }
    }
	return null;
}
var doc_id = GetURLParameter('doctor_id');
$(document).ready(function() {
	// get current user current location
	var currentPos;
	var map;
	var infowindow;
	var START_LAT = 40.741077;
    var START_LONG = -74.002160;
    var ZOOM = 16;
    // pin you current location
    var patientImage = {
        url: 'images/patient1.png',
        scaledSize : new google.maps.Size(32, 32),
    };
    var myLatlng = new google.maps.LatLng(START_LAT,START_LONG);
    var myOptions = {
        zoom: ZOOM,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
    }
    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions)
    infowindow = new google.maps.InfoWindow();
    var marker = new google.maps.Marker({
        position: myLatlng,
        icon:patientImage
    });
    marker.setMap(map);
    markDest();
	$('#map_canvas').css({'width':'312px','height':'720px'});
	function markDest() {
		$.get('/get_doctor?doctor_id=' + doc_id, {}, function(res,resp) {
            console.log(res);
            var doc = res;

            $("#doc_img").html("<img src=" + doc.image_url + " style=width:80px height:80px>");
            $("#doc_name").html(doc.first_name + " " + doc.last_name);
            $.get('/get_clinic?clinic_id=' + res.clinic_id, {}, function(res,resp) {
                console.log(res);
                $("#cli_name").html(res.clinic_name);
                $("#cli_addr").html(res.address);
                var image = 'images/hosp.png';
                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(res.lat, res.long),
                    icon:image,
                    animation: google.maps.Animation.BOUNCE,
                    map:map
                });
            }, "json");
	  	}, "json");
	}
    // $("#uber").click(function(){
    //             window.location = "uber://";
    //             console.log("I am sending you to uber");
    //
    // });


});
