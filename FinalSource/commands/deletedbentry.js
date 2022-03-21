// deletedbentry.ts - Module for my "delete db entry" command.
// Mar 18, 2021
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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Discord = require("discord.js");
var GuildData_1 = __importDefault(require("../GuildData"));
var HelperFunctions_1 = __importDefault(require("../HelperFunctions"));
var Data = /** @class */ (function () {
    function Data() {
        this.key = '';
    }
    return Data;
}());
var DeletedCounter = /** @class */ (function () {
    function DeletedCounter() {
        this.deletedCount = 0;
        this.data = new Data();
    }
    DeletedCounter.prototype.setData = function (key, value) {
        var newData = new Data();
        newData.key = key;
        newData.value = value;
        this.data = newData;
    };
    DeletedCounter.prototype.getData = function () {
        return this.data;
    };
    DeletedCounter.prototype.incrementDeletedCount = function () {
        this.deletedCount += 1;
    };
    DeletedCounter.prototype.returnDeletedCount = function () {
        return this.deletedCount;
    };
    return DeletedCounter;
}());
function onData(dbKey, discordUser, deletedCounter) {
    return __awaiter(this, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(deletedCounter.getData() !== undefined && dbKey !== '')) return [3 /*break*/, 6];
                    if (!deletedCounter.getData().key.includes(dbKey)) return [3 /*break*/, 6];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 6]);
                    console.log(deletedCounter.getData().key, '=', deletedCounter.getData().value);
                    return [4 /*yield*/, discordUser.dataBase.del(deletedCounter.getData().key)];
                case 2:
                    _a.sent();
                    deletedCounter.incrementDeletedCount();
                    return [3 /*break*/, 6];
                case 3:
                    error_1 = _a.sent();
                    if (!error_1.message.includes('Unexpected token')) return [3 /*break*/, 5];
                    return [4 /*yield*/, discordUser.dataBase.del(deletedCounter.getData().key)];
                case 4:
                    _a.sent();
                    deletedCounter.incrementDeletedCount();
                    _a.label = 5;
                case 5: return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
var command = {
    name: 'deletedbentry',
    description: "!deletedbentry = BOTNAME, DBENTRYKEY, where BOTNAME is a bot's name and DBENTRYKEY is the key" +
        "to a database entry that is stored within the bot!",
    function: Function()
};
function execute(commandData, discordUser) {
    var e_1, _a;
    return __awaiter(this, void 0, void 0, function () {
        var commandReturnData, areWeInADM, areWeACommander, guildData, msgString, msgEmbed_1, msg, msgString, msgEmbed_2, msg, msgString, msgEmbed_3, msg, dbKey, argZero, deletedCounter, iterator, iterator_1, iterator_1_1, _b, key, value, e_1_1, msgEmbed, error_2;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 28, , 29]);
                    commandReturnData = {
                        commandName: command.name
                    };
                    return [4 /*yield*/, HelperFunctions_1.default.areWeInADM(commandData)];
                case 1:
                    areWeInADM = _c.sent();
                    if (areWeInADM) {
                        return [2 /*return*/, commandReturnData];
                    }
                    return [4 /*yield*/, HelperFunctions_1.default.doWeHaveAdminPermission(commandData, discordUser)];
                case 2:
                    areWeACommander = _c.sent();
                    if (!areWeACommander) {
                        return [2 /*return*/, commandReturnData];
                    }
                    guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: commandData.guild.id, name: commandData.guild.name, memberCount: commandData.guild.memberCount });
                    return [4 /*yield*/, guildData.getFromDataBase()];
                case 3:
                    _c.sent();
                    if (!(commandData.args[0] === undefined)) return [3 /*break*/, 6];
                    msgString = "------\n**Please, enter a bot to delete the key from! (!deletedbentry = BOTNAME, DBENTRYKEY)**\n------";
                    msgEmbed_1 = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed_1)];
                case 4:
                    msg = _c.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 5:
                    _c.sent();
                    return [2 /*return*/, commandReturnData];
                case 6:
                    if (!(commandData.args[0].toLowerCase() !== 'janny' && commandData.args[0].toLowerCase() !== 'musichouse' && commandData.args[0].toLowerCase() !== 'gamehouse')) return [3 /*break*/, 9];
                    msgString = "------\n**Please, enter a bot to delete the key from! (!deletedbentry = BOTNAME, DBENTRYKEY)**\n------";
                    msgEmbed_2 = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed_2)];
                case 7:
                    msg = _c.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 8:
                    _c.sent();
                    return [2 /*return*/, commandReturnData];
                case 9:
                    if (commandData.args[0].toLowerCase() !== 'gamehouse') {
                        return [2 /*return*/, commandReturnData];
                    }
                    if (!(commandData.args[1] === undefined)) return [3 /*break*/, 12];
                    msgString = "------\n**Please, enter a DB key to search for!**\n------";
                    msgEmbed_3 = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed_3)];
                case 10:
                    msg = _c.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 11:
                    _c.sent();
                    return [2 /*return*/, commandReturnData];
                case 12:
                    dbKey = '';
                    if (commandData.args[1] !== undefined) {
                        argZero = commandData.args[1].toString();
                        dbKey = argZero;
                    }
                    deletedCounter = new DeletedCounter();
                    iterator = discordUser.dataBase.iterate({});
                    _c.label = 13;
                case 13:
                    _c.trys.push([13, 19, 20, 25]);
                    iterator_1 = __asyncValues(iterator);
                    _c.label = 14;
                case 14: return [4 /*yield*/, iterator_1.next()];
                case 15:
                    if (!(iterator_1_1 = _c.sent(), !iterator_1_1.done)) return [3 /*break*/, 18];
                    _b = iterator_1_1.value, key = _b.key, value = _b.value;
                    console.log(key + ' = ' + value);
                    if (!key.includes(dbKey)) return [3 /*break*/, 17];
                    deletedCounter.setData(key, value);
                    return [4 /*yield*/, onData(dbKey, discordUser, deletedCounter)];
                case 16:
                    _c.sent();
                    _c.label = 17;
                case 17: return [3 /*break*/, 14];
                case 18: return [3 /*break*/, 25];
                case 19:
                    e_1_1 = _c.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 25];
                case 20:
                    _c.trys.push([20, , 23, 24]);
                    if (!(iterator_1_1 && !iterator_1_1.done && (_a = iterator_1.return))) return [3 /*break*/, 22];
                    return [4 /*yield*/, _a.call(iterator_1)];
                case 21:
                    _c.sent();
                    _c.label = 22;
                case 22: return [3 /*break*/, 24];
                case 23:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 24: return [7 /*endfinally*/];
                case 25: return [4 /*yield*/, iterator.end()];
                case 26:
                    _c.sent();
                    msgEmbed = new Discord.MessageEmbed();
                    msgEmbed
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription("------\n__**Number of Deleted Entries**__: " + deletedCounter.returnDeletedCount() + "\n------")
                        .setTimestamp(Date.now())
                        .setTitle('__**Deleted DB Entries:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 27:
                    _c.sent();
                    return [2 /*return*/, commandReturnData];
                case 28:
                    error_2 = _c.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            reject(error_2);
                        })];
                case 29: return [2 /*return*/];
            }
        });
    });
}
command.function = execute;
exports.default = command;
