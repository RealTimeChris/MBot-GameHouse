// casinostats.ts - Module for my 'casino stats' command.
// Mar 19, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import FoundationClasses from '../FoundationClasses';
import DiscordUser from '../DiscordUser';
import GuildData from '../GuildData';
import HelperFunctions from '../HelperFunctions';

const command: FoundationClasses.BotCommand = {
	name: 'casinostats',
	description: '__**Casino Stats Usage:**__ !casinostats',
	function: Function()
};

async function execute(commandData: FoundationClasses.CommandData, discordUser: DiscordUser): Promise<FoundationClasses.CommandReturnData> {
	try {
		const commandReturnData: FoundationClasses.CommandReturnData = {
			commandName: command.name
		};
		
		const areWeAllowedHere = await HelperFunctions.checkIfAllowedInChannel(commandData, discordUser);

		if (!areWeAllowedHere) {
			return commandReturnData;
		}

		const guildData = new GuildData({dataBase: discordUser.dataBase, id: commandData.guild!.id, memberCount: commandData.guild!.memberCount, name: commandData.guild!.name});
		await guildData.getFromDataBase();

		const userData = await discordUser.getUserDataFromDB(commandData.guild!.client);
		const fields = [];
		const field1 = {
			name: '__**Largest Coinflip Payout:**__',
			value: `__User:__ <@!${guildData.casinoStats.largestCoinFlipPayout.userID}> (${guildData.casinoStats.largestCoinFlipPayout.username})
			__Amount:__ ${guildData.casinoStats.largestCoinFlipPayout.amount} ${userData.currencyName}\n__Date:__ ${guildData.casinoStats.largestCoinFlipPayout.date}`,
			inline: true,
		};
		fields.push(field1);
		const field2 = {
			name: '__**Largest Roulette Payout:**__',
			value: `__User:__ <@!${guildData.casinoStats.largestRoulettePayout.userID}> (${guildData.casinoStats.largestRoulettePayout.username})
			__Amount:__ ${guildData.casinoStats.largestRoulettePayout.amount} ${userData.currencyName}\n__Date:__ ${guildData.casinoStats.largestRoulettePayout.date}`,
			inline: true,
		};
		fields.push(field2);
		const field3 = {
			name: '__**Largest Blackjack Payout:**__',
			value: `__User:__ <@!${guildData.casinoStats.largestBlackjackPayout.userID}> (${guildData.casinoStats.largestBlackjackPayout.username})
			__Amount:__ ${guildData.casinoStats.largestBlackjackPayout.amount} ${userData.currencyName}\n__Date:__ ${guildData.casinoStats.largestBlackjackPayout.date}`,
			inline: true,
		};
		fields.push(field3);
		const field4 = {
			name: '__**Largest Slots Payout:**__',
			value: `__User:__ <@!${guildData.casinoStats.largestSlotsPayout.userID}> (${guildData.casinoStats.largestSlotsPayout.username})
			__Amount:__ ${guildData.casinoStats.largestSlotsPayout.amount} ${userData.currencyName}\n__Date:__ ${guildData.casinoStats.largestSlotsPayout.date}`,
			inline: true,
		};
		fields.push(field4);
		const field5 = {
			name: '__**Net Coinflip Payout:**__',
			value: `__Amount:__ ${guildData.casinoStats.totalCoinFlipPayout} ${userData.currencyName}`,
			inline: true,
		};
		fields.push(field5);
		const field6 = {
			name: '__**Net Roulette Payout:**__',
			value: `__Amount:__ ${guildData.casinoStats.totalRoulettePayout} ${userData.currencyName}`,
			inline: true,
		};
		fields.push(field6);
		const field7 = {
			name: '__**Net Blackjack Payout:**__',
			value: `__Amount:__ ${guildData.casinoStats.totalBlackjackPayout} ${userData.currencyName}`,
			inline: true,
		};
		fields.push(field7);
		const field8 = {
			name: '__**Net Slots Payout:**__',
			value: `__Amount:__ ${guildData.casinoStats.totalSlotsPayout} ${userData.currencyName}`,
			inline: true,
		};
		fields.push(field8);
		
		const msgEmbed = new Discord.MessageEmbed();
		msgEmbed.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
			.setColor(guildData.borderColor as [number, number, number])
			.setTimestamp(Date.now())
			.setDescription(`__**Net Casino Payout:**__\n__Amount:__ ${guildData.casinoStats.totalPayout} ${userData.currencyName}`)
			.setTitle('__**Server Casino Stats:**__');
		msgEmbed.fields = fields;

		await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
		return commandReturnData;
	} catch (error) {
		return new Promise((resolve, reject) => {
			reject(error);
		});
	}
}
command.function = execute;
export default command as FoundationClasses.BotCommand;
