var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql');
var bodyParser = require('body-parser');

var app = express();

const connection = mysql.createConnection({

  username: 'b2942e827778c7',
  password: '909cfe16',
  host: 'us-cdbr-iron-east-01.cleardb.net',
  database: 'heroku_82cceefae4296cc'
  /*
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'events-cms' */
});

connection.connect(function (err) {
  (err) ? console.log(err + '\n+++++++++++/////') : console.log('connection ******');
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Serving the static files
app.use(express.static(path.join(__dirname, 'client/build')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

require('./api/events')(app, connection);
require('./api/users')(app, connection);
require('./api/about')(app, connection);
require('./api/partners')(app, connection);
require('./api/payment')(app, connection);
require('./api/messages')(app, connection);
require('./api/bookings')(app, connection);
require('./api/maillist')(app, connection);

// Catch all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);