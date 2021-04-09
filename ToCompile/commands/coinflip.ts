// coinflip.ts - Module for my bot's coin tossing game.
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
	name: 'coinflip',
	description: '__**Coinflip Usage**__: !coinflip = BETAMOUNT to start a game.',
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

		const guildMemberData = new GuildMemberData({dataBase: discordUser.dataBase, id: commandData.guildMember!.id, guildId: commandData.guild!.id,
			userName: (commandData.guildMember as Discord.GuildMember)!.user.username, displayName: (commandData.guildMember as Discord.GuildMember).displayName});
		await guildMemberData.getFromDataBase();

		if (!(commandData.fromTextChannel as Discord.TextChannel).permissionsFor(commandData.guild?.client.user as Discord.User)?.has('MANAGE_MESSAGES')) {
			const msgString = `------\n**I need the Manage Messages permission in this channel, for this game!**\n------`;
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

		const betAmountRegExp = /\d{1,18}/;

		if (commandData.args[0] === undefined || !betAmountRegExp.test(commandData.args[0]) || parseInt(commandData.args[0], 10) < 1) {
			const msgString = `------\n**Please enter a valid amount to bet! 1 ${discordUser.userData.currencyName} or more! (!coinflip = BETAMOUNT)**\n------`;
			let msgEmbed = new Discord.MessageEmbed()
				.setAuthor((commandData.guildMember as Discord.GuildMember)?.user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
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

		const betAmount = parseInt(commandData.args[0].match(betAmountRegExp)![0]!, 10);
		
		let currencyAmount = guildMemberData.currency.wallet;

		if (betAmount > currencyAmount) {
			const msgString = `------\n**Sorry, but you have insufficient funds in your wallet to place that wager!**\n------`;
			let msgEmbed = new Discord.MessageEmbed()
				.setAuthor((commandData.guildMember as Discord.GuildMember)?.user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
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

		let newBetString = '';

		newBetString += `Welcome, <@!${commandData.guildMember!.id}>, you have placed a bet of **${betAmount} ${discordUser.userData.currencyName}**\n`;
		newBetString += 'React with :exploding_head: to choose heads, or with :snake: to choose tails!';

		const messageEmbed = new Discord.MessageEmbed();
		messageEmbed
			.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
			.setColor([0, 0, 255])
			.setDescription(newBetString)
			.setTimestamp(Date.now())
			.setTitle('__**Heads, or Tails!?**__');
		let newMessage = await HelperFunctions.sendMessageWithCorrectChannel(commandData, messageEmbed);
		if (commandData.toTextChannel instanceof Discord.WebhookClient) {
			newMessage = new Discord.Message(commandData.guild!.client, newMessage, commandData.fromTextChannel!);
		}
		await newMessage.react('🤯');
		await newMessage.react('🐍');
		const filter = (reaction: Discord.MessageReaction, user: Discord.User) => (reaction.emoji.name === '🤯' || reaction.emoji.name === '🐍') && user.id === commandData.guildMember!.id;
		await newMessage.awaitReactions(filter, { max: 1, time: 120000 }).then(async collected => {
			if (collected.size === 0) {
				let timeOutString = '';
				timeOutString = newBetString;

				timeOutString += '\n\n__**Sorry, but you ran out of time to select heads or tails!**__';
				const messageEmbed2 = new Discord.MessageEmbed();
				messageEmbed2.setColor([255, 0, 0]).setTimestamp(Date.now()).setTitle('__**Heads, or Tails!?**__').setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
					.setDescription(timeOutString);
				await newMessage.edit(messageEmbed2);
				newMessage.reactions.removeAll();
			} else if (collected.first()!.emoji.name === '🤯' || collected.first()!.emoji.name === '🐍') {
				const number = Math.random() * 2;
				let completionString = '';
				completionString = newBetString;
				let newBalance = 0;
				const messageEmbed3 = new Discord.MessageEmbed();

				await guildMemberData.getFromDataBase();
				currencyAmount = guildMemberData.currency.wallet;

				if (betAmount > currencyAmount) {
					completionString += '\n\n__**Sorry, but you have insufficient funds in your wallet to place that wager!**__';

					messageEmbed3.setColor([255, 0, 0]).setDescription(completionString).setTimestamp(Date.now()).setTitle('__**Heads, or Tails!?**__')
						.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!);
					await newMessage.edit(messageEmbed3);
					newMessage.reactions.removeAll();
					return commandReturnData;
				}

				if ((number > 1 && collected.first()!.emoji.name === '🤯') || (number < 1 && collected.first()!.emoji.name === '🐍')) {
					await guildData.getFromDataBase();
					guildMemberData.currency.wallet += betAmount;
					await guildMemberData.writeToDataBase();
					guildData.casinoStats.totalPayout += betAmount;
					guildData.casinoStats.totalCoinFlipPayout += betAmount;
					if (betAmount > guildData.casinoStats.largestCoinFlipPayout.amount) {
						guildData.casinoStats.largestCoinFlipPayout.amount = betAmount;
						guildData.casinoStats.largestCoinFlipPayout.date = Date();
						guildData.casinoStats.largestCoinFlipPayout.userID = guildMemberData.id!;
						guildData.casinoStats.largestCoinFlipPayout.username = guildMemberData.userName!;
					}
					await guildData.writeToDataBase();
					newBalance = guildMemberData.currency.wallet;
					completionString += `\n\n__**NICELY DONE FAGGOT! YOU WON!**__\nYour new wallet balance is: ${newBalance} ${discordUser.userData.currencyName}`;

					messageEmbed.setColor([0, 255, 0]).setDescription(completionString).setTimestamp(Date.now()).setTitle('__**Heads, or Tails!?**__')
						.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!);
				} else if ((number < 1 && collected.first()!.emoji.name === '🤯') || (number > 1 && collected.first()!.emoji.name === '🐍')) {
					await guildData.getFromDataBase();
					guildMemberData.currency.wallet -= betAmount;
					await guildMemberData.writeToDataBase();
					guildData.casinoStats.totalPayout -= betAmount;
					guildData.casinoStats.totalCoinFlipPayout -= betAmount;
					await guildData.writeToDataBase();
					newBalance = guildMemberData.currency.wallet;
					completionString += `\n\n__**OWNED! YOU LOST, FUCKFACE!**__\nYour new wallet balance is: ${newBalance} ${discordUser.userData.currencyName}`;

					messageEmbed.setColor([255, 0, 0]).setDescription(completionString).setTimestamp(Date.now()).setTitle('__**Heads, or Tails!?**__')
						.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!);
				}
				await newMessage.edit(messageEmbed);
				newMessage.reactions.removeAll();
			}
			return commandReturnData;
		});
		return commandReturnData;
	} catch (error) {
		return new Promise((resolve, reject) => {
			reject(error);
		});
	}
}
command.function = execute;
export default command as FoundationClasses.BotCommand;
