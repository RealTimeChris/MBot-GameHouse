// setbalance.ts - Module for my "set balance" command.
// Feb 11, 2021
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
	name: 'setbalance',
	description: "__**Set Balance Usage:**__ !setbalance = NEWBALANCE, BALANCETYPE, @USERMENTION or to set your own balance it's simply !setbalance = NEWBALANCE, BALANCETYPE",
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

		const areTheyACommander = await HelperFunctions.checkForBotCommanderStatus((commandData.guildMember! as Discord.GuildMember).id, discordUser.userData.botCommanders);

		if (areTheyACommander === false) {
			const msgString = `------\n**Sorry, but you don't have the permissions required for that!**\n------`
            const msgEmbed = new Discord.MessageEmbed();
            msgEmbed
                .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
                .setColor(guildData.borderColor as [number, number, number])
                .setDescription(msgString)
                .setTimestamp(Date() as unknown as Date)
                .setTitle("__**Permissions Issue:**__");
            await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
			return commandReturnData;
		}

		const balanceRegExp = /\d{1,18}/;
		const userMentionRegExp = /.{2,3}\d{18}>/;
		const userIDRegExp = /\d{18}/;
		let targetUserID = '';

		if (commandData.args[0] === undefined || !balanceRegExp.test(commandData.args[0]) || parseInt(commandData.args[0], 10) < 0) {
			const msgString = `------\n**Please enter a valid desired balance! (!setbalance = NEWBALANCE, BALANCETYPE, @USERMENTION, or just !setbalance = NEWBALANCE, BALANCETYPE)**\n------`;
			let msgEmbed = new Discord.MessageEmbed()
				.setAuthor((commandData.guildMember as Discord.GuildMember)?.user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
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
		if (commandData.args[1] === undefined || (commandData.args[1].toLowerCase() !== 'bank' && commandData.args[1].toLowerCase() !== 'wallet')) {
			const msgString = `------\n**Please enter a valid balance type! Bank or Wallet! (!setbalance = NEWBALANCE, BALANCETYPE, @USERMENTION, or just !setbalance = NEWBALANCE, BALANCETYPE)**\n------`;
			let msgEmbed = new Discord.MessageEmbed()
				.setAuthor((commandData.guildMember as Discord.GuildMember)?.user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
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
		if (commandData.args[2] === undefined) {
			targetUserID = commandData.guildMember!.id!;
		} else if (commandData.args[2] !== undefined && !userMentionRegExp.test(commandData.args[2]) && !userIDRegExp.test(commandData.args[2])) {
			const msgString = `------\n**Please enter a valid target user mention, or leave it blank to select yourself as the target! (!setbalance = NEWBALANCE, BALANCETYPE, @USERMENTION, or just !setbalance = NEWBALANCE, BALANCETYPE)**\n------`;
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
		} else if (commandData.args[2] !== undefined) {
			const arg2 = commandData.args[2];
			const targetUserIDOne = arg2.match(userIDRegExp)![0]!;
			targetUserID = targetUserIDOne;
		}

		const targetUserBalance = parseInt(commandData.args[0].toString().match(balanceRegExp)![0]!, 10);
		const balanceType = commandData.args[1].toLowerCase();

		const targetMember = (commandData.guild as Discord.Guild).members.resolve(targetUserID);

		if (targetMember === null) {
			const msgString = `------\n**Sorry, but the specified user could not be found!**\n------`;
			let msgEmbed = new Discord.MessageEmbed()
				.setAuthor((commandData.guildMember as Discord.GuildMember)?.user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
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

		const targetGuildMemberData = new GuildMemberData({dataBase: discordUser.dataBase, id: targetMember.id, guildId: commandData.guild!.id,
            userName: targetMember.user.username, displayName: targetMember.displayName});
		await targetGuildMemberData.getFromDataBase();

		targetGuildMemberData.currency.wallet = 10000;

		if (targetGuildMemberData == null) {
			const msgString = `------\n**Sorry, but the specified user data could not be found!**\n------`;
			let msgEmbed = new Discord.MessageEmbed()
				.setAuthor((commandData.guildMember as Discord.GuildMember)?.user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
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

		let msgString = '';

		if (balanceType === 'bank') {
			targetGuildMemberData.currency.bank = targetUserBalance;
			await targetGuildMemberData.writeToDataBase();

			let newBalance = targetGuildMemberData.currency.bank;

			msgString = `__You've set the user <@!${targetUserID}>'s bank balance to:__ ${newBalance} ${discordUser.userData.currencyName}`;
		} else if (balanceType === 'wallet') {
			targetGuildMemberData.currency.wallet = targetUserBalance;
			await targetGuildMemberData.writeToDataBase();

			let newBalance = targetGuildMemberData.currency.wallet;

			msgString = `__You've set the user <@!${targetUserID}>'s wallet balance to:__ ${newBalance} ${discordUser.userData.currencyName}`;
		}

		const messageEmbed = new Discord.MessageEmbed();
		messageEmbed.setTimestamp(Date.now())
			.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
			.setTitle('__**Set New Balance:**__')
			.setColor(guildData.borderColor as [number, number, number])
			.setDescription(msgString);
		await HelperFunctions.sendMessageWithCorrectChannel(commandData, messageEmbed, targetUserID);
		return commandReturnData;
	} catch (error) {
		return new Promise((resolve, reject) => {
			reject(error);
		});
	}
}
command.function = execute;
export default command as FoundationClasses.BotCommand;
