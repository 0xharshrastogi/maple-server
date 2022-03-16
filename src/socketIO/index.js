import { debug } from 'debug';
import SocketUser from '../classes/SocketUser';
import SocketHandlers from './handleSocket';

const log = debug(`maple-server:Socket`);
const listeningFor = debug(`maple-server:Listening`);

const emit = {};
const listen = {};
let count = 0;
/**
 * @param {import('../../node_modules/socket.io/dist/socket').Socket} socket
 */
const setup = (socket, io) => {
  const user = new SocketUser(socket, io);
  const handlers = SocketHandlers(socket, io, user);
  count += 1;

  log('New User Joined');
  log(`Total Number Socket Connected ${count}`);

  io.emit('message', `No Of Users Connected ${count}`);
  socket.on('join classroom', handlers.handleJoinRequest);
  socket.on('provide signal', handlers.handleProvideSignal);
  socket.on('accepting signal', handlers.handleAcceptingSignal);
  socket.on('disconnect', (reason) => {
    count--;
    log('Socket Disconnected');
    log(`Total Number Socket Connected ${count}`);

    handlers.handleSocketDisconnect(reason);
  });
};
export default setup;
