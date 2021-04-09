// setbordercolor.ts - Module for my "set border color" command.
// Apr 3, 2021
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
    name: 'setbordercolor',
    description: '__**Set Border Color Usage:**__ Sets the default color of the borders of the chat messages sent out by this bot! ' +
        '!setbordercolor = BOTNAME, BOTCOLORREDCHANNEL, BOTCOLORGREENCHANNEL, BOTCOLORBLUECHANNEL where botcolor is an array of 3 color values between 0 and 255.',
    function: Function()
};
function execute(commandData, discordUser) {
    return __awaiter(this, void 0, void 0, function () {
        var commandReturnData, areWeInADM, guildData, borderColor, msgString, msgEmbed_1, msgString, msgEmbed_2, msgString, msgEmbed_3, msgString, msgEmbed_4, msgEmbed, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 15, , 16]);
                    commandReturnData = {
                        commandName: command.name
                    };
                    return [4 /*yield*/, HelperFunctions_1.default.areWeInADM(commandData)];
                case 1:
                    areWeInADM = _a.sent();
                    if (areWeInADM) {
                        return [2 /*return*/, commandReturnData];
                    }
                    guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: commandData.guild.id, memberCount: commandData.guild.memberCount, name: commandData.guild.name });
                    return [4 /*yield*/, guildData.getFromDataBase()];
                case 2:
                    _a.sent();
                    borderColor = [];
                    if (!(commandData.args[0] === undefined || (commandData.args[0].toLowerCase() !== 'janny' && commandData.args[0].toLowerCase() !== 'gamehouse' && commandData.args[0] !== 'musichouse'))) return [3 /*break*/, 4];
                    msgString = "------\n**Please, enter a bot's name as the first argument to this command! (!setbordercolor = BOTNAME, BOTCOLORREDCHANNEL, BOTCOLORGREENCHANNEL, BOTCOLORBLUECHANNEL)**\n------";
                    msgEmbed_1 = new Discord.MessageEmbed();
                    msgEmbed_1
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle("__**Missing Or Invalid Arguments:**__");
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed_1)];
                case 3:
                    _a.sent();
                    return [2 /*return*/, commandReturnData];
                case 4:
                    if (commandData.args[0].toLowerCase() !== 'gamehouse') {
                        return [2 /*return*/, commandReturnData];
                    }
                    _a.label = 5;
                case 5:
                    if (!(parseInt(commandData.args[1], 10) > 255 || parseInt(commandData.args[1], 10) < 0 || commandData.args[1] === undefined)) return [3 /*break*/, 7];
                    msgString = "------\n**Please, enter a red-channel value between 0 and 255! (!setbordercolor = BOTNAME, BOTCOLORREDCHANNEL, BOTCOLORGREENCHANNEL, BOTCOLORBLUECHANNEL)**\n------";
                    msgEmbed_2 = new Discord.MessageEmbed();
                    msgEmbed_2
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle("__**Missing Or Invalid Arguments:**__");
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed_2)];
                case 6:
                    _a.sent();
                    return [2 /*return*/, commandReturnData];
                case 7:
                    if (!(parseInt(commandData.args[2], 10) > 255 || parseInt(commandData.args[2], 10) < 0 || commandData.args[2] === undefined)) return [3 /*break*/, 9];
                    msgString = "------\n**Please, enter a green-channel value between 0 and 255! (!setbordercolor = BOTNAME, BOTCOLORREDCHANNEL, BOTCOLORGREENCHANNEL, BOTCOLORBLUECHANNEL)**\n------";
                    msgEmbed_3 = new Discord.MessageEmbed();
                    msgEmbed_3
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle("__**Missing Or Invalid Arguments:**__");
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed_3)];
                case 8:
                    _a.sent();
                    return [2 /*return*/, commandReturnData];
                case 9:
                    if (!(parseInt(commandData.args[3], 10) > 255 || parseInt(commandData.args[3], 10) < 0 || commandData.args[3] === undefined)) return [3 /*break*/, 11];
                    msgString = "------\n**Please, enter a green-channel value between 0 and 255! (!setbordercolor = BOTNAME, BOTCOLORREDCHANNEL, BOTCOLORGREENCHANNEL, BOTCOLORBLUECHANNEL)**\n------";
                    msgEmbed_4 = new Discord.MessageEmbed();
                    msgEmbed_4
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle("__**Missing Or Invalid Arguments:**__");
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed_4)];
                case 10:
                    _a.sent();
                    return [2 /*return*/, commandReturnData];
                case 11:
                    borderColor[0] = parseInt(commandData.args[1], 10);
                    if (borderColor[0] === 255) {
                        borderColor[0] = 254;
                    }
                    borderColor[1] = parseInt(commandData.args[2], 10);
                    if (borderColor[1] === 255) {
                        borderColor[1] = 254;
                    }
                    borderColor[2] = parseInt(commandData.args[3], 10);
                    if (borderColor[2] === 255) {
                        borderColor[2] = 254;
                    }
                    _a.label = 12;
                case 12:
                    guildData.borderColor = borderColor;
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 13:
                    _a.sent();
                    msgEmbed = new Discord.MessageEmbed();
                    msgEmbed
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription("Nicely done, you've updated the default border color for this bot!\n------\n__**Border Color Values:**__ " + guildData.borderColor + "\n------")
                        .setTimestamp(Date())
                        .setTitle('__**Updated Border Color:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 14:
                    _a.sent();
                    return [2 /*return*/, commandReturnData];
                case 15:
                    error_1 = _a.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            reject(error_1);
                        })];
                case 16: return [2 /*return*/];
            }
        });
    });
}
command.function = execute;
exports.default = command;
