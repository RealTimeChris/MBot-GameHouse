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
    static readonly guildsData: Map<string, GuildData>;
    readonly dataBase: Level;
    readonly dataBaseKey: string;
    readonly guildName: string;
    readonly id: string;
    readonly memberCount: number;
    blackjackStack: FoundationClasses.Card[];
    borderColor: [number, number, number];
    casinoStats: FoundationClasses.CasinoStats;
    gameChannelIDs: string[];
    guildShop: FoundationClasses.Shop;
    rouletteGame: FoundationClasses.Roulette;
    getFromDataBase(): Promise<void>;
    writeToDataBase(): Promise<void>;
    constructor(initData: GuildDataInitData);
}
export {};
