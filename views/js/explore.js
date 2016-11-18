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

var user_id = GetURLParameter('user_id');
var user_profile;
var care_type = GetURLParameter('care_type');
if (care_type == null) care_type = 'medical';

$(document).ready(function() {

	$('.caretypetab').click(function(){
		$('.caretypetab').removeClass('current');
		$(this).addClass('current');
	});
	
	var START_LAT = 40.741077;
	var START_LONG = -74.002160;
	var ZOOM = 15;

	var myLatlng = new google.maps.LatLng(START_LAT,START_LONG);
    var myOptions = {
        zoom: ZOOM,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
    }
    var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

	markDoctors();

	function markDoctors() {
		console.log('markDoctors');
		$.get('/find_doctors?user_id=1&care_type=medical&user_insurance=Aetna%20Group&lat=40.74107&long=-74.002160', {}, function(res,resp) {
			console.dir(res);
			for(var i=0, len=res.length; i<len; i++) {
				var marker = new google.maps.Marker({
					position: new google.maps.LatLng(res[i].position.lat,res[i].position.long),
					label:res[i],
					map:map
				});
			}
		}, "json");
	}
});
