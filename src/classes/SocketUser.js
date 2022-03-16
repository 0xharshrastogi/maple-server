class SocketUser {
  /**
   * @param {import('../../node_modules/socket.io/dist/socket').Socket} socket
   */
  constructor(socket, io) {
    this.socket = socket;
    this.io = io;
    this.class = null;
  }

  get ID() {
    return this.socket.id;
  }

  emit(emitterfor, ...args) {
    this.socket.emit(emitterfor, ...args);
  }

  emitToClass(emitterfor, ...args) {
    this.socket.broadcast.to(this.class).emit(emitterfor, ...args);
  }

  joinClassroom(classID) {
    this.class = classID;
    this.socket.join(classID);
  }

  addListener(listenerfor, handler) {
    this.socket.on(listenerfor, handler);
  }

  /**
   *
   * @param {import('../../node_modules/socket.io/dist/socket')} io
   */
  emitTo(socketID) {
    return this.io.to(socketID);
  }

  toJSON() {
    return { class: this.class, ID: this.ID };
  }
}

export default SocketUser;
