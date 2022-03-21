// roulette.ts - Module for my roulette game command!
// Feb 10, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import EventEmitter from 'events';
import FoundationClasses from '../FoundationClasses';
import DiscordUser from '../DiscordUser';
import GuildData from '../GuildData';
import GuildMemberData from '../GuildMemberData';
import HelperFunctions from '../HelperFunctions';

const descEmbed = new Discord.MessageEmbed();
let msgString1 = '';
msgString1 = '\n__**Roulette Usage:**__ !roulette = start to begin a game, and then !roulette = bet, BETAMOUNT, BETTYPE, BETOPTIONS to bet on it!\n__Where BETTYPE and BETOPTIONS are as follows:__\n```isbl\n'
+ 'Bet Type/Payout:     Bet Options:\n'
+ '------------------------------------------------------------'
+ '\n0        / 35:1  |'
+ '\n00       / 35:1  |'
+ '\nstraight / 35:1  |A single number to choose.'
+ '\nrow      / 17:1  |'
+ '\nsplit    / 17:1  |The first of two consecutive numbers.'
+ '\nstreet   / 11:1  |The first of threee consecutive numbers.'
+ '\nbasket   / 6:1   |'
+ '\nsixline  / 5:1   |The first of six consecutive numbers.'
+ '\n1stcolumn/ 2:1   |'
+ '\n2ndcolumn/ 2:1   |'
+ '\n3rdcolumn/ 2:1   |'
+ '\n1stdozen / 2:1   |'
+ '\n2nddozen / 2:1   |'
+ '\n3rddozen / 2:1   |'
+ '\nodd      / 1:1   |'
+ '\neven     / 1:1   |'
+ '\nred      / 1:1   |'
+ '\nblack    / 1:1   |'
+ '\n1to18    / 1:1   |'
+ '\n19to36   / 1:1   |```';

descEmbed.setDescription(msgString1);

const command: FoundationClasses.BotCommand = {
	name: 'roulette',
	description: descEmbed,
	function: Function()
};

/**
 * Takes an input number string and returns a string with the color value added to the front.
 */
async function getNumberString(inputString: string, redNumbers: string[], blackNumbers: string[]) {
	let returnString = '';
	for (let x = 0; x < redNumbers.length; x += 1) {
		if (redNumbers[x]!.includes(inputString)) {
			if (redNumbers[x]!.substring(12) === inputString) {
				returnString = redNumbers[x]!;
			}
		}
	}
	for (let x = 0; x < blackNumbers.length; x += 1) {
		if (blackNumbers[x]!.includes(inputString)) {
			if (blackNumbers[x]!.substring(20) === inputString) {
				returnString = blackNumbers[x]!;
			}
		}
	}
	if (inputString === '0') {
		returnString = ':green_square:0';
	} else if (inputString === '00') {
		returnString = ':green_square:00';
	}
	return returnString;
}

async function calculateResults(finalRoll: string, commandData: FoundationClasses.CommandData, discordUser: DiscordUser,
	redNumbers: string[], blackNumbers: string[]) {
	
	let msgStringFinal: string = '';
	const finalRollString = await getNumberString(finalRoll.toString(), redNumbers, blackNumbers);
	msgStringFinal += `------\n__**Final Roll:**__ ${finalRollString}\n------\n`;
	const guildData = new GuildData({dataBase: discordUser.dataBase, name: commandData.guild!.name, id: commandData.guild!.id, memberCount: commandData.guild!.memberCount});
	await guildData.getFromDataBase();
	const currentGuild = await commandData.guild?.client.guilds.fetch(commandData.guild.id);
	for (let x = 0; x < guildData.rouletteGame.bets.length; x += 1) {
		let isItAWinner = false;
		const currentGuildMember = await currentGuild?.members.fetch(guildData.rouletteGame.bets[x]!.userID);
		const guildMemberData = new GuildMemberData({dataBase: discordUser.dataBase, displayName: currentGuildMember!.displayName, guildId: commandData.guild!.id, 
			id: guildData.rouletteGame.bets[x]!.userID, userName: currentGuildMember?.user.username!});
		await guildMemberData.getFromDataBase();
		msgStringFinal += `__**<@!${(guildMemberData.id)}>**__: `;
		const betAmount = guildData.rouletteGame.bets[x]!.betAmount;
		let payoutAmount = guildData.rouletteGame.bets[x]!.payoutAmount;
		const winningNumbers = guildData.rouletteGame.bets[x]!.winningNumbers;
			for (let x = 0; x < winningNumbers.length; x += 1) {
				if (finalRoll === (37).toString()) {
					finalRoll = '00';
				}
				if (await getNumberString(finalRoll.toString(), redNumbers,
					blackNumbers) === winningNumbers[x]?.toString()) {
					isItAWinner = true;
					break;
				}
			}
			if (isItAWinner === false) {
				payoutAmount = -betAmount;
			}
			if (betAmount > guildMemberData.currency.wallet) {
				if (guildData.rouletteGame.bets[x]?.betOptions !== undefined) {
					msgStringFinal += `__**NSF:**__ Non-sufficient funds!  __**Bet:**__ ${guildData.rouletteGame.bets[x]?.betAmount} ${discordUser.userData.currencyName} __**On:**__ ` +
					`${guildData.rouletteGame.bets[x]?.betType}, ${guildData.rouletteGame.bets[x]?.betOptions}\n`;
				}
				else{
					msgStringFinal += `__**NSF:**__ Non-sufficient funds! __**Bet:**__ ${guildData.rouletteGame.bets[x]?.betAmount} ${discordUser.userData.currencyName} __**On:**__ ` +
					`${guildData.rouletteGame.bets[x]?.betType}\n`;
				}
			}
			else{
				if (payoutAmount > guildData.casinoStats!.largestRoulettePayout.amount) {
					guildData.casinoStats.largestRoulettePayout.amount = payoutAmount;
					guildData.casinoStats.largestRoulettePayout.date = Date();
					guildData.casinoStats.largestRoulettePayout.userID = guildMemberData.id;
					guildData.casinoStats.largestRoulettePayout.username = guildMemberData.userName;
				}
				guildData.casinoStats.totalRoulettePayout += payoutAmount;
				guildData.casinoStats.totalPayout += payoutAmount;
				guildMemberData.currency.wallet += payoutAmount;
				await guildMemberData.writeToDataBase();
				
				if (guildData.rouletteGame.bets[x]?.betOptions !== undefined) {
					msgStringFinal += `${payoutAmount.toString()} ${discordUser.userData.currencyName} __**Bet:**__ ${guildData.rouletteGame.bets[x]?.betAmount} ${discordUser.userData.currencyName} __**On:**__ ` +
					`${guildData.rouletteGame.bets[x]?.betType}, ${guildData.rouletteGame.bets[x]?.betOptions}\n`;
				}
				else{
					msgStringFinal += `${payoutAmount.toString()} ${discordUser.userData.currencyName} __**Bet:**__ ${guildData.rouletteGame.bets[x]?.betAmount} ${discordUser.userData.currencyName} __**On:**__ ` +
					`${guildData.rouletteGame.bets[x]?.betType}\n`;
				}
			}
	}
	msgStringFinal += '------';
	let msgEmbed = new Discord.MessageEmbed();
	msgEmbed
		.setAuthor(commandData.guild!.client.user!.username, commandData.guild!.client.user!.avatarURL()!)
		.setDescription(msgStringFinal)
		.setTitle('__**Roulette Results:**__')
		.setTimestamp(Date() as unknown as Date)
		.setColor([0, 0, 255]);
	await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
	guildData.rouletteGame.currentlySpinning = false;
	guildData.rouletteGame.bets = [];
	await guildData.writeToDataBase();
	return;
}

async function execute(commandData: FoundationClasses.CommandData, discordUser: DiscordUser): Promise<FoundationClasses.CommandReturnData> {
	try {
			const commandReturnData: FoundationClasses.CommandReturnData = {
				commandName: command.name
			};
			
			const areWeInADM = await HelperFunctions.areWeInADM(commandData);

			if (areWeInADM === true) {
				return commandReturnData;
			}

			const areWeAllowed = await HelperFunctions.checkIfAllowedInChannel(commandData, discordUser);

			if (areWeAllowed === false) {
				return commandReturnData;
			}

			const guildData = new GuildData({dataBase: discordUser.dataBase, id: commandData.guild!.id, memberCount: commandData.guild!.memberCount, name: commandData.guild!.name});
			await guildData.getFromDataBase();

			let whatAreWeDoing;
			let betAmount;
			let betType: string;
			let betOptions;
			if (commandData.args[0] === undefined) {
				const msgString = `------\n**Please, enter either 'start' or 'bet  as the first argument! (!roulette = bet, BETAMOUNT, BETTYPE, BETOPTIONS)**\n------`;
				let msgEmbed = new Discord.MessageEmbed()
					.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
					.setColor(guildData.borderColor as [number, number, number])
					.setDescription(msgString)
					.setTimestamp(Date() as unknown as Date)
					.setTitle('__**Missing Or Invalid Arguments:**__');
				let msg = await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
				if (commandData.toTextChannel instanceof Discord.WebhookClient) {
					msg = new Discord.Message(commandData.guild!.client, msg, commandData.fromTextChannel!);
				}
				await msg.delete({timeout: 20000});
				return commandReturnData;
			}
			if (commandData.args[0]!.toLowerCase() !== 'start' && (commandData.args[0]!).toLowerCase() !== 'bet') {
				const msgString = `------\n**Please, enter either a 'start' or 'bet' as the first arguments! (!roulette = bet, BETAMOUNT, BETTYPE, BETOPTIONS)**\n------`;
				let msgEmbed = new Discord.MessageEmbed()
					.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
					.setColor(guildData.borderColor as [number, number, number])
					.setDescription(msgString)
					.setTimestamp(Date() as unknown as Date)
					.setTitle('__**Missing Or Invalid Arguments:**__');
				let msg = await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
				if (commandData.toTextChannel instanceof Discord.WebhookClient) {
					msg = new Discord.Message(commandData.guild!.client, msg, commandData.fromTextChannel!);
				}
					await msg.delete({timeout: 20000});
				return commandReturnData;
			}
			else if (commandData.args[0]!.toLowerCase() === 'start') {
				await guildData.getFromDataBase();
				if (guildData.rouletteGame.currentlySpinning === true) {
					const msgString = `------\n**Please, wait until the current game is over, before starting another one!**\n------`;
					let msgEmbed = new Discord.MessageEmbed()
						.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
						.setColor(guildData.borderColor as [number, number, number])
						.setDescription(msgString)
						.setTimestamp(Date() as unknown as Date)
						.setTitle('__**Game Issue:**__');
					let msg = await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
					if (commandData.toTextChannel instanceof Discord.WebhookClient) {
						msg = new Discord.Message(commandData.guild!.client, msg, commandData.fromTextChannel!);
					}
					await msg.delete({timeout: 20000});
					return commandReturnData;
				}
				whatAreWeDoing = 'start';
			}
			else if (commandData.args[0]!.toLowerCase() === 'bet') {
				await guildData.getFromDataBase();
				if (guildData.rouletteGame.currentlySpinning ===  false) {
					const msgString = `------\n**Please, start a roulette game before placing any bets!**\n------`;
					let msgEmbed = new Discord.MessageEmbed()
						.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
						.setColor(guildData.borderColor as [number, number, number])
						.setDescription(msgString)
						.setTimestamp(Date() as unknown as Date)
						.setTitle('__**Game Issue:**__');
					let msg = await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
					if (commandData.toTextChannel instanceof Discord.WebhookClient) {
						msg = new Discord.Message(commandData.guild!.client, msg, commandData.fromTextChannel!);
					}
					await msg.delete({timeout: 20000});
					return commandReturnData;
				}
				whatAreWeDoing = 'bet';
			}			
			if (parseInt(commandData.args[1]?.toString()!, 10) <= 0) {
				const msgString = `------\n**Please, enter a valid betting amount! (!roulette = bet, BETAMOUNT, BETTYPE, BETOPTIONS)**\n------`;
				let msgEmbed = new Discord.MessageEmbed()
					.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
					.setColor(guildData.borderColor as [number, number, number])
					.setDescription(msgString)
					.setTimestamp(Date() as unknown as Date)
					.setTitle('__**Missing Or Invalid Arguments:**__');
				let msg = await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
				if (commandData.toTextChannel instanceof Discord.WebhookClient) {
					msg = new Discord.Message(commandData.guild!.client, msg, commandData.fromTextChannel!);
				}
				await msg.delete({timeout: 20000});
				return commandReturnData;
			}
			else {
				betAmount = parseInt(commandData.args[1]?.toString()!, 10);
			}

			const digitRegExp = /\d{1,18}/;
			const betTypes = ['0', '00', 'straight', 'row', 'split', 'street', 'basket', 'sixline', '1stcolumn', '2ndcolumn', '3rdcolumn', '1stdozen', '2nddozen', '3rddozen', 'odd', 'even', 'red', 'black', '1to18', '19to36'];
			let redNumbers: string[] = [];
			redNumbers = [':red_square:32', ':red_square:19', ':red_square:21', ':red_square:25', ':red_square:34', ':red_square:27', ':red_square:36', ':red_square:30', ':red_square:23', ':red_square:5',
				':red_square:16', ':red_square:1', ':red_square:14', ':red_square:9', ':red_square:18', ':red_square:7', ':red_square:12', ':red_square:3'];
			let blackNumbers: string[] = [];
			blackNumbers = [':black_large_square:15', ':black_large_square:4', ':black_large_square:2', ':black_large_square:17', ':black_large_square:6', ':black_large_square:13', ':black_large_square:11', ':black_large_square:8', ':black_large_square:10',
				':black_large_square:24', ':black_large_square:33', ':black_large_square:20', ':black_large_square:31', ':black_large_square:22', ':black_large_square:29', ':black_large_square:28', ':black_large_square:35', ':black_large_square:26'];

			if (whatAreWeDoing === 'bet') {

				const guildMemberData = new GuildMemberData({dataBase: discordUser.dataBase, id: commandData.guildMember!.id, guildId: commandData.guild!.id,
					userName: (commandData.guildMember as Discord.GuildMember)!.user.username, displayName: (commandData.guildMember as Discord.GuildMember).displayName});
				await guildMemberData.getFromDataBase();

				let currentBetAmount: number = 0;

				for (let x = 0; x < guildData.rouletteGame.bets.length; x += 1) {
					if (guildMemberData.id === guildData.rouletteGame.bets[x]?.userID) {
						const number = guildData.rouletteGame.bets[x]?.betAmount;
						currentBetAmount += number!;
					}
				}

				if ((currentBetAmount + betAmount) > guildMemberData.currency.wallet) {
					const msgString = `------\n**Sorry, but you have insufficient funds in your wallet for placing that bet!**\n------`;
					let msgEmbed = new Discord.MessageEmbed()
						.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
						.setColor(guildData.borderColor as [number, number, number])
						.setDescription(msgString)
						.setTimestamp(Date() as unknown as Date)
						.setTitle('__**Insufficient Funds:**__');
					let msg = await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
					if (commandData.toTextChannel instanceof Discord.WebhookClient) {
						msg = new Discord.Message(commandData.guild!.client, msg, commandData.fromTextChannel!);
					}
					await msg.delete({timeout: 20000});
					return commandReturnData;
				}

				let isValidType = false;
				for (let x = 0; x < betTypes.length; x += 1) {
					if (commandData.args[2] !== undefined && commandData.args[2].toLowerCase() === betTypes[x]) {
						isValidType = true;
						break;
					}
				}
		
				if (isValidType === false) {
					const msgString = `------\n**Please enter a valid bet type! Enter '!help = roulette' for more info! (!roulette = BETAMOUNT, BETTYPE, BETOPTIONS)**\n------`;
					let msgEmbed = new Discord.MessageEmbed()
						.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
						.setColor(guildData.borderColor as [number, number, number])
						.setDescription(msgString)
						.setTimestamp(Date() as unknown as Date)
						.setTitle('__**Missing Or Invalid Arguments:**__');
					let msg = await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
					if (commandData.toTextChannel instanceof Discord.WebhookClient) {
					msg = new Discord.Message(commandData.guild!.client, msg, commandData.fromTextChannel!);
					}
					await msg.delete({timeout: 20000});
					return commandReturnData;
				}
				else {
					betType = commandData.args[2]!;
				}
			
				betOptions = commandData.args[3];

				let payoutAmount = 0;
				let winningNumbers: string[] = [];
				switch (betType!) {
					case '0':
						winningNumbers[0] = ':green_square:0';
						payoutAmount = betAmount * 35;
						break;
					case '00':
						winningNumbers[0] = ':green_square:00';
						payoutAmount = betAmount * 35;
						break;
					case 'red':
						payoutAmount = betAmount;
						winningNumbers = redNumbers;
						break;
					case 'black':
						payoutAmount = betAmount;
						winningNumbers = blackNumbers;
						break;
					case 'straight':
						payoutAmount = betAmount * 35;
						if (commandData.args[3] === undefined || !digitRegExp.test(commandData.args[3]) || !digitRegExp.test(commandData.args[3])) {
							const msgString = `------\n**Please enter a valid value from the roulette wheel! (1-36)**\n------`;
							let msgEmbed = new Discord.MessageEmbed()
								.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
								.setColor(guildData.borderColor as [number, number, number])
								.setDescription(msgString)
								.setTimestamp(Date() as unknown as Date)
								.setTitle('__**Missing Or Invalid Arguments:**__');
							let msg = await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
							if (commandData.toTextChannel instanceof Discord.WebhookClient) {
								msg = new Discord.Message(commandData.guild!.client, msg, commandData.fromTextChannel!);
							}
							await msg.delete({timeout: 20000});
							return commandReturnData;
						}
				
						if (parseInt(commandData.args[3].toString().match(digitRegExp)![0]!, 10) < 1
						|| parseInt(((commandData.args[3].toString().match(digitRegExp) as string[])[0] as string), 10) > 36) {
							const msgString = `------\n**Please enter a value between 1 and 36!**\n------`;
							let msgEmbed = new Discord.MessageEmbed()
								.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
								.setColor(guildData.borderColor as [number, number, number])
								.setDescription(msgString)
								.setTimestamp(Date() as unknown as Date)
								.setTitle('__**Missing Or Invalid Arguments:**__');
							let msg = await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
							if (commandData.toTextChannel instanceof Discord.WebhookClient) {
								msg = new Discord.Message(commandData.guild!.client, msg, commandData.fromTextChannel!);
							}
							await msg.delete({timeout: 20000});
							return commandReturnData;
						}
				
						winningNumbers[0] = await getNumberString(commandData.args[3], redNumbers, blackNumbers);
				
						break;
					case 'row':
						payoutAmount = betAmount * 17;
						winningNumbers[0] = ':green_square:0';
						winningNumbers[1] = ':green_square:00';
						break;
					case 'split':
						payoutAmount = betAmount * 17;
						if (commandData.args[3] === undefined || !digitRegExp.test(commandData.args[3]) || !digitRegExp.test(commandData.args[3])) {
							const msgString = `------\n**Please enter a valid starting value for your split! (1-35)**\n------`;
							let msgEmbed = new Discord.MessageEmbed()
								.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
								.setColor(guildData.borderColor as [number, number, number])
								.setDescription(msgString)
								.setTimestamp(Date() as unknown as Date)
								.setTitle('__**Missing Or Invalid Arguments:**__');
							let msg = await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
							if (commandData.toTextChannel instanceof Discord.WebhookClient) {
								msg = new Discord.Message(commandData.guild!.client, msg, commandData.fromTextChannel!);
							}
							await msg.delete({timeout: 20000});
							return commandReturnData;
						}
				
						if (parseInt(commandData.args[3].toString().match(digitRegExp)![0]!, 10) < 1
						|| parseInt(commandData.args[3].toString().match(digitRegExp)![0]!, 10) > 35) {
							const msgString = `-------\n**Please enter a value between 1 and 35!**\n------`;
							let msgEmbed = new Discord.MessageEmbed()
								.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
								.setColor(guildData.borderColor as [number, number, number])
								.setDescription(msgString)
								.setTimestamp(Date() as unknown as Date)
								.setTitle('__**Missing Or Invalid Arguments:**__');
							let msg = await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
							if (commandData.toTextChannel instanceof Discord.WebhookClient) {
								msg = new Discord.Message(commandData.guild!.client, msg, commandData.fromTextChannel!);
							}
							await msg.delete({timeout: 20000});
							return commandReturnData;
						}
				
						winningNumbers[0] = await getNumberString(commandData.args[3], redNumbers, blackNumbers);
						winningNumbers[1] = await getNumberString((parseInt(commandData.args[3], 10) + 1)
							.toString(), redNumbers, blackNumbers);
				
						break;
					case 'street':
						payoutAmount = betAmount * 11;
						if (commandData.args[3] === undefined || !digitRegExp.test(commandData.args[3]) || !digitRegExp.test(commandData.args[3])) {
							const msgString = `------\n**Please enter a valid starting value for your street! (1-34)**\n------`;
							let msgEmbed = new Discord.MessageEmbed()
								.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
								.setColor(guildData.borderColor as [number, number, number])
								.setDescription(msgString)
								.setTimestamp(Date() as unknown as Date)
								.setTitle('__**Missing Or Invalid Arguments:**__');
							let msg = await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
							if (commandData.toTextChannel instanceof Discord.WebhookClient) {
								msg = new Discord.Message(commandData.guild!.client, msg, commandData.fromTextChannel!);
							}
							await msg.delete({timeout: 20000});
							return commandReturnData;
						}
				
						if (parseInt(commandData.args[3].toString().match(digitRegExp)![0]!, 10) < 1
						|| parseInt(commandData.args[3].toString().match(digitRegExp)![0]!, 10) > 34) {
							const msgString = `-------\n**Please enter a value between 1 and 34!**\n------`;
							let msgEmbed = new Discord.MessageEmbed()
								.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
								.setColor(guildData.borderColor as [number, number, number])
								.setDescription(msgString)
								.setTimestamp(Date() as unknown as Date)
								.setTitle('__**Missing Or Invalid Arguments:**__');
							let msg = await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
							if (commandData.toTextChannel instanceof Discord.WebhookClient) {
								msg = new Discord.Message(commandData.guild!.client, msg, commandData.fromTextChannel!);
							}
							await msg.delete({timeout: 20000});
							return commandReturnData;
						}
				
						winningNumbers[0] = await getNumberString(commandData.args[3], redNumbers, blackNumbers);
						winningNumbers[1] = await getNumberString((parseInt(commandData.args[3], 10) + 1)
							.toString(), redNumbers, blackNumbers);
						winningNumbers[2] = await getNumberString((parseInt(commandData.args[3], 10) + 2)
							.toString(), redNumbers, blackNumbers);
				
						break;
					case 'basket':
						payoutAmount = betAmount * 6;
						winningNumbers[0] = await getNumberString('0', redNumbers, blackNumbers);
						winningNumbers[1] = await getNumberString('1', redNumbers, blackNumbers);
						winningNumbers[2] = await getNumberString('2', redNumbers, blackNumbers);
						winningNumbers[3] = await getNumberString('3', redNumbers, blackNumbers);
						winningNumbers[4] = ':green_square:00';
						break;
					case 'sixline':
						payoutAmount = betAmount * 5;
						if (commandData.args[3] === undefined || !digitRegExp.test(commandData.args[3]) || !digitRegExp.test(commandData.args[3])) {
							const msgString = `------\n**Please enter a valid starting value for your sixline!**\n------`;
							let msgEmbed = new Discord.MessageEmbed()
								.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
								.setColor(guildData.borderColor as [number, number, number])
								.setDescription(msgString)
								.setTimestamp(Date() as unknown as Date)
								.setTitle('__**Missing Or Invalid Arguments:**__');
							let msg = await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
							if (commandData.toTextChannel instanceof Discord.WebhookClient) {
								msg = new Discord.Message(commandData.guild!.client, msg, commandData.fromTextChannel!);
							}
							await msg.delete({timeout: 20000});
							return commandReturnData;
						}
				
						if (parseInt(commandData.args[3].toString().match(digitRegExp)![0]!, 10) < 1
						|| parseInt(commandData.args[3].toString().match(digitRegExp)![0]!, 10) > 31) {
							const msgString = `------\n**Please enter a value between 1 and 31!**\n------`;
							let msgEmbed = new Discord.MessageEmbed()
								.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
								.setColor(guildData.borderColor as [number, number, number])
								.setDescription(msgString)
								.setTimestamp(Date() as unknown as Date)
								.setTitle('__**Missing Or Invalid Arguments:**__');
							let msg = await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
							if (commandData.toTextChannel instanceof Discord.WebhookClient) {
								msg = new Discord.Message(commandData.guild!.client, msg, commandData.fromTextChannel!);
							}
							await msg.delete({timeout: 20000});
							return commandReturnData;
						}
				
						winningNumbers[0] = await getNumberString(commandData.args[3], redNumbers, blackNumbers);
						winningNumbers[1] = await getNumberString((parseInt(commandData.args[3], 10) + 1)
							.toString(), redNumbers, blackNumbers);
						winningNumbers[2] = await getNumberString((parseInt(commandData.args[3], 10) + 2)
							.toString(), redNumbers, blackNumbers);
						winningNumbers[3] = await getNumberString((parseInt(commandData.args[3], 10) + 3)
							.toString(), redNumbers, blackNumbers);
						winningNumbers[4] = await getNumberString((parseInt(commandData.args[3], 10) + 4)
							.toString(), redNumbers, blackNumbers);
						winningNumbers[5] = await getNumberString((parseInt(commandData.args[3], 10) + 5)
							.toString(), redNumbers, blackNumbers);
							
						break;
					case '1stcolumn':
						payoutAmount = betAmount * 2;
						winningNumbers = [await getNumberString('1', redNumbers, blackNumbers), await getNumberString('4', redNumbers, blackNumbers), await getNumberString('7', redNumbers, blackNumbers), await getNumberString('10', redNumbers, blackNumbers),
							await getNumberString('13', redNumbers, blackNumbers), await getNumberString('16', redNumbers, blackNumbers), await getNumberString('19', redNumbers, blackNumbers), await getNumberString('22', redNumbers, blackNumbers),
							await getNumberString('25', redNumbers, blackNumbers), await getNumberString('28', redNumbers, blackNumbers), await getNumberString('31', redNumbers, blackNumbers), await getNumberString('34', redNumbers, blackNumbers)];
						break;
					case '2ndcolumn':
						payoutAmount = betAmount * 2;
						winningNumbers = [await getNumberString('2', redNumbers, blackNumbers), await getNumberString('5', redNumbers, blackNumbers), await getNumberString('8', redNumbers, blackNumbers), await getNumberString('11', redNumbers, blackNumbers),
							await getNumberString('14', redNumbers, blackNumbers), await getNumberString('17', redNumbers, blackNumbers), await getNumberString('20', redNumbers, blackNumbers), await getNumberString('23', redNumbers, blackNumbers),
							await getNumberString('26', redNumbers, blackNumbers), await getNumberString('29', redNumbers, blackNumbers), await getNumberString('32', redNumbers, blackNumbers), await getNumberString('35', redNumbers, blackNumbers)];
						break;
					case '3rdcolumn':
						payoutAmount = betAmount * 2;
						winningNumbers = [await getNumberString('3', redNumbers, blackNumbers), await getNumberString('6', redNumbers, blackNumbers), await getNumberString('9', redNumbers, blackNumbers), await getNumberString('12', redNumbers, blackNumbers),
							await getNumberString('15', redNumbers, blackNumbers), await getNumberString('18', redNumbers, blackNumbers), await getNumberString('21', redNumbers, blackNumbers), await getNumberString('24', redNumbers, blackNumbers),
							await getNumberString('27', redNumbers, blackNumbers), await getNumberString('30', redNumbers, blackNumbers), await getNumberString('33', redNumbers, blackNumbers), await getNumberString('36', redNumbers, blackNumbers)];
						break;
					case '1stdozen':
						payoutAmount = betAmount * 2;
						for (let x = 1; x <= 12; x += 1) {
							winningNumbers[x - 1] = await getNumberString(x.toString(), redNumbers, blackNumbers);
						}
						break;
					case '2nddozen':
						payoutAmount = betAmount * 2;
						for (let x = 13; x <= 24; x += 1) {
							winningNumbers[x - 13] = await getNumberString(x.toString(), redNumbers, blackNumbers);
						}
						break;
					case '3rddozen':
						payoutAmount = betAmount * 2;
						for (let x = 25; x <= 36; x += 1) {
							winningNumbers[x - 25] = await getNumberString(x.toString(), redNumbers, blackNumbers);
						}
						break;
					case 'odd':
						payoutAmount = betAmount;
						for (let x = 0; x < (36 / 2); x += 1) {
							winningNumbers[x] = await getNumberString(((x + 1) * 2 - 1)
								.toString(), redNumbers, blackNumbers);
						}
						break;
					case 'even':
						payoutAmount = betAmount;
						for (let x = 0; x < (36 / 2); x += 1) {
							winningNumbers[x] = await getNumberString(((x + 1) * 2).toString(), redNumbers, blackNumbers);
						}
						break;
					case '1to18':
						payoutAmount = betAmount;
						for (let x = 0; x < 18; x += 1) {
							winningNumbers[x] = await getNumberString((x + 1).toString(), redNumbers, blackNumbers);
						}
						break;
					case '19to36':
						payoutAmount = betAmount;
						for (let x = 0; x < 18; x += 1) {
							winningNumbers[x] = await getNumberString((x + 19).toString(), redNumbers, blackNumbers);
						}
						break;
					default:
						break;
					}
					let newRouletteBet: FoundationClasses.RouletteBet = {betAmount: betAmount, payoutAmount: payoutAmount, betOptions: betOptions!, betType: betType!, userID: commandData.guildMember!.id, winningNumbers: winningNumbers};
					
					guildData.rouletteGame.bets.push(newRouletteBet);

					await guildData.writeToDataBase();
					const msgEmbed = new Discord.MessageEmbed();
					msgEmbed
						.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
						.setColor([0, 0, 255])
						.setDescription(`------\n__**Bet Type:**__ ${betType!}\n__**Your winning numbers are:\n${winningNumbers}**__\n__**Your winning payout would be:**__\n${payoutAmount} ${discordUser.userData.currencyName}\n------`)
						.setTimestamp(Date() as unknown as Date)
						.setTitle('__**Roulette Bet Placed:**__');
						await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
			}
			else if (whatAreWeDoing === 'start') {
				await guildData.getFromDataBase();
				guildData.rouletteGame.currentlySpinning = true;
				await guildData.writeToDataBase();
				
				const eventEmitter = new EventEmitter();
				let currentIndex = 3;

				let newMessage: Discord.Message;
				eventEmitter.on('rouletteCountdown', async () => {
					const msgEmbed = new Discord.MessageEmbed();
					msgEmbed
						.setAuthor(commandData.guild?.client.user?.username, commandData.guild?.client.user?.avatarURL()!)
						.setColor([0, 0, 255])
						.setDescription(`------\n__**${currentIndex * 10} seconds remaining to place your roulette bets!**__\n------`)
						.setTimestamp((Date() as unknown) as Date)
						.setTitle('__**Roulette Ball Rolling:**__');
					if (currentIndex === 3) {
						newMessage = await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
						if (commandData.toTextChannel instanceof Discord.WebhookClient) {
							newMessage = new Discord.Message(commandData.guild!.client, newMessage, commandData.fromTextChannel!);
						}
					}
					else{
						await newMessage.edit(msgEmbed);
					}										
					currentIndex -= 1;
					if (currentIndex === -1) {
						await newMessage.delete();
						let finalRoll = Math.trunc(Math.random() * 38).toString();
						await calculateResults(finalRoll, commandData, discordUser, redNumbers, blackNumbers);
					}
				});
				
				for (let x = 0; x <= 3; x += 1) {
					setTimeout(() => {
						eventEmitter.emit('rouletteCountdown');
					}, x * 10000);
				}
			}
	
		return commandReturnData;
	} catch (error) {
		return new Promise((resolve, reject) => {
			reject(error);
		});
	}
}
command.function = execute;
export default command as FoundationClasses.BotCommand;
