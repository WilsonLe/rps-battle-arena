const { v4: uuidv4 } = require('uuid');
const startFinding = (io, socket, queue, games) => {
	console.log(`${socket.id} started game`);
	if (queue.includes(socket.id)) return;
	queue.push(socket.id);

	if (queue.length > 1) {
		p1Id = queue.splice(0, 1)[0];
		p2Id = queue.splice(0, 1)[0];
		gameId = uuidv4();
		games.push({
			p1Id,
			p2Id,
			gameId,
			p1Score: 0,
			p2Score: 0,
		});
		io.to(p1Id).to(p2Id).emit('matchFound');
	}
	console.log('queue: ', queue);
	console.log('game: ', games);
};

module.exports = startFinding;
