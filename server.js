
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.post('/create_user', function(req,res){
         var postBody = req.body;
         var user_id = postBody.user_id;
         console.log(user_id);
         return;
//         console.log(req.body);
         });


var server = app.listen(3000, function () {
                        var port = server.address().port;
                        console.log('Server started at http://localhost:%s/', port);
                        });

