import cors from 'cors';
import express from 'express';
import { createServer } from 'http';
import createError from 'http-errors';
import morgan from 'morgan';
import path from 'path';
import { Server } from 'socket.io';
import indexRouter from './routes';
import handleSocket from './socketIO/';

var app = express();
const httpServer = createServer(app);
const socketserver = new Server(httpServer, {
  cors: {
    origin: '*',
    credentials: true,
  },
});

// console.log('to' in socketserver.of('/video-stream'));
socketserver.of('/video-stream').on('connection', (socket) => {
  handleSocket(socket, socketserver.of('/video-stream'));
});
// view engine setup
app.use(morgan('dev'));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use(indexRouter);

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
});

export default httpServer;
