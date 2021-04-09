// selldrugs.ts - Module for my sell drugs command.
// Feb 1, 2021
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
	name: 'selldrugs',
	description: "__**Sell Drugs Usage**__: Enter !selldrugs, that's it!",
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

		const currentTime = new Date().getTime();
		const msPerWorkCycle = discordUser.userData.hoursOfDrugSaleCooldown * 60 * 60 * 1000;
		const msPerSecond = 1000;
		const msPerMinute = 60 * msPerSecond;
		const msPerHour = 60 * msPerMinute;

		const guildMemberData = new GuildMemberData({dataBase: discordUser.dataBase, id: commandData.guildMember!.id, guildId: commandData.guild!.id,
            userName: (commandData.guildMember as Discord.GuildMember)!.user.username, displayName: (commandData.guildMember as Discord.GuildMember).displayName});
		await guildMemberData.getFromDataBase();

		let lastTimeWorked = 0;
		lastTimeWorked = guildMemberData.lastTimeWorked!;

		const timeDifference = currentTime - lastTimeWorked;

		const guildData = new GuildData({dataBase: discordUser.dataBase, id: commandData.guild!.id, memberCount: commandData.guild!.memberCount, name: commandData.guild!.name});
		await guildData.getFromDataBase();

		if (timeDifference >= msPerWorkCycle) {
			const amountEarned = Math.trunc(Math.random() * 5000);

			guildMemberData.currency!.wallet! += amountEarned;
			await guildMemberData.writeToDataBase();

			let msgString = '';
			msgString += `You've been busy dealing drugs... and you've earned ${amountEarned} ${discordUser.userData.currencyName}.\nNice job and watch out for cops!\nYour new wallet balance is: `;
			msgString += `${guildMemberData.currency!.wallet!} ${discordUser.userData.currencyName}`;
			const messageEmbed = new Discord.MessageEmbed().setAuthor((commandData.guildMember as Discord.GuildMember).user.username,
			(commandData.guildMember as Discord.GuildMember).user.avatarURL()!).setTimestamp(Date.now()).setDescription(msgString)
				.setTitle('__**Drug Dealing:**__')
				.setColor(guildData.borderColor as [number, number, number]);
			await HelperFunctions.sendMessageWithCorrectChannel(commandData, messageEmbed);
			guildMemberData.lastTimeWorked = new Date().getTime();
			await guildMemberData.writeToDataBase();
		} else {
			const timeLeft = msPerWorkCycle - timeDifference;
			const hoursLeft = Math.trunc(timeLeft / msPerHour);
			const minutesLeft = Math.trunc((timeLeft % msPerHour) / msPerMinute);
			const secondsLeft = Math.trunc(((timeLeft % msPerHour) % msPerMinute) / msPerSecond);

			let msgString = '';
			if (hoursLeft > 0) {
				msgString += `Sorry, but you need to wait ${hoursLeft} hours, ${minutesLeft} minutes, and ${secondsLeft} seconds before you can get paid again!`;
			} else if (minutesLeft > 0) {
				msgString += `Sorry, but you need to wait ${minutesLeft} minutes, and ${secondsLeft} seconds before you can get paid again!`;
			} else {
				msgString += `Sorry, but you need to wait ${secondsLeft} seconds before you can get paid again!`;
			}

			const messageEmbed = new Discord.MessageEmbed()
				.setAuthor((commandData.guildMember as Discord.GuildMember).user.username,(commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
				.setTimestamp(Date.now()).setDescription(msgString)
				.setTitle('__**Drug Dealing:**__')
				.setColor(guildData.borderColor as [number, number, number])
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
