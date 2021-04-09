// slashcommands.ts - Module for declaring my slash commands.
// Mar 28, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import DiscordInteractions from 'slash-commands';
import SlashCommands = require('slash-commands');
import FoundationClasses from '../FoundationClasses';
import DiscordUser from '../DiscordUser';
import HelperFunctions from '../HelperFunctions';

const command: FoundationClasses.BotCommand = {
    name: 'slashcommands',
    description: '!slashcommands',
    function: Function()
};

async function execute(commandData: FoundationClasses.CommandData, discordUser: DiscordUser): Promise<FoundationClasses.CommandReturnData> {
    try{
        const commandReturnData: FoundationClasses.CommandReturnData = {
            commandName: command.name
        };

        const interaction = new DiscordInteractions({applicationId: discordUser.userData.userID,
            publicKey: discordUser.userData.publicKey,
            authToken: discordUser.userData.botToken})

        const commands = await interaction.getApplicationCommands();
        for (let x = 0; x < commands.length; x += 1) {
            //const newInteraction = await interaction.deleteApplicationCommand(commands[x]?.id as string);
            //console.log(newInteraction);
        }
        /*
        const addshopitem = {
            "name": "addshopitem",
            "description": "Adds an item to the server's shop.",
            "options": [
                {
                    "name": "name",
                    "description": "The name of the item.",
                    "type": SlashCommands.ApplicationCommandOptionType.STRING,
                    "required": true
                },
                {
                    "name": "selfmod",
                    "description": "The bonus to our own attack power that the item gives.",
                    "type": SlashCommands.ApplicationCommandOptionType.INTEGER,
                    "required": true
                },
                {
                    "name": "oppmod",
                    "description": "The reduction to enemy attack power than the item gives.",
                    "type": SlashCommands.ApplicationCommandOptionType.INTEGER,
                    "required": true
                },
                {
                    "name": "cost",
                    "description": "The cost of the item.",
                    "type": SlashCommands.ApplicationCommandOptionType.INTEGER,
                    "required": true
                },
                {
                    "name": "emoji",
                    "description": "An emoji, to act as the item's 'icon'.",
                    "type": SlashCommands.ApplicationCommandOptionType.STRING,
                    "required": true
                }
            ]
        }

        // Create Global Command
        await interaction.createApplicationCommand(addshopitem).then(value => console.log(value)).catch(error => console.log(error.message));

        const addshoprole = {
            "name": "addshoprole",
            "description": "Adds a role to the server's shop.",
            "options": [
                {
                    "name": "name",
                    "description": "The name of the role.",
                    "type": SlashCommands.ApplicationCommandOptionType.STRING,
                    "required": true
                },
                {
                    "name": "color",
                    "description": "The color of the role, as a hex-color-value.",
                    "type": SlashCommands.ApplicationCommandOptionType.STRING,
                    "required": true
                },
                {
                    "name": "cost",
                    "description": "The cost of the role.",
                    "type": SlashCommands.ApplicationCommandOptionType.INTEGER,
                    "required": true
                }
            ]
        }

        // Create Global Command
        await interaction.createApplicationCommand(addshoprole).then(value => console.log(value)).catch(error => console.log(error.message));

        const balance = {
            "name": "balance",
            "description": "Check your own or another member's balances.",
            "options":[{
                "name": "user",
                "description": "The user, if chosen, besides yourself to check the balance of.",
                "type": SlashCommands.ApplicationCommandOptionType.USER,
                "required": false,
            }]
        }

        // Create Global Command
        await interaction.createApplicationCommand(balance).then(value => console.log(value)).catch(error => console.log(error.message));

        const blackjack = {
            "name": "blackjack",
            "description": "Begins a round of blackjack.",
            "options":[{
                "name": "betamount",
                "description": "The amount of your currency that you will place as a wager.",
                "type": SlashCommands.ApplicationCommandOptionType.INTEGER,
                "required": true,
            }]
        }

        // Create Global Command
        await interaction.createApplicationCommand(blackjack).then(value => console.log(value)).catch(error => console.log(error.message));

        const botinfo = {
            "name": "botinfo",
            "description": "Displays info about the current bot.",
            "options":[]
        }

        // Create Global Command
        await interaction.createApplicationCommand(botinfo).then(error => console.log(error)).catch(error => console.log(error.message));

        const buy = {
            "name": "buy",
            "description": "Purchase an item from the server's shop.",
            "options":[{
                "name": "objectname",
                "description": "The item or role to buy from the shop.",
                "type": SlashCommands.ApplicationCommandOptionType.STRING,
                "required": true,
            }]
        }

        // Create Global Command
        await interaction.createApplicationCommand(buy).then(value => console.log(value)).catch(error => console.log(error.message));

        const casinostats = {
            "name": "casinostats",
            "description": "Displays some data about the server's casino."
        }

        // Create Global Commande
        await interaction.createApplicationCommand(casinostats).then(value => console.log(value)).catch(error => console.log(error.message));

        const coinflip = {
            "name": "coinflip",
            "description": "Bet currency on a coin-toss game.",
            "options":[{
                "name": "betamount",
                "description": "The amount of currency to wager.",
                "type": SlashCommands.ApplicationCommandOptionType.INTEGER,
                "required": true,
            }]
        }

        // Create Global Command
        await interaction.createApplicationCommand(coinflip).then(value => console.log(value)).catch(error => console.log(error.message));

        const deletedbentry = {
            "name": "deletedbentry",
            "description": "Used to delete database entries, based on their key.",
            "options":[{
                "name": "entrykey",
                "description": "The database key to prune from the database.",
                "type": SlashCommands.ApplicationCommandOptionType.STRING,
                "required": true,
            }]
        }

        // Create Global Command
        await interaction.createApplicationCommand(deletedbentry).then(value => console.log(value)).catch(error => console.log(error.message));

        const deposit = {
            "name": "deposit",
            "description": "Deposit an amount of currency from your wallet to your bank.",
            "options":[{
                "name": "amount",
                "description": "The amount of currency you wish to deposit.",
                "type": SlashCommands.ApplicationCommandOptionType.INTEGER,
                "required": true,
            }]
        }

        // Create Global Command
        await interaction.createApplicationCommand(deposit).then(value => console.log(value)).catch(error => console.log(error.message));

        const displayguildsdata = {
            "name": "displayguildsdata",
            "description": "Display info about the servers that the bot is in.",
            "options":[]                        
        }

        // Create Global Command
        await interaction.createApplicationCommand(displayguildsdata).then(error => console.log(error)).catch(error => console.log(error.message));

        const duel = {
            "name": "duel",
            "description": "Challenges another user to a duel.",
            "options": [
                {
                    "name": "betamount",
                    "description": "The amount of currency you will put up for wager.",
                    "type": SlashCommands.ApplicationCommandOptionType.INTEGER,
                    "required": true
                },
                {
                    "name": "user",
                    "description": "The user that you are challenging to a duel.",
                    "type": SlashCommands.ApplicationCommandOptionType.USER,
                    "required": true
                }
            ]
        }

        // Create Global Command
        await interaction.createApplicationCommand(duel).then(value => console.log(value)).catch(error => console.log(error.message));

    const gamehouseoptions = {
            "name": "gamehouseoptions",
            "description": "Displays a list of general options along with their associated bot commands."
        }

        // Create Global Command
        await interaction.createApplicationCommand(gamehouseoptions).then(value => console.log(value)).catch(error => console.log(error.message));

        for (let x = 0; x < commands.length; x += 1) {
            if ((commands[x] as SlashCommands.ApplicationCommand).name === 'help') {
                const newInteraction = await interaction.deleteApplicationCommand(commands[x]?.id as string);
                console.log(newInteraction);
            }
        }

        const help = {
            "name": "help",
            "description": "Displays help about the bot's various commands.",
            "options":[{
                  
                    "name": "group1",
                    "description": "The first group of commands.",
                    "type": SlashCommands.ApplicationCommandOptionType.SUB_COMMAND,
                    "required": false,
                    "options":[{
                        "name": "commandname",
                        "description": " The name of the command, from group 1.",
                        "type": SlashCommands.ApplicationCommandOptionType.STRING,
                        "required": false,
                        "choices": [{
                                        "name": "addshopitem",
                                        "value": "addshopitem"
                                    },
                                    {
                                        "name":"addshoprole",
                                        "value":"addshoprole"
                                    },
                                    {
                                        "name":"balance",
                                        "value": "balance"
                                    },
                                    {
                                        "name":"blackjack",
                                        "value":"blackjack"
                                    },
                                    {
                                        "name":"buy",
                                        "value":"buy"
                                    },
                                    {
                                        "name":"casinostats",
                                        "value":"casinostats"
                                    },
                                    {
                                        "name":"coinflip",
                                        "value":"coinflip"
                                    },
                                    {
                                        "name":"deletedbentry",
                                        "value":"deletedbentry"
                                    },
                                    {
                                        "name":"deposit",
                                        "value":"deposit"
                                    },
                                    {
                                        "name":"duel",
                                        "value":"duel"
                                    }
                            ]
                        }]
                },
                {  
                    "name": "group2",
                    "description": "The second group of commands.",
                    "type": SlashCommands.ApplicationCommandOptionType.SUB_COMMAND,
                    "required": false,
                    "options":[{
                        "name": "commandname",
                        "description": " The name of the command, from group 2.",
                        "type": SlashCommands.ApplicationCommandOptionType.STRING,
                        "required": false,
                        "choices": [{
                                        "name":"gamehouseoptions",
                                        "value":"gamehouseoptions"
                                    },
                                    {
                                        "name":"help",
                                        "value":"help"
                                    },
                                    {
                                        "name":"inventory",
                                        "value":"inventory"
                                    },
                                    {
                                        "name":"leaderboard",
                                        "value":"leaderboard"
                                    },
                                    {
                                        "name":"listdbguilds",
                                        "value":"listdbguilds"
                                    },
                                    {
                                        "name":"removeobject",
                                        "value":"removeobject"
                                    },
                                    {
                                        "name":"removeshopitem",
                                        "value":"removeshopitem"
                                    },
                                    {
                                        "name":"removeshoprole",
                                        "value":"removeshoprole"
                                    },
                                    {
                                        "name":"rob",
                                        "value":"rob"
                                    },
                                    {
                                        "name":"roulette",
                                        "value":"roulette"
                                    }
                            ]
                        }]
                    },
                    {  
                        "name": "group3",
                        "description": "The third group of commands.",
                        "type": SlashCommands.ApplicationCommandOptionType.SUB_COMMAND,
                        "required": false,
                        "options":[{
                            "name": "commandname",
                            "description": " The name of the command, from group 3.",
                            "type": SlashCommands.ApplicationCommandOptionType.STRING,
                            "required": false,
                            "choices": [{
                                            "name":"selldrugs",
                                            "value":"selldrugs"
                                        },
                                        {
                                            "name":"setgamechannel",
                                            "value":"setgamechannel"
                                        },
                                        {
                                            "name":"shop",
                                            "value":"shop"
                                        },
                                        {
                                            "name":"slashcommands",
                                            "value":"slashcommands"
                                        },
                                        {
                                            "name":"test",
                                            "value":"test"
                                        },
                                        {
                                            "name":"transfer",
                                            "value":"transfer"
                                        },
                                        {
                                            "name":"withdraw",
                                            "value":"withdraw"
                                        }
                                ]
                            }]
                        }
            ]
        }
        
        // Create Global Command
        await interaction.createApplicationCommand(help).then(error => console.log(error)).catch(error => console.log(error.message));

        const inventory = {
            "name": "inventory",
            "description": "View the contents of a user's inventory.",
            "options":[{
                "name": "user",
                "description": "The other user to potentially view the contents of their inventory.",
                "type": SlashCommands.ApplicationCommandOptionType.USER,
                "required": false,
            }]
        }

        // Create Global Command
        await interaction.createApplicationCommand(inventory).then(value => console.log(value)).catch(error => console.log(error.message));

        const leaderboard = {
            "name": "leaderboard",
            "description": "View the rankings of server members, in terms of wallet currency."
        }

        // Create Global Command
        await interaction.createApplicationCommand(leaderboard).then(value => console.log(value)).catch(error => console.log(error.message));

        const listdbguilds = {
            "name": "listdbguilds",
            "description": "Lists all of the database server entries for which the bot is no longer a member.",
        }

        // Create Global Command
        await interaction.createApplicationCommand(listdbguilds).then(value => console.log(value)).catch(error => console.log(error.message));

        const removeobject = {
            "name": "removeobject",
            "description": "Removes an object from a user's inventory.",
            "options": [
                {
                    "name": "objectname",
                    "description": "The name of the object to be removed.",
                    "type": SlashCommands.ApplicationCommandOptionType.STRING,
                    "required": true
                },
                {
                    "name": "user",
                    "description": "The user who's inventory you are removing the item from.",
                    "type": SlashCommands.ApplicationCommandOptionType.USER,
                    "required": false
                }
            ]
        }

        // Create Global Command
        await interaction.createApplicationCommand(removeobject).then(value => console.log(value)).catch(error => console.log(error.message));

        const removeshopitem = {
            "name": "removeshopitem",
            "description": "Removes an item from the server's shop's inventory.",
            "options": [
                {
                    "name": "itemname",
                    "description": "The name of the item to be removed.",
                    "type": SlashCommands.ApplicationCommandOptionType.STRING,
                    "required": true
                }
            ]
        }

        // Create Global Command
        await interaction.createApplicationCommand(removeshopitem).then(value => console.log(value)).catch(error => console.log(error.message));

        const removeshoprole = {
            "name": "removeshoprole",
            "description": "Removes a role from the server's shop's inventory.",
            "options": [
                {
                    "name": "rolename",
                    "description": "The name of the role to be removed.",
                    "type": SlashCommands.ApplicationCommandOptionType.STRING,
                    "required": true
                }
            ]
        }

        // Create Global Command
        await interaction.createApplicationCommand(removeshoprole).then(value => console.log(value)).catch(error => console.log(error.message));

        const rob = {
            "name": "rob",
            "description": "Robs another user of their currency.",
            "options": [
                {
                    "name": "targetname",
                    "description": "The name of the user to attempt to rob.",
                    "type": SlashCommands.ApplicationCommandOptionType.USER,
                    "required": true
                }
            ]
        }

        // Create Global Command
        await interaction.createApplicationCommand(rob).then(value => console.log(value)).catch(error => console.log(error.message));

        const roulette = {
            "name": "roulette",
            "description": "Initializes and plays a game of roulette.",
            "options":[
                {
                    "name": "start",
                    "description": "Begins the game of roulette.",
                    "type": SlashCommands.ApplicationCommandOptionType.SUB_COMMAND
                },
                {
                    "name": "bet1",
                    "description": "Bets on the current game of roulette, with the first group of bet types",
                    "type": SlashCommands.ApplicationCommandOptionType.SUB_COMMAND,
                    "options":[
                        {
                            "name": "amount",
                            "description": "The amount of currency to bet.",
                            "type": SlashCommands.ApplicationCommandOptionType.INTEGER,
                            "required": true
                        },
                        {
                            "name": "type",
                            "description": "The type of roulette bet to place.",
                            "type": SlashCommands.ApplicationCommandOptionType.STRING,
                            "required": true,
                            "choices":[
                                {
                                    "name":"0",
                                    "value":"0"
                                },
                                {
                                    "name":"00",
                                    "value":"00"
                                },
                                {
                                    "name":"straight",
                                    "value":"straight"
                                },
                                {
                                    "name":"row",
                                    "value":"row"
                                },
                                {
                                    "name":"split",
                                    "value":"split"
                                },
                                {
                                    "name":"street",
                                    "value":"street"
                                },
                                {
                                    "name":"basket",
                                    "value":"basket"
                                },
                                {
                                    "name":"sixline",
                                    "value":"sixline"
                                },
                                {
                                    "name":"1stcolumn",
                                    "value":"1stcolumn"
                                },
                                {
                                    "name":"2ndcolumn",
                                    "value":"2ndcolumn"
                                }
                            ],
                        },
                        {
                            "name": "options",
                            "description": "Bet options for select bet-types.",
                            "type": SlashCommands.ApplicationCommandOptionType.INTEGER,
                            "required": false,
                        }
                    ]
                },
                {
                    "name": "bet2",
                    "description": "Bets on the current game of roulette, with the second group of bet types.",
                    "type": SlashCommands.ApplicationCommandOptionType.SUB_COMMAND,
                    "options":[
                        {
                            "name": "amount",
                            "description": "The amount of currency to bet.",
                            "type": SlashCommands.ApplicationCommandOptionType.INTEGER,
                            "required": true
                        },
                        {
                            "name": "type",
                            "description": "The type of roulette bet to place.",
                            "type": SlashCommands.ApplicationCommandOptionType.STRING,
                            "required": true,
                            "choices":[
                                {
                                    "name":"3rdcolumn",
                                    "value":"3rdcolumn"
                                },
                                {
                                    "name":"1stdozen",
                                    "value":"1stdozen"
                                },
                                {
                                    "name":"2nddozen",
                                    "value":"2nddozen"
                                },
                                {
                                    "name":"3rddozen",
                                    "value":"3rddozen"
                                },
                                {
                                    "name":"odd",
                                    "value":"odd"
                                },
                                {
                                    "name":"even",
                                    "value":"even"
                                },
                                {
                                    "name":"red",
                                    "value":"red"
                                },
                                {
                                    "name":"black",
                                    "value":"black"
                                },
                                {
                                    "name":"1to18",
                                    "value":"1to18"
                                },
                                {
                                    "name":"19to36",
                                    "value":"19to36"
                                }
                            ]
                        },
                        {
                            "name": "options",
                            "description": "Bet options for select bet-types.",
                            "type": SlashCommands.ApplicationCommandOptionType.INTEGER,
                            "required": false,
                        }
                    ]
                }
            ]
        }

        // Create Global Command
        await interaction.createApplicationCommand(roulette).then(value => console.log(value)).catch(error => console.log(error.message));
        
        const selldrugs = {
            "name": "selldrugs",
            "description": "Sell some drugs, in exchange for currency!",
        }

        // Create Global Command
        await interaction.createApplicationCommand(selldrugs).then(value => console.log(value)).catch(error => console.log(error.message));

        const setbalance = {
            "name": "setbalance",
            "description": "Set the wallet or bank balance of a given user.",
            "options": [
                {
                    "name": "amount",
                    "description": "The amount to set the balance to.",
                    "type": SlashCommands.ApplicationCommandOptionType.INTEGER,
                    "required": true
                },
                {
                    "name": "balance",
                    "description": "Which balance to set to the desired amount.",
                    "type": SlashCommands.ApplicationCommandOptionType.STRING,
                    "required": true,
                    "choices":[
                        {
                            "name": "bank",
                            "value": "bank"
                        },
                        {
                            "name": "wallet",
                            "value": "wallet"
                        }
                    ]
                },
                {
                    "name": "user",
                    "description": "The user to set the balance of.",
                    "type": SlashCommands.ApplicationCommandOptionType.USER,
                    "required": false
                }
            ]
        }

        // Create Global Command
        await interaction.createApplicationCommand(setbalance).then(value => console.log(value)).catch(error => console.log(error.message));

        const setbordercolor = {
            "name":"setbordercolor",
            "description": "Sets the default border color for chat messages sent out by this bot.",
            "options":[
                {
                    "name":"redchannel",
                    "description": "Pick a value between 0 and 255 to set this color channel value.",
                    "type": SlashCommands.ApplicationCommandOptionType.INTEGER,
                    "required": true
                },
                {
                    "name":"greenchannel",
                    "description": "Pick a value between 0 and 255 to set this color channel value.",
                    "type": SlashCommands.ApplicationCommandOptionType.INTEGER,
                    "required": true
                },
                {
                    "name":"bluechannel",
                    "description": "Pick a value between 0 and 255 to set this color channel value.",
                    "type": SlashCommands.ApplicationCommandOptionType.INTEGER,
                    "required": true
                }
            ]
        }

        // Create Global Command
        await interaction.createApplicationCommand(setbordercolor).then(value => console.log(value)).catch(error => console.log(error.message));

        const setgamechannel = {
            "name": "setgamechannel",
            "description": "Adds or removes a channel to the list of allowed game-bot-controlling channels.",
            "options":[
                {
                    "name": "add",
                    "description": "Adds the current channel to the list of allowed game-bot-controlling channels.",
                    "type": SlashCommands.ApplicationCommandOptionType.SUB_COMMAND
                },
                {
                    "name": "remove",
                    "description": "Removes the current channel from the list of allowed game-bot-controlling channels.",
                    "type": SlashCommands.ApplicationCommandOptionType.SUB_COMMAND
                },
                {
                    "name": "display",
                    "description": "Displays the current list of allowed game-bot-controlling channels.",
                    "type": SlashCommands.ApplicationCommandOptionType.SUB_COMMAND
                },
                {
                    "name": "purge",
                    "description": "Purges the current list of allowed game-bot-controlling channels.",
                    "type": SlashCommands.ApplicationCommandOptionType.SUB_COMMAND
                }
        ]}

        // Create Global Command
        await interaction.createApplicationCommand(setgamechannel).then(value => console.log(value)).catch(error => console.log(error.message));

        const shop = {
            "name":"shop",
            "description": "Displays the server's shop inventory."
        }

        await interaction.createApplicationCommand(shop).then(value => console.log(value)).catch(error => console.log(error.message));

        const slashcommands = {
            "name": "slashcommands",
            "description": "Declares the slash commands to the Discord servers!",
        }

        // Create Global Command
        await interaction.createApplicationCommand(slashcommands).then(value => console.log(value)).catch(error => console.log(error.message));

        const slots = {
            "name": "slots",
            "description": "Initializes a game of slots.",
            "options":[
                {
                    "name":"wager",
                    "description": "Defines the amount of currency you will place as a wager.",
                    "type": SlashCommands.ApplicationCommandOptionType.INTEGER,
                    "required": true
                }
            ]
        }

        // Create Global Comman
        await interaction.createApplicationCommand(slots).then(value => console.log(value)).catch(error => console.log(error.message));

        const test = {
            "name": "test",
            "description": "Testing module, for experimentation!",
            "options": []
        }

        // Create Global Command
        await interaction.createApplicationCommand(test).then(value => console.log(value)).catch(error => console.log(error.message));

        const transfer = {
            "name": "transfer",
            "description": "Transfer currency from your own wallet to another server member's wallet.",
            "options": [
                {
                    "name": "amount",
                    "description": "The amount to transfer to the other member.",
                    "type": SlashCommands.ApplicationCommandOptionType.INTEGER,
                    "required": true
                },
                {
                    "name": "user",
                    "description": "The user who you are transferring the currency to.",
                    "type": SlashCommands.ApplicationCommandOptionType.USER,
                    "required": true
                }
            ]
        }

        // Create Global Command
        await interaction.createApplicationCommand(transfer).then(value => console.log(value)).catch(error => console.log(error.message));

        const withdraw = {
            "name": "withdraw",
            "description": "Withdraw currency from your bank to your wallet.",
            "options": [
                {
                    "name": "amount",
                    "description": "The amount to withdraw.",
                    "type": SlashCommands.ApplicationCommandOptionType.INTEGER,
                    "required": true
                }
            ]
        }

        // Create Global Command
        await interaction.createApplicationCommand(withdraw).then(value => console.log(value)).catch(error => console.log(error.message));
*/
        const globalCommands = await interaction.getApplicationCommands();

        let msgString = `------\n**Yes, IT'S COMPLETED! You have ${globalCommands.length} commands registered!**\n------\n`;
        let msgEmbeds: Discord.MessageEmbed[] = [];
        for (let x = 0; x < globalCommands.length; x += 1) {
            msgString += `__**Name**__: ${globalCommands[x]?.name} __**Description**__: ${globalCommands[x]?.description}\n`;
            if (msgString.length >= 2000 || x === globalCommands.length - 1) {
                let msgEmbed = new Discord.MessageEmbed();
                if (commandData.guildMember instanceof Discord.User) {
                    msgEmbed
                        .setAuthor(commandData.guildMember.username, commandData.guildMember.avatarURL()!)
                        .setColor([254, 254, 254])
                        .setTimestamp(Date() as unknown as Date)
                        .setTitle('__**Registered Commands:**__');
                }
                else {
                    msgEmbed
                        .setAuthor(commandData.guildMember!.user.username, commandData.guildMember!.user.avatarURL()!)
                        .setColor([254, 254, 254])
                        .setTimestamp(Date() as unknown as Date)
                        .setTitle('__**Registered Commands:**__');
                }

                msgString += `------`;
                let currentMsgEmbed = msgEmbed;
                currentMsgEmbed.setDescription(msgString);
                msgEmbeds.push(currentMsgEmbed);
                msgString = `------\n**Yes, IT'S COMPLETED! You have ${globalCommands.length} commands registered!**\n------\n`;
            }
        }
        for (let x = 0; x < msgEmbeds.length; x += 1) {
            msgEmbeds[x]!.setTitle(`__**Registered Commands, (${(x + 1).toString()} of ${msgEmbeds.length}): **__`);
            await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbeds[x]!);
        }
        
        return commandReturnData;
    }
    catch(error) {
        return new Promise((resolve, reject) => {
            reject(error);
        });
    }
}
command.function = execute;
export default command as FoundationClasses.BotCommand;
