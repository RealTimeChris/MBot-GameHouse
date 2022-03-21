// listdbguilds.ts - Module for my "list db guilds" command.
// Mar 21, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import FoundationClasses from '../FoundationClasses';
import DiscordUser from '../DiscordUser';
import GuildData from '../GuildData';
import HelperFunctions from '../HelperFunctions';

const command: FoundationClasses.BotCommand = {
	name: 'listdbguilds',
	description: '!listdbguilds, to list guilds that this bot is no longer in!',
	function: Function()
};

async function execute(commandData: FoundationClasses.CommandData, discordUser: DiscordUser): Promise<FoundationClasses.CommandReturnData> {
	try {
		const commandReturnData: FoundationClasses.CommandReturnData = {
			commandName: command.name
		};
		
        const areWeInADM = await HelperFunctions.areWeInADM(commandData);

        if (areWeInADM) {
            return commandReturnData;
        }

		const areWeAnAdmin = await HelperFunctions.doWeHaveAdminPermission(commandData, discordUser);

		if (!areWeAnAdmin) {
			return commandReturnData;
		}

		const guildData = new GuildData({dataBase: discordUser.dataBase, id: commandData.guild!.id, memberCount: commandData.guild!.memberCount, name: commandData.guild!.name});
		await guildData.getFromDataBase();

		if (commandData.args[0] === undefined) {
			const msgString = '------\n**Please, enter a bot to list the keys from! (!listdbguilds = BOTNAME)**\n------';
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
		}
		if (commandData.args[0].toLowerCase() !== 'janny' && commandData.args[0].toLowerCase() !== 'musichouse' && commandData.args[0].toLowerCase() !== 'gamehouse') {
			const msgString = '------\n**Please, enter a bot to list the keys from! (!listdbguilds = BOTNAME)**\n------';
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
		}
		if (commandData.args[0].toLowerCase() !== 'gamehouse') {
			return commandReturnData;
		}

		const guildsArray = commandData.guildMember!.client.guilds.cache.array();

        const iterator = discordUser.dataBase.iterate({});
		let areAnyFound = false;
		let msgString = '------\n';
        for await (const {key, value} of iterator) {
            if (key.length === 18 && key !== discordUser.userData.userID) {
                let isItFound = false;
                for (let x = 0; x < guildsArray.length; x += 1) {
                    if (key === guildsArray[x]!.id) {
                        isItFound = true;
                    }
                }
				const newValue = value;
                if (isItFound === false) {
					areAnyFound = true;
                    msgString += `__**Key/Guild ID:**__ ${key} __**Guild Name:**__ ${newValue.guildName}\n`;
					
                }
            }
        }
		if (areAnyFound) {
			msgString += '\n------';
			await iterator.end();
			let msgEmbed = new Discord.MessageEmbed()
					.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
					.setColor(guildData.borderColor as [number, number, number])
					.setDescription(msgString)
					.setTimestamp(Date() as unknown as Date)
					.setTitle('__**Depracated Database Entries:**__');
			await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
		}		
        
		if (!areAnyFound) {
			const msgEmbed = new Discord.MessageEmbed();
			msgEmbed
				.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
				.setColor(guildData.borderColor as [number, number, number])
				.setDescription("------\n__**Looks like there's no unused database entries!**__\n------")
				.setTimestamp((Date() as unknown) as Date)
				.setTitle("__**No Spare Database Entries:**__");
			await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
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
