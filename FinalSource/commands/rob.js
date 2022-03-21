// rob.ts - Module for my rob command.
// Feb 7, 2021
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
    name: 'rob',
    description: '__**Rob Usage:**__ !rob = @USERMENTION',
    function: Function()
};
function execute(commandData, discordUser) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var commandReturnData, areWeInADM, areWeAllowed, guildData, userMentionRegExp, userIDRegExp, msgString, msgEmbed, msg, userID, guildMemberData, targetUserID, targetMember, msgString, msgEmbed, msg, targetGuildMemberData, msgString, msgEmbed, msg, msgString, msgEmbed, msg, msPerSecond, secondsPerMinute, msPerMinute, minutesPerHour, msPerHour, timeBetweenRobberies, currentTime, currentTimeDifference, userGainString, userLossString, userGainAmount, userLossAmount, x, x, userRollMod, userRollModTotal, baseProbabilityOfSuccess, totalProbabilityOfSuccess, currentProbabilityValue, currentSuccessValue, msgString, currencyRobPercentage, currencyRobAmount, msgString_1, msgEmbed, msg, targetUserNewBalance, userNewBalance, messageEmbed, finedPercentage, finedAmount, userNewBalance, repaidPercentage, repaidAmount, targetUserNewBalance, messageEmbed, msgString, timeLeft, hoursRemain, minutesRemain, secondsRemain, messageEmbed, error_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 34, , 35]);
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
                    userMentionRegExp = /.{2,3}\d{18}>/;
                    userIDRegExp = /\d{18}/;
                    if (!(commandData.args[0] === undefined || (!userMentionRegExp.test(commandData.args[0]) && !userIDRegExp.test(commandData.args[0])))) return [3 /*break*/, 6];
                    msgString = "------\n**Please enter a valid user mention for the target! (!rob = @USERMENTION)**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
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
                    userID = (_a = commandData.guildMember) === null || _a === void 0 ? void 0 : _a.id;
                    guildMemberData = new GuildMemberData_1.default({ dataBase: discordUser.dataBase, id: commandData.guildMember.id, guildId: commandData.guild.id,
                        userName: commandData.guildMember.user.username, displayName: commandData.guildMember.displayName });
                    return [4 /*yield*/, guildMemberData.getFromDataBase()];
                case 7:
                    _c.sent();
                    targetUserID = commandData.args[0].match(userIDRegExp)[0];
                    targetMember = commandData.guild.members.resolve(targetUserID);
                    if (!(targetMember === null)) return [3 /*break*/, 10];
                    msgString = "------\n**Sorry, but that user could not be found!**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**User Issue:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 8:
                    msg = _c.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 9:
                    _c.sent();
                    return [2 /*return*/, commandReturnData];
                case 10:
                    targetGuildMemberData = new GuildMemberData_1.default({ dataBase: discordUser.dataBase, id: targetMember.id, guildId: commandData.guild.id,
                        userName: targetMember.user.username, displayName: targetMember.displayName });
                    return [4 /*yield*/, targetGuildMemberData.getFromDataBase()];
                case 11:
                    _c.sent();
                    if (!(targetGuildMemberData == null)) return [3 /*break*/, 14];
                    msgString = "------\n**Sorry, but the specified user data could not be found!**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**User Issue:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 12:
                    msg = _c.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 13:
                    _c.sent();
                    return [2 /*return*/, commandReturnData];
                case 14:
                    if (!(userID === targetUserID)) return [3 /*break*/, 17];
                    msgString = "------\n**You can't rob yourself, dumbass!**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Robbery Issue:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 15:
                    msg = _c.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 16:
                    _c.sent();
                    return [2 /*return*/, commandReturnData];
                case 17:
                    msPerSecond = 1000;
                    secondsPerMinute = 60;
                    msPerMinute = msPerSecond * secondsPerMinute;
                    minutesPerHour = 60;
                    msPerHour = msPerMinute * minutesPerHour;
                    timeBetweenRobberies = discordUser.userData.hoursOfRobberyCooldown * msPerHour;
                    currentTime = new Date().getTime();
                    currentTimeDifference = currentTime - guildMemberData.lastTimeRobbed;
                    if (!(currentTimeDifference >= timeBetweenRobberies)) return [3 /*break*/, 31];
                    userGainString = '';
                    userLossString = '';
                    userGainAmount = 0;
                    userLossAmount = 0;
                    for (x = 0; x < guildMemberData.items.length; x += 1) {
                        if (guildMemberData.items[x].selfMod > 0) {
                            userGainAmount += guildMemberData.items[x].selfMod;
                            userGainString += "+" + guildMemberData.items[x].selfMod + " of base roll from <@!" + ((_b = commandData.guildMember) === null || _b === void 0 ? void 0 : _b.id) + ">'s " + guildMemberData.items[x].emoji + " " + guildMemberData.items[x].itemName + "\n";
                        }
                    }
                    for (x = 0; x < targetGuildMemberData.items.length; x += 1) {
                        if (targetGuildMemberData.items[x].oppMod < 0) {
                            userLossAmount += targetGuildMemberData.items[x].oppMod;
                            userLossString += targetGuildMemberData.items[x].oppMod + " of base roll from <@!" + targetGuildMemberData.id + ">'s " + targetGuildMemberData.items[x].emoji + " " + targetGuildMemberData.items[x].itemName + "\n";
                        }
                    }
                    userRollMod = userGainAmount + userLossAmount;
                    userRollModTotal = HelperFunctions_1.default.applyAsymptoticTransform(userRollMod, 2000, 40);
                    baseProbabilityOfSuccess = 40;
                    totalProbabilityOfSuccess = baseProbabilityOfSuccess + userRollModTotal;
                    currentProbabilityValue = Math.trunc(Math.random() * 100);
                    currentSuccessValue = currentProbabilityValue > (100 - totalProbabilityOfSuccess);
                    msgString = '';
                    if (!(currentSuccessValue === true)) return [3 /*break*/, 25];
                    msgString = "Nicely done! You robbed that motherfucker, <@!" + targetUserID + ">, good!\n\n__Base probability of success:__ " + baseProbabilityOfSuccess + "%\n";
                    if (userGainAmount > 0 || userLossAmount < 0) {
                        msgString += userGainString + userLossString + "\n__Resulting in a net probability of success gain of:__ " + userRollModTotal + "%\n__For a final probability of success of:__ " + totalProbabilityOfSuccess + "%\n";
                    }
                    currencyRobPercentage = Math.trunc(Math.random() * 60);
                    currencyRobAmount = Math
                        .trunc((targetGuildMemberData.currency.wallet * (currencyRobPercentage / 100)));
                    if (!(currencyRobAmount < 0)) return [3 /*break*/, 20];
                    msgString_1 = "------\n**Cannot rob for debt!**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString_1)
                        .setTimestamp(Date())
                        .setTitle('__**Target Issue:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 18:
                    msg = _c.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 19:
                    _c.sent();
                    return [2 /*return*/, commandReturnData];
                case 20:
                    targetGuildMemberData.currency.wallet -= currencyRobAmount;
                    guildMemberData.currency.wallet += currencyRobAmount;
                    return [4 /*yield*/, targetGuildMemberData.writeToDataBase()];
                case 21:
                    _c.sent();
                    return [4 /*yield*/, guildMemberData.writeToDataBase()];
                case 22:
                    _c.sent();
                    targetUserNewBalance = targetGuildMemberData.currency.wallet;
                    userNewBalance = guildMemberData.currency.wallet;
                    msgString = msgString + "------\n**You've robbed <@!" + targetUserID + "> for " + currencyRobPercentage + "% of their wallet, which is " + currencyRobAmount + " " + discordUser.userData.currencyName + ".\n"
                        + ("**\n__Your new wallet balances are:__ \n<@!" + userID + ">: " + userNewBalance + " " + discordUser.userData.currencyName + "\n<@!" + targetUserID + ">: " + targetUserNewBalance + " " + discordUser.userData.currencyName + ".");
                    guildMemberData.lastTimeRobbed = new Date().getTime();
                    return [4 /*yield*/, guildMemberData.writeToDataBase()];
                case 23:
                    _c.sent();
                    messageEmbed = new Discord.MessageEmbed();
                    messageEmbed.setColor([0, 255, 0]).setDescription(msgString).setTimestamp(Date.now()).setTitle('__**Succesful Robbery:**__')
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL());
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, messageEmbed, targetUserID)];
                case 24:
                    _c.sent();
                    return [3 /*break*/, 30];
                case 25:
                    if (!(currentSuccessValue === false)) return [3 /*break*/, 30];
                    finedPercentage = Math.trunc(Math.random() * 30);
                    finedAmount = Math.trunc((guildMemberData.currency.wallet * (finedPercentage / 100)));
                    guildMemberData.currency.wallet -= finedAmount;
                    return [4 /*yield*/, guildMemberData.writeToDataBase()];
                case 26:
                    _c.sent();
                    userNewBalance = guildMemberData.currency.wallet;
                    repaidPercentage = Math.trunc(Math.random() * 50);
                    repaidAmount = Math.trunc((finedAmount * (repaidPercentage / 100)));
                    targetGuildMemberData.currency.wallet += repaidAmount;
                    return [4 /*yield*/, targetGuildMemberData.writeToDataBase()];
                case 27:
                    _c.sent();
                    targetUserNewBalance = targetGuildMemberData.currency.wallet;
                    msgString = "Oof! You've been caught while attempting to rob <@!" + targetUserID + ">!\n\n__Base probability of success:__ " + baseProbabilityOfSuccess + "%\n";
                    if (userGainAmount > 0 || userLossAmount < 0) {
                        msgString += userGainString + userLossString + "\n__Resulting in a net probability of success gain of:__ " + userRollModTotal + "%\n__For a final probability of success of:__ " + totalProbabilityOfSuccess + "%\n";
                    }
                    msgString += "------\n**You've been fined " + finedPercentage + "% of your wallet balance, which is " + finedAmount + " " + discordUser.userData.currencyName + "!\n<@!" + targetUserID + "> has been reimbursed " + repaidAmount + " " + discordUser.userData.currencyName + " (" + repaidPercentage + "%).**";
                    msgString += "\n\n__Your new wallet balances are:__ \n<@!" + userID + ">: " + userNewBalance + " " + discordUser.userData.currencyName + "\n<@!" + targetUserID + ">: " + targetUserNewBalance + " " + discordUser.userData.currencyName + ".";
                    guildMemberData.lastTimeRobbed = new Date().getTime();
                    return [4 /*yield*/, guildMemberData.writeToDataBase()];
                case 28:
                    _c.sent();
                    messageEmbed = new Discord.MessageEmbed();
                    messageEmbed.setColor([255, 0, 0]).setDescription(msgString).setTimestamp(Date.now()).setTitle('__**Failed Robbery:**__')
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL());
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, messageEmbed)];
                case 29:
                    _c.sent();
                    _c.label = 30;
                case 30: return [3 /*break*/, 33];
                case 31:
                    msgString = '';
                    timeLeft = timeBetweenRobberies - currentTimeDifference;
                    hoursRemain = Math.trunc(timeLeft / msPerHour);
                    minutesRemain = Math.trunc((timeLeft % msPerHour) / msPerMinute);
                    secondsRemain = Math.trunc(((timeLeft % msPerHour) % msPerMinute) / msPerSecond);
                    if (hoursRemain > 0) {
                        msgString = "Sorry, but you need to wait " + hoursRemain + " hours, " + minutesRemain + " minutes, and " + secondsRemain + " seconds before you can rob someone again!";
                    }
                    else if (minutesRemain > 0) {
                        msgString = "Sorry, but you need to wait " + minutesRemain + " minutes, and " + secondsRemain + " seconds before you can rob someone again!";
                    }
                    else {
                        msgString = "Sorry, but you need to wait " + secondsRemain + " seconds before you can rob someone again!";
                    }
                    messageEmbed = new Discord.MessageEmbed();
                    messageEmbed.setColor([255, 0, 0]).setDescription(msgString).setTimestamp(Date.now()).setTitle('__**Failed Robbery:**__')
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL());
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, messageEmbed)];
                case 32:
                    _c.sent();
                    _c.label = 33;
                case 33: return [2 /*return*/, commandReturnData];
                case 34:
                    error_1 = _c.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            reject(error_1);
                        })];
                case 35: return [2 /*return*/];
            }
        });
    });
}
command.function = execute;
exports.default = command;
