// buy.ts - Module for my buying command.
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
	name: 'buy',
	description: '__**Buy Usage:**__ !buy = ITEMNAME/ROLENAME',
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

		const guildData = new GuildData({dataBase: discordUser.dataBase, id: commandData.guild!.id, memberCount: commandData.guild!.memberCount, name: commandData.guild!.name});
		await guildData.getFromDataBase();

		if (commandData.args[0] === undefined) {
			const msgString = `------\n**Please enter an item name! (!buy = ITEMNAME)**\n------`;
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

		const objectName = commandData.args[0];
		let objectShopIndex = 0;
		let objectType = String();

		const guildMemberData = new GuildMemberData({dataBase: discordUser.dataBase, id: commandData.guildMember!.id, guildId: commandData.guild!.id,
			userName: (commandData.guildMember as Discord.GuildMember)!.user.username, displayName: (commandData.guildMember as Discord.GuildMember).displayName});
		await guildMemberData.getFromDataBase();

		let isFoundInShop = false;
		for (let x = 0; x < guildData.guildShop.items.length; x += 1) {
			if (objectName === guildData.guildShop.items[x]!.itemName) {
				isFoundInShop = true;
				objectShopIndex = x;
				objectType = 'item';
				break;
			}
		}
		for (let x = 0; x < guildData.guildShop.roles.length; x += 1) {
			if (objectName === guildData.guildShop.roles[x]!.roleName) {
				isFoundInShop = true;
				objectShopIndex = x;
				objectType = 'role';
				break;
			}
		}

		if (isFoundInShop === false) {
			const msgString = `------\n**Sorry, but we could not find that object in the shop!**\n------`;
			let msgEmbed = new Discord.MessageEmbed()
				.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
				.setColor(guildData.borderColor as [number, number, number])
				.setDescription(msgString)
				.setTimestamp(Date() as unknown as Date)
				.setTitle('__**Missing Object:**__')
			let msg = await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
			if (commandData.toTextChannel instanceof Discord.WebhookClient) {
				msg = new Discord.Message(commandData.guild!.client, msg, commandData.fromTextChannel!);
			}
			await msg.delete({timeout: 20000});
			return commandReturnData;
		}

		let isFoundInInventory = false;

		for (let x = 0; x < guildMemberData.items.length; x += 1) {
			if (objectName === guildMemberData.items[x]!.itemName) {
				isFoundInInventory = true;
				break;
			}
		}

		for (let x = 0; x < guildMemberData.roles.length; x += 1) {
			if (objectName === guildMemberData.roles[x]!.roleName) {
				isFoundInInventory = true;
				break;
			}
		}

		if (isFoundInInventory === true) {
			const msgString = `------\n**Sorry, but you already have one of those ${objectType}s.**\n------`;
			let msgEmbed = new Discord.MessageEmbed()
				.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
				.setColor(guildData.borderColor as [number, number, number])
				.setDescription(msgString)
				.setTimestamp(Date() as unknown as Date)
				.setTitle('__**Duplicate Object:**__')
			let msg = await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
			if (commandData.toTextChannel instanceof Discord.WebhookClient) {
				msg = new Discord.Message(commandData.guild!.client, msg, commandData.fromTextChannel!);
			}
			await msg.delete({timeout: 20000});
			return commandReturnData;
		}

		let msgString = '';
		const messageEmbed = new Discord.MessageEmbed();

		if (objectType === 'role') {
			const { roleCost } = guildData.guildShop.roles[objectShopIndex]!;
			const userBalance = guildMemberData.currency.wallet;

			if (roleCost > userBalance) {
				const msgString = `------\n**Sorry, but you have insufficient funds in your wallet to purchase that!**\n------`;
				let msgEmbed = new Discord.MessageEmbed()
					.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
					.setColor(guildData.borderColor as [number, number, number])
					.setDescription(msgString)
					.setTimestamp(Date() as unknown as Date)
					.setTitle('__**Insufficient Funds:**__')
				let msg = await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
				if (commandData.toTextChannel instanceof Discord.WebhookClient) {
					msg = new Discord.Message(commandData.guild!.client, msg, commandData.fromTextChannel!);
				}
				await msg.delete({timeout: 20000});
				return commandReturnData;
			}
			const newRole = guildData.guildShop.roles[objectShopIndex]!;
			guildMemberData.roles.push(newRole);
			guildMemberData.currency.wallet -= roleCost;
			await guildMemberData.writeToDataBase();

			const newBalance = guildMemberData.currency.wallet;

			const { roleID } = guildData.guildShop.roles[objectShopIndex]!;
			const guildMemberRoleManager = new Discord.GuildMemberRoleManager(commandData.guildMember as Discord.GuildMember);
			guildMemberRoleManager.add(roleID);

			msgString = `------\nCongratulations! You've just purchased a new ${objectType}.\n------\n__**It is as follows:**__ <@&${newRole.roleID}> (${newRole.roleName})\n------\n__**Your new wallet balance:**__ ${newBalance} ${discordUser.userData.currencyName}\n------`;
			messageEmbed.setTitle('__**New Role Purchased:**__');

			let maxIdx = 0;
			let tempRole: FoundationClasses.InventoryRole;
			const len = guildMemberData.roles.length;
			for (let x = 0; x < len; x += 1) {
				maxIdx = x;
				for (let y = x + 1; y < len; y += 1) {
					if (guildMemberData.roles[y]!.roleCost > guildMemberData.roles[maxIdx]!.roleCost) {
						maxIdx = y;
					}
				}
				tempRole = guildMemberData.roles[x]!;
				guildMemberData.roles[x] = guildMemberData.roles[maxIdx]!;
				guildMemberData.roles[maxIdx] = tempRole;
			}
			await guildData.writeToDataBase();
		} else if (objectType === 'item') {
			const { itemCost } = guildData.guildShop.items[objectShopIndex]!;
			const userBalance = guildMemberData.currency.wallet;

			if (itemCost > userBalance) {
				const msgString = `------\n*Sorry, but you have insufficient funds in your wallet to purchase that!**\n------`;
				let msgEmbed = new Discord.MessageEmbed()
					.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
					.setColor(guildData.borderColor as [number, number, number])
					.setDescription(msgString)
					.setTimestamp(Date() as unknown as Date)
					.setTitle('__**Insufficient Funds:**__')
				let msg = await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
				if (commandData.toTextChannel instanceof Discord.WebhookClient) {
					msg = new Discord.Message(commandData.guild!.client, msg, commandData.fromTextChannel!);
				}
				await msg.delete({timeout: 20000});
				return commandReturnData;
			}

			const newItem = guildData.guildShop.items[objectShopIndex]!;
			guildMemberData.items.push(newItem);
			guildMemberData.currency.wallet -= itemCost;
			await guildMemberData.writeToDataBase();

			const itemEmoji = guildData.guildShop.items[objectShopIndex]!.emoji;
			const { itemName } = guildData.guildShop.items[objectShopIndex]!;
			const newBalance = guildMemberData.currency.wallet;
			msgString = `------\nCongratulations! You've just purchased a new ${objectType}.\n------\n__**It is as follows:**__ ${itemEmoji}${itemName}\n------\n__**Your new wallet balance:**__ ${newBalance} ${discordUser.userData.currencyName}\n------`;
			messageEmbed.setTitle('__**New Item Purchased:**__');

			let maxIdx = 0;
			let tempItem: FoundationClasses.InventoryItem;
			const len = guildMemberData.items.length;
			for (let x = 0; x < len; x += 1) {
				maxIdx = x;
				for (let y = x + 1; y < len; y += 1) {
					if (guildMemberData.items[y]!.itemCost > guildMemberData.items[maxIdx]!.itemCost) {
						maxIdx = y;
					}
				}
				tempItem = guildMemberData.items[x]!;
				guildMemberData.items[x] = guildMemberData.items[maxIdx]!;
				guildMemberData.items[maxIdx] = tempItem;
			}
			await guildMemberData.writeToDataBase();
		}
		messageEmbed
			.setTimestamp(Date.now())
			.setDescription(msgString)
			.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
			.setColor(guildData.borderColor as [number, number, number]);
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
