var mongoose = require('mongoose');
var gracefulShutdown;
var dbURI = 'mongodb://127.0.0.1:27017/ThutoQuizs?authSource=admin';
// if (process.env.NODE_ENV === 'production') {
//   dbURI = process.env.MONGOLAB_URI;
// }

mongoose.connect(dbURI, {
  autoIndex: true,
  useCreateIndex: true,
});

// CONNECTION EVENTS
mongoose.connection.on('connected', function() {
  console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', function(err) {
  console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function() {
  console.log('Mongoose disconnected');
});

// CAPTURE APP TERMINATION / RESTART EVENTS
// To be called when process is restarted or terminated
gracefulShutdown = function(msg, callback) {
  mongoose.connection.close(function() {
    console.log('Mongoose disconnected through ' + msg);
    callback();
  });
};
// For nodemon restarts
process.once('SIGUSR2', function() {
  gracefulShutdown('nodemon restart', function() {
    process.kill(process.pid, 'SIGUSR2');
  });
});
// For app termination
process.on('SIGINT', function() {
  gracefulShutdown('app termination', function() {
    process.exit(0);
  });
});
// For Heroku app termination
// process.on('SIGTERM', function() {
//   gracefulShutdown('Heroku app termination', function() {
//     process.exit(0);
//   });
// });

// BRING IN YOUR SCHEMAS & MODELS
require('../models/User');
require('../models/Quiz');
require('../models/Challenge');