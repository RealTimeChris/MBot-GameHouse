// removeshopitem.ts - Module for my command to remove a shop item.
// Feb 6, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import FoundationClasses from '../FoundationClasses';
import DiscordUser from '../DiscordUser';
import GuildData from '../GuildData';
import HelperFunctions from '../HelperFunctions';

const command: FoundationClasses.BotCommand = {
	name: 'removeshopitem',
	description: '__**Remove Stop Item Usage**__: !removeshopitem = ITEMNAME',
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

		const doWeHaveAdminPermission = await HelperFunctions.doWeHaveAdminPermission(commandData, discordUser);

		if (doWeHaveAdminPermission === false) {
			return commandReturnData;
		}

		const guildData = new GuildData({dataBase: discordUser.dataBase, id: commandData.guild!.id, memberCount: commandData.guild!.memberCount, name: commandData.guild!.name});
		await guildData.getFromDataBase();

		if (commandData.args[0] === undefined) {
			const msgString = `------\n**Please enter an item name! (!removeshopitem = ITEMNAME)**\n------`;
			let msgEmbed = new Discord.MessageEmbed()
					.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
					.setColor(guildData.borderColor as [number, number, number])
					.setDescription(msgString)
					.setTimestamp(Date() as unknown as Date)
					.setTitle('__**Missing Or Invalid Arguments:**__')
				let msg = await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
				if (commandData.toTextChannel instanceof Discord.WebhookClient) {
					msg = new Discord.Message(commandData.guild!.client, msg, commandData.fromTextChannel!);
				}
				await msg.delete({timeout: 20000});
			return commandReturnData;
		}

		const itemName = commandData.args[0];

		let itemIndex = 0;
		let itemFound = false;
		for (let x = 0; x < guildData.guildShop.items.length; x += 1) {
			if (itemName === guildData.guildShop.items[x]!.itemName) {
				itemIndex = x;
				itemFound = true;
				break;
			}
		}

		if (itemFound === false) {
			const msgString = `------\n**Sorry, but that item was not found in the shop's inventory!**\n------`;
			let msgEmbed = new Discord.MessageEmbed()
					.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
					.setColor(guildData.borderColor as [number, number, number])
					.setDescription(msgString)
					.setTimestamp(Date() as unknown as Date)
					.setTitle('__**Item Issue:**__')
				let msg = await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
				if (commandData.toTextChannel instanceof Discord.WebhookClient) {
					msg = new Discord.Message(commandData.guild!.client, msg, commandData.fromTextChannel!);
				}
				await msg.delete({timeout: 20000});
			return commandReturnData;
		}

		let msgString = '';

		msgString = `"Alrighty then! You've removed an item from the shop!\n------\n"
						+ '__The removed item:__ '${guildData.guildShop.items[itemIndex]!.emoji} ${guildData.guildShop.items[itemIndex]!.itemName}\n------`;

		guildData.guildShop.items.splice(itemIndex, 1);
		await guildData.writeToDataBase();

		const msgEmbed = new Discord.MessageEmbed();
		msgEmbed
			.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
			.setTimestamp(Date.now())
			.setTitle('__**Shop Item Removed:**__')
			.setDescription(msgString)
			.setColor([255, 0, 0]);
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
