// leaderboard.ts - Module for my "show leaderboard" command.
// Feb 8, 2021
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
	name: 'leaderboard',
	description: '__**Leaderboard Usage:**__ !leaderboard',	
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

		if (!(commandData.fromTextChannel as Discord.TextChannel).permissionsFor(commandData.guild?.client.user as Discord.User)?.has('MANAGE_MESSAGES')) {
			const msgString = `------\n**I need the Manage Messages permission in this channel, for this command!**\n------`;
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

		let minIdx = 0;
		let temp: GuildMemberData;
		const membersArray: GuildMemberData[] = [];
		GuildMemberData.guildMembersData.forEach((guildMember, key) => {
			if (key.includes(commandData.guild!.id)) {
				membersArray.push(guildMember);
			}
		});

		const len = guildData.memberCount;
		for (let x = 0; x < len!; x += 1) {
			minIdx = x;
			for (let y = x + 1; y < len!; y += 1) {
				if (membersArray[y]!.currency.wallet > membersArray[minIdx]!.currency.wallet) {
					minIdx = y;
				}
			}
			temp = membersArray[x]!;
			membersArray[x] = membersArray[minIdx]!;
			membersArray[minIdx] = temp;
		}

		const membersPerPage = 20;
		let totalPageCount = 0;
		if (guildData.memberCount! % membersPerPage > 0) {
			totalPageCount = Math.trunc(guildData.memberCount! / membersPerPage) + 1;
		} else {
			totalPageCount = Math.trunc(guildData.memberCount! / membersPerPage);
		}
		let currentPage = 0;
		const pageEmbeds = [new Discord.MessageEmbed()];
		pageEmbeds.length = 0;
		const pageStrings: string[] = [];
		pageStrings.length = 0;

		for (let x = 0; x < guildData.memberCount!; x += 1) {
			if (x % membersPerPage === 0) {
				pageEmbeds.length += 1;
				pageEmbeds[currentPage] = new Discord.MessageEmbed();
				pageStrings.length += 1;
				pageStrings[currentPage] = '';
			}

			let msgString = '';
			msgString += `__**#${currentPage * membersPerPage + ((x % membersPerPage) + 1)} |Name:**__ ${membersArray[x]!.userName} __**|${discordUser.userData.currencyName}:**__ ${
				membersArray[x]!.currency.wallet}\n`;

			pageStrings[currentPage] += msgString;
			if (x % membersPerPage === membersPerPage - 1 || x === guildData.memberCount! - 1) {
				pageEmbeds[currentPage]!
					.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
					.setDescription(pageStrings[currentPage])
					.setTimestamp(Date.now())
					.setTitle(`__**Leaderboard (Wallet) (Page ${currentPage + 1} of ${totalPageCount})**__`)
					.setColor(guildData.borderColor as [number, number, number]);
				currentPage += 1;
			}
		}

		const currentPageIndex = 0;
		const userID = commandData.guildMember!.id;
		let newMessage = await HelperFunctions.sendMessageWithCorrectChannel(commandData, pageEmbeds[currentPageIndex]!);
		if (commandData.toTextChannel instanceof Discord.WebhookClient) {
			newMessage = new Discord.Message(commandData.guild!.client, newMessage, commandData.fromTextChannel!);
		}		
		await HelperFunctions.recurseThroughMessagePages(userID, newMessage,
			currentPageIndex, pageEmbeds, true);
		await guildData.writeToDataBase();
		return commandReturnData;
	} catch (error) {
		return new Promise((resolve, reject) => {
			reject(error);
		});
	}
}
command.function = execute;
export default command as FoundationClasses.BotCommand;
