function getURLParameter(sParam) {
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

var user_id = getURLParameter('user_id');
console.log(user_id);
$(document).ready(function() {

  $.ajax({

                             url: "/get_insurances/",//problem with URL  + $("#username").val()+ $("#password").val(),
                             type: "GET",
                             dataType : "json",

                             success: function( data ) {

                             console.log("You received some data!", data);
                             for(var i = 0; i < data.length; i++){
                                $('#insurancename select').append('<option>'+data[i]+'</option>');
                             }

//                              if (data.username!=null)
//                              {
// // <!--                          $("#status").html("Successfully Logged In! You will be redirected soon");-->
// //                              window.location.replace("userinformation.html");
//
//                              }
//                              else {
//
//
//                              }
                             },

              });





});
