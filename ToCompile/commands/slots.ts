// slots.ts - Module for my "slots" command.
// Apr 4, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import FoundationClasses from '../FoundationClasses';
import DiscordUser from '../DiscordUser';
import GuildData from '../GuildData';
import GuildMemberData from '../GuildMemberData';
import HelperFunctions from '../HelperFunctions';

const command:FoundationClasses.BotCommand = {
    name: 'slots',
    description: '__**Slots Usage:**__ !slots = BETAMOUNT.',
    function: Function()
};

async function execute(commandData: FoundationClasses.CommandData, discordUser: DiscordUser): Promise<FoundationClasses.CommandReturnData> {
    try{
        const commandReturnData: FoundationClasses.CommandReturnData = {
            commandName: command.name
        };

        const areWeInADM = await HelperFunctions.areWeInADM(commandData);

        if (areWeInADM) {
            return commandReturnData;
        }
        
        const areWeAllowed = await HelperFunctions.checkIfAllowedInChannel(commandData, discordUser);

        if (areWeAllowed === false) {
            return commandReturnData;
        }

        const guildData = new GuildData({dataBase: discordUser.dataBase, id: commandData.guild!.id, memberCount: commandData.guild!.memberCount, name: commandData.guild!.name});
        await guildData.getFromDataBase();

        let betAmountOld: number;
        if (commandData.args[0] === undefined) {
            const msgString = "------\n**Please, enter a bet amount as the first argument of the command! (!slots = BETAMOUNT)**\n------"
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
        if (parseInt(commandData.args[0], 10) <= 0) {
            const msgString = "------\n**Please, enter a valid bet amount as the first argument of the command! (!slots = BETAMOUNT)**\n------"
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
        else {
            betAmountOld = parseInt(commandData.args[0], 10);
        }

        const guildMemberData = new GuildMemberData({dataBase: discordUser.dataBase, id: commandData.guildMember!.id, guildId: commandData.guild!.id,
            userName: (commandData.guildMember as Discord.GuildMember)!.user.username, displayName: (commandData.guildMember as Discord.GuildMember).displayName});
        await guildMemberData.getFromDataBase();

        if (parseInt(commandData.args[0], 10) > guildMemberData.currency.wallet) {
            const msgString = "------\n**Sorry, but you don't have sufficient funds in your wallet for placing that bet!**\n------"
            let msgEmbed = new Discord.MessageEmbed()
					.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
					.setColor(guildData.borderColor as [number, number, number])
					.setDescription(msgString)
					.setTimestamp(Date() as unknown as Date)
					.setTitle('__**Insufficient Funds:**__');
			let msg = await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
			if (commandData.toTextChannel instanceof Discord.WebhookClient) {
				msg = new Discord.Message(commandData.guild!.client, msg, commandData.fromTextChannel!);
			}
			await msg.delete({timeout: 20000});
			return commandReturnData;
        }

        let payoutAmount: number;
        let gameResultType: string;
        const slotReel = [":crossed_swords:", ":apple:", ":ring:", ":gun:", ":swan:", ":rocket:", ":coin:", ":star:", ":jack_o_lantern:", ":christmas_tree:"];

        const reelStartIndex1 = Math.trunc(Math.random() * 10);
        const reelIndices1: number[] = [];
        for (let x = 0; x < 10; x += 1) {
            reelIndices1[x] = (reelStartIndex1 + x) % 10;
        }
        const reelStartIndex2 = Math.trunc(Math.random() * 10);
        const reelIndices2: number[] = [];
        for (let x = 0; x < 10; x += 1) {
            reelIndices2[x] = (reelStartIndex2 + x) % 10;
        }
        const reelStartIndex3 = Math.trunc(Math.random() * 10);
        const reelIndices3: number[] = [];
        for (let x = 0; x < 10; x += 1) {
            reelIndices3[x] = (reelStartIndex3 + x) % 10;
        }

        const msgStrings: string[] = [];
        const msgString0 = `__**Slot Results:**__\n[:question:] [:question:] [:question:]\n
            [:question:] [:question:] [:question:]\n
            [:question:] [:question:] [:question:]\n\n__**Your Wager:**__ ${betAmountOld} ${discordUser.userData.currencyName}\n__**Maximum Payout:**__ ${(15 * betAmountOld).toString()} ${discordUser.userData.currencyName}`;

        msgStrings.push(msgString0);

        let msgEmbed0 = new Discord.MessageEmbed()
            .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
            .setColor([0, 0, 255])
            .setDescription(msgStrings[0])
            .setTimestamp(Date() as unknown as Date)
            .setTitle('__**Slots Game:**__');

        let msg = await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed0);
        if (commandData.toTextChannel instanceof Discord.WebhookClient) {
            msg = new Discord.Message(commandData.guild!.client, msg, commandData.fromTextChannel!);
        }

        setTimeout(() => {
            const msgString1 = `__**Slot Results:**__\n[${slotReel[reelIndices1[7] as number]}] [:question:] [:question:]\n
            [${slotReel[reelIndices1[8] as number]}] [:question:] [:question:]\n
            [${slotReel[reelIndices1[9] as number]}] [:question:] [:question:]\n\n__**Your Wager:**__ ${betAmountOld} ${discordUser.userData.currencyName}\n__**Maximum Payout:**__ ${(15 * betAmountOld).toString()} ${discordUser.userData.currencyName}`;
         
            msgStrings.push(msgString1);
            let msgEmbed = new Discord.MessageEmbed()
                .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
                .setColor([0, 0, 255])
                .setDescription(msgStrings[1])
                .setTimestamp(Date() as unknown as Date)
                .setTitle('__**Slots Game:**__');
            msg.edit(msgEmbed);
        }, 3000);

        setTimeout(() => {
            const msgString2 = `__**Slot Results:**__\n[${slotReel[reelIndices1[7]!]} [${slotReel[reelIndices2[7]!]}] [:question:]\n
            [${slotReel[reelIndices1[8]!]}] [${slotReel[reelIndices2[8]!]}] [:question:]\n
            [${slotReel[reelIndices1[9]!]}] [${slotReel[reelIndices2[9]!]}] [:question:]\n\n__**Your Wager:**__ ${betAmountOld} ${discordUser.userData.currencyName}\n__**Maximum Payout:**__ ${(15 * betAmountOld).toString()} ${discordUser.userData.currencyName}`;

            msgStrings.push(msgString2);
            let msgEmbed = new Discord.MessageEmbed()
                .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
                .setColor([0, 0, 255])
                .setDescription(msgStrings[2])
                .setTimestamp(Date() as unknown as Date)
                .setTitle('__**Slots Game:**__');
            msg.edit(msgEmbed);
        }, 6000);
    
        setTimeout(async () => {
            if (slotReel[reelIndices1[8]!] === slotReel[reelIndices2[8]!] && slotReel[reelIndices2[8]!] ===  slotReel[reelIndices3[8]!]) {
                gameResultType = 'Triple Straight';
                payoutAmount = betAmountOld * 15;
            }
            else if ((slotReel[reelIndices1[9]!] === slotReel[reelIndices2[8]!] && slotReel[reelIndices2[8]!] === slotReel[reelIndices3[7]!]) ||
            (slotReel[reelIndices1[7]!] === slotReel[reelIndices2[8]!] && slotReel[reelIndices2[8]!] === slotReel[reelIndices3[9]!])) {
                gameResultType = 'Triple Diagonal';
                payoutAmount = betAmountOld * 7;
            }
            else if (slotReel[reelIndices1[8]!] === slotReel[reelIndices2[8]!] || slotReel[reelIndices3[8]!] === slotReel[reelIndices2[8]!]) {
                gameResultType = 'Double Straight';
                payoutAmount = betAmountOld * 1;
            }
            else if ((slotReel[reelIndices1[9]!] === slotReel[reelIndices2[8]!]) || (slotReel[reelIndices1[7]!] === slotReel[reelIndices2[8]!]) || 
            (slotReel[reelIndices3[9]!] === slotReel[reelIndices2[8]!]) || (slotReel[reelIndices3[7]!] === slotReel[reelIndices2[8]!])) {
                gameResultType = 'Double Diagonal';
                payoutAmount = betAmountOld * 1;
            }
            else {
                gameResultType = 'Loss';
                payoutAmount = -1 * betAmountOld;
            }
    
            await guildData.getFromDataBase();
            guildData.casinoStats.totalPayout += payoutAmount;
            guildData.casinoStats.totalSlotsPayout += payoutAmount;
            if (payoutAmount > guildData.casinoStats.largestSlotsPayout.amount) {
                guildData.casinoStats.largestSlotsPayout.amount = payoutAmount;
                guildData.casinoStats.largestSlotsPayout.date = Date();
                guildData.casinoStats.largestSlotsPayout.userID = guildMemberData.id;
                guildData.casinoStats.largestSlotsPayout.username = guildMemberData.userName;
            }
            await guildData.writeToDataBase();

            await guildMemberData.getFromDataBase();
            if (betAmountOld > guildMemberData.currency.wallet) {
                const msgString3 = `__**Slot Results:**__\n[:x:] [:x:] [:x:]\n
                [:x:] [:x:] [:x:]\n
                [:x:] [:x:] [:x:]\n------\n__**Your Wager:**__ ${betAmountOld}\n__**Maximum Payout:**__ ${(15 * betAmountOld).toString()} ${discordUser.userData.currencyName}\n
                __**Game Results:**__\n__**Payout:**__ NSF __**Result Type:**__ Non-Sufficient Funds\n__**Your New Wallet Balance:**__ ${guildMemberData.currency.wallet} ${discordUser.userData.currencyName}\n------`;

                msgStrings.push(msgString3);
                let msgEmbed = new Discord.MessageEmbed()
                    .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
                    .setColor([255, 0, 0])
                    .setDescription(msgString3)
                    .setTimestamp(Date() as unknown as Date)
                    .setTitle('__**Slots Game:**__');
                    await msg.edit(msgEmbed);
                    return commandReturnData;
            }
            guildMemberData.currency.wallet += payoutAmount;

            await guildMemberData.writeToDataBase();

            const msgString3 = `__**Slot Results:**__\n[${slotReel[reelIndices1[7]!]}] [${slotReel[reelIndices2[7]!]}] [${slotReel[reelIndices3[7]!]}]\n
            [${slotReel[reelIndices1[8]!]}] [${slotReel[reelIndices2[8]!]}] [${slotReel[reelIndices3[8]!]}]\n
            [${slotReel[reelIndices1[9]!]}] [${slotReel[reelIndices2[9]!]}] [${slotReel[reelIndices3[9]!]}]\n------\n__**Your Wager:**__ ${betAmountOld}\n__**Maximum Payout:**__ ${(15 * betAmountOld).toString()} ${discordUser.userData.currencyName}\n
            __**Game Results:**__\n__**Payout:**__ ${payoutAmount} ${discordUser.userData.currencyName} __**Result Type:**__ ${gameResultType}\n__**Your New Wallet Balance:**__ ${guildMemberData.currency.wallet} ${discordUser.userData.currencyName}\n------`;

            msgStrings.push(msgString3);

            let msgEmbed = new Discord.MessageEmbed();
            if (gameResultType === 'Loss') {
                msgEmbed
                    .setAuthor((commandData.guildMember as Discord.GuildMember)?.user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
                    .setColor([255, 0, 0])
                    .setDescription(msgStrings[3])
                    .setTimestamp(Date() as unknown as Date)
                    .setTitle('__**Slots Game:**__');
            }
            else{
                msgEmbed
                    .setAuthor((commandData.guildMember as Discord.GuildMember)?.user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
                    .setColor([0, 255, 0])
                    .setDescription(msgStrings[3])
                    .setTimestamp(Date() as unknown as Date)
                    .setTitle('__**Slots Game:**__');
            }
                await msg.edit(msgEmbed);
                return commandReturnData;
            }, 9000);
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
