// shop.ts - Module for my "shop" command!
// Feb 6, 2021
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
    name: 'shop',
    description: '__**Shop Usage**__: !shop',
    function: Function()
};
function execute(commandData, discordUser) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function () {
        var commandReturnData, areWeInADM, areWeAllowed, rolesArray, guildData, msgString, msgEmbed, msg, x, isRoleFound, y, msgString, msgEmbed, msg, maxIdx, tempItem, len, x, y, tempRole, x, y, itemsMsgString, itemsMessageEmbeds, currentPage, x, itemsMsgStringTemp, rolesMsgStrings, rolesMsgEmbeds, currentPage2, x, rolesMsgStringTemp, x, x, finalMsgEmbedsArray, x, x, msgString, messageEmbed, currentPageIndex, userID, newMessage, error_1;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 17, , 18]);
                    commandReturnData = {
                        commandName: command.name
                    };
                    return [4 /*yield*/, HelperFunctions_1.default.areWeInADM(commandData)];
                case 1:
                    areWeInADM = _d.sent();
                    if (areWeInADM === true) {
                        return [2 /*return*/, commandReturnData];
                    }
                    return [4 /*yield*/, HelperFunctions_1.default.checkIfAllowedInChannel(commandData, discordUser)];
                case 2:
                    areWeAllowed = _d.sent();
                    if (areWeAllowed === false) {
                        return [2 /*return*/, commandReturnData];
                    }
                    rolesArray = commandData.guild.roles.cache.array().sort();
                    guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: commandData.guild.id, memberCount: commandData.guild.memberCount, name: commandData.guild.name });
                    return [4 /*yield*/, guildData.getFromDataBase()];
                case 3:
                    _d.sent();
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
                    msg = _d.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 5:
                    _d.sent();
                    return [2 /*return*/, commandReturnData];
                case 6:
                    x = 0;
                    _d.label = 7;
                case 7:
                    if (!(x < guildData.guildShop.roles.length)) return [3 /*break*/, 11];
                    isRoleFound = false;
                    for (y = 0; y < rolesArray.length; y += 1) {
                        if (guildData.guildShop.roles[x].roleID === rolesArray[y].id) {
                            isRoleFound = true;
                            break;
                        }
                    }
                    if (!(isRoleFound === false)) return [3 /*break*/, 10];
                    msgString = "------\n**Removing guild role " + guildData.guildShop.roles[x].roleName + " from guild cache!**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor((_c = commandData.guildMember) === null || _c === void 0 ? void 0 : _c.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Removed Guild Role:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 8:
                    msg = _d.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 9:
                    _d.sent();
                    guildData.guildShop.roles.splice(x, 1);
                    _d.label = 10;
                case 10:
                    x += 1;
                    return [3 /*break*/, 7];
                case 11:
                    maxIdx = 0;
                    tempItem = void 0;
                    len = guildData.guildShop.items.length;
                    for (x = 0; x < len; x += 1) {
                        maxIdx = x;
                        for (y = x + 1; y < len; y += 1) {
                            if (guildData.guildShop.items[y].itemCost
                                > guildData.guildShop.items[maxIdx].itemCost) {
                                maxIdx = y;
                            }
                        }
                        tempItem = guildData.guildShop.items[x];
                        guildData.guildShop.items[x] = guildData.guildShop.items[maxIdx];
                        guildData.guildShop.items[maxIdx] = tempItem;
                    }
                    maxIdx = 0;
                    tempRole = void 0;
                    len = guildData.guildShop.roles.length;
                    for (x = 0; x < len; x += 1) {
                        maxIdx = x;
                        for (y = x + 1; y < len; y += 1) {
                            if (guildData.guildShop.roles[y].roleCost
                                > guildData.guildShop.roles[maxIdx].roleCost) {
                                maxIdx = y;
                            }
                        }
                        tempRole = guildData.guildShop.roles[x];
                        guildData.guildShop.roles[x] = guildData.guildShop.roles[maxIdx];
                        guildData.guildShop.roles[maxIdx] = tempRole;
                    }
                    itemsMsgString = [];
                    itemsMsgString.length = 0;
                    itemsMessageEmbeds = [new Discord.MessageEmbed()];
                    itemsMessageEmbeds.length = 0;
                    currentPage = 0;
                    for (x = 0; x < guildData.guildShop.items.length; x += 1) {
                        itemsMsgString[x] = '';
                        itemsMsgStringTemp = '';
                        itemsMsgStringTemp = "__**|Item:**__ " + guildData.guildShop.items[x].emoji + " " + guildData.guildShop.items[x].itemName + "** |Cost**: " + guildData.guildShop.items[x].itemCost + " **|Self-Mod**: " + guildData.guildShop.items[x].selfMod + " **|Opp-Mod**: " + guildData.guildShop.items[x].oppMod + "\n";
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
                    for (x = 0; x < guildData.guildShop.roles.length; x += 1) {
                        rolesMsgStrings[x] = '';
                        rolesMsgStringTemp = '';
                        rolesMsgStringTemp = "__**|Role:**__ <@&" + guildData.guildShop.roles[x].roleID + "> **|Cost:** " + guildData.guildShop.roles[x].roleCost + "\n";
                        if (rolesMsgStringTemp.length + rolesMsgStrings[currentPage2].length > 2048) {
                            currentPage2 += 1;
                            rolesMsgStrings.length += 1;
                            rolesMsgEmbeds.length += 1;
                        }
                        rolesMsgEmbeds[currentPage2] = new Discord.MessageEmbed();
                        rolesMsgStrings[currentPage2] += rolesMsgStringTemp;
                    }
                    for (x = 0; x < rolesMsgEmbeds.length; x += 1) {
                        rolesMsgEmbeds[x].setTimestamp(Date.now()).setTitle("__**Shop Inventory (Roles) Page " + (x + 1) + " of " + (itemsMessageEmbeds.length + rolesMsgEmbeds.length) + "**__:").setDescription(rolesMsgStrings[x]).setColor(guildData.borderColor)
                            .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL());
                    }
                    for (x = 0; x < itemsMessageEmbeds.length; x += 1) {
                        itemsMessageEmbeds[x].setTimestamp(Date.now()).setTitle("__**Shop Inventory (Items) Page " + (rolesMsgEmbeds.length + x + 1) + " of " + (itemsMessageEmbeds.length + rolesMsgEmbeds.length) + "**__:")
                            .setDescription(itemsMsgString[x]).setColor(guildData.borderColor)
                            .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL());
                    }
                    finalMsgEmbedsArray = [new Discord.MessageEmbed()];
                    finalMsgEmbedsArray.length = 0;
                    for (x = 0; x < rolesMsgEmbeds.length; x += 1) {
                        finalMsgEmbedsArray.push(rolesMsgEmbeds[x]);
                    }
                    for (x = 0; x < itemsMessageEmbeds.length; x += 1) {
                        finalMsgEmbedsArray.push(itemsMessageEmbeds[x]);
                    }
                    if (!(rolesMsgEmbeds.length === 0 && itemsMessageEmbeds.length === 0)) return [3 /*break*/, 13];
                    msgString = '';
                    msgString = 'Sorry, but we are all out of inventory!';
                    messageEmbed = new Discord.MessageEmbed();
                    messageEmbed.setDescription(msgString).setTimestamp(Date.now()).setTitle('__**Empty Inventory:**__').setColor(guildData.borderColor)
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL());
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, messageEmbed)];
                case 12:
                    _d.sent();
                    return [2 /*return*/, commandReturnData];
                case 13:
                    currentPageIndex = 0;
                    userID = commandData.guildMember.user.id;
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, finalMsgEmbedsArray[currentPageIndex])];
                case 14:
                    newMessage = _d.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        newMessage = new Discord.Message(commandData.guild.client, newMessage, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, HelperFunctions_1.default.recurseThroughMessagePages(userID, newMessage, currentPageIndex, finalMsgEmbedsArray, true)];
                case 15:
                    _d.sent();
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 16:
                    _d.sent();
                    return [2 /*return*/, commandReturnData];
                case 17:
                    error_1 = _d.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            reject(error_1);
                        })];
                case 18: return [2 /*return*/];
            }
        });
    });
}
command.function = execute;
exports.default = command;
