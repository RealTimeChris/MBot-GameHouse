// CommandIndex.ts - Module for my commands index.
// Mar 24, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import FoundationClasses from './FoundationClasses';

const botCommands = new Map<string, FoundationClasses.BotCommand>();
import addshopitem from './commands/addshopitem';
botCommands.set(addshopitem.name, addshopitem);
import addshoprole from './commands/addshoprole';
botCommands.set(addshoprole.name, addshoprole);
import balance from './commands/balance';
botCommands.set(balance.name, balance);
import blackjack from './commands/blackjack';
botCommands.set(blackjack.name, blackjack);
import botinfo from './commands/botinfo';
botCommands.set(botinfo.name, botinfo);
import buy from './commands/buy';
botCommands.set(buy.name, buy);
import casinostats from './commands/casinostats';
botCommands.set(casinostats.name, casinostats);
import coinflip from './commands/coinflip';
botCommands.set(coinflip.name, coinflip);
import deletedbentry from './commands/deletedbentry';
botCommands.set(deletedbentry.name, deletedbentry);
import deposit from './commands/deposit';
botCommands.set(deposit.name, deposit);
import displayguildsdata from './commands/displayguildsdata';
botCommands.set(displayguildsdata.name, displayguildsdata);
import duel from './commands/duel';
botCommands.set(duel.name, duel);
import gamehouseoptions from './commands/gamehouseoptions';
botCommands.set(gamehouseoptions.name, gamehouseoptions);
import help from './commands/help';
botCommands.set(help.name, help);
import inventory from './commands/inventory';
botCommands.set(inventory.name, inventory);
import leaderboard from './commands/leaderboard';
botCommands.set(leaderboard.name, leaderboard);
import listdbguilds from './commands/listdbguilds';
botCommands.set(listdbguilds.name, listdbguilds);
import message from './commands/message';
botCommands.set(message.name, message);
import removeobject from './commands/removeobject';
botCommands.set(removeobject.name, removeobject);
import removeshopitem from './commands/removeshopitem';
botCommands.set(removeshopitem.name, removeshopitem);
import removeshoprole from './commands/removeshoprole';
botCommands.set(removeshoprole.name, removeshoprole);
import rob from './commands/rob';
botCommands.set(rob.name, rob);
import roulette from './commands/roulette';
botCommands.set(roulette.name, roulette);
import selldrugs from './commands/selldrugs'
botCommands.set(selldrugs.name, selldrugs);
import setbalance from './commands/setbalance';
botCommands.set(setbalance.name, setbalance);
import setbordercolor from './commands/setbordercolor';
botCommands.set(setbordercolor.name, setbordercolor);
import setgamechannel from './commands/setgamechannel';
botCommands.set(setgamechannel.name, setgamechannel);
import shop from './commands/shop';
botCommands.set(shop.name, shop);
import slashcommands from './commands/slashcommands';
botCommands.set(slashcommands.name, slashcommands);
import slots from './commands/slots';
botCommands.set(slots.name, slots);
import test from './commands/test';
botCommands.set(test.name, test);
import transfer from './commands/transfer';
botCommands.set(transfer.name, transfer);
import withdraw from './commands/withdraw';
botCommands.set(withdraw.name, withdraw);

export default botCommands as Map<string, FoundationClasses.BotCommand>;
