import Discord = require('discord.js');
import DiscordUser from './DiscordUser';
declare module IndexFunctions {
    function onReady(client: Discord.Client, discordUser: DiscordUser): Promise<void>;
    function onMessage(msg: Discord.Message, client: Discord.Client, discordUser: DiscordUser): Promise<void>;
    function onInteractionCreate(interaction: any, client: any, discordUser: DiscordUser): Promise<void>;
}
export default IndexFunctions;
