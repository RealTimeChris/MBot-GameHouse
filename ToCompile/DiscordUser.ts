// discorduser.ts - Module for my "discord user" class.
// Apr 4, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import Level from 'level-ts';
import GuildData from './GuildData';
import GuildMemberData from './GuildMemberData';
import config = require('./config.json');

/**
 * Class representing a single instance of "Discord".
 */
interface DiscordUserData {
    botCommanders: string[];
    botToken: string;
    currencyName: string;
    dataBaseFilePath: string;
    guildCount: number;
    hoursOfDepositCooldown: number;
    hoursOfDrugSaleCooldown: number;
    hoursOfRobberyCooldown: number;
    prefix: string;
    publicKey: string;
    startupCall: boolean;
    userID: string;
    userName: string;
}

/**
 * Class representing an entire instance of Discord, from the perspective of a given bot.
 */
export default class DiscordUser {
    public userData: DiscordUserData = {botCommanders: [], botToken: '', currencyName: '', 
        dataBaseFilePath: '', guildCount: 0, hoursOfDepositCooldown: 0, hoursOfDrugSaleCooldown: 0, hoursOfRobberyCooldown: 0,
        prefix: '', publicKey: '', startupCall: true, userID: '', userName: ''};
    public dataBase: any;

    /**
     * Initializes the instance of Discord, within the DiscordUser export class.
     */
    public async initializeInstance(client: Discord.Client): Promise<void> {
        try {
            const dataBaseFilePath = `${config.dataBaseFilePath} + ${client.user!.id}`;
            this.dataBase = new Level(dataBaseFilePath);
            this.userData = await this.getUserDataFromDB(client);
            this.userData.dataBaseFilePath = dataBaseFilePath;
            this.userData.startupCall = true;
            console.log(`Logged in as ${client.user!.tag}!`);
            await this.updateDataCacheAndSaveToFile(client);
            return;
        } catch (error) {
            return new Promise((resolve, reject) => {
                reject(error);
            });
        }
    }

    /**
     * Collects user data from the database, or alternatively, from the live objects.
     */
    public async getUserDataFromDB(client: Discord.Client): Promise<DiscordUserData> {
        try {
            console.log('Loading user data from the database!');
            const userData = await this.dataBase.get(client.user!.id);
            return userData;
        } catch (error) {
            if (error.type === 'NotFoundError') {
                console.log("Adding new entry for the current user's data!");
                const userData: DiscordUserData = {
                    botCommanders: config.botCommanders,
                    botToken: config.botToken,
                    currencyName: config.currencyName,
                    dataBaseFilePath: this.userData.dataBaseFilePath,
                    guildCount: client.guilds.cache.array().length,
                    hoursOfDepositCooldown: config.hoursOfDepositCooldown,
                    hoursOfDrugSaleCooldown: config.hoursOfDrugSaleCooldown,
                    hoursOfRobberyCooldown: config.hoursOfRobberyCooldown,
                    prefix: config.prefix,
                    publicKey: config.publicKey,
                    startupCall: true,
                    userID: client.user!.id,
                    userName: client.user!.username};
                return userData;
            }
            return new Promise((resolve, reject) => {
                reject(error);
            });
        }
    }

    /**
     * Updates the user data within the database.
     */
    public async updateUserDataInDB(newUserData: DiscordUserData): Promise<void> {
        try {
            this.userData = newUserData;
            await this.dataBase.put(this.userData.userID, this.userData);
            this.userData = await this.dataBase.get(this.userData.userID);
            console.log('New User Cache:');
            console.log(this.userData);
            return;
        } catch (error) {
            return new Promise((resolve, reject) => {
                reject(error);
            });
        }
    }

    /**
     * * Updates the cache of user data.
     */
    private async updateUserData(client: Discord.Client): Promise<void> {
        try {
            console.log('Updating the user data!');
            const newUserData: DiscordUserData = {
                botCommanders: config.botCommanders,
                botToken: config.botToken,
                currencyName: config.currencyName,
                dataBaseFilePath: this.userData.dataBaseFilePath,
                guildCount: client.guilds.cache.size,
                hoursOfDepositCooldown: config.hoursOfDepositCooldown,
                hoursOfDrugSaleCooldown: config.hoursOfDrugSaleCooldown,
                hoursOfRobberyCooldown: config.hoursOfRobberyCooldown,
                prefix: config.prefix,
                publicKey: config.publicKey,
                startupCall: this.userData.startupCall,
                userID: client.user!.id,
                userName: client.user!.username,
            }
            await this.updateUserDataInDB(newUserData);
            return;
        } catch (error) {
            return new Promise((resolve, reject) => {
                reject(error);
            });
        }
    }

    /**
    * Updates the cache of guild data.}
    */
    private async updateGuildsData(client: Discord.Client): Promise<void> {
        try {
            const liveDataGuildArray = client.guilds.cache.array().sort();

            for (let x = 0; x < liveDataGuildArray.length; x += 1) {
                const guildData = new GuildData({dataBase: this.dataBase, id: liveDataGuildArray[x]!.id, memberCount: liveDataGuildArray[x]!.memberCount, name: liveDataGuildArray[x]!.name});
                await guildData.getFromDataBase();
                if (this.userData.startupCall === true) {
                    guildData.rouletteGame = {currentlySpinning: false, bets: []};
                }
                await guildData.writeToDataBase();
            }
            return;
        } catch (error) {
            return new Promise((resolve, reject) => {
                reject(error);
            });
        }
    }

    /**
    * Function for updating all of the guild member's data caches,
    */
    private async updateGuildMembersData(client: Discord.Client): Promise<void> {
        try {
            const liveDataGuildArray = client.guilds.cache.array();
            for (let x = 0; x < liveDataGuildArray.length; x += 1) {
                const liveDataGuildMemberArray = (await liveDataGuildArray[x]!.members.fetch()).array();

                for (let y = 0; y < liveDataGuildMemberArray.length; y += 1) {
                    const guildMemberData = new GuildMemberData({dataBase: this.dataBase, displayName: liveDataGuildMemberArray[y]!.displayName,
                        guildId: liveDataGuildArray[x]!.id, id: liveDataGuildMemberArray[y]!.id, userName: liveDataGuildMemberArray[y]!.user.username});
                    await guildMemberData.getFromDataBase();
                    await guildMemberData.writeToDataBase();
                }
            }
            this.userData.startupCall = false;
            await this.updateUserDataInDB(this.userData);
            return;
        } catch (error) {
            return new Promise((resolve, reject) => {
                reject(error);  
            });
        }
    }

    /**
    * Updates the current data cache from live objects and the JSON data file,
    * and saves it to the JSON file.
    */
    public async updateDataCacheAndSaveToFile(client: Discord.Client): Promise<void> {
        try {
            await this.updateUserData(client);
            await this.updateGuildsData(client);
            await this.updateGuildMembersData(client);
            return;
        } catch (error) {
            return new Promise((resolve, reject) => {
                reject(error);
            });
        }
    }
}
