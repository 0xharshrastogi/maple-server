import debug from 'debug';

const socketLog = debug('maple-server:SocketIO');

const handleNewUserConnection = (user) => {
  console.log(user);
};
//______________-------_____________-----------____________
/**
 * @param {import('../../node_modules/socket.io/dist/socket').Socket} socket
 */
const setup = (socket) => {
  socketLog('New Socket Connected Successfully');

  socket.on('@user/new', handleNewUserConnection);
  socket.emit('ping', ['hello']);
};
export default setup;
