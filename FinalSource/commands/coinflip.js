// coinflip.ts - Module for my bot's coin tossing game.
// Jan 31, 2021
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
    name: 'coinflip',
    description: '__**Coinflip Usage**__: !coinflip = BETAMOUNT to start a game.',
    function: Function()
};
function execute(commandData, discordUser) {
    var _a, _b, _c, _d;
    return __awaiter(this, void 0, void 0, function () {
        var commandReturnData_1, areWeInADM, areWeAllowed, guildData_1, guildMemberData_1, msgString, msgEmbed, msg, betAmountRegExp, msgString, msgEmbed, msg, betAmount_1, currencyAmount_1, msgString, msgEmbed, msg, newBetString_1, messageEmbed_1, newMessage_1, filter, error_1;
        var _this = this;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _e.trys.push([0, 18, , 19]);
                    commandReturnData_1 = {
                        commandName: command.name
                    };
                    return [4 /*yield*/, HelperFunctions_1.default.areWeInADM(commandData)];
                case 1:
                    areWeInADM = _e.sent();
                    if (areWeInADM === true) {
                        return [2 /*return*/, commandReturnData_1];
                    }
                    return [4 /*yield*/, HelperFunctions_1.default.checkIfAllowedInChannel(commandData, discordUser)];
                case 2:
                    areWeAllowed = _e.sent();
                    if (areWeAllowed === false) {
                        return [2 /*return*/, commandReturnData_1];
                    }
                    guildData_1 = new GuildData_1.default({ dataBase: discordUser.dataBase, id: commandData.guild.id, memberCount: commandData.guild.memberCount, name: commandData.guild.name });
                    return [4 /*yield*/, guildData_1.getFromDataBase()];
                case 3:
                    _e.sent();
                    guildMemberData_1 = new GuildMemberData_1.default({ dataBase: discordUser.dataBase, id: commandData.guildMember.id, guildId: commandData.guild.id,
                        userName: commandData.guildMember.user.username, displayName: commandData.guildMember.displayName });
                    return [4 /*yield*/, guildMemberData_1.getFromDataBase()];
                case 4:
                    _e.sent();
                    if (!!((_b = commandData.fromTextChannel.permissionsFor((_a = commandData.guild) === null || _a === void 0 ? void 0 : _a.client.user)) === null || _b === void 0 ? void 0 : _b.has('MANAGE_MESSAGES'))) return [3 /*break*/, 7];
                    msgString = "------\n**I need the Manage Messages permission in this channel, for this game!**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData_1.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Permissions Issue:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 5:
                    msg = _e.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 6:
                    _e.sent();
                    return [2 /*return*/, commandReturnData_1];
                case 7:
                    betAmountRegExp = /\d{1,18}/;
                    if (!(commandData.args[0] === undefined || !betAmountRegExp.test(commandData.args[0]) || parseInt(commandData.args[0], 10) < 1)) return [3 /*break*/, 10];
                    msgString = "------\n**Please enter a valid amount to bet! 1 " + discordUser.userData.currencyName + " or more! (!coinflip = BETAMOUNT)**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor((_c = commandData.guildMember) === null || _c === void 0 ? void 0 : _c.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData_1.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 8:
                    msg = _e.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 9:
                    _e.sent();
                    return [2 /*return*/, commandReturnData_1];
                case 10:
                    betAmount_1 = parseInt(commandData.args[0].match(betAmountRegExp)[0], 10);
                    currencyAmount_1 = guildMemberData_1.currency.wallet;
                    if (!(betAmount_1 > currencyAmount_1)) return [3 /*break*/, 13];
                    msgString = "------\n**Sorry, but you have insufficient funds in your wallet to place that wager!**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor((_d = commandData.guildMember) === null || _d === void 0 ? void 0 : _d.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData_1.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Insufficient Funds:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 11:
                    msg = _e.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 12:
                    _e.sent();
                    return [2 /*return*/, commandReturnData_1];
                case 13:
                    newBetString_1 = '';
                    newBetString_1 += "Welcome, <@!" + commandData.guildMember.id + ">, you have placed a bet of **" + betAmount_1 + " " + discordUser.userData.currencyName + "**\n";
                    newBetString_1 += 'React with :exploding_head: to choose heads, or with :snake: to choose tails!';
                    messageEmbed_1 = new Discord.MessageEmbed();
                    messageEmbed_1
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(newBetString_1)
                        .setTimestamp(Date.now())
                        .setTitle('__**Heads, or Tails!?**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, messageEmbed_1)];
                case 14:
                    newMessage_1 = _e.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        newMessage_1 = new Discord.Message(commandData.guild.client, newMessage_1, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, newMessage_1.react('🤯')];
                case 15:
                    _e.sent();
                    return [4 /*yield*/, newMessage_1.react('🐍')];
                case 16:
                    _e.sent();
                    filter = function (reaction, user) { return (reaction.emoji.name === '🤯' || reaction.emoji.name === '🐍') && user.id === commandData.guildMember.id; };
                    return [4 /*yield*/, newMessage_1.awaitReactions(filter, { max: 1, time: 120000 }).then(function (collected) { return __awaiter(_this, void 0, void 0, function () {
                            var timeOutString, messageEmbed2, number, completionString, newBalance, messageEmbed3;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!(collected.size === 0)) return [3 /*break*/, 2];
                                        timeOutString = '';
                                        timeOutString = newBetString_1;
                                        timeOutString += '\n\n__**Sorry, but you ran out of time to select heads or tails!**__';
                                        messageEmbed2 = new Discord.MessageEmbed();
                                        messageEmbed2.setColor([255, 0, 0]).setTimestamp(Date.now()).setTitle('__**Heads, or Tails!?**__').setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                                            .setDescription(timeOutString);
                                        return [4 /*yield*/, newMessage_1.edit(messageEmbed2)];
                                    case 1:
                                        _a.sent();
                                        newMessage_1.reactions.removeAll();
                                        return [3 /*break*/, 15];
                                    case 2:
                                        if (!(collected.first().emoji.name === '🤯' || collected.first().emoji.name === '🐍')) return [3 /*break*/, 15];
                                        number = Math.random() * 2;
                                        completionString = '';
                                        completionString = newBetString_1;
                                        newBalance = 0;
                                        messageEmbed3 = new Discord.MessageEmbed();
                                        return [4 /*yield*/, guildMemberData_1.getFromDataBase()];
                                    case 3:
                                        _a.sent();
                                        currencyAmount_1 = guildMemberData_1.currency.wallet;
                                        if (!(betAmount_1 > currencyAmount_1)) return [3 /*break*/, 5];
                                        completionString += '\n\n__**Sorry, but you have insufficient funds in your wallet to place that wager!**__';
                                        messageEmbed3.setColor([255, 0, 0]).setDescription(completionString).setTimestamp(Date.now()).setTitle('__**Heads, or Tails!?**__')
                                            .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL());
                                        return [4 /*yield*/, newMessage_1.edit(messageEmbed3)];
                                    case 4:
                                        _a.sent();
                                        newMessage_1.reactions.removeAll();
                                        return [2 /*return*/, commandReturnData_1];
                                    case 5:
                                        if (!((number > 1 && collected.first().emoji.name === '🤯') || (number < 1 && collected.first().emoji.name === '🐍'))) return [3 /*break*/, 9];
                                        return [4 /*yield*/, guildData_1.getFromDataBase()];
                                    case 6:
                                        _a.sent();
                                        guildMemberData_1.currency.wallet += betAmount_1;
                                        return [4 /*yield*/, guildMemberData_1.writeToDataBase()];
                                    case 7:
                                        _a.sent();
                                        guildData_1.casinoStats.totalPayout += betAmount_1;
                                        guildData_1.casinoStats.totalCoinFlipPayout += betAmount_1;
                                        if (betAmount_1 > guildData_1.casinoStats.largestCoinFlipPayout.amount) {
                                            guildData_1.casinoStats.largestCoinFlipPayout.amount = betAmount_1;
                                            guildData_1.casinoStats.largestCoinFlipPayout.date = Date();
                                            guildData_1.casinoStats.largestCoinFlipPayout.userID = guildMemberData_1.id;
                                            guildData_1.casinoStats.largestCoinFlipPayout.username = guildMemberData_1.userName;
                                        }
                                        return [4 /*yield*/, guildData_1.writeToDataBase()];
                                    case 8:
                                        _a.sent();
                                        newBalance = guildMemberData_1.currency.wallet;
                                        completionString += "\n\n__**NICELY DONE FAGGOT! YOU WON!**__\nYour new wallet balance is: " + newBalance + " " + discordUser.userData.currencyName;
                                        messageEmbed_1.setColor([0, 255, 0]).setDescription(completionString).setTimestamp(Date.now()).setTitle('__**Heads, or Tails!?**__')
                                            .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL());
                                        return [3 /*break*/, 13];
                                    case 9:
                                        if (!((number < 1 && collected.first().emoji.name === '🤯') || (number > 1 && collected.first().emoji.name === '🐍'))) return [3 /*break*/, 13];
                                        return [4 /*yield*/, guildData_1.getFromDataBase()];
                                    case 10:
                                        _a.sent();
                                        guildMemberData_1.currency.wallet -= betAmount_1;
                                        return [4 /*yield*/, guildMemberData_1.writeToDataBase()];
                                    case 11:
                                        _a.sent();
                                        guildData_1.casinoStats.totalPayout -= betAmount_1;
                                        guildData_1.casinoStats.totalCoinFlipPayout -= betAmount_1;
                                        return [4 /*yield*/, guildData_1.writeToDataBase()];
                                    case 12:
                                        _a.sent();
                                        newBalance = guildMemberData_1.currency.wallet;
                                        completionString += "\n\n__**OWNED! YOU LOST, FUCKFACE!**__\nYour new wallet balance is: " + newBalance + " " + discordUser.userData.currencyName;
                                        messageEmbed_1.setColor([255, 0, 0]).setDescription(completionString).setTimestamp(Date.now()).setTitle('__**Heads, or Tails!?**__')
                                            .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL());
                                        _a.label = 13;
                                    case 13: return [4 /*yield*/, newMessage_1.edit(messageEmbed_1)];
                                    case 14:
                                        _a.sent();
                                        newMessage_1.reactions.removeAll();
                                        _a.label = 15;
                                    case 15: return [2 /*return*/, commandReturnData_1];
                                }
                            });
                        }); })];
                case 17:
                    _e.sent();
                    return [2 /*return*/, commandReturnData_1];
                case 18:
                    error_1 = _e.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            reject(error_1);
                        })];
                case 19: return [2 /*return*/];
            }
        });
    });
}
command.function = execute;
exports.default = command;
