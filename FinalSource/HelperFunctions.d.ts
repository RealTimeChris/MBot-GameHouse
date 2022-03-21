import Discord = require('discord.js');
import FoundationClasses from './FoundationClasses';
import DiscordUser from './DiscordUser';
declare module HelperFunctions {
    /**
     * Function for sending out a message, using the appropriate channel.
     */
    function sendMessageWithCorrectChannel(commandData: FoundationClasses.CommandData, messageContents: String | Discord.MessageEmbed, atUserID?: string | null): Promise<Discord.Message>;
    /**
     * Applies an asymptotic transform function onto an input value,
     * capping it out at the ceiling value.
     */
    function applyAsymptoticTransform(inputModValue: number, horizontalStretch: number, ceiling: number): number;
    /**
     * Recurses through a succession of messages.
     */
    function recurseThroughMessagePages(userID: string, message: Discord.Message, currentPageIndex: number, messageEmbeds: Discord.MessageEmbed[], deleteAfter: boolean): Promise<void>;
    /**
     * Checks a user ID against an array of user IDs to see if it is present.
     */
    function checkForBotCommanderStatus(userID: string, commanderIDs: string[]): Promise<boolean>;
    /**
     * Checks to see if we're in a DM channel, and sends a warning message if so.
     */
    function areWeInADM(commandData: FoundationClasses.CommandData): Promise<boolean>;
    /**
     * Checks if we have admin permissions in the current channel.
     */
    function doWeHaveAdminPermission(commandData: FoundationClasses.CommandData, discordUser: DiscordUser): Promise<boolean>;
    /**
    * Checks to see if we are allowed to use a given channel for given activities.
    */
    function checkIfAllowedInChannel(commandData: FoundationClasses.CommandData, discordUser: DiscordUser): Promise<boolean>;
}
export default HelperFunctions;
