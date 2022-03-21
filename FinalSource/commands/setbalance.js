// setbalance.ts - Module for my "set balance" command.
// Feb 11, 2021
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
    name: 'setbalance',
    description: "__**Set Balance Usage:**__ !setbalance = NEWBALANCE, BALANCETYPE, @USERMENTION or to set your own balance it's simply !setbalance = NEWBALANCE, BALANCETYPE",
    function: Function()
};
function execute(commandData, discordUser) {
    var _a, _b, _c, _d;
    return __awaiter(this, void 0, void 0, function () {
        var commandReturnData, areWeInADM, guildData, areTheyACommander, msgString_1, msgEmbed, balanceRegExp, userMentionRegExp, userIDRegExp, targetUserID, msgString_2, msgEmbed, msg, msgString_3, msgEmbed, msg, msgString_4, msgEmbed, msg, arg2, targetUserIDOne, targetUserBalance, balanceType, targetMember, msgString_5, msgEmbed, msg, targetGuildMemberData, msgString_6, msgEmbed, msg, msgString, newBalance, newBalance, messageEmbed, error_1;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _e.trys.push([0, 29, , 30]);
                    commandReturnData = {
                        commandName: command.name
                    };
                    return [4 /*yield*/, HelperFunctions_1.default.areWeInADM(commandData)];
                case 1:
                    areWeInADM = _e.sent();
                    if (areWeInADM === true) {
                        return [2 /*return*/, commandReturnData];
                    }
                    guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: commandData.guild.id, memberCount: commandData.guild.memberCount, name: commandData.guild.name });
                    return [4 /*yield*/, guildData.getFromDataBase()];
                case 2:
                    _e.sent();
                    return [4 /*yield*/, HelperFunctions_1.default.checkForBotCommanderStatus(commandData.guildMember.id, discordUser.userData.botCommanders)];
                case 3:
                    areTheyACommander = _e.sent();
                    if (!(areTheyACommander === false)) return [3 /*break*/, 5];
                    msgString_1 = "------\n**Sorry, but you don't have the permissions required for that!**\n------";
                    msgEmbed = new Discord.MessageEmbed();
                    msgEmbed
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString_1)
                        .setTimestamp(Date())
                        .setTitle("__**Permissions Issue:**__");
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 4:
                    _e.sent();
                    return [2 /*return*/, commandReturnData];
                case 5:
                    balanceRegExp = /\d{1,18}/;
                    userMentionRegExp = /.{2,3}\d{18}>/;
                    userIDRegExp = /\d{18}/;
                    targetUserID = '';
                    if (!(commandData.args[0] === undefined || !balanceRegExp.test(commandData.args[0]) || parseInt(commandData.args[0], 10) < 0)) return [3 /*break*/, 8];
                    msgString_2 = "------\n**Please enter a valid desired balance! (!setbalance = NEWBALANCE, BALANCETYPE, @USERMENTION, or just !setbalance = NEWBALANCE, BALANCETYPE)**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor((_a = commandData.guildMember) === null || _a === void 0 ? void 0 : _a.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString_2)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 6:
                    msg = _e.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 7:
                    _e.sent();
                    return [2 /*return*/, commandReturnData];
                case 8:
                    if (!(commandData.args[1] === undefined || (commandData.args[1].toLowerCase() !== 'bank' && commandData.args[1].toLowerCase() !== 'wallet'))) return [3 /*break*/, 11];
                    msgString_3 = "------\n**Please enter a valid balance type! Bank or Wallet! (!setbalance = NEWBALANCE, BALANCETYPE, @USERMENTION, or just !setbalance = NEWBALANCE, BALANCETYPE)**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor((_b = commandData.guildMember) === null || _b === void 0 ? void 0 : _b.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString_3)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 9:
                    msg = _e.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 10:
                    _e.sent();
                    return [2 /*return*/, commandReturnData];
                case 11:
                    if (!(commandData.args[2] === undefined)) return [3 /*break*/, 12];
                    targetUserID = commandData.guildMember.id;
                    return [3 /*break*/, 16];
                case 12:
                    if (!(commandData.args[2] !== undefined && !userMentionRegExp.test(commandData.args[2]) && !userIDRegExp.test(commandData.args[2]))) return [3 /*break*/, 15];
                    msgString_4 = "------\n**Please enter a valid target user mention, or leave it blank to select yourself as the target! (!setbalance = NEWBALANCE, BALANCETYPE, @USERMENTION, or just !setbalance = NEWBALANCE, BALANCETYPE)**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString_4)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 13:
                    msg = _e.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 14:
                    _e.sent();
                    return [2 /*return*/, commandReturnData];
                case 15:
                    if (commandData.args[2] !== undefined) {
                        arg2 = commandData.args[2];
                        targetUserIDOne = arg2.match(userIDRegExp)[0];
                        targetUserID = targetUserIDOne;
                    }
                    _e.label = 16;
                case 16:
                    targetUserBalance = parseInt(commandData.args[0].toString().match(balanceRegExp)[0], 10);
                    balanceType = commandData.args[1].toLowerCase();
                    targetMember = commandData.guild.members.resolve(targetUserID);
                    if (!(targetMember === null)) return [3 /*break*/, 19];
                    msgString_5 = "------\n**Sorry, but the specified user could not be found!**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor((_c = commandData.guildMember) === null || _c === void 0 ? void 0 : _c.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString_5)
                        .setTimestamp(Date())
                        .setTitle('__**User Issue:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 17:
                    msg = _e.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 18:
                    _e.sent();
                    return [2 /*return*/, commandReturnData];
                case 19:
                    targetGuildMemberData = new GuildMemberData_1.default({ dataBase: discordUser.dataBase, id: targetMember.id, guildId: commandData.guild.id, userName: targetMember.user.username, displayName: targetMember.displayName });
                    return [4 /*yield*/, targetGuildMemberData.getFromDataBase()];
                case 20:
                    _e.sent();
                    targetGuildMemberData.currency.wallet = 10000;
                    if (!(targetGuildMemberData == null)) return [3 /*break*/, 23];
                    msgString_6 = "------\n**Sorry, but the specified user data could not be found!**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor((_d = commandData.guildMember) === null || _d === void 0 ? void 0 : _d.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString_6)
                        .setTimestamp(Date())
                        .setTitle('__**User Issue:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 21:
                    msg = _e.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 22:
                    _e.sent();
                    return [2 /*return*/, commandReturnData];
                case 23:
                    msgString = '';
                    if (!(balanceType === 'bank')) return [3 /*break*/, 25];
                    targetGuildMemberData.currency.bank = targetUserBalance;
                    return [4 /*yield*/, targetGuildMemberData.writeToDataBase()];
                case 24:
                    _e.sent();
                    newBalance = targetGuildMemberData.currency.bank;
                    msgString = "__You've set the user <@!" + targetUserID + ">'s bank balance to:__ " + newBalance + " " + discordUser.userData.currencyName;
                    return [3 /*break*/, 27];
                case 25:
                    if (!(balanceType === 'wallet')) return [3 /*break*/, 27];
                    targetGuildMemberData.currency.wallet = targetUserBalance;
                    return [4 /*yield*/, targetGuildMemberData.writeToDataBase()];
                case 26:
                    _e.sent();
                    newBalance = targetGuildMemberData.currency.wallet;
                    msgString = "__You've set the user <@!" + targetUserID + ">'s wallet balance to:__ " + newBalance + " " + discordUser.userData.currencyName;
                    _e.label = 27;
                case 27:
                    messageEmbed = new Discord.MessageEmbed();
                    messageEmbed.setTimestamp(Date.now())
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setTitle('__**Set New Balance:**__')
                        .setColor(guildData.borderColor)
                        .setDescription(msgString);
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, messageEmbed, targetUserID)];
                case 28:
                    _e.sent();
                    return [2 /*return*/, commandReturnData];
                case 29:
                    error_1 = _e.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            reject(error_1);
                        })];
                case 30: return [2 /*return*/];
            }
        });
    });
}
command.function = execute;
exports.default = command;
