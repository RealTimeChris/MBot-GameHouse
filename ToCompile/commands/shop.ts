// shop.ts - Module for my "shop" command!
// Feb 6, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import FoundationClasses from '../FoundationClasses';
import DiscordUser from '../DiscordUser';
import GuildData from '../GuildData';
import HelperFunctions from '../HelperFunctions';

const command:FoundationClasses.BotCommand = {
	name: 'shop',
	description: '__**Shop Usage**__: !shop',
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

		const rolesArray = commandData.guild!.roles.cache.array().sort();

		const guildData = new GuildData({dataBase: discordUser.dataBase, id: commandData.guild!.id, memberCount: commandData.guild!.memberCount, name: commandData.guild!.name});
		await guildData.getFromDataBase();

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

		for (let x = 0; x < guildData.guildShop.roles.length; x += 1) {
			let isRoleFound = false;
			for (let y = 0; y < rolesArray.length; y += 1) {
				if (guildData.guildShop.roles[x]!.roleID === rolesArray[y]!.id) {
					isRoleFound = true;
					break;
				}
			}
			if (isRoleFound === false) {
				const msgString = `------\n**Removing guild role ${guildData.guildShop.roles[x]!.roleName} from guild cache!**\n------`;
				let msgEmbed = new Discord.MessageEmbed()
					.setAuthor((commandData.guildMember as Discord.GuildMember)?.user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
					.setColor(guildData.borderColor as [number, number, number])
					.setDescription(msgString)
					.setTimestamp(Date() as unknown as Date)
					.setTitle('__**Removed Guild Role:**__')
				let msg = await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
				if (commandData.toTextChannel instanceof Discord.WebhookClient) {
					msg = new Discord.Message(commandData.guild!.client, msg, commandData.fromTextChannel!);
				}
				await msg.delete({timeout: 20000});
				guildData.guildShop!.roles.splice(x, 1);
			}
		}

		let maxIdx = 0;
		let tempItem:FoundationClasses.InventoryItem;
		let len = guildData.guildShop!.items.length;
		for (let x = 0; x < len; x += 1) {
			maxIdx = x;
			for (let y = x + 1; y < len; y += 1) {
				if (guildData.guildShop!.items[y]!.itemCost
					> guildData.guildShop!.items[maxIdx]!.itemCost) {
					maxIdx = y;
				}
			}
			tempItem = guildData.guildShop!.items[x]!;
			guildData.guildShop!.items[x] = guildData.guildShop!.items[maxIdx]!;
			guildData.guildShop!.items[maxIdx] = tempItem;
		}

		maxIdx = 0;
		let tempRole: FoundationClasses.InventoryRole;
		len = guildData.guildShop!.roles.length;
		for (let x = 0; x < len; x += 1) {
			maxIdx = x;
			for (let y = x + 1; y < len; y += 1) {
				if (guildData.guildShop!.roles[y]!.roleCost
					> guildData.guildShop!.roles[maxIdx]!.roleCost) {
					maxIdx = y;
				}
			}
			tempRole = guildData.guildShop!.roles[x]!;
			guildData.guildShop!.roles[x] = guildData.guildShop!.roles[maxIdx]!;
			guildData.guildShop!.roles[maxIdx] = tempRole;
		}

		const itemsMsgString: string[] = [];
		itemsMsgString.length = 0;
		const itemsMessageEmbeds = [new Discord.MessageEmbed()];
		itemsMessageEmbeds.length = 0;
		let currentPage = 0;

		for (let x = 0; x < guildData.guildShop!.items.length; x += 1) {
			itemsMsgString[x] = '';
			let itemsMsgStringTemp = '';
			itemsMsgStringTemp = `__**|Item:**__ ${guildData.guildShop!.items[x]!.emoji} ${guildData.guildShop!.items[x]!.itemName
			}** |Cost**: ${guildData.guildShop!.items[x]!.itemCost} **|Self-Mod**: ${guildData.guildShop!.items[x]!.selfMod} **|Opp-Mod**: ${
				guildData.guildShop!.items[x]!.oppMod}\n`;
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

		for (let x = 0; x < guildData.guildShop!.roles.length; x += 1) {
			rolesMsgStrings[x] = '';
			let rolesMsgStringTemp = '';
			rolesMsgStringTemp = `__**|Role:**__ <@&${guildData.guildShop!.roles[x]!.roleID}> **|Cost:** ${
				guildData.guildShop!.roles[x]!.roleCost}\n`;
			if (rolesMsgStringTemp.length + rolesMsgStrings[currentPage2]!.length > 2048) {
				currentPage2 += 1;
				rolesMsgStrings.length += 1;
				rolesMsgEmbeds.length += 1;
			}
			rolesMsgEmbeds[currentPage2] = new Discord.MessageEmbed();
			rolesMsgStrings[currentPage2] += rolesMsgStringTemp;
		}

		for (let x = 0; x < rolesMsgEmbeds.length; x += 1) {
			rolesMsgEmbeds[x]!.setTimestamp(Date.now()).setTitle(`__**Shop Inventory (Roles) Page ${x + 1} of ${itemsMessageEmbeds.length + rolesMsgEmbeds.length
			}**__:`).setDescription(rolesMsgStrings[x]).setColor(guildData.borderColor  as [number, number, number])
				.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!);
		}

		for (let x = 0; x < itemsMessageEmbeds.length; x += 1) {
			itemsMessageEmbeds[x]!.setTimestamp(Date.now()).setTitle(`__**Shop Inventory (Items) Page ${rolesMsgEmbeds.length + x + 1} of ${itemsMessageEmbeds.length + rolesMsgEmbeds.length}**__:`)
				.setDescription(itemsMsgString[x]).setColor(guildData.borderColor  as [number, number, number])
				.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!);
		}

		const finalMsgEmbedsArray = [new Discord.MessageEmbed()];
		finalMsgEmbedsArray.length = 0;

		for (let x = 0; x < rolesMsgEmbeds.length; x += 1) {
			finalMsgEmbedsArray.push(rolesMsgEmbeds[x]!);
		}

		for (let x = 0; x < itemsMessageEmbeds.length; x += 1) {
			finalMsgEmbedsArray.push(itemsMessageEmbeds[x]!);
		}

		if (rolesMsgEmbeds.length === 0 && itemsMessageEmbeds.length === 0) {
			let msgString = '';
			msgString = 'Sorry, but we are all out of inventory!';
			const messageEmbed = new Discord.MessageEmbed();
			messageEmbed.setDescription(msgString).setTimestamp(Date.now()).setTitle('__**Empty Inventory:**__').setColor(guildData.borderColor as [number, number, number])
				.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!);
			await HelperFunctions.sendMessageWithCorrectChannel(commandData, messageEmbed);
			return commandReturnData;
		}

		const currentPageIndex = 0;
		const userID = (commandData.guildMember as Discord.GuildMember).user.id;
		let newMessage = await HelperFunctions.sendMessageWithCorrectChannel(commandData, finalMsgEmbedsArray[currentPageIndex]!);
		if (commandData.toTextChannel instanceof Discord.WebhookClient) {
			newMessage = new Discord.Message(commandData.guild!.client, newMessage, commandData.fromTextChannel!);
		}
		await HelperFunctions.recurseThroughMessagePages(userID, newMessage,
			currentPageIndex, finalMsgEmbedsArray, true);
		await guildData.writeToDataBase();
		return commandReturnData;
	} catch (error) {
		return new Promise((resolve, reject) => {
			reject(error);
		});
	}
}
command.function = execute;
export default command as FoundationClasses.BotCommand;
