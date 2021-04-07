// roulette.ts - Module for my roulette game command!
// Feb 10, 2021
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
var descEmbed = new Discord.MessageEmbed();
var msgString1 = '';
msgString1 = '\n__**Roulette Usage:**__ !roulette = start to begin a game, and then !roulette = bet, BETAMOUNT, BETTYPE, BETOPTIONS to bet on it!\n__Where BETTYPE and BETOPTIONS are as follows:__\n```isbl\n'
    + 'Bet Type/Payout:     Bet Options:\n'
    + '------------------------------------------------------------'
    + '\n0        / 35:1  |'
    + '\n00       / 35:1  |'
    + '\nstraight / 35:1  |A single number to choose.'
    + '\nrow      / 17:1  |'
    + '\nsplit    / 17:1  |The first of two consecutive numbers.'
    + '\nstreet   / 11:1  |The first of threee consecutive numbers.'
    + '\nbasket   / 6:1   |'
    + '\nsixline  / 5:1   |The first of six consecutive numbers.'
    + '\n1stcolumn/ 2:1   |'
    + '\n2ndcolumn/ 2:1   |'
    + '\n3rdcolumn/ 2:1   |'
    + '\n1stdozen / 2:1   |'
    + '\n2nddozen / 2:1   |'
    + '\n3rddozen / 2:1   |'
    + '\nodd      / 1:1   |'
    + '\neven     / 1:1   |'
    + '\nred      / 1:1   |'
    + '\nblack    / 1:1   |'
    + '\n1to18    / 1:1   |'
    + '\n19to36   / 1:1   |```';
descEmbed.setDescription(msgString1);
var command = {
    name: 'roulette',
    description: descEmbed,
    function: Function()
};
/**
 * Takes an input number string and returns a string with the color value added to the front.
 */
function getNumberString(inputString, redNumbers, blackNumbers) {
    var returnString = '';
    for (var x = 0; x < redNumbers.length; x += 1) {
        if (redNumbers[x].includes(inputString)) {
            if (redNumbers[x].substring(12) === inputString) {
                returnString = redNumbers[x];
            }
        }
    }
    for (var x = 0; x < blackNumbers.length; x += 1) {
        if (blackNumbers[x].includes(inputString)) {
            if (blackNumbers[x].substring(20) === inputString) {
                returnString = blackNumbers[x];
            }
        }
    }
    if (inputString === '0') {
        returnString = ':green_square:0';
    }
    else if (inputString === '00') {
        returnString = ':green_square:00';
    }
    return returnString;
}
function calculateResults(guildData, finalRoll, commandData, discordUser, redNumbers, blackNumbers) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
    return __awaiter(this, void 0, void 0, function () {
        var msgStringFinal, finalRollString, x, isItAWinner, currentGuild, currentGuildMember, guildMemberData, betAmount, payoutAmount, winningNumbers, x_1, largestPayout, msgEmbed;
        return __generator(this, function (_r) {
            switch (_r.label) {
                case 0:
                    msgStringFinal = '';
                    finalRollString = getNumberString(finalRoll.toString(), redNumbers, blackNumbers);
                    msgStringFinal += "------\n__**Final Roll:**__ " + finalRollString + "\n------\n";
                    x = 0;
                    _r.label = 1;
                case 1:
                    if (!(x < guildData.rouletteGame.bets.length)) return [3 /*break*/, 8];
                    console.log(guildData.rouletteGame.bets[x]);
                    isItAWinner = false;
                    return [4 /*yield*/, ((_a = commandData.guild) === null || _a === void 0 ? void 0 : _a.client.guilds.fetch(commandData.guild.id))];
                case 2:
                    currentGuild = _r.sent();
                    return [4 /*yield*/, (currentGuild === null || currentGuild === void 0 ? void 0 : currentGuild.members.fetch((_c = (_b = guildData.rouletteGame) === null || _b === void 0 ? void 0 : _b.bets[x]) === null || _c === void 0 ? void 0 : _c.userID))];
                case 3:
                    currentGuildMember = _r.sent();
                    guildMemberData = new GuildMemberData_1.default({ dataBase: discordUser.dataBase, displayName: currentGuildMember === null || currentGuildMember === void 0 ? void 0 : currentGuildMember.displayName, guildId: commandData.guild.id,
                        id: (_e = (_d = guildData.rouletteGame) === null || _d === void 0 ? void 0 : _d.bets[x]) === null || _e === void 0 ? void 0 : _e.userID, userName: currentGuildMember === null || currentGuildMember === void 0 ? void 0 : currentGuildMember.user.username, });
                    return [4 /*yield*/, guildMemberData.getFromDataBase()];
                case 4:
                    _r.sent();
                    msgStringFinal += "__**<@!" + (guildMemberData.id) + ">**__: ";
                    betAmount = guildData.rouletteGame.bets[x].betAmount;
                    payoutAmount = guildData.rouletteGame.bets[x].payoutAmount;
                    winningNumbers = guildData.rouletteGame.bets[x].winningNumbers;
                    for (x_1 = 0; x_1 < winningNumbers.length; x_1 += 1) {
                        if (finalRoll === (37).toString()) {
                            finalRoll = '00';
                        }
                        if (getNumberString(finalRoll.toString(), redNumbers, blackNumbers) === ((_f = winningNumbers[x_1]) === null || _f === void 0 ? void 0 : _f.toString())) {
                            isItAWinner = true;
                            break;
                        }
                    }
                    if (isItAWinner === false) {
                        payoutAmount = -betAmount;
                    }
                    if (!(betAmount > guildMemberData.currency.wallet)) return [3 /*break*/, 5];
                    msgStringFinal += "__**NSF:**__ Non-sufficient funds! __**Bet:**__ " + ((_g = guildData.rouletteGame.bets[x]) === null || _g === void 0 ? void 0 : _g.betAmount) + " " + discordUser.userData.currencyName + " __**On:**__ " +
                        (((_h = guildData.rouletteGame.bets[x]) === null || _h === void 0 ? void 0 : _h.betType) + ", " + ((_j = guildData.rouletteGame.bets[x]) === null || _j === void 0 ? void 0 : _j.betOptions) + "\n");
                    return [3 /*break*/, 7];
                case 5:
                    if (payoutAmount > guildData.casinoStats.largestRoulettePayout.amount) {
                        largestPayout = { amount: payoutAmount, date: Date(), userID: guildMemberData.id, username: guildMemberData.userName };
                        guildData.casinoStats.largestRoulettePayout = largestPayout;
                    }
                    guildData.casinoStats.totalRoulettePayout += payoutAmount;
                    guildData.casinoStats.totalPayout += payoutAmount;
                    guildMemberData.currency.wallet += payoutAmount;
                    return [4 /*yield*/, guildMemberData.writeToDataBase()];
                case 6:
                    _r.sent();
                    if (((_k = guildData.rouletteGame.bets[x]) === null || _k === void 0 ? void 0 : _k.betOptions) !== undefined) {
                        msgStringFinal += payoutAmount.toString() + " " + discordUser.userData.currencyName + " __**Bet:**__ " + ((_l = guildData.rouletteGame.bets[x]) === null || _l === void 0 ? void 0 : _l.betAmount) + " " + discordUser.userData.currencyName + " __**On:**__ " +
                            (((_m = guildData.rouletteGame.bets[x]) === null || _m === void 0 ? void 0 : _m.betType) + ", " + ((_o = guildData.rouletteGame.bets[x]) === null || _o === void 0 ? void 0 : _o.betOptions) + "\n");
                    }
                    else {
                        msgStringFinal += payoutAmount.toString() + " " + discordUser.userData.currencyName + " __**Bet:**__ " + ((_p = guildData.rouletteGame.bets[x]) === null || _p === void 0 ? void 0 : _p.betAmount) + " " + discordUser.userData.currencyName + " __**On:**__ " +
                            (((_q = guildData.rouletteGame.bets[x]) === null || _q === void 0 ? void 0 : _q.betType) + "\n");
                    }
                    _r.label = 7;
                case 7:
                    x += 1;
                    return [3 /*break*/, 1];
                case 8:
                    msgStringFinal += '------';
                    msgEmbed = new Discord.MessageEmbed();
                    msgEmbed
                        .setAuthor(commandData.guild.client.user.username, commandData.guild.client.user.avatarURL())
                        .setDescription(msgStringFinal)
                        .setTitle('__**Roulette Results:**__')
                        .setTimestamp(Date())
                        .setColor([0, 0, 255]);
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 9:
                    _r.sent();
                    guildData.rouletteGame.currentlySpinning = false;
                    guildData.rouletteGame.bets = [];
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 10:
                    _r.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function execute(commandData, discordUser) {
    var _a, _b, _c, _d;
    return __awaiter(this, void 0, void 0, function () {
        var commandReturnData, areWeInADM, areWeAllowed, guildData_1, whatAreWeDoing, betAmount, betType, betOptions, msgString, msgEmbed, msg, msgString, msgEmbed, msg, msgString, msgEmbed, msg, msgString, msgEmbed, msg, msgString, msgEmbed, msg, digitRegExp, betTypes, redNumbers_1, blackNumbers_1, guildMemberData, currentBetAmount, x, number, msgString, msgEmbed_1, msg, isValidType, x, msgString, msgEmbed_2, msg, payoutAmount, winningNumbers, _e, msgString, msgEmbed_3, msg, msgString, msgEmbed_4, msg, msgString, msgEmbed_5, msg, msgString, msgEmbed_6, msg, msgString, msgEmbed_7, msg, msgString, msgEmbed_8, msg, msgString, msgEmbed_9, msg, msgString, msgEmbed_10, msg, x, x, x, x, x, x, x, newRouletteBet, msgEmbed, msgEmbed, newMessage_1, error_1;
        var _this = this;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    _f.trys.push([0, 85, , 86]);
                    commandReturnData = {
                        commandName: command.name
                    };
                    commandReturnData.commandName = command.name;
                    return [4 /*yield*/, HelperFunctions_1.default.areWeInADM(commandData)];
                case 1:
                    areWeInADM = _f.sent();
                    if (areWeInADM === true) {
                        return [2 /*return*/, commandReturnData];
                    }
                    return [4 /*yield*/, HelperFunctions_1.default.checkIfAllowedInChannel(commandData, discordUser)];
                case 2:
                    areWeAllowed = _f.sent();
                    if (areWeAllowed === false) {
                        return [2 /*return*/, commandReturnData];
                    }
                    guildData_1 = new GuildData_1.default({ dataBase: discordUser.dataBase, id: commandData.guild.id, memberCount: commandData.guild.memberCount, name: commandData.guild.name });
                    return [4 /*yield*/, guildData_1.getFromDataBase()];
                case 3:
                    _f.sent();
                    whatAreWeDoing = void 0;
                    betAmount = void 0;
                    betType = void 0;
                    betOptions = void 0;
                    if (!(commandData.args[0] === undefined)) return [3 /*break*/, 6];
                    msgString = "------\n**Please, enter either 'start' or 'bet  as the first argument! (!roulette = bet, BETAMOUNT, BETTYPE, BETOPTIONS)**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData_1.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 4:
                    msg = _f.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 5:
                    _f.sent();
                    return [2 /*return*/, commandReturnData];
                case 6:
                    if (!(commandData.args[0].toLowerCase() !== 'start' && (commandData.args[0]).toLowerCase() !== 'bet')) return [3 /*break*/, 9];
                    msgString = "------\n**Please, enter either a 'start' or 'bet' as the first arguments! (!roulette = bet, BETAMOUNT, BETTYPE, BETOPTIONS)**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData_1.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 7:
                    msg = _f.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 8:
                    _f.sent();
                    return [2 /*return*/, commandReturnData];
                case 9:
                    if (!(commandData.args[0].toLowerCase() === 'start')) return [3 /*break*/, 14];
                    return [4 /*yield*/, guildData_1.getFromDataBase()];
                case 10:
                    _f.sent();
                    if (!(guildData_1.rouletteGame.currentlySpinning === true)) return [3 /*break*/, 13];
                    msgString = "------\n**Please, wait until the current game is over, before starting another one!**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData_1.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Game Issue:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 11:
                    msg = _f.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 12:
                    _f.sent();
                    return [2 /*return*/, commandReturnData];
                case 13:
                    whatAreWeDoing = 'start';
                    return [3 /*break*/, 19];
                case 14:
                    if (!(commandData.args[0].toLowerCase() === 'bet')) return [3 /*break*/, 19];
                    return [4 /*yield*/, guildData_1.getFromDataBase()];
                case 15:
                    _f.sent();
                    if (!(guildData_1.rouletteGame.currentlySpinning === false)) return [3 /*break*/, 18];
                    msgString = "------\n**Please, start a roulette game before placing any bets!**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData_1.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Game Issue:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 16:
                    msg = _f.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 17:
                    _f.sent();
                    return [2 /*return*/, commandReturnData];
                case 18:
                    whatAreWeDoing = 'bet';
                    _f.label = 19;
                case 19:
                    if (!(parseInt((_a = commandData.args[1]) === null || _a === void 0 ? void 0 : _a.toString(), 10) <= 0)) return [3 /*break*/, 22];
                    msgString = "------\n**Please, enter a valid betting amount! (!roulette = bet, BETAMOUNT, BETTYPE, BETOPTIONS)**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData_1.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 20:
                    msg = _f.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 21:
                    _f.sent();
                    return [2 /*return*/, commandReturnData];
                case 22:
                    betAmount = parseInt((_b = commandData.args[1]) === null || _b === void 0 ? void 0 : _b.toString(), 10);
                    _f.label = 23;
                case 23:
                    digitRegExp = /\d{1,18}/;
                    betTypes = ['0', '00', 'straight', 'row', 'split', 'street', 'basket', 'sixline', '1stcolumn', '2ndcolumn', '3rdcolumn', '1stdozen', '2nddozen', '3rddozen', 'odd', 'even', 'red', 'black', '1to18', '19to36'];
                    redNumbers_1 = [];
                    redNumbers_1 = [':red_square:32', ':red_square:19', ':red_square:21', ':red_square:25', ':red_square:34', ':red_square:27', ':red_square:36', ':red_square:30', ':red_square:23', ':red_square:5',
                        ':red_square:16', ':red_square:1', ':red_square:14', ':red_square:9', ':red_square:18', ':red_square:7', ':red_square:12', ':red_square:3'];
                    blackNumbers_1 = [];
                    blackNumbers_1 = [':black_large_square:15', ':black_large_square:4', ':black_large_square:2', ':black_large_square:17', ':black_large_square:6', ':black_large_square:13', ':black_large_square:11', ':black_large_square:8', ':black_large_square:10',
                        ':black_large_square:24', ':black_large_square:33', ':black_large_square:20', ':black_large_square:31', ':black_large_square:22', ':black_large_square:29', ':black_large_square:28', ':black_large_square:35', ':black_large_square:26'];
                    if (!(whatAreWeDoing === 'bet')) return [3 /*break*/, 80];
                    guildMemberData = new GuildMemberData_1.default({ dataBase: discordUser.dataBase, id: commandData.guildMember.id, guildId: commandData.guild.id,
                        userName: commandData.guildMember.user.username, displayName: commandData.guildMember.displayName });
                    return [4 /*yield*/, guildMemberData.getFromDataBase()];
                case 24:
                    _f.sent();
                    currentBetAmount = 0;
                    for (x = 0; x < guildData_1.rouletteGame.bets.length; x += 1) {
                        if (guildMemberData.id === ((_c = commandData.guildMember) === null || _c === void 0 ? void 0 : _c.id)) {
                            number = (_d = guildData_1.rouletteGame.bets[x]) === null || _d === void 0 ? void 0 : _d.betAmount;
                            currentBetAmount += number;
                        }
                    }
                    if (!((currentBetAmount + betAmount) > guildMemberData.currency.wallet)) return [3 /*break*/, 27];
                    msgString = "------\n**Sorry, but you have insufficient funds in your wallet for placing that bet!**\n------";
                    msgEmbed_1 = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData_1.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Insufficient Funds:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed_1)];
                case 25:
                    msg = _f.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 26:
                    _f.sent();
                    return [2 /*return*/, commandReturnData];
                case 27:
                    isValidType = false;
                    for (x = 0; x < betTypes.length; x += 1) {
                        if (commandData.args[2] !== undefined && commandData.args[2].toLowerCase() === betTypes[x]) {
                            isValidType = true;
                            break;
                        }
                    }
                    if (!(isValidType === false)) return [3 /*break*/, 30];
                    msgString = "------\n**Please enter a valid bet type! Enter '!help = roulette' for more info! (!roulette = BETAMOUNT, BETTYPE, BETOPTIONS)**\n------";
                    msgEmbed_2 = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData_1.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed_2)];
                case 28:
                    msg = _f.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 29:
                    _f.sent();
                    return [2 /*return*/, commandReturnData];
                case 30:
                    betType = commandData.args[2];
                    _f.label = 31;
                case 31:
                    betOptions = commandData.args[3];
                    payoutAmount = 0;
                    winningNumbers = [];
                    _e = betType;
                    switch (_e) {
                        case '0': return [3 /*break*/, 32];
                        case '00': return [3 /*break*/, 33];
                        case 'red': return [3 /*break*/, 34];
                        case 'black': return [3 /*break*/, 35];
                        case 'straight': return [3 /*break*/, 36];
                        case 'row': return [3 /*break*/, 43];
                        case 'split': return [3 /*break*/, 44];
                        case 'street': return [3 /*break*/, 51];
                        case 'basket': return [3 /*break*/, 58];
                        case 'sixline': return [3 /*break*/, 59];
                        case '1stcolumn': return [3 /*break*/, 66];
                        case '2ndcolumn': return [3 /*break*/, 67];
                        case '3rdcolumn': return [3 /*break*/, 68];
                        case '1stdozen': return [3 /*break*/, 69];
                        case '2nddozen': return [3 /*break*/, 70];
                        case '3rddozen': return [3 /*break*/, 71];
                        case 'odd': return [3 /*break*/, 72];
                        case 'even': return [3 /*break*/, 73];
                        case '1to18': return [3 /*break*/, 74];
                        case '19to36': return [3 /*break*/, 75];
                    }
                    return [3 /*break*/, 76];
                case 32:
                    winningNumbers[0] = ':green_square:0';
                    payoutAmount = betAmount * 35;
                    return [3 /*break*/, 77];
                case 33:
                    winningNumbers[0] = ':green_square:00';
                    payoutAmount = betAmount * 35;
                    return [3 /*break*/, 77];
                case 34:
                    payoutAmount = betAmount;
                    winningNumbers = redNumbers_1;
                    return [3 /*break*/, 77];
                case 35:
                    payoutAmount = betAmount;
                    winningNumbers = blackNumbers_1;
                    return [3 /*break*/, 77];
                case 36:
                    payoutAmount = betAmount * 35;
                    if (!(commandData.args[3] === undefined || !digitRegExp.test(commandData.args[3]) || !digitRegExp.test(commandData.args[3]))) return [3 /*break*/, 39];
                    msgString = "------\n**Please enter a valid value from the roulette wheel! (1-36)**\n------";
                    msgEmbed_3 = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData_1.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed_3)];
                case 37:
                    msg = _f.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 38:
                    _f.sent();
                    return [2 /*return*/, commandReturnData];
                case 39:
                    if (!(parseInt(commandData.args[3].toString().match(digitRegExp)[0], 10) < 1
                        || parseInt(commandData.args[3].toString().match(digitRegExp)[0], 10) > 36)) return [3 /*break*/, 42];
                    msgString = "------\n**Please enter a value between 1 and 36!**\n------";
                    msgEmbed_4 = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData_1.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed_4)];
                case 40:
                    msg = _f.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 41:
                    _f.sent();
                    return [2 /*return*/, commandReturnData];
                case 42:
                    winningNumbers[0] = getNumberString(commandData.args[3], redNumbers_1, blackNumbers_1);
                    return [3 /*break*/, 77];
                case 43:
                    payoutAmount = betAmount * 17;
                    winningNumbers[0] = ':green_square:0';
                    winningNumbers[1] = ':green_square:00';
                    return [3 /*break*/, 77];
                case 44:
                    payoutAmount = betAmount * 17;
                    if (!(commandData.args[3] === undefined || !digitRegExp.test(commandData.args[3]) || !digitRegExp.test(commandData.args[3]))) return [3 /*break*/, 47];
                    msgString = "------\n**Please enter a valid starting value for your split! (1-35)**\n------";
                    msgEmbed_5 = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData_1.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed_5)];
                case 45:
                    msg = _f.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 46:
                    _f.sent();
                    return [2 /*return*/, commandReturnData];
                case 47:
                    if (!(parseInt(commandData.args[3].toString().match(digitRegExp)[0], 10) < 1
                        || parseInt(commandData.args[3].toString().match(digitRegExp)[0], 10) > 35)) return [3 /*break*/, 50];
                    msgString = "-------\n**Please enter a value between 1 and 35!**\n------";
                    msgEmbed_6 = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData_1.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed_6)];
                case 48:
                    msg = _f.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 49:
                    _f.sent();
                    return [2 /*return*/, commandReturnData];
                case 50:
                    winningNumbers[0] = getNumberString(commandData.args[3], redNumbers_1, blackNumbers_1);
                    winningNumbers[1] = getNumberString((parseInt(commandData.args[3], 10) + 1)
                        .toString(), redNumbers_1, blackNumbers_1);
                    return [3 /*break*/, 77];
                case 51:
                    payoutAmount = betAmount * 11;
                    if (!(commandData.args[3] === undefined || !digitRegExp.test(commandData.args[3]) || !digitRegExp.test(commandData.args[3]))) return [3 /*break*/, 54];
                    msgString = "------\n**Please enter a valid starting value for your street! (1-34)**\n------";
                    msgEmbed_7 = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData_1.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed_7)];
                case 52:
                    msg = _f.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 53:
                    _f.sent();
                    return [2 /*return*/, commandReturnData];
                case 54:
                    if (!(parseInt(commandData.args[3].toString().match(digitRegExp)[0], 10) < 1
                        || parseInt(commandData.args[3].toString().match(digitRegExp)[0], 10) > 34)) return [3 /*break*/, 57];
                    msgString = "-------\n**Please enter a value between 1 and 34!**\n------";
                    msgEmbed_8 = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData_1.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed_8)];
                case 55:
                    msg = _f.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 56:
                    _f.sent();
                    return [2 /*return*/, commandReturnData];
                case 57:
                    winningNumbers[0] = getNumberString(commandData.args[3], redNumbers_1, blackNumbers_1);
                    winningNumbers[1] = getNumberString((parseInt(commandData.args[3], 10) + 1)
                        .toString(), redNumbers_1, blackNumbers_1);
                    winningNumbers[2] = getNumberString((parseInt(commandData.args[3], 10) + 2)
                        .toString(), redNumbers_1, blackNumbers_1);
                    return [3 /*break*/, 77];
                case 58:
                    payoutAmount = betAmount * 6;
                    winningNumbers[0] = getNumberString('0', redNumbers_1, blackNumbers_1);
                    winningNumbers[1] = getNumberString('1', redNumbers_1, blackNumbers_1);
                    winningNumbers[2] = getNumberString('2', redNumbers_1, blackNumbers_1);
                    winningNumbers[3] = getNumberString('3', redNumbers_1, blackNumbers_1);
                    winningNumbers[4] = ':green_square:00';
                    return [3 /*break*/, 77];
                case 59:
                    payoutAmount = betAmount * 5;
                    if (!(commandData.args[3] === undefined || !digitRegExp.test(commandData.args[3]) || !digitRegExp.test(commandData.args[3]))) return [3 /*break*/, 62];
                    msgString = "------\n**Please enter a valid starting value for your sixline!**\n------";
                    msgEmbed_9 = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData_1.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed_9)];
                case 60:
                    msg = _f.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 61:
                    _f.sent();
                    return [2 /*return*/, commandReturnData];
                case 62:
                    if (!(parseInt(commandData.args[3].toString().match(digitRegExp)[0], 10) < 1
                        || parseInt(commandData.args[3].toString().match(digitRegExp)[0], 10) > 31)) return [3 /*break*/, 65];
                    msgString = "------\n**Please enter a value between 1 and 31!**\n------";
                    msgEmbed_10 = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData_1.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed_10)];
                case 63:
                    msg = _f.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 64:
                    _f.sent();
                    return [2 /*return*/, commandReturnData];
                case 65:
                    winningNumbers[0] = getNumberString(commandData.args[3], redNumbers_1, blackNumbers_1);
                    winningNumbers[1] = getNumberString((parseInt(commandData.args[3], 10) + 1)
                        .toString(), redNumbers_1, blackNumbers_1);
                    winningNumbers[2] = getNumberString((parseInt(commandData.args[3], 10) + 2)
                        .toString(), redNumbers_1, blackNumbers_1);
                    winningNumbers[3] = getNumberString((parseInt(commandData.args[3], 10) + 3)
                        .toString(), redNumbers_1, blackNumbers_1);
                    winningNumbers[4] = getNumberString((parseInt(commandData.args[3], 10) + 4)
                        .toString(), redNumbers_1, blackNumbers_1);
                    winningNumbers[5] = getNumberString((parseInt(commandData.args[3], 10) + 5)
                        .toString(), redNumbers_1, blackNumbers_1);
                    return [3 /*break*/, 77];
                case 66:
                    payoutAmount = betAmount * 2;
                    winningNumbers = [getNumberString('1', redNumbers_1, blackNumbers_1), getNumberString('4', redNumbers_1, blackNumbers_1), getNumberString('7', redNumbers_1, blackNumbers_1), getNumberString('10', redNumbers_1, blackNumbers_1),
                        getNumberString('13', redNumbers_1, blackNumbers_1), getNumberString('16', redNumbers_1, blackNumbers_1), getNumberString('19', redNumbers_1, blackNumbers_1), getNumberString('22', redNumbers_1, blackNumbers_1),
                        getNumberString('25', redNumbers_1, blackNumbers_1), getNumberString('28', redNumbers_1, blackNumbers_1), getNumberString('31', redNumbers_1, blackNumbers_1), getNumberString('34', redNumbers_1, blackNumbers_1)];
                    return [3 /*break*/, 77];
                case 67:
                    payoutAmount = betAmount * 2;
                    winningNumbers = [getNumberString('2', redNumbers_1, blackNumbers_1), getNumberString('5', redNumbers_1, blackNumbers_1), getNumberString('8', redNumbers_1, blackNumbers_1), getNumberString('11', redNumbers_1, blackNumbers_1),
                        getNumberString('14', redNumbers_1, blackNumbers_1), getNumberString('17', redNumbers_1, blackNumbers_1), getNumberString('20', redNumbers_1, blackNumbers_1), getNumberString('23', redNumbers_1, blackNumbers_1),
                        getNumberString('26', redNumbers_1, blackNumbers_1), getNumberString('29', redNumbers_1, blackNumbers_1), getNumberString('32', redNumbers_1, blackNumbers_1), getNumberString('35', redNumbers_1, blackNumbers_1)];
                    return [3 /*break*/, 77];
                case 68:
                    payoutAmount = betAmount * 2;
                    winningNumbers = [getNumberString('3', redNumbers_1, blackNumbers_1), getNumberString('6', redNumbers_1, blackNumbers_1), getNumberString('9', redNumbers_1, blackNumbers_1), getNumberString('12', redNumbers_1, blackNumbers_1),
                        getNumberString('15', redNumbers_1, blackNumbers_1), getNumberString('18', redNumbers_1, blackNumbers_1), getNumberString('21', redNumbers_1, blackNumbers_1), getNumberString('24', redNumbers_1, blackNumbers_1),
                        getNumberString('27', redNumbers_1, blackNumbers_1), getNumberString('30', redNumbers_1, blackNumbers_1), getNumberString('33', redNumbers_1, blackNumbers_1), getNumberString('36', redNumbers_1, blackNumbers_1)];
                    return [3 /*break*/, 77];
                case 69:
                    payoutAmount = betAmount * 2;
                    for (x = 1; x <= 12; x += 1) {
                        winningNumbers[x - 1] = getNumberString(x.toString(), redNumbers_1, blackNumbers_1);
                    }
                    return [3 /*break*/, 77];
                case 70:
                    payoutAmount = betAmount * 2;
                    for (x = 13; x <= 24; x += 1) {
                        winningNumbers[x - 13] = getNumberString(x.toString(), redNumbers_1, blackNumbers_1);
                    }
                    return [3 /*break*/, 77];
                case 71:
                    payoutAmount = betAmount * 2;
                    for (x = 25; x <= 36; x += 1) {
                        winningNumbers[x - 25] = getNumberString(x.toString(), redNumbers_1, blackNumbers_1);
                    }
                    return [3 /*break*/, 77];
                case 72:
                    payoutAmount = betAmount;
                    for (x = 0; x < (36 / 2); x += 1) {
                        winningNumbers[x] = getNumberString(((x + 1) * 2 - 1)
                            .toString(), redNumbers_1, blackNumbers_1);
                    }
                    return [3 /*break*/, 77];
                case 73:
                    payoutAmount = betAmount;
                    for (x = 0; x < (36 / 2); x += 1) {
                        winningNumbers[x] = getNumberString(((x + 1) * 2).toString(), redNumbers_1, blackNumbers_1);
                    }
                    return [3 /*break*/, 77];
                case 74:
                    payoutAmount = betAmount;
                    for (x = 0; x < 18; x += 1) {
                        winningNumbers[x] = getNumberString((x + 1).toString(), redNumbers_1, blackNumbers_1);
                    }
                    return [3 /*break*/, 77];
                case 75:
                    payoutAmount = betAmount;
                    for (x = 0; x < 18; x += 1) {
                        winningNumbers[x] = getNumberString((x + 19).toString(), redNumbers_1, blackNumbers_1);
                    }
                    return [3 /*break*/, 77];
                case 76: return [3 /*break*/, 77];
                case 77:
                    newRouletteBet = { betAmount: betAmount, payoutAmount: payoutAmount, betOptions: betOptions, betType: betType, userID: commandData.guildMember.id, winningNumbers: winningNumbers };
                    guildData_1.rouletteGame.bets.push(newRouletteBet);
                    return [4 /*yield*/, guildData_1.writeToDataBase()];
                case 78:
                    _f.sent();
                    msgEmbed = new Discord.MessageEmbed();
                    msgEmbed
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription("------\n__**Bet Type:**__ " + betType + "\n__**Your winning numbers are:\n" + winningNumbers + "**__\n__**Your winning payout would be:**__\n" + payoutAmount + " " + discordUser.userData.currencyName + "\n------")
                        .setTimestamp(Date())
                        .setTitle('__**Roulette Bet Placed:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 79:
                    _f.sent();
                    return [3 /*break*/, 84];
                case 80:
                    if (!(whatAreWeDoing === 'start')) return [3 /*break*/, 84];
                    return [4 /*yield*/, guildData_1.getFromDataBase()];
                case 81:
                    _f.sent();
                    guildData_1.rouletteGame.currentlySpinning = true;
                    return [4 /*yield*/, guildData_1.writeToDataBase()];
                case 82:
                    _f.sent();
                    msgEmbed = new Discord.MessageEmbed();
                    msgEmbed
                        .setAuthor(commandData.guild.client.user.username, commandData.guild.client.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription('------\n__**30 seconds remaining to place your roulette bets!**__\n------')
                        .setTimestamp(Date())
                        .setTitle('__**Roulette Ball Rolling:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 83:
                    newMessage_1 = _f.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        newMessage_1 = new Discord.Message(commandData.guild.client, newMessage_1, commandData.fromTextChannel);
                    }
                    setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                        var msgEmbed;
                        var _this = this;
                        var _a, _b, _c, _d;
                        return __generator(this, function (_e) {
                            switch (_e.label) {
                                case 0:
                                    msgEmbed = new Discord.MessageEmbed();
                                    msgEmbed
                                        .setAuthor((_b = (_a = commandData.guild) === null || _a === void 0 ? void 0 : _a.client.user) === null || _b === void 0 ? void 0 : _b.username, (_d = (_c = commandData.guild) === null || _c === void 0 ? void 0 : _c.client.user) === null || _d === void 0 ? void 0 : _d.avatarURL())
                                        .setColor([0, 0, 255])
                                        .setDescription("------\n__**20 seconds remaining to place your roulette bets!**__\n------")
                                        .setTimestamp(Date())
                                        .setTitle('__**Roulette Ball Rolling:**__');
                                    return [4 /*yield*/, newMessage_1.edit(msgEmbed)];
                                case 1:
                                    _e.sent();
                                    setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    msgEmbed.setDescription("------\n__**10 seconds remaining to place your roulette bets!**__\n------");
                                                    return [4 /*yield*/, newMessage_1.edit(msgEmbed)];
                                                case 1:
                                                    _a.sent();
                                                    return [4 /*yield*/, newMessage_1.delete({ timeout: 10000 })];
                                                case 2:
                                                    _a.sent();
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); }, 10000);
                                    return [2 /*return*/];
                            }
                        });
                    }); }, 10000);
                    setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                        var finalRoll;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, guildData_1.getFromDataBase()];
                                case 1:
                                    _a.sent();
                                    finalRoll = Math.trunc(Math.random() * 38).toString();
                                    return [4 /*yield*/, calculateResults(guildData_1, finalRoll, commandData, discordUser, redNumbers_1, blackNumbers_1)];
                                case 2:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); }, 30000);
                    _f.label = 84;
                case 84: return [2 /*return*/, commandReturnData];
                case 85:
                    error_1 = _f.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            reject(error_1);
                        })];
                case 86: return [2 /*return*/];
            }
        });
    });
}
command.function = execute;
exports.default = command;
