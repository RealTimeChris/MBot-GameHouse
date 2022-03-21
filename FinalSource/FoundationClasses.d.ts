import Discord = require('discord.js');
declare module FoundationClasses {
    /**
     * Class representing a single card from a standard Deck.
     */
    interface Card {
        suit: string;
        type: string;
        value: number;
    }
    /**
     * Class representing a standard 52-card Deck of cards.
     */
    class Deck {
        cards: Card[];
        constructor();
        /**
         * Draws a random card from the Deck.
         */
        drawRandomcard(): Card;
    }
    /**
     * Class representing a roulette bet.
     */
    interface RouletteBet {
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
    interface Roulette {
        bets: RouletteBet[];
        currentlySpinning: Boolean;
    }
    /**
     * Class representing the "largest paid out" user.
     */
    interface LargestPayout {
        amount: number;
        date: string;
        userID: string;
        username: string;
    }
    /**
     * Class representing casino statistics.
     */
    interface CasinoStats {
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
    interface InventoryItem {
        emoji: string;
        itemCost: number;
        itemName: string;
        oppMod: number;
        selfMod: number;
    }
    /**
     * Class representing an inventory role for the dueling/robbing sytstem
     */
    interface InventoryRole {
        roleCost: number;
        roleID: string;
        roleName: string;
    }
    /**
     * Class representing the "shop" that is hosted by the bot.
     */
    interface Shop {
        items: InventoryItem[];
        roles: InventoryRole[];
    }
    /**
     * Class representing an individual's currency.
     */
    interface Currency {
        bank: number;
        timeOfLastDeposit: number;
        wallet: number;
    }
    /**
     * Class representing a function/command.
     */
    interface BotCommand {
        description: string | Discord.MessageEmbed;
        function: Function;
        name: string;
    }
    /**
     * Class representing a command' return values.
     */
    interface CommandReturnData {
        commandName: string;
    }
    /**
     * Base abstract class for Discord classes.
     */
    abstract class DiscordEntity {
        abstract readonly id: string;
        abstract getFromDataBase(): Promise<void>;
        abstract writeToDataBase(): Promise<void>;
    }
    /**
     * Class representing the data that goes into a command.
     */
    class CommandData {
        args: string[];
        fromTextChannel: Discord.TextChannel | Discord.DMChannel | null;
        fromTextChannelType: string;
        guild: Discord.Guild | null;
        guildMember: Discord.GuildMember | Discord.User | null;
        interaction: any;
        permsChannel: Discord.GuildChannel | null;
        toTextChannel: Discord.WebhookClient | Discord.TextChannel | Discord.DMChannel | null;
        initialize(client: Discord.Client, fromTextChannelID: string, fromTextChannelType: string, interaction?: any, guildMemberID?: string, guildID?: string): Promise<void>;
    }
}
export default FoundationClasses;
