// server.js
// where your node app starts

// init project
const express = require('express')
const app = express()
const multer = require('multer');
const bodyParser = require('body-parser');
let size = "";
let sizeObj = {};
let url = "";
// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))
app.use(bodyParser.json());

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + '/views/index.html')
});

var storage = multer.diskStorage({
  destination : function(req, file, cb){
    cb(null, "./my-upl");
  },
  filename : function (req, file, cb){
    cb(null, file.originalname);
  }
});

var upload = multer({storage : storage}).single('fileUploaded');

app.post("/get-file-size", (req, res, next) =>{
  upload(req, res, function(err) {
    if (err){
      return res.send(err);
    }else{
      size = req.file.size;
      sizeObj.size = size;
      url = req.protocol + '://' + req.get('host') + req.originalUrl;
      res.send({ redirect: url });
    }
  });
});

app.get("/get-file-size", (req, res) => {
  res.sendFile(__dirname + '/views/file-size.html', (err)=> {
    if (err){
      res.send(err);
    }else{
      res.setHeader("Content-Type", "text/html")
      res.json(sizeObj);
    }
  });
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`)
})
