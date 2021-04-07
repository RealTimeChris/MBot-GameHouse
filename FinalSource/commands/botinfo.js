// botinfo.ts - Module for my display user data function.
// Jan 30, 2021
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
var command = {
    name: 'botinfo',
    description: '!botinfo to display info about this bot in chat!',
    function: Function()
};
/**
* Displays the data about the currend user.
*/
function execute(commandData, discordUser) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    return __awaiter(this, void 0, void 0, function () {
        var commandReturnData, msgString, msgEmbed, msg, fields, field1, field2, field3, field4, messageEmbed, error_1;
        return __generator(this, function (_j) {
            switch (_j.label) {
                case 0:
                    _j.trys.push([0, 5, , 6]);
                    commandReturnData = {
                        commandName: command.name
                    };
                    if (!(((_a = commandData.args[0]) === null || _a === void 0 ? void 0 : _a.toLowerCase()) !== 'janny' && ((_b = commandData.args[0]) === null || _b === void 0 ? void 0 : _b.toLowerCase()) !== 'musichouse' && ((_c = commandData.args[0]) === null || _c === void 0 ? void 0 : _c.toLowerCase()) !== 'gamehouse')) return [3 /*break*/, 3];
                    msgString = '------\n**Please, enter the name of a bot as the first argument! (!displayguildsdata = BOTNAME)**\n------';
                    msgEmbed = new Discord.MessageEmbed();
                    msgEmbed
                        .setAuthor(discordUser.userData.userName, (_e = (_d = commandData.guildMember) === null || _d === void 0 ? void 0 : _d.client.users.resolve(discordUser.userData.userID)) === null || _e === void 0 ? void 0 : _e.avatarURL())
                        .setColor([254, 254, 254])
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle("__**Invalid Or Missing Arguments:**__");
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 1:
                    msg = _j.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 2:
                    _j.sent();
                    _j.label = 3;
                case 3:
                    if (((_f = commandData.args[0]) === null || _f === void 0 ? void 0 : _f.toLowerCase()) !== 'gamehouse') {
                        return [2 /*return*/, commandReturnData];
                    }
                    commandReturnData.commandName = command.name;
                    fields = [];
                    field1 = { name: '__Bot Name:__', value: discordUser.userData.userName, inline: true };
                    fields.push(field1);
                    field2 = { name: '__Bot ID:__', value: discordUser.userData.userID, inline: true };
                    fields.push(field2);
                    field3 = { name: '__Guild Count:__', value: discordUser.userData.guildCount.toString(), inline: true };
                    fields.push(field3);
                    field4 = { name: '__Currency Name:__', value: discordUser.userData.currencyName, inline: true };
                    fields.push(field4);
                    messageEmbed = new Discord.MessageEmbed()
                        .setImage((_h = (_g = commandData.guildMember) === null || _g === void 0 ? void 0 : _g.client.user) === null || _h === void 0 ? void 0 : _h.avatarURL())
                        .setColor([254, 254, 254])
                        .setTitle('__**Bot Info:**__')
                        .setTimestamp(Date());
                    messageEmbed.fields = fields;
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, messageEmbed)];
                case 4:
                    _j.sent();
                    return [2 /*return*/, commandReturnData];
                case 5:
                    error_1 = _j.sent();
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
