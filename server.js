
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require("fs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.post('/create_user', function(req,res){
  var postBody = req.body;
  var user_id = postBody.user_id;
  var fs = require('fs');
  var dir = './user_file';
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }
  var file_name = dir + '/' + user_id + ".json";
  if (!fs.existsSync(file_name)){
    fs.writeFile(file_name, JSON.stringify(postBody), function (err) {
     if (err) return console.log(err);})
    res.status(200).send('Created!');
  }
  else{
    res.status(400).send('user_id exists, cannot create');
  }
  return;
  });

app.post('/update_user', function(req,res){
  var postBody = req.body;
  var user_id = postBody.user_id;
  var file_name = './user_file/' + user_id + ".json";
  if (fs.existsSync(file_name)){
    fs.writeFile(file_name, JSON.stringify(postBody), function (err) {
     if (err) return console.log(err);})
     res.status(200).send('Updated!');
  }
  else{
    res.status(400).send('Come on, you dont have this user, create first');
  }
  return;
  });

app.get('/get_user',function(req,res){
  // Varad Preference for query parameters
  // var user_id = req.params[0];
  var user_id = req.query.user_id;
  var file_name = './user_file/' + user_id + ".json";
  if (fs.existsSync(file_name)){
    fs.readFile(file_name, 'utf8',function (err, data)  {
      if (err) throw err;
      var obj = JSON.parse(data);
      res.setHeader('Content-Type', 'application/json');
      res.status(200).send(JSON.stringify(obj));
    });
  }
  else{
    res.status(400).send('User not exists');
  }
  return;
});

app.post('/create_doctor', function(req,res){
  var postBody = req.body;
  var doctor_id = postBody.doctor_id;
  console.log(doctor_id);
  var fs = require('fs');
  var dir = './doc_file';
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }
  var file_name = dir + '/' + doctor_id + ".json";
  if (!fs.existsSync(file_name)){
    fs.writeFile(file_name, JSON.stringify(postBody), function (err) {
     if (err) return console.log(err);})
    res.status(200).send('Created!');
  }
  else{
    res.status(400).send('user_id exists, cannot create');
  }
  return;
  });

app.post('/update_doctor', function(req,res){
  var postBody = req.body;
  var doctor_id = postBody.doctor_id;
  var file_name = './doc_file/' + doctor_id + ".json";
  if (fs.existsSync(file_name)){
    fs.writeFile(file_name, JSON.stringify(postBody), function (err) {
        if (err) return console.log(err);})
    return;
    res.status(200).send('Updated!');
  }
  else{
    res.status(400).send('doctor_id does not exist, create first');
  }
  });

app.get('/get_doctor',function(req,res){
  var doctor_id = req.query.doctor_id;
  var file_name = './doc_file/' + doctor_id + ".json";
  if (fs.existsSync(file_name)){
    fs.readFile(file_name, 'utf8',function (err, data)  {
      if (err) throw err;
      var obj = JSON.parse(data);
      console.log(obj);
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(obj));
    });
  }
  else{
    res.status(400).send('doctor_id does not exist!');
  }
  return;
});

app.post('/create_clinic', function(req,res){
  var postBody = req.body;
  var clinic_id = postBody.clinic_id;
  var fs = require('fs');
  var dir = './clinic_file';
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }
  var file_name = dir + '/' + clinic_id + ".json";
  if (!fs.existsSync(file_name)){
    fs.writeFile(file_name, JSON.stringify(postBody), function (err) {
     if (err) return console.log(err);})
    res.status(200).send('Created!');
  }
  else{
    res.status(400).send('clinic_id already exists');
  }
  return;
  });

app.post('/update_clinic', function(req,res){
  var postBody = req.body;
  var clinic_id = postBody.clinic_id;
  var file_name = './clinic_file/' + clinic_id + ".json";
  if (fs.existsSync(file_name)){
    fs.writeFile(file_name, JSON.stringify(postBody), function (err) {
        if (err) return console.log(err);})
    res.status(200).send('OK');
  }
  else{
    res.status(400).send('clinic_id does not exist, canont upgrade');
  }
  return;
  });

app.get('/get_clinic',function(req,res){
  var clinic_id = req.query.clinic_id;
  var file_name = './clinic_file/' + clinic_id + ".json";
  if (fs.existsSync(file_name)){
    fs.readFile(file_name, 'utf8',function (err, data)  {
      if (err) throw err;
      var obj = JSON.parse(data);
      res.setHeader('Content-Type', 'application/json');
      res.status(200).end(JSON.stringify(obj));
    });
  }
  else{
      res.status(400).send("clinic_id does not exist, bad request dude");
  }
  return;
});
//server will continue run if error found
process.on('uncaughtException', function (err) {
  console.error(err);
  console.log("I am still running...");
});
var server = app.listen(3000, function () {
                        var port = server.address().port;
                        console.log('Server started at http://localhost:%s/', port);
                        });
