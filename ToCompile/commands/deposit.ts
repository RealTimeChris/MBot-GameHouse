// deposit.ts - Module for my "deposit" command.
// Feb 21, 2021
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
	name: 'deposit',
	description: '__**Deposit Usage:**__ !deposit = AMOUNT ,or !deposit = ALL.',
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

		const guildMemberData = new GuildMemberData({dataBase: discordUser.dataBase, id: commandData.guildMember!.id, guildId: commandData.guild!.id,
			userName: (commandData.guildMember as Discord.GuildMember)!.user.username, displayName: (commandData.guildMember as Discord.GuildMember).displayName});
		await guildMemberData.getFromDataBase();

		const guildData = new GuildData({dataBase: discordUser.dataBase, id: commandData.guild!.id, memberCount: commandData.guild!.memberCount, name: commandData.guild!.name});
		await guildData.getFromDataBase();

		const depositAmountRegExp = /\d{1,18}/;
		let depositAmount = 0;
		if (commandData.args[0] !== undefined && commandData.args[0].toLowerCase() === 'all') {
			depositAmount = guildMemberData.currency.wallet;
		} else if (commandData.args[0] === undefined || parseInt(commandData.args[0], 10) <= 0
		|| !depositAmountRegExp.test(commandData.args[0])) {
			const msgString = `------\n**Please enter a valid deposit amount! (!deposit = AMOUNT)**\n------`;
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
		} else if (depositAmountRegExp.test(commandData.args[0])) {
			depositAmount = parseInt((commandData.args[0].match(depositAmountRegExp)as string[])[0] as string, 10);
		}
		if (depositAmount > guildMemberData.currency.wallet) {
			const msgString = `------\n**Sorry, but you do not have sufficient funds to deposit that much!**\n------`;
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

		const msPerSecond = 1000;
		const SecondsPerMinute = 60;
		const msPerMinute = msPerSecond * SecondsPerMinute;
		const MinutesPerHour = 60;
		const msPerHour = msPerMinute * MinutesPerHour;
		const msPerDepositCycle = msPerHour * discordUser.userData.hoursOfDepositCooldown;
		const currentTime = new Date().getTime();
		const timeSinceLastDeposit = currentTime - guildMemberData.currency!.timeOfLastDeposit!;

		let msgString = '';
		if (timeSinceLastDeposit >= msPerDepositCycle) {
			guildMemberData.currency.bank = Number(guildMemberData.currency.bank);
			guildMemberData.currency.bank += depositAmount;
			guildMemberData.currency.wallet = Number(guildMemberData.currency.wallet);
			guildMemberData.currency.wallet -= depositAmount;
			guildMemberData.currency.timeOfLastDeposit = new Date().getTime();
			await guildMemberData.writeToDataBase();

			msgString = `Congratulations! You've deposited ${depositAmount} ${discordUser.userData.currencyName} from your wallet into your bank!`
								+ '\n------\n__**Your new balances are:**__\n'
								+ `__Bank:__ ${guildMemberData.currency.bank} ${discordUser.userData.currencyName}\n`
								+ `__Wallet:__ ${guildMemberData.currency.wallet} ${discordUser.userData.currencyName}\n------`;
		} else {
			const timeRemaining = msPerDepositCycle - timeSinceLastDeposit;
			const hoursRemain = Math.trunc(timeRemaining / msPerHour);
			const minutesRemain = Math.trunc((timeRemaining % msPerHour) / msPerMinute);
			const secondsRemain = Math.trunc(((timeRemaining % msPerHour) % msPerMinute) / msPerSecond);

			if (hoursRemain > 0) {
				msgString = `Sorry, but you need to wait ${hoursRemain} hours, ${minutesRemain} minutes, and ${secondsRemain} seconds before you can make another deposit!`;
			} else if (minutesRemain > 0) {
				msgString = `Sorry, but you need to wait ${minutesRemain} minutes, and ${secondsRemain} seconds before you can make another deposit!`;
			} else {
				msgString = `Sorry, but you need to wait ${secondsRemain} seconds before you can make another deposit!`;
			}
		}

		const messageEmbed = new Discord.MessageEmbed();
		messageEmbed
			.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
			.setColor(guildData.borderColor as [number, number, number])
			.setTitle('__**Bank Deposit:**__')
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
