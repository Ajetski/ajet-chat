import { joinVoice, leaveVoice } from './lib/services/users.service';
import { getChannelById } from './lib/services/channel.service';
import type { Server } from 'http';
import { Server as SocketServer } from 'socket.io';

import { Event } from '$lib/event';
import { Room } from '$lib/room';
import { createMessage } from '$lib/services/message.service';
import type { Prisma } from '@prisma/client';

export const initSocketServer = (server: Server) => {
	const io = new SocketServer(server, {
		cors: {
			origin: [
				'https://studio.apollographql.com',
				'https://ajet-chat-dev.herokuapp.com',
				'http://localhost:8080',
				'http://localhost:3000',
			],
			methods: ['GET', 'POST'],
			credentials: true,
		},
	});

	io.on('connection', async (socket) => {
		console.log('connecting...');
		await socket.join(Room.Messages);
		console.log('connected!');
		socket.on(Event.Message, async (msgInfo: Prisma.MessageCreateInput) => {
			console.log(msgInfo);
			const res = await createMessage(msgInfo);
			const sockets = await io.in(Room.Messages).fetchSockets();
			for (let s of sockets) s.emit(Event.Message, res);
		});
		socket.on(
			Event.JoinVoiceChat,
			async (userId: number, channelId: number, peerId: string) => {
				const voiceChannelId = channelId.toString();
				const sockets = await io.fetchSockets();
				await joinVoice(userId, channelId);
				const channel = await getChannelById(channelId);
				sockets.forEach(async (s) =>
					s.emit(Event.JoinVoiceChat, channel, peerId),
				);
			},
		);
		socket.on(
			Event.LeaveVoiceChat,
			async (userId: number, channelId: number, peerId: string) => {
				const voiceChannelId = channelId.toString();
				const sockets = await io.fetchSockets();
				await leaveVoice(userId);
				const channel = await getChannelById(channelId);
				sockets.forEach(async (s) =>
					s.emit(Event.LeaveVoiceChat, channel, peerId),
				);
			},
		);
	});

	return io;
};
