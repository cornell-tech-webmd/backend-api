
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require("fs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/create_user', function(req,res){
  var postBody = req.body;
  var user_id = postBody.user_id;
  console.log("new user created: " + user_id);
  var fs = require('fs');
  var dir = './user_file';
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }
  var file_name = dir + '/' + user_id + ".json";
  fs.writeFile(file_name, JSON.stringify(postBody), function (err) {
   if (err) return console.log(err);})
  return;
  });

app.post('/update_user', function(req,res){
  var postBody = req.body;
  var user_id = postBody.user_id;
  console.log("user updated: " + user_id);
  var file_name = './user_file/' + user_id + ".json";
  fs.writeFile(file_name, JSON.stringify(postBody), function (err) {
      if (err) return console.log(err);})
  return;
  });

app.get('/get_user',function(req,res){
  var user_id = req.body.user_id;
  console.log(user_id);
  var file_name = './user_file/' + user_id + ".json";
  console.log(file_name);
  fs.readFile(file_name, 'utf8',function (err, data)  {
    if (err) throw err;
    var obj = JSON.parse(data);
    console.log(obj);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(obj));
  });
  return;
});

app.post('/create_doc', function(req,res){
  var postBody = req.body;
  var doc_id = postBody.doc_id;
  console.log("New doctor created: " + doc_id);
  var fs = require('fs');
  var dir = './doc_file';
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }
  var file_name = dir + '/' + doc_id + ".json";
  fs.writeFile(file_name, JSON.stringify(postBody), function (err) {
   if (err) return console.log(err);})
  return;
  });

app.post('/update_doc', function(req,res){
  var postBody = req.body;
  var doc_id = postBody.doc_id;
  console.log("Doctor updated: " + doc_id);
  var file_name = './doc_file/' + doc_id + ".json";
  fs.writeFile(file_name, JSON.stringify(postBody), function (err) {
      if (err) return console.log(err);})
  return;
  });

app.get('/get_doc',function(req,res){
  var doc_id = req.body.doc_id;
  console.log(doc_id);
  var file_name = './doc_file/' + doc_id + ".json";
  console.log(file_name);
  fs.readFile(file_name, 'utf8',function (err, data)  {
    if (err) throw err;
    var obj = JSON.parse(data);
    console.log(obj);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(obj));
  });
  return;
});

app.post('/create_clinic', function(req,res){
  var postBody = req.body;
  var clinic_id = postBody.clinic_id;
  console.log("New clinic created: " + clinic_id);
  var fs = require('fs');
  var dir = './clinic_file';
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }
  var file_name = dir + '/' + clinic_id + ".json";
  fs.writeFile(file_name, JSON.stringify(postBody), function (err) {
   if (err) return console.log(err);})
  return;
  });

app.post('/update_clinic', function(req,res){
  var postBody = req.body;
  var clinic_id = postBody.clinic_id;
  console.log("Clinic updated: " + clinic_id);
  var file_name = './clinic_file/' + clinic_id + ".json";
  fs.writeFile(file_name, JSON.stringify(postBody), function (err) {
      if (err) return console.log(err);})
  return;
  });

app.get('/get_clinic',function(req,res){
  var clinic_id = req.body.clinic_id;
  console.log(clinic_id);
  var file_name = './clinic_file/' + clinic_id + ".json";
  console.log(file_name);
  fs.readFile(file_name, 'utf8',function (err, data)  {
    if (err) throw err;
    var obj = JSON.parse(data);
    console.log(obj);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(obj));
  });
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
