import Level from 'level-ts';
import FoundationClasses from './FoundationClasses';
/**
 * Class representing the init data for a guild member data structure.
 */
interface GuildMemberDataInitData {
    dataBase: Level;
    displayName: string;
    guildId: string;
    id: string;
    userName: string;
}
/**
 * Class representing a single guild member.
 */
export default class GuildMemberData extends FoundationClasses.DiscordEntity {
    static readonly guildMembersData: Map<string, GuildMemberData>;
    readonly dataBase: Level;
    readonly dataBaseKey: string;
    readonly displayName: string;
    readonly guildId: string;
    readonly id: string;
    readonly userName: string;
    currency: FoundationClasses.Currency;
    items: FoundationClasses.InventoryItem[];
    lastTimeRobbed: number;
    lastTimeWorked: number;
    roles: FoundationClasses.InventoryRole[];
    getFromDataBase(): Promise<void>;
    writeToDataBase(): Promise<void>;
    constructor(initData: GuildMemberDataInitData);
}
export {};
