// HelperFunctions.ts - Module for my "helper functions".
// Apr 4, 2021
// Chris M.
// https://github.com/RealTimeChris

"use strict";

import Discord = require('discord.js');
import FoundationClasses from './FoundationClasses';
import DiscordUser from './DiscordUser';
import GuildData from './GuildData';

module HelperFunctions {
    /**
     * Function for sending out a message, using the appropriate channel.
     */
    export async function sendMessageWithCorrectChannel(commandData: FoundationClasses.CommandData, messageContents: String | Discord.MessageEmbed, atUserID: string | null = null): Promise<Discord.Message> {
        try{
            let returnMessage: Discord.Message;
            if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                if (atUserID !== null && messageContents instanceof Discord.MessageEmbed) {
                    const msgEmbeds: Discord.MessageEmbed[] = [];
                    msgEmbeds.push(messageContents);
                    returnMessage = await commandData.toTextChannel.send(`<@!${atUserID}>`, {embeds: msgEmbeds, split: false});
                }
                else if (atUserID === null) {
                    returnMessage = await commandData.toTextChannel.send(messageContents as string | Discord.MessageEmbed);
                }
                else{
                    returnMessage = await commandData.toTextChannel.send(`<@!${atUserID}> ${messageContents}`);
                }
            }
            else if (commandData.toTextChannel instanceof Discord.TextChannel) {
                if (atUserID !== null && messageContents instanceof Discord.MessageEmbed) {
                    returnMessage = await commandData.toTextChannel.send(`<@!${atUserID}>`, {embed: messageContents});
                }
                else if (atUserID === null) {
                    returnMessage = await commandData.toTextChannel.send(messageContents as string | Discord.MessageEmbed);
                }
                else{
                    returnMessage = await commandData.toTextChannel.send(`<@!${atUserID}> ${messageContents}`);
                }			
            }
            else if (commandData.toTextChannel instanceof Discord.DMChannel) {
                returnMessage = await commandData.toTextChannel.send(messageContents as string | Discord.MessageEmbed);
            }

            return returnMessage!;
        }
        catch(error) {
            return new Promise((resolve, reject) => {
                reject(error);
            })
        }
    }

    /**
     * Applies an asymptotic transform function onto an input value,
     * capping it out at the ceiling value.
     */
    export function applyAsymptoticTransform(inputModValue: number, horizontalStretch: number, ceiling: number): number {
        let finalModValue = 0;
        let newInputModValue = inputModValue;
        if (newInputModValue === 0) {
            newInputModValue += 1;
        }
        if (newInputModValue <= 0) {
            const newInputValue = newInputModValue * -1;

            finalModValue = -1 * Math.trunc((ceiling * newInputValue ** 3)
            / (newInputValue ** 3 + horizontalStretch * newInputValue));
            return finalModValue;
        }

        finalModValue = Math.trunc((ceiling * newInputModValue ** 3)
            / (newInputModValue ** 3 + horizontalStretch * newInputModValue));

        return finalModValue;
    }

    /**
     * Recurses through a succession of messages.
     */
    export async function recurseThroughMessagePages(userID: string, message: Discord.Message,
        currentPageIndex: number, messageEmbeds: Discord.MessageEmbed[], deleteAfter: boolean): Promise<void> {
        let newCurrentPageIndex = currentPageIndex;
        try {
            message.react('◀️');
            message.react('▶️');
            message.react('❌');
            const filter = (reaction: Discord.MessageReaction, user: Discord.User) => (reaction.emoji.name === '◀️' || reaction.emoji.name === '▶️' || reaction.emoji.name === '❌') && user.id === userID;
            const reactionCollector = message.createReactionCollector(filter, { time: 120000 });
            reactionCollector.on('collect', async (reaction) => {
                reactionCollector.resetTimer({ time: 120000 });
                if (reaction.emoji.name === '❌') {
                    reactionCollector.stop('User exited.');
                } else if (reaction.emoji.name === '▶️' && (newCurrentPageIndex === (messageEmbeds.length - 1))) {
                    reaction.users.remove(userID);
                    newCurrentPageIndex = 0;
                    const messageEmbed = messageEmbeds[newCurrentPageIndex];
                    await message.edit(messageEmbed!);
                } else if (reaction.emoji.name === '▶️' && (newCurrentPageIndex < messageEmbeds.length)) {
                    reaction.users.remove(userID);
                    newCurrentPageIndex += 1;
                    const messageEmbed = messageEmbeds[newCurrentPageIndex];
                    await message.edit(messageEmbed!);
                } else if (reaction.emoji.name === '◀️' && (newCurrentPageIndex > 0)) {
                    reaction.users.remove(userID);
                    newCurrentPageIndex -= 1;
                    const messageEmbed = messageEmbeds[newCurrentPageIndex];
                    await message.edit(messageEmbed!);
                } else if (reaction.emoji.name === '◀️' && (newCurrentPageIndex === 0)) {
                    reaction.users.remove(userID);
                    newCurrentPageIndex = messageEmbeds.length - 1;
                    const messageEmbed = messageEmbeds[newCurrentPageIndex];
                    await message.edit(messageEmbed!);
                }
            });

            reactionCollector.on('end', async () => {
                if (deleteAfter === true) {
                    if (message.deletable) {
                        await message.delete();
                    }
                } else {
                    await message.reactions.removeAll();
                }
            });
            return;
        } catch (error) {
            return new Promise((resolve, reject) => {
                reject(error);
            });
        }
    }

    /**
     * Checks a user ID against an array of user IDs to see if it is present.
     */
     export async function checkForBotCommanderStatus(userID: string, commanderIDs: string[]): Promise<boolean> {
        let isCommander = false;
        for (let x = 0; x < commanderIDs.length; x += 1) {
            if (userID === commanderIDs[x]) {
                isCommander = true;
                break;
            }
        }
        return isCommander;
    }

    /**
     * Checks to see if we're in a DM channel, and sends a warning message if so.
     */
    export async function areWeInADM(commandData: FoundationClasses.CommandData): Promise<boolean> {
        try { 
            const currentChannelType = commandData.fromTextChannelType;

            if (currentChannelType === 'dm') {
                const msgString = `------\n**Sorry, but we can't do that in a direct message!**\n------`;
                const msgEmbed = new Discord.MessageEmbed();
                msgEmbed
                    .setAuthor((commandData.guildMember as Discord.User).username, (commandData.guildMember as Discord.User).avatarURL()!)
                    .setColor([254, 254, 254])
                    .setDescription(msgString)
                    .setTimestamp(Date() as unknown as Date)
                    .setTitle('__**Direct Message Issue:**__');
                let msg = await sendMessageWithCorrectChannel(commandData, msgEmbed);
                if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                    msg = new Discord.Message(commandData.guildMember!.client, msg, commandData.fromTextChannel!);
                }
                msg.delete({timeout: 20000});
                
                return true;
            }
            return false;
        } catch (error) {
            return new Promise((resolve, reject) => {
                reject(error);
            });
        }
    }

    /**
     * Checks if we have admin permissions in the current channel.
     */
    export async function doWeHaveAdminPermission(commandData: FoundationClasses.CommandData, discordUser: DiscordUser): Promise<boolean> {
        try {
            const guildData = new GuildData({dataBase: discordUser.dataBase, id: commandData.guild!.id, memberCount: commandData.guild!.memberCount, name:commandData.guild!.name});
            await guildData.getFromDataBase();

            const currentChannelPermissions = (commandData.guildMember as Discord.GuildMember).permissionsIn(commandData.permsChannel!);

            const permissionStrings = 'ADMINISTRATOR';

            const areTheyAnAdmin = currentChannelPermissions.has(permissionStrings);

            const areTheyACommander = await checkForBotCommanderStatus(commandData.guildMember!.id,
            discordUser.userData.botCommanders);

            if (areTheyAnAdmin === true || areTheyACommander === true) {
                return true;
            }

            const msgString = `------\n**Sorry, but you don't have the permissions required for that!**\n------`
            const msgEmbed = new Discord.MessageEmbed();
            msgEmbed
                .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
                .setColor(guildData.borderColor as [number, number, number])
                .setDescription(msgString)
                .setTimestamp(Date() as unknown as Date)
                .setTitle("__**Permissions Issue:**__");
            let msg = await sendMessageWithCorrectChannel(commandData, msgEmbed);
            if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                msg = new Discord.Message(commandData.guildMember!.client, msg, commandData.fromTextChannel!);
            }
            await msg.delete({timeout:20000});
            return false;
        } catch (error) {
            return new Promise((resolve, reject) => {
                reject(error);
            });
        }
    }
    /**
    * Checks to see if we are allowed to use a given channel for given activities.
    */
    export async function checkIfAllowedInChannel(commandData: FoundationClasses.CommandData, discordUser: DiscordUser): Promise<boolean> {
        try {
            const guildData = new GuildData({dataBase: discordUser.dataBase, id: commandData.guild!.id, memberCount: commandData.guild!.memberCount, name: commandData.guild!.name});
            await guildData.getFromDataBase();
            
            let isItFound = true;
            if (guildData.gameChannelIDs.length > 0) {
                isItFound = false;
                let msgString = `------\n**Sorry, but please do that in one of the following channels:**\n------\n`;
                const msgEmbed = new Discord.MessageEmbed();
                for (let x = 0; x < guildData.gameChannelIDs.length; x += 1) {
                    if (commandData.fromTextChannel!.id === guildData.gameChannelIDs[x]) {
                        isItFound = true;
                        break;
                    } else {
                        msgString += `<#${guildData.gameChannelIDs[x]}>\n`;
                    }
                }
                msgString += '------';
                if (isItFound === false) {
                    msgEmbed
                        .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
                        .setColor(guildData.borderColor as [number, number, number])
                        .setDescription(msgString)
                        .setTimestamp(Date() as unknown as Date)
                        .setTitle("__**Permissions Issue:**__")
                    let msg = await sendMessageWithCorrectChannel(commandData, msgEmbed);
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guildMember!.client, msg, commandData.fromTextChannel!);
                    }
                    await msg.delete({timeout:20000});
                    return isItFound;
                }
            }
            return isItFound;
        } catch (error) {
            return new Promise((resolve, reject) => {
                reject(error);
            });
        }
    }
}
export default HelperFunctions;
