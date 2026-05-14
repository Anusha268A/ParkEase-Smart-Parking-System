var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');   // ✅ users (login/register)
var sampledataRouter = require('./routes/sample_data');
var bookingsRouter = require('./routes/bookings');
var parkingRouter = require('./routes/parking');
const cors = require('cors');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middleware
app.use('/webhook', express.raw({ type: 'application/json' }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ✅ serve frontend
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '../frontend')));

// ✅ enable CORS
app.use(cors({ credentials: true }));

// ================= ROUTES =================

// app.use('/', indexRouter);  // optional
app.use('/users', usersRouter);       // ✅ LOGIN & REGISTER HERE
app.use('/', sampledataRouter);
app.use('/bookings', bookingsRouter);
app.use('/parking', parkingRouter);
// ==========================================

// catch 404
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

// SERVER START
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
// 🔥 AUTO DELETE EXPIRED BOOKINGS
setInterval(() => {

    const now = new Date();

    db.query(
        "UPDATE bookings SET status='Expired' WHERE end_time < ?",
        [now],
        (err, result) => {

            if(err){
                console.log(err);
            } else {
                console.log("Expired updated:", result.affectedRows);
            }

        }
    );

}, 60000); // every 1 minute
const db = require('./database'); // or your DB file

