// Index.ts - The main entry point for my Discord Bot!
// Jan 28, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import IndexFunctions from './IndexFunctions';
import DiscordUser from './DiscordUser';
import config = require('./config.json');

const discordUser = new DiscordUser();
const client = new Discord.Client() as any;

client.once('ready', async () => {
	IndexFunctions.onReady(client, discordUser);
});

client.on('message', async (msg: Discord.Message) => {
	IndexFunctions.onMessage(msg, client, discordUser);
});

client.ws.on('INTERACTION_CREATE', async (interaction: any) => {
	IndexFunctions.onInteractionCreate(interaction, client, discordUser);
});

client.login(config.botToken);
