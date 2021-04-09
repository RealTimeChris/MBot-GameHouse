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
var events_1 = __importDefault(require("events"));
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
    return __awaiter(this, void 0, void 0, function () {
        var returnString, x, x;
        return __generator(this, function (_a) {
            returnString = '';
            for (x = 0; x < redNumbers.length; x += 1) {
                if (redNumbers[x].includes(inputString)) {
                    if (redNumbers[x].substring(12) === inputString) {
                        returnString = redNumbers[x];
                    }
                }
            }
            for (x = 0; x < blackNumbers.length; x += 1) {
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
            return [2 /*return*/, returnString];
        });
    });
}
function calculateResults(finalRoll, commandData, discordUser, redNumbers, blackNumbers) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
    return __awaiter(this, void 0, void 0, function () {
        var msgStringFinal, finalRollString, guildData, currentGuild, x, isItAWinner, currentGuildMember, guildMemberData, betAmount, payoutAmount, winningNumbers, x_1, msgEmbed;
        return __generator(this, function (_q) {
            switch (_q.label) {
                case 0:
                    msgStringFinal = '';
                    return [4 /*yield*/, getNumberString(finalRoll.toString(), redNumbers, blackNumbers)];
                case 1:
                    finalRollString = _q.sent();
                    msgStringFinal += "------\n__**Final Roll:**__ " + finalRollString + "\n------\n";
                    guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, name: commandData.guild.name, id: commandData.guild.id, memberCount: commandData.guild.memberCount });
                    return [4 /*yield*/, guildData.getFromDataBase()];
                case 2:
                    _q.sent();
                    return [4 /*yield*/, ((_a = commandData.guild) === null || _a === void 0 ? void 0 : _a.client.guilds.fetch(commandData.guild.id))];
                case 3:
                    currentGuild = _q.sent();
                    x = 0;
                    _q.label = 4;
                case 4:
                    if (!(x < guildData.rouletteGame.bets.length)) return [3 /*break*/, 14];
                    isItAWinner = false;
                    return [4 /*yield*/, (currentGuild === null || currentGuild === void 0 ? void 0 : currentGuild.members.fetch(guildData.rouletteGame.bets[x].userID))];
                case 5:
                    currentGuildMember = _q.sent();
                    guildMemberData = new GuildMemberData_1.default({ dataBase: discordUser.dataBase, displayName: currentGuildMember.displayName, guildId: commandData.guild.id,
                        id: guildData.rouletteGame.bets[x].userID, userName: currentGuildMember === null || currentGuildMember === void 0 ? void 0 : currentGuildMember.user.username });
                    return [4 /*yield*/, guildMemberData.getFromDataBase()];
                case 6:
                    _q.sent();
                    msgStringFinal += "__**<@!" + (guildMemberData.id) + ">**__: ";
                    betAmount = guildData.rouletteGame.bets[x].betAmount;
                    payoutAmount = guildData.rouletteGame.bets[x].payoutAmount;
                    winningNumbers = guildData.rouletteGame.bets[x].winningNumbers;
                    x_1 = 0;
                    _q.label = 7;
                case 7:
                    if (!(x_1 < winningNumbers.length)) return [3 /*break*/, 10];
                    if (finalRoll === (37).toString()) {
                        finalRoll = '00';
                    }
                    return [4 /*yield*/, getNumberString(finalRoll.toString(), redNumbers, blackNumbers)];
                case 8:
                    if ((_q.sent()) === ((_b = winningNumbers[x_1]) === null || _b === void 0 ? void 0 : _b.toString())) {
                        isItAWinner = true;
                        return [3 /*break*/, 10];
                    }
                    _q.label = 9;
                case 9:
                    x_1 += 1;
                    return [3 /*break*/, 7];
                case 10:
                    if (isItAWinner === false) {
                        payoutAmount = -betAmount;
                    }
                    if (!(betAmount > guildMemberData.currency.wallet)) return [3 /*break*/, 11];
                    if (((_c = guildData.rouletteGame.bets[x]) === null || _c === void 0 ? void 0 : _c.betOptions) !== undefined) {
                        msgStringFinal += "__**NSF:**__ Non-sufficient funds!  __**Bet:**__ " + ((_d = guildData.rouletteGame.bets[x]) === null || _d === void 0 ? void 0 : _d.betAmount) + " " + discordUser.userData.currencyName + " __**On:**__ " +
                            (((_e = guildData.rouletteGame.bets[x]) === null || _e === void 0 ? void 0 : _e.betType) + ", " + ((_f = guildData.rouletteGame.bets[x]) === null || _f === void 0 ? void 0 : _f.betOptions) + "\n");
                    }
                    else {
                        msgStringFinal += "__**NSF:**__ Non-sufficient funds! __**Bet:**__ " + ((_g = guildData.rouletteGame.bets[x]) === null || _g === void 0 ? void 0 : _g.betAmount) + " " + discordUser.userData.currencyName + " __**On:**__ " +
                            (((_h = guildData.rouletteGame.bets[x]) === null || _h === void 0 ? void 0 : _h.betType) + "\n");
                    }
                    return [3 /*break*/, 13];
                case 11:
                    if (payoutAmount > guildData.casinoStats.largestRoulettePayout.amount) {
                        guildData.casinoStats.largestRoulettePayout.amount = payoutAmount;
                        guildData.casinoStats.largestRoulettePayout.date = Date();
                        guildData.casinoStats.largestRoulettePayout.userID = guildMemberData.id;
                        guildData.casinoStats.largestRoulettePayout.username = guildMemberData.userName;
                    }
                    guildData.casinoStats.totalRoulettePayout += payoutAmount;
                    guildData.casinoStats.totalPayout += payoutAmount;
                    guildMemberData.currency.wallet += payoutAmount;
                    return [4 /*yield*/, guildMemberData.writeToDataBase()];
                case 12:
                    _q.sent();
                    if (((_j = guildData.rouletteGame.bets[x]) === null || _j === void 0 ? void 0 : _j.betOptions) !== undefined) {
                        msgStringFinal += payoutAmount.toString() + " " + discordUser.userData.currencyName + " __**Bet:**__ " + ((_k = guildData.rouletteGame.bets[x]) === null || _k === void 0 ? void 0 : _k.betAmount) + " " + discordUser.userData.currencyName + " __**On:**__ " +
                            (((_l = guildData.rouletteGame.bets[x]) === null || _l === void 0 ? void 0 : _l.betType) + ", " + ((_m = guildData.rouletteGame.bets[x]) === null || _m === void 0 ? void 0 : _m.betOptions) + "\n");
                    }
                    else {
                        msgStringFinal += payoutAmount.toString() + " " + discordUser.userData.currencyName + " __**Bet:**__ " + ((_o = guildData.rouletteGame.bets[x]) === null || _o === void 0 ? void 0 : _o.betAmount) + " " + discordUser.userData.currencyName + " __**On:**__ " +
                            (((_p = guildData.rouletteGame.bets[x]) === null || _p === void 0 ? void 0 : _p.betType) + "\n");
                    }
                    _q.label = 13;
                case 13:
                    x += 1;
                    return [3 /*break*/, 4];
                case 14:
                    msgStringFinal += '------';
                    msgEmbed = new Discord.MessageEmbed();
                    msgEmbed
                        .setAuthor(commandData.guild.client.user.username, commandData.guild.client.user.avatarURL())
                        .setDescription(msgStringFinal)
                        .setTitle('__**Roulette Results:**__')
                        .setTimestamp(Date())
                        .setColor([0, 0, 255]);
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 15:
                    _q.sent();
                    guildData.rouletteGame.currentlySpinning = false;
                    guildData.rouletteGame.bets = [];
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 16:
                    _q.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function execute(commandData, discordUser) {
    var _a, _b, _c, _d;
    return __awaiter(this, void 0, void 0, function () {
        var commandReturnData, areWeInADM, areWeAllowed, guildData, whatAreWeDoing, betAmount, betType, betOptions, msgString, msgEmbed, msg, msgString, msgEmbed, msg, msgString, msgEmbed, msg, msgString, msgEmbed, msg, msgString, msgEmbed, msg, digitRegExp, betTypes, redNumbers_1, blackNumbers_1, guildMemberData, currentBetAmount, x, number, msgString, msgEmbed_1, msg, isValidType, x, msgString, msgEmbed_2, msg, payoutAmount, winningNumbers, _e, msgString, msgEmbed_3, msg, msgString, msgEmbed_4, msg, _f, _g, msgString, msgEmbed_5, msg, msgString, msgEmbed_6, msg, _h, _j, _k, _l, msgString, msgEmbed_7, msg, msgString, msgEmbed_8, msg, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, msgString, msgEmbed_9, msg, msgString, msgEmbed_10, msg, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, x, _16, _17, x, _18, _19, x, _20, _21, x, _22, _23, x, _24, _25, x, _26, _27, x, _28, _29, newRouletteBet, msgEmbed, eventEmitter_1, currentIndex_1, newMessage_1, x, error_1;
        var _this = this;
        return __generator(this, function (_30) {
            switch (_30.label) {
                case 0:
                    _30.trys.push([0, 164, , 165]);
                    commandReturnData = {
                        commandName: command.name
                    };
                    return [4 /*yield*/, HelperFunctions_1.default.areWeInADM(commandData)];
                case 1:
                    areWeInADM = _30.sent();
                    if (areWeInADM === true) {
                        return [2 /*return*/, commandReturnData];
                    }
                    return [4 /*yield*/, HelperFunctions_1.default.checkIfAllowedInChannel(commandData, discordUser)];
                case 2:
                    areWeAllowed = _30.sent();
                    if (areWeAllowed === false) {
                        return [2 /*return*/, commandReturnData];
                    }
                    guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: commandData.guild.id, memberCount: commandData.guild.memberCount, name: commandData.guild.name });
                    return [4 /*yield*/, guildData.getFromDataBase()];
                case 3:
                    _30.sent();
                    whatAreWeDoing = void 0;
                    betAmount = void 0;
                    betType = void 0;
                    betOptions = void 0;
                    if (!(commandData.args[0] === undefined)) return [3 /*break*/, 6];
                    msgString = "------\n**Please, enter either 'start' or 'bet  as the first argument! (!roulette = bet, BETAMOUNT, BETTYPE, BETOPTIONS)**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 4:
                    msg = _30.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 5:
                    _30.sent();
                    return [2 /*return*/, commandReturnData];
                case 6:
                    if (!(commandData.args[0].toLowerCase() !== 'start' && (commandData.args[0]).toLowerCase() !== 'bet')) return [3 /*break*/, 9];
                    msgString = "------\n**Please, enter either a 'start' or 'bet' as the first arguments! (!roulette = bet, BETAMOUNT, BETTYPE, BETOPTIONS)**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 7:
                    msg = _30.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 8:
                    _30.sent();
                    return [2 /*return*/, commandReturnData];
                case 9:
                    if (!(commandData.args[0].toLowerCase() === 'start')) return [3 /*break*/, 14];
                    return [4 /*yield*/, guildData.getFromDataBase()];
                case 10:
                    _30.sent();
                    if (!(guildData.rouletteGame.currentlySpinning === true)) return [3 /*break*/, 13];
                    msgString = "------\n**Please, wait until the current game is over, before starting another one!**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Game Issue:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 11:
                    msg = _30.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 12:
                    _30.sent();
                    return [2 /*return*/, commandReturnData];
                case 13:
                    whatAreWeDoing = 'start';
                    return [3 /*break*/, 19];
                case 14:
                    if (!(commandData.args[0].toLowerCase() === 'bet')) return [3 /*break*/, 19];
                    return [4 /*yield*/, guildData.getFromDataBase()];
                case 15:
                    _30.sent();
                    if (!(guildData.rouletteGame.currentlySpinning === false)) return [3 /*break*/, 18];
                    msgString = "------\n**Please, start a roulette game before placing any bets!**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Game Issue:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 16:
                    msg = _30.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 17:
                    _30.sent();
                    return [2 /*return*/, commandReturnData];
                case 18:
                    whatAreWeDoing = 'bet';
                    _30.label = 19;
                case 19:
                    if (!(parseInt((_a = commandData.args[1]) === null || _a === void 0 ? void 0 : _a.toString(), 10) <= 0)) return [3 /*break*/, 22];
                    msgString = "------\n**Please, enter a valid betting amount! (!roulette = bet, BETAMOUNT, BETTYPE, BETOPTIONS)**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 20:
                    msg = _30.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 21:
                    _30.sent();
                    return [2 /*return*/, commandReturnData];
                case 22:
                    betAmount = parseInt((_b = commandData.args[1]) === null || _b === void 0 ? void 0 : _b.toString(), 10);
                    _30.label = 23;
                case 23:
                    digitRegExp = /\d{1,18}/;
                    betTypes = ['0', '00', 'straight', 'row', 'split', 'street', 'basket', 'sixline', '1stcolumn', '2ndcolumn', '3rdcolumn', '1stdozen', '2nddozen', '3rddozen', 'odd', 'even', 'red', 'black', '1to18', '19to36'];
                    redNumbers_1 = [];
                    redNumbers_1 = [':red_square:32', ':red_square:19', ':red_square:21', ':red_square:25', ':red_square:34', ':red_square:27', ':red_square:36', ':red_square:30', ':red_square:23', ':red_square:5',
                        ':red_square:16', ':red_square:1', ':red_square:14', ':red_square:9', ':red_square:18', ':red_square:7', ':red_square:12', ':red_square:3'];
                    blackNumbers_1 = [];
                    blackNumbers_1 = [':black_large_square:15', ':black_large_square:4', ':black_large_square:2', ':black_large_square:17', ':black_large_square:6', ':black_large_square:13', ':black_large_square:11', ':black_large_square:8', ':black_large_square:10',
                        ':black_large_square:24', ':black_large_square:33', ':black_large_square:20', ':black_large_square:31', ':black_large_square:22', ':black_large_square:29', ':black_large_square:28', ':black_large_square:35', ':black_large_square:26'];
                    if (!(whatAreWeDoing === 'bet')) return [3 /*break*/, 160];
                    guildMemberData = new GuildMemberData_1.default({ dataBase: discordUser.dataBase, id: commandData.guildMember.id, guildId: commandData.guild.id,
                        userName: commandData.guildMember.user.username, displayName: commandData.guildMember.displayName });
                    return [4 /*yield*/, guildMemberData.getFromDataBase()];
                case 24:
                    _30.sent();
                    currentBetAmount = 0;
                    for (x = 0; x < guildData.rouletteGame.bets.length; x += 1) {
                        if (guildMemberData.id === ((_c = guildData.rouletteGame.bets[x]) === null || _c === void 0 ? void 0 : _c.userID)) {
                            number = (_d = guildData.rouletteGame.bets[x]) === null || _d === void 0 ? void 0 : _d.betAmount;
                            currentBetAmount += number;
                        }
                    }
                    if (!((currentBetAmount + betAmount) > guildMemberData.currency.wallet)) return [3 /*break*/, 27];
                    msgString = "------\n**Sorry, but you have insufficient funds in your wallet for placing that bet!**\n------";
                    msgEmbed_1 = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Insufficient Funds:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed_1)];
                case 25:
                    msg = _30.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 26:
                    _30.sent();
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
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed_2)];
                case 28:
                    msg = _30.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 29:
                    _30.sent();
                    return [2 /*return*/, commandReturnData];
                case 30:
                    betType = commandData.args[2];
                    _30.label = 31;
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
                        case 'row': return [3 /*break*/, 44];
                        case 'split': return [3 /*break*/, 45];
                        case 'street': return [3 /*break*/, 54];
                        case 'basket': return [3 /*break*/, 64];
                        case 'sixline': return [3 /*break*/, 69];
                        case '1stcolumn': return [3 /*break*/, 82];
                        case '2ndcolumn': return [3 /*break*/, 95];
                        case '3rdcolumn': return [3 /*break*/, 108];
                        case '1stdozen': return [3 /*break*/, 121];
                        case '2nddozen': return [3 /*break*/, 126];
                        case '3rddozen': return [3 /*break*/, 131];
                        case 'odd': return [3 /*break*/, 136];
                        case 'even': return [3 /*break*/, 141];
                        case '1to18': return [3 /*break*/, 146];
                        case '19to36': return [3 /*break*/, 151];
                    }
                    return [3 /*break*/, 156];
                case 32:
                    winningNumbers[0] = ':green_square:0';
                    payoutAmount = betAmount * 35;
                    return [3 /*break*/, 157];
                case 33:
                    winningNumbers[0] = ':green_square:00';
                    payoutAmount = betAmount * 35;
                    return [3 /*break*/, 157];
                case 34:
                    payoutAmount = betAmount;
                    winningNumbers = redNumbers_1;
                    return [3 /*break*/, 157];
                case 35:
                    payoutAmount = betAmount;
                    winningNumbers = blackNumbers_1;
                    return [3 /*break*/, 157];
                case 36:
                    payoutAmount = betAmount * 35;
                    if (!(commandData.args[3] === undefined || !digitRegExp.test(commandData.args[3]) || !digitRegExp.test(commandData.args[3]))) return [3 /*break*/, 39];
                    msgString = "------\n**Please enter a valid value from the roulette wheel! (1-36)**\n------";
                    msgEmbed_3 = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed_3)];
                case 37:
                    msg = _30.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 38:
                    _30.sent();
                    return [2 /*return*/, commandReturnData];
                case 39:
                    if (!(parseInt(commandData.args[3].toString().match(digitRegExp)[0], 10) < 1
                        || parseInt(commandData.args[3].toString().match(digitRegExp)[0], 10) > 36)) return [3 /*break*/, 42];
                    msgString = "------\n**Please enter a value between 1 and 36!**\n------";
                    msgEmbed_4 = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed_4)];
                case 40:
                    msg = _30.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 41:
                    _30.sent();
                    return [2 /*return*/, commandReturnData];
                case 42:
                    _f = winningNumbers;
                    _g = 0;
                    return [4 /*yield*/, getNumberString(commandData.args[3], redNumbers_1, blackNumbers_1)];
                case 43:
                    _f[_g] = _30.sent();
                    return [3 /*break*/, 157];
                case 44:
                    payoutAmount = betAmount * 17;
                    winningNumbers[0] = ':green_square:0';
                    winningNumbers[1] = ':green_square:00';
                    return [3 /*break*/, 157];
                case 45:
                    payoutAmount = betAmount * 17;
                    if (!(commandData.args[3] === undefined || !digitRegExp.test(commandData.args[3]) || !digitRegExp.test(commandData.args[3]))) return [3 /*break*/, 48];
                    msgString = "------\n**Please enter a valid starting value for your split! (1-35)**\n------";
                    msgEmbed_5 = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed_5)];
                case 46:
                    msg = _30.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 47:
                    _30.sent();
                    return [2 /*return*/, commandReturnData];
                case 48:
                    if (!(parseInt(commandData.args[3].toString().match(digitRegExp)[0], 10) < 1
                        || parseInt(commandData.args[3].toString().match(digitRegExp)[0], 10) > 35)) return [3 /*break*/, 51];
                    msgString = "-------\n**Please enter a value between 1 and 35!**\n------";
                    msgEmbed_6 = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed_6)];
                case 49:
                    msg = _30.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 50:
                    _30.sent();
                    return [2 /*return*/, commandReturnData];
                case 51:
                    _h = winningNumbers;
                    _j = 0;
                    return [4 /*yield*/, getNumberString(commandData.args[3], redNumbers_1, blackNumbers_1)];
                case 52:
                    _h[_j] = _30.sent();
                    _k = winningNumbers;
                    _l = 1;
                    return [4 /*yield*/, getNumberString((parseInt(commandData.args[3], 10) + 1)
                            .toString(), redNumbers_1, blackNumbers_1)];
                case 53:
                    _k[_l] = _30.sent();
                    return [3 /*break*/, 157];
                case 54:
                    payoutAmount = betAmount * 11;
                    if (!(commandData.args[3] === undefined || !digitRegExp.test(commandData.args[3]) || !digitRegExp.test(commandData.args[3]))) return [3 /*break*/, 57];
                    msgString = "------\n**Please enter a valid starting value for your street! (1-34)**\n------";
                    msgEmbed_7 = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed_7)];
                case 55:
                    msg = _30.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 56:
                    _30.sent();
                    return [2 /*return*/, commandReturnData];
                case 57:
                    if (!(parseInt(commandData.args[3].toString().match(digitRegExp)[0], 10) < 1
                        || parseInt(commandData.args[3].toString().match(digitRegExp)[0], 10) > 34)) return [3 /*break*/, 60];
                    msgString = "-------\n**Please enter a value between 1 and 34!**\n------";
                    msgEmbed_8 = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed_8)];
                case 58:
                    msg = _30.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 59:
                    _30.sent();
                    return [2 /*return*/, commandReturnData];
                case 60:
                    _m = winningNumbers;
                    _o = 0;
                    return [4 /*yield*/, getNumberString(commandData.args[3], redNumbers_1, blackNumbers_1)];
                case 61:
                    _m[_o] = _30.sent();
                    _p = winningNumbers;
                    _q = 1;
                    return [4 /*yield*/, getNumberString((parseInt(commandData.args[3], 10) + 1)
                            .toString(), redNumbers_1, blackNumbers_1)];
                case 62:
                    _p[_q] = _30.sent();
                    _r = winningNumbers;
                    _s = 2;
                    return [4 /*yield*/, getNumberString((parseInt(commandData.args[3], 10) + 2)
                            .toString(), redNumbers_1, blackNumbers_1)];
                case 63:
                    _r[_s] = _30.sent();
                    return [3 /*break*/, 157];
                case 64:
                    payoutAmount = betAmount * 6;
                    _t = winningNumbers;
                    _u = 0;
                    return [4 /*yield*/, getNumberString('0', redNumbers_1, blackNumbers_1)];
                case 65:
                    _t[_u] = _30.sent();
                    _v = winningNumbers;
                    _w = 1;
                    return [4 /*yield*/, getNumberString('1', redNumbers_1, blackNumbers_1)];
                case 66:
                    _v[_w] = _30.sent();
                    _x = winningNumbers;
                    _y = 2;
                    return [4 /*yield*/, getNumberString('2', redNumbers_1, blackNumbers_1)];
                case 67:
                    _x[_y] = _30.sent();
                    _z = winningNumbers;
                    _0 = 3;
                    return [4 /*yield*/, getNumberString('3', redNumbers_1, blackNumbers_1)];
                case 68:
                    _z[_0] = _30.sent();
                    winningNumbers[4] = ':green_square:00';
                    return [3 /*break*/, 157];
                case 69:
                    payoutAmount = betAmount * 5;
                    if (!(commandData.args[3] === undefined || !digitRegExp.test(commandData.args[3]) || !digitRegExp.test(commandData.args[3]))) return [3 /*break*/, 72];
                    msgString = "------\n**Please enter a valid starting value for your sixline!**\n------";
                    msgEmbed_9 = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed_9)];
                case 70:
                    msg = _30.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 71:
                    _30.sent();
                    return [2 /*return*/, commandReturnData];
                case 72:
                    if (!(parseInt(commandData.args[3].toString().match(digitRegExp)[0], 10) < 1
                        || parseInt(commandData.args[3].toString().match(digitRegExp)[0], 10) > 31)) return [3 /*break*/, 75];
                    msgString = "------\n**Please enter a value between 1 and 31!**\n------";
                    msgEmbed_10 = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed_10)];
                case 73:
                    msg = _30.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 74:
                    _30.sent();
                    return [2 /*return*/, commandReturnData];
                case 75:
                    _1 = winningNumbers;
                    _2 = 0;
                    return [4 /*yield*/, getNumberString(commandData.args[3], redNumbers_1, blackNumbers_1)];
                case 76:
                    _1[_2] = _30.sent();
                    _3 = winningNumbers;
                    _4 = 1;
                    return [4 /*yield*/, getNumberString((parseInt(commandData.args[3], 10) + 1)
                            .toString(), redNumbers_1, blackNumbers_1)];
                case 77:
                    _3[_4] = _30.sent();
                    _5 = winningNumbers;
                    _6 = 2;
                    return [4 /*yield*/, getNumberString((parseInt(commandData.args[3], 10) + 2)
                            .toString(), redNumbers_1, blackNumbers_1)];
                case 78:
                    _5[_6] = _30.sent();
                    _7 = winningNumbers;
                    _8 = 3;
                    return [4 /*yield*/, getNumberString((parseInt(commandData.args[3], 10) + 3)
                            .toString(), redNumbers_1, blackNumbers_1)];
                case 79:
                    _7[_8] = _30.sent();
                    _9 = winningNumbers;
                    _10 = 4;
                    return [4 /*yield*/, getNumberString((parseInt(commandData.args[3], 10) + 4)
                            .toString(), redNumbers_1, blackNumbers_1)];
                case 80:
                    _9[_10] = _30.sent();
                    _11 = winningNumbers;
                    _12 = 5;
                    return [4 /*yield*/, getNumberString((parseInt(commandData.args[3], 10) + 5)
                            .toString(), redNumbers_1, blackNumbers_1)];
                case 81:
                    _11[_12] = _30.sent();
                    return [3 /*break*/, 157];
                case 82:
                    payoutAmount = betAmount * 2;
                    return [4 /*yield*/, getNumberString('1', redNumbers_1, blackNumbers_1)];
                case 83:
                    _13 = [_30.sent()];
                    return [4 /*yield*/, getNumberString('4', redNumbers_1, blackNumbers_1)];
                case 84:
                    _13 = _13.concat([_30.sent()]);
                    return [4 /*yield*/, getNumberString('7', redNumbers_1, blackNumbers_1)];
                case 85:
                    _13 = _13.concat([_30.sent()]);
                    return [4 /*yield*/, getNumberString('10', redNumbers_1, blackNumbers_1)];
                case 86:
                    _13 = _13.concat([_30.sent()]);
                    return [4 /*yield*/, getNumberString('13', redNumbers_1, blackNumbers_1)];
                case 87:
                    _13 = _13.concat([_30.sent()]);
                    return [4 /*yield*/, getNumberString('16', redNumbers_1, blackNumbers_1)];
                case 88:
                    _13 = _13.concat([_30.sent()]);
                    return [4 /*yield*/, getNumberString('19', redNumbers_1, blackNumbers_1)];
                case 89:
                    _13 = _13.concat([_30.sent()]);
                    return [4 /*yield*/, getNumberString('22', redNumbers_1, blackNumbers_1)];
                case 90:
                    _13 = _13.concat([_30.sent()]);
                    return [4 /*yield*/, getNumberString('25', redNumbers_1, blackNumbers_1)];
                case 91:
                    _13 = _13.concat([_30.sent()]);
                    return [4 /*yield*/, getNumberString('28', redNumbers_1, blackNumbers_1)];
                case 92:
                    _13 = _13.concat([_30.sent()]);
                    return [4 /*yield*/, getNumberString('31', redNumbers_1, blackNumbers_1)];
                case 93:
                    _13 = _13.concat([_30.sent()]);
                    return [4 /*yield*/, getNumberString('34', redNumbers_1, blackNumbers_1)];
                case 94:
                    winningNumbers = _13.concat([_30.sent()]);
                    return [3 /*break*/, 157];
                case 95:
                    payoutAmount = betAmount * 2;
                    return [4 /*yield*/, getNumberString('2', redNumbers_1, blackNumbers_1)];
                case 96:
                    _14 = [_30.sent()];
                    return [4 /*yield*/, getNumberString('5', redNumbers_1, blackNumbers_1)];
                case 97:
                    _14 = _14.concat([_30.sent()]);
                    return [4 /*yield*/, getNumberString('8', redNumbers_1, blackNumbers_1)];
                case 98:
                    _14 = _14.concat([_30.sent()]);
                    return [4 /*yield*/, getNumberString('11', redNumbers_1, blackNumbers_1)];
                case 99:
                    _14 = _14.concat([_30.sent()]);
                    return [4 /*yield*/, getNumberString('14', redNumbers_1, blackNumbers_1)];
                case 100:
                    _14 = _14.concat([_30.sent()]);
                    return [4 /*yield*/, getNumberString('17', redNumbers_1, blackNumbers_1)];
                case 101:
                    _14 = _14.concat([_30.sent()]);
                    return [4 /*yield*/, getNumberString('20', redNumbers_1, blackNumbers_1)];
                case 102:
                    _14 = _14.concat([_30.sent()]);
                    return [4 /*yield*/, getNumberString('23', redNumbers_1, blackNumbers_1)];
                case 103:
                    _14 = _14.concat([_30.sent()]);
                    return [4 /*yield*/, getNumberString('26', redNumbers_1, blackNumbers_1)];
                case 104:
                    _14 = _14.concat([_30.sent()]);
                    return [4 /*yield*/, getNumberString('29', redNumbers_1, blackNumbers_1)];
                case 105:
                    _14 = _14.concat([_30.sent()]);
                    return [4 /*yield*/, getNumberString('32', redNumbers_1, blackNumbers_1)];
                case 106:
                    _14 = _14.concat([_30.sent()]);
                    return [4 /*yield*/, getNumberString('35', redNumbers_1, blackNumbers_1)];
                case 107:
                    winningNumbers = _14.concat([_30.sent()]);
                    return [3 /*break*/, 157];
                case 108:
                    payoutAmount = betAmount * 2;
                    return [4 /*yield*/, getNumberString('3', redNumbers_1, blackNumbers_1)];
                case 109:
                    _15 = [_30.sent()];
                    return [4 /*yield*/, getNumberString('6', redNumbers_1, blackNumbers_1)];
                case 110:
                    _15 = _15.concat([_30.sent()]);
                    return [4 /*yield*/, getNumberString('9', redNumbers_1, blackNumbers_1)];
                case 111:
                    _15 = _15.concat([_30.sent()]);
                    return [4 /*yield*/, getNumberString('12', redNumbers_1, blackNumbers_1)];
                case 112:
                    _15 = _15.concat([_30.sent()]);
                    return [4 /*yield*/, getNumberString('15', redNumbers_1, blackNumbers_1)];
                case 113:
                    _15 = _15.concat([_30.sent()]);
                    return [4 /*yield*/, getNumberString('18', redNumbers_1, blackNumbers_1)];
                case 114:
                    _15 = _15.concat([_30.sent()]);
                    return [4 /*yield*/, getNumberString('21', redNumbers_1, blackNumbers_1)];
                case 115:
                    _15 = _15.concat([_30.sent()]);
                    return [4 /*yield*/, getNumberString('24', redNumbers_1, blackNumbers_1)];
                case 116:
                    _15 = _15.concat([_30.sent()]);
                    return [4 /*yield*/, getNumberString('27', redNumbers_1, blackNumbers_1)];
                case 117:
                    _15 = _15.concat([_30.sent()]);
                    return [4 /*yield*/, getNumberString('30', redNumbers_1, blackNumbers_1)];
                case 118:
                    _15 = _15.concat([_30.sent()]);
                    return [4 /*yield*/, getNumberString('33', redNumbers_1, blackNumbers_1)];
                case 119:
                    _15 = _15.concat([_30.sent()]);
                    return [4 /*yield*/, getNumberString('36', redNumbers_1, blackNumbers_1)];
                case 120:
                    winningNumbers = _15.concat([_30.sent()]);
                    return [3 /*break*/, 157];
                case 121:
                    payoutAmount = betAmount * 2;
                    x = 1;
                    _30.label = 122;
                case 122:
                    if (!(x <= 12)) return [3 /*break*/, 125];
                    _16 = winningNumbers;
                    _17 = x - 1;
                    return [4 /*yield*/, getNumberString(x.toString(), redNumbers_1, blackNumbers_1)];
                case 123:
                    _16[_17] = _30.sent();
                    _30.label = 124;
                case 124:
                    x += 1;
                    return [3 /*break*/, 122];
                case 125: return [3 /*break*/, 157];
                case 126:
                    payoutAmount = betAmount * 2;
                    x = 13;
                    _30.label = 127;
                case 127:
                    if (!(x <= 24)) return [3 /*break*/, 130];
                    _18 = winningNumbers;
                    _19 = x - 13;
                    return [4 /*yield*/, getNumberString(x.toString(), redNumbers_1, blackNumbers_1)];
                case 128:
                    _18[_19] = _30.sent();
                    _30.label = 129;
                case 129:
                    x += 1;
                    return [3 /*break*/, 127];
                case 130: return [3 /*break*/, 157];
                case 131:
                    payoutAmount = betAmount * 2;
                    x = 25;
                    _30.label = 132;
                case 132:
                    if (!(x <= 36)) return [3 /*break*/, 135];
                    _20 = winningNumbers;
                    _21 = x - 25;
                    return [4 /*yield*/, getNumberString(x.toString(), redNumbers_1, blackNumbers_1)];
                case 133:
                    _20[_21] = _30.sent();
                    _30.label = 134;
                case 134:
                    x += 1;
                    return [3 /*break*/, 132];
                case 135: return [3 /*break*/, 157];
                case 136:
                    payoutAmount = betAmount;
                    x = 0;
                    _30.label = 137;
                case 137:
                    if (!(x < (36 / 2))) return [3 /*break*/, 140];
                    _22 = winningNumbers;
                    _23 = x;
                    return [4 /*yield*/, getNumberString(((x + 1) * 2 - 1)
                            .toString(), redNumbers_1, blackNumbers_1)];
                case 138:
                    _22[_23] = _30.sent();
                    _30.label = 139;
                case 139:
                    x += 1;
                    return [3 /*break*/, 137];
                case 140: return [3 /*break*/, 157];
                case 141:
                    payoutAmount = betAmount;
                    x = 0;
                    _30.label = 142;
                case 142:
                    if (!(x < (36 / 2))) return [3 /*break*/, 145];
                    _24 = winningNumbers;
                    _25 = x;
                    return [4 /*yield*/, getNumberString(((x + 1) * 2).toString(), redNumbers_1, blackNumbers_1)];
                case 143:
                    _24[_25] = _30.sent();
                    _30.label = 144;
                case 144:
                    x += 1;
                    return [3 /*break*/, 142];
                case 145: return [3 /*break*/, 157];
                case 146:
                    payoutAmount = betAmount;
                    x = 0;
                    _30.label = 147;
                case 147:
                    if (!(x < 18)) return [3 /*break*/, 150];
                    _26 = winningNumbers;
                    _27 = x;
                    return [4 /*yield*/, getNumberString((x + 1).toString(), redNumbers_1, blackNumbers_1)];
                case 148:
                    _26[_27] = _30.sent();
                    _30.label = 149;
                case 149:
                    x += 1;
                    return [3 /*break*/, 147];
                case 150: return [3 /*break*/, 157];
                case 151:
                    payoutAmount = betAmount;
                    x = 0;
                    _30.label = 152;
                case 152:
                    if (!(x < 18)) return [3 /*break*/, 155];
                    _28 = winningNumbers;
                    _29 = x;
                    return [4 /*yield*/, getNumberString((x + 19).toString(), redNumbers_1, blackNumbers_1)];
                case 153:
                    _28[_29] = _30.sent();
                    _30.label = 154;
                case 154:
                    x += 1;
                    return [3 /*break*/, 152];
                case 155: return [3 /*break*/, 157];
                case 156: return [3 /*break*/, 157];
                case 157:
                    newRouletteBet = { betAmount: betAmount, payoutAmount: payoutAmount, betOptions: betOptions, betType: betType, userID: commandData.guildMember.id, winningNumbers: winningNumbers };
                    guildData.rouletteGame.bets.push(newRouletteBet);
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 158:
                    _30.sent();
                    msgEmbed = new Discord.MessageEmbed();
                    msgEmbed
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription("------\n__**Bet Type:**__ " + betType + "\n__**Your winning numbers are:\n" + winningNumbers + "**__\n__**Your winning payout would be:**__\n" + payoutAmount + " " + discordUser.userData.currencyName + "\n------")
                        .setTimestamp(Date())
                        .setTitle('__**Roulette Bet Placed:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 159:
                    _30.sent();
                    return [3 /*break*/, 163];
                case 160:
                    if (!(whatAreWeDoing === 'start')) return [3 /*break*/, 163];
                    return [4 /*yield*/, guildData.getFromDataBase()];
                case 161:
                    _30.sent();
                    guildData.rouletteGame.currentlySpinning = true;
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 162:
                    _30.sent();
                    eventEmitter_1 = new events_1.default();
                    currentIndex_1 = 3;
                    eventEmitter_1.on('rouletteCountdown', function () { return __awaiter(_this, void 0, void 0, function () {
                        var msgEmbed, finalRoll;
                        var _a, _b, _c, _d;
                        return __generator(this, function (_e) {
                            switch (_e.label) {
                                case 0:
                                    msgEmbed = new Discord.MessageEmbed();
                                    msgEmbed
                                        .setAuthor((_b = (_a = commandData.guild) === null || _a === void 0 ? void 0 : _a.client.user) === null || _b === void 0 ? void 0 : _b.username, (_d = (_c = commandData.guild) === null || _c === void 0 ? void 0 : _c.client.user) === null || _d === void 0 ? void 0 : _d.avatarURL())
                                        .setColor([0, 0, 255])
                                        .setDescription("------\n__**" + currentIndex_1 * 10 + " seconds remaining to place your roulette bets!**__\n------")
                                        .setTimestamp(Date())
                                        .setTitle('__**Roulette Ball Rolling:**__');
                                    if (!(currentIndex_1 === 3)) return [3 /*break*/, 2];
                                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                                case 1:
                                    newMessage_1 = _e.sent();
                                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                                        newMessage_1 = new Discord.Message(commandData.guild.client, newMessage_1, commandData.fromTextChannel);
                                    }
                                    return [3 /*break*/, 4];
                                case 2: return [4 /*yield*/, newMessage_1.edit(msgEmbed)];
                                case 3:
                                    _e.sent();
                                    _e.label = 4;
                                case 4:
                                    currentIndex_1 -= 1;
                                    if (!(currentIndex_1 === -1)) return [3 /*break*/, 7];
                                    return [4 /*yield*/, newMessage_1.delete()];
                                case 5:
                                    _e.sent();
                                    finalRoll = Math.trunc(Math.random() * 38).toString();
                                    return [4 /*yield*/, calculateResults(finalRoll, commandData, discordUser, redNumbers_1, blackNumbers_1)];
                                case 6:
                                    _e.sent();
                                    _e.label = 7;
                                case 7: return [2 /*return*/];
                            }
                        });
                    }); });
                    for (x = 0; x <= 3; x += 1) {
                        setTimeout(function () {
                            eventEmitter_1.emit('rouletteCountdown');
                        }, x * 10000);
                    }
                    _30.label = 163;
                case 163: return [2 /*return*/, commandReturnData];
                case 164:
                    error_1 = _30.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            reject(error_1);
                        })];
                case 165: return [2 /*return*/];
            }
        });
    });
}
command.function = execute;
exports.default = command;
