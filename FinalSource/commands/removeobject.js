// removeobject.ts - Module for my "remove inventory object" command.
// Feb 7, 2021
// Chris M.
// https:/github.com/RealTimeChris
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
    name: 'removeobject',
    description: "__**Remove Object Usage:**__ !removeobject = ITEMNAME/ROLENAME and optionally !removeobject = ITEMNAME/ROLENAME, @USERMENTION to remove from someone else's inventory!",
    function: Function()
};
function execute(commandData, discordUser) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var commandReturnData, areWeInADM, doWeHaveAdminPermission, guildData, msgString_1, msgEmbed, msg, objectName, userID, userMentionRegExp, userIDRegExp, msgString_2, msgEmbed, msg, argOne, userIDOne, targetMember, msgString_3, msgEmbed, msg, guildMemberData, msgString_4, msgEmbed, msg, objectType, isObjectFound, roleID, x, x, msgString, messageEmbed, msgString_5, msgEmbed, msg, guildMemberRoleManager, error_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 31, , 32]);
                    commandReturnData = {
                        commandName: command.name
                    };
                    return [4 /*yield*/, HelperFunctions_1.default.areWeInADM(commandData)];
                case 1:
                    areWeInADM = _c.sent();
                    if (areWeInADM === true) {
                        return [2 /*return*/, commandReturnData];
                    }
                    return [4 /*yield*/, HelperFunctions_1.default.doWeHaveAdminPermission(commandData, discordUser)];
                case 2:
                    doWeHaveAdminPermission = _c.sent();
                    if (doWeHaveAdminPermission === false) {
                        return [2 /*return*/, commandReturnData];
                    }
                    guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: commandData.guild.id, memberCount: commandData.guild.memberCount, name: commandData.guild.name });
                    return [4 /*yield*/, guildData.getFromDataBase()];
                case 3:
                    _c.sent();
                    if (!(commandData.args[0] === undefined)) return [3 /*break*/, 6];
                    msgString_1 = "------\n**Please enter an object name! (!removeobject = ITEMNAME/ROLENAME, @USERMENTION, or just !removeobject = ITEMNAME/ROLENAME)**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor((_a = commandData.guildMember) === null || _a === void 0 ? void 0 : _a.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString_1)
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
                    objectName = commandData.args[0];
                    userID = '';
                    userMentionRegExp = /.{2,3}\d{18}>/;
                    userIDRegExp = /\d{18}/;
                    if (!(commandData.args[1] === undefined)) return [3 /*break*/, 7];
                    userID = commandData.guildMember.id;
                    return [3 /*break*/, 11];
                case 7:
                    if (!(!userMentionRegExp.test(commandData.args[1]) && !userIDRegExp.test(commandData.args[1]))) return [3 /*break*/, 10];
                    msgString_2 = "------\n**Please enter a proper usermention argument, or leave it blank! (!removeobject = ITEMNAME/ROLENAME, @USERMENTION, or just !removeobject = ITEMNAME/ROLENAME)**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor((_b = commandData.guildMember) === null || _b === void 0 ? void 0 : _b.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString_2)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
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
                    argOne = commandData.args[1];
                    userIDOne = argOne.match(userIDRegExp)[0];
                    userID = userIDOne;
                    _c.label = 11;
                case 11:
                    targetMember = commandData.guild.members.resolve(userID);
                    if (!(targetMember === null)) return [3 /*break*/, 14];
                    msgString_3 = "------\n**Sorry, but that user could not be found!**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString_3)
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
                    guildMemberData = new GuildMemberData_1.default({ dataBase: discordUser.dataBase, id: commandData.guildMember.id, guildId: commandData.guild.id,
                        userName: commandData.guildMember.user.username, displayName: commandData.guildMember.displayName });
                    return [4 /*yield*/, guildMemberData.getFromDataBase()];
                case 15:
                    _c.sent();
                    if (!(guildMemberData == null)) return [3 /*break*/, 18];
                    msgString_4 = "------\n**Sorry, but the specified user data could not be found!**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString_4)
                        .setTimestamp(Date())
                        .setTitle('__**User Issue:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 16:
                    msg = _c.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 17:
                    _c.sent();
                    return [2 /*return*/, commandReturnData];
                case 18:
                    objectType = '';
                    isObjectFound = false;
                    roleID = '';
                    x = 0;
                    _c.label = 19;
                case 19:
                    if (!(x < guildMemberData.items.length)) return [3 /*break*/, 22];
                    if (!(objectName === guildMemberData.items[x].itemName)) return [3 /*break*/, 21];
                    objectType = 'item';
                    isObjectFound = true;
                    guildMemberData.items.splice(x, 1);
                    return [4 /*yield*/, guildMemberData.writeToDataBase()];
                case 20:
                    _c.sent();
                    _c.label = 21;
                case 21:
                    x += 1;
                    return [3 /*break*/, 19];
                case 22:
                    x = 0;
                    _c.label = 23;
                case 23:
                    if (!(x < guildMemberData.roles.length)) return [3 /*break*/, 26];
                    if (!(objectName === guildMemberData.roles[x].roleName)) return [3 /*break*/, 25];
                    objectType = 'role';
                    isObjectFound = true;
                    roleID = guildMemberData.roles[x].roleID;
                    guildMemberData.roles.splice(x, 1);
                    return [4 /*yield*/, guildMemberData.writeToDataBase()];
                case 24:
                    _c.sent();
                    _c.label = 25;
                case 25:
                    x += 1;
                    return [3 /*break*/, 23];
                case 26:
                    msgString = '';
                    messageEmbed = new Discord.MessageEmbed();
                    if (!(isObjectFound === false)) return [3 /*break*/, 29];
                    msgString_5 = "-------\n**Sorry, but the item was not found in the inventory!**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString_5)
                        .setTimestamp(Date())
                        .setTitle('__**Item Issue:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 27:
                    msg = _c.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 28:
                    _c.sent();
                    return [2 /*return*/, commandReturnData];
                case 29:
                    if (objectType === 'role') {
                        guildMemberRoleManager = new Discord.GuildMemberRoleManager(commandData.guildMember);
                        guildMemberRoleManager.remove(roleID);
                        msgString = "------\n**You've removed the following role from <@!" + userID + ">'s inventory:**\n------\n __**" + objectName + "**__\n------";
                        messageEmbed.setTitle('__**Role Removed:**__');
                    }
                    else if (objectType === 'item') {
                        msgString = "------\n**You've removed the following item from <@!" + userID + ">'s inventory:**\n------\n __**" + objectName + "**__\n------";
                        messageEmbed.setTitle('__**Item Removed:**__');
                    }
                    messageEmbed.setTimestamp(Date.now()).setDescription(msgString)
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL()).setColor([255, 0, 0]);
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, messageEmbed)];
                case 30:
                    _c.sent();
                    return [2 /*return*/, commandReturnData];
                case 31:
                    error_1 = _c.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            reject(error_1);
                        })];
                case 32: return [2 /*return*/];
            }
        });
    });
}
command.function = execute;
exports.default = command;
