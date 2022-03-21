// help.ts - Module for my help command.
// Jan 29, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import FoundationClasses from '../FoundationClasses';
import HelperFunctions from '../HelperFunctions';
import botCommands from '../CommandIndex';

const command: FoundationClasses.BotCommand = {
    name: 'help',
    description: 'Help Usage: !help, or !help = COMMANDNAME, in order to get help with a specific COMMAND.',
    function: Function()
};

/**
 * Returns a menu of helping information for the various commands I have.
 */
async function execute(commandData: FoundationClasses.CommandData): Promise<FoundationClasses.CommandReturnData> {
    try {
        const commandReturnData: FoundationClasses.CommandReturnData = {
            commandName: command.name
        };
        const commandFiles = botCommands;

        if (commandData.args[0] === undefined) {
            const commandNames: string[] = [];

            let currentIndex = 0;
            let msgString = '';
            msgString += '!help = COMMANDNAMEHERE\n\n__**List of command names:**__ ';

            commandFiles.forEach((value: FoundationClasses.BotCommand, key: string) => {
                commandNames[key as any] = value.name;
                msgString += commandNames[key as any];
                currentIndex += 1;
                if (currentIndex < commandFiles.size) {
                    msgString += ', ';
                }
            });

            const messageEmbed = new Discord.MessageEmbed();
            if (commandData.guildMember instanceof Discord.GuildMember) {
                messageEmbed
                    .setImage(commandData.guildMember.client.user!.avatarURL()!.toString())
                    .setTimestamp(Date() as unknown as Date)
                    .setAuthor(commandData.guildMember.client.user!.username, commandData.guildMember.client.user!.avatarURL()!)
                    .setTitle(`__**${commandData.guildMember.user.username} Help:**__`)
                    .setDescription(msgString)
                    .setColor([254, 254, 254]);
            }
            else if (commandData.guildMember instanceof Discord.User) {
                messageEmbed
                    .setImage(commandData.guildMember.client.user!.avatarURL()!.toString())
                    .setTimestamp(Date() as unknown as Date)
                    .setAuthor(commandData.guildMember.username, commandData.guildMember.avatarURL()!)
                    .setTitle(`__**${commandData.guildMember.username} Help:**__`)
                    .setDescription(msgString)
                    .setColor([254, 254, 254]);
            }
            
            if (commandData.guildMember instanceof Discord.User) {
                await HelperFunctions.sendMessageWithCorrectChannel(commandData, messageEmbed);
            }
            else if (commandData.guildMember instanceof Discord.GuildMember) {
                const dmChannel = await commandData.guildMember.user.createDM();
                await dmChannel.send(messageEmbed);
                const msgString = `------\n**I've sent you help info, via a message!**\n------`;
                let msgEmbed = new Discord.MessageEmbed()
				.setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL()!)
				.setColor([254, 254, 255])
				.setDescription(msgString)
				.setTimestamp(Date() as unknown as Date)
				.setTitle('__**Help:**__');
			await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
            }

            return commandReturnData;
        }

        let isFound = false;
        let commandDescription;
        let commandName = '';

        commandFiles.forEach((value: FoundationClasses.BotCommand) => {
            if (commandData.args[0] === value.name) {
                isFound = true;
                commandDescription = value.description;
                commandName = value.name;
            }
        });

        if (isFound === false) {
            const msgString = `------\n**Sorry, but that command was not found!**\n------`;
            let msgEmbed = new Discord.MessageEmbed()
				.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
				.setColor([254, 254, 254])
				.setDescription(msgString)
				.setTimestamp(Date() as unknown as Date)
				.setTitle('__**Command Issue:**__')
			await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
            return commandReturnData;
        }

        if ((commandDescription as unknown as Discord.MessageEmbed) instanceof Discord.MessageEmbed) {
            (commandDescription as unknown as Discord.MessageEmbed)
                .setAuthor(commandData.guildMember!.client.user!.username,
                commandData.guildMember!.client.user!.avatarURL()!)
                .setColor([254, 254, 254])
                .setTitle(`__**${commandName.charAt(0).toUpperCase() + commandName.slice(1)} Help:**__`)
                .setTimestamp(Date() as unknown as Date);
            await HelperFunctions.sendMessageWithCorrectChannel(commandData, commandDescription as unknown as Discord.MessageEmbed);
        } 
        else {
            const messageEmbed = new Discord.MessageEmbed();
            if (commandData.guildMember instanceof Discord.GuildMember) {
                messageEmbed
                    .setDescription(commandDescription)
                    .setTimestamp(Date() as unknown as Date)
                    .setAuthor(commandData.guildMember.client.user!.username, commandData.guildMember.client.user!.avatarURL()!)
                    .setTitle(`__**${commandName.charAt(0).toUpperCase() + commandName.slice(1)} Help:**__`)
                    .setColor([254, 254, 254]);
            }
            else if (commandData.guildMember instanceof Discord.User) {
                messageEmbed
                    .setDescription(commandDescription)
                    .setTimestamp(Date() as unknown as Date)
                    .setAuthor(commandData.guildMember.username, commandData.guildMember.avatarURL()!)
                    .setTitle(`__**${commandName.charAt(0).toUpperCase() + commandName.slice(1)} Help:**__`)
                    .setColor([254, 254, 254]);
            }
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
