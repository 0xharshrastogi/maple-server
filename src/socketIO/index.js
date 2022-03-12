import debug from 'debug';

const socketLog = debug('maple-server:SocketIO');

const handleNewRegistration = () => {};

const ClassIDRooms = new Map();
let countPeers = 0;

//______________-------_____________-----------____________
/**
 * @param {import('../../node_modules/socket.io/dist/socket').Socket} socket
 */
const setup = (socket) => {
  socket.on('join.classroom', ({ classID, userID }) => {
    console.log(classID, userID);
    socket.join(classID);
    socket.broadcast.to(classID).emit('NewUserConnected', userID);
  });
};
export default setup;
