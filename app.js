var express = require('express')
  , http = require('http')
  , request = require('request')
  , xml2js  = require('xml2js')
  , app = express();


app.configure(function() {
  app.set('port', process.env.PORT || 3000);
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  return app.use(express.methodOverride());
});

app.configure('development', function() {
  return app.use(express.errorHandler());
});

http.createServer(app).listen(app.get('port'), function() {
  return console.log("Express server listening on port " + app.get('port'));
});

app.get('/', function(req, res) {
  var parser;
  parser = new xml2js.Parser(xml2js.defaults["0.1"]);
  parser.addListener('end', function(result) {
    return res.send(result);
  });
  return request('http://feeds.feedburner.com/hatena/b/hotentry', function(err, response, body) {
    if (!err && response.statusCode === 200) {
      try {
        return parser.parseString(body);
      } catch (e) {
        return console.log(e);
      }
    }
  });
});

