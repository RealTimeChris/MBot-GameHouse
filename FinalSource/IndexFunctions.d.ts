/// <reference types="node" />
import Discord = require('discord.js');
import EventEmitter from 'events';
import DiscordUser from './DiscordUser';
declare module IndexFunctions {
    function onHeartBeat(client: Discord.Client, discordUser: DiscordUser): Promise<void>;
    function onReady(client: Discord.Client, discordUser: DiscordUser, eventEmitter: EventEmitter): Promise<void>;
    function onMessage(msg: Discord.Message, client: Discord.Client, discordUser: DiscordUser): Promise<void>;
    function onInteractionCreate(interaction: any, client: any, discordUser: DiscordUser): Promise<void>;
}
export default IndexFunctions;
