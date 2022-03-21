// gamehouseoptions.ts - Module for my "gamehouse options" command.
// Mar 14, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import FoundationClasses from '../FoundationClasses';
import DiscordUser from '../DiscordUser';
import GuildData from '../GuildData';
import HelperFunctions from '../HelperFunctions';

const command:FoundationClasses.BotCommand = {
	name: 'gamehouseoptions',
	description: '__**GameHouse Options Usage:**__ !gamehouseoptions.',
	function: Function()
};

async function execute(commandData: FoundationClasses.CommandData, discordUser: DiscordUser): Promise<FoundationClasses.CommandReturnData> {
	try {
		const commandReturnData: FoundationClasses.CommandReturnData = {
			commandName: command.name
		};
		
		const areWeInADM = await HelperFunctions.areWeInADM(commandData);

		if (areWeInADM === true) {
			return commandReturnData;
		}

		const doWeHaveAdminPerms = await HelperFunctions.doWeHaveAdminPermission(commandData, discordUser);

		if (doWeHaveAdminPerms === false) {
			return commandReturnData;
		}

		const guildData = new GuildData({dataBase: discordUser.dataBase, id: commandData.guild!.id, memberCount: commandData.guild!.memberCount, name: commandData.guild!.name});
		await guildData.getFromDataBase();

		const msgEmbed = new Discord.MessageEmbed();
		msgEmbed
			.setAuthor(((commandData.guildMember as Discord.GuildMember).client.user as Discord.User).username, ((commandData.guildMember as Discord.GuildMember).client.user!)
			.avatarURL() as string)
			.setTimestamp(Date.now())
			.setTitle('__**GameHouse Options:**__')
			.setColor(guildData.borderColor as [number, number, number])
			.setDescription("**Enter '!help = COMMANDNAME to get instructions for each option!**");

		const fields = [];
		let resultIcon = '❌';
		if (guildData.guildShop.items.length > 0) {
			resultIcon = '✅';
		}
		const shopItemsField = { name: '__**Shop Items:**__', value: `__Active:__ ${resultIcon}\n__Command(s):__ '!addshopitem', '!removeshopitem'`, inline: true };
		fields.push(shopItemsField);

		resultIcon = '❌';
		if (guildData.guildShop.roles.length > 0) {
			resultIcon = '✅';
		}
		const shopRolesField = { name: '__**Shop Roles:**__', value: `__Active:__ ${resultIcon}\n__Command(s):__ '!addshoprole', '!removeshoprole'`, inline: true };
		fields.push(shopRolesField);

		resultIcon = '❌';
		if (guildData.gameChannelIDs.length > 0) {
			resultIcon = '✅';
		}
		const gameChannelsField = { name: '__**Restricted Game Activity To Specific Channels:**__', value: `__Active:__ ${resultIcon}\n__Command(s):__ '!setgamechannel'`, inline: true };
		fields.push(gameChannelsField);

		msgEmbed.fields = fields;
		await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
		return commandReturnData;
	} catch (error) {
		return new Promise((resolve, reject) => {
			reject(error);
		});
	}
}
command.function = execute;
export default command as FoundationClasses.BotCommand;
