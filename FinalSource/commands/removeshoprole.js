// removeshoprole.ts - Module for my remove shop role command.
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
    name: 'removeshoprole',
    description: '__**Remove Shop Role Usage:**__ !removeshoprole = ROLENAME',
    function: Function()
};
function execute(commandData, discordUser) {
    return __awaiter(this, void 0, void 0, function () {
        var commandReturnData, areWeInADM, doWeHaveAdminPermission, guildData, roleNameRegExp, msgString_1, msgEmbed, msg, roleName, realRoleName, roleID, isRoleFound, x, msgString, roleManager, role, messageEmbed, error_1, messageEmbed, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 17, , 18]);
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
                    doWeHaveAdminPermission = _a.sent();
                    if (doWeHaveAdminPermission === false) {
                        return [2 /*return*/, commandReturnData];
                    }
                    guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: commandData.guild.id, memberCount: commandData.guild.memberCount, name: commandData.guild.name });
                    return [4 /*yield*/, guildData.getFromDataBase()];
                case 3:
                    _a.sent();
                    roleNameRegExp = /.{1,36}/;
                    if (!(commandData.args[0] === undefined || !roleNameRegExp.test(commandData.args[0]))) return [3 /*break*/, 6];
                    msgString_1 = "------\n**Please enter a valid role name! (!removeshoprole = ROLENAME)**\n------";
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
                    roleName = commandData.args[0];
                    realRoleName = '';
                    roleID = '';
                    isRoleFound = Boolean(false);
                    x = 0;
                    _a.label = 7;
                case 7:
                    if (!(x < guildData.guildShop.roles.length)) return [3 /*break*/, 10];
                    if (!(roleName === guildData.guildShop.roles[x].roleName)) return [3 /*break*/, 9];
                    roleID = guildData.guildShop.roles[x].roleID;
                    realRoleName = guildData.guildShop.roles[x].roleName;
                    isRoleFound = true;
                    guildData.guildShop.roles.splice(x, 1);
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 8:
                    _a.sent();
                    return [3 /*break*/, 10];
                case 9:
                    x += 1;
                    return [3 /*break*/, 7];
                case 10:
                    msgString = '';
                    if (isRoleFound === false) {
                        msgString += '------\nThe role could not be found in the guild data cache!\n------';
                    }
                    roleManager = new Discord.RoleManager(commandData.guild);
                    return [4 /*yield*/, roleManager.fetch(roleID)];
                case 11:
                    role = _a.sent();
                    _a.label = 12;
                case 12:
                    _a.trys.push([12, 14, , 16]);
                    role.delete();
                    msgString += "You've just deleted a role from the shop/server!\n------\n__**Role Name:**__ " + realRoleName + "\n------";
                    messageEmbed = new Discord.MessageEmbed();
                    messageEmbed.setDescription(msgString).setTimestamp(Date.now()).setTitle('__**Shop/Server Role Deleted:**__').setColor([255, 0, 0]);
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, messageEmbed)];
                case 13:
                    _a.sent();
                    return [2 /*return*/, commandReturnData];
                case 14:
                    error_1 = _a.sent();
                    msgString = '------\nSorry, but the role was not found in the guild!\n------';
                    messageEmbed = new Discord.MessageEmbed();
                    messageEmbed.setDescription(msgString).setTimestamp(Date.now()).setTitle('__**Shop/Server Role Deleted:**__').setColor([255, 0, 0]);
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, messageEmbed)];
                case 15:
                    _a.sent();
                    return [2 /*return*/, commandReturnData];
                case 16: return [3 /*break*/, 18];
                case 17:
                    error_2 = _a.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            reject(error_2);
                        })];
                case 18: return [2 /*return*/];
            }
        });
    });
}
command.function = execute;
exports.default = command;
