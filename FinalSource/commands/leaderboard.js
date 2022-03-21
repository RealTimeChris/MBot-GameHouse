// leaderboard.ts - Module for my "show leaderboard" command.
// Feb 8, 2021
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
var Discord = require("discord.js");
var GuildData_1 = __importDefault(require("../GuildData"));
var GuildMemberData_1 = __importDefault(require("../GuildMemberData"));
var HelperFunctions_1 = __importDefault(require("../HelperFunctions"));
var command = {
    name: 'leaderboard',
    description: '__**Leaderboard Usage:**__ !leaderboard',
    function: Function()
};
function execute(commandData, discordUser) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var commandReturnData, areWeInADM, areWeAllowed, guildData, msgString, msgEmbed, msg, minIdx, temp, membersArray_1, len, x, y, membersPerPage, totalPageCount, currentPage, pageEmbeds, pageStrings, x, msgString, currentPageIndex, userID, newMessage, error_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 10, , 11]);
                    commandReturnData = {
                        commandName: command.name
                    };
                    return [4 /*yield*/, HelperFunctions_1.default.areWeInADM(commandData)];
                case 1:
                    areWeInADM = _c.sent();
                    if (areWeInADM === true) {
                        return [2 /*return*/, commandReturnData];
                    }
                    return [4 /*yield*/, HelperFunctions_1.default.checkIfAllowedInChannel(commandData, discordUser)];
                case 2:
                    areWeAllowed = _c.sent();
                    if (areWeAllowed === false) {
                        return [2 /*return*/, commandReturnData];
                    }
                    guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: commandData.guild.id, memberCount: commandData.guild.memberCount, name: commandData.guild.name });
                    return [4 /*yield*/, guildData.getFromDataBase()];
                case 3:
                    _c.sent();
                    if (!!((_b = commandData.fromTextChannel.permissionsFor((_a = commandData.guild) === null || _a === void 0 ? void 0 : _a.client.user)) === null || _b === void 0 ? void 0 : _b.has('MANAGE_MESSAGES'))) return [3 /*break*/, 6];
                    msgString = "------\n**I need the Manage Messages permission in this channel, for this command!**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Permissions Issue:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
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
                    minIdx = 0;
                    temp = void 0;
                    membersArray_1 = [];
                    GuildMemberData_1.default.guildMembersData.forEach(function (guildMember, key) {
                        if (key.includes(commandData.guild.id)) {
                            membersArray_1.push(guildMember);
                        }
                    });
                    len = guildData.memberCount;
                    for (x = 0; x < len; x += 1) {
                        minIdx = x;
                        for (y = x + 1; y < len; y += 1) {
                            if (membersArray_1[y].currency.wallet > membersArray_1[minIdx].currency.wallet) {
                                minIdx = y;
                            }
                        }
                        temp = membersArray_1[x];
                        membersArray_1[x] = membersArray_1[minIdx];
                        membersArray_1[minIdx] = temp;
                    }
                    membersPerPage = 20;
                    totalPageCount = 0;
                    if (guildData.memberCount % membersPerPage > 0) {
                        totalPageCount = Math.trunc(guildData.memberCount / membersPerPage) + 1;
                    }
                    else {
                        totalPageCount = Math.trunc(guildData.memberCount / membersPerPage);
                    }
                    currentPage = 0;
                    pageEmbeds = [new Discord.MessageEmbed()];
                    pageEmbeds.length = 0;
                    pageStrings = [];
                    pageStrings.length = 0;
                    for (x = 0; x < guildData.memberCount; x += 1) {
                        if (x % membersPerPage === 0) {
                            pageEmbeds.length += 1;
                            pageEmbeds[currentPage] = new Discord.MessageEmbed();
                            pageStrings.length += 1;
                            pageStrings[currentPage] = '';
                        }
                        msgString = '';
                        msgString += "__**#" + (currentPage * membersPerPage + ((x % membersPerPage) + 1)) + " |Name:**__ " + membersArray_1[x].userName + " __**|" + discordUser.userData.currencyName + ":**__ " + membersArray_1[x].currency.wallet + "\n";
                        pageStrings[currentPage] += msgString;
                        if (x % membersPerPage === membersPerPage - 1 || x === guildData.memberCount - 1) {
                            pageEmbeds[currentPage]
                                .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                                .setDescription(pageStrings[currentPage])
                                .setTimestamp(Date.now())
                                .setTitle("__**Leaderboard (Wallet) (Page " + (currentPage + 1) + " of " + totalPageCount + ")**__")
                                .setColor(guildData.borderColor);
                            currentPage += 1;
                        }
                    }
                    currentPageIndex = 0;
                    userID = commandData.guildMember.id;
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, pageEmbeds[currentPageIndex])];
                case 7:
                    newMessage = _c.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        newMessage = new Discord.Message(commandData.guild.client, newMessage, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, HelperFunctions_1.default.recurseThroughMessagePages(userID, newMessage, currentPageIndex, pageEmbeds, true)];
                case 8:
                    _c.sent();
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 9:
                    _c.sent();
                    return [2 /*return*/, commandReturnData];
                case 10:
                    error_1 = _c.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            reject(error_1);
                        })];
                case 11: return [2 /*return*/];
            }
        });
    });
}
command.function = execute;
exports.default = command;
