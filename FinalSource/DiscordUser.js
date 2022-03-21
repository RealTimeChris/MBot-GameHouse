// discorduser.ts - Module for my "discord user" class.
// Apr 4, 2021
// Chris M.
// https://github.com/RealTimeChris
'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var level_ts_1 = __importDefault(require("level-ts"));
var GuildData_1 = __importDefault(require("./GuildData"));
var GuildMemberData_1 = __importDefault(require("./GuildMemberData"));
var config = require("./config.json");
/**
 * Class representing an entire instance of Discord, from the perspective of a given bot.
 */
var DiscordUser = /** @class */ (function () {
    function DiscordUser() {
        this.userData = { botCommanders: [], botToken: '', currencyName: '',
            dataBaseFilePath: '', guildCount: 0, hoursOfDepositCooldown: 0, hoursOfDrugSaleCooldown: 0, hoursOfRobberyCooldown: 0,
            prefix: '', publicKey: '', startupCall: true, userID: '', userName: '' };
    }
    /**
     * Initializes the instance of Discord, within the DiscordUser export class.
     */
    DiscordUser.prototype.initializeInstance = function (client) {
        return __awaiter(this, void 0, void 0, function () {
            var dataBaseFilePath, _a, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        dataBaseFilePath = config.dataBaseFilePath + " + " + client.user.id;
                        this.dataBase = new level_ts_1.default(dataBaseFilePath);
                        _a = this;
                        return [4 /*yield*/, this.getUserDataFromDB(client)];
                    case 1:
                        _a.userData = _b.sent();
                        this.userData.dataBaseFilePath = dataBaseFilePath;
                        this.userData.startupCall = true;
                        console.log("Logged in as " + client.user.tag + "!");
                        return [4 /*yield*/, this.updateDataCacheAndSaveToFile(client)];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                    case 3:
                        error_1 = _b.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                reject(error_1);
                            })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Collects user data from the database, or alternatively, from the live objects.
     */
    DiscordUser.prototype.getUserDataFromDB = function (client) {
        return __awaiter(this, void 0, void 0, function () {
            var userData, error_2, userData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        console.log('Loading user data from the database!');
                        return [4 /*yield*/, this.dataBase.get(client.user.id)];
                    case 1:
                        userData = _a.sent();
                        return [2 /*return*/, userData];
                    case 2:
                        error_2 = _a.sent();
                        if (error_2.type === 'NotFoundError') {
                            console.log("Adding new entry for the current user's data!");
                            userData = {
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
                                userID: client.user.id,
                                userName: client.user.username
                            };
                            return [2 /*return*/, userData];
                        }
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                reject(error_2);
                            })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Updates the user data within the database.
     */
    DiscordUser.prototype.updateUserDataInDB = function (newUserData) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        this.userData = newUserData;
                        return [4 /*yield*/, this.dataBase.put(this.userData.userID, this.userData)];
                    case 1:
                        _b.sent();
                        _a = this;
                        return [4 /*yield*/, this.dataBase.get(this.userData.userID)];
                    case 2:
                        _a.userData = _b.sent();
                        console.log('New User Cache:');
                        console.log(this.userData);
                        return [2 /*return*/];
                    case 3:
                        error_3 = _b.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                reject(error_3);
                            })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * * Updates the cache of user data.
     */
    DiscordUser.prototype.updateUserData = function (client) {
        return __awaiter(this, void 0, void 0, function () {
            var newUserData, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        console.log('Updating the user data!');
                        newUserData = {
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
                            userID: client.user.id,
                            userName: client.user.username,
                        };
                        return [4 /*yield*/, this.updateUserDataInDB(newUserData)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                    case 2:
                        error_4 = _a.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                reject(error_4);
                            })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
    * Updates the cache of guild data.}
    */
    DiscordUser.prototype.updateGuildsData = function (client) {
        return __awaiter(this, void 0, void 0, function () {
            var liveDataGuildArray, x, guildData, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        liveDataGuildArray = client.guilds.cache.array().sort();
                        x = 0;
                        _a.label = 1;
                    case 1:
                        if (!(x < liveDataGuildArray.length)) return [3 /*break*/, 5];
                        guildData = new GuildData_1.default({ dataBase: this.dataBase, id: liveDataGuildArray[x].id, memberCount: liveDataGuildArray[x].memberCount, name: liveDataGuildArray[x].name });
                        return [4 /*yield*/, guildData.getFromDataBase()];
                    case 2:
                        _a.sent();
                        if (this.userData.startupCall === true) {
                            guildData.rouletteGame = { currentlySpinning: false, bets: [] };
                        }
                        return [4 /*yield*/, guildData.writeToDataBase()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        x += 1;
                        return [3 /*break*/, 1];
                    case 5: return [2 /*return*/];
                    case 6:
                        error_5 = _a.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                reject(error_5);
                            })];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    /**
    * Function for updating all of the guild member's data caches,
    */
    DiscordUser.prototype.updateGuildMembersData = function (client) {
        return __awaiter(this, void 0, void 0, function () {
            var liveDataGuildArray, x, liveDataGuildMemberArray, y, guildMemberData, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 10, , 11]);
                        liveDataGuildArray = client.guilds.cache.array();
                        x = 0;
                        _a.label = 1;
                    case 1:
                        if (!(x < liveDataGuildArray.length)) return [3 /*break*/, 8];
                        return [4 /*yield*/, liveDataGuildArray[x].members.fetch()];
                    case 2:
                        liveDataGuildMemberArray = (_a.sent()).array();
                        y = 0;
                        _a.label = 3;
                    case 3:
                        if (!(y < liveDataGuildMemberArray.length)) return [3 /*break*/, 7];
                        guildMemberData = new GuildMemberData_1.default({ dataBase: this.dataBase, displayName: liveDataGuildMemberArray[y].displayName,
                            guildId: liveDataGuildArray[x].id, id: liveDataGuildMemberArray[y].id, userName: liveDataGuildMemberArray[y].user.username });
                        return [4 /*yield*/, guildMemberData.getFromDataBase()];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, guildMemberData.writeToDataBase()];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6:
                        y += 1;
                        return [3 /*break*/, 3];
                    case 7:
                        x += 1;
                        return [3 /*break*/, 1];
                    case 8:
                        this.userData.startupCall = false;
                        return [4 /*yield*/, this.updateUserDataInDB(this.userData)];
                    case 9:
                        _a.sent();
                        return [2 /*return*/];
                    case 10:
                        error_6 = _a.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                reject(error_6);
                            })];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    /**
    * Updates the current data cache from live objects and the JSON data file,
    * and saves it to the JSON file.
    */
    DiscordUser.prototype.updateDataCacheAndSaveToFile = function (client) {
        return __awaiter(this, void 0, void 0, function () {
            var error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.updateUserData(client)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.updateGuildsData(client)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.updateGuildMembersData(client)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                    case 4:
                        error_7 = _a.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                reject(error_7);
                            })];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return DiscordUser;
}());
exports.default = DiscordUser;
