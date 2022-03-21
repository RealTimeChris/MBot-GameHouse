// inventory.ts - Module for my "show inventory" command.
// Feb 7, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import FoundationClasses from '../FoundationClasses';
import DiscordUser from '../DiscordUser';
import GuildData from '../GuildData';
import GuildMemberData from '../GuildMemberData';
import HelperFunctions from '../HelperFunctions';

const command: FoundationClasses.BotCommand = {
	name: 'inventory',
	description: '__**Inventory Usage:**__ !inventory = @USERMENTION or !inventory',
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

		const areWeAllowed = await HelperFunctions.checkIfAllowedInChannel(commandData, discordUser);

		if (areWeAllowed === false) {
			return commandReturnData;
		}

		const guildData = new GuildData({dataBase: discordUser.dataBase, id: commandData.guild!.id, memberCount: commandData.guild!.memberCount, name: commandData.guild!.name});
		await guildData.getFromDataBase();
		let userID = '';

		if (!(commandData.fromTextChannel as Discord.TextChannel).permissionsFor(commandData.guild?.client.user as Discord.User)?.has('MANAGE_MESSAGES')) {
			const msgString = `------\n**I need the Manage Messages permission in this channel, for this command!**\n------`;
			let msgEmbed = new Discord.MessageEmbed()
				.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
				.setColor(guildData.borderColor as [number, number, number])
				.setDescription(msgString)
				.setTimestamp(Date() as unknown as Date)
				.setTitle('__**Permissions Issue:**__')
			let msg = await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
			if (commandData.toTextChannel instanceof Discord.WebhookClient) {
				msg = new Discord.Message(commandData.guild!.client, msg, commandData.fromTextChannel!);
			}
			await msg.delete({timeout: 20000});
			return commandReturnData;
		}

		const userIDRegExp = /.{2,3}\d{18}>/;
		const idRegExp = /\d{18}/;
		if (commandData.args[0] === undefined) {
			userID = commandData.guildMember!.id;
		} else if (!userIDRegExp.test(commandData.args[0]) && !idRegExp.test(commandData.args[0])) {
			const msgString = `------\n**Sorry, please enter a valid user mention or user ID! (!inventory = @USERMENTION, or just !inventory)**\n------`;
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
		} else {
			const argZero = commandData.args[0];
			const userIDOne = (argZero.match(idRegExp) as string[])[0] as string;
			userID = userIDOne;
		}

		const currentGuildMember = commandData.guild!.members.resolve(userID);

		if (currentGuildMember === null) {
			const msgString = `-------\n**Sorry, but that user could not be found!**\n------`;
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
				.setTitle('__**User Issue:**__');
			let msg = await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
			if (commandData.toTextChannel instanceof Discord.WebhookClient) {
				msg = new Discord.Message(commandData.guild!.client, msg, commandData.fromTextChannel!);
			}
			await msg.delete({timeout: 20000});
			return commandReturnData;
		}

		const { userName } = guildMemberData;

		const rolesArray = commandData.guild!.roles.cache.array().sort();

		for (let x = 0; x < guildMemberData.roles.length; x += 1) {
			let isRoleFound = false;
			for (let y = 0; y < rolesArray.length; y += 1) {
				if (guildMemberData.roles[x] === undefined) {
					continue;
				}
				if (guildMemberData.roles[x]!.roleID === rolesArray[y]!.id) {
					isRoleFound = true;
					break;
				}
			}
			if (isRoleFound === false) {
				const msgString = `Removing guild role ${(guildMemberData.roles[x] as FoundationClasses.InventoryRole).roleName} from user cache!`;
				let msgEmbed = new Discord.MessageEmbed()
					.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
					.setColor(guildData.borderColor as [number, number, number])
					.setDescription(msgString)
					.setTimestamp(Date() as unknown as Date)
					.setTitle('__**Role Issue:**__');
				let msg = await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
				if (commandData.toTextChannel instanceof Discord.WebhookClient) {
					msg = new Discord.Message(commandData.guild!.client, msg, commandData.fromTextChannel!);
				}
				await msg.delete({timeout: 20000});
				guildMemberData.roles.splice(x, 1);
				await guildMemberData.writeToDataBase();
			}
		}

		const itemsMsgString: string[] = [];
		itemsMsgString.length = 0;
		const itemsMessageEmbeds = [new Discord.MessageEmbed()];
		itemsMessageEmbeds.length = 0;
		let currentPage = 0;

		for (let x = 0; x < guildMemberData.items.length; x += 1) {
			itemsMsgString[x] = '';
			let itemsMsgStringTemp = '';
			itemsMsgStringTemp = `__**|Item:**__ ${guildMemberData.items[x]!.emoji}${guildMemberData.items[x]!.itemName
			}** |Value**: ${guildMemberData.items[x]!.itemCost} **|Self-Mod**: ${guildMemberData.items[x]!.selfMod} **|Opp-Mod**: ${
				guildMemberData.items[x]!.oppMod}\n`;
			if (itemsMsgStringTemp.length + itemsMsgString[currentPage]!.length >= 2048) {
				currentPage += 1;
				itemsMsgString.length += 1;
				itemsMessageEmbeds.length += 1;
			}
			itemsMessageEmbeds[currentPage] = new Discord.MessageEmbed();
			itemsMsgString[currentPage] += itemsMsgStringTemp;
		}

		const rolesMsgStrings: string[] = [];
		rolesMsgStrings.length = 0;
		const rolesMsgEmbeds = [new Discord.MessageEmbed()];
		rolesMsgEmbeds.length = 0;
		let currentPage2 = 0;

		for (let x = 0; x < guildMemberData.roles.length; x += 1) {
			rolesMsgStrings[x] = '';
			let rolesMsgStringTemp = '';
			rolesMsgStringTemp = `${'__**|Role: **__ <@&'}${guildMemberData.roles[x]!.roleID}> ** |Value: **${
				guildMemberData.roles[x]!.roleCost}\n`;
			if (rolesMsgStringTemp.length + rolesMsgStrings[currentPage2]!.length > 2048) {
				currentPage2 += 1;
				rolesMsgStrings.length += 1;
				rolesMsgEmbeds.length += 1;
			}
			rolesMsgEmbeds[currentPage2] = new Discord.MessageEmbed();
			rolesMsgStrings[currentPage2] += rolesMsgStringTemp;
		}

		for (let x = 0; x < itemsMessageEmbeds.length; x += 1) {
			itemsMessageEmbeds[x]!.setTimestamp(Date.now()).setTitle(`__**${userName}'s Inventory (Items) Page ${rolesMsgEmbeds.length + x + 1} of ${
				(itemsMessageEmbeds.length + rolesMsgEmbeds.length).toString()}**__:`).setDescription(itemsMsgString[x]).setColor(guildData.borderColor  as [number, number, number])
				.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!);
		}

		for (let x = 0; x < rolesMsgEmbeds.length; x += 1) {
			rolesMsgEmbeds[x]!.setTimestamp(Date.now()).setTitle(`__**${userName}'s Inventory (Roles) Page ${x + 1} of ${
				(itemsMessageEmbeds.length + rolesMsgEmbeds.length).toString()}**__:`).setDescription(rolesMsgStrings[x]).setColor(guildData.borderColor  as [number, number, number])
				.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!);
		}

		const finalMsgEmbedsArray = rolesMsgEmbeds.concat(itemsMessageEmbeds);

		if (rolesMsgEmbeds.length === 0 && itemsMessageEmbeds.length === 0) {
			let msgString = '';
			msgString = `Sorry, but the specified user, (<@!${userID}>) has no inventory!`;
			const messageEmbed = new Discord.MessageEmbed();
			messageEmbed.setDescription(msgString).setTimestamp(Date.now()).setTitle('__**Empty Inventory:**__').setColor(guildData.borderColor as [number, number, number])
				.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!);
			await HelperFunctions.sendMessageWithCorrectChannel(commandData, messageEmbed);
			return commandReturnData;
		}

		const currentPageIndex = 0;
		let newMessage = await HelperFunctions.sendMessageWithCorrectChannel(commandData, finalMsgEmbedsArray[currentPageIndex] as Discord.MessageEmbed);
		if (commandData.toTextChannel instanceof Discord.WebhookClient) {
			newMessage = new Discord.Message(commandData.guild!.client, newMessage, commandData.fromTextChannel!);
		}		
		await HelperFunctions.recurseThroughMessagePages(commandData.guildMember!.id,
			newMessage, currentPageIndex, finalMsgEmbedsArray, true);
		return commandReturnData;
	} catch (error) {
		return new Promise((resolve, reject) => {
			reject(error);
		});
	}
}
command.function = execute;
export default command as FoundationClasses.BotCommand;
