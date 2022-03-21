// Index.ts - The main entry point for my Discord Bot!
// Jan 28, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import EventEmitter from 'events';
import IndexFunctions from './IndexFunctions';
import DiscordUser from './DiscordUser';
import config = require('./config.json');

const discordUser = new DiscordUser();
const client = new Discord.Client() as any;
const eventEmitter = new EventEmitter();

eventEmitter.on('HeartBeat', async () => {
	console.log('HeartBeat emitted and captured!');
	setTimeout(() => {
		eventEmitter.emit('HeartBeat');
	}, 60000);
	await IndexFunctions.onHeartBeat(client, discordUser);
});

client.once('ready', async () => {
	await IndexFunctions.onReady(client, discordUser, eventEmitter);
});

client.on('message', async (msg: Discord.Message) => {
	await IndexFunctions.onMessage(msg, client, discordUser);
});

client.ws.on('INTERACTION_CREATE', async (interaction: any) => {
	await IndexFunctions.onInteractionCreate(interaction, client, discordUser);
});

client.login(config.botToken);
