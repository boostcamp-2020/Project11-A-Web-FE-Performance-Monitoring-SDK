// All controllers should live here
const express = require('express');
const { init, errorHandler } = require('@santry/node');

const app = express();
const dsn = '[token]@[url]';

init(dsn, {
  traceSampleRate: 1,
  release: 'santry@0.0.1',
  environment: 'production',
});

app.get('/', function rootHandler(req, res) {
  res.end('Hello world!');
});

app.get('/debug-santry', function mainHandler(req, res) {
  throw new Error('My second Santry error get!');
});

app.post('/debug-santry', function mainHandler(req, res) {
  throw new Error('My second Santry error post!');
});
// The error handler must be before any other error middleware and after all controllers
app.use(errorHandler());
// Optional fallthrough error handler
app.use(function onError(err, req, res, next) {
  res.statusCode = 500;
  res.end('good santry!');
});

app.listen(3000);
