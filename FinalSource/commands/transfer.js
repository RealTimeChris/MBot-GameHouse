// transfer.ts - Module for my transfer command.
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
    name: 'transfer',
    description: '__**Transfer Usage**__: !transfer = AMOUNT, @USERMENTION to transfer currency from yourself to the other person!',
    function: Function()
};
function execute(commandData, discordUser) {
    return __awaiter(this, void 0, void 0, function () {
        var commandReturnData, areWeInADM, guildData, userMentionRegExp, userIDRegExp, amountRegExp, msgString_1, msgEmbed, msg, msgString_2, msgEmbed, msg, msgString_3, msgEmbed, msg, toUserID, fromUserID, amount, toUserMember, msgString_4, msgEmbed, msg, msgString_5, msgEmbed, msg, toGuildMemberData, msgString_6, msgEmbed, msg, fromGuildMemberData, msgString_7, msgEmbed, msg, msgString, messageEmbed, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 29, , 30]);
                    commandReturnData = {
                        commandName: command.name
                    };
                    return [4 /*yield*/, HelperFunctions_1.default.areWeInADM(commandData)];
                case 1:
                    areWeInADM = _a.sent();
                    if (areWeInADM === true) {
                        return [2 /*return*/, commandReturnData];
                    }
                    guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: commandData.guild.id, memberCount: commandData.guild.memberCount, name: commandData.guild.name });
                    return [4 /*yield*/, guildData.getFromDataBase()];
                case 2:
                    _a.sent();
                    userMentionRegExp = /\d{18}/;
                    userIDRegExp = /\d{18}/;
                    amountRegExp = /\d{1,18}/;
                    if (!(commandData.args[0] === undefined || commandData.args[1] === undefined)) return [3 /*break*/, 5];
                    msgString_1 = "------\n**Please enter the valid arguments: (!transfer = AMOUNT, @USERMENTION)**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString_1)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 3:
                    msg = _a.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 4:
                    _a.sent();
                    return [2 /*return*/, commandReturnData];
                case 5:
                    if (!(!userMentionRegExp.test(commandData.args[1]) && !userIDRegExp.test(commandData.args[1]))) return [3 /*break*/, 8];
                    msgString_2 = "------\n**Please enter a valid user mention! (!transfer = AMOUNT, @USERMENTION)**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString_2)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 6:
                    msg = _a.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 7:
                    _a.sent();
                    return [2 /*return*/, commandReturnData];
                case 8:
                    if (!(!amountRegExp.test(commandData.args[0]) || parseInt(commandData.args[0], 10) <= 0)) return [3 /*break*/, 11];
                    msgString_3 = "------\n**Please enter a valid number for amount! (!transfer = AMOUNT, @USERMENTION)**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString_3)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 9:
                    msg = _a.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 10:
                    _a.sent();
                    return [2 /*return*/, commandReturnData];
                case 11:
                    toUserID = commandData.args[1].match(userMentionRegExp)[0];
                    fromUserID = commandData.guildMember.id;
                    amount = parseInt(commandData.args[0].match(amountRegExp)[0], 10);
                    toUserMember = commandData.guild.members.resolve(toUserID);
                    if (!(toUserID === fromUserID)) return [3 /*break*/, 14];
                    msgString_4 = "------\n**Sorry, but you cannot transfer to yourself!**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString_4)
                        .setTimestamp(Date())
                        .setTitle('__**Transfer Issue:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 12:
                    msg = _a.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 13:
                    _a.sent();
                    return [2 /*return*/, commandReturnData];
                case 14:
                    if (!(toUserMember === null)) return [3 /*break*/, 17];
                    msgString_5 = "------\n**Sorry, but that user could not be found!**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString_5)
                        .setTimestamp(Date())
                        .setTitle('__**User Issue:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 15:
                    msg = _a.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 16:
                    _a.sent();
                    return [2 /*return*/, commandReturnData];
                case 17:
                    toGuildMemberData = new GuildMemberData_1.default({ dataBase: discordUser.dataBase, id: toUserMember.id, guildId: commandData.guild.id, userName: toUserMember.user.username, displayName: toUserMember.displayName });
                    return [4 /*yield*/, toGuildMemberData.getFromDataBase()];
                case 18:
                    _a.sent();
                    if (!(toGuildMemberData == null)) return [3 /*break*/, 21];
                    msgString_6 = "------\n**Sorry, but that user data could not be found!**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString_6)
                        .setTimestamp(Date())
                        .setTitle('__**User Issue:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 19:
                    msg = _a.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 20:
                    _a.sent();
                    return [2 /*return*/, commandReturnData];
                case 21:
                    fromGuildMemberData = new GuildMemberData_1.default({ dataBase: discordUser.dataBase, id: commandData.guildMember.id, guildId: commandData.guild.id,
                        userName: commandData.guildMember.user.username, displayName: commandData.guildMember.displayName });
                    return [4 /*yield*/, fromGuildMemberData.getFromDataBase()];
                case 22:
                    _a.sent();
                    if (!(amount > fromGuildMemberData.currency.wallet)) return [3 /*break*/, 25];
                    msgString_7 = "------\n**Sorry, but you don't have sufficient funds in your wallet for that transfer!**\n-------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString_7)
                        .setTimestamp(Date())
                        .setTitle('__**Insufficient Funds:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 23:
                    msg = _a.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 24:
                    _a.sent();
                    return [2 /*return*/, commandReturnData];
                case 25:
                    fromGuildMemberData.currency.wallet -= amount;
                    toGuildMemberData.currency.wallet += amount;
                    return [4 /*yield*/, fromGuildMemberData.writeToDataBase()];
                case 26:
                    _a.sent();
                    return [4 /*yield*/, toGuildMemberData.writeToDataBase()];
                case 27:
                    _a.sent();
                    msgString = '';
                    msgString += "<@!" + fromUserID + "> succesfully transferred " + amount + " " + discordUser.userData.currencyName + " to <@!" + toUserID + ">.";
                    msgString += "" + '\n__Your new wallet balances are:__ \n<@!' + fromUserID + ">: " + fromGuildMemberData.currency.wallet;
                    msgString += "" + '\n<@!' + toUserID + ">: " + toGuildMemberData.currency.wallet;
                    messageEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setDescription(msgString).setTimestamp(Date.now())
                        .setTitle('__**Balance Transfer:**__')
                        .setColor(guildData.borderColor);
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, messageEmbed, toUserID)];
                case 28:
                    _a.sent();
                    return [2 /*return*/, commandReturnData];
                case 29:
                    error_1 = _a.sent();
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
