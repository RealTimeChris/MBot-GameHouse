// withdraw.js - Module for my "withdraw" command.
// Feb 17, 2021
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
	name: 'withdraw',
	description: '__**Withdraw Usage:**__ !withdraw = AMOUNT, or !withdraw = ALL',
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

		let withdrawAmount = 0;

		const guildMemberData = new GuildMemberData({dataBase: discordUser.dataBase, id: commandData.guildMember!.id, guildId: commandData.guild!.id,
			userName: (commandData.guildMember as Discord.GuildMember).user.username, displayName: (commandData.guildMember as Discord.GuildMember).displayName});
		await guildMemberData.getFromDataBase();

		const guildData = new GuildData({dataBase: discordUser.dataBase, id: commandData.guild!.id, memberCount: commandData.guild!.memberCount, name: commandData.guild!.name});
		await guildData.getFromDataBase();

		const amountRegExp = /\d{1,18}/;
		if (commandData.args[0] !== undefined && commandData.args[0].toString().toLowerCase() === 'all') {
			withdrawAmount = guildMemberData.currency.bank;
		} else if (commandData.args[0] === undefined || parseInt(commandData.args[0], 10) <= 0
		|| !amountRegExp.test(commandData.args[0])) {
			const msgString = `------\n**Please enter a valid withdrawl amount! (!withdraw = AMOUNT)**\n------`;
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
		}	else {
			withdrawAmount = parseInt(commandData.args[0].toString().match(amountRegExp)![0]!, 10);
		}

		if (withdrawAmount > guildMemberData.currency.bank) {
			const msgString = `-------\n**Sorry, but you do not have sufficient funds to withdraw that much!**\n------`;
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

		guildMemberData.currency.wallet += withdrawAmount;
		guildMemberData.currency.bank -= withdrawAmount;
		await guildMemberData.writeToDataBase();

		const msgString = `Congratulations! You've withdrawn ${withdrawAmount} ${discordUser.userData.currencyName} from your bank account to your wallet!\n------\n__**Your new balances are:**__\n`
						+ `__Bank:__ ${guildMemberData.currency.bank} ${discordUser.userData.currencyName}\n`
						+ `__Wallet:__ ${guildMemberData.currency.wallet} ${discordUser.userData.currencyName}\n------`;

		const messageEmbed = new Discord.MessageEmbed();
		messageEmbed
			.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
			.setColor(guildData.borderColor as [number, number, number])
			.setTitle('__**Bank Withdrawal:**__')
			.setTimestamp(Date.now())
			.setDescription(msgString);
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
