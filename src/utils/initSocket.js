const initSocket = (io) => {
	let queue = [];
	let games = [];

	io.on('connection', (socket) => {
		/* socket object may be used to send specific messages to the new connected client */
		console.log(`${socket.id} connected`);
		socket.on('startFinding', () =>
			require('../controllers/startFinding')(io, socket, queue, games)
		);
		socket.on('stopFinding', () => {});
		socket.on('disconnect', () => console.log(`${socket.id} disconnected`));
	});
};

module.exports = initSocket;
