// IndexFunctions.ts - Module for my "Index functions".
// Apr 7, 2021
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
var FoundationClasses_1 = __importDefault(require("./FoundationClasses"));
var CommandIndex_1 = __importDefault(require("./CommandIndex"));
var IndexFunctions;
(function (IndexFunctions) {
    function onHeartBeat(client, discordUser) {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, discordUser.updateDataCacheAndSaveToFile(client)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    }
    IndexFunctions.onHeartBeat = onHeartBeat;
    function onReady(client, discordUser, eventEmitter) {
        return __awaiter(this, void 0, void 0, function () {
            var error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, discordUser.initializeInstance(client)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, client.user.setPresence({ status: 'online', activity: { name: '!help for commands!', type: 'STREAMING' } })];
                    case 2:
                        _a.sent();
                        eventEmitter.emit('HeartBeat');
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        console.log(error_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    IndexFunctions.onReady = onReady;
    function onMessage(msg, client, discordUser) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function () {
            var command, args, x, commandData, cmdName, error_3, error_4, command, cmdName, error_5, error_6;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        if (client.users.resolve(msg.author.id) === null) {
                            console.log('Non-found user! Better escape!');
                            return [2 /*return*/];
                        }
                        if (msg.author.id === ((_a = client.user) === null || _a === void 0 ? void 0 : _a.id)) {
                            console.log('Better not track our own messages!');
                            return [2 /*return*/];
                        }
                        if (!msg.content.startsWith(discordUser.userData.prefix)) return [3 /*break*/, 13];
                        command = '';
                        args = [];
                        if (msg.content.indexOf(' =') === -1) {
                            command = msg.content.slice(discordUser.userData.prefix.length).split(/ +/, 3)[0].trim().toLowerCase();
                        }
                        else {
                            command = msg.content.slice(discordUser.userData.prefix.length).substring(0, msg.content.indexOf(' =')).trim().toLowerCase();
                            args = msg.content.slice(discordUser.userData.prefix.length).substring(msg.content.indexOf(' =') + 2).split(',');
                            for (x = 0; x < args.length; x += 1) {
                                args[x] = args[x].trim();
                            }
                        }
                        if (!CommandIndex_1.default.has(command)) {
                            return [2 /*return*/];
                        }
                        _e.label = 1;
                    case 1:
                        _e.trys.push([1, 11, , 12]);
                        commandData = new FoundationClasses_1.default.CommandData();
                        if (!(msg.channel.type !== 'dm' && msg.member !== null)) return [3 /*break*/, 3];
                        return [4 /*yield*/, commandData.initialize(client, msg.channel.id, msg.channel.type, null, msg.member.id, msg.guild.id)];
                    case 2:
                        _e.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, commandData.initialize(client, msg.channel.id, msg.channel.type, null, msg.author.id)];
                    case 4:
                        _e.sent();
                        _e.label = 5;
                    case 5:
                        commandData.args = args;
                        if (!msg.deletable) return [3 /*break*/, 7];
                        return [4 /*yield*/, msg.delete()];
                    case 6:
                        _e.sent();
                        _e.label = 7;
                    case 7:
                        _e.trys.push([7, 9, , 10]);
                        console.log("Command: '" + command + "' entered by user: " + msg.author.username);
                        return [4 /*yield*/, ((_b = CommandIndex_1.default.get(command)) === null || _b === void 0 ? void 0 : _b.function(commandData, discordUser))];
                    case 8:
                        cmdName = _e.sent();
                        console.log("Completed Command: " + cmdName.commandName);
                        return [3 /*break*/, 10];
                    case 9:
                        error_3 = _e.sent();
                        console.log(error_3);
                        msg.reply('There was an error trying to execute that command!');
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/];
                    case 11:
                        error_4 = _e.sent();
                        console.log(error_4);
                        return [3 /*break*/, 12];
                    case 12: return [3 /*break*/, 20];
                    case 13:
                        if (!(msg.author.id !== ((_c = client.user) === null || _c === void 0 ? void 0 : _c.id))) return [3 /*break*/, 20];
                        command = 'message';
                        if (!CommandIndex_1.default.has(command)) {
                            return [2 /*return*/];
                        }
                        _e.label = 14;
                    case 14:
                        _e.trys.push([14, 19, , 20]);
                        _e.label = 15;
                    case 15:
                        _e.trys.push([15, 17, , 18]);
                        console.log("Standard message entered: " + msg.author.username);
                        return [4 /*yield*/, ((_d = CommandIndex_1.default.get(command)) === null || _d === void 0 ? void 0 : _d.function(msg, discordUser))];
                    case 16:
                        cmdName = _e.sent();
                        console.log("Completed Command: " + cmdName);
                        return [3 /*break*/, 18];
                    case 17:
                        error_5 = _e.sent();
                        console.log(error_5);
                        msg.reply('There was an error trying to process that message!');
                        return [3 /*break*/, 18];
                    case 18: return [2 /*return*/];
                    case 19:
                        error_6 = _e.sent();
                        console.log(error_6);
                        return [3 /*break*/, 20];
                    case 20: return [2 /*return*/];
                }
            });
        });
    }
    IndexFunctions.onMessage = onMessage;
    function onInteractionCreate(interaction, client, discordUser) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var channel_id, channel, id_full, guild_id_full, options_full, name_full, commandData, id, guild_id, _b, options, name_1, id, guild_id, _c, options, name_2, nameSolid, itemName, itemSelfMod, itemOppMod, itemCost, itemEmoji, roleName, roleColor, roleCost, user, name_3, objectName, betAmount, betAmount, value1, depositAmount, name_4, betAmount, user, value, user, objectName, user, itemName, roleName, targetUser, betAmount, betType, betOptions, amount, targetBalance, targetUser, redChannelValue, greenChannelValue, blueChannelValue, betAmount, amount, user, amount, returnData;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        channel_id = interaction.channel_id;
                        return [4 /*yield*/, client.channels.fetch(channel_id)];
                    case 1:
                        channel = _d.sent();
                        commandData = new FoundationClasses_1.default.CommandData();
                        return [4 /*yield*/, channel.type];
                    case 2:
                        if (!((_d.sent()) === 'dm')) return [3 /*break*/, 4];
                        id = interaction.user.id, guild_id = interaction.guild_id, _b = interaction.data, options = _b.options, name_1 = _b.name;
                        id_full = id;
                        guild_id_full = guild_id;
                        options_full = options;
                        name_full = name_1;
                        return [4 /*yield*/, commandData.initialize(client, channel_id, channel.type, interaction, id_full)];
                    case 3:
                        _d.sent();
                        return [3 /*break*/, 6];
                    case 4:
                        id = interaction.member.user.id, guild_id = interaction.guild_id, _c = interaction.data, options = _c.options, name_2 = _c.name;
                        id_full = id;
                        guild_id_full = guild_id;
                        options_full = options;
                        name_full = name_2;
                        return [4 /*yield*/, commandData.initialize(client, channel_id, channel.type, interaction, id_full, guild_id_full)];
                    case 5:
                        _d.sent();
                        _d.label = 6;
                    case 6:
                        nameSolid = name_full;
                        if (name_full === 'addshopitem') {
                            itemName = options_full[0].value;
                            itemSelfMod = options_full[1].value;
                            itemOppMod = options_full[2].value;
                            itemCost = options_full[3].value;
                            itemEmoji = options_full[4].value;
                            commandData.args[0] = itemName;
                            commandData.args[1] = itemSelfMod.toString();
                            commandData.args[2] = itemOppMod.toString();
                            commandData.args[3] = itemCost.toString();
                            commandData.args[4] = itemEmoji;
                        }
                        if (name_full === 'addshoprole') {
                            roleName = options_full[0].value;
                            roleColor = options_full[1].value;
                            roleCost = options_full[2].value;
                            commandData.args[0] = roleName;
                            commandData.args[1] = roleColor;
                            commandData.args[2] = roleCost.toString();
                        }
                        if (name_full === 'balance') {
                            if (options_full !== undefined) {
                                user = options_full[0].value;
                                console.log(user);
                                commandData.args[0] = user;
                            }
                        }
                        if (name_full === 'botinfo') {
                            name_3 = 'gamehouse';
                            commandData.args[0] = name_3;
                        }
                        if (name_full === 'buy') {
                            objectName = options_full[0].value;
                            commandData.args[0] = objectName;
                        }
                        if (name_full === 'blackjack') {
                            betAmount = options_full[0].value;
                            commandData.args[0] = betAmount.toString();
                        }
                        if (name_full === 'casinostats') {
                        }
                        if (name_full === 'coinflip') {
                            betAmount = options_full[0].value;
                            commandData.args[0] = betAmount.toString();
                        }
                        if (name_full === "deletedbentry") {
                            value1 = options_full[0].value;
                            commandData.args[0] = 'gamehouse';
                            commandData.args[1] = value1;
                        }
                        if (name_full === 'deposit') {
                            depositAmount = options_full[0].value;
                            commandData.args[0] = depositAmount.toString();
                        }
                        if (name_full === "displayguildsdata") {
                            name_4 = 'gamehouse';
                            commandData.args[0] = name_4;
                        }
                        if (name_full === 'duel') {
                            betAmount = options_full[0].value;
                            user = options_full[1].value;
                            commandData.args[0] = betAmount.toString();
                            commandData.args[1] = user;
                        }
                        if (name_full === 'gamehouseoptions') {
                        }
                        if (name_full === 'help') {
                            if (options_full[0].options !== undefined) {
                                value = options_full[0].options[0].value;
                                commandData.args[0] = value;
                            }
                        }
                        if (name_full == 'inventory') {
                            if (options_full !== undefined) {
                                user = options_full[0].value;
                                commandData.args[0] = user;
                            }
                        }
                        if (name_full === 'leaderboard') {
                        }
                        if (name_full === 'listdbguilds') {
                            commandData.args[0] = 'gamehouse';
                        }
                        if (name_full === 'removeobject') {
                            objectName = options_full[0].value;
                            commandData.args[0] = objectName;
                            if (options_full[1] !== undefined) {
                                user = options_full[1].value;
                                commandData.args[1] = user;
                            }
                        }
                        if (name_full === 'removeshopitem') {
                            itemName = options_full[0].value;
                            commandData.args[0] = itemName;
                        }
                        if (name_full === 'removeshoprole') {
                            roleName = options_full[0].value;
                            commandData.args[0] = roleName;
                        }
                        if (name_full === 'rob') {
                            targetUser = options_full[0].value;
                            commandData.args[0] = targetUser;
                        }
                        if (name_full === 'roulette') {
                            name_full = options_full[0].name;
                            if (name_full === 'start') {
                                commandData.args[0] = 'start';
                            }
                            else if (name_full === 'bet1' || name_full === 'bet2') {
                                betAmount = options_full[0].options[0].value;
                                betType = options_full[0].options[1].value;
                                betOptions = void 0;
                                if (options_full[0].options[2] !== undefined) {
                                    betOptions = options_full[0].options[2].value;
                                    commandData.args[3] = betOptions.toString();
                                    console.log(commandData.args[3]);
                                }
                                commandData.args[0] = 'bet';
                                commandData.args[1] = betAmount.toString();
                                commandData.args[2] = betType;
                            }
                        }
                        if (name_full === 'selldrugs') {
                        }
                        if (name_full === 'setbalance') {
                            amount = options_full[0].value;
                            targetBalance = options_full[1].value;
                            commandData.args[0] = amount.toString();
                            commandData.args[1] = targetBalance;
                            if (options_full[2] !== undefined) {
                                targetUser = options_full[2].value;
                                commandData.args[2] = targetUser;
                            }
                        }
                        if (name_full === 'setbordercolor') {
                            commandData.args[0] = 'gamehouse';
                            redChannelValue = options_full[0].value;
                            greenChannelValue = options_full[1].value;
                            blueChannelValue = options_full[2].value;
                            commandData.args[1] = redChannelValue.toString();
                            commandData.args[2] = greenChannelValue.toString();
                            commandData.args[3] = blueChannelValue.toString();
                        }
                        if (name_full === 'setgamechannel') {
                            name_full = options_full[0].name;
                            if (name_full === 'display') {
                            }
                            else if (name_full === 'add') {
                                commandData.args[0] = 'add';
                            }
                            else if (name_full === 'remove') {
                                commandData.args[0] = 'remove';
                            }
                            else if (name_full === 'purge') {
                                commandData.args[0] = 'purge';
                            }
                        }
                        if (name_full === 'shop') {
                        }
                        if (name_full === 'slashcommands') {
                        }
                        if (name_full === 'slots') {
                            betAmount = options_full[0].value;
                            commandData.args[0] = betAmount.toString();
                        }
                        if (name_full === 'test') {
                        }
                        if (name_full === 'transfer') {
                            amount = options_full[0].value;
                            user = options_full[1].value;
                            commandData.args[0] = amount.toString();
                            commandData.args[1] = user;
                        }
                        if (name_full === 'withdraw') {
                            amount = options_full[0].value;
                            commandData.args[0] = amount;
                        }
                        return [4 /*yield*/, client.api.interactions(interaction.id, interaction.token).callback.post({
                                data: {
                                    type: 5
                                }
                            })];
                    case 7:
                        _d.sent();
                        if (commandData.guildMember instanceof Discord.GuildMember) {
                            console.log("Command: '" + nameSolid + "' entered by user: " + commandData.guildMember.user.username);
                        }
                        else if (commandData.guildMember instanceof Discord.User) {
                            console.log("Command: '" + nameSolid + "' entered by user: " + commandData.guildMember.username);
                        }
                        return [4 /*yield*/, ((_a = CommandIndex_1.default.get(nameSolid)) === null || _a === void 0 ? void 0 : _a.function(commandData, discordUser))];
                    case 8:
                        returnData = _d.sent();
                        console.log("Completed Command: " + returnData.commandName);
                        return [2 /*return*/];
                }
            });
        });
    }
    IndexFunctions.onInteractionCreate = onInteractionCreate;
})(IndexFunctions || (IndexFunctions = {}));
exports.default = IndexFunctions;
