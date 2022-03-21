// addshopitem.ts - Module for my command that adds an inventory item to the shop.
// Feb 5, 2021
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
    name: 'addshopitem',
    description: '__**Add Shop Item Usage**__: !addshopitem = ITEMNAME, SELFMOD, OPPMOD, ITEMCOST, EMOJI\n'
        + 'Where ITEMNAME is a string, and SELFMOD and OPPMOD are values between 0 and 100, and 0 and -100 respectively.',
    function: Function()
};
function execute(commandData, discordUser) {
    return __awaiter(this, void 0, void 0, function () {
        var commandReturnData, areWeInADM, testBool, guildData, itemNameRegExp, selfModRegExp, oppModRegExp, itemCostRegExp, emojiRegExp, msgString_1, msgEmbed, msg, msgString_2, msgEmbed, msg, msgString_3, msgEmbed, msg, msgString_4, msgEmbed, msg, msgString_5, msgEmbed, msg, itemName, selfMod, oppMod, itemCost, emoji, x, msgString_6, msgEmbed, msg, newItem, msgString, messageEmbed, error_1;
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
                    return [4 /*yield*/, HelperFunctions_1.default.doWeHaveAdminPermission(commandData, discordUser)];
                case 2:
                    testBool = _a.sent();
                    if (testBool === false) {
                        return [2 /*return*/, commandReturnData];
                    }
                    guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: commandData.guild.id, memberCount: commandData.guild.memberCount, name: commandData.guild.name });
                    return [4 /*yield*/, guildData.getFromDataBase()];
                case 3:
                    _a.sent();
                    itemNameRegExp = /.{1,32}/;
                    selfModRegExp = /\d{1,3}/;
                    oppModRegExp = /-{0,1}\d{1,3}/;
                    itemCostRegExp = /\d{1,10}/;
                    emojiRegExp = /.{1,64}/;
                    if (!(commandData.args[0] === undefined || !itemNameRegExp.test(commandData.args[0]))) return [3 /*break*/, 6];
                    msgString_1 = "------\n**Please enter a valid item name! (!addshopitem = ITEMNAME, SELFMOD, OPPMOD, ITEMCOST, EMOJI)**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString_1)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 4:
                    msg = _a.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 5:
                    _a.sent();
                    return [2 /*return*/, commandReturnData];
                case 6:
                    if (!(commandData.args[1] === undefined || !selfModRegExp.test(commandData.args[1])
                        || parseInt(commandData.args[1], 10) > 100 || parseInt(commandData.args[1], 10) < 0)) return [3 /*break*/, 9];
                    msgString_2 = "------\n**Please enter a valid self-mod value, between 0 and 100! (!addshopitem = ITEMNAME, SELFMOD, OPPMOD, ITEMCOST, EMOJI)**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString_2)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
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
                    if (!(commandData.args[2] === undefined || !oppModRegExp.test(commandData.args[2])
                        || parseInt(commandData.args[2], 10) < -100 || parseInt(commandData.args[2], 10) > 0)) return [3 /*break*/, 12];
                    msgString_3 = "------\n**Please enter a valid opp-mod value between -100 and 0! (!addshopitem = ITEMNAME, SELFMOD, OPPMOD, ITEMCOST, EMOJI)**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString_3)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
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
                    if (!(commandData.args[3] === undefined || !itemCostRegExp.test(commandData.args[3]) || parseInt(commandData.args[3], 10) < 1)) return [3 /*break*/, 15];
                    msgString_4 = "------\n**Please enter a valid item cost!! (!addshopitem = ITEMNAME, SELFMOD, OPPMOD, ITEMCOST, EMOJI)**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString_4)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
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
                    if (!(commandData.args[4] === undefined || !emojiRegExp.test(commandData.args[4]))) return [3 /*break*/, 18];
                    msgString_5 = "------\n**Please enter a valid emoji! (!addshopitem = ITEMNAME, SELFMOD, OPPMOD, ITEMCOST, EMOJI)**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString_5)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 16:
                    msg = _a.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 17:
                    _a.sent();
                    return [2 /*return*/, commandReturnData];
                case 18:
                    itemName = commandData.args[0];
                    selfMod = parseInt(commandData.args[1].match(selfModRegExp)[0], 10);
                    oppMod = parseInt(commandData.args[2].match(oppModRegExp)[0], 10);
                    itemCost = parseInt(commandData.args[3].match(itemCostRegExp)[0], 10);
                    emoji = commandData.args[4];
                    x = 0;
                    _a.label = 19;
                case 19:
                    if (!(x < guildData.guildShop.items.length)) return [3 /*break*/, 23];
                    if (!(itemName === guildData.guildShop.items[x].itemName)) return [3 /*break*/, 22];
                    msgString_6 = "------\n**Sorry, but an item by that name already exists!**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString_6)
                        .setTimestamp(Date())
                        .setTitle('__**Item Issue:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 20:
                    msg = _a.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 21:
                    _a.sent();
                    return [2 /*return*/, commandReturnData];
                case 22:
                    x += 1;
                    return [3 /*break*/, 19];
                case 23:
                    newItem = {
                        itemCost: itemCost,
                        itemName: itemName,
                        selfMod: selfMod,
                        oppMod: oppMod,
                        emoji: emoji
                    };
                    guildData.guildShop.items.push(newItem);
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 24:
                    _a.sent();
                    msgString = '';
                    msgString = msgString + "Good job! You've added a new item to the shop, making it available for purchase by the members of this server!\n"
                        + ("__**The item's stats are as follows**__:\n__Item Name__: " + itemName + "\n__Self-Mod Value__: " + selfMod + "\n__Opp-Mod Value__: " + oppMod + "\n")
                        + ("__Item Cost__: " + itemCost + " " + discordUser.userData.currencyName + "\n__Emoji__: " + emoji);
                    messageEmbed = new Discord.MessageEmbed();
                    messageEmbed.setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setDescription(msgString)
                        .setTimestamp(Date.now())
                        .setTitle('__**New Shop Item Added:**__')
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
