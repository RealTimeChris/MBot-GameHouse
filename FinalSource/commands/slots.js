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
        var commandReturnData_1, areWeInADM, areWeAllowed, guildData_1, betAmountOld_1, msgString, msgEmbed, msg_1, msgString, msgEmbed, msg_2, guildMemberData_1, msgString, msgEmbed, msg_3, payoutAmount_1, gameResultType_1, slotReel_1, reelStartIndex1, reelIndices1_1, x, reelStartIndex2, reelIndices2_1, x, reelStartIndex3, reelIndices3_1, x, msgStrings_1, msgString0, msgEmbed0, msg_4, error_1;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 16, , 17]);
                    commandReturnData_1 = {
                        commandName: command.name
                    };
                    return [4 /*yield*/, HelperFunctions_1.default.areWeInADM(commandData)];
                case 1:
                    areWeInADM = _a.sent();
                    if (areWeInADM) {
                        return [2 /*return*/, commandReturnData_1];
                    }
                    return [4 /*yield*/, HelperFunctions_1.default.checkIfAllowedInChannel(commandData, discordUser)];
                case 2:
                    areWeAllowed = _a.sent();
                    if (areWeAllowed === false) {
                        return [2 /*return*/, commandReturnData_1];
                    }
                    guildData_1 = new GuildData_1.default({ dataBase: discordUser.dataBase, id: commandData.guild.id, memberCount: commandData.guild.memberCount, name: commandData.guild.name });
                    return [4 /*yield*/, guildData_1.getFromDataBase()];
                case 3:
                    _a.sent();
                    if (!(commandData.args[0] === undefined)) return [3 /*break*/, 6];
                    msgString = "------\n**Please, enter a bet amount as the first argument of the command! (!slots = BETAMOUNT)**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData_1.borderColor)
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
                    return [2 /*return*/, commandReturnData_1];
                case 6:
                    if (!(parseInt(commandData.args[0], 10) <= 0)) return [3 /*break*/, 9];
                    msgString = "------\n**Please, enter a valid bet amount as the first argument of the command! (!slots = BETAMOUNT)**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData_1.borderColor)
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
                    return [2 /*return*/, commandReturnData_1];
                case 9:
                    betAmountOld_1 = parseInt(commandData.args[0], 10);
                    _a.label = 10;
                case 10:
                    guildMemberData_1 = new GuildMemberData_1.default({ dataBase: discordUser.dataBase, id: commandData.guildMember.id, guildId: commandData.guild.id,
                        userName: commandData.guildMember.user.username, displayName: commandData.guildMember.displayName });
                    return [4 /*yield*/, guildMemberData_1.getFromDataBase()];
                case 11:
                    _a.sent();
                    if (!(parseInt(commandData.args[0], 10) > guildMemberData_1.currency.wallet)) return [3 /*break*/, 14];
                    msgString = "------\n**Sorry, but you don't have sufficient funds in your wallet for placing that bet!**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData_1.borderColor)
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
                    return [2 /*return*/, commandReturnData_1];
                case 14:
                    slotReel_1 = [":crossed_swords:", ":apple:", ":ring:", ":gun:", ":swan:", ":rocket:", ":coin:", ":star:", ":jack_o_lantern:", ":christmas_tree:"];
                    reelStartIndex1 = Math.trunc(Math.random() * 10);
                    reelIndices1_1 = [];
                    for (x = 0; x < 10; x += 1) {
                        reelIndices1_1[x] = (reelStartIndex1 + x) % 10;
                    }
                    reelStartIndex2 = Math.trunc(Math.random() * 10);
                    reelIndices2_1 = [];
                    for (x = 0; x < 10; x += 1) {
                        reelIndices2_1[x] = (reelStartIndex2 + x) % 10;
                    }
                    reelStartIndex3 = Math.trunc(Math.random() * 10);
                    reelIndices3_1 = [];
                    for (x = 0; x < 10; x += 1) {
                        reelIndices3_1[x] = (reelStartIndex3 + x) % 10;
                    }
                    msgStrings_1 = [];
                    msgString0 = "__**Slot Results:**__\n[:question:] [:question:] [:question:]\n\n            [:question:] [:question:] [:question:]\n\n            [:question:] [:question:] [:question:]\n\n__**Your Wager:**__ " + betAmountOld_1 + " " + discordUser.userData.currencyName + "\n__**Maximum Payout:**__ " + (15 * betAmountOld_1).toString() + " " + discordUser.userData.currencyName;
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
                    setTimeout(function () {
                        var msgString1 = "__**Slot Results:**__\n[" + slotReel_1[reelIndices1_1[7]] + "] [:question:] [:question:]\n\n            [" + slotReel_1[reelIndices1_1[8]] + "] [:question:] [:question:]\n\n            [" + slotReel_1[reelIndices1_1[9]] + "] [:question:] [:question:]\n\n__**Your Wager:**__ " + betAmountOld_1 + " " + discordUser.userData.currencyName + "\n__**Maximum Payout:**__ " + (15 * betAmountOld_1).toString() + " " + discordUser.userData.currencyName;
                        msgStrings_1.push(msgString1);
                        var msgEmbed = new Discord.MessageEmbed()
                            .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                            .setColor([0, 0, 255])
                            .setDescription(msgStrings_1[1])
                            .setTimestamp(Date())
                            .setTitle('__**Slots Game:**__');
                        msg_4.edit(msgEmbed);
                    }, 3000);
                    setTimeout(function () {
                        var msgString2 = "__**Slot Results:**__\n[" + slotReel_1[reelIndices1_1[7]] + " [" + slotReel_1[reelIndices2_1[7]] + "] [:question:]\n\n            [" + slotReel_1[reelIndices1_1[8]] + "] [" + slotReel_1[reelIndices2_1[8]] + "] [:question:]\n\n            [" + slotReel_1[reelIndices1_1[9]] + "] [" + slotReel_1[reelIndices2_1[9]] + "] [:question:]\n\n__**Your Wager:**__ " + betAmountOld_1 + " " + discordUser.userData.currencyName + "\n__**Maximum Payout:**__ " + (15 * betAmountOld_1).toString() + " " + discordUser.userData.currencyName;
                        msgStrings_1.push(msgString2);
                        var msgEmbed = new Discord.MessageEmbed()
                            .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                            .setColor([0, 0, 255])
                            .setDescription(msgStrings_1[2])
                            .setTimestamp(Date())
                            .setTitle('__**Slots Game:**__');
                        msg_4.edit(msgEmbed);
                    }, 6000);
                    setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                        var msgString3_1, msgEmbed_1, msgString3, msgEmbed;
                        var _a, _b;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    if (slotReel_1[reelIndices1_1[8]] === slotReel_1[reelIndices2_1[8]] && slotReel_1[reelIndices2_1[8]] === slotReel_1[reelIndices3_1[8]]) {
                                        gameResultType_1 = 'Triple Straight';
                                        payoutAmount_1 = betAmountOld_1 * 15;
                                    }
                                    else if ((slotReel_1[reelIndices1_1[9]] === slotReel_1[reelIndices2_1[8]] && slotReel_1[reelIndices2_1[8]] === slotReel_1[reelIndices3_1[7]]) ||
                                        (slotReel_1[reelIndices1_1[7]] === slotReel_1[reelIndices2_1[8]] && slotReel_1[reelIndices2_1[8]] === slotReel_1[reelIndices3_1[9]])) {
                                        gameResultType_1 = 'Triple Diagonal';
                                        payoutAmount_1 = betAmountOld_1 * 7;
                                    }
                                    else if (slotReel_1[reelIndices1_1[8]] === slotReel_1[reelIndices2_1[8]] || slotReel_1[reelIndices3_1[8]] === slotReel_1[reelIndices2_1[8]]) {
                                        gameResultType_1 = 'Double Straight';
                                        payoutAmount_1 = betAmountOld_1 * 1;
                                    }
                                    else if ((slotReel_1[reelIndices1_1[9]] === slotReel_1[reelIndices2_1[8]]) || (slotReel_1[reelIndices1_1[7]] === slotReel_1[reelIndices2_1[8]]) ||
                                        (slotReel_1[reelIndices3_1[9]] === slotReel_1[reelIndices2_1[8]]) || (slotReel_1[reelIndices3_1[7]] === slotReel_1[reelIndices2_1[8]])) {
                                        gameResultType_1 = 'Double Diagonal';
                                        payoutAmount_1 = betAmountOld_1 * 1;
                                    }
                                    else {
                                        gameResultType_1 = 'Loss';
                                        payoutAmount_1 = -1 * betAmountOld_1;
                                    }
                                    return [4 /*yield*/, guildData_1.getFromDataBase()];
                                case 1:
                                    _c.sent();
                                    guildData_1.casinoStats.totalPayout += payoutAmount_1;
                                    guildData_1.casinoStats.totalSlotsPayout += payoutAmount_1;
                                    if (payoutAmount_1 > guildData_1.casinoStats.largestSlotsPayout.amount) {
                                        guildData_1.casinoStats.largestSlotsPayout.amount = payoutAmount_1;
                                        guildData_1.casinoStats.largestSlotsPayout.date = Date();
                                        guildData_1.casinoStats.largestSlotsPayout.userID = guildMemberData_1.id;
                                        guildData_1.casinoStats.largestSlotsPayout.username = guildMemberData_1.userName;
                                    }
                                    return [4 /*yield*/, guildData_1.writeToDataBase()];
                                case 2:
                                    _c.sent();
                                    return [4 /*yield*/, guildMemberData_1.getFromDataBase()];
                                case 3:
                                    _c.sent();
                                    if (!(betAmountOld_1 > guildMemberData_1.currency.wallet)) return [3 /*break*/, 5];
                                    msgString3_1 = "__**Slot Results:**__\n[:x:] [:x:] [:x:]\n\n                [:x:] [:x:] [:x:]\n\n                [:x:] [:x:] [:x:]\n------\n__**Your Wager:**__ " + betAmountOld_1 + "\n__**Maximum Payout:**__ " + (15 * betAmountOld_1).toString() + " " + discordUser.userData.currencyName + "\n\n                __**Game Results:**__\n__**Payout:**__ NSF __**Result Type:**__ Non-Sufficient Funds\n__**Your New Wallet Balance:**__ " + guildMemberData_1.currency.wallet + " " + discordUser.userData.currencyName + "\n------";
                                    msgStrings_1.push(msgString3_1);
                                    msgEmbed_1 = new Discord.MessageEmbed()
                                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                                        .setColor([255, 0, 0])
                                        .setDescription(msgString3_1)
                                        .setTimestamp(Date())
                                        .setTitle('__**Slots Game:**__');
                                    return [4 /*yield*/, msg_4.edit(msgEmbed_1)];
                                case 4:
                                    _c.sent();
                                    return [2 /*return*/, commandReturnData_1];
                                case 5:
                                    guildMemberData_1.currency.wallet += payoutAmount_1;
                                    return [4 /*yield*/, guildMemberData_1.writeToDataBase()];
                                case 6:
                                    _c.sent();
                                    msgString3 = "__**Slot Results:**__\n[" + slotReel_1[reelIndices1_1[7]] + "] [" + slotReel_1[reelIndices2_1[7]] + "] [" + slotReel_1[reelIndices3_1[7]] + "]\n\n            [" + slotReel_1[reelIndices1_1[8]] + "] [" + slotReel_1[reelIndices2_1[8]] + "] [" + slotReel_1[reelIndices3_1[8]] + "]\n\n            [" + slotReel_1[reelIndices1_1[9]] + "] [" + slotReel_1[reelIndices2_1[9]] + "] [" + slotReel_1[reelIndices3_1[9]] + "]\n------\n__**Your Wager:**__ " + betAmountOld_1 + "\n__**Maximum Payout:**__ " + (15 * betAmountOld_1).toString() + " " + discordUser.userData.currencyName + "\n\n            __**Game Results:**__\n__**Payout:**__ " + payoutAmount_1 + " " + discordUser.userData.currencyName + " __**Result Type:**__ " + gameResultType_1 + "\n__**Your New Wallet Balance:**__ " + guildMemberData_1.currency.wallet + " " + discordUser.userData.currencyName + "\n------";
                                    msgStrings_1.push(msgString3);
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
                                case 7:
                                    _c.sent();
                                    return [2 /*return*/, commandReturnData_1];
                            }
                        });
                    }); }, 9000);
                    return [2 /*return*/, commandReturnData_1];
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
