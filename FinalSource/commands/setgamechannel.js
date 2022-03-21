// setgamechannel.ts - Module for my "set game channel" command.
// Feb 19, 2021
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
var HelperFunctions_1 = __importDefault(require("../HelperFunctions"));
var command = {
    name: 'setgamechannel',
    description: '__**Set Game Channel Usage**__ !setgamechannel = ADD or !setgamechannel = REMOVE in the channel you would like to add/remove.'
        + ' Also !setgamechannel = PURGE to remove all channels, or just !setgamechannel to view the currently enabled channels!',
    function: Function()
};
function execute(commandData, discordUser) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var commandReturnData, areWeInADM, doWeHaveAdminPermission, guildData, msgString, x, currentID, messageEmbed, msgString, msgEmbed, msg, currentGuild, newGameChannel, msgString, msgEmbed, msg, channelID, x, msgString, msgEmbed, msg, messageEmbed, channelID, msgString, isItPresent, x, msgString_1, msgEmbed, msg, messageEmbed, msgString, x, currentID, messageEmbed, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 34, , 35]);
                    commandReturnData = {
                        commandName: command.name
                    };
                    return [4 /*yield*/, HelperFunctions_1.default.areWeInADM(commandData)];
                case 1:
                    areWeInADM = _b.sent();
                    if (areWeInADM === true) {
                        return [2 /*return*/, commandReturnData];
                    }
                    return [4 /*yield*/, HelperFunctions_1.default.doWeHaveAdminPermission(commandData, discordUser)];
                case 2:
                    doWeHaveAdminPermission = _b.sent();
                    if (doWeHaveAdminPermission === false) {
                        return [2 /*return*/, commandReturnData];
                    }
                    guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: commandData.guild.id, memberCount: commandData.guild.memberCount, name: commandData.guild.name });
                    return [4 /*yield*/, guildData.getFromDataBase()];
                case 3:
                    _b.sent();
                    if (!(commandData.args[0] === undefined)) return [3 /*break*/, 5];
                    msgString = '__You have the following channels enabled for gaming, on this server:__\n------\n';
                    for (x = 0; x < guildData.gameChannelIDs.length; x += 1) {
                        currentID = guildData.gameChannelIDs[x];
                        msgString += "__**Channel #" + x + ":**__ <#" + currentID + ">\n";
                    }
                    msgString += '------\n';
                    messageEmbed = new Discord.MessageEmbed();
                    messageEmbed
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setTimestamp(Date.now())
                        .setTitle('__**Game Channels Enabled:**__')
                        .setDescription(msgString);
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, messageEmbed)];
                case 4:
                    _b.sent();
                    return [2 /*return*/, commandReturnData];
                case 5:
                    if (!(commandData.args[0].toLowerCase() !== 'add' && commandData.args[0].toLowerCase() !== 'remove' && commandData.args[0].toLowerCase() !== 'purge' && commandData.args[0].toLowerCase() !== 'view')) return [3 /*break*/, 8];
                    msgString = "------\n**Please enter either 'add', 'remove', or 'purge' only! (!setgamechannel = ADDorREMOVEorPURGE)**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor((_a = commandData.guildMember) === null || _a === void 0 ? void 0 : _a.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 6:
                    msg = _b.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 7:
                    _b.sent();
                    return [2 /*return*/, commandReturnData];
                case 8:
                    if (!(commandData.args[0].toLowerCase() === 'add')) return [3 /*break*/, 19];
                    currentGuild = commandData.guild;
                    newGameChannel = currentGuild.channels.resolve(commandData.fromTextChannel.id);
                    if (!(newGameChannel == null)) return [3 /*break*/, 11];
                    msgString = "------\n**Sorry, but that channel could not be found!**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Channel Issue:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 9:
                    msg = _b.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 10:
                    _b.sent();
                    return [2 /*return*/, commandReturnData];
                case 11:
                    channelID = commandData.fromTextChannel.id;
                    x = 0;
                    _b.label = 12;
                case 12:
                    if (!(x < guildData.gameChannelIDs.length)) return [3 /*break*/, 16];
                    if (!(channelID === guildData.gameChannelIDs[x])) return [3 /*break*/, 15];
                    msgString = "------\n**That channel is already on the list of enabled channels!**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Already Listed:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 13:
                    msg = _b.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 14:
                    _b.sent();
                    return [2 /*return*/, commandReturnData];
                case 15:
                    x += 1;
                    return [3 /*break*/, 12];
                case 16:
                    guildData.gameChannelIDs.push(channelID);
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 17:
                    _b.sent();
                    messageEmbed = new Discord.MessageEmbed();
                    messageEmbed
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setTimestamp(Date.now())
                        .setTitle('__**Game Channel Added:**__')
                        .setDescription("**You've succesfully added <#" + channelID + "> to your list of accepted game channels!**");
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, messageEmbed)];
                case 18:
                    _b.sent();
                    return [2 /*return*/, commandReturnData];
                case 19:
                    if (!(commandData.args[0].toLowerCase() === 'remove')) return [3 /*break*/, 28];
                    channelID = '';
                    channelID = commandData.fromTextChannel.id;
                    msgString = '';
                    isItPresent = false;
                    x = 0;
                    _b.label = 20;
                case 20:
                    if (!(x < guildData.gameChannelIDs.length)) return [3 /*break*/, 23];
                    if (!(channelID === guildData.gameChannelIDs[x])) return [3 /*break*/, 22];
                    isItPresent = true;
                    guildData.gameChannelIDs.splice(x, 1);
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 21:
                    _b.sent();
                    msgString += "You've succesfully removed the channel <#" + channelID + "> from the list of enabled gaming channels!";
                    _b.label = 22;
                case 22:
                    x += 1;
                    return [3 /*break*/, 20];
                case 23:
                    if (!(isItPresent === false)) return [3 /*break*/, 26];
                    msgString_1 = "------\n**That channel is not present on the list of enabled gaming channels!**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString_1)
                        .setTimestamp(Date())
                        .setTitle('__**Missing from List:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 24:
                    msg = _b.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 25:
                    _b.sent();
                    return [2 /*return*/, commandReturnData];
                case 26:
                    messageEmbed = new Discord.MessageEmbed();
                    messageEmbed
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setTimestamp(Date.now())
                        .setTitle('__**Game Channel Removed:**__')
                        .setDescription(msgString);
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, messageEmbed)];
                case 27:
                    _b.sent();
                    return [2 /*return*/, commandReturnData];
                case 28:
                    if (!(commandData.args[0].toLowerCase() === 'purge')) return [3 /*break*/, 33];
                    msgString = '';
                    if (!(guildData.gameChannelIDs.length > 0)) return [3 /*break*/, 30];
                    msgString = "__You've removed the following channels from your list of 'enabled game channels:__\n------\n";
                    for (x = 0; x < guildData.gameChannelIDs.length; x += 1) {
                        currentID = guildData.gameChannelIDs[x];
                        msgString += "__**Channel #" + x + ":**__ <#" + currentID + ">\n";
                    }
                    msgString += '------\n__**The games will now work in ANY CHANNEL!**__';
                    guildData.gameChannelIDs = [];
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 29:
                    _b.sent();
                    return [3 /*break*/, 31];
                case 30:
                    msgString += '**Sorry, but there are no channels to remove!**';
                    _b.label = 31;
                case 31:
                    messageEmbed = new Discord.MessageEmbed();
                    messageEmbed
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setTimestamp(Date.now())
                        .setTitle('__**Game Channels Removed:**__')
                        .setDescription(msgString);
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, messageEmbed)];
                case 32:
                    _b.sent();
                    return [2 /*return*/, commandReturnData];
                case 33: return [2 /*return*/, commandReturnData];
                case 34:
                    error_1 = _b.sent();
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
