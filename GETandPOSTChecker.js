var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);

app.get('/', function(req, res){
  var getParameters = [];
  for (var p in req.query){
    getParameters.push({'name':p, 'value':req.query[p]})
  }
  var context = {"reqType": "GET"};
  context.recievedData = getParameters;
  res.render('requestTypeReturn', context);
});


app.post('/', function(req, res){
  var postParameters = [];
  for (var p in req.query){
    postParameters.push({'name':p, 'value':req.query[p]})
  }
  var context = {"reqType": "GET"};
  context.recievedData = postParameters;
  res.render('requestTypeReturn', context);
});


app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});