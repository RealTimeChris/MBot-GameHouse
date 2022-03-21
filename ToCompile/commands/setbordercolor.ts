// setbordercolor.ts - Module for my "set border color" command.
// Apr 3, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import FoundationClasses from '../FoundationClasses';
import DiscordUser from '../DiscordUser';
import GuildData from '../GuildData';
import HelperFunctions from '../HelperFunctions';

const command: FoundationClasses.BotCommand = {
    name: 'setbordercolor',
    description: '__**Set Border Color Usage:**__ Sets the default color of the borders of the chat messages sent out by this bot! '+
    '!setbordercolor = BOTNAME, BOTCOLORREDCHANNEL, BOTCOLORGREENCHANNEL, BOTCOLORBLUECHANNEL where botcolor is an array of 3 color values between 0 and 255.',
    function: Function()
};

async function execute(commandData: FoundationClasses.CommandData, discordUser: DiscordUser): Promise<FoundationClasses.CommandReturnData> {
    try{
        const commandReturnData: FoundationClasses.CommandReturnData = {
            commandName: command.name
        };

        let areWeInADM = await HelperFunctions.areWeInADM(commandData);

        if (areWeInADM) {
            return commandReturnData;
        }
        
        const guildData = new GuildData({dataBase: discordUser.dataBase, id: commandData.guild!.id, memberCount: commandData.guild!.memberCount, name: commandData.guild!.name});
        await guildData.getFromDataBase();

        const borderColor: number[] = [];
        if (commandData.args[0] === undefined || (commandData.args[0].toLowerCase() !== 'janny' && commandData.args[0].toLowerCase() !== 'gamehouse' && commandData.args[0] !== 'musichouse')) {
            const msgString = `------\n**Please, enter a bot's name as the first argument to this command! (!setbordercolor = BOTNAME, BOTCOLORREDCHANNEL, BOTCOLORGREENCHANNEL, BOTCOLORBLUECHANNEL)**\n------`;
            const msgEmbed = new Discord.MessageEmbed();
            msgEmbed
                .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
                .setColor(guildData.borderColor as [number, number, number])
                .setDescription(msgString)
                .setTimestamp(Date() as unknown as Date)
                .setTitle("__**Missing Or Invalid Arguments:**__");
            await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
            return commandReturnData;
        }
        else if (commandData.args[0].toLowerCase() !== 'gamehouse') {
            return commandReturnData;
        }
        if (parseInt(commandData.args[1]!, 10) > 255 || parseInt(commandData.args[1]!, 10) < 0 || commandData.args[1] === undefined) {
            const msgString = `------\n**Please, enter a red-channel value between 0 and 255! (!setbordercolor = BOTNAME, BOTCOLORREDCHANNEL, BOTCOLORGREENCHANNEL, BOTCOLORBLUECHANNEL)**\n------`;
            const msgEmbed = new Discord.MessageEmbed();
            msgEmbed
                .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
                .setColor(guildData.borderColor as [number, number, number])
                .setDescription(msgString)
                .setTimestamp(Date() as unknown as Date)
                .setTitle("__**Missing Or Invalid Arguments:**__");
            await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
            return commandReturnData;
        }
        else if (parseInt(commandData.args[2]!, 10) > 255 || parseInt(commandData.args[2]!, 10) < 0 || commandData.args[2] === undefined) {
            const msgString = `------\n**Please, enter a green-channel value between 0 and 255! (!setbordercolor = BOTNAME, BOTCOLORREDCHANNEL, BOTCOLORGREENCHANNEL, BOTCOLORBLUECHANNEL)**\n------`;
            const msgEmbed = new Discord.MessageEmbed();
            msgEmbed
                .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
                .setColor(guildData.borderColor as [number, number, number])
                .setDescription(msgString)
                .setTimestamp(Date() as unknown as Date)
                .setTitle("__**Missing Or Invalid Arguments:**__");
            await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
            return commandReturnData;
        }
        else if (parseInt(commandData.args[3]!, 10) > 255 || parseInt(commandData.args[3]!, 10) < 0 || commandData.args[3] === undefined) {
            const msgString = `------\n**Please, enter a green-channel value between 0 and 255! (!setbordercolor = BOTNAME, BOTCOLORREDCHANNEL, BOTCOLORGREENCHANNEL, BOTCOLORBLUECHANNEL)**\n------`;
            const msgEmbed = new Discord.MessageEmbed();
            msgEmbed
                .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
                .setColor(guildData.borderColor as [number, number, number])
                .setDescription(msgString)
                .setTimestamp(Date() as unknown as Date)
                .setTitle("__**Missing Or Invalid Arguments:**__");
            await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
            return commandReturnData;
        }
        else {
            borderColor[0] = parseInt(commandData.args[1]!, 10);
            if (borderColor[0] === 255) {
                borderColor[0] = 254;
            }
            borderColor[1] = parseInt(commandData.args[2]!, 10);
            if (borderColor[1] === 255) {
                borderColor[1] = 254;
            }
            borderColor[2] = parseInt(commandData.args[3]!, 10);
            if (borderColor[2] === 255) {
                borderColor[2] = 254;
            }
        }
 
        guildData.borderColor = borderColor as [number, number, number];
        await guildData.writeToDataBase();

        const msgEmbed = new Discord.MessageEmbed();
        msgEmbed
            .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
            .setColor(guildData.borderColor as [number, number, number])
            .setDescription(`Nicely done, you've updated the default border color for this bot!\n------\n__**Border Color Values:**__ ${guildData.borderColor}\n------`)
            .setTimestamp(Date() as unknown as Date)
            .setTitle('__**Updated Border Color:**__');
        await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
        return commandReturnData;
    }
    catch(error) {
        return new Promise((resolve, reject) => {
            reject(error);
        })
    }

}
command.function = execute;
export default command as FoundationClasses.BotCommand;
