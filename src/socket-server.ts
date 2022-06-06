import { Channel } from '@prisma/client';
import { Server } from 'http';
import { Server as SocketServer } from 'socket.io';
import { Event } from '../shared/event';
import { Room } from '../shared/room';
import { MessageInfo } from '@graphql/types';
import { createMessage } from './services/message.service';

export const initSocketServer = (server: Server) => {
	const io = new SocketServer(server);

	io.on('connection', async (socket) => {
		await socket.join(Room.Messages);
		socket.on(Event.Message, async (msgInfo: MessageInfo) => {
			await createMessage(msgInfo);
			const sockets = await io.in(Room.Messages).fetchSockets();
			for (let s of sockets) s.emit(Event.Message, msgInfo);
		});
		socket.on(Event.JoinVoiceChat, async (channelId: number, peerId: string) => {
			const voiceChannelId = channelId.toString();
			await socket.join(voiceChannelId);
			const sockets = await io.in(voiceChannelId).fetchSockets();
			sockets
				.filter((s) => s.id != socket.id)
				.forEach((s) => s.emit(Event.JoinVoiceChat, channelId, peerId));
		});
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
