// deposit.ts - Module for my "deposit" command.
// Feb 21, 2021
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
    name: 'deposit',
    description: '__**Deposit Usage:**__ !deposit = AMOUNT ,or !deposit = ALL.',
    function: Function()
};
function execute(commandData, discordUser) {
    return __awaiter(this, void 0, void 0, function () {
        var commandReturnData, areWeInADM, guildMemberData, guildData, depositAmountRegExp, depositAmount, msgString_1, msgEmbed, msg, msgString_2, msgEmbed, msg, msPerSecond, SecondsPerMinute, msPerMinute, MinutesPerHour, msPerHour, msPerDepositCycle, currentTime, timeSinceLastDeposit, msgString, timeRemaining, hoursRemain, minutesRemain, secondsRemain, messageEmbed, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 16, , 17]);
                    commandReturnData = {
                        commandName: command.name
                    };
                    return [4 /*yield*/, HelperFunctions_1.default.areWeInADM(commandData)];
                case 1:
                    areWeInADM = _a.sent();
                    if (areWeInADM === true) {
                        return [2 /*return*/, commandReturnData];
                    }
                    guildMemberData = new GuildMemberData_1.default({ dataBase: discordUser.dataBase, id: commandData.guildMember.id, guildId: commandData.guild.id,
                        userName: commandData.guildMember.user.username, displayName: commandData.guildMember.displayName });
                    return [4 /*yield*/, guildMemberData.getFromDataBase()];
                case 2:
                    _a.sent();
                    guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: commandData.guild.id, memberCount: commandData.guild.memberCount, name: commandData.guild.name });
                    return [4 /*yield*/, guildData.getFromDataBase()];
                case 3:
                    _a.sent();
                    depositAmountRegExp = /\d{1,18}/;
                    depositAmount = 0;
                    if (!(commandData.args[0] !== undefined && commandData.args[0].toLowerCase() === 'all')) return [3 /*break*/, 4];
                    depositAmount = guildMemberData.currency.wallet;
                    return [3 /*break*/, 8];
                case 4:
                    if (!(commandData.args[0] === undefined || parseInt(commandData.args[0], 10) <= 0
                        || !depositAmountRegExp.test(commandData.args[0]))) return [3 /*break*/, 7];
                    msgString_1 = "------\n**Please enter a valid deposit amount! (!deposit = AMOUNT)**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString_1)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 5:
                    msg = _a.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 6:
                    _a.sent();
                    return [2 /*return*/, commandReturnData];
                case 7:
                    if (depositAmountRegExp.test(commandData.args[0])) {
                        depositAmount = parseInt(commandData.args[0].match(depositAmountRegExp)[0], 10);
                    }
                    _a.label = 8;
                case 8:
                    if (!(depositAmount > guildMemberData.currency.wallet)) return [3 /*break*/, 11];
                    msgString_2 = "------\n**Sorry, but you do not have sufficient funds to deposit that much!**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString_2)
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
                    msPerSecond = 1000;
                    SecondsPerMinute = 60;
                    msPerMinute = msPerSecond * SecondsPerMinute;
                    MinutesPerHour = 60;
                    msPerHour = msPerMinute * MinutesPerHour;
                    msPerDepositCycle = msPerHour * discordUser.userData.hoursOfDepositCooldown;
                    currentTime = new Date().getTime();
                    timeSinceLastDeposit = currentTime - guildMemberData.currency.timeOfLastDeposit;
                    msgString = '';
                    if (!(timeSinceLastDeposit >= msPerDepositCycle)) return [3 /*break*/, 13];
                    guildMemberData.currency.bank = Number(guildMemberData.currency.bank);
                    guildMemberData.currency.bank += depositAmount;
                    guildMemberData.currency.wallet = Number(guildMemberData.currency.wallet);
                    guildMemberData.currency.wallet -= depositAmount;
                    guildMemberData.currency.timeOfLastDeposit = new Date().getTime();
                    return [4 /*yield*/, guildMemberData.writeToDataBase()];
                case 12:
                    _a.sent();
                    msgString = "Congratulations! You've deposited " + depositAmount + " " + discordUser.userData.currencyName + " from your wallet into your bank!"
                        + '\n------\n__**Your new balances are:**__\n'
                        + ("__Bank:__ " + guildMemberData.currency.bank + " " + discordUser.userData.currencyName + "\n")
                        + ("__Wallet:__ " + guildMemberData.currency.wallet + " " + discordUser.userData.currencyName + "\n------");
                    return [3 /*break*/, 14];
                case 13:
                    timeRemaining = msPerDepositCycle - timeSinceLastDeposit;
                    hoursRemain = Math.trunc(timeRemaining / msPerHour);
                    minutesRemain = Math.trunc((timeRemaining % msPerHour) / msPerMinute);
                    secondsRemain = Math.trunc(((timeRemaining % msPerHour) % msPerMinute) / msPerSecond);
                    if (hoursRemain > 0) {
                        msgString = "Sorry, but you need to wait " + hoursRemain + " hours, " + minutesRemain + " minutes, and " + secondsRemain + " seconds before you can make another deposit!";
                    }
                    else if (minutesRemain > 0) {
                        msgString = "Sorry, but you need to wait " + minutesRemain + " minutes, and " + secondsRemain + " seconds before you can make another deposit!";
                    }
                    else {
                        msgString = "Sorry, but you need to wait " + secondsRemain + " seconds before you can make another deposit!";
                    }
                    _a.label = 14;
                case 14:
                    messageEmbed = new Discord.MessageEmbed();
                    messageEmbed
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setTitle('__**Bank Deposit:**__')
                        .setTimestamp(Date.now())
                        .setDescription(msgString);
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, messageEmbed)];
                case 15:
                    _a.sent();
                    return [2 /*return*/, commandReturnData];
                case 16:
                    error_1 = _a.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            reject(error_1);
                        })];
                case 17: return [2 /*return*/];
            }
        });
    });
}
command.function = execute;
exports.default = command;
