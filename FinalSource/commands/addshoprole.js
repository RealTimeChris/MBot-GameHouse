// addshoprole.ts - Module for adding a shop role.
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
var HelperFunctions_1 = __importDefault(require("../HelperFunctions"));
var command = {
    name: 'addshoprole',
    description: '__**Add Shop Role Usage:**__ !addshoprole = NAME, HEXCOLROVALUE, COST',
    function: Function()
};
function execute(commandData, discordUser) {
    return __awaiter(this, void 0, void 0, function () {
        var commandReturnData, areWeInADM, doWeHaveAdminPermission, guildData, nameRegExp, hexColorRegExp, costRegExp, msgString_1, msgEmbed, msg, msgString_2, msgEmbed, msg, msgString_3, msgEmbed, msg, roleName, roleColor, roleCost, x, msgString_4, msgEmbed, msg, rolePermStrings, roleManager, role, currentRole, msgString, messageEmbed, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 21, , 22]);
                    commandReturnData = {
                        commandName: command.name
                    };
                    commandReturnData.commandName = command.name;
                    return [4 /*yield*/, HelperFunctions_1.default.areWeInADM(commandData)];
                case 1:
                    areWeInADM = _a.sent();
                    if (areWeInADM === true) {
                        return [2 /*return*/, commandReturnData];
                    }
                    return [4 /*yield*/, HelperFunctions_1.default.doWeHaveAdminPermission(commandData, discordUser)];
                case 2:
                    doWeHaveAdminPermission = _a.sent();
                    if (doWeHaveAdminPermission === false) {
                        return [2 /*return*/, commandReturnData];
                    }
                    guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: commandData.guild.id, memberCount: commandData.guild.memberCount, name: commandData.guild.name });
                    return [4 /*yield*/, guildData.getFromDataBase()];
                case 3:
                    _a.sent();
                    nameRegExp = /.{1,36}/;
                    hexColorRegExp = /.{1,24}/;
                    costRegExp = /\d{1,18}/;
                    if (!(commandData.args[0] === undefined || !nameRegExp.test(commandData.args[0]))) return [3 /*break*/, 6];
                    msgString_1 = "------\n**Please enter a proper role name! (!addshoprole = NAME, HEXCOLORVALIE, COST)**\n------";
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
                    if (!(commandData.args[1] === undefined || !hexColorRegExp.test(commandData.args[1]))) return [3 /*break*/, 9];
                    msgString_2 = "------\n**Please enter a valid hex color value! (!addshoprole = NAME, HEXCOLORVALIE, COST)**\n------";
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
                    if (!(commandData.args[2] === undefined || !costRegExp.test(commandData.args[2]) || parseInt(commandData.args[2], 10) <= 0)) return [3 /*break*/, 12];
                    msgString_3 = "------\n**Please enter a valid cost value! (!addshoprole = NAME, HEXCOLORVALIE, COST)**\n------";
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
                    roleName = commandData.args[0].match(nameRegExp)[0];
                    roleColor = commandData.args[1].match(hexColorRegExp)[0];
                    roleCost = parseInt(commandData.args[2].match(costRegExp)[0], 10);
                    x = 0;
                    _a.label = 13;
                case 13:
                    if (!(x < guildData.guildShop.roles.length)) return [3 /*break*/, 17];
                    if (!(roleName.toLowerCase() === guildData.guildShop.roles[x].roleName.toLowerCase())) return [3 /*break*/, 16];
                    msgString_4 = "------\n**Sorry, but a role by that name already exists!**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString_4)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 14:
                    msg = _a.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 15:
                    _a.sent();
                    return [2 /*return*/, commandReturnData];
                case 16:
                    x += 1;
                    return [3 /*break*/, 13];
                case 17:
                    rolePermStrings = [];
                    rolePermStrings[0] = 'CREATE_INSTANT_INVITE';
                    rolePermStrings[1] = 'ADD_REACTIONS';
                    rolePermStrings[2] = 'VIEW_CHANNEL';
                    rolePermStrings[3] = 'SEND_MESSAGES';
                    rolePermStrings[4] = 'CHANGE_NICKNAME';
                    rolePermStrings[5] = 'USE_EXTERNAL_EMOJIS';
                    rolePermStrings[6] = 'CONNECT';
                    rolePermStrings[7] = 'EMBED_LINKS';
                    rolePermStrings[8] = 'ATTACH_FILES';
                    rolePermStrings[9] = 'SPEAK';
                    roleManager = new Discord.RoleManager(commandData.guild);
                    return [4 /*yield*/, roleManager.create({
                            data: {
                                name: roleName,
                                color: roleColor,
                                permissions: rolePermStrings,
                                hoist: true,
                                mentionable: true,
                            },
                        })];
                case 18:
                    role = _a.sent();
                    currentRole = {
                        roleCost: roleCost,
                        roleName: roleName,
                        roleID: role.id
                    };
                    guildData.guildShop.roles.push(currentRole);
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 19:
                    _a.sent();
                    msgString = '';
                    msgString = "" + "Nicely done! You've added a new role to the store's inventory, giving the server access to it!\nIt is as follows:\n------\n"
                        + '__**Role:**__ <@&' + role.id + "> **__Cost__**: " + roleCost + "\n------";
                    messageEmbed = new Discord.MessageEmbed();
                    messageEmbed
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(roleColor)
                        .setDescription(msgString)
                        .setTimestamp(Date.now())
                        .setTitle('__**New Role Added:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, messageEmbed)];
                case 20:
                    _a.sent();
                    return [2 /*return*/, commandReturnData];
                case 21:
                    error_1 = _a.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            reject(error_1);
                        })];
                case 22: return [2 /*return*/];
            }
        });
    });
}
command.function = execute;
exports.default = command;
