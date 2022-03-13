import debug from 'debug';

const socketLog = debug('maple-server:SocketIO');

class ActiveClassroom {
  constructor(config) {
    this.classID = config.classID;
    this.participants = [];
  }

  addParticipant(data) {
    this.participants.push(data);
  }

  removeParticipant(socketID) {
    const participants = this.participants.filter((data) => data.sockedID != socketID);
    this.participants = participants;
  }

  isEmpty() {
    return this.participants.length === 0;
  }

  static store = new Map();

  static isActive(classID) {
    return ActiveClassroom.store.has(classID);
  }

  static create(config) {
    const classroom = new ActiveClassroom(config);
    ActiveClassroom.store.set(classroom.classID, classroom);
  }

  /**
   *
   * @param {*} classID
   * @returns {ActiveClassroom}
   */
  static get(classID) {
    return ActiveClassroom.store.get(classID);
  }

  static remove(classID) {
    ActiveClassroom.store.delete(classID);
  }

  static countActiveClassrooms() {
    return ActiveClassroom.store.size;
  }
}

//______________-------_____________-----------____________
/**
 * @param {import('../../node_modules/socket.io/dist/socket').Socket} socket
 */
const setup = (socket) => {
  const logMe = (message) => socket.emit('client log', message);
  const logExecptMe = (message) =>
    socket.broadcast.to(socket.data.classID).emit('client log', message);

  const logAll = (message) => {
    logMe(message);
    logExecptMe(message);
  };

  socket.on('join class', ({ classID, userID }) => {
    if (!ActiveClassroom.isActive(classID)) {
      logMe({ message: 'New Classroom Created Successfully' });
      ActiveClassroom.create({ classID });
    }

    // enroll to socket to room;
    socket.join(classID);
    socket.data['classID'] = classID;

    const classroom = ActiveClassroom.get(classID);
    classroom.addParticipant({ userID, sockedID: socket.id });
    logExecptMe({ message: 'New User Joined' });
  });

  socket.on('ClassroomInfo', ({ classID }) => {
    console.log({ class: ActiveClassroom.get(classID) });
    try {
      logMe({
        message: `${classID} Info`,
        class: ActiveClassroom.get(classID),
        socketInfo: socket.data,
      });
    } catch (error) {
      socket.emit('client log', error);
    }
  });

  socket.on('disconnect', (reason) => {
    const classroom = ActiveClassroom.get(socket.data.classID);
    classroom.removeParticipant(socket.id);

    if (classroom.isEmpty()) {
      ActiveClassroom.remove(classroom.classID);
      console.log(ActiveClassroom.countActiveClassrooms());
    }
    logAll('User Dissconnected');
  });
};
export default setup;
