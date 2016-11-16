
var express = require('express');
var app = express();
var router = express.Router();
var path = __dirname + '/views/';
var bodyParser = require('body-parser');
var fs = require("fs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});

router.get("/",function(req,res){
  res.sendFile(path + "index.html");
});

router.get("/about",function(req,res){
  res.sendFile(path + "about.html");
});

router.get("/contact",function(req,res){
  res.sendFile(path + "contact.html");
});

app.use("/",router);

//app.use("*",function(req,res){
//  res.sendFile(path + "404.html");
//});

function getFiles (dir, files_){
    files_ = files_ || [];
    var files = fs.readdirSync(dir);
    for (var i in files){
        var name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()){
            getFiles(name, files_);
        } else {
            files_.push(name);
        }
    }
    return files_;
}

app.post('/create_user', function(req,res){
  var postBody = req.body;
  var email_address = postBody.email_address;
  // console.log(email_address);
  var fs = require('fs');
  var dir = './user_file';
  var max_id = 0;
  // check if the directory exists
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }
  // read the dirctory files and get the max user_id
  var filenames = getFiles(dir);
  for(var i = 0; i < filenames.length; i++){
    var temp_id = filenames[i].match(/\d/g);
    if(temp_id != null){
      // join those numbers
      temp_id = temp_id.join("");
      temp_id = parseInt(temp_id);
      console.log(temp_id);
    }
    if(temp_id > max_id){
      max_id = temp_id;
    }
  }
  // increment the user_id by one
  var user_id = max_id + 1;
  var file_name = dir + '/' + user_id + ".json";
  postBody.user_id = user_id;
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

app.post('/add_appointment',function(req,res){
  var postBody = req.body;
  var user_id = postBody.user_id;
  var doctor_id = postBody.doctor_id;
  var file_name = './user_file/' + user_id + ".json";
  if (fs.existsSync(file_name)){
    fs.readFile(file_name, 'utf8',function (err, data)  {
      if (err) throw err;
      var obj = JSON.parse(data);
      obj.in_appointment_with = doctor_id;
      console.log(obj);
      // res.setHeader('Content-Type', 'application/json');
      // res.send(JSON.stringify(obj));
    });
  }
  else{
    res.status(400).send('user does not exist!');
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


app.get('/get_insurances',function(req,res){
  var list_insurance = ['Unitedhealth Group',
  'Wellpoint Inc. Group', 'Kaiser Foundation Group',
   'Humana Group', 'Aetna Group',
    'HCSC Group', 'Cigna Health Group',
    'Highmark Group', 'Coventry Corp. Group',
    'HIP Insurance Group',
    'Independence Blue Cross Group', 'Blue Cross Blue Shield of New Jersey Group',
    'Blue Cross Blue Shield of Michigan Group',
    'California Physicians Service', 'Blue Cross Blue Shield of Florida Group',
    'Health Net of California, Inc.', 'Centene Corp. Group',
    'Carefirst Inc. Group', 'Wellcare Group',
    'Blue Cross Blue Shield of Massachusetts Group', 'UHC of California',
     'Lifetime Healthcare Group', 'Cambia Health Solutions Inc.', 'Metropolitan Group',
     'Molina Healthcare Inc. Group'];
     res.status(200).end(JSON.stringify(list_insurance));
     return;
});

//server will continue run if error found
process.on('uncaughtException', function (err) {
  console.error(err);
  console.log("I am still running...");
});

var port = process.env.PORT || 3000;
var server = app.listen(port, function () {
  console.log('Server started at http://localhost:%s/', port);
});