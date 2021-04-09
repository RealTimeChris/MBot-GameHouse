// inventory.ts - Module for my "show inventory" command.
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
    name: 'inventory',
    description: '__**Inventory Usage:**__ !inventory = @USERMENTION or !inventory',
    function: Function()
};
function execute(commandData, discordUser) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var commandReturnData, areWeInADM, areWeAllowed, guildData, userID, msgString, msgEmbed, msg, userIDRegExp, idRegExp, msgString, msgEmbed, msg, argZero, userIDOne, currentGuildMember, msgString, msgEmbed, msg, guildMemberData, msgString, msgEmbed, msg, userName, rolesArray, x, isRoleFound, y, msgString, msgEmbed, msg, itemsMsgString, itemsMessageEmbeds, currentPage, x, itemsMsgStringTemp, rolesMsgStrings, rolesMsgEmbeds, currentPage2, x, rolesMsgStringTemp, x, x, finalMsgEmbedsArray, msgString, messageEmbed, currentPageIndex, newMessage, error_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 29, , 30]);
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
                    userID = '';
                    if (!!((_b = commandData.fromTextChannel.permissionsFor((_a = commandData.guild) === null || _a === void 0 ? void 0 : _a.client.user)) === null || _b === void 0 ? void 0 : _b.has('MANAGE_MESSAGES'))) return [3 /*break*/, 6];
                    msgString = "------\n**I need the Manage Messages permission in this channel, for this command!**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Permissions Issue:**__');
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
                    userIDRegExp = /.{2,3}\d{18}>/;
                    idRegExp = /\d{18}/;
                    if (!(commandData.args[0] === undefined)) return [3 /*break*/, 7];
                    userID = commandData.guildMember.id;
                    return [3 /*break*/, 11];
                case 7:
                    if (!(!userIDRegExp.test(commandData.args[0]) && !idRegExp.test(commandData.args[0]))) return [3 /*break*/, 10];
                    msgString = "------\n**Sorry, please enter a valid user mention or user ID! (!inventory = @USERMENTION, or just !inventory)**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
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
                    argZero = commandData.args[0];
                    userIDOne = argZero.match(idRegExp)[0];
                    userID = userIDOne;
                    _c.label = 11;
                case 11:
                    currentGuildMember = commandData.guild.members.resolve(userID);
                    if (!(currentGuildMember === null)) return [3 /*break*/, 14];
                    msgString = "-------\n**Sorry, but that user could not be found!**\n------";
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
                    guildMemberData = new GuildMemberData_1.default({ dataBase: discordUser.dataBase, id: commandData.guildMember.id, guildId: commandData.guild.id,
                        userName: commandData.guildMember.user.username, displayName: commandData.guildMember.displayName });
                    return [4 /*yield*/, guildMemberData.getFromDataBase()];
                case 15:
                    _c.sent();
                    if (!(guildMemberData == null)) return [3 /*break*/, 18];
                    msgString = "------\n**Sorry, but the specified user data could not be found!**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
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
                    userName = guildMemberData.userName;
                    rolesArray = commandData.guild.roles.cache.array().sort();
                    x = 0;
                    _c.label = 19;
                case 19:
                    if (!(x < guildMemberData.roles.length)) return [3 /*break*/, 24];
                    isRoleFound = false;
                    for (y = 0; y < rolesArray.length; y += 1) {
                        if (guildMemberData.roles[x] === undefined) {
                            continue;
                        }
                        if (guildMemberData.roles[x].roleID === rolesArray[y].id) {
                            isRoleFound = true;
                            break;
                        }
                    }
                    if (!(isRoleFound === false)) return [3 /*break*/, 23];
                    msgString = "Removing guild role " + guildMemberData.roles[x].roleName + " from user cache!";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Role Issue:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 20:
                    msg = _c.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 21:
                    _c.sent();
                    guildMemberData.roles.splice(x, 1);
                    return [4 /*yield*/, guildMemberData.writeToDataBase()];
                case 22:
                    _c.sent();
                    _c.label = 23;
                case 23:
                    x += 1;
                    return [3 /*break*/, 19];
                case 24:
                    itemsMsgString = [];
                    itemsMsgString.length = 0;
                    itemsMessageEmbeds = [new Discord.MessageEmbed()];
                    itemsMessageEmbeds.length = 0;
                    currentPage = 0;
                    for (x = 0; x < guildMemberData.items.length; x += 1) {
                        itemsMsgString[x] = '';
                        itemsMsgStringTemp = '';
                        itemsMsgStringTemp = "__**|Item:**__ " + guildMemberData.items[x].emoji + guildMemberData.items[x].itemName + "** |Value**: " + guildMemberData.items[x].itemCost + " **|Self-Mod**: " + guildMemberData.items[x].selfMod + " **|Opp-Mod**: " + guildMemberData.items[x].oppMod + "\n";
                        if (itemsMsgStringTemp.length + itemsMsgString[currentPage].length >= 2048) {
                            currentPage += 1;
                            itemsMsgString.length += 1;
                            itemsMessageEmbeds.length += 1;
                        }
                        itemsMessageEmbeds[currentPage] = new Discord.MessageEmbed();
                        itemsMsgString[currentPage] += itemsMsgStringTemp;
                    }
                    rolesMsgStrings = [];
                    rolesMsgStrings.length = 0;
                    rolesMsgEmbeds = [new Discord.MessageEmbed()];
                    rolesMsgEmbeds.length = 0;
                    currentPage2 = 0;
                    for (x = 0; x < guildMemberData.roles.length; x += 1) {
                        rolesMsgStrings[x] = '';
                        rolesMsgStringTemp = '';
                        rolesMsgStringTemp = "" + '__**|Role: **__ <@&' + guildMemberData.roles[x].roleID + "> ** |Value: **" + guildMemberData.roles[x].roleCost + "\n";
                        if (rolesMsgStringTemp.length + rolesMsgStrings[currentPage2].length > 2048) {
                            currentPage2 += 1;
                            rolesMsgStrings.length += 1;
                            rolesMsgEmbeds.length += 1;
                        }
                        rolesMsgEmbeds[currentPage2] = new Discord.MessageEmbed();
                        rolesMsgStrings[currentPage2] += rolesMsgStringTemp;
                    }
                    for (x = 0; x < itemsMessageEmbeds.length; x += 1) {
                        itemsMessageEmbeds[x].setTimestamp(Date.now()).setTitle("__**" + userName + "'s Inventory (Items) Page " + (rolesMsgEmbeds.length + x + 1) + " of " + (itemsMessageEmbeds.length + rolesMsgEmbeds.length).toString() + "**__:").setDescription(itemsMsgString[x]).setColor(guildData.borderColor)
                            .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL());
                    }
                    for (x = 0; x < rolesMsgEmbeds.length; x += 1) {
                        rolesMsgEmbeds[x].setTimestamp(Date.now()).setTitle("__**" + userName + "'s Inventory (Roles) Page " + (x + 1) + " of " + (itemsMessageEmbeds.length + rolesMsgEmbeds.length).toString() + "**__:").setDescription(rolesMsgStrings[x]).setColor(guildData.borderColor)
                            .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL());
                    }
                    finalMsgEmbedsArray = rolesMsgEmbeds.concat(itemsMessageEmbeds);
                    if (!(rolesMsgEmbeds.length === 0 && itemsMessageEmbeds.length === 0)) return [3 /*break*/, 26];
                    msgString = '';
                    msgString = "Sorry, but the specified user, (<@!" + userID + ">) has no inventory!";
                    messageEmbed = new Discord.MessageEmbed();
                    messageEmbed.setDescription(msgString).setTimestamp(Date.now()).setTitle('__**Empty Inventory:**__').setColor(guildData.borderColor)
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL());
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, messageEmbed)];
                case 25:
                    _c.sent();
                    return [2 /*return*/, commandReturnData];
                case 26:
                    currentPageIndex = 0;
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, finalMsgEmbedsArray[currentPageIndex])];
                case 27:
                    newMessage = _c.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        newMessage = new Discord.Message(commandData.guild.client, newMessage, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, HelperFunctions_1.default.recurseThroughMessagePages(commandData.guildMember.id, newMessage, currentPageIndex, finalMsgEmbedsArray, true)];
                case 28:
                    _c.sent();
                    return [2 /*return*/, commandReturnData];
                case 29:
                    error_1 = _c.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            reject(error_1);
                        })];
                case 30: return [2 /*return*/];
            }
        });
    });
}
command.function = execute;
exports.default = command;
