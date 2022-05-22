import { Server } from 'http';
import { Server as SocketServer } from 'socket.io';
import { Event } from '../shared/event';
import { Room } from '../shared/room';

export const initSocketServer = (server: Server) => {
	const io = new SocketServer(server);

	io.on('connection', async (socket) => {
		await socket.join(Room.Messages);
		socket.on(Event.Message, async (data) => {
			const sockets = await io.in(Room.Messages).fetchSockets();
			for (let s of sockets)
				s.emit(Event.Message, data);
		});
	});

	return io;
};
