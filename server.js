require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const createError = require('http-errors');
const db = require('./db/DBConnection');

//

const userRoute = require('./routes/userRoute');
const constituencyRoute = require('./routes/constituencyRoute');
const parliamentarianRoute = require('./routes/parliamentarianRoute');
const partyRoute = require('./routes/partyRoute');
const pollingStationRoute = require('./routes/pollingStationRoute');
const presidentRoute = require('./routes/presidentRoute');

// initialize express
const app = express();

// server port
const port = process.env.PORT || 8000;

// middlewares
app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV !== 'production') {
  app.use(logger('dev'));
}
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true, maxAge: 1 * 60 * 60 * 1000, httpOnly: true },
  })
);

// static path
 app.use(express.static(path.join(__dirname, "public")));
app.use('/images', express.static(path.join(__dirname, 'images')));

//  routes
app.use('/parties', partyRoute);
app.use('/users', userRoute);
app.use('/constituencies', constituencyRoute);
app.use('/parliamentarians', parliamentarianRoute);
app.use('/polling-stations', pollingStationRoute);
app.use('/presidents', presidentRoute);


app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

//  error handlers
app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

db.asPromise()
  .then(() => {
    app.listen(port, () => console.log(`listening on port ${port}!`));
  })
  .catch((error) => {
    // console.log(error);
    throw error;
  });
