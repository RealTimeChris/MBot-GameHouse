// addshopitem.ts - Module for my command that adds an inventory item to the shop.
// Feb 5, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import FoundationClasses from '../FoundationClasses';
import DiscordUser from '../DiscordUser';
import GuildData from '../GuildData';
import HelperFunctions from '../HelperFunctions';

const command: FoundationClasses.BotCommand = {
	name: 'addshopitem',
	description: '__**Add Shop Item Usage**__: !addshopitem = ITEMNAME, SELFMOD, OPPMOD, ITEMCOST, EMOJI\n'
	+ 'Where ITEMNAME is a string, and SELFMOD and OPPMOD are values between 0 and 100, and 0 and -100 respectively.',
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

		const testBool = await HelperFunctions.doWeHaveAdminPermission(commandData, discordUser);

		if (testBool === false) {
			return commandReturnData;
		}

		const guildData = new GuildData({dataBase: discordUser.dataBase, id: commandData.guild!.id, memberCount: commandData.guild!.memberCount, name: commandData.guild!.name});
		await guildData.getFromDataBase();

		const itemNameRegExp = /.{1,32}/;
		const selfModRegExp = /\d{1,3}/;
		const oppModRegExp = /-{0,1}\d{1,3}/;
		const itemCostRegExp = /\d{1,10}/;
		const emojiRegExp = /.{1,64}/;
		if (commandData.args[0] === undefined || !itemNameRegExp.test(commandData.args[0])) {
			const msgString = `------\n**Please enter a valid item name! (!addshopitem = ITEMNAME, SELFMOD, OPPMOD, ITEMCOST, EMOJI)**\n------`;
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
		if (commandData.args[1] === undefined || !selfModRegExp.test(commandData.args[1])
		|| parseInt(commandData.args[1], 10) > 100 || parseInt(commandData.args[1], 10) < 0) {
			const msgString = `------\n**Please enter a valid self-mod value, between 0 and 100! (!addshopitem = ITEMNAME, SELFMOD, OPPMOD, ITEMCOST, EMOJI)**\n------`;
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
		if (commandData.args[2] === undefined || !oppModRegExp.test(commandData.args[2])
		|| parseInt(commandData.args[2], 10) < -100 || parseInt(commandData.args[2], 10) > 0) {
			const msgString = `------\n**Please enter a valid opp-mod value between -100 and 0! (!addshopitem = ITEMNAME, SELFMOD, OPPMOD, ITEMCOST, EMOJI)**\n------`;
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
		if (commandData.args[3] === undefined || !itemCostRegExp.test(commandData.args[3]) || parseInt(commandData.args[3], 10) < 1) {
			const msgString = `------\n**Please enter a valid item cost!! (!addshopitem = ITEMNAME, SELFMOD, OPPMOD, ITEMCOST, EMOJI)**\n------`;
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
		if (commandData.args[4] === undefined || !emojiRegExp.test(commandData.args[4])) {
			const msgString = `------\n**Please enter a valid emoji! (!addshopitem = ITEMNAME, SELFMOD, OPPMOD, ITEMCOST, EMOJI)**\n------`;
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
		const selfMod = parseInt(commandData.args[1].match(selfModRegExp)![0]!, 10);
		const oppMod = parseInt(commandData.args[2].match(oppModRegExp)![0]!, 10);
		const itemCost = parseInt(commandData.args[3].match(itemCostRegExp)![0]!, 10);
		const emoji = commandData.args[4];

		for (let x = 0; x < guildData.guildShop.items.length; x += 1) {
			if (itemName === (guildData.guildShop.items[x] as FoundationClasses.InventoryItem).itemName) {
				const msgString = `------\n**Sorry, but an item by that name already exists!**\n------`;
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
		}

		const newItem: FoundationClasses.InventoryItem = {
			itemCost: itemCost,
			itemName: itemName,
			selfMod: selfMod,
			oppMod: oppMod,
			emoji: emoji};

		guildData.guildShop.items.push(newItem);
		await guildData.writeToDataBase();

		let msgString = '';

		msgString = `${msgString}Good job! You've added a new item to the shop, making it available for purchase by the members of this server!\n`
						+ `__**The item's stats are as follows**__:\n__Item Name__: ${itemName}\n__Self-Mod Value__: ${selfMod}\n__Opp-Mod Value__: ${oppMod}\n`
						+ `__Item Cost__: ${itemCost} ${discordUser.userData.currencyName}\n__Emoji__: ${emoji}`;

		const messageEmbed = new Discord.MessageEmbed();
		messageEmbed.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
		.setDescription(msgString)
		.setTimestamp(Date.now())
		.setTitle('__**New Shop Item Added:**__')
			.setColor(guildData.borderColor  as [number, number, number]);
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