var express = require('./express');
var config = require('./config');
var http = require('http');

//create app
var app = express();

//set routes
var index = require('./routes/index');
require('./routes/error')(app); // attach error handler
app.use('/', index);

//start server
var server = http.createServer(app);
server.listen(config.port, config.ip, function () {
  console.log('Santy-Express server listening on %d, in %s mode', config.port, app.get('env'));
});