// HelperFunctions.ts - Module for my "helper functions".
// Apr 4, 2021
// Chris M.
// https://github.com/RealTimeChris
"use strict";
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
var GuildData_1 = __importDefault(require("./GuildData"));
var HelperFunctions;
(function (HelperFunctions) {
    /**
     * Function for sending out a message, using the appropriate channel.
     */
    function sendMessageWithCorrectChannel(commandData, messageContents, atUserID) {
        if (atUserID === void 0) { atUserID = null; }
        return __awaiter(this, void 0, void 0, function () {
            var returnMessage, msgEmbeds, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 17, , 18]);
                        returnMessage = void 0;
                        if (!(commandData.toTextChannel instanceof Discord.WebhookClient)) return [3 /*break*/, 7];
                        if (!(atUserID !== null && messageContents instanceof Discord.MessageEmbed)) return [3 /*break*/, 2];
                        msgEmbeds = [];
                        msgEmbeds.push(messageContents);
                        return [4 /*yield*/, commandData.toTextChannel.send("<@!" + atUserID + ">", { embeds: msgEmbeds, split: false })];
                    case 1:
                        returnMessage = _a.sent();
                        return [3 /*break*/, 6];
                    case 2:
                        if (!(atUserID === null)) return [3 /*break*/, 4];
                        return [4 /*yield*/, commandData.toTextChannel.send(messageContents)];
                    case 3:
                        returnMessage = _a.sent();
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, commandData.toTextChannel.send("<@!" + atUserID + "> " + messageContents)];
                    case 5:
                        returnMessage = _a.sent();
                        _a.label = 6;
                    case 6: return [3 /*break*/, 16];
                    case 7:
                        if (!(commandData.toTextChannel instanceof Discord.TextChannel)) return [3 /*break*/, 14];
                        if (!(atUserID !== null && messageContents instanceof Discord.MessageEmbed)) return [3 /*break*/, 9];
                        return [4 /*yield*/, commandData.toTextChannel.send("<@!" + atUserID + ">", { embed: messageContents })];
                    case 8:
                        returnMessage = _a.sent();
                        return [3 /*break*/, 13];
                    case 9:
                        if (!(atUserID === null)) return [3 /*break*/, 11];
                        return [4 /*yield*/, commandData.toTextChannel.send(messageContents)];
                    case 10:
                        returnMessage = _a.sent();
                        return [3 /*break*/, 13];
                    case 11: return [4 /*yield*/, commandData.toTextChannel.send("<@!" + atUserID + "> " + messageContents)];
                    case 12:
                        returnMessage = _a.sent();
                        _a.label = 13;
                    case 13: return [3 /*break*/, 16];
                    case 14:
                        if (!(commandData.toTextChannel instanceof Discord.DMChannel)) return [3 /*break*/, 16];
                        return [4 /*yield*/, commandData.toTextChannel.send(messageContents)];
                    case 15:
                        returnMessage = _a.sent();
                        _a.label = 16;
                    case 16: return [2 /*return*/, returnMessage];
                    case 17:
                        error_1 = _a.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                reject(error_1);
                            })];
                    case 18: return [2 /*return*/];
                }
            });
        });
    }
    HelperFunctions.sendMessageWithCorrectChannel = sendMessageWithCorrectChannel;
    /**
     * Applies an asymptotic transform function onto an input value,
     * capping it out at the ceiling value.
     */
    function applyAsymptoticTransform(inputModValue, horizontalStretch, ceiling) {
        var finalModValue = 0;
        var newInputModValue = inputModValue;
        if (newInputModValue === 0) {
            newInputModValue += 1;
        }
        if (newInputModValue <= 0) {
            var newInputValue = newInputModValue * -1;
            finalModValue = -1 * Math.trunc((ceiling * Math.pow(newInputValue, 3))
                / (Math.pow(newInputValue, 3) + horizontalStretch * newInputValue));
            return finalModValue;
        }
        finalModValue = Math.trunc((ceiling * Math.pow(newInputModValue, 3))
            / (Math.pow(newInputModValue, 3) + horizontalStretch * newInputModValue));
        return finalModValue;
    }
    HelperFunctions.applyAsymptoticTransform = applyAsymptoticTransform;
    /**
     * Recurses through a succession of messages.
     */
    function recurseThroughMessagePages(userID, message, currentPageIndex, messageEmbeds, deleteAfter) {
        return __awaiter(this, void 0, void 0, function () {
            var newCurrentPageIndex, filter, reactionCollector_1;
            var _this = this;
            return __generator(this, function (_a) {
                newCurrentPageIndex = currentPageIndex;
                try {
                    message.react('◀️');
                    message.react('▶️');
                    message.react('❌');
                    filter = function (reaction, user) { return (reaction.emoji.name === '◀️' || reaction.emoji.name === '▶️' || reaction.emoji.name === '❌') && user.id === userID; };
                    reactionCollector_1 = message.createReactionCollector(filter, { time: 120000 });
                    reactionCollector_1.on('collect', function (reaction) { return __awaiter(_this, void 0, void 0, function () {
                        var messageEmbed, messageEmbed, messageEmbed, messageEmbed;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    reactionCollector_1.resetTimer({ time: 120000 });
                                    if (!(reaction.emoji.name === '❌')) return [3 /*break*/, 1];
                                    reactionCollector_1.stop('User exited.');
                                    return [3 /*break*/, 9];
                                case 1:
                                    if (!(reaction.emoji.name === '▶️' && (newCurrentPageIndex === (messageEmbeds.length - 1)))) return [3 /*break*/, 3];
                                    reaction.users.remove(userID);
                                    newCurrentPageIndex = 0;
                                    messageEmbed = messageEmbeds[newCurrentPageIndex];
                                    return [4 /*yield*/, message.edit(messageEmbed)];
                                case 2:
                                    _a.sent();
                                    return [3 /*break*/, 9];
                                case 3:
                                    if (!(reaction.emoji.name === '▶️' && (newCurrentPageIndex < messageEmbeds.length))) return [3 /*break*/, 5];
                                    reaction.users.remove(userID);
                                    newCurrentPageIndex += 1;
                                    messageEmbed = messageEmbeds[newCurrentPageIndex];
                                    return [4 /*yield*/, message.edit(messageEmbed)];
                                case 4:
                                    _a.sent();
                                    return [3 /*break*/, 9];
                                case 5:
                                    if (!(reaction.emoji.name === '◀️' && (newCurrentPageIndex > 0))) return [3 /*break*/, 7];
                                    reaction.users.remove(userID);
                                    newCurrentPageIndex -= 1;
                                    messageEmbed = messageEmbeds[newCurrentPageIndex];
                                    return [4 /*yield*/, message.edit(messageEmbed)];
                                case 6:
                                    _a.sent();
                                    return [3 /*break*/, 9];
                                case 7:
                                    if (!(reaction.emoji.name === '◀️' && (newCurrentPageIndex === 0))) return [3 /*break*/, 9];
                                    reaction.users.remove(userID);
                                    newCurrentPageIndex = messageEmbeds.length - 1;
                                    messageEmbed = messageEmbeds[newCurrentPageIndex];
                                    return [4 /*yield*/, message.edit(messageEmbed)];
                                case 8:
                                    _a.sent();
                                    _a.label = 9;
                                case 9: return [2 /*return*/];
                            }
                        });
                    }); });
                    reactionCollector_1.on('end', function () { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!(deleteAfter === true)) return [3 /*break*/, 3];
                                    if (!message.deletable) return [3 /*break*/, 2];
                                    return [4 /*yield*/, message.delete()];
                                case 1:
                                    _a.sent();
                                    _a.label = 2;
                                case 2: return [3 /*break*/, 5];
                                case 3: return [4 /*yield*/, message.reactions.removeAll()];
                                case 4:
                                    _a.sent();
                                    _a.label = 5;
                                case 5: return [2 /*return*/];
                            }
                        });
                    }); });
                    return [2 /*return*/];
                }
                catch (error) {
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            reject(error);
                        })];
                }
                return [2 /*return*/];
            });
        });
    }
    HelperFunctions.recurseThroughMessagePages = recurseThroughMessagePages;
    /**
     * Checks a user ID against an array of user IDs to see if it is present.
     */
    function checkForBotCommanderStatus(userID, commanderIDs) {
        return __awaiter(this, void 0, void 0, function () {
            var isCommander, x;
            return __generator(this, function (_a) {
                isCommander = false;
                for (x = 0; x < commanderIDs.length; x += 1) {
                    if (userID === commanderIDs[x]) {
                        isCommander = true;
                        break;
                    }
                }
                return [2 /*return*/, isCommander];
            });
        });
    }
    HelperFunctions.checkForBotCommanderStatus = checkForBotCommanderStatus;
    /**
     * Checks to see if we're in a DM channel, and sends a warning message if so.
     */
    function areWeInADM(commandData) {
        return __awaiter(this, void 0, void 0, function () {
            var currentChannelType, msgString, msgEmbed, msg, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        currentChannelType = commandData.fromTextChannelType;
                        if (!(currentChannelType === 'dm')) return [3 /*break*/, 2];
                        msgString = "------\n**Sorry, but we can't do that in a direct message!**\n------";
                        msgEmbed = new Discord.MessageEmbed();
                        msgEmbed
                            .setAuthor(commandData.guildMember.username, commandData.guildMember.avatarURL())
                            .setColor([254, 254, 254])
                            .setDescription(msgString)
                            .setTimestamp(Date())
                            .setTitle('__**Direct Message Issue:**__');
                        return [4 /*yield*/, sendMessageWithCorrectChannel(commandData, msgEmbed)];
                    case 1:
                        msg = _a.sent();
                        if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                            msg = new Discord.Message(commandData.guildMember.client, msg, commandData.fromTextChannel);
                        }
                        msg.delete({ timeout: 20000 });
                        return [2 /*return*/, true];
                    case 2: return [2 /*return*/, false];
                    case 3:
                        error_2 = _a.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                reject(error_2);
                            })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    HelperFunctions.areWeInADM = areWeInADM;
    /**
     * Checks if we have admin permissions in the current channel.
     */
    function doWeHaveAdminPermission(commandData, discordUser) {
        return __awaiter(this, void 0, void 0, function () {
            var guildData, currentChannelPermissions, permissionStrings, areTheyAnAdmin, areTheyACommander, msgString, msgEmbed, msg, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: commandData.guild.id, memberCount: commandData.guild.memberCount, name: commandData.guild.name });
                        return [4 /*yield*/, guildData.getFromDataBase()];
                    case 1:
                        _a.sent();
                        currentChannelPermissions = commandData.guildMember.permissionsIn(commandData.permsChannel);
                        permissionStrings = 'ADMINISTRATOR';
                        areTheyAnAdmin = currentChannelPermissions.has(permissionStrings);
                        return [4 /*yield*/, checkForBotCommanderStatus(commandData.guildMember.id, discordUser.userData.botCommanders)];
                    case 2:
                        areTheyACommander = _a.sent();
                        if (areTheyAnAdmin === true || areTheyACommander === true) {
                            return [2 /*return*/, true];
                        }
                        msgString = "------\n**Sorry, but you don't have the permissions required for that!**\n------";
                        msgEmbed = new Discord.MessageEmbed();
                        msgEmbed
                            .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                            .setColor(guildData.borderColor)
                            .setDescription(msgString)
                            .setTimestamp(Date())
                            .setTitle("__**Permissions Issue:**__");
                        return [4 /*yield*/, sendMessageWithCorrectChannel(commandData, msgEmbed)];
                    case 3:
                        msg = _a.sent();
                        if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                            msg = new Discord.Message(commandData.guildMember.client, msg, commandData.fromTextChannel);
                        }
                        return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, false];
                    case 5:
                        error_3 = _a.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                reject(error_3);
                            })];
                    case 6: return [2 /*return*/];
                }
            });
        });
    }
    HelperFunctions.doWeHaveAdminPermission = doWeHaveAdminPermission;
    /**
    * Checks to see if we are allowed to use a given channel for given activities.
    */
    function checkIfAllowedInChannel(commandData, discordUser) {
        return __awaiter(this, void 0, void 0, function () {
            var guildData, isItFound, msgString, msgEmbed, x, msg, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: commandData.guild.id, memberCount: commandData.guild.memberCount, name: commandData.guild.name });
                        return [4 /*yield*/, guildData.getFromDataBase()];
                    case 1:
                        _a.sent();
                        isItFound = true;
                        if (!(guildData.gameChannelIDs.length > 0)) return [3 /*break*/, 4];
                        isItFound = false;
                        msgString = "------\n**Sorry, but please do that in one of the following channels:**\n------\n";
                        msgEmbed = new Discord.MessageEmbed();
                        for (x = 0; x < guildData.gameChannelIDs.length; x += 1) {
                            if (commandData.fromTextChannel.id === guildData.gameChannelIDs[x]) {
                                isItFound = true;
                                break;
                            }
                            else {
                                msgString += "<#" + guildData.gameChannelIDs[x] + ">\n";
                            }
                        }
                        msgString += '------';
                        if (!(isItFound === false)) return [3 /*break*/, 4];
                        msgEmbed
                            .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                            .setColor(guildData.borderColor)
                            .setDescription(msgString)
                            .setTimestamp(Date())
                            .setTitle("__**Permissions Issue:**__");
                        return [4 /*yield*/, sendMessageWithCorrectChannel(commandData, msgEmbed)];
                    case 2:
                        msg = _a.sent();
                        if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                            msg = new Discord.Message(commandData.guildMember.client, msg, commandData.fromTextChannel);
                        }
                        return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, isItFound];
                    case 4: return [2 /*return*/, isItFound];
                    case 5:
                        error_4 = _a.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                reject(error_4);
                            })];
                    case 6: return [2 /*return*/];
                }
            });
        });
    }
    HelperFunctions.checkIfAllowedInChannel = checkIfAllowedInChannel;
})(HelperFunctions || (HelperFunctions = {}));
exports.default = HelperFunctions;
