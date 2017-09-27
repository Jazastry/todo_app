const io = require('socket.io-client');
const socket = io();

function subscribe(type, cb) {
  socket.on(type, (data) => cb(data))
}

function emit(type, data) {
	socket.emit(type, data)
}

export default { subscribe, emit }
