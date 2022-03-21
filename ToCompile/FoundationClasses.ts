// FoundationClasses.ts - Module for my "builder classes".
// Apr 5, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');

module FoundationClasses {
    /**
     * Class representing a single card from a standard Deck.
     */
    export interface Card {
        suit: string;
        type: string;
        value: number;
    }

    /**
     * Class representing a standard 52-card Deck of cards.
     */
    export class Deck {
            cards: Card[] = [];

        constructor() {
            this.cards.length = 52;

            for (let x = 0; x < this.cards.length; x += 1) {
                this.cards[x] = {suit:'', type:'', value: 0};

                if (Math.trunc(x / 13) === 0) {
                    this.cards[x]!.suit = ':hearts:';
                } else if (Math.trunc(x / 13) === 1) {
                    this.cards[x]!.suit = ':diamonds:';
                } else if (Math.trunc(x / 13) === 2) {
                    this.cards[x]!.suit = ':clubs:';
                } else if (Math.trunc(x / 13) === 3) {
                    this.cards[x]!.suit = ':spades:';
                }

                if (x % 13 === 0) {
                    this.cards[x]!.type = 'Ace';
                    this.cards[x]!.value = 0;
                } else if (x % 13 === 1) {
                    this.cards[x]!.type = '2';
                    this.cards[x]!.value = 2;
                } else if (x % 13 === 2) {
                    this.cards[x]!.type = '3';
                    this.cards[x]!.value = 3;
                } else if (x % 13 === 3) {
                    this.cards[x]!.type = '4';
                    this.cards[x]!.value = 4;
                } else if (x % 13 === 4) {
                    this.cards[x]!.type = '5';
                    this.cards[x]!.value = 5;
                } else if (x % 13 === 5) {
                    this.cards[x]!.type = '6';
                    this.cards[x]!.value = 6;
                } else if (x % 13 === 6) {
                    this.cards[x]!.type = '7';
                    this.cards[x]!.value = 7;
                } else if (x % 13 === 7) {
                    this.cards[x]!.type = '8';
                    this.cards[x]!.value = 8;
                } else if (x % 13 === 8) {
                    this.cards[x]!.type = '9';
                    this.cards[x]!.value = 9;
                } else if (x % 13 === 9) {
                    this.cards[x]!.type = '10';
                    this.cards[x]!.value = 10;
                } else if (x % 13 === 10) {
                    this.cards[x]!.type = 'Jack';
                    this.cards[x]!.value = 10;
                } else if (x % 13 === 11) {
                    this.cards[x]!.type = 'Queen';
                    this.cards[x]!.value = 10;
                } else if (x % 13 === 12) {
                    this.cards[x]!.type = 'King';
                    this.cards[x]!.value = 10;
                }
            }
        }
        /**
         * Draws a random card from the Deck.
         */
        drawRandomcard(): Card  {
            if (this.cards.length === 0) {
                const voidCard: Card = {suit: '',  type: '', value: 0};
                voidCard.suit = ':black_large_square:';
                voidCard.type = 'null';
                voidCard.value = 0;
                return voidCard;
            }

            const cardIndex = Math.trunc(Math.random() * this.cards.length);
            const currentCard = this.cards[cardIndex]!;
            this.cards.splice(cardIndex, 1);
            return currentCard;
        }
    }

    /**
     * Class representing a roulette bet.
     */
    export interface RouletteBet {
        betAmount: number;
        betOptions: string;
        betType: string;
        payoutAmount: number;
        userID: string;
        winningNumbers: string[];
    }

    /**
     * Class representnig a roulette game.
     */
    export interface Roulette {
        bets: RouletteBet[];
        currentlySpinning: Boolean;
    }

    /**
     * Class representing the "largest paid out" user.
     */
    export interface LargestPayout {
        amount: number;
        date: string;
        userID: string;
        username: string;
    }

    /**
     * Class representing casino statistics.
     */
    export interface CasinoStats {
        largestBlackjackPayout: LargestPayout;
        totalBlackjackPayout: number;
        largestCoinFlipPayout: LargestPayout;
        totalCoinFlipPayout: number;
        largestRoulettePayout: LargestPayout;
        totalRoulettePayout: number;
        largestSlotsPayout: LargestPayout;
        totalSlotsPayout: number;
        totalPayout: number;
    }

    /**
     * Class representing an inventory item, for the dueling/robbing system.
     */
    export interface InventoryItem {
        emoji: string;
        itemCost: number;
        itemName: string;
        oppMod: number;
        selfMod: number;
    }

    /**
     * Class representing an inventory role for the dueling/robbing sytstem
     */
    export interface InventoryRole {
        roleCost: number;
        roleID: string;
        roleName: string;
    }

    /**
     * Class representing the "shop" that is hosted by the bot.
     */
    export interface Shop {
        items: InventoryItem[];
        roles: InventoryRole[];
    }

    /**
     * Class representing an individual's currency.
     */
    export interface Currency {
        bank: number;
        timeOfLastDeposit: number;
        wallet: number;
    }

    /**
     * Class representing a function/command.
     */
     export interface BotCommand {
        description: string | Discord.MessageEmbed;
        function: Function;
        name: string;
    }

    /**
     * Class representing a command' return values.
     */
    export interface CommandReturnData {
        commandName: string;
    }

    /**
     * Base abstract class for Discord classes.
     */
    export abstract class DiscordEntity {
        public readonly abstract id: string = '';
        public abstract getFromDataBase(): Promise<void>;
        public abstract writeToDataBase(): Promise<void>;
    }

    /**
     * Class representing the data that goes into a command.
     */
    export class CommandData {
        public args: string[] = [];
        public fromTextChannel: Discord.TextChannel | Discord.DMChannel | null = null;
        public fromTextChannelType: string = '';
        public guild: Discord.Guild | null = null;
        public guildMember: Discord.GuildMember | Discord.User | null = null;
        public interaction: any = null;
        public permsChannel: Discord.GuildChannel | null = null;
        public toTextChannel: Discord.WebhookClient | Discord.TextChannel | Discord.DMChannel |  null = null;
    
        public async initialize(client: Discord.Client, fromTextChannelID: string, fromTextChannelType: string, interaction: any = null, guildMemberID: string = '', guildID: string = ''): Promise<void> {
            try{
                this.fromTextChannelType = fromTextChannelType;
                this.fromTextChannel = await client.channels.fetch(fromTextChannelID) as Discord.TextChannel | Discord.DMChannel;
                if (interaction !== null) {
                    this.interaction = interaction;
                }
                if (guildID !== '') {
                    this.guild  = await client.guilds.fetch(guildID);
                }
                if (guildMemberID !== '' && guildID !== '') {
                    this.guildMember = await this.guild!.members.fetch(guildMemberID);
                }
                else{
                    this.guildMember = await client.users.fetch(guildMemberID);
                }
                if (interaction !== null && fromTextChannelType !== 'dm') {
                    this.toTextChannel = new Discord.WebhookClient(client.user!.id, this.interaction.token);
                    this.permsChannel = new Discord.GuildChannel(this.guild!, this.fromTextChannel);
                }
                if (interaction === null && fromTextChannelType !== 'dm') {
                    this.toTextChannel = await client.channels.fetch(fromTextChannelID) as Discord.TextChannel;
                    this.permsChannel = await client.channels.fetch(fromTextChannelID) as Discord.GuildChannel;
                }
                if (interaction !== null && fromTextChannelType === 'dm') {
                    this.toTextChannel = new Discord.WebhookClient(client.user!.id, this.interaction.token);
                    this.permsChannel = await client.channels.fetch(fromTextChannelID) as Discord.GuildChannel;
                }
                if (interaction === null && fromTextChannelType === 'dm') {
                    this.toTextChannel = await this.guildMember.createDM(true);
                    this.permsChannel = await client.channels.fetch(fromTextChannelID) as Discord.GuildChannel;
                }
                return;
            }
            catch(error) {
                return new Promise((resolve, reject) => {
                    reject(error);
                })
            }
        }
    }
}
export default FoundationClasses;
