// IndexFunctions.ts - Module for my "Index functions".
// Apr 7, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import EventEmitter from 'events';
import FoundationClasses from './FoundationClasses';
import DiscordUser from './DiscordUser';
import botCommands from './CommandIndex';

module IndexFunctions{
    export async function onHeartBeat(client: Discord.Client, discordUser: DiscordUser){
        try{
            await discordUser.updateDataCacheAndSaveToFile(client);
        }
        catch(error){
            console.log(error);
        }
    }

    export async function onReady(client: Discord.Client, discordUser: DiscordUser, eventEmitter: EventEmitter) {
        try {
            await discordUser.initializeInstance(client);
            await (client.user as Discord.ClientUser).setPresence({ status: 'online', activity: { name: '!help for commands!', type: 'STREAMING' } });
            eventEmitter.emit('HeartBeat');
        } catch (error) {
            console.log(error);
        }
    }
    
    export async function onMessage(msg: Discord.Message, client: Discord.Client, discordUser: DiscordUser) {
        if (client.users.resolve(msg.author.id) === null) {
            console.log('Non-found user! Better escape!');
            return;
        }
        if (msg.author.id === client.user?.id) {
            console.log('Better not track our own messages!');
            return;
        }
        if (msg.content.startsWith(discordUser.userData.prefix)) {
            let command = '';
            let args: string[] = [];
            if (msg.content.indexOf(' =') === -1) {
                command = msg.content.slice(discordUser.userData.prefix.length).split(/ +/, 3)[0]!.trim().toLowerCase();
            } else {
                command = msg.content.slice(discordUser.userData.prefix.length).substring(0, msg.content.indexOf(' =')).trim().toLowerCase();
                args = msg.content.slice(discordUser.userData.prefix.length).substring(msg.content.indexOf(' =') + 2).split(',');
                for (let x = 0; x < args.length; x += 1) {
                    args[x] = args[x]!.trim();
                }
            }
    
            if (!botCommands.has(command)) {
                return;
            }
            try{
                const commandData = new FoundationClasses.CommandData();
                if (msg.channel.type !== 'dm' && msg.member !== null) {
                    await commandData.initialize(client, msg.channel.id, msg.channel.type, null, msg.member!.id, msg.guild!.id);
                }
                else{
                    await commandData.initialize(client, msg.channel.id, msg.channel.type, null, msg.author.id);
                }
                commandData.args = args;
    
                if (msg.deletable) {
                    await msg.delete();
                }
    
                try {
                    console.log(`Command: '${command}' entered by user: ${msg.author.username}`);
                    const cmdName = await botCommands.get(command)?.function(commandData, discordUser) as FoundationClasses.CommandReturnData;
                    console.log(`Completed Command: ${cmdName.commandName}`);
                } catch (error) {
                    console.log(error);
                    msg.reply('There was an error trying to execute that command!');
                }
                return;
            }
            catch(error) {
                console.log(error);
            }
        } else if (msg.author.id !== client.user?.id) {
            const command = 'message';
    
            if (!botCommands.has(command)) {
                return;
            }
            try{
                try {
                    console.log(`Standard message entered: ${msg.author.username}`);
                    const cmdName = await botCommands.get(command)?.function(msg, discordUser);
                    console.log(`Completed Command: ${cmdName}`);
                } catch (error) {
                    console.log(error);
                    msg.reply('There was an error trying to process that message!');
                }
                return;
            }
            catch(error) {
                console.log(error);
            }
        }
    }

    export async function onInteractionCreate(interaction: any, client: any, discordUser: DiscordUser) {
        const {channel_id} = interaction;
        const channel = await client.channels.fetch(channel_id);
        let id_full, guild_id_full, options_full, name_full;
        const commandData = new FoundationClasses.CommandData();
        if (await channel.type === 'dm') {
            let {user:{id}, guild_id, data:{options, name}} = interaction;
            id_full = id;
            guild_id_full = guild_id;
            options_full = options;
            name_full = name;
            await commandData.initialize(client, channel_id, channel.type, interaction, id_full);
        }
        else {
            let {member:{user:{id}}, guild_id, data:{options, name}} = interaction;
            id_full = id;
            guild_id_full = guild_id;
            options_full = options;
            name_full = name;
            await commandData.initialize(client, channel_id, channel.type, interaction, id_full, guild_id_full);
        }
        const nameSolid = name_full;

        if (name_full === 'addshopitem') {
            const itemName = options_full[0].value;
            const itemSelfMod = options_full[1].value;
            const itemOppMod = options_full[2].value;
            const itemCost = options_full[3].value;
            const itemEmoji = options_full[4].value;
            commandData.args[0] = itemName;
            commandData.args[1] = itemSelfMod.toString();
            commandData.args[2] = itemOppMod.toString();
            commandData.args[3] = itemCost.toString();
            commandData.args[4] = itemEmoji;
        }
        if (name_full === 'addshoprole') {
            const roleName = options_full[0].value;
            const roleColor = options_full[1].value;
            const roleCost = options_full[2].value;
            commandData.args[0] = roleName;
            commandData.args[1] = roleColor;
            commandData.args[2] = roleCost.toString();
        }
        if (name_full === 'balance') {
            if (options_full !== undefined) {
                const user = options_full[0].value;
                console.log(user);
                commandData.args[0] = user;
            }
        }
        if (name_full === 'botinfo') {
            const name = 'gamehouse';
            commandData.args[0] = name;
        }
        if (name_full === 'buy') {
            const objectName = options_full[0].value;
            commandData.args[0] = objectName;
        }
        if (name_full === 'blackjack') {
            const betAmount = options_full[0].value;
            commandData.args[0] = betAmount.toString();
        }
        if (name_full === 'casinostats') {

        }
        if (name_full === 'coinflip') {
            const betAmount = options_full[0].value;
            commandData.args[0] = betAmount.toString();
        }
        if (name_full === "deletedbentry") {
            const {value:value1} = options_full[0];
            commandData.args[0] = 'gamehouse';
            commandData.args[1] = value1;
        }
        if (name_full === 'deposit') {
            const depositAmount = options_full[0].value;
            commandData.args[0] = depositAmount.toString();
        }
        if (name_full === "displayguildsdata") {
            const name = 'gamehouse';
            commandData.args[0] = name;
        }
        if (name_full === 'duel') {
            const betAmount = options_full[0].value;
            const user = options_full[1].value;
            commandData.args[0] = betAmount.toString();
            commandData.args[1] = user;
        }
        if (name_full === 'gamehouseoptions') {

        }
        if (name_full === 'help') {
            if (options_full[0].options !==  undefined) {
                const {value} = options_full[0].options[0];
                commandData.args[0] = value;
            }
        }
        if (name_full == 'inventory') {
            if (options_full !== undefined) {
                const user = options_full[0].value;
                commandData.args[0] = user;
            }
        }
        if (name_full === 'leaderboard') {

        }
        if (name_full === 'listdbguilds') {
            commandData.args[0] = 'gamehouse';
        }
        if (name_full === 'removeobject') {
            const objectName = options_full[0].value;
            commandData.args[0] = objectName;
            if (options_full[1] !== undefined) {
                const user = options_full[1].value;
                commandData.args[1] = user;
            }
        }
        if (name_full === 'removeshopitem') {
            const itemName = options_full[0].value;
            commandData.args[0] = itemName;
        }
        if (name_full === 'removeshoprole') {
            const roleName = options_full[0].value;
            commandData.args[0] = roleName;
        }
        if (name_full === 'rob') {
            const targetUser = options_full[0].value;
            commandData.args[0] = targetUser;
        }
        if (name_full === 'roulette') {
            name_full = options_full[0].name;
            if (name_full === 'start') {
                commandData.args[0] = 'start'
            }
            else if (name_full === 'bet1' || name_full === 'bet2') {
                const betAmount = options_full[0].options[0].value;
                const betType = options_full[0].options[1].value;
                let betOptions;
                if (options_full[0].options[2] !== undefined) {
                    betOptions = options_full[0].options[2].value;
                    commandData.args[3] = betOptions.toString();
                    console.log(commandData.args[3]);
                }
                commandData.args[0] = 'bet';
                commandData.args[1] = betAmount.toString();
                commandData.args[2] = betType;
            }
        }
        if (name_full === 'selldrugs') {

        }
        if (name_full === 'setbalance') {
            const amount = options_full[0].value;
            const targetBalance = options_full[1].value;
            commandData.args[0] = amount.toString();
            commandData.args[1] = targetBalance;
            if (options_full[2] !== undefined) {
                const targetUser = options_full[2].value;
                commandData.args[2] = targetUser;
            }
        }
        if (name_full === 'setbordercolor') {
            commandData.args[0] = 'gamehouse';
            const redChannelValue = options_full[0].value;
            const greenChannelValue = options_full[1].value;
            const blueChannelValue = options_full[2].value;
            commandData.args[1] = redChannelValue.toString();
            commandData.args[2] = greenChannelValue.toString();
            commandData.args[3] = blueChannelValue.toString();
        }
        if (name_full === 'setgamechannel') {
            name_full = options_full[0].name;
            if (name_full === 'display') {

            }
            else if (name_full === 'add') {
                commandData.args[0] = 'add';
            }
            else if (name_full === 'remove') {
                commandData.args[0] = 'remove';
            }
            else if (name_full === 'purge') {
                commandData.args[0] = 'purge';
            }
        }
        if (name_full === 'shop') {

        }
        if (name_full === 'slashcommands') {

        }
        if (name_full === 'slots') {
            const betAmount = options_full[0].value;
            commandData.args[0] = betAmount.toString();
        }
        if (name_full === 'test') {

        }
        if (name_full === 'transfer') {
            const amount = options_full[0].value;
            const user = options_full[1].value;
            commandData.args[0] = amount.toString();
            commandData.args[1] = user;
        }
        if (name_full === 'withdraw') {
            const amount = options_full[0].value;
            commandData.args[0] = amount;
        }

        await client.api.interactions(interaction.id, interaction.token).callback.post({
            data:{
                type: 5
            }
        });
        if (commandData.guildMember instanceof Discord.GuildMember) {
            console.log(`Command: '${nameSolid}' entered by user: ${commandData.guildMember.user.username}`);
        }
        else if (commandData.guildMember instanceof Discord.User) {
            console.log(`Command: '${nameSolid}' entered by user: ${commandData.guildMember.username}`);
        }	
        const returnData = await botCommands.get(nameSolid)?.function(commandData, discordUser) as FoundationClasses.CommandReturnData;
        console.log(`Completed Command: ${returnData.commandName}`);
    }

}
export default IndexFunctions;
