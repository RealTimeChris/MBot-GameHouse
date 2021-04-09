// displayguildsdata.ts - Module for my displayguildsdata command.
// Jan 30, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import FoundationClasses from '../FoundationClasses';
import DiscordUser from '../DiscordUser';
import GuildData from '../GuildData';
import HelperFunctions from '../HelperFunctions';

const command: FoundationClasses.BotCommand = {
	name: 'displayguildsdata',
	description: '!displayguildsdata = BOTNAME, to display the guild info of the bots in chat!',
	function: Function()
};

/**
 * Displays all of the data for all of the guilds, either in console or in chat.
 */
async function execute(commandData : FoundationClasses.CommandData, discordUser: DiscordUser): Promise<FoundationClasses.CommandReturnData> {
	try {
		const commandReturnData: FoundationClasses.CommandReturnData = {
			commandName: command.name
		};

		if (commandData.args[0]?.toLowerCase() !== 'janny' && commandData.args[0]?.toLowerCase() !== 'musichouse' && commandData.args[0]?.toLowerCase() !== 'gamehouse') {
			const msgString = '------\n**Please, enter the name of a bot as the first argument! (!displayguildsdata = BOTNAME)**\n------'
			const msgEmbed = new Discord.MessageEmbed();
			msgEmbed
				.setAuthor(discordUser.userData.userName, commandData.guildMember?.client.users.resolve(discordUser.userData.userID)?.avatarURL()!)
				.setColor([254, 254, 254])
				.setDescription(msgString)
				.setTimestamp(Date() as unknown as Date)
				.setTitle("__**Invalid Or Missing Arguments:**__")
			let msg = await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
			if (commandData.toTextChannel instanceof Discord.WebhookClient) {
				msg = new Discord.Message(commandData.guild!.client, msg, commandData.fromTextChannel!);
			}
			await msg.delete({timeout: 20000});
		}
		if (commandData.args[0]?.toLowerCase() !== 'gamehouse') {
			return commandReturnData;
		}

		let currentCount = 0;
		GuildData.guildsData.forEach(guild => {
			let msgString = '';
			msgString += `__Guild Name:__ ${guild.guildName}\n`;
			msgString += `__Guild ID:__ ${guild.id}\n`;
			msgString += `__Member Count:__ ${guild.memberCount}\n`;

			commandData.guildMember?.client.guilds.fetch(guild.id).then(guild => {
				msgString += `__Created:__ ${guild.createdAt}\n`;
				msgString += `__Guild Owner:__ <@!${guild.owner!.id}> (${guild.owner!.user.tag})\n`;
	
				const messageEmbed = new Discord.MessageEmbed()
					.setColor([254, 254, 254])
					.setThumbnail(guild.iconURL()!)
					.setTitle(`__**Guild Data ${currentCount + 1} of ${GuildData.guildsData.size}:**__`)
					.setTimestamp(Date() as unknown as Date)
					.setDescription(msgString);
					
					HelperFunctions.sendMessageWithCorrectChannel(commandData, messageEmbed);
				currentCount += 1;
			});			
		});

		return commandReturnData;
	} catch (error) {
		return new Promise((resolve, reject) => {
			reject(error);
		});
	}
}
command.function = execute;
export default command as FoundationClasses.BotCommand;
