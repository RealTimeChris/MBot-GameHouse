// slots.ts - Module for my "slots" command.
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
var Discord = require("discord.js");
var GuildData_1 = __importDefault(require("../GuildData"));
var GuildMemberData_1 = __importDefault(require("../GuildMemberData"));
var HelperFunctions_1 = __importDefault(require("../HelperFunctions"));
var command = {
    name: 'slots',
    description: '__**Slots Usage:**__ !slots = BETAMOUNT.',
    function: Function()
};
function execute(commandData, discordUser) {
    return __awaiter(this, void 0, void 0, function () {
        var commandReturnData, areWeInADM, areWeAllowed, guildData, betAmount, msgString, msgEmbed, msg_1, msgString, msgEmbed, msg_2, guildMemberData, msgString, msgEmbed, msg_3, payoutAmount, gameResultType_1, slotReel, reelStartIndex1, reelIndices1, x, reelStartIndex2, reelIndices2, x, reelStartIndex3, reelIndices3, x, msgStrings_1, msgString0, msgEmbed0, msg_4, msgString1, msgString2, msgString3, error_1;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 18, , 19]);
                    commandReturnData = {
                        commandName: command.name
                    };
                    commandReturnData.commandName = command.name;
                    return [4 /*yield*/, HelperFunctions_1.default.areWeInADM(commandData)];
                case 1:
                    areWeInADM = _a.sent();
                    if (areWeInADM) {
                        return [2 /*return*/, commandReturnData];
                    }
                    return [4 /*yield*/, HelperFunctions_1.default.checkIfAllowedInChannel(commandData, discordUser)];
                case 2:
                    areWeAllowed = _a.sent();
                    if (areWeAllowed === false) {
                        return [2 /*return*/, commandReturnData];
                    }
                    guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: commandData.guild.id, memberCount: commandData.guild.memberCount, name: commandData.guild.name });
                    return [4 /*yield*/, guildData.getFromDataBase()];
                case 3:
                    _a.sent();
                    betAmount = void 0;
                    if (!(commandData.args[0] === undefined)) return [3 /*break*/, 6];
                    msgString = "------\n**Please, enter a bet amount as the first argument of the command! (!slots = BETAMOUNT)**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 4:
                    msg_1 = _a.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg_1 = new Discord.Message(commandData.guild.client, msg_1, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg_1.delete({ timeout: 20000 })];
                case 5:
                    _a.sent();
                    return [2 /*return*/, commandReturnData];
                case 6:
                    if (!(parseInt(commandData.args[0], 10) <= 0)) return [3 /*break*/, 9];
                    msgString = "------\n**Please, enter a valid bet amount as the first argument of the command! (!slots = BETAMOUNT)**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 7:
                    msg_2 = _a.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg_2 = new Discord.Message(commandData.guild.client, msg_2, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg_2.delete({ timeout: 20000 })];
                case 8:
                    _a.sent();
                    return [2 /*return*/, commandReturnData];
                case 9:
                    betAmount = parseInt(commandData.args[0], 10);
                    _a.label = 10;
                case 10:
                    guildMemberData = new GuildMemberData_1.default({ dataBase: discordUser.dataBase, id: commandData.guildMember.id, guildId: commandData.guild.id,
                        userName: commandData.guildMember.user.username, displayName: commandData.guildMember.displayName });
                    return [4 /*yield*/, guildMemberData.getFromDataBase()];
                case 11:
                    _a.sent();
                    if (!(parseInt(commandData.args[0], 10) > guildMemberData.currency.wallet)) return [3 /*break*/, 14];
                    msgString = "------\n**Sorry, but you don't have sufficient funds in your wallet for placing that bet!**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Insufficient Funds:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 12:
                    msg_3 = _a.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg_3 = new Discord.Message(commandData.guild.client, msg_3, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg_3.delete({ timeout: 20000 })];
                case 13:
                    _a.sent();
                    return [2 /*return*/, commandReturnData];
                case 14:
                    payoutAmount = void 0;
                    slotReel = [":crossed_swords:", ":apple:", ":ring:", ":gun:", ":swan:", ":rocket:", ":coin:", ":star:", ":jack_o_lantern:", ":christmas_tree:"];
                    reelStartIndex1 = Math.trunc(Math.random() * 10);
                    reelIndices1 = [];
                    for (x = 0; x < 10; x += 1) {
                        reelIndices1[x] = (reelStartIndex1 + x) % 10;
                    }
                    reelStartIndex2 = Math.trunc(Math.random() * 10);
                    reelIndices2 = [];
                    for (x = 0; x < 10; x += 1) {
                        reelIndices2[x] = (reelStartIndex2 + x) % 10;
                    }
                    reelStartIndex3 = Math.trunc(Math.random() * 10);
                    reelIndices3 = [];
                    for (x = 0; x < 10; x += 1) {
                        reelIndices3[x] = (reelStartIndex3 + x) % 10;
                    }
                    msgStrings_1 = [];
                    msgString0 = "__**Slot Results:**__\n[:question:] [:question:] [:question:]\n\n            [:question:] [:question:] [:question:]\n\n            [:question:] [:question:] [:question:]\n\n__**Your Wager:**__ " + betAmount + " " + discordUser.userData.currencyName + "\n__**Maximum Payout:**__ " + (15 * betAmount).toString() + " " + discordUser.userData.currencyName;
                    msgStrings_1.push(msgString0);
                    msgEmbed0 = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgStrings_1[0])
                        .setTimestamp(Date())
                        .setTitle('__**Slots Game:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed0)];
                case 15:
                    msg_4 = _a.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg_4 = new Discord.Message(commandData.guild.client, msg_4, commandData.fromTextChannel);
                    }
                    msgString1 = "__**Slot Results:**__\n[" + slotReel[reelIndices1[7]] + "] [:question:] [:question:]\n\n            [" + slotReel[reelIndices1[8]] + "] [:question:] [:question:]\n\n            [" + slotReel[reelIndices1[9]] + "] [:question:] [:question:]\n\n__**Your Wager:**__ " + betAmount + " " + discordUser.userData.currencyName + "\n__**Maximum Payout:**__ " + (15 * betAmount).toString() + " " + discordUser.userData.currencyName;
                    msgStrings_1.push(msgString1);
                    setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                        var msgEmbed;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    msgEmbed = new Discord.MessageEmbed()
                                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                                        .setColor([0, 0, 255])
                                        .setDescription(msgStrings_1[1])
                                        .setTimestamp(Date())
                                        .setTitle('__**Slots Game:**__');
                                    return [4 /*yield*/, msg_4.edit(msgEmbed)];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); }, 3000);
                    msgString2 = "__**Slot Results:**__\n[" + slotReel[reelIndices1[7]] + " [" + slotReel[reelIndices2[7]] + "] [:question:]\n\n            [" + slotReel[reelIndices1[8]] + "] [" + slotReel[reelIndices2[8]] + "] [:question:]\n\n            [" + slotReel[reelIndices1[9]] + "] [" + slotReel[reelIndices2[9]] + "] [:question:]\n\n__**Your Wager:**__ " + betAmount + " " + discordUser.userData.currencyName + "\n__**Maximum Payout:**__ " + (15 * betAmount).toString() + " " + discordUser.userData.currencyName;
                    msgStrings_1.push(msgString2);
                    setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                        var msgEmbed;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    msgEmbed = new Discord.MessageEmbed()
                                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                                        .setColor([0, 0, 255])
                                        .setDescription(msgStrings_1[2])
                                        .setTimestamp(Date())
                                        .setTitle('__**Slots Game:**__');
                                    return [4 /*yield*/, msg_4.edit(msgEmbed)];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); }, 6000);
                    if (slotReel[reelIndices1[8]] === slotReel[reelIndices2[8]] && slotReel[reelIndices2[8]] === slotReel[reelIndices3[8]]) {
                        gameResultType_1 = 'Triple Straight';
                        payoutAmount = betAmount * 15;
                    }
                    else if ((slotReel[reelIndices1[9]] === slotReel[reelIndices2[8]] && slotReel[reelIndices2[8]] === slotReel[reelIndices3[7]]) ||
                        (slotReel[reelIndices1[7]] === slotReel[reelIndices2[8]] && slotReel[reelIndices2[8]] === slotReel[reelIndices3[9]])) {
                        gameResultType_1 = 'Triple Diagonal';
                        payoutAmount = betAmount * 7;
                    }
                    else if (slotReel[reelIndices1[8]] === slotReel[reelIndices2[8]] || slotReel[reelIndices3[8]] === slotReel[reelIndices2[8]]) {
                        gameResultType_1 = 'Double Straight';
                        payoutAmount = betAmount * 1;
                    }
                    else if ((slotReel[reelIndices1[9]] === slotReel[reelIndices2[8]]) || (slotReel[reelIndices1[7]] === slotReel[reelIndices2[8]]) ||
                        (slotReel[reelIndices3[9]] === slotReel[reelIndices2[8]]) || (slotReel[reelIndices3[7]] === slotReel[reelIndices2[8]])) {
                        gameResultType_1 = 'Double Diagonal';
                        payoutAmount = betAmount * 1;
                    }
                    else {
                        gameResultType_1 = 'Loss';
                        payoutAmount = -1 * betAmount;
                    }
                    guildData.casinoStats.totalPayout += payoutAmount;
                    guildData.casinoStats.totalSlotsPayout += payoutAmount;
                    if (payoutAmount > guildData.casinoStats.largestSlotsPayout.amount) {
                        guildData.casinoStats.largestSlotsPayout.amount = payoutAmount;
                        guildData.casinoStats.largestSlotsPayout.date = Date();
                        guildData.casinoStats.largestSlotsPayout.userID = guildMemberData.id;
                        guildData.casinoStats.largestSlotsPayout.username = guildMemberData.userName;
                    }
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 16:
                    _a.sent();
                    guildMemberData.currency.wallet += payoutAmount;
                    return [4 /*yield*/, guildMemberData.writeToDataBase()];
                case 17:
                    _a.sent();
                    msgString3 = "__**Slot Results:**__\n[" + slotReel[reelIndices1[7]] + "] [" + slotReel[reelIndices2[7]] + "] [" + slotReel[reelIndices3[7]] + "]\n\n            [" + slotReel[reelIndices1[8]] + "] [" + slotReel[reelIndices2[8]] + "] [" + slotReel[reelIndices3[8]] + "]\n\n            [" + slotReel[reelIndices1[9]] + "] [" + slotReel[reelIndices2[9]] + "] [" + slotReel[reelIndices3[9]] + "]\n------\n__**Your Wager:**__ " + betAmount + "\n__**Maximum Payout:**__ " + (15 * betAmount).toString() + " " + discordUser.userData.currencyName + "\n\n            __**Game Results:**__\n__**Payout:**__ " + payoutAmount + " " + discordUser.userData.currencyName + " __**Result Type:**__ " + gameResultType_1 + "\n__**Your New Wallet Balance:**__ " + guildMemberData.currency.wallet + " " + discordUser.userData.currencyName + "\n------";
                    msgStrings_1.push(msgString3);
                    setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                        var msgEmbed;
                        var _a, _b;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    msgEmbed = new Discord.MessageEmbed();
                                    if (gameResultType_1 === 'Loss') {
                                        msgEmbed
                                            .setAuthor((_a = commandData.guildMember) === null || _a === void 0 ? void 0 : _a.user.username, commandData.guildMember.user.avatarURL())
                                            .setColor([255, 0, 0])
                                            .setDescription(msgStrings_1[3])
                                            .setTimestamp(Date())
                                            .setTitle('__**Slots Game:**__');
                                    }
                                    else {
                                        msgEmbed
                                            .setAuthor((_b = commandData.guildMember) === null || _b === void 0 ? void 0 : _b.user.username, commandData.guildMember.user.avatarURL())
                                            .setColor([0, 255, 0])
                                            .setDescription(msgStrings_1[3])
                                            .setTimestamp(Date())
                                            .setTitle('__**Slots Game:**__');
                                    }
                                    return [4 /*yield*/, msg_4.edit(msgEmbed)];
                                case 1:
                                    _c.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); }, 9000);
                    return [2 /*return*/, commandReturnData];
                case 18:
                    error_1 = _a.sent();
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
