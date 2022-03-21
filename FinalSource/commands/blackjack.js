// blackjack.ts - Module for my blackjack command/game.
// Feb 15, 2021
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
var FoundationClasses_1 = __importDefault(require("../FoundationClasses"));
var GuildData_1 = __importDefault(require("../GuildData"));
var GuildMemberData_1 = __importDefault(require("../GuildMemberData"));
var HelperFunctions_1 = __importDefault(require("../HelperFunctions"));
var command = {
    name: 'blackjack',
    description: '__**Blackjack Usage:**__ !blackjack = BETAMOUNT.',
    function: Function()
};
/**
 * Checks the value of a player's card and adjusts the value of it
 * and the other ace cards if necessary.
 */
function checkAndSetAceValues(playerHand, playerAceIndices) {
    var newPlayerAceIndices = playerAceIndices;
    if (playerHand[playerHand.length - 1].type === 'Ace') {
        newPlayerAceIndices.length += 1;
        newPlayerAceIndices[newPlayerAceIndices.length - 1] = playerHand.length - 1;
    }
    var playerNonAceValue = 0;
    for (var x = 0; x < playerHand.length; x += 1) {
        if (playerHand[x].type !== 'Ace') {
            playerNonAceValue += playerHand[x].value;
        }
    }
    var newPlayerHand = playerHand;
    if (playerNonAceValue + 11 > 21 && newPlayerAceIndices.length > 0) {
        newPlayerHand[newPlayerAceIndices[0]].value = 1;
    }
    else if (playerNonAceValue + 11 <= 21 && playerAceIndices.length > 0) {
        newPlayerHand[playerAceIndices[0]].value = 11;
    }
    for (var x = 0; x < playerAceIndices.length; x += 1) {
        if (x > 0) {
            newPlayerHand[playerAceIndices[x]].value = 1;
        }
    }
}
/**
 * Refreshes a blackjack stack of Cards.
 */
function refreshBlackjackStack(cardStack) {
    var newCardStack = cardStack;
    if (newCardStack.length === 0) {
        newCardStack.length = 312;
        for (var x = 0; x < 6; x += 1) {
            var newDeck = new FoundationClasses_1.default.Deck();
            for (var y = 0; y < 52; y += 1) {
                newCardStack[x * 52 + y] = newDeck.drawRandomcard();
            }
        }
    }
}
/**
 * Draws the next card from a stack of blackjack cards.
 */
function drawNextBlackjackCard(cardStack) {
    if (cardStack.length === 0) {
        refreshBlackjackStack(cardStack);
        var currentCard_1 = cardStack[0];
        cardStack.splice(0, 1);
        return currentCard_1;
    }
    var currentCard = cardStack[0];
    cardStack.splice(0, 1);
    return currentCard;
}
function recurseThroughMessagePages(message, betAmount, userHand, userHandScore, userAceIndices, dealerHand, dealerHandScore, dealerAceIndices, userID, guildMember, guildMemberData, guildData, cardCount, discordUser, functionName) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve) {
                    var filter = function (reaction, user) { return ((reaction.emoji.name === '✅' || reaction.emoji.name === '❎' || reaction.emoji.name === '⏬') && user.id === userID); };
                    var reactionCollector = message.createReactionCollector(filter, { time: 120000 });
                    var newCardCount = cardCount;
                    var newUserHandScore = userHandScore;
                    var newDealerHandScore = dealerHandScore;
                    reactionCollector.on('collect', function (reaction) { return __awaiter(_this, void 0, void 0, function () {
                        var reactionsArray, x, fineAmount, inPlayFooterString, messageEmbed, x, payAmount, x, dealerHandString, x, userHandString, x, bustFooterString, messageEmbed, x, x, dealerHandString, x, userHandString, x, tieFooterString, messageEmbed, payAmount, dealerHandString, x, userHandString, x, winFooterString, messageEmbed, dealerHandString, userHandString, x, inPlayFooterString, messageEmbed, fineAmount, inPlayFooterString, messageEmbed, x, x, x, dealerHandString, x, userHandString, x, payAmount, winFooterString, messageEmbed, tieFooterString, messageEmbed, payAmount, bustFooterString, messageEmbed, fineAmount, reactionsArray, x, targetReaction, failedFooterString, messageEmbed, x, x, x, dealerHandString, x, userHandString, x, payAmount, winFooterString, messageEmbed, tieFooterString, messageEmbed, payAmount, bustFooterString, messageEmbed;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    reaction.users.remove(userID);
                                    reactionCollector.resetTimer({ time: 120000 });
                                    if (cardCount >= 2) {
                                        reactionsArray = message.reactions.cache.array();
                                        for (x = 0; x < reactionsArray.length; x += 1) {
                                            if (reactionsArray[x].emoji.name === '⏬') {
                                                reactionsArray[x].remove();
                                            }
                                        }
                                    }
                                    if (!(reaction.emoji.name === '✅')) return [3 /*break*/, 27];
                                    return [4 /*yield*/, guildMemberData.getFromDataBase()];
                                case 1:
                                    _a.sent();
                                    fineAmount = 0;
                                    fineAmount = 1 * betAmount;
                                    if (!(fineAmount > guildMemberData.currency.wallet)) return [3 /*break*/, 3];
                                    inPlayFooterString = '';
                                    inPlayFooterString = '------\n__***Sorry, but you have insufficient funds for placing that wager now!***__\n------';
                                    messageEmbed = new Discord.MessageEmbed()
                                        .setAuthor(guildMember.user.username, guildMember.user.avatarURL())
                                        .setTimestamp(Date.now()).setColor([255, 0, 0])
                                        .setTitle('__**Blackjack Fail:**__')
                                        .setFooter("Cards Remaining: " + guildData.blackjackStack.length)
                                        .setDescription(message.embeds[0].description);
                                    messageEmbed.fields = [message.embeds[0].fields[0], message.embeds[0].fields[1], { name: '__**Game Status: Failed Wager**__', value: inPlayFooterString, inline: false }];
                                    return [4 /*yield*/, message.edit(messageEmbed)];
                                case 2:
                                    _a.sent();
                                    reactionCollector.stop('close');
                                    resolve(functionName);
                                    return [2 /*return*/];
                                case 3:
                                    newCardCount += 1;
                                    return [4 /*yield*/, guildData.getFromDataBase()];
                                case 4:
                                    _a.sent();
                                    userHand.push(drawNextBlackjackCard(guildData.blackjackStack));
                                    return [4 /*yield*/, guildData.writeToDataBase()];
                                case 5:
                                    _a.sent();
                                    checkAndSetAceValues(userHand, userAceIndices);
                                    newUserHandScore = 0;
                                    for (x = 0; x < userHand.length; x += 1) {
                                        newUserHandScore += userHand[x].value;
                                    }
                                    if (!(newUserHandScore > 21)) return [3 /*break*/, 11];
                                    payAmount = betAmount * -1.0;
                                    return [4 /*yield*/, guildMemberData.getFromDataBase()];
                                case 6:
                                    _a.sent();
                                    guildMemberData.currency.wallet += payAmount;
                                    return [4 /*yield*/, guildMemberData.writeToDataBase()];
                                case 7:
                                    _a.sent();
                                    return [4 /*yield*/, guildData.getFromDataBase()];
                                case 8:
                                    _a.sent();
                                    if (payAmount > guildData.casinoStats.largestBlackjackPayout.amount) {
                                        guildData.casinoStats.largestBlackjackPayout.amount = payAmount;
                                        guildData.casinoStats.largestBlackjackPayout.date = Date();
                                        guildData.casinoStats.largestBlackjackPayout.userID = userID;
                                        guildData.casinoStats.largestBlackjackPayout.username = guildMember.user.username;
                                    }
                                    guildData.casinoStats.totalBlackjackPayout += payAmount;
                                    guildData.casinoStats.totalPayout;
                                    return [4 /*yield*/, guildData.writeToDataBase()];
                                case 9:
                                    _a.sent();
                                    newDealerHandScore = 0;
                                    for (x = 0; x < dealerHand.length; x += 1) {
                                        newDealerHandScore += dealerHand[x].value;
                                    }
                                    dealerHandString = '';
                                    for (x = 0; x < dealerHand.length; x += 1) {
                                        dealerHandString += dealerHand[x].suit + dealerHand[x].type;
                                    }
                                    userHandString = '';
                                    for (x = 0; x < userHand.length; x += 1) {
                                        userHandString += userHand[x].suit + userHand[x].type;
                                    }
                                    bustFooterString = '';
                                    bustFooterString = "------\n__**Your New Wallet Balance:**__ " + guildMemberData.currency.wallet + " " + discordUser.userData.currencyName + "\n------";
                                    messageEmbed = new Discord.MessageEmbed();
                                    messageEmbed
                                        .setAuthor(guildMember.user.username, guildMember.user.avatarURL())
                                        .setTimestamp(Date.now())
                                        .setTitle('__**Blackjack Loss:**__')
                                        .setColor([255, 0, 0])
                                        .setFooter("Cards Remaining: " + guildData.blackjackStack.length)
                                        .setDescription(message.embeds[0].description).fields = [{ name: "Dealer's Hand: (" + newDealerHandScore + ")", value: dealerHandString, inline: true },
                                        { name: "Player's Hand: (" + newUserHandScore + ")", value: userHandString, inline: true }, { name: '__**Game Status: Player Bust**__', value: bustFooterString, inline: false }];
                                    return [4 /*yield*/, message.edit(messageEmbed)];
                                case 10:
                                    _a.sent();
                                    reactionCollector.stop('close');
                                    resolve(functionName);
                                    return [3 /*break*/, 26];
                                case 11:
                                    if (!(newUserHandScore === 21)) return [3 /*break*/, 24];
                                    _a.label = 12;
                                case 12:
                                    if (!(newDealerHandScore < 17)) return [3 /*break*/, 15];
                                    newDealerHandScore = 0;
                                    for (x = 0; x < dealerHand.length; x += 1) {
                                        newDealerHandScore += dealerHand[x].value;
                                    }
                                    if (newDealerHandScore >= 17) {
                                        return [3 /*break*/, 15];
                                    }
                                    return [4 /*yield*/, guildData.getFromDataBase()];
                                case 13:
                                    _a.sent();
                                    dealerHand.push(drawNextBlackjackCard(guildData.blackjackStack));
                                    return [4 /*yield*/, guildData.writeToDataBase()];
                                case 14:
                                    _a.sent();
                                    checkAndSetAceValues(dealerHand, dealerAceIndices);
                                    return [3 /*break*/, 12];
                                case 15:
                                    newDealerHandScore = 0;
                                    for (x = 0; x < dealerHand.length; x += 1) {
                                        newDealerHandScore += dealerHand[x].value;
                                    }
                                    if (!(newDealerHandScore === 21)) return [3 /*break*/, 17];
                                    dealerHandString = '';
                                    for (x = 0; x < dealerHand.length; x += 1) {
                                        dealerHandString += dealerHand[x].suit + dealerHand[x].type;
                                    }
                                    userHandString = '';
                                    for (x = 0; x < userHand.length; x += 1) {
                                        userHandString += userHand[x].suit + userHand[x].type;
                                    }
                                    tieFooterString = '';
                                    tieFooterString = "------\n__**Your Wallet Balance:**__ " + guildMemberData.currency.wallet + " " + discordUser.userData.currencyName + "\n------";
                                    messageEmbed = new Discord.MessageEmbed();
                                    messageEmbed
                                        .setAuthor(guildMember.user.username, guildMember.user.avatarURL())
                                        .setTimestamp(Date.now())
                                        .setTitle('__**Blackjack Tie:**__')
                                        .setColor([0, 0, 255])
                                        .setFooter("Cards Remaining: " + guildData.blackjackStack.length)
                                        .setDescription(message.embeds[0].description).fields = [{ name: "Dealer's Hand: (" + newDealerHandScore + ")", value: dealerHandString, inline: true },
                                        { name: "Player's Hand: (" + newUserHandScore + ")", value: userHandString, inline: true }, { name: '__**Game Status: Tie**__', value: tieFooterString, inline: false }];
                                    return [4 /*yield*/, message.edit(messageEmbed)];
                                case 16:
                                    _a.sent();
                                    reactionCollector.stop('close');
                                    resolve(functionName);
                                    return [3 /*break*/, 23];
                                case 17:
                                    payAmount = betAmount;
                                    return [4 /*yield*/, guildMemberData.getFromDataBase()];
                                case 18:
                                    _a.sent();
                                    guildMemberData.currency.wallet += payAmount;
                                    return [4 /*yield*/, guildMemberData.writeToDataBase()];
                                case 19:
                                    _a.sent();
                                    return [4 /*yield*/, guildData.getFromDataBase()];
                                case 20:
                                    _a.sent();
                                    if (payAmount > guildData.casinoStats.largestBlackjackPayout.amount) {
                                        guildData.casinoStats.largestBlackjackPayout.amount = payAmount;
                                        guildData.casinoStats.largestBlackjackPayout.date = Date();
                                        guildData.casinoStats.largestBlackjackPayout.userID = userID;
                                        guildData.casinoStats.largestBlackjackPayout.username = guildMember.user.username;
                                    }
                                    guildData.casinoStats.totalBlackjackPayout += payAmount;
                                    guildData.casinoStats.totalPayout = payAmount;
                                    return [4 /*yield*/, guildData.writeToDataBase()];
                                case 21:
                                    _a.sent();
                                    dealerHandString = '';
                                    for (x = 0; x < dealerHand.length; x += 1) {
                                        dealerHandString += dealerHand[x].suit + dealerHand[x].type;
                                    }
                                    userHandString = '';
                                    for (x = 0; x < userHand.length; x += 1) {
                                        userHandString += userHand[x].suit + userHand[x].type;
                                    }
                                    winFooterString = '';
                                    winFooterString = "------\n__**Payout Amount:**__ " + payAmount + " " + discordUser.userData.currencyName + "\n__**Your New Wallet Balance:**__ " + guildMemberData.currency.wallet + " " + discordUser.userData.currencyName + "\n------";
                                    messageEmbed = new Discord.MessageEmbed();
                                    messageEmbed
                                        .setAuthor(guildMember.user.username, guildMember.user.avatarURL())
                                        .setTimestamp(Date.now())
                                        .setTitle('__**Blackjack Win:**__')
                                        .setColor([0, 255, 0])
                                        .setFooter("Cards Remaining: " + guildData.blackjackStack.length)
                                        .setDescription(message.embeds[0].description).fields = [{ name: "Dealer's Hand: (" + newDealerHandScore + ")", value: dealerHandString, inline: true },
                                        { name: "Player's Hand: (" + newUserHandScore + ")", value: userHandString, inline: true }, { name: '__**Game Status: Player Wins**__', value: winFooterString, inline: false }];
                                    return [4 /*yield*/, message.edit(messageEmbed)];
                                case 22:
                                    _a.sent();
                                    reactionCollector.stop('close');
                                    resolve(functionName);
                                    _a.label = 23;
                                case 23: return [3 /*break*/, 26];
                                case 24:
                                    if (!(newUserHandScore < 21)) return [3 /*break*/, 26];
                                    newDealerHandScore = dealerHand[0].value;
                                    dealerHandString = '';
                                    dealerHandString += dealerHand[0].suit + dealerHand[0].type;
                                    userHandString = '';
                                    for (x = 0; x < userHand.length; x += 1) {
                                        userHandString += userHand[x].suit + userHand[x].type;
                                    }
                                    inPlayFooterString = '';
                                    inPlayFooterString = '------\n✅ to Hit, ❎ to Stand\n------';
                                    messageEmbed = new Discord.MessageEmbed();
                                    messageEmbed
                                        .setAuthor(guildMember.user.username, guildMember.user.avatarURL())
                                        .setTimestamp(Date.now())
                                        .setTitle('__**Blackjack:**__')
                                        .setColor([0, 0, 255])
                                        .setFooter("Cards Remaining: " + guildData.blackjackStack.length)
                                        .setDescription(message.embeds[0].description).fields = [{ name: "Dealer's Hand: (" + newDealerHandScore + ")", value: dealerHandString, inline: true },
                                        { name: "Player's Hand: (" + newUserHandScore + ")", value: userHandString, inline: true }, { name: '__**Game Status: In Play**__', value: inPlayFooterString, inline: false }];
                                    return [4 /*yield*/, message.edit(messageEmbed)];
                                case 25:
                                    _a.sent();
                                    _a.label = 26;
                                case 26: return [3 /*break*/, 70];
                                case 27:
                                    if (!(reaction.emoji.name === '❎')) return [3 /*break*/, 49];
                                    return [4 /*yield*/, guildMemberData.getFromDataBase()];
                                case 28:
                                    _a.sent();
                                    fineAmount = 0;
                                    fineAmount = 1 * betAmount;
                                    if (!(fineAmount > guildMemberData.currency.wallet)) return [3 /*break*/, 30];
                                    inPlayFooterString = '';
                                    inPlayFooterString = '------\n__***Sorry, but you have insufficient funds for placing that wager now!***__\n------';
                                    messageEmbed = new Discord.MessageEmbed()
                                        .setAuthor(guildMember.user.username, guildMember.user.avatarURL())
                                        .setTimestamp(Date.now()).setColor([255, 0, 0])
                                        .setTitle('__**Blackjack Fail:**__')
                                        .setFooter("Cards Remaining: " + guildData.blackjackStack.length)
                                        .setDescription(message.embeds[0].description);
                                    messageEmbed.fields = [message.embeds[0].fields[0], message.embeds[0].fields[1], { name: '__**Game Status: Failed Wager**__', value: inPlayFooterString, inline: false }];
                                    return [4 /*yield*/, message.edit(messageEmbed)];
                                case 29:
                                    _a.sent();
                                    reactionCollector.stop('close');
                                    resolve(functionName);
                                    return [2 /*return*/];
                                case 30:
                                    newUserHandScore = 0;
                                    for (x = 0; x < userHand.length; x += 1) {
                                        newUserHandScore += userHand[x].value;
                                    }
                                    _a.label = 31;
                                case 31:
                                    if (!(newDealerHandScore < 17)) return [3 /*break*/, 34];
                                    newDealerHandScore = 0;
                                    for (x = 0; x < dealerHand.length; x += 1) {
                                        newDealerHandScore += dealerHand[x].value;
                                    }
                                    if (newDealerHandScore >= 17) {
                                        return [3 /*break*/, 34];
                                    }
                                    return [4 /*yield*/, guildData.getFromDataBase()];
                                case 32:
                                    _a.sent();
                                    dealerHand.push(drawNextBlackjackCard(guildData.blackjackStack));
                                    return [4 /*yield*/, guildData.writeToDataBase()];
                                case 33:
                                    _a.sent();
                                    checkAndSetAceValues(dealerHand, dealerAceIndices);
                                    return [3 /*break*/, 31];
                                case 34:
                                    newDealerHandScore = 0;
                                    for (x = 0; x < dealerHand.length; x += 1) {
                                        newDealerHandScore += dealerHand[x].value;
                                    }
                                    dealerHandString = '';
                                    for (x = 0; x < dealerHand.length; x += 1) {
                                        dealerHandString += dealerHand[x].suit + dealerHand[x].type;
                                    }
                                    userHandString = '';
                                    for (x = 0; x < userHand.length; x += 1) {
                                        userHandString += userHand[x].suit + userHand[x].type;
                                    }
                                    if (!((newUserHandScore === 21 && newDealerHandScore !== 21) || (newUserHandScore < 21
                                        && newUserHandScore > newDealerHandScore) || (newUserHandScore < 21
                                        && newDealerHandScore > 21))) return [3 /*break*/, 40];
                                    payAmount = betAmount;
                                    return [4 /*yield*/, guildData.getFromDataBase()];
                                case 35:
                                    _a.sent();
                                    if (payAmount > guildData.casinoStats.largestBlackjackPayout.amount) {
                                        guildData.casinoStats.largestBlackjackPayout.amount = payAmount;
                                        guildData.casinoStats.largestBlackjackPayout.date = Date();
                                        guildData.casinoStats.largestBlackjackPayout.userID = userID;
                                        guildData.casinoStats.largestBlackjackPayout.username = guildMember.user.username;
                                    }
                                    guildData.casinoStats.totalBlackjackPayout += payAmount;
                                    guildData.casinoStats.totalPayout += payAmount;
                                    return [4 /*yield*/, guildData.writeToDataBase()];
                                case 36:
                                    _a.sent();
                                    return [4 /*yield*/, guildMemberData.getFromDataBase()];
                                case 37:
                                    _a.sent();
                                    guildMemberData.currency.wallet += payAmount;
                                    return [4 /*yield*/, guildMemberData.writeToDataBase()];
                                case 38:
                                    _a.sent();
                                    winFooterString = '';
                                    winFooterString = "------\n__**Payout Amount:**__ " + payAmount + " " + discordUser.userData.currencyName + "\n__**Your New Wallet Balance:**__ " + guildMemberData.currency.wallet + " " + discordUser.userData.currencyName + "\n------";
                                    messageEmbed = new Discord.MessageEmbed();
                                    messageEmbed
                                        .setAuthor(guildMember.user.username, guildMember.user.avatarURL())
                                        .setTimestamp(Date.now())
                                        .setTitle('__**Blackjack Win:**__')
                                        .setColor([0, 255, 0])
                                        .setFooter("Cards Remaining: " + guildData.blackjackStack.length)
                                        .setDescription(message.embeds[0].description).fields = [{ name: "Dealer's Hand: (" + newDealerHandScore + ")", value: dealerHandString, inline: true },
                                        { name: "Player's Hand: (" + newUserHandScore + ")", value: userHandString, inline: true }, { name: '__**Game Status: Player Wins**__', value: winFooterString, inline: false }];
                                    return [4 /*yield*/, message.edit(messageEmbed)];
                                case 39:
                                    _a.sent();
                                    reactionCollector.stop('close');
                                    resolve(functionName);
                                    return [3 /*break*/, 48];
                                case 40:
                                    if (!(newUserHandScore === newDealerHandScore)) return [3 /*break*/, 42];
                                    tieFooterString = '';
                                    tieFooterString = "------\n__**Your Wallet Balance:**__ " + guildMemberData.currency.wallet + " " + discordUser.userData.currencyName + "\n------";
                                    messageEmbed = new Discord.MessageEmbed();
                                    messageEmbed
                                        .setAuthor(guildMember.user.username, guildMember.user.avatarURL())
                                        .setTimestamp(Date.now())
                                        .setTitle('__**Blackjack Tie:**__')
                                        .setColor([0, 0, 255])
                                        .setFooter("Cards Remaining: " + guildData.blackjackStack.length)
                                        .setDescription(message.embeds[0].description).fields = [{ name: "Dealer's Hand: (" + newDealerHandScore + ")", value: dealerHandString, inline: true },
                                        { name: "Player's Hand: (" + newUserHandScore + ")", value: userHandString, inline: true }, { name: '__**Game Status: Tie**__', value: tieFooterString, inline: false }];
                                    return [4 /*yield*/, message.edit(messageEmbed)];
                                case 41:
                                    _a.sent();
                                    reactionCollector.stop('close');
                                    resolve(functionName);
                                    return [3 /*break*/, 48];
                                case 42:
                                    payAmount = -1 * betAmount;
                                    return [4 /*yield*/, guildMemberData.getFromDataBase()];
                                case 43:
                                    _a.sent();
                                    guildMemberData.currency.wallet += payAmount;
                                    return [4 /*yield*/, guildMemberData.writeToDataBase()];
                                case 44:
                                    _a.sent();
                                    return [4 /*yield*/, guildData.getFromDataBase()];
                                case 45:
                                    _a.sent();
                                    if (payAmount > guildData.casinoStats.largestBlackjackPayout.amount) {
                                        guildData.casinoStats.largestBlackjackPayout.amount = payAmount;
                                        guildData.casinoStats.largestBlackjackPayout.date = Date();
                                        guildData.casinoStats.largestBlackjackPayout.userID = userID;
                                        guildData.casinoStats.largestBlackjackPayout.username = guildMember.user.username;
                                    }
                                    guildData.casinoStats.totalBlackjackPayout += payAmount;
                                    guildData.casinoStats.totalPayout += payAmount;
                                    return [4 /*yield*/, guildData.writeToDataBase()];
                                case 46:
                                    _a.sent();
                                    bustFooterString = '';
                                    bustFooterString = "------\n__**Your New Wallet Balance:**__ " + guildMemberData.currency.wallet + " " + discordUser.userData.currencyName + "\n------";
                                    messageEmbed = new Discord.MessageEmbed();
                                    messageEmbed
                                        .setAuthor(guildMember.user.username, guildMember.user.avatarURL())
                                        .setTimestamp(Date.now())
                                        .setTitle('__**Blackjack Loss:**__')
                                        .setColor([255, 0, 0])
                                        .setFooter("Cards Remaining: " + guildData.blackjackStack.length)
                                        .setDescription(message.embeds[0].description).fields = [{ name: "Dealer's Hand: (" + newDealerHandScore + ")", value: dealerHandString, inline: true },
                                        { name: "Player's Hand: (" + newUserHandScore + ")", value: userHandString, inline: true }, { name: '__**Game Status: Player Bust**__', value: bustFooterString, inline: false }];
                                    return [4 /*yield*/, message.edit(messageEmbed)];
                                case 47:
                                    _a.sent();
                                    reactionCollector.stop('close');
                                    resolve(functionName);
                                    _a.label = 48;
                                case 48: return [3 /*break*/, 70];
                                case 49:
                                    if (!(reaction.emoji.name === '⏬')) return [3 /*break*/, 70];
                                    fineAmount = 2 * betAmount;
                                    if (!(fineAmount > guildMemberData.currency.wallet || !(message.embeds[0].fields[2].value.includes('⏬')) || newCardCount > 2)) return [3 /*break*/, 52];
                                    reactionsArray = message.reactions.cache.array();
                                    for (x = 0; x < reactionsArray.length; x += 1) {
                                        if (reactionsArray[x].emoji.name === '⏬') {
                                            targetReaction = reactionsArray[x];
                                            targetReaction.remove();
                                        }
                                    }
                                    failedFooterString = '';
                                    return [4 /*yield*/, guildMemberData.getFromDataBase()];
                                case 50:
                                    _a.sent();
                                    if (!(message.embeds[0].fields[2].value.includes('⏬')) || newCardCount > 2) {
                                        failedFooterString = '__***Sorry, but you do not have the option to double down!***__\n------\n✅ to Hit, ❎ to Stand.\n------';
                                    }
                                    else if (fineAmount > guildMemberData.currency.wallet) {
                                        failedFooterString = '__***Sorry, but you have insufficient funds for placing that wager now!***__\n------\n✅ to Hit, ❎ to Stand.\n------';
                                    }
                                    messageEmbed = new Discord.MessageEmbed()
                                        .setAuthor(guildMember.user.username, guildMember.user.avatarURL())
                                        .setTimestamp(Date.now()).setColor([0, 0, 255])
                                        .setTitle('__**Blackjack:**__')
                                        .setFooter("Cards Remaining: " + guildData.blackjackStack.length)
                                        .setDescription(message.embeds[0].description);
                                    messageEmbed.fields = [message.embeds[0].fields[0], message.embeds[0].fields[1], { name: '__**Game Status: In Play**__', value: failedFooterString, inline: false }];
                                    return [4 /*yield*/, message.edit(messageEmbed)];
                                case 51:
                                    _a.sent();
                                    return [2 /*return*/];
                                case 52:
                                    newCardCount += 1;
                                    return [4 /*yield*/, guildData.getFromDataBase()];
                                case 53:
                                    _a.sent();
                                    userHand.push(drawNextBlackjackCard(guildData.blackjackStack));
                                    return [4 /*yield*/, guildData.writeToDataBase()];
                                case 54:
                                    _a.sent();
                                    checkAndSetAceValues(userHand, userAceIndices);
                                    newUserHandScore = 0;
                                    for (x = 0; x < userHand.length; x += 1) {
                                        newUserHandScore += userHand[x].value;
                                    }
                                    _a.label = 55;
                                case 55:
                                    if (!(newDealerHandScore < 17)) return [3 /*break*/, 58];
                                    newDealerHandScore = 0;
                                    for (x = 0; x < dealerHand.length; x += 1) {
                                        newDealerHandScore += dealerHand[x].value;
                                    }
                                    if (newDealerHandScore >= 17) {
                                        return [3 /*break*/, 58];
                                    }
                                    return [4 /*yield*/, guildData.getFromDataBase()];
                                case 56:
                                    _a.sent();
                                    dealerHand.push(drawNextBlackjackCard(guildData.blackjackStack));
                                    return [4 /*yield*/, guildData.writeToDataBase()];
                                case 57:
                                    _a.sent();
                                    checkAndSetAceValues(dealerHand, dealerAceIndices);
                                    return [3 /*break*/, 55];
                                case 58:
                                    newDealerHandScore = 0;
                                    for (x = 0; x < dealerHand.length; x += 1) {
                                        newDealerHandScore += dealerHand[x].value;
                                    }
                                    dealerHandString = '';
                                    for (x = 0; x < dealerHand.length; x += 1) {
                                        dealerHandString += dealerHand[x].suit + dealerHand[x].type;
                                    }
                                    userHandString = '';
                                    for (x = 0; x < userHand.length; x += 1) {
                                        userHandString += userHand[x].suit + userHand[x].type;
                                    }
                                    if (!((newUserHandScore === 21 && newDealerHandScore !== 21)
                                        || (newUserHandScore < 21 && newUserHandScore > newDealerHandScore)
                                        || (newUserHandScore < 21 && newDealerHandScore > 21))) return [3 /*break*/, 63];
                                    payAmount = 2 * betAmount;
                                    guildMemberData.currency.wallet += payAmount;
                                    return [4 /*yield*/, guildMemberData.writeToDataBase()];
                                case 59:
                                    _a.sent();
                                    return [4 /*yield*/, guildData.getFromDataBase()];
                                case 60:
                                    _a.sent();
                                    if (payAmount > guildData.casinoStats.largestBlackjackPayout.amount) {
                                        guildData.casinoStats.largestBlackjackPayout.amount = payAmount;
                                        guildData.casinoStats.largestBlackjackPayout.date = Date();
                                        guildData.casinoStats.largestBlackjackPayout.userID = userID;
                                        guildData.casinoStats.largestBlackjackPayout.username = guildMember.user.username;
                                    }
                                    guildData.casinoStats.totalBlackjackPayout += payAmount;
                                    guildData.casinoStats.totalPayout += payAmount;
                                    return [4 /*yield*/, guildData.writeToDataBase()];
                                case 61:
                                    _a.sent();
                                    winFooterString = '';
                                    winFooterString = "------\n__**Payout Amount:**__ " + payAmount + " " + discordUser.userData.currencyName + "\n__**Your New Wallet Balance:**__ " + guildMemberData.currency.wallet + " " + discordUser.userData.currencyName + "\n------";
                                    messageEmbed = new Discord.MessageEmbed();
                                    messageEmbed
                                        .setAuthor(guildMember.user.username, guildMember.user.avatarURL())
                                        .setTimestamp(Date.now())
                                        .setTitle('__**Blackjack Win:**__')
                                        .setColor([0, 255, 0])
                                        .setFooter("Cards Remaining: " + guildData.blackjackStack.length)
                                        .setDescription(message.embeds[0].description).fields = [{ name: "Dealer's Hand: (" + newDealerHandScore + ")", value: dealerHandString, inline: true }, { name: "Player's Hand: (" + newUserHandScore + ")", value: userHandString, inline: true }, { name: '__**Game Status: Player Wins**__', value: winFooterString, inline: false }];
                                    return [4 /*yield*/, message.edit(messageEmbed)];
                                case 62:
                                    _a.sent();
                                    reactionCollector.stop('close');
                                    resolve(functionName);
                                    return [3 /*break*/, 70];
                                case 63:
                                    if (!(newUserHandScore === newDealerHandScore)) return [3 /*break*/, 65];
                                    tieFooterString = '';
                                    tieFooterString = "------\n__**Your Wallet Balance:**__ " + guildMemberData.currency.wallet + " " + discordUser.userData.currencyName + "\n------";
                                    messageEmbed = new Discord.MessageEmbed();
                                    messageEmbed
                                        .setAuthor(guildMember.user.username, guildMember.user.avatarURL())
                                        .setTimestamp(Date.now())
                                        .setTitle('__**Blackjack Tie:**__')
                                        .setColor([0, 0, 255])
                                        .setFooter("Cards Remaining: " + guildData.blackjackStack.length)
                                        .setDescription(message.embeds[0].description).fields = [{ name: "Dealer's Hand: (" + newDealerHandScore + ")", value: dealerHandString, inline: true }, { name: "Player's Hand: (" + newUserHandScore + ")", value: userHandString, inline: true }, { name: '__**Game Status: Tie**__', value: tieFooterString, inline: false }];
                                    return [4 /*yield*/, message.edit(messageEmbed)];
                                case 64:
                                    _a.sent();
                                    reactionCollector.stop('close');
                                    resolve(functionName);
                                    return [3 /*break*/, 70];
                                case 65:
                                    payAmount = -2 * betAmount;
                                    guildMemberData.currency.wallet += payAmount;
                                    return [4 /*yield*/, guildMemberData.writeToDataBase()];
                                case 66:
                                    _a.sent();
                                    return [4 /*yield*/, guildData.getFromDataBase()];
                                case 67:
                                    _a.sent();
                                    if (payAmount > guildData.casinoStats.largestBlackjackPayout.amount) {
                                        guildData.casinoStats.largestBlackjackPayout.amount = payAmount;
                                        guildData.casinoStats.largestBlackjackPayout.date = Date();
                                        guildData.casinoStats.largestBlackjackPayout.userID = userID;
                                        guildData.casinoStats.largestBlackjackPayout.username = guildMember.user.username;
                                    }
                                    guildData.casinoStats.totalBlackjackPayout += payAmount;
                                    guildData.casinoStats.totalPayout += payAmount;
                                    return [4 /*yield*/, guildData.writeToDataBase()];
                                case 68:
                                    _a.sent();
                                    bustFooterString = '';
                                    bustFooterString = "------\n__**Your New Wallet Balance:**__ " + guildMemberData.currency.wallet + " " + discordUser.userData.currencyName + "\n------";
                                    messageEmbed = new Discord.MessageEmbed();
                                    messageEmbed
                                        .setAuthor(guildMember.user.username, guildMember.user.avatarURL())
                                        .setTimestamp(Date.now())
                                        .setTitle('__**Blackjack Loss:**__')
                                        .setColor([255, 0, 0])
                                        .setFooter("Cards Remaining: " + guildData.blackjackStack.length)
                                        .setDescription(message.embeds[0].description).fields = [{ name: "Dealer's Hand: (" + newDealerHandScore + ")", value: dealerHandString, inline: true }, { name: "Player's Hand: (" + newUserHandScore + ")", value: userHandString, inline: true }, { name: '__**Game Status: Player Bust**__', value: bustFooterString, inline: false }];
                                    return [4 /*yield*/, message.edit(messageEmbed)];
                                case 69:
                                    _a.sent();
                                    reactionCollector.stop('close');
                                    _a.label = 70;
                                case 70: return [2 /*return*/];
                            }
                        });
                    }); });
                    reactionCollector.on('end', function (collected, reason) { return __awaiter(_this, void 0, void 0, function () {
                        var tieFooterString, messageEmbed;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!(reason !== 'close')) return [3 /*break*/, 4];
                                    tieFooterString = '';
                                    tieFooterString = '------\n__**Your game has timed out!**__\n------';
                                    messageEmbed = new Discord.MessageEmbed();
                                    messageEmbed
                                        .setAuthor(guildMember.user.username, guildMember.user.avatarURL())
                                        .setTimestamp(Date.now())
                                        .setTitle('__**Blackjack Timed Out:**__')
                                        .setColor([255, 0, 0])
                                        .setFooter("Cards Remaining: " + guildData.blackjackStack.length)
                                        .setDescription(tieFooterString);
                                    return [4 /*yield*/, guildData.writeToDataBase()];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, guildMemberData.writeToDataBase()];
                                case 2:
                                    _a.sent();
                                    return [4 /*yield*/, message.edit(messageEmbed)];
                                case 3:
                                    _a.sent();
                                    _a.label = 4;
                                case 4: return [4 /*yield*/, guildMemberData.writeToDataBase()];
                                case 5:
                                    _a.sent();
                                    return [4 /*yield*/, guildData.writeToDataBase()];
                                case 6:
                                    _a.sent();
                                    message.reactions.removeAll();
                                    return [2 /*return*/, functionName];
                            }
                        });
                    }); });
                })];
        });
    });
}
function execute(commandData, discordUser) {
    var _a, _b, _c, _d;
    return __awaiter(this, void 0, void 0, function () {
        var commandReturnData, areWeInADM, areWeAllowed, guildData, msgString, msgEmbed, msg, betRegExp, msgString, msgEmbed, msg, betAmount, userID, guildMemberData, msgString, msgEmbed, msg, finalMessageEmbed, finalMsgString, x, footerMsgString, userHand, userAceIndices, userHandScore, dealerHand, dealerAceIndices, newDealerHandScore, footerMsgString2_1, payAmount, footerMsgString2, newMessage, newCardCount, error_1;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _e.trys.push([0, 30, , 31]);
                    commandReturnData = {
                        commandName: command.name
                    };
                    return [4 /*yield*/, HelperFunctions_1.default.areWeInADM(commandData)];
                case 1:
                    areWeInADM = _e.sent();
                    if (areWeInADM === true) {
                        return [2 /*return*/, commandReturnData];
                    }
                    return [4 /*yield*/, HelperFunctions_1.default.checkIfAllowedInChannel(commandData, discordUser)];
                case 2:
                    areWeAllowed = _e.sent();
                    if (areWeAllowed === false) {
                        return [2 /*return*/, commandReturnData];
                    }
                    guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: commandData.guild.id, memberCount: commandData.guild.memberCount, name: commandData.guild.name });
                    return [4 /*yield*/, guildData.getFromDataBase()];
                case 3:
                    _e.sent();
                    if (!!((_b = commandData.fromTextChannel.permissionsFor((_a = commandData.guild) === null || _a === void 0 ? void 0 : _a.client.user)) === null || _b === void 0 ? void 0 : _b.has('MANAGE_MESSAGES'))) return [3 /*break*/, 6];
                    msgString = "------\n**I need the Manage Messages permission in this channel, for this game!**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Permissions Issue:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 4:
                    msg = _e.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 5:
                    _e.sent();
                    return [2 /*return*/, commandReturnData];
                case 6:
                    betRegExp = /\d{1,18}/;
                    if (!(commandData.args[0] === undefined || !betRegExp.test(commandData.args[0]) || parseInt(commandData.args[0], 10) < 1)) return [3 /*break*/, 9];
                    msgString = "------\n**Please enter a valid bet amount! (!blackjack = BETAMOUNT)**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 7:
                    msg = _e.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 8:
                    _e.sent();
                    return [2 /*return*/, commandReturnData];
                case 9:
                    betAmount = parseInt(commandData.args[0].match(betRegExp)[0], 10);
                    userID = (_c = commandData.guildMember) === null || _c === void 0 ? void 0 : _c.id;
                    guildMemberData = new GuildMemberData_1.default({ dataBase: discordUser.dataBase, id: userID, guildId: commandData.guild.id,
                        userName: commandData.guildMember.user.username, displayName: commandData.guildMember.displayName });
                    return [4 /*yield*/, guildMemberData.getFromDataBase()];
                case 10:
                    _e.sent();
                    if (!(betAmount > guildMemberData.currency.wallet)) return [3 /*break*/, 13];
                    msgString = "------\n**Sorry, but you have insufficient funds for placing that wager!**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor((_d = commandData.guildMember) === null || _d === void 0 ? void 0 : _d.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Funds:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 11:
                    msg = _e.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 12:
                    _e.sent();
                    return [2 /*return*/, commandReturnData];
                case 13:
                    finalMessageEmbed = new Discord.MessageEmbed();
                    finalMsgString = '';
                    for (x = 0; x < 2; x += 1) {
                        finalMsgString = "__**Your Bet Amount:**__ " + betAmount + " " + discordUser.userData.currencyName + "\n";
                    }
                    footerMsgString = '';
                    footerMsgString = '------\n✅ to Hit, ❎ to Stand.\n------';
                    return [4 /*yield*/, guildData.getFromDataBase()];
                case 14:
                    _e.sent();
                    userHand = [];
                    userAceIndices = [];
                    userHand.push(drawNextBlackjackCard(guildData.blackjackStack));
                    checkAndSetAceValues(userHand, userAceIndices);
                    userHand.push(drawNextBlackjackCard(guildData.blackjackStack));
                    checkAndSetAceValues(userHand, userAceIndices);
                    userHandScore = userHand[0].value + userHand[1].value;
                    dealerHand = [];
                    dealerAceIndices = [];
                    dealerHand.push(drawNextBlackjackCard(guildData.blackjackStack));
                    checkAndSetAceValues(dealerHand, dealerAceIndices);
                    dealerHand.push(drawNextBlackjackCard(guildData.blackjackStack));
                    checkAndSetAceValues(dealerHand, dealerAceIndices);
                    newDealerHandScore = dealerHand[0].value;
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 15:
                    _e.sent();
                    if ((userHandScore === 9) || (userHandScore === 10) || (userHandScore === 11)) {
                        footerMsgString = footerMsgString.slice(0, footerMsgString.length - 8) + ", \u23EC to Double Down.\n------";
                    }
                    if (!(userHandScore === 21)) return [3 /*break*/, 23];
                    if (dealerHand[0].value === 10 && dealerHand[1].type === 'Ace') {
                        dealerHand[1].value = 11;
                    }
                    else if (dealerHand[1].value === 10 && dealerHand[0].type === 'Ace') {
                        dealerHand[0].value = 11;
                    }
                    newDealerHandScore = dealerHand[0].value + dealerHand[1].value;
                    if (!(newDealerHandScore === 21)) return [3 /*break*/, 17];
                    footerMsgString2_1 = "\n------\n__**Your Wallet Balance:**__ " + guildMemberData.currency.wallet + " " + discordUser.userData.currencyName + "\n------";
                    finalMessageEmbed
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setTimestamp(Date.now())
                        .setColor([0, 0, 255])
                        .setTitle('__**Blackjack Tie:**__')
                        .setDescription(finalMsgString)
                        .setFooter("Cards Remaining: " + guildData.blackjackStack.length);
                    finalMessageEmbed.fields = [{ name: "Dealer's Hand: (" + newDealerHandScore + ")", value: dealerHand[0].suit + dealerHand[0].type + dealerHand[1].suit + dealerHand[1].type, inline: true },
                        { name: "Player's Hand: (" + userHandScore + ")", value: userHand[0].suit + userHand[0].type + userHand[1].suit + userHand[1].type, inline: true }, { name: '__**Game Status: Tie**__', value: footerMsgString2_1, inline: false }];
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, finalMessageEmbed)];
                case 16:
                    _e.sent();
                    return [2 /*return*/, commandReturnData];
                case 17: return [4 /*yield*/, guildMemberData.getFromDataBase()];
                case 18:
                    _e.sent();
                    payAmount = Math.trunc(1.5 * betAmount);
                    guildMemberData.currency.wallet += payAmount;
                    return [4 /*yield*/, guildMemberData.writeToDataBase()];
                case 19:
                    _e.sent();
                    return [4 /*yield*/, guildData.getFromDataBase()];
                case 20:
                    _e.sent();
                    if (payAmount > guildData.casinoStats.largestBlackjackPayout.amount) {
                        guildData.casinoStats.largestBlackjackPayout.amount = payAmount;
                        guildData.casinoStats.largestBlackjackPayout.date = Date();
                        guildData.casinoStats.largestBlackjackPayout.userID = userID;
                        guildData.casinoStats.largestBlackjackPayout.username = commandData.guildMember.user.username;
                    }
                    guildData.casinoStats.totalBlackjackPayout += payAmount;
                    guildData.casinoStats.totalPayout;
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 21:
                    _e.sent();
                    footerMsgString2 = "\n------\n__**Payout Amount:**__ " + payAmount + " " + discordUser.userData.currencyName + "\n__**Your New Wallet Balance:**__ " + guildMemberData.currency.wallet + " " + discordUser.userData.currencyName + "\n------";
                    finalMessageEmbed
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setTimestamp(Date.now())
                        .setColor([0, 255, 0])
                        .setTitle('__**Blackjack Win:**__')
                        .setDescription(finalMsgString)
                        .setFooter("Cards Remaining: " + guildData.blackjackStack.length);
                    finalMessageEmbed.fields = [{ name: "Dealer's Hand: (" + newDealerHandScore + ")", value: dealerHand[0].suit + dealerHand[0].type + dealerHand[1].suit + dealerHand[1].type, inline: true },
                        { name: "Player's Hand: (" + userHandScore + ")", value: userHand[0].suit + userHand[0].type + userHand[1].suit + userHand[1].type, inline: true }, { name: '__**Game Status: Player Wins**__', value: footerMsgString2, inline: false }];
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, finalMessageEmbed)];
                case 22:
                    _e.sent();
                    return [2 /*return*/, commandReturnData];
                case 23:
                    finalMessageEmbed
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setTimestamp(Date.now())
                        .setColor([0, 0, 255])
                        .setTitle('__**Blackjack:**__')
                        .setDescription(finalMsgString)
                        .setFooter("Cards Remaining: " + guildData.blackjackStack.length);
                    finalMessageEmbed.fields = [{ name: "Dealer's Hand: (" + newDealerHandScore + ")", value: dealerHand[0].suit + dealerHand[0].type, inline: true },
                        { name: "Player's Hand: (" + userHandScore + ")", value: userHand[0].suit + userHand[0].type + userHand[1].suit + userHand[1].type, inline: true }, { name: '__**Game Status: In Play**__', value: footerMsgString, inline: false }];
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, finalMessageEmbed)];
                case 24:
                    newMessage = _e.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        newMessage = new Discord.Message(commandData.guildMember.client, newMessage, commandData.fromTextChannel);
                    }
                    newCardCount = 2;
                    return [4 /*yield*/, newMessage.react('✅')];
                case 25:
                    _e.sent();
                    return [4 /*yield*/, newMessage.react('❎')];
                case 26:
                    _e.sent();
                    if (!(newCardCount === 2 && (newMessage.embeds[0].fields[2].value.includes('⏬')))) return [3 /*break*/, 28];
                    return [4 /*yield*/, newMessage.react('⏬')];
                case 27:
                    _e.sent();
                    _e.label = 28;
                case 28: return [4 /*yield*/, recurseThroughMessagePages(newMessage, betAmount, userHand, userHandScore, userAceIndices, dealerHand, newDealerHandScore, dealerAceIndices, userID, commandData.guildMember, guildMemberData, guildData, newCardCount, discordUser, command.name)];
                case 29:
                    _e.sent();
                    return [2 /*return*/, commandReturnData];
                case 30:
                    error_1 = _e.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            reject(error_1);
                        })];
                case 31: return [2 /*return*/];
            }
        });
    });
}
command.function = execute;
exports.default = command;
