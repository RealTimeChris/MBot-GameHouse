// gamehouseoptions.ts - Module for my "gamehouse options" command.
// Mar 14, 2021
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
    name: 'gamehouseoptions',
    description: '__**GameHouse Options Usage:**__ !gamehouseoptions.',
    function: Function()
};
function execute(commandData, discordUser) {
    return __awaiter(this, void 0, void 0, function () {
        var commandReturnData, areWeInADM, doWeHaveAdminPerms, guildData, msgEmbed, fields, resultIcon, shopItemsField, shopRolesField, gameChannelsField, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
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
                    doWeHaveAdminPerms = _a.sent();
                    if (doWeHaveAdminPerms === false) {
                        return [2 /*return*/, commandReturnData];
                    }
                    guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: commandData.guild.id, memberCount: commandData.guild.memberCount, name: commandData.guild.name });
                    return [4 /*yield*/, guildData.getFromDataBase()];
                case 3:
                    _a.sent();
                    msgEmbed = new Discord.MessageEmbed();
                    msgEmbed
                        .setAuthor(commandData.guildMember.client.user.username, (commandData.guildMember.client.user)
                        .avatarURL())
                        .setTimestamp(Date.now())
                        .setTitle('__**GameHouse Options:**__')
                        .setColor(guildData.borderColor)
                        .setDescription("**Enter '!help = COMMANDNAME to get instructions for each option!**");
                    fields = [];
                    resultIcon = '❌';
                    if (guildData.guildShop.items.length > 0) {
                        resultIcon = '✅';
                    }
                    shopItemsField = { name: '__**Shop Items:**__', value: "__Active:__ " + resultIcon + "\n__Command(s):__ '!addshopitem', '!removeshopitem'", inline: true };
                    fields.push(shopItemsField);
                    resultIcon = '❌';
                    if (guildData.guildShop.roles.length > 0) {
                        resultIcon = '✅';
                    }
                    shopRolesField = { name: '__**Shop Roles:**__', value: "__Active:__ " + resultIcon + "\n__Command(s):__ '!addshoprole', '!removeshoprole'", inline: true };
                    fields.push(shopRolesField);
                    resultIcon = '❌';
                    if (guildData.gameChannelIDs.length > 0) {
                        resultIcon = '✅';
                    }
                    gameChannelsField = { name: '__**Restricted Game Activity To Specific Channels:**__', value: "__Active:__ " + resultIcon + "\n__Command(s):__ '!setgamechannel'", inline: true };
                    fields.push(gameChannelsField);
                    msgEmbed.fields = fields;
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 4:
                    _a.sent();
                    return [2 /*return*/, commandReturnData];
                case 5:
                    error_1 = _a.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            reject(error_1);
                        })];
                case 6: return [2 /*return*/];
            }
        });
    });
}
command.function = execute;
exports.default = command;
