	// balance.ts - Module for my balance command.
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
	name: 'balance',
	description: '__**Balance Usage**__: !balance = @USERMENTION, or simply !balance to display your own balance.',
	function: Function()
}

async function execute(commandData: FoundationClasses.CommandData, discordUser: DiscordUser): Promise<FoundationClasses.CommandReturnData> {
	try {
		const commandReturnData: FoundationClasses.CommandReturnData = {
			commandName: command.name
		};
		const areWeInADM = await HelperFunctions.areWeInADM(commandData);

		if (areWeInADM === true) {
			return commandReturnData;
		}

		let userID = '';
		let bankAmount = 0;
		let walletAmount = 0;

		const guildData = new GuildData({dataBase: discordUser.dataBase, id: commandData.guild!.id, memberCount: commandData.guild!.memberCount, name: commandData.guild!.name});
		await guildData.getFromDataBase();

		const mentionRegExp = /<@!\d{18}>/;
		const idRegExp = /\d{18}/;
		if (commandData.args[0] === undefined) {
			userID = commandData.guildMember!.id;
		} else if (commandData.args[0] !== undefined) {
			if (!mentionRegExp.test(commandData.args[0]) && !idRegExp.test(commandData.args[0])) {
				const msgString = `------\n**Please, enter a valid user mention, or enter none at all! (!balance = @USERMENTION)**\n------`;
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
			const potentialID = commandData.args[0];
			const userID01 = potentialID.match(idRegExp)![0]!;
			userID = userID01;
		}

		const currentGuildMember = commandData.guild!.members.resolve(userID);

		if (currentGuildMember === null) {
			const msgString = `------\n**Sorry, but that user could not be found!**\n------`;
			let msgEmbed = new Discord.MessageEmbed()
				.setAuthor((commandData.guildMember as Discord.GuildMember)?.user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
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

		const guildMemberData = new GuildMemberData({dataBase: discordUser.dataBase, id: currentGuildMember.id, guildId: commandData.guild!.id,
			userName: (currentGuildMember as Discord.GuildMember)!.user.username, displayName: (currentGuildMember as Discord.GuildMember).displayName});
		await guildMemberData.getFromDataBase();

		let msgString = '';
		bankAmount = guildMemberData.currency!.bank!;
		walletAmount = guildMemberData.currency!.wallet!;
		msgString = `${msgString}<@!${userID}>'s balances are:\n------\n__**Bank Balance:**__ ${bankAmount.toString()} ${discordUser.userData.currencyName}\n`
						+ `__**Wallet Balance:**__ ${walletAmount.toString()} ${discordUser.userData.currencyName}\n------`;

		const messageEmbed = new Discord.MessageEmbed()
			.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
			.setDescription(msgString)
			.setColor(guildData.borderColor as [number, number, number])
			.setTimestamp(Date.now())
			.setTitle('__**Current Balances:**__');
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
