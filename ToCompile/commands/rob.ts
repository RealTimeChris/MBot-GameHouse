// rob.ts - Module for my rob command.
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
	name: 'rob',
	description: '__**Rob Usage:**__ !rob = @USERMENTION',
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

		const userMentionRegExp = /.{2,3}\d{18}>/;
		const userIDRegExp = /\d{18}/;
		if (commandData.args[0] === undefined || (!userMentionRegExp.test(commandData.args[0]) && !userIDRegExp.test(commandData.args[0]))) {
			const msgString = `------\n**Please enter a valid user mention for the target! (!rob = @USERMENTION)**\n------`;
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
		const userID = commandData.guildMember?.id;

		const guildMemberData = new GuildMemberData({dataBase: discordUser.dataBase, id: commandData.guildMember!.id, guildId: commandData.guild!.id,
			userName: (commandData.guildMember as Discord.GuildMember)!.user.username, displayName: (commandData.guildMember as Discord.GuildMember).displayName});
		await guildMemberData.getFromDataBase();

		const targetUserID = commandData.args[0].match(userIDRegExp)![0]!;
		const targetMember = commandData.guild!.members.resolve(targetUserID);

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

		const targetGuildMemberData = new GuildMemberData({dataBase: discordUser.dataBase, id: targetMember!.id, guildId: commandData.guild!.id,
			userName: targetMember!.user.username, displayName: targetMember.displayName});
		await targetGuildMemberData.getFromDataBase();

		if (targetGuildMemberData == null) {
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

		if (userID === targetUserID) {
			const msgString = `------\n**You can't rob yourself, dumbass!**\n------`;
			let msgEmbed = new Discord.MessageEmbed()
				.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
				.setColor(guildData.borderColor as [number, number, number])
				.setDescription(msgString)
				.setTimestamp(Date() as unknown as Date)
				.setTitle('__**Robbery Issue:**__')
			let msg = await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
			if (commandData.toTextChannel instanceof Discord.WebhookClient) {
				msg = new Discord.Message(commandData.guild!.client, msg, commandData.fromTextChannel!);
			}
			await msg.delete({timeout: 20000});
			return commandReturnData;
		}

		const msPerSecond = 1000;
		const secondsPerMinute = 60;
		const msPerMinute = msPerSecond * secondsPerMinute;
		const minutesPerHour = 60;
		const msPerHour = msPerMinute * minutesPerHour;
		const timeBetweenRobberies = discordUser.userData.hoursOfRobberyCooldown * msPerHour;
		const currentTime = new Date().getTime();
		const currentTimeDifference = currentTime - guildMemberData.lastTimeRobbed;

		if (currentTimeDifference >= timeBetweenRobberies) {
			let userGainString = '';
			let userLossString = '';

			let userGainAmount = 0;
			let userLossAmount = 0;

			for (let x = 0; x < guildMemberData.items.length; x += 1) {
				if (guildMemberData.items[x]!.selfMod > 0) {
					userGainAmount += guildMemberData.items[x]!.selfMod;
					userGainString += `+${guildMemberData.items[x]!.selfMod} of base roll from <@!${commandData.guildMember?.id}>'s ${
						guildMemberData.items[x]!.emoji} ${guildMemberData.items[x]!.itemName}\n`;
				}
			}

			for (let x = 0; x < targetGuildMemberData.items.length; x += 1) {
				if (targetGuildMemberData.items[x]!.oppMod < 0) {
					userLossAmount += targetGuildMemberData.items[x]!.oppMod;
					userLossString += `${targetGuildMemberData.items[x]!.oppMod} of base roll from <@!${targetGuildMemberData.id}>'s ${
						targetGuildMemberData.items[x]!.emoji} ${targetGuildMemberData.items[x]!.itemName}\n`;
				}
			}

			const userRollMod = userGainAmount + userLossAmount;

			const userRollModTotal = HelperFunctions.applyAsymptoticTransform(userRollMod, 2000, 40);

			const baseProbabilityOfSuccess = 40;
			const totalProbabilityOfSuccess = baseProbabilityOfSuccess + userRollModTotal;

			const currentProbabilityValue = Math.trunc(Math.random() * 100);
			const currentSuccessValue = currentProbabilityValue > (100 - totalProbabilityOfSuccess);

			let msgString = '';

			if (currentSuccessValue === true) {
				msgString = `Nicely done! You robbed that motherfucker, <@!${targetUserID}>, good!\n\n__Base probability of success:__ ${baseProbabilityOfSuccess}%\n`;

				if (userGainAmount > 0 || userLossAmount < 0) {
					msgString += `${userGainString + userLossString}\n__Resulting in a net probability of success gain of:__ ${userRollModTotal
					}%\n__For a final probability of success of:__ ${totalProbabilityOfSuccess}%\n`;
				}

				const currencyRobPercentage = Math.trunc(Math.random() * 60);

				const currencyRobAmount = Math
					.trunc((targetGuildMemberData.currency.wallet * (currencyRobPercentage / 100)));

				if (currencyRobAmount < 0) {
					const msgString = `------\n**Cannot rob for debt!**\n------`;
					let msgEmbed = new Discord.MessageEmbed()
						.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
						.setColor(guildData.borderColor as [number, number, number])
						.setDescription(msgString)
						.setTimestamp(Date() as unknown as Date)
						.setTitle('__**Target Issue:**__')
					let msg = await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
					if (commandData.toTextChannel instanceof Discord.WebhookClient) {
						msg = new Discord.Message(commandData.guild!.client, msg, commandData.fromTextChannel!);
					}
					await msg.delete({timeout: 20000});
					return commandReturnData;
				}

				targetGuildMemberData.currency.wallet -= currencyRobAmount;
				guildMemberData.currency.wallet += currencyRobAmount;
				await targetGuildMemberData.writeToDataBase();
				await guildMemberData.writeToDataBase();
				const targetUserNewBalance = targetGuildMemberData.currency.wallet;
				const userNewBalance = guildMemberData.currency.wallet;

				msgString = `${msgString}------\n**You've robbed <@!${targetUserID}> for ${currencyRobPercentage}% of their wallet, which is ${currencyRobAmount} ${discordUser.userData.currencyName}.\n`
										+ `**\n__Your new wallet balances are:__ \n<@!${userID}>: ${userNewBalance} ${discordUser.userData.currencyName
										}\n<@!${targetUserID}>: ${targetUserNewBalance} ${discordUser.userData.currencyName}.`;

				guildMemberData.lastTimeRobbed = new Date().getTime();
				await guildMemberData.writeToDataBase();
				const messageEmbed = new Discord.MessageEmbed();
				messageEmbed.setColor([0, 255, 0]).setDescription(msgString).setTimestamp(Date.now()).setTitle('__**Succesful Robbery:**__')
					.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!);
				await HelperFunctions.sendMessageWithCorrectChannel(commandData, messageEmbed, targetUserID);
			} else if (currentSuccessValue === false) {
				const finedPercentage = Math.trunc(Math.random() * 30);
				const finedAmount = Math.trunc((guildMemberData.currency.wallet * (finedPercentage / 100)));
				guildMemberData.currency.wallet -= finedAmount;
				await guildMemberData.writeToDataBase();
				const userNewBalance = guildMemberData.currency.wallet;

				const repaidPercentage = Math.trunc(Math.random() * 50);
				const repaidAmount = Math.trunc((finedAmount * (repaidPercentage / 100)));
				targetGuildMemberData.currency.wallet += repaidAmount;
				await targetGuildMemberData.writeToDataBase();
				const targetUserNewBalance = targetGuildMemberData.currency.wallet;

				msgString = `Oof! You've been caught while attempting to rob <@!${targetUserID}>!\n\n__Base probability of success:__ ${baseProbabilityOfSuccess}%\n`;

				if (userGainAmount > 0 || userLossAmount < 0) {
					msgString += `${userGainString + userLossString}\n__Resulting in a net probability of success gain of:__ ${userRollModTotal
					}%\n__For a final probability of success of:__ ${totalProbabilityOfSuccess}%\n`;
				}

				msgString += `------\n**You've been fined ${finedPercentage}% of your wallet balance, which is ${finedAmount} ${discordUser.userData.currencyName
				}!\n<@!${targetUserID}> has been reimbursed ${repaidAmount} ${discordUser.userData.currencyName} (${repaidPercentage}%).**`;

				msgString += `\n\n__Your new wallet balances are:__ \n<@!${userID}>: ${userNewBalance
				} ${discordUser.userData.currencyName}\n<@!${targetUserID}>: ${targetUserNewBalance} ${discordUser.userData.currencyName}.`;

				guildMemberData.lastTimeRobbed = new Date().getTime();
				await guildMemberData.writeToDataBase();

				const messageEmbed = new Discord.MessageEmbed();
				messageEmbed.setColor([255, 0, 0]).setDescription(msgString).setTimestamp(Date.now()).setTitle('__**Failed Robbery:**__')
					.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!);
					await HelperFunctions.sendMessageWithCorrectChannel(commandData, messageEmbed);
			}
		} else {
			let msgString = '';
			const timeLeft = timeBetweenRobberies - currentTimeDifference;
			const hoursRemain = Math.trunc(timeLeft / msPerHour);
			const minutesRemain = Math.trunc((timeLeft % msPerHour) / msPerMinute);
			const secondsRemain = Math.trunc(((timeLeft % msPerHour) % msPerMinute) / msPerSecond);

			if (hoursRemain > 0) {
				msgString = `Sorry, but you need to wait ${hoursRemain} hours, ${minutesRemain} minutes, and ${secondsRemain} seconds before you can rob someone again!`;
			} else if (minutesRemain > 0) {
				msgString = `Sorry, but you need to wait ${minutesRemain} minutes, and ${secondsRemain} seconds before you can rob someone again!`;
			} else {
				msgString = `Sorry, but you need to wait ${secondsRemain} seconds before you can rob someone again!`;
			}

			const messageEmbed = new Discord.MessageEmbed();
			messageEmbed.setColor([255, 0, 0]).setDescription(msgString).setTimestamp(Date.now()).setTitle('__**Failed Robbery:**__')
				.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!);
				await HelperFunctions.sendMessageWithCorrectChannel(commandData, messageEmbed);
		}
		return commandReturnData;
	} catch (error) {
		return new Promise((resolve, reject) => {
			reject(error);
		});
	}
}
command.function = execute;
export default command as FoundationClasses.BotCommand;
