// duel.ts - Module for my dueling command
// Feb 4, 2021
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
    name: 'duel',
    description: '__**Duel Usage**__: !duel = BETAMOUNT, @USERMENTION',
    function: Function()
};
function execute(commandData, discordUser) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function () {
        var commandReturnData_1, areWeInADM, areWeAllowed, guildData, msgString, msgEmbed, msg, numberRegExp, idRegExp, msgString, msgEmbed, msg, msgString, msgEmbed, msg, betAmount_1, toUserID_1, fromUserID_1, fromGuildMemberData_1, toGuildMember, msgString, msgEmbed, msg, toGuildMemberData_1, msgString, msgEmbed, msg, fromUserCurrency_1, toUserCurrency_1, msgString, msgEmbed, msg, msgString, msgEmbed, msg, msgEmbedString_1, messageEmbed, newMessage_1, filter, error_1;
        var _this = this;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 28, , 29]);
                    commandReturnData_1 = {
                        commandName: command.name
                    };
                    return [4 /*yield*/, HelperFunctions_1.default.areWeInADM(commandData)];
                case 1:
                    areWeInADM = _d.sent();
                    if (areWeInADM === true) {
                        return [2 /*return*/, commandReturnData_1];
                    }
                    return [4 /*yield*/, HelperFunctions_1.default.checkIfAllowedInChannel(commandData, discordUser)];
                case 2:
                    areWeAllowed = _d.sent();
                    if (areWeAllowed === false) {
                        return [2 /*return*/, commandReturnData_1];
                    }
                    guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: commandData.guild.id, memberCount: commandData.guild.memberCount, name: commandData.guild.name });
                    return [4 /*yield*/, guildData.getFromDataBase()];
                case 3:
                    _d.sent();
                    if (!!((_b = commandData.fromTextChannel.permissionsFor((_a = commandData.guild) === null || _a === void 0 ? void 0 : _a.client.user)) === null || _b === void 0 ? void 0 : _b.has('MANAGE_MESSAGES'))) return [3 /*break*/, 6];
                    msgString = "------\n**I need the Manage Messages permission in this channel, for this game!**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Permissions Issue:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 4:
                    msg = _d.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 5:
                    _d.sent();
                    _d.label = 6;
                case 6:
                    numberRegExp = /\d{1,18}/;
                    idRegExp = /\d{18}/;
                    if (!(commandData.args[0] === undefined || !numberRegExp.test(commandData.args[0]) || parseInt(commandData.args[0], 10) < 0)) return [3 /*break*/, 9];
                    msgString = "------\n**Please enter a valid bet amount! (!duel = BETAMOUNT, @USERMENTION)**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 7:
                    msg = _d.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 8:
                    _d.sent();
                    return [2 /*return*/, commandReturnData_1];
                case 9:
                    if (!(commandData.args[1] === undefined || !idRegExp.test(commandData.args[1]))) return [3 /*break*/, 12];
                    msgString = "------\n**Please enter a valid user mention or user ID! (!duel = BETAMOUNT, @USERMENTION)**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 10:
                    msg = _d.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 11:
                    _d.sent();
                    return [2 /*return*/, commandReturnData_1];
                case 12:
                    betAmount_1 = parseInt(commandData.args[0].match(numberRegExp)[0], 10);
                    toUserID_1 = commandData.args[1].match(idRegExp)[0];
                    fromUserID_1 = commandData.guildMember.user.id;
                    fromGuildMemberData_1 = new GuildMemberData_1.default({ dataBase: discordUser.dataBase, id: commandData.guildMember.id, guildId: commandData.guild.id,
                        userName: commandData.guildMember.user.username, displayName: commandData.guildMember.displayName });
                    return [4 /*yield*/, fromGuildMemberData_1.getFromDataBase()];
                case 13:
                    _d.sent();
                    toGuildMember = commandData.guild.members.resolve(toUserID_1);
                    if (!(toGuildMember === null)) return [3 /*break*/, 16];
                    msgString = "------\n**Sorry, but that user could not be found!**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**User Issue:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 14:
                    msg = _d.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 15:
                    _d.sent();
                    return [2 /*return*/, commandReturnData_1];
                case 16:
                    toGuildMemberData_1 = new GuildMemberData_1.default({ dataBase: discordUser.dataBase, id: toGuildMember.id, guildId: commandData.guild.id, userName: toGuildMember.user.username, displayName: toGuildMember.displayName });
                    return [4 /*yield*/, toGuildMemberData_1.getFromDataBase()];
                case 17:
                    _d.sent();
                    if (!(toGuildMemberData_1 == null)) return [3 /*break*/, 20];
                    msgString = "------\n**Sorry, but the specified user data could not be found!**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 18:
                    msg = _d.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 19:
                    _d.sent();
                    return [2 /*return*/, commandReturnData_1];
                case 20:
                    fromUserCurrency_1 = fromGuildMemberData_1.currency.wallet;
                    toUserCurrency_1 = toGuildMemberData_1.currency.wallet;
                    if (!(betAmount_1 > fromUserCurrency_1)) return [3 /*break*/, 23];
                    msgString = "------\n**Sorry, but you have insufficient funds in your wallet for placing that wager!**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Insufficient Funds:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 21:
                    msg = _d.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 22:
                    _d.sent();
                    return [2 /*return*/, commandReturnData_1];
                case 23:
                    if (!(betAmount_1 > toUserCurrency_1)) return [3 /*break*/, 26];
                    msgString = "------\n**Sorry, but they have insufficient funds in their wallet for accepting that wager!**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor((_c = commandData.guildMember) === null || _c === void 0 ? void 0 : _c.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Insufficient Funds:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 24:
                    msg = _d.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 25:
                    _d.sent();
                    return [2 /*return*/, commandReturnData_1];
                case 26:
                    msgEmbedString_1 = '';
                    msgEmbedString_1 = msgEmbedString_1 + "You've been challenged to a duel! :crossed_swords: \nBy user: <@!" + fromUserID_1 + ">\nFor a wager of: " + betAmount_1 + " " + discordUser.userData.currencyName + "\nReact with :white_check_mark: to accept or :x: to reject!";
                    messageEmbed = new Discord.MessageEmbed();
                    messageEmbed.setDescription(msgEmbedString_1).setTimestamp(Date.now()).setTitle("__**IT'S TIME TO DUEL!**__").setColor([0, 0, 255]);
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, messageEmbed, toUserID_1)];
                case 27:
                    newMessage_1 = _d.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        newMessage_1 = new Discord.Message(commandData.guild.client, newMessage_1, commandData.fromTextChannel);
                    }
                    newMessage_1.react('✅');
                    newMessage_1.react('❌');
                    filter = function (reaction, user) { return (reaction.emoji.name === '✅' || reaction.emoji.name === '❌') && user.id === toUserID_1; };
                    newMessage_1.awaitReactions(filter, { max: 1, time: 120000 }).then(function (collected) { return __awaiter(_this, void 0, void 0, function () {
                        var rejectedString, messageEmbed2, msgString, messageEmbed3, msgString, messageEmbed4, fromUserRoll, toUserRoll, messageEmbeds, finalStrings, fromUserGainStrings, fromUserLossStrings, toUserGainStrings, toUserLossStrings, fromUserSelfMod, fromUserOppMod, toUserSelfMod, toUserOppMod, finalFromUserRoll, finalToUserRoll, x, currentItem, currentString, currentString, x, currentItem, currentString, currentString, fromUserFooterString, toUserFooterString, currentPage, fromUserVicHeaderString, midFooter1, midFooter2, finalFooterString, fromUserModStrings, x, toUserModStrings, x, x, currentPage, toUserVicHeaderString, midFooter1, midFooter2, finalFooterString, toUserModStrings, x, fromUserModStrings, x, x, currentPageIndex, newerMessage, rejectedString, messageEmbed5;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!(collected.size === 0)) return [3 /*break*/, 2];
                                    rejectedString = '';
                                    rejectedString = rejectedString + "Sorry, <@!" + fromUserID_1 + ">, but <@!" + toUserID_1 + "> has rejected your duel offer! (Timed Out!)";
                                    messageEmbed2 = new Discord.MessageEmbed();
                                    messageEmbed2.setColor([255, 0, 0]).setTimestamp(Date.now()).setTitle('__**DUEL REJECTED!**__').setDescription(rejectedString);
                                    newMessage_1.reactions.removeAll();
                                    return [4 /*yield*/, newMessage_1.channel.send("<@!" + fromUserID_1 + ">", { embed: messageEmbed2 })];
                                case 1:
                                    _a.sent();
                                    return [3 /*break*/, 25];
                                case 2:
                                    if (!(collected.first().emoji.name === '✅')) return [3 /*break*/, 21];
                                    return [4 /*yield*/, fromGuildMemberData_1.getFromDataBase()];
                                case 3:
                                    _a.sent();
                                    fromUserCurrency_1 = fromGuildMemberData_1.currency.wallet;
                                    return [4 /*yield*/, toGuildMemberData_1.getFromDataBase()];
                                case 4:
                                    _a.sent();
                                    toUserCurrency_1 = toGuildMemberData_1.currency.wallet;
                                    if (!(betAmount_1 > fromUserCurrency_1)) return [3 /*break*/, 6];
                                    msgString = '';
                                    msgString += msgEmbedString_1 + "\n\n__**Sorry, but you have insufficient funds in your wallet for placing that wager!**__";
                                    messageEmbed3 = new Discord.MessageEmbed()
                                        .setDescription(msgString).setTimestamp(Date.now()).setColor([255, 0, 0])
                                        .setTitle("__**IT'S TIME TO DUEL!**__");
                                    return [4 /*yield*/, newMessage_1.edit(messageEmbed3)];
                                case 5:
                                    _a.sent();
                                    newMessage_1.reactions.removeAll();
                                    return [2 /*return*/, commandReturnData_1];
                                case 6:
                                    if (!(betAmount_1 > toUserCurrency_1)) return [3 /*break*/, 8];
                                    msgString = '';
                                    msgString += msgEmbedString_1 + "\n\n__**Sorry, but they have insufficient funds in their wallet for accepting that wager!**__";
                                    messageEmbed4 = new Discord.MessageEmbed()
                                        .setDescription(msgString).setTimestamp(Date.now()).setColor([255, 0, 0])
                                        .setTitle("__**IT'S TIME TO DUEL!**__");
                                    return [4 /*yield*/, newMessage_1.edit(messageEmbed4)];
                                case 7:
                                    _a.sent();
                                    newMessage_1.reactions.removeAll();
                                    return [2 /*return*/, commandReturnData_1];
                                case 8:
                                    fromUserRoll = Math.trunc(Math.random() * 100);
                                    toUserRoll = Math.trunc(Math.random() * 100);
                                    messageEmbeds = [];
                                    finalStrings = [];
                                    fromUserGainStrings = [];
                                    fromUserLossStrings = [];
                                    toUserGainStrings = [];
                                    toUserLossStrings = [];
                                    fromUserSelfMod = 0;
                                    fromUserOppMod = 0;
                                    toUserSelfMod = 0;
                                    toUserOppMod = 0;
                                    finalFromUserRoll = 0;
                                    finalToUserRoll = 0;
                                    for (x = 0; x < fromGuildMemberData_1.items.length; x += 1) {
                                        currentItem = fromGuildMemberData_1.items[x];
                                        if (currentItem.selfMod > 0) {
                                            currentString = "+" + currentItem.selfMod + " of base roll from <@!" + fromUserID_1 + ">'s " + currentItem.emoji + currentItem.itemName + "\n";
                                            fromUserGainStrings.push(currentString);
                                            fromUserSelfMod += currentItem.selfMod;
                                        }
                                        if (currentItem.oppMod < 0) {
                                            currentString = currentItem.oppMod + " of base roll from <@!" + fromUserID_1 + ">'s " + currentItem.emoji + currentItem.itemName + "\n";
                                            toUserLossStrings.push(currentString);
                                            toUserOppMod += currentItem.oppMod;
                                        }
                                    }
                                    for (x = 0; x < toGuildMemberData_1.items.length; x += 1) {
                                        currentItem = toGuildMemberData_1.items[x];
                                        if (currentItem.selfMod > 0) {
                                            currentString = "+" + currentItem.selfMod + " of base roll from <@!" + toUserID_1 + ">'s " + currentItem.emoji + currentItem.itemName + "\n";
                                            toUserGainStrings.push(currentString);
                                            toUserSelfMod += currentItem.selfMod;
                                        }
                                        if (currentItem.oppMod < 0) {
                                            currentString = currentItem.oppMod + " of base roll from <@!" + toUserID_1 + ">'s " + currentItem.emoji + currentItem.itemName + "\n";
                                            fromUserLossStrings.push(currentString);
                                            fromUserOppMod += currentItem.oppMod;
                                        }
                                    }
                                    finalFromUserRoll = HelperFunctions_1.default
                                        .applyAsymptoticTransform((fromUserRoll + fromUserSelfMod + fromUserOppMod), 2000, 100);
                                    finalToUserRoll = HelperFunctions_1.default
                                        .applyAsymptoticTransform((toUserRoll + toUserSelfMod + toUserOppMod), 2000, 100);
                                    fromUserFooterString = '';
                                    if (finalFromUserRoll !== fromUserRoll || fromUserOppMod !== 0
                                        || fromUserSelfMod !== 0) {
                                        fromUserFooterString = "__**For a final roll of:**__ " + finalFromUserRoll + "\n";
                                    }
                                    toUserFooterString = '';
                                    if (finalToUserRoll !== toUserRoll || toUserOppMod !== 0 || toUserSelfMod !== 0) {
                                        toUserFooterString = "__**For a final roll of:**__ " + finalToUserRoll + "\n";
                                    }
                                    if (!(finalFromUserRoll > finalToUserRoll)) return [3 /*break*/, 11];
                                    fromGuildMemberData_1.currency.wallet = Number(fromGuildMemberData_1.currency.wallet);
                                    fromGuildMemberData_1.currency.wallet += betAmount_1;
                                    toGuildMemberData_1.currency.wallet = Number(toGuildMemberData_1.currency.wallet);
                                    toGuildMemberData_1.currency.wallet -= betAmount_1;
                                    return [4 /*yield*/, fromGuildMemberData_1.writeToDataBase()];
                                case 9:
                                    _a.sent();
                                    return [4 /*yield*/, toGuildMemberData_1.writeToDataBase()];
                                case 10:
                                    _a.sent();
                                    currentPage = 0;
                                    fromUserVicHeaderString = '';
                                    fromUserVicHeaderString = "<@!" + fromUserID_1 + "> has defeated <@!" + toUserID_1 + ">!!\n__Your rolls were__:\n";
                                    finalStrings[currentPage] = fromUserVicHeaderString;
                                    midFooter1 = "__**<@!" + fromUserID_1 + ">:**__ " + fromUserRoll + "\n";
                                    midFooter2 = "__**<@!" + toUserID_1 + ">:**__ " + toUserRoll + "\n";
                                    finalStrings[currentPage] += midFooter1;
                                    finalFooterString = '';
                                    finalFooterString = "" + '-----\n__Your new wallet balances are:__\n'
                                        + '<@!' + fromUserID_1 + ">: " + fromGuildMemberData_1.currency.wallet + " " + discordUser.userData.currencyName + "\n"
                                        + ("<@!" + toUserID_1 + ">: " + toGuildMemberData_1.currency.wallet + " " + discordUser.userData.currencyName + "\n------");
                                    fromUserModStrings = [];
                                    fromUserModStrings = fromUserGainStrings.concat(fromUserLossStrings);
                                    for (x = 0; x < fromUserModStrings.length; x += 1) {
                                        if ((finalStrings[currentPage].length + fromUserModStrings[x].length
                                            + midFooter1.length + fromUserFooterString.length) >= 2048) {
                                            finalStrings.length += 1;
                                            currentPage += 1;
                                            finalStrings[currentPage] = fromUserVicHeaderString;
                                        }
                                        finalStrings[currentPage] += fromUserModStrings[x];
                                        if (x === fromUserModStrings.length - 1) {
                                            finalStrings[currentPage] += fromUserFooterString;
                                        }
                                    }
                                    finalStrings[currentPage] += midFooter2;
                                    toUserModStrings = [];
                                    toUserModStrings = toUserGainStrings.concat(toUserLossStrings);
                                    for (x = 0; x < toUserModStrings.length; x += 1) {
                                        if ((finalStrings[currentPage].length + toUserModStrings[x].length
                                            + toUserFooterString.length) >= 2048) {
                                            finalStrings.length += 1;
                                            currentPage += 1;
                                            finalStrings[currentPage] = fromUserVicHeaderString;
                                        }
                                        finalStrings[currentPage] += toUserModStrings[x];
                                        if (x === toUserModStrings.length - 1) {
                                            finalStrings[currentPage] += toUserFooterString;
                                        }
                                    }
                                    finalStrings[currentPage] += finalFooterString;
                                    messageEmbeds.length = finalStrings.length;
                                    for (x = 0; x < finalStrings.length; x += 1) {
                                        messageEmbeds[x] = new Discord.MessageEmbed();
                                        messageEmbeds[x].setColor([0, 255, 0]).setTimestamp(Date.now()).setTitle("__**DUEL RESULTS! (" + (x + 1) + " of " + finalStrings.length + ")**__").setDescription(finalStrings[x]);
                                    }
                                    return [3 /*break*/, 16];
                                case 11:
                                    if (!(finalToUserRoll > finalFromUserRoll)) return [3 /*break*/, 14];
                                    toGuildMemberData_1.currency.wallet = Number(toGuildMemberData_1.currency.wallet);
                                    toGuildMemberData_1.currency.wallet += betAmount_1;
                                    fromGuildMemberData_1.currency.wallet = Number(fromGuildMemberData_1.currency.wallet);
                                    fromGuildMemberData_1.currency.wallet -= betAmount_1;
                                    return [4 /*yield*/, fromGuildMemberData_1.writeToDataBase()];
                                case 12:
                                    _a.sent();
                                    return [4 /*yield*/, toGuildMemberData_1.writeToDataBase()];
                                case 13:
                                    _a.sent();
                                    currentPage = 0;
                                    toUserVicHeaderString = '';
                                    toUserVicHeaderString = "<@!" + toUserID_1 + "> has defeated <@!" + fromUserID_1 + ">!!\n__Your rolls were__:\n";
                                    finalStrings[currentPage] = toUserVicHeaderString;
                                    midFooter1 = "__**<@!" + toUserID_1 + ">:**__ " + toUserRoll + "\n";
                                    midFooter2 = "__**<@!" + fromUserID_1 + ">:**__ " + fromUserRoll + "\n";
                                    finalStrings[currentPage] += midFooter1;
                                    finalFooterString = "" + '-----\n__Your new wallet balances are:__\n'
                                        + '<@!' + toUserID_1 + ">: " + toGuildMemberData_1.currency.wallet + " " + discordUser.userData.currencyName + "\n"
                                        + ("<@!" + fromUserID_1 + ">: " + fromGuildMemberData_1.currency.wallet + " " + discordUser.userData.currencyName + "\n------");
                                    toUserModStrings = [];
                                    toUserModStrings = toUserGainStrings.concat(toUserLossStrings);
                                    for (x = 0; x < toUserModStrings.length; x += 1) {
                                        if ((finalStrings[currentPage].length + toUserModStrings[x].length
                                            + midFooter1.length + toUserFooterString.length) >= 2048) {
                                            finalStrings.length += 1;
                                            currentPage += 1;
                                            finalStrings[currentPage] = toUserVicHeaderString;
                                        }
                                        finalStrings[currentPage] += toUserModStrings[x];
                                        if (x === toUserModStrings.length - 1) {
                                            finalStrings[currentPage] += toUserFooterString;
                                        }
                                    }
                                    finalStrings[currentPage] += midFooter2;
                                    fromUserModStrings = [];
                                    fromUserModStrings = fromUserGainStrings.concat(fromUserLossStrings);
                                    for (x = 0; x < fromUserModStrings.length; x += 1) {
                                        if ((finalStrings[currentPage].length + fromUserModStrings[x].length
                                            + fromUserFooterString.length) >= 2048) {
                                            finalStrings.length += 1;
                                            currentPage += 1;
                                            finalStrings[currentPage] = toUserVicHeaderString;
                                        }
                                        finalStrings[currentPage] += fromUserModStrings[x];
                                        if (x === fromUserModStrings.length - 1) {
                                            finalStrings[currentPage] += fromUserFooterString;
                                        }
                                    }
                                    finalStrings[currentPage] += finalFooterString;
                                    messageEmbeds.length = finalStrings.length;
                                    for (x = 0; x < finalStrings.length; x += 1) {
                                        messageEmbeds[x] = new Discord.MessageEmbed();
                                        messageEmbeds[x].setColor([0, 255, 0]).setTimestamp(Date.now()).setTitle("__**DUEL RESULTS! (" + (x + 1) + " of " + finalStrings.length + ")**__").setDescription(finalStrings[x]);
                                    }
                                    return [3 /*break*/, 16];
                                case 14:
                                    if (!(finalToUserRoll === finalFromUserRoll)) return [3 /*break*/, 16];
                                    finalStrings.length = 1;
                                    finalStrings[0] = '__**Looks like it was a draw! Nicely done!**__';
                                    newMessage_1.reactions.removeAll();
                                    messageEmbeds[0] = new Discord.MessageEmbed();
                                    messageEmbeds[0].setColor([0, 0, 255]).setTimestamp(Date.now()).setTitle("__**DUEL RESULTS! (" + (0 + 1) + " of " + finalStrings.length + ")**__").setDescription(finalStrings[0]);
                                    return [4 /*yield*/, newMessage_1.channel.send(messageEmbeds[0])];
                                case 15:
                                    _a.sent();
                                    return [2 /*return*/, commandReturnData_1];
                                case 16:
                                    currentPageIndex = 0;
                                    return [4 /*yield*/, newMessage_1.channel.send(messageEmbeds[currentPageIndex])];
                                case 17:
                                    newerMessage = _a.sent();
                                    if (!newMessage_1.deletable) return [3 /*break*/, 19];
                                    return [4 /*yield*/, newMessage_1.delete()];
                                case 18:
                                    _a.sent();
                                    _a.label = 19;
                                case 19: return [4 /*yield*/, HelperFunctions_1.default.recurseThroughMessagePages(fromUserID_1, newerMessage, currentPageIndex, messageEmbeds, false)];
                                case 20:
                                    _a.sent();
                                    return [3 /*break*/, 25];
                                case 21:
                                    if (!(collected.first().emoji.name === '❌')) return [3 /*break*/, 25];
                                    rejectedString = '';
                                    rejectedString = rejectedString + "Sorry, <@!" + fromUserID_1 + ">, but <@!" + toUserID_1 + "> has rejected your duel offer!";
                                    messageEmbed5 = new Discord.MessageEmbed();
                                    messageEmbed5.setColor([255, 0, 0]).setTimestamp(Date.now()).setTitle('__**DUEL REJECTED!**__').setDescription(rejectedString);
                                    return [4 /*yield*/, newMessage_1.channel.send("<@!" + fromUserID_1 + ">", { embed: messageEmbed5 })];
                                case 22:
                                    _a.sent();
                                    if (!newMessage_1.deletable) return [3 /*break*/, 24];
                                    return [4 /*yield*/, newMessage_1.delete()];
                                case 23:
                                    _a.sent();
                                    _a.label = 24;
                                case 24: return [2 /*return*/, commandReturnData_1];
                                case 25: return [2 /*return*/, commandReturnData_1];
                            }
                        });
                    }); });
                    return [2 /*return*/, commandReturnData_1];
                case 28:
                    error_1 = _d.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            reject(error_1);
                        })];
                case 29: return [2 /*return*/];
            }
        });
    });
}
command.function = execute;
exports.default = command;
