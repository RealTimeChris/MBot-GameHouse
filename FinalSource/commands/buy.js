// buy.ts - Module for my buying command.
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
    name: 'buy',
    description: '__**Buy Usage:**__ !buy = ITEMNAME/ROLENAME',
    function: Function()
};
function execute(commandData, discordUser) {
    return __awaiter(this, void 0, void 0, function () {
        var commandReturnData, areWeInADM, guildData, msgString_1, msgEmbed, msg, objectName, objectShopIndex, objectType, guildMemberData, isFoundInShop, x, x, msgString_2, msgEmbed, msg, isFoundInInventory, x, x, msgString_3, msgEmbed, msg, msgString, messageEmbed, roleCost, userBalance, msgString_4, msgEmbed, msg, newRole, newBalance, roleID, guildMemberRoleManager, maxIdx, tempRole, len, x, y, itemCost, userBalance, msgString_5, msgEmbed, msg, newItem, itemEmoji, itemName, newBalance, maxIdx, tempItem, len, x, y, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 26, , 27]);
                    commandReturnData = {
                        commandName: command.name
                    };
                    return [4 /*yield*/, HelperFunctions_1.default.areWeInADM(commandData)];
                case 1:
                    areWeInADM = _a.sent();
                    if (areWeInADM === true) {
                        return [2 /*return*/, commandReturnData];
                    }
                    guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: commandData.guild.id, memberCount: commandData.guild.memberCount, name: commandData.guild.name });
                    return [4 /*yield*/, guildData.getFromDataBase()];
                case 2:
                    _a.sent();
                    if (!(commandData.args[0] === undefined)) return [3 /*break*/, 5];
                    msgString_1 = "------\n**Please enter an item name! (!buy = ITEMNAME)**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString_1)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 3:
                    msg = _a.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 4:
                    _a.sent();
                    return [2 /*return*/, commandReturnData];
                case 5:
                    objectName = commandData.args[0];
                    objectShopIndex = 0;
                    objectType = String();
                    guildMemberData = new GuildMemberData_1.default({ dataBase: discordUser.dataBase, id: commandData.guildMember.id, guildId: commandData.guild.id,
                        userName: commandData.guildMember.user.username, displayName: commandData.guildMember.displayName });
                    return [4 /*yield*/, guildMemberData.getFromDataBase()];
                case 6:
                    _a.sent();
                    isFoundInShop = false;
                    for (x = 0; x < guildData.guildShop.items.length; x += 1) {
                        if (objectName === guildData.guildShop.items[x].itemName) {
                            isFoundInShop = true;
                            objectShopIndex = x;
                            objectType = 'item';
                            break;
                        }
                    }
                    for (x = 0; x < guildData.guildShop.roles.length; x += 1) {
                        if (objectName === guildData.guildShop.roles[x].roleName) {
                            isFoundInShop = true;
                            objectShopIndex = x;
                            objectType = 'role';
                            break;
                        }
                    }
                    if (!(isFoundInShop === false)) return [3 /*break*/, 9];
                    msgString_2 = "------\n**Sorry, but we could not find that object in the shop!**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString_2)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Object:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 7:
                    msg = _a.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 8:
                    _a.sent();
                    return [2 /*return*/, commandReturnData];
                case 9:
                    isFoundInInventory = false;
                    for (x = 0; x < guildMemberData.items.length; x += 1) {
                        if (objectName === guildMemberData.items[x].itemName) {
                            isFoundInInventory = true;
                            break;
                        }
                    }
                    for (x = 0; x < guildMemberData.roles.length; x += 1) {
                        if (objectName === guildMemberData.roles[x].roleName) {
                            isFoundInInventory = true;
                            break;
                        }
                    }
                    if (!(isFoundInInventory === true)) return [3 /*break*/, 12];
                    msgString_3 = "------\n**Sorry, but you already have one of those " + objectType + "s.**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString_3)
                        .setTimestamp(Date())
                        .setTitle('__**Duplicate Object:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 10:
                    msg = _a.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 11:
                    _a.sent();
                    return [2 /*return*/, commandReturnData];
                case 12:
                    msgString = '';
                    messageEmbed = new Discord.MessageEmbed();
                    if (!(objectType === 'role')) return [3 /*break*/, 18];
                    roleCost = guildData.guildShop.roles[objectShopIndex].roleCost;
                    userBalance = guildMemberData.currency.wallet;
                    if (!(roleCost > userBalance)) return [3 /*break*/, 15];
                    msgString_4 = "------\n**Sorry, but you have insufficient funds in your wallet to purchase that!**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString_4)
                        .setTimestamp(Date())
                        .setTitle('__**Insufficient Funds:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 13:
                    msg = _a.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 14:
                    _a.sent();
                    return [2 /*return*/, commandReturnData];
                case 15:
                    newRole = guildData.guildShop.roles[objectShopIndex];
                    guildMemberData.roles.push(newRole);
                    guildMemberData.currency.wallet -= roleCost;
                    return [4 /*yield*/, guildMemberData.writeToDataBase()];
                case 16:
                    _a.sent();
                    newBalance = guildMemberData.currency.wallet;
                    roleID = guildData.guildShop.roles[objectShopIndex].roleID;
                    guildMemberRoleManager = new Discord.GuildMemberRoleManager(commandData.guildMember);
                    guildMemberRoleManager.add(roleID);
                    msgString = "------\nCongratulations! You've just purchased a new " + objectType + ".\n------\n__**It is as follows:**__ <@&" + newRole.roleID + "> (" + newRole.roleName + ")\n------\n__**Your new wallet balance:**__ " + newBalance + " " + discordUser.userData.currencyName + "\n------";
                    messageEmbed.setTitle('__**New Role Purchased:**__');
                    maxIdx = 0;
                    tempRole = void 0;
                    len = guildMemberData.roles.length;
                    for (x = 0; x < len; x += 1) {
                        maxIdx = x;
                        for (y = x + 1; y < len; y += 1) {
                            if (guildMemberData.roles[y].roleCost > guildMemberData.roles[maxIdx].roleCost) {
                                maxIdx = y;
                            }
                        }
                        tempRole = guildMemberData.roles[x];
                        guildMemberData.roles[x] = guildMemberData.roles[maxIdx];
                        guildMemberData.roles[maxIdx] = tempRole;
                    }
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 17:
                    _a.sent();
                    return [3 /*break*/, 24];
                case 18:
                    if (!(objectType === 'item')) return [3 /*break*/, 24];
                    itemCost = guildData.guildShop.items[objectShopIndex].itemCost;
                    userBalance = guildMemberData.currency.wallet;
                    if (!(itemCost > userBalance)) return [3 /*break*/, 21];
                    msgString_5 = "------\n*Sorry, but you have insufficient funds in your wallet to purchase that!**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString_5)
                        .setTimestamp(Date())
                        .setTitle('__**Insufficient Funds:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 19:
                    msg = _a.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 20:
                    _a.sent();
                    return [2 /*return*/, commandReturnData];
                case 21:
                    newItem = guildData.guildShop.items[objectShopIndex];
                    guildMemberData.items.push(newItem);
                    guildMemberData.currency.wallet -= itemCost;
                    return [4 /*yield*/, guildMemberData.writeToDataBase()];
                case 22:
                    _a.sent();
                    itemEmoji = guildData.guildShop.items[objectShopIndex].emoji;
                    itemName = guildData.guildShop.items[objectShopIndex].itemName;
                    newBalance = guildMemberData.currency.wallet;
                    msgString = "------\nCongratulations! You've just purchased a new " + objectType + ".\n------\n__**It is as follows:**__ " + itemEmoji + itemName + "\n------\n__**Your new wallet balance:**__ " + newBalance + " " + discordUser.userData.currencyName + "\n------";
                    messageEmbed.setTitle('__**New Item Purchased:**__');
                    maxIdx = 0;
                    tempItem = void 0;
                    len = guildMemberData.items.length;
                    for (x = 0; x < len; x += 1) {
                        maxIdx = x;
                        for (y = x + 1; y < len; y += 1) {
                            if (guildMemberData.items[y].itemCost > guildMemberData.items[maxIdx].itemCost) {
                                maxIdx = y;
                            }
                        }
                        tempItem = guildMemberData.items[x];
                        guildMemberData.items[x] = guildMemberData.items[maxIdx];
                        guildMemberData.items[maxIdx] = tempItem;
                    }
                    return [4 /*yield*/, guildMemberData.writeToDataBase()];
                case 23:
                    _a.sent();
                    _a.label = 24;
                case 24:
                    messageEmbed
                        .setTimestamp(Date.now())
                        .setDescription(msgString)
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor);
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, messageEmbed)];
                case 25:
                    _a.sent();
                    return [2 /*return*/, commandReturnData];
                case 26:
                    error_1 = _a.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            reject(error_1);
                        })];
                case 27: return [2 /*return*/];
            }
        });
    });
}
command.function = execute;
exports.default = command;
