import type { Server } from 'http';
import { Server as SocketServer } from 'socket.io';
import { Event } from '$lib/event';
import { Room } from '$lib/room';
import { createMessage } from '$lib/services/message.service';

export const initSocketServer = (server: Server) => {
	const io = new SocketServer(server, {
		cors: {
			origin: 'http://localhost:3000',
			methods: ['GET', 'POST'],
			credentials: true,
		},
	});

	io.on('connection', async (socket) => {
		await socket.join(Room.Messages);
		socket.on(Event.Message, async (msgInfo: any) => {
			await createMessage(msgInfo);
			const sockets = await io.in(Room.Messages).fetchSockets();
			for (let s of sockets) s.emit(Event.Message, msgInfo);
		});
		socket.on(
			Event.JoinVoiceChat,
			async (channelId: number, peerId: string) => {
				const voiceChannelId = channelId.toString();
				await socket.join(voiceChannelId);
				const sockets = await io.in(voiceChannelId).fetchSockets();
				sockets
					.filter((s) => s.id != socket.id)
					.forEach((s) => s.emit(Event.JoinVoiceChat, channelId, peerId));
			},
		);
		socket.on(
			Event.LeaveVoiceChat,
			async (channelId: number, peerId: string) => {
				const voiceChannelId = channelId.toString();
				await socket.join(voiceChannelId);
				const sockets = await io.in(voiceChannelId).fetchSockets();
				sockets
					.filter((s) => s.id != socket.id)
					.forEach((s) => s.emit(Event.LeaveVoiceChat, channelId, peerId));
			},
		);
	});

	return io;
};
