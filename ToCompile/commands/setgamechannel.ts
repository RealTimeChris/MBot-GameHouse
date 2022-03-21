// setgamechannel.ts - Module for my "set game channel" command.
// Feb 19, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import FoundationClasses from '../FoundationClasses';
import DiscordUser from '../DiscordUser';
import GuildData from '../GuildData';
import HelperFunctions from '../HelperFunctions';

const command: FoundationClasses.BotCommand = {
	name: 'setgamechannel',
	description: '__**Set Game Channel Usage**__ !setgamechannel = ADD or !setgamechannel = REMOVE in the channel you would like to add/remove.'
	+ ' Also !setgamechannel = PURGE to remove all channels, or just !setgamechannel to view the currently enabled channels!',
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

		const doWeHaveAdminPermission = await HelperFunctions.doWeHaveAdminPermission(commandData, discordUser);

		if (doWeHaveAdminPermission === false) {
			return commandReturnData;
		}

		const guildData = new GuildData({dataBase: discordUser.dataBase, id: commandData.guild!.id, memberCount: commandData.guild!.memberCount, name: commandData.guild!.name});
		await guildData.getFromDataBase();

		if (commandData.args[0] === undefined) {
			let msgString = '__You have the following channels enabled for gaming, on this server:__\n------\n';

			for (let x = 0; x < guildData.gameChannelIDs.length; x += 1) {
				const currentID = guildData.gameChannelIDs[x];

				msgString += `__**Channel #${x}:**__ <#${currentID}>\n`;
			}

			msgString += '------\n';

			const messageEmbed = new Discord.MessageEmbed();
			messageEmbed
				.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
				.setColor(guildData.borderColor as [number, number, number])
				.setTimestamp(Date.now())
				.setTitle('__**Game Channels Enabled:**__')
				.setDescription(msgString);
			await HelperFunctions.sendMessageWithCorrectChannel(commandData, messageEmbed);
			return commandReturnData;
		}
		if (commandData.args[0].toLowerCase() !== 'add' && commandData.args[0].toLowerCase() !== 'remove' && commandData.args[0].toLowerCase() !== 'purge' && commandData.args[0].toLowerCase() !== 'view') {
			const msgString = `------\n**Please enter either 'add', 'remove', or 'purge' only! (!setgamechannel = ADDorREMOVEorPURGE)**\n------`;
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
		if (commandData.args[0].toLowerCase() === 'add') {
			const currentGuild = commandData.guild!;

			const newGameChannel = currentGuild.channels.resolve(commandData.fromTextChannel!.id);

			if (newGameChannel == null) {
				const msgString = `------\n**Sorry, but that channel could not be found!**\n------`;
				let msgEmbed = new Discord.MessageEmbed()
					.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
					.setColor(guildData.borderColor as [number, number, number])
					.setDescription(msgString)
					.setTimestamp(Date() as unknown as Date)
					.setTitle('__**Channel Issue:**__')
				let msg = await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
				if (commandData.toTextChannel instanceof Discord.WebhookClient) {
					msg = new Discord.Message(commandData.guild!.client, msg, commandData.fromTextChannel!);
				}
				await msg.delete({timeout: 20000});
				return commandReturnData;
			}

			const channelID = commandData.fromTextChannel!.id;
			for (let x = 0; x < guildData.gameChannelIDs.length; x += 1) {
				if (channelID === guildData.gameChannelIDs[x]) {
					const msgString = `------\n**That channel is already on the list of enabled channels!**\n------`;
					let msgEmbed = new Discord.MessageEmbed()
						.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
						.setColor(guildData.borderColor as [number, number, number])
						.setDescription(msgString)
						.setTimestamp(Date() as unknown as Date)
						.setTitle('__**Already Listed:**__')
					let msg = await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
					if (commandData.toTextChannel instanceof Discord.WebhookClient) {
						msg = new Discord.Message(commandData.guild!.client, msg, commandData.fromTextChannel!);
					}
					await msg.delete({timeout: 20000});
					return commandReturnData;
				}
			}

			guildData.gameChannelIDs.push(channelID);
			await guildData.writeToDataBase();

			const messageEmbed = new Discord.MessageEmbed();
			messageEmbed
				.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
				.setColor(guildData.borderColor as [number, number, number])
				.setTimestamp(Date.now())
				.setTitle('__**Game Channel Added:**__')
				.setDescription(`**You've succesfully added <#${channelID}> to your list of accepted game channels!**`);
				await HelperFunctions.sendMessageWithCorrectChannel(commandData, messageEmbed);
			return commandReturnData;
		}
		if (commandData.args[0].toLowerCase() === 'remove') {
			let channelID = '';
			channelID = commandData.fromTextChannel!.id;

			let msgString = '';
			let isItPresent = false;
			for (let x = 0; x < guildData.gameChannelIDs.length; x += 1) {
				if (channelID === guildData.gameChannelIDs[x]) {
					isItPresent = true;
					guildData.gameChannelIDs.splice(x, 1);
					await guildData.writeToDataBase();
					msgString += `You've succesfully removed the channel <#${channelID}> from the list of enabled gaming channels!`;
				}
			}

			if (isItPresent === false) {
				const msgString = `------\n**That channel is not present on the list of enabled gaming channels!**\n------`;
				let msgEmbed = new Discord.MessageEmbed()
					.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
					.setColor(guildData.borderColor as [number, number, number])
					.setDescription(msgString)
					.setTimestamp(Date() as unknown as Date)
					.setTitle('__**Missing from List:**__')
				let msg = await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
				if (commandData.toTextChannel instanceof Discord.WebhookClient) {
					msg = new Discord.Message(commandData.guild!.client, msg, commandData.fromTextChannel!);
				}
				await msg.delete({timeout: 20000});
				return commandReturnData;
			}

			const messageEmbed = new Discord.MessageEmbed();
			messageEmbed
				.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
				.setColor(guildData.borderColor as [number, number, number])
				.setTimestamp(Date.now())
				.setTitle('__**Game Channel Removed:**__')
				.setDescription(msgString);
			await HelperFunctions.sendMessageWithCorrectChannel(commandData, messageEmbed);
			return commandReturnData;
		}
		if (commandData.args[0].toLowerCase() === 'purge') {
			let msgString = '';

			if (guildData.gameChannelIDs.length > 0) {
				msgString = "__You've removed the following channels from your list of 'enabled game channels:__\n------\n";

				for (let x = 0; x < guildData.gameChannelIDs.length; x += 1) {
					const currentID = guildData.gameChannelIDs[x];

					msgString += `__**Channel #${x}:**__ <#${currentID}>\n`;
				}

				msgString += '------\n__**The games will now work in ANY CHANNEL!**__';

				guildData.gameChannelIDs = [];
				await guildData.writeToDataBase();
			} else {
				msgString += '**Sorry, but there are no channels to remove!**';
			}

			const messageEmbed = new Discord.MessageEmbed();
			messageEmbed
				.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
				.setColor(guildData.borderColor as [number, number, number])
				.setTimestamp(Date.now())
				.setTitle('__**Game Channels Removed:**__')
				.setDescription(msgString);
			await HelperFunctions.sendMessageWithCorrectChannel(commandData, messageEmbed);
			return commandReturnData;
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
