// balance.ts - Module for my balance command.
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
    name: 'balance',
    description: '__**Balance Usage**__: !balance = @USERMENTION, or simply !balance to display your own balance.',
    function: Function()
};
function execute(commandData, discordUser) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var commandReturnData, areWeInADM, userID, bankAmount, walletAmount, guildData, mentionRegExp, idRegExp, msgString_1, msgEmbed, msg, potentialID, userID01, currentGuildMember, msgString_2, msgEmbed, msg, guildMemberData, msgString, messageEmbed, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 13, , 14]);
                    commandReturnData = {
                        commandName: command.name
                    };
                    return [4 /*yield*/, HelperFunctions_1.default.areWeInADM(commandData)];
                case 1:
                    areWeInADM = _b.sent();
                    if (areWeInADM === true) {
                        return [2 /*return*/, commandReturnData];
                    }
                    userID = '';
                    bankAmount = 0;
                    walletAmount = 0;
                    guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: commandData.guild.id, memberCount: commandData.guild.memberCount, name: commandData.guild.name });
                    return [4 /*yield*/, guildData.getFromDataBase()];
                case 2:
                    _b.sent();
                    mentionRegExp = /<@!\d{18}>/;
                    idRegExp = /\d{18}/;
                    if (!(commandData.args[0] === undefined)) return [3 /*break*/, 3];
                    userID = commandData.guildMember.id;
                    return [3 /*break*/, 7];
                case 3:
                    if (!(commandData.args[0] !== undefined)) return [3 /*break*/, 7];
                    if (!(!mentionRegExp.test(commandData.args[0]) && !idRegExp.test(commandData.args[0]))) return [3 /*break*/, 6];
                    msgString_1 = "------\n**Please, enter a valid user mention, or enter none at all! (!balance = @USERMENTION)**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString_1)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 4:
                    msg = _b.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 5:
                    _b.sent();
                    return [2 /*return*/, commandReturnData];
                case 6:
                    potentialID = commandData.args[0];
                    userID01 = potentialID.match(idRegExp)[0];
                    userID = userID01;
                    _b.label = 7;
                case 7:
                    currentGuildMember = commandData.guild.members.resolve(userID);
                    if (!(currentGuildMember === null)) return [3 /*break*/, 10];
                    msgString_2 = "------\n**Sorry, but that user could not be found!**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor((_a = commandData.guildMember) === null || _a === void 0 ? void 0 : _a.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString_2)
                        .setTimestamp(Date())
                        .setTitle('__**User Issue:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 8:
                    msg = _b.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 9:
                    _b.sent();
                    return [2 /*return*/, commandReturnData];
                case 10:
                    guildMemberData = new GuildMemberData_1.default({ dataBase: discordUser.dataBase, id: currentGuildMember.id, guildId: commandData.guild.id,
                        userName: currentGuildMember.user.username, displayName: currentGuildMember.displayName });
                    return [4 /*yield*/, guildMemberData.getFromDataBase()];
                case 11:
                    _b.sent();
                    msgString = '';
                    bankAmount = guildMemberData.currency.bank;
                    walletAmount = guildMemberData.currency.wallet;
                    msgString = msgString + "<@!" + userID + ">'s balances are:\n------\n__**Bank Balance:**__ " + bankAmount.toString() + " " + discordUser.userData.currencyName + "\n"
                        + ("__**Wallet Balance:**__ " + walletAmount.toString() + " " + discordUser.userData.currencyName + "\n------");
                    messageEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setDescription(msgString)
                        .setColor(guildData.borderColor)
                        .setTimestamp(Date.now())
                        .setTitle('__**Current Balances:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, messageEmbed)];
                case 12:
                    _b.sent();
                    return [2 /*return*/, commandReturnData];
                case 13:
                    error_1 = _b.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            reject(error_1);
                        })];
                case 14: return [2 /*return*/];
            }
        });
    });
}
command.function = execute;
exports.default = command;
