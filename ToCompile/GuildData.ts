// GuildData.ts - Module for my "guild data" class.
// Apr 5, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Level from 'level-ts';
import FoundationClasses from './FoundationClasses';

/**
 * Class representing the startup values of a guild data structure.
 */
interface GuildDataInitData {
    dataBase: Level;
    id: string;
    memberCount: number;
    name: string;
}

/**
 * Class representing a single guild/server.
 */
export default class GuildData extends FoundationClasses.DiscordEntity {
    public static readonly guildsData: Map<string, GuildData> = new Map<string, GuildData>();
    public readonly dataBase: Level;
    public readonly dataBaseKey: string;
    public readonly guildName: string;
    public readonly id: string;
    public readonly memberCount: number;
    public blackjackStack: FoundationClasses.Card[] = [];
    public borderColor: [number, number, number] = [254, 254, 254];
    public casinoStats: FoundationClasses.CasinoStats = {
        largestBlackjackPayout:{amount: 0, date: Date(), userID: '', username: ''},
        largestCoinFlipPayout: {amount: 0, date: Date(), userID: '', username: ''},
        largestRoulettePayout: {amount: 0, date: Date(), userID: '', username: ''},
        largestSlotsPayout: {amount: 0, date: Date(), userID: '', username: ''},
        totalBlackjackPayout: 0,
        totalCoinFlipPayout: 0,
        totalRoulettePayout: 0,
        totalSlotsPayout: 0,
        totalPayout: 0};
    public gameChannelIDs: string[] = [];
    public guildShop: FoundationClasses.Shop = {roles: [], items: []};
    public rouletteGame: FoundationClasses.Roulette = {bets:[], currentlySpinning: false};
    
    public async getFromDataBase(): Promise<void> {
        try{
            const guildData = await this.dataBase.get(this.dataBaseKey) as GuildData;
            this.blackjackStack = guildData.blackjackStack;
            this.borderColor = guildData.borderColor;
            this.casinoStats = guildData.casinoStats;
            this.gameChannelIDs = guildData.gameChannelIDs;
            this.guildShop = guildData.guildShop;
            this.rouletteGame = guildData.rouletteGame;
        }
        catch(error) {
            if (error.type === 'NotFoundError') {
                console.log(`No entry found for guild by the Id of ${this.id} with name of ${this.guildName}, creating one!`);
                console.log(this);
            }
        }
    }
    public async writeToDataBase(): Promise<void> {
        if (this.guildName === '') {
            const error = new Error();
            error.name = "Non-Initialized Structure";
            error.message = "You've forgotten to initialize the GuildData structure!";
            throw error;
        }
        console.log('Updating database values for guild: ' + this.guildName);
        await this.dataBase.put(this.dataBaseKey, this);
        GuildData.guildsData.set(this.dataBaseKey, this);
    }
    constructor(initData: GuildDataInitData) {
        super();
        const IdRegExp = /\d{17,18}/;
        this.dataBase = initData.dataBase;
        this.guildName = initData.name.trim();
        this.id = initData.id.trim();
        this.memberCount = initData.memberCount;
        if (!IdRegExp.test(this.id)) {
            const error = new Error();
            error.name = "Guild Id Issue";
            error.message = "You've passed an invalid guild Id to the constructor:\n" + this.id;
            throw error;
        }
        this.dataBaseKey = this.id;
    }
}
