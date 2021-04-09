// removeobject.ts - Module for my "remove inventory object" command.
// Feb 7, 2021
// Chris M.
// https:/github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import FoundationClasses from '../FoundationClasses';
import DiscordUser from '../DiscordUser';
import GuildData from '../GuildData';
import GuildMemberData from '../GuildMemberData';
import HelperFunctions from '../HelperFunctions';

const command: FoundationClasses.BotCommand = {
	name: 'removeobject',
	description: "__**Remove Object Usage:**__ !removeobject = ITEMNAME/ROLENAME and optionally !removeobject = ITEMNAME/ROLENAME, @USERMENTION to remove from someone else's inventory!",
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
			const msgString = `------\n**Please enter an object name! (!removeobject = ITEMNAME/ROLENAME, @USERMENTION, or just !removeobject = ITEMNAME/ROLENAME)**\n------`;
			let msgEmbed = new Discord.MessageEmbed()
					.setAuthor((commandData.guildMember as Discord.GuildMember)?.user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
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

		const objectName = commandData.args[0];

		let userID = '';
		const userMentionRegExp = /.{2,3}\d{18}>/;
		const userIDRegExp = /\d{18}/;
		if (commandData.args[1] === undefined) {
			userID = commandData.guildMember!.id!;
		} else if (!userMentionRegExp.test(commandData.args[1]) && !userIDRegExp.test(commandData.args[1])) {
			const msgString = `------\n**Please enter a proper usermention argument, or leave it blank! (!removeobject = ITEMNAME/ROLENAME, @USERMENTION, or just !removeobject = ITEMNAME/ROLENAME)**\n------`;
			let msgEmbed = new Discord.MessageEmbed()
					.setAuthor((commandData.guildMember as Discord.GuildMember)?.user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
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
		} else {
			const argOne = commandData.args[1];
			const userIDOne = argOne.match(userIDRegExp)![0]!; 
			userID = userIDOne;
		}

		const targetMember = commandData.guild!.members.resolve(userID);

		if (targetMember === null) {
			const msgString = `------\n**Sorry, but that user could not be found!**\n------`;
			let msgEmbed = new Discord.MessageEmbed()
					.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
					.setColor(guildData.borderColor as [number, number, number])
					.setDescription(msgString)
					.setTimestamp(Date() as unknown as Date)
					.setTitle('__**User Issue:**__')
				let msg = await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
				if (commandData.toTextChannel instanceof Discord.WebhookClient) {
					msg = new Discord.Message(commandData.guild!.client, msg, commandData.fromTextChannel!);
				}
				await msg.delete({timeout: 20000});
			return commandReturnData;
		}

		const guildMemberData = new GuildMemberData({dataBase: discordUser.dataBase, id: commandData.guildMember!.id, guildId: commandData.guild!.id,
			userName: (commandData.guildMember as Discord.GuildMember)!.user.username, displayName: (commandData.guildMember as Discord.GuildMember).displayName});
		await guildMemberData.getFromDataBase();

		if (guildMemberData == null) {
			const msgString = `------\n**Sorry, but the specified user data could not be found!**\n------`;
			let msgEmbed = new Discord.MessageEmbed()
					.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
					.setColor(guildData.borderColor as [number, number, number])
					.setDescription(msgString)
					.setTimestamp(Date() as unknown as Date)
					.setTitle('__**User Issue:**__')
				let msg = await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
				if (commandData.toTextChannel instanceof Discord.WebhookClient) {
					msg = new Discord.Message(commandData.guild!.client, msg, commandData.fromTextChannel!);
				}
				await msg.delete({timeout: 20000});
			return commandReturnData;
		}

		let objectType = '';
		let isObjectFound = false;
		let roleID = '';

		for (let x = 0; x < guildMemberData.items.length; x += 1) {
			if (objectName === guildMemberData.items[x]!.itemName) {
				objectType = 'item';
				isObjectFound = true;
				guildMemberData.items.splice(x, 1);
				await guildMemberData.writeToDataBase();
			}
		}

		for (let x = 0; x < guildMemberData.roles.length; x += 1) {
			if (objectName === guildMemberData.roles[x]!.roleName) {
				objectType = 'role';
				isObjectFound = true;
				roleID = guildMemberData.roles[x]!.roleID;
				guildMemberData.roles.splice(x, 1);
				await guildMemberData.writeToDataBase();
			}
		}

		let msgString = '';
		const messageEmbed = new Discord.MessageEmbed();

		if (isObjectFound === false) {
			const msgString = `-------\n**Sorry, but the item was not found in the inventory!**\n------`;
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

		if (objectType === 'role') {
			const guildMemberRoleManager = new Discord.GuildMemberRoleManager(commandData.guildMember as Discord.GuildMember);
			guildMemberRoleManager.remove(roleID);
			msgString = `------\n**You've removed the following role from <@!${userID}>'s inventory:**\n------\n __**${objectName}**__\n------`;
			messageEmbed.setTitle('__**Role Removed:**__');
		} else if (objectType === 'item') {
			msgString = `------\n**You've removed the following item from <@!${userID}>'s inventory:**\n------\n __**${objectName}**__\n------`;
			messageEmbed.setTitle('__**Item Removed:**__');
		}

		messageEmbed.setTimestamp(Date.now()).setDescription(msgString)
			.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!).setColor([255, 0, 0]);
		await HelperFunctions.sendMessageWithCorrectChannel(commandData, messageEmbed);
		return commandReturnData;
	} catch (error) {
		return new Promise((resolve, reject) => {
			reject(error);
		});
	}
}
command.function = execute;
export default command as FoundationClasses.BotCommand;
