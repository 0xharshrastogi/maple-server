import debug from 'debug';
import Classroom from '../classes/SocketClassroom';
import SocketUser from '../classes/SocketUser';

const log = debug(`maple-server:Socket`);
const listeningFor = debug(`maple-server:Socket Event Listening`);
const emitted = debug(`maple-server:Socket Event Emitted`);

const listAllParticipants = (participants, user) =>
  participants.filter((participant) => participant.ID !== user.ID);
/**
 *
 * @param {import('../../node_modules/socket.io/dist/socket').Socket} socket
 * @param {import('../../node_modules/socket.io/dist/socket')} io
 * @param {SocketUser} user
 */
const handlers = (socket, io, user) => {
  const handleJoinRequest = ({ classID }) => {
    listeningFor('join classroom');

    try {
      if (!classID) throw new Error('Class ID not passed');

      let classroom = null;
      if (!Classroom.has(classID)) {
        classroom = new Classroom(classID);
        log(`New Classroom Created ${classID}`);
      } else {
        classroom = Classroom.get(classID);
      }

      socket.join(classID);
      user.class = classID;
      classroom.addParticipant(user);
      log(`User ${user.ID} joined classroom ${classID}`);
      log(`Users in classroom ${classID}: ${classroom.participants.length}`);

      socket.emit('users in room', listAllParticipants(classroom.participants, user));
      emitted('users in room');
    } catch (error) {
      console.log(error);
      user.emit('message', error.message);
    }
  };

  const handleSocketDisconnect = (reason) => {
    switch (reason) {
      case 'namespace disconnect': {
        console.log('The socket was forcefully disconnected with socket.disconnect');
      }

      case 'client namespace disconnect': {
        console.log('The client has manually disconnected the socket using socket.disconnect()');
      }
    }

    try {
      const classroom = Classroom.get(user.class);

      classroom.removeParticipant((participant) => participant.ID !== user.ID);
      log(`Users in classroom ${user.class}: ${classroom.participants.length}`);

      socket.to(user.class).emit('user disconnected', { ID: user.ID, classID: user.class });

      emitted(`Informing All Client In Room ${user.class} UserID ${user.ID} Disconnected`);
      if (classroom.participants.length === 0) {
        Classroom.remove(user.class);
        log(`Classroom ${user.class} Deleted`);
      }

      // inform other clients about disconnect;
    } catch (error) {
      console.error(error);
    }
  };

  const handleProvideSignal = ({ from, to, data }) => {
    listeningFor('provide signal');

    log(`Transfering signal from ${from} ---to---> ${to}`);
    emitted(`incoming signal to ${to}`);

    io.to(to).emit('incoming signal', { from, data });
  };

  const handleAcceptingSignal = ({ to, data }) => {
    listeningFor('accepting signal');
    log(`Accepting signal from ${user.ID} to ${to}`);
    io.to(to).emit('signal accepted', { from: user.ID, data });
  };

  return { handleJoinRequest, handleSocketDisconnect, handleProvideSignal, handleAcceptingSignal };
};

export default handlers;
