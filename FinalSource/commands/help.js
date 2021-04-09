// help.ts - Module for my help command.
// Jan 29, 2021
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
var HelperFunctions_1 = __importDefault(require("../HelperFunctions"));
var CommandIndex_1 = __importDefault(require("../CommandIndex"));
var command = {
    name: 'help',
    description: 'Help Usage: !help, or !help = COMMANDNAME, in order to get help with a specific COMMAND.',
    function: Function()
};
/**
 * Returns a menu of helping information for the various commands I have.
 */
function execute(commandData) {
    return __awaiter(this, void 0, void 0, function () {
        var commandReturnData, commandFiles_1, commandNames_1, currentIndex_1, msgString_1, messageEmbed, dmChannel, msgString_2, msgEmbed, isFound_1, commandDescription_1, commandName_1, msgString, msgEmbed, messageEmbed, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 14, , 15]);
                    commandReturnData = {
                        commandName: command.name
                    };
                    commandFiles_1 = CommandIndex_1.default;
                    if (!(commandData.args[0] === undefined)) return [3 /*break*/, 7];
                    commandNames_1 = [];
                    currentIndex_1 = 0;
                    msgString_1 = '';
                    msgString_1 += '!help = COMMANDNAMEHERE\n\n__**List of command names:**__ ';
                    commandFiles_1.forEach(function (value, key) {
                        commandNames_1[key] = value.name;
                        msgString_1 += commandNames_1[key];
                        currentIndex_1 += 1;
                        if (currentIndex_1 < commandFiles_1.size) {
                            msgString_1 += ', ';
                        }
                    });
                    messageEmbed = new Discord.MessageEmbed();
                    if (commandData.guildMember instanceof Discord.GuildMember) {
                        messageEmbed
                            .setImage(commandData.guildMember.client.user.avatarURL().toString())
                            .setTimestamp(Date())
                            .setAuthor(commandData.guildMember.client.user.username, commandData.guildMember.client.user.avatarURL())
                            .setTitle("__**" + commandData.guildMember.user.username + " Help:**__")
                            .setDescription(msgString_1)
                            .setColor([254, 254, 254]);
                    }
                    else if (commandData.guildMember instanceof Discord.User) {
                        messageEmbed
                            .setImage(commandData.guildMember.client.user.avatarURL().toString())
                            .setTimestamp(Date())
                            .setAuthor(commandData.guildMember.username, commandData.guildMember.avatarURL())
                            .setTitle("__**" + commandData.guildMember.username + " Help:**__")
                            .setDescription(msgString_1)
                            .setColor([254, 254, 254]);
                    }
                    if (!(commandData.guildMember instanceof Discord.User)) return [3 /*break*/, 2];
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, messageEmbed)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 6];
                case 2:
                    if (!(commandData.guildMember instanceof Discord.GuildMember)) return [3 /*break*/, 6];
                    return [4 /*yield*/, commandData.guildMember.user.createDM()];
                case 3:
                    dmChannel = _a.sent();
                    return [4 /*yield*/, dmChannel.send(messageEmbed)];
                case 4:
                    _a.sent();
                    msgString_2 = "------\n**I've sent you help info, via a message!**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([254, 254, 255])
                        .setDescription(msgString_2)
                        .setTimestamp(Date())
                        .setTitle('__**Help:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6: return [2 /*return*/, commandReturnData];
                case 7:
                    isFound_1 = false;
                    commandName_1 = '';
                    commandFiles_1.forEach(function (value) {
                        if (commandData.args[0] === value.name) {
                            isFound_1 = true;
                            commandDescription_1 = value.description;
                            commandName_1 = value.name;
                        }
                    });
                    if (!(isFound_1 === false)) return [3 /*break*/, 9];
                    msgString = "------\n**Sorry, but that command was not found!**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([254, 254, 254])
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Command Issue:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 8:
                    _a.sent();
                    return [2 /*return*/, commandReturnData];
                case 9:
                    if (!(commandDescription_1 instanceof Discord.MessageEmbed)) return [3 /*break*/, 11];
                    commandDescription_1
                        .setAuthor(commandData.guildMember.client.user.username, commandData.guildMember.client.user.avatarURL())
                        .setColor([254, 254, 254])
                        .setTitle("__**" + (commandName_1.charAt(0).toUpperCase() + commandName_1.slice(1)) + " Help:**__")
                        .setTimestamp(Date());
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, commandDescription_1)];
                case 10:
                    _a.sent();
                    return [3 /*break*/, 13];
                case 11:
                    messageEmbed = new Discord.MessageEmbed();
                    if (commandData.guildMember instanceof Discord.GuildMember) {
                        messageEmbed
                            .setDescription(commandDescription_1)
                            .setTimestamp(Date())
                            .setAuthor(commandData.guildMember.client.user.username, commandData.guildMember.client.user.avatarURL())
                            .setTitle("__**" + (commandName_1.charAt(0).toUpperCase() + commandName_1.slice(1)) + " Help:**__")
                            .setColor([254, 254, 254]);
                    }
                    else if (commandData.guildMember instanceof Discord.User) {
                        messageEmbed
                            .setDescription(commandDescription_1)
                            .setTimestamp(Date())
                            .setAuthor(commandData.guildMember.username, commandData.guildMember.avatarURL())
                            .setTitle("__**" + (commandName_1.charAt(0).toUpperCase() + commandName_1.slice(1)) + " Help:**__")
                            .setColor([254, 254, 254]);
                    }
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, messageEmbed)];
                case 12:
                    _a.sent();
                    _a.label = 13;
                case 13: return [2 /*return*/, commandReturnData];
                case 14:
                    error_1 = _a.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            reject(error_1);
                        })];
                case 15: return [2 /*return*/];
            }
        });
    });
}
command.function = execute;
exports.default = command;
