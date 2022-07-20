let express = require('express');
let app = express();
require('dotenv'). config();

app.use(function(request, response, next) {
    let method = request.method;
    let path = request.path;
    let ip = request.ip;
    console.log(method + " " + path + " - " + ip); 
    next();
  })

const absPath = __dirname + '/views/index.html';
app.get('/', function(request, response){
    response.sendFile(absPath);
})

const absPublicPath = __dirname + '/public';
app.use('/public',express.static(absPublicPath));

app.get('/json', function(request, response) {
   let messageValue = "Hello json";

    if(process.env.MESSAGE_STYLE==="uppercase"){
        response.json({"message": messageValue.toUpperCase()});
    }
    else{
        response.json({"message": messageValue});
    }
})

app.get('/now', function (request, response, next) {
    request.time = new Date().toString();
    next();
  }, function (request, response) {
    response.json({time: request.time});
  })

  app.get('/:word/echo', function (request, response) {
    var bigWord = request.params.word;
    response.json({echo: bigWord});
  })
  
  app.get("/name", function (request, response) {
    var firstName = request.query.first;
    var lastName = request.query.last;
    
    response.json({name: `${firstName} ${lastName}`});
  })
  
  app.use(bodyParser.urlencoded({extended: false}));
  
  app.post("/name", function (req, res) {
    var firstName = req.body.first;
    var lastName = req.body.last;
    
    res.json({name: `${firstName} ${lastName}`});
    console.log(req.body)
  })

































 module.exports = app;
