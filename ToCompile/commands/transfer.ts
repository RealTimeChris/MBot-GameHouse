// transfer.ts - Module for my transfer command.
// Jan 31, 2021
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
	name: 'transfer',
	description: '__**Transfer Usage**__: !transfer = AMOUNT, @USERMENTION to transfer currency from yourself to the other person!',
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

		const userMentionRegExp = /\d{18}/;
		const userIDRegExp = /\d{18}/;
		const amountRegExp = /\d{1,18}/;
		if (commandData.args[0] === undefined || commandData.args[1] === undefined) {
			const msgString = `------\n**Please enter the valid arguments: (!transfer = AMOUNT, @USERMENTION)**\n------`;
			let msgEmbed = new Discord.MessageEmbed()
				.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
				.setColor(guildData.borderColor as [number, number, number])
				.setDescription(msgString)
				.setTimestamp(Date() as unknown as Date)
				.setTitle('__**Missing Or Invalid Arguments:**__');
			let msg = await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
			if (commandData.toTextChannel instanceof Discord.WebhookClient) {
				msg = new Discord.Message(commandData.guild!.client, msg, commandData.fromTextChannel!);
			}
			await msg.delete({timeout: 20000});
			return commandReturnData;
		}
		if (!userMentionRegExp.test(commandData.args[1]) && !userIDRegExp.test(commandData.args[1])) {
			const msgString = `------\n**Please enter a valid user mention! (!transfer = AMOUNT, @USERMENTION)**\n------`;
			let msgEmbed = new Discord.MessageEmbed()
				.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
				.setColor(guildData.borderColor as [number, number, number])
				.setDescription(msgString)
				.setTimestamp(Date() as unknown as Date)
				.setTitle('__**Missing Or Invalid Arguments:**__');
			let msg = await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
			if (commandData.toTextChannel instanceof Discord.WebhookClient) {
				msg = new Discord.Message(commandData.guild!.client, msg, commandData.fromTextChannel!);
			}
			await msg.delete({timeout: 20000});
			return commandReturnData;
		}
		if (!amountRegExp.test(commandData.args[0]) || parseInt(commandData.args[0], 10) <= 0) {
			const msgString = `------\n**Please enter a valid number for amount! (!transfer = AMOUNT, @USERMENTION)**\n------`;
			let msgEmbed = new Discord.MessageEmbed()
				.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
				.setColor(guildData.borderColor as [number, number, number])
				.setDescription(msgString)
				.setTimestamp(Date() as unknown as Date)
				.setTitle('__**Missing Or Invalid Arguments:**__');
			let msg = await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
			if (commandData.toTextChannel instanceof Discord.WebhookClient) {
				msg = new Discord.Message(commandData.guild!.client, msg, commandData.fromTextChannel!);
			}
			await msg.delete({timeout: 20000});
			return commandReturnData;
		}

		const toUserID = commandData.args[1].match(userMentionRegExp)![0]!;
		const fromUserID = commandData.guildMember!.id;
		const amount = parseInt(commandData.args[0].match(amountRegExp)![0]!, 10);
		const toUserMember = commandData.guild!.members.resolve(toUserID);

		if (toUserID === fromUserID) {
			const msgString = `------\n**Sorry, but you cannot transfer to yourself!**\n------`;
			let msgEmbed = new Discord.MessageEmbed()
				.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
				.setColor(guildData.borderColor as [number, number, number])
				.setDescription(msgString)
				.setTimestamp(Date() as unknown as Date)
				.setTitle('__**Transfer Issue:**__');
			let msg = await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
			if (commandData.toTextChannel instanceof Discord.WebhookClient) {
				msg = new Discord.Message(commandData.guild!.client, msg, commandData.fromTextChannel!);
			}
			await msg.delete({timeout: 20000});
			return commandReturnData;
		}

		if (toUserMember === null) {
			const msgString = `------\n**Sorry, but that user could not be found!**\n------`;
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

		const toGuildMemberData = new GuildMemberData({dataBase: discordUser.dataBase, id: toUserMember.id, guildId: commandData.guild!.id,
			userName: toUserMember.user.username, displayName: toUserMember.displayName});
		await toGuildMemberData.getFromDataBase();

		if (toGuildMemberData == null) {
			const msgString = `------\n**Sorry, but that user data could not be found!**\n------`;
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

		const fromGuildMemberData = new GuildMemberData({dataBase: discordUser.dataBase, id: commandData.guildMember!.id, guildId: commandData.guild!.id,
			userName: (commandData.guildMember as Discord.GuildMember).user.username, displayName: (commandData.guildMember as Discord.GuildMember).displayName});
		await fromGuildMemberData.getFromDataBase();

		if (amount > fromGuildMemberData.currency.wallet) {
			const msgString = `------\n**Sorry, but you don't have sufficient funds in your wallet for that transfer!**\n-------`;
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
		fromGuildMemberData.currency.wallet -= amount;
		toGuildMemberData.currency.wallet += amount;
		await fromGuildMemberData.writeToDataBase();
		await toGuildMemberData.writeToDataBase();

		let msgString = '';
		msgString += `<@!${fromUserID}> succesfully transferred ${amount} ${discordUser.userData.currencyName} to <@!${toUserID}>.`;
		msgString += `${'\n__Your new wallet balances are:__ \n<@!'}${fromUserID}>: ${fromGuildMemberData.currency.wallet}`;
		msgString += `${'\n<@!'}${toUserID}>: ${toGuildMemberData.currency.wallet}`;
		const messageEmbed = new Discord.MessageEmbed()
			.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
			.setDescription(msgString).setTimestamp(Date.now())
			.setTitle('__**Balance Transfer:**__')
			.setColor(guildData.borderColor as [number, number, number]);
			await HelperFunctions.sendMessageWithCorrectChannel(commandData, messageEmbed, toUserID);
		return commandReturnData;
	} catch (error) {
		return new Promise((resolve, reject) => {
			reject(error);
		});
	}
}
command.function = execute;
export default command as FoundationClasses.BotCommand;
