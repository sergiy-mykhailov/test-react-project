
// import { URLSearchParams } from 'url';
import express from 'express';
import http from 'http';
import cors from 'cors';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { PORT, CORS } from './constants';
import api from './api';

const app = express();

// app.use(favicon(path.join(__dirname, 'build', 'favicon.png')));
// app.use(favicon('build/public/favicon.png'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// app.use(express.static(path.join(__dirname, 'build')));
app.use(express.static('build'));

// server.get(/\/?.*/, restify.plugins.serveStatic({
//     directory: './build/public',
//     default: 'index.html'
// }))

// CORS
if (CORS && CORS.enabled) {
  app.use(cors(CORS));
}

app.use('/api', api);
// app.use(handleRender);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    console.error('err', err);
    res.status(err.status || 500);
    res.json(err);
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  console.error('err', err);
  res.status(err.status || 500);
  res.json(err);
});

// Get port from environment and store in Express.
const port = normalizePort(process.env.PORT || PORT);
app.set('port', port);

// Create HTTP server.
const server = http.createServer(app);

// Listen on provided port, on all network interfaces.
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

// Normalize a port into a number, string, or false.
function normalizePort(val) {
  const normPort = parseInt(val, 10);

  if (isNaN(normPort)) {
    // named pipe
    return val;
  }

  if (normPort >= 0) {
    // port number
    return normPort;
  }

  return false;
}

// Event listener for HTTP server "error" event.
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? `Pipe ${port}`
    : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

// Event listener for HTTP server "listening" event.
function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? `pipe ${addr}`
    : `port ${addr.port}`;

  console.info(`Server listening on ${bind}`);
}
