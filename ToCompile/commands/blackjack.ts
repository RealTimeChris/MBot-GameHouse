// blackjack.ts - Module for my blackjack command/game.
// Feb 15, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import FoundationClasses from '../FoundationClasses';
import DiscordUser from '../DiscordUser';
import GuildData from '../GuildData';
import GuildMemberData from '../GuildMemberData';
import HelperFunctions from '../HelperFunctions';

const command: FoundationClasses.BotCommand = {
	name: 'blackjack',
	description: '__**Blackjack Usage:**__ !blackjack = BETAMOUNT.',
	function: Function()
};

/**
 * Checks the value of a player's card and adjusts the value of it
 * and the other ace cards if necessary.
 */
function checkAndSetAceValues(playerHand: FoundationClasses.Card[], playerAceIndices: number[]) {
	const newPlayerAceIndices = playerAceIndices;
	if (playerHand[playerHand.length - 1]!.type === 'Ace') {
		newPlayerAceIndices.length += 1;
		newPlayerAceIndices[newPlayerAceIndices.length - 1] = playerHand.length - 1;
	}
	let playerNonAceValue = 0;
	for (let x = 0; x < playerHand.length; x += 1) {
		if (playerHand[x]!.type !== 'Ace') {
			playerNonAceValue += playerHand[x]!.value;
		}
	}
	const newPlayerHand = playerHand;
	if (playerNonAceValue + 11 > 21 && newPlayerAceIndices.length > 0) {
		newPlayerHand[newPlayerAceIndices[0]!]!.value = 1;
	} else if (playerNonAceValue + 11 <= 21 && playerAceIndices.length > 0) {
		newPlayerHand[playerAceIndices[0]!]!.value = 11;
	}
	for (let x = 0; x < playerAceIndices.length; x += 1) {
		if (x > 0) {
			newPlayerHand[playerAceIndices[x]!]!.value = 1;
		}
	}
}

/**
 * Refreshes a blackjack stack of Cards.
 */
function refreshBlackjackStack(cardStack: FoundationClasses.Card[]) {
	const newCardStack = cardStack;
	if (newCardStack.length === 0) {
		newCardStack.length = 312;
		for (let x = 0; x < 6; x += 1) {
			const newDeck = new FoundationClasses.Deck();
			for (let y = 0; y < 52; y += 1) {
				newCardStack[x * 52 + y] = newDeck.drawRandomcard();
			}
		}
	}
}

/**
 * Draws the next card from a stack of blackjack cards.
 */
function drawNextBlackjackCard(cardStack: FoundationClasses.Card[]) {
	if (cardStack.length === 0) {
		refreshBlackjackStack(cardStack);
		const currentCard = cardStack[0];
		cardStack.splice(0, 1);
		return currentCard!;
	}

	const currentCard = cardStack[0];
	cardStack.splice(0, 1);
	return currentCard!;
}

async function recurseThroughMessagePages(message: Discord.Message, betAmount: number, userHand: FoundationClasses.Card[],
	userHandScore: number, userAceIndices: number[], dealerHand: FoundationClasses.Card[], dealerHandScore: number, dealerAceIndices: number[],
	userID: string, guildMember: Discord.GuildMember, guildMemberData: GuildMemberData, guildData: GuildData, cardCount: number, discordUser: DiscordUser, functionName: string) {
	return new Promise((resolve) => {
		const filter = (reaction: Discord.MessageReaction, user: Discord.User) => ((reaction.emoji.name === '✅' || reaction.emoji.name === '❎' || reaction.emoji.name === '⏬') && user.id === userID);
		const reactionCollector = message.createReactionCollector(filter, { time: 120000 });
		let newCardCount = cardCount;
		let newUserHandScore = userHandScore;
		let newDealerHandScore = dealerHandScore;
		reactionCollector.on('collect', async (reaction) => {
			reaction.users.remove(userID);
			reactionCollector.resetTimer({ time: 120000 });
			if (cardCount >= 2) {
				const reactionsArray = message.reactions.cache.array();
				for (let x = 0; x < reactionsArray.length; x += 1) {
					if (reactionsArray[x]!.emoji.name === '⏬') {
						reactionsArray[x]!.remove();
					}
				}
			}
			if (reaction.emoji.name === '✅') {
				await guildMemberData.getFromDataBase();
				let fineAmount = 0;
				fineAmount = 1 * betAmount;
				if (fineAmount > guildMemberData.currency.wallet) {
					let inPlayFooterString = '';
					inPlayFooterString = '------\n__***Sorry, but you have insufficient funds for placing that wager now!***__\n------';

					const messageEmbed = new Discord.MessageEmbed()
						.setAuthor(guildMember.user.username, guildMember.user.avatarURL()!)
						.setTimestamp(Date.now()).setColor([255, 0, 0])
						.setTitle('__**Blackjack Fail:**__')
						.setFooter(`Cards Remaining: ${guildData.blackjackStack.length}`)
						.setDescription(message.embeds[0]!.description);
					messageEmbed.fields = [message.embeds[0]!.fields[0]!, message.embeds[0]!.fields[1]!,
					{ name: '__**Game Status: Failed Wager**__', value: inPlayFooterString, inline: false }];
					await message.edit(messageEmbed);
					reactionCollector.stop('close');
					resolve(functionName);
					return;
				}

				newCardCount += 1;
				await guildData.getFromDataBase();
				userHand.push(drawNextBlackjackCard(guildData.blackjackStack));
				await guildData.writeToDataBase();

				checkAndSetAceValues(userHand, userAceIndices);

				newUserHandScore = 0;
				for (let x = 0; x < userHand.length; x += 1) {
					newUserHandScore += userHand[x]!.value;
				}

				if (newUserHandScore > 21) {
					const payAmount = betAmount * -1.0;
					await guildMemberData.getFromDataBase();
					guildMemberData.currency.wallet += payAmount;
					await guildMemberData.writeToDataBase();
					await guildData.getFromDataBase();
					if (payAmount > guildData.casinoStats.largestBlackjackPayout.amount) {
						guildData.casinoStats.largestBlackjackPayout.amount = payAmount;
						guildData.casinoStats.largestBlackjackPayout.date = Date();
						guildData.casinoStats.largestBlackjackPayout.userID = userID;
						guildData.casinoStats.largestBlackjackPayout.username = guildMember.user.username;
					}
					guildData.casinoStats.totalBlackjackPayout += payAmount;
					guildData.casinoStats.totalPayout
					await guildData.writeToDataBase();

					newDealerHandScore = 0;
					for (let x = 0; x < dealerHand.length; x += 1) {
						newDealerHandScore += dealerHand[x]!.value;
					}

					let dealerHandString = '';
					for (let x = 0; x < dealerHand.length; x += 1) {
						dealerHandString += dealerHand[x]!.suit + dealerHand[x]!.type;
					}

					let userHandString = '';
					for (let x = 0; x < userHand.length; x += 1) {
						userHandString += userHand[x]!.suit + userHand[x]!.type;
					}

					let bustFooterString = '';
					bustFooterString = `------\n__**Your New Wallet Balance:**__ ${guildMemberData.currency.wallet} ${discordUser.userData.currencyName}\n------`;

					const messageEmbed = new Discord.MessageEmbed();
					messageEmbed
						.setAuthor(guildMember.user.username, guildMember.user.avatarURL()!)
						.setTimestamp(Date.now())
						.setTitle('__**Blackjack Loss:**__')
						.setColor([255, 0, 0])
						.setFooter(`Cards Remaining: ${guildData.blackjackStack.length}`)
						.setDescription(message.embeds[0]!.description).fields = [{ name: `Dealer's Hand: (${newDealerHandScore})`, value: dealerHandString, inline: true },
							{ name: `Player's Hand: (${newUserHandScore})`, value: userHandString, inline: true },
							{ name: '__**Game Status: Player Bust**__', value: bustFooterString, inline: false }];
					await message.edit(messageEmbed);
					reactionCollector.stop('close');
					resolve(functionName);
				} else if (newUserHandScore === 21) {
					while (newDealerHandScore < 17) {
						newDealerHandScore = 0;
						for (let x = 0; x < dealerHand.length; x += 1) {
							newDealerHandScore += dealerHand[x]!.value;
						}
						if (newDealerHandScore >= 17) {
							break;
						}
						await guildData.getFromDataBase();
						dealerHand.push(drawNextBlackjackCard(guildData.blackjackStack));
						await guildData.writeToDataBase();

						checkAndSetAceValues(dealerHand, dealerAceIndices);
					}

					newDealerHandScore = 0;
					for (let x = 0; x < dealerHand.length; x += 1) {
						newDealerHandScore += dealerHand[x]!.value;
					}

					if (newDealerHandScore === 21) {
						let dealerHandString = '';
						for (let x = 0; x < dealerHand.length; x += 1) {
							dealerHandString += dealerHand[x]!.suit + dealerHand[x]!.type;
						}

						let userHandString = '';
						for (let x = 0; x < userHand.length; x += 1) {
							userHandString += userHand[x]!.suit + userHand[x]!.type;
						}

						let tieFooterString = '';
						tieFooterString = `------\n__**Your Wallet Balance:**__ ${guildMemberData.currency.wallet} ${discordUser.userData.currencyName}\n------`;

						const messageEmbed = new Discord.MessageEmbed();
						messageEmbed
							.setAuthor(guildMember.user.username, guildMember.user.avatarURL()!)
							.setTimestamp(Date.now())
							.setTitle('__**Blackjack Tie:**__')
							.setColor([0, 0, 255])
							.setFooter(`Cards Remaining: ${guildData.blackjackStack.length}`)
							.setDescription(message.embeds[0]!.description).fields = [{ name: `Dealer's Hand: (${newDealerHandScore})`, value: dealerHandString, inline: true },
								{ name: `Player's Hand: (${newUserHandScore})`, value: userHandString, inline: true },
								{ name: '__**Game Status: Tie**__', value: tieFooterString, inline: false }];
						await message.edit(messageEmbed);
						reactionCollector.stop('close');
						resolve(functionName);
					} else {
						const payAmount = betAmount;
						await guildMemberData.getFromDataBase();
						guildMemberData.currency.wallet += payAmount;
						await guildMemberData.writeToDataBase();
						await guildData.getFromDataBase();
						if (payAmount > guildData.casinoStats.largestBlackjackPayout.amount) {
							guildData.casinoStats.largestBlackjackPayout.amount = payAmount;
							guildData.casinoStats.largestBlackjackPayout.date = Date();
							guildData.casinoStats.largestBlackjackPayout.userID = userID;
							guildData.casinoStats.largestBlackjackPayout.username = guildMember.user.username;
						}
						guildData.casinoStats.totalBlackjackPayout += payAmount;
						guildData.casinoStats.totalPayout = payAmount;
						await guildData.writeToDataBase();

						let dealerHandString = '';
						for (let x = 0; x < dealerHand.length; x += 1) {
							dealerHandString += dealerHand[x]!.suit + dealerHand[x]!.type;
						}

						let userHandString = '';
						for (let x = 0; x < userHand.length; x += 1) {
							userHandString += userHand[x]!.suit + userHand[x]!.type;
						}

						let winFooterString = '';
						winFooterString = `------\n__**Payout Amount:**__ ${payAmount} ${discordUser.userData.currencyName}\n__**Your New Wallet Balance:**__ ${guildMemberData.currency.wallet} ${discordUser.userData.currencyName}\n------`;

						const messageEmbed = new Discord.MessageEmbed();
						messageEmbed
							.setAuthor(guildMember.user.username, guildMember.user.avatarURL()!)
							.setTimestamp(Date.now())
							.setTitle('__**Blackjack Win:**__')
							.setColor([0, 255, 0])
							.setFooter(`Cards Remaining: ${guildData.blackjackStack.length}`)
							.setDescription(message.embeds[0]!.description).fields = [{ name: `Dealer's Hand: (${newDealerHandScore})`, value: dealerHandString, inline: true },
								{ name: `Player's Hand: (${newUserHandScore})`, value: userHandString, inline: true },
								{ name: '__**Game Status: Player Wins**__', value: winFooterString, inline: false }];
						await message.edit(messageEmbed);
						reactionCollector.stop('close');
						resolve(functionName);
					}
				} else if (newUserHandScore < 21) {
					newDealerHandScore = dealerHand[0]!.value;

					let dealerHandString = '';
					dealerHandString += dealerHand[0]!.suit + dealerHand[0]!.type;

					let userHandString = '';
					for (let x = 0; x < userHand.length; x += 1) {
						userHandString += userHand[x]!.suit + userHand[x]!.type;
					}

					let inPlayFooterString = '';
					inPlayFooterString = '------\n✅ to Hit, ❎ to Stand\n------';

					const messageEmbed = new Discord.MessageEmbed();
					messageEmbed
						.setAuthor(guildMember.user.username, guildMember.user.avatarURL()!)
						.setTimestamp(Date.now())
						.setTitle('__**Blackjack:**__')
						.setColor([0, 0, 255])
						.setFooter(`Cards Remaining: ${guildData.blackjackStack.length}`)
						.setDescription(message.embeds[0]!.description).fields = [{ name: `Dealer's Hand: (${newDealerHandScore})`, value: dealerHandString, inline: true },
							{ name: `Player's Hand: (${newUserHandScore})`, value: userHandString, inline: true },
							{ name: '__**Game Status: In Play**__', value: inPlayFooterString, inline: false }];
					await message.edit(messageEmbed);
				}
			} else if (reaction.emoji.name === '❎') {
				await guildMemberData.getFromDataBase();
				let fineAmount = 0;
				fineAmount = 1 * betAmount;
				if (fineAmount > guildMemberData.currency.wallet) {
					let inPlayFooterString = '';
					inPlayFooterString = '------\n__***Sorry, but you have insufficient funds for placing that wager now!***__\n------';

					const messageEmbed = new Discord.MessageEmbed()
						.setAuthor(guildMember.user.username, guildMember.user.avatarURL()!)
						.setTimestamp(Date.now()).setColor([255, 0, 0])
						.setTitle('__**Blackjack Fail:**__')
						.setFooter(`Cards Remaining: ${guildData.blackjackStack.length}`)
						.setDescription(message.embeds[0]!.description);
					messageEmbed.fields = [message.embeds[0]!.fields[0]!, message.embeds[0]!.fields[1]!, { name: '__**Game Status: Failed Wager**__', value: inPlayFooterString, inline: false }];
					await message.edit(messageEmbed);
					reactionCollector.stop('close');
					resolve(functionName);
					return;
				}

				newUserHandScore = 0;
				for (let x = 0; x < userHand.length; x += 1) {
					newUserHandScore += userHand[x]!.value;
				}

				while (newDealerHandScore < 17) {
					newDealerHandScore = 0;
					for (let x = 0; x < dealerHand.length; x += 1) {
						newDealerHandScore += dealerHand[x]!.value;
					}
					if (newDealerHandScore >= 17) {
						break;
					}
					await guildData.getFromDataBase();
					dealerHand.push(drawNextBlackjackCard(guildData.blackjackStack));
					await guildData.writeToDataBase();

					checkAndSetAceValues(dealerHand, dealerAceIndices);
				}

				newDealerHandScore = 0;
				for (let x = 0; x < dealerHand.length; x += 1) {
					newDealerHandScore += dealerHand[x]!.value;
				}

				let dealerHandString = '';
				for (let x = 0; x < dealerHand.length; x += 1) {
					dealerHandString += dealerHand[x]!.suit + dealerHand[x]!.type;
				}

				let userHandString = '';
				for (let x = 0; x < userHand.length; x += 1) {
					userHandString += userHand[x]!.suit + userHand[x]!.type;
				}

				if ((newUserHandScore === 21 && newDealerHandScore !== 21) || (newUserHandScore < 21
						&& newUserHandScore > newDealerHandScore) || (newUserHandScore < 21
						&& newDealerHandScore > 21)) {
					const payAmount = betAmount;
					await guildData.getFromDataBase();
					if (payAmount > guildData.casinoStats.largestBlackjackPayout.amount) {
						guildData.casinoStats.largestBlackjackPayout.amount = payAmount;
						guildData.casinoStats.largestBlackjackPayout.date = Date();
						guildData.casinoStats.largestBlackjackPayout.userID = userID;
						guildData.casinoStats.largestBlackjackPayout.username = guildMember.user.username;
					}
					guildData.casinoStats.totalBlackjackPayout += payAmount;
					guildData.casinoStats.totalPayout += payAmount;
					await guildData.writeToDataBase();
					
					await guildMemberData.getFromDataBase();
					guildMemberData.currency.wallet += payAmount;
					await guildMemberData.writeToDataBase();

					let winFooterString = '';
					winFooterString = `------\n__**Payout Amount:**__ ${payAmount} ${discordUser.userData.currencyName}\n__**Your New Wallet Balance:**__ ${guildMemberData.currency.wallet} ${discordUser.userData.currencyName}\n------`;

					const messageEmbed = new Discord.MessageEmbed();
					messageEmbed
						.setAuthor(guildMember.user.username, guildMember.user.avatarURL()!)
						.setTimestamp(Date.now())
						.setTitle('__**Blackjack Win:**__')
						.setColor([0, 255, 0])
						.setFooter(`Cards Remaining: ${guildData.blackjackStack.length}`)
						.setDescription(message.embeds[0]!.description).fields = [{ name: `Dealer's Hand: (${newDealerHandScore})`, value: dealerHandString, inline: true },
							{ name: `Player's Hand: (${newUserHandScore})`, value: userHandString, inline: true },
							{ name: '__**Game Status: Player Wins**__', value: winFooterString, inline: false }];
					await message.edit(messageEmbed);
					reactionCollector.stop('close');
					resolve(functionName);
				} else if (newUserHandScore === newDealerHandScore) {
					let tieFooterString = '';
					tieFooterString = `------\n__**Your Wallet Balance:**__ ${guildMemberData.currency.wallet} ${discordUser.userData.currencyName}\n------`;

					const messageEmbed = new Discord.MessageEmbed();
					messageEmbed
						.setAuthor(guildMember.user.username, guildMember.user.avatarURL()!)
						.setTimestamp(Date.now())
						.setTitle('__**Blackjack Tie:**__')
						.setColor([0, 0, 255])
						.setFooter(`Cards Remaining: ${guildData.blackjackStack.length}`)
						.setDescription(message.embeds[0]!.description).fields = [{ name: `Dealer's Hand: (${newDealerHandScore})`, value: dealerHandString, inline: true },
							{ name: `Player's Hand: (${newUserHandScore})`, value: userHandString, inline: true },
							{ name: '__**Game Status: Tie**__', value: tieFooterString, inline: false }];
					await message.edit(messageEmbed);
					reactionCollector.stop('close');
					resolve(functionName);
				} else {
					const payAmount = -1 * betAmount;
					await guildMemberData.getFromDataBase();
					guildMemberData.currency.wallet += payAmount;
					await guildMemberData.writeToDataBase();
					await guildData.getFromDataBase();
					if (payAmount > guildData.casinoStats.largestBlackjackPayout.amount) {
						guildData.casinoStats.largestBlackjackPayout.amount = payAmount;
						guildData.casinoStats.largestBlackjackPayout.date = Date();
						guildData.casinoStats.largestBlackjackPayout.userID = userID;
						guildData.casinoStats.largestBlackjackPayout.username = guildMember.user.username;
					}
					guildData.casinoStats.totalBlackjackPayout += payAmount;
					guildData.casinoStats.totalPayout += payAmount;
					await guildData.writeToDataBase();
					let bustFooterString = '';
					bustFooterString = `------\n__**Your New Wallet Balance:**__ ${guildMemberData.currency.wallet} ${discordUser.userData.currencyName}\n------`;

					const messageEmbed = new Discord.MessageEmbed();
					messageEmbed
						.setAuthor(guildMember.user.username, guildMember.user.avatarURL()!)
						.setTimestamp(Date.now())
						.setTitle('__**Blackjack Loss:**__')
						.setColor([255, 0, 0])
						.setFooter(`Cards Remaining: ${guildData.blackjackStack.length}`)
						.setDescription(message.embeds[0]!.description).fields = [{ name: `Dealer's Hand: (${newDealerHandScore})`, value: dealerHandString, inline: true },
							{ name: `Player's Hand: (${newUserHandScore})`, value: userHandString, inline: true },
							{ name: '__**Game Status: Player Bust**__', value: bustFooterString, inline: false }];
					await message.edit(messageEmbed);
					reactionCollector.stop('close');
					resolve(functionName);
				}
			} else if (reaction.emoji.name === '⏬') {
				const fineAmount = 2 * betAmount;
				if (fineAmount > guildMemberData.currency.wallet || !(message.embeds[0]!.fields[2]!.value.includes('⏬')) || newCardCount > 2) {
					const reactionsArray = message.reactions.cache.array();
					for (let x = 0; x < reactionsArray.length; x += 1) {
						if ((reactionsArray[x] as Discord.MessageReaction).emoji.name === '⏬') {
							const targetReaction = reactionsArray[x];
							(targetReaction as Discord.MessageReaction).remove();
						}
					}

					let failedFooterString = '';
					await guildMemberData.getFromDataBase();
					if (!(message.embeds[0]!.fields[2]!.value.includes('⏬')) || newCardCount > 2) {
						failedFooterString = '__***Sorry, but you do not have the option to double down!***__\n------\n✅ to Hit, ❎ to Stand.\n------';
					} else if (fineAmount > guildMemberData.currency.wallet) {
						failedFooterString = '__***Sorry, but you have insufficient funds for placing that wager now!***__\n------\n✅ to Hit, ❎ to Stand.\n------';
					}

					const messageEmbed = new Discord.MessageEmbed()
						.setAuthor(guildMember.user.username, guildMember.user.avatarURL()!)
						.setTimestamp(Date.now()).setColor([0, 0, 255])
						.setTitle('__**Blackjack:**__')
						.setFooter(`Cards Remaining: ${guildData.blackjackStack.length}`)
						.setDescription(message.embeds[0]!.description);
					messageEmbed.fields = [message.embeds[0]!.fields[0]!, message.embeds[0]!.fields[1]!,
						{ name: '__**Game Status: In Play**__', value: failedFooterString, inline: false }];
					await message.edit(messageEmbed);
					return;
				}

				newCardCount += 1;
				await guildData.getFromDataBase();
				userHand.push(drawNextBlackjackCard(guildData.blackjackStack));
				await guildData.writeToDataBase();

				checkAndSetAceValues(userHand, userAceIndices);

				newUserHandScore = 0;
				for (let x = 0; x < userHand.length; x += 1) {
					newUserHandScore += userHand[x]!.value;
				}

				while (newDealerHandScore < 17) {
					newDealerHandScore = 0;
					for (let x = 0; x < dealerHand.length; x += 1) {
						newDealerHandScore += dealerHand[x]!.value;
					}
					if (newDealerHandScore >= 17) {
						break;
					}
					await guildData.getFromDataBase();
					dealerHand.push(drawNextBlackjackCard(guildData.blackjackStack));
					await guildData.writeToDataBase();

					checkAndSetAceValues(dealerHand, dealerAceIndices);
				}

				newDealerHandScore = 0;
				for (let x = 0; x < dealerHand.length; x += 1) {
					newDealerHandScore += dealerHand[x]!.value;
				}

				let dealerHandString = '';
				for (let x = 0; x < dealerHand.length; x += 1) {
					dealerHandString += dealerHand[x]!.suit + dealerHand[x]!.type;
				}

				let userHandString = '';
				for (let x = 0; x < userHand.length; x += 1) {
					userHandString += userHand[x]!.suit + userHand[x]!.type;
				}

				if ((newUserHandScore === 21 && newDealerHandScore !== 21)
					|| (newUserHandScore < 21 && newUserHandScore > newDealerHandScore)
					|| (newUserHandScore < 21 && newDealerHandScore > 21)) {
					const payAmount = 2 * betAmount;
					
					guildMemberData.currency.wallet += payAmount;
					await guildMemberData.writeToDataBase();
					await guildData.getFromDataBase();
					if (payAmount > guildData.casinoStats.largestBlackjackPayout.amount) {
						guildData.casinoStats.largestBlackjackPayout.amount = payAmount;
						guildData.casinoStats.largestBlackjackPayout.date = Date();
						guildData.casinoStats.largestBlackjackPayout.userID = userID;
						guildData.casinoStats.largestBlackjackPayout.username = guildMember.user.username;
					}
					guildData.casinoStats.totalBlackjackPayout += payAmount;
					guildData.casinoStats.totalPayout += payAmount;
					await guildData.writeToDataBase();

					let winFooterString = '';
					winFooterString = `------\n__**Payout Amount:**__ ${payAmount} ${discordUser.userData.currencyName}\n__**Your New Wallet Balance:**__ ${guildMemberData.currency.wallet} ${discordUser.userData.currencyName}\n------`;

					const messageEmbed = new Discord.MessageEmbed();
					messageEmbed
						.setAuthor(guildMember.user.username, guildMember.user.avatarURL()!)
						.setTimestamp(Date.now())
						.setTitle('__**Blackjack Win:**__')
						.setColor([0, 255, 0])
						.setFooter(`Cards Remaining: ${guildData.blackjackStack.length}`)
						.setDescription(message.embeds[0]!.description).fields = [{ name: `Dealer's Hand: (${newDealerHandScore})`, value: dealerHandString, inline: true }, { name: `Player's Hand: (${newUserHandScore})`, value: userHandString, inline: true },
							{ name: '__**Game Status: Player Wins**__', value: winFooterString, inline: false }];
					await message.edit(messageEmbed);
					reactionCollector.stop('close');
					resolve(functionName);
				} else if (newUserHandScore === newDealerHandScore) {
					let tieFooterString = '';
					tieFooterString = `------\n__**Your Wallet Balance:**__ ${guildMemberData.currency.wallet} ${discordUser.userData.currencyName}\n------`;

					const messageEmbed = new Discord.MessageEmbed();
					messageEmbed
						.setAuthor(guildMember.user.username, guildMember.user.avatarURL()!)
						.setTimestamp(Date.now())
						.setTitle('__**Blackjack Tie:**__')
						.setColor([0, 0, 255])
						.setFooter(`Cards Remaining: ${guildData.blackjackStack.length}`)
						.setDescription(message.embeds[0]!.description).fields = [{ name: `Dealer's Hand: (${newDealerHandScore})`, value: dealerHandString, inline: true }, { name: `Player's Hand: (${newUserHandScore})`, value: userHandString, inline: true },
							{ name: '__**Game Status: Tie**__', value: tieFooterString, inline: false }];
					await message.edit(messageEmbed);
					reactionCollector.stop('close');
					resolve(functionName);
				} else {
					const payAmount = -2 * betAmount;
					
					guildMemberData.currency.wallet += payAmount;
					await guildMemberData.writeToDataBase();
					await guildData.getFromDataBase();
					if (payAmount > guildData.casinoStats.largestBlackjackPayout.amount) {
						guildData.casinoStats.largestBlackjackPayout.amount = payAmount;
						guildData.casinoStats.largestBlackjackPayout.date = Date();
						guildData.casinoStats.largestBlackjackPayout.userID = userID;
						guildData.casinoStats.largestBlackjackPayout.username = guildMember.user.username;
					}
					guildData.casinoStats.totalBlackjackPayout += payAmount;
					guildData.casinoStats.totalPayout += payAmount;
					await guildData.writeToDataBase();

					let bustFooterString = '';
					bustFooterString = `------\n__**Your New Wallet Balance:**__ ${guildMemberData.currency.wallet} ${discordUser.userData.currencyName}\n------`;

					const messageEmbed = new Discord.MessageEmbed();
					messageEmbed
						.setAuthor(guildMember.user.username, guildMember.user.avatarURL()!)
						.setTimestamp(Date.now())
						.setTitle('__**Blackjack Loss:**__')
						.setColor([255, 0, 0])
						.setFooter(`Cards Remaining: ${guildData.blackjackStack.length}`)
						.setDescription(message.embeds[0]!.description).fields = [{ name: `Dealer's Hand: (${newDealerHandScore})`, value: dealerHandString, inline: true }, { name: `Player's Hand: (${newUserHandScore})`, value: userHandString, inline: true },
							{ name: '__**Game Status: Player Bust**__', value: bustFooterString, inline: false }];
					await message.edit(messageEmbed);
					reactionCollector.stop('close');
				}
			}
		});

		reactionCollector.on('end', async (collected, reason) => {
			if (reason !== 'close') {
				let tieFooterString = '';
				tieFooterString = '------\n__**Your game has timed out!**__\n------';

				const messageEmbed = new Discord.MessageEmbed();
				messageEmbed
					.setAuthor(guildMember.user.username, guildMember.user.avatarURL()!)
					.setTimestamp(Date.now())
					.setTitle('__**Blackjack Timed Out:**__')
					.setColor([255, 0, 0])
					.setFooter(`Cards Remaining: ${guildData.blackjackStack.length}`)
					.setDescription(tieFooterString);
				await guildData.writeToDataBase();
				await guildMemberData.writeToDataBase();
				await message.edit(messageEmbed);
			}
			await guildMemberData.writeToDataBase();
			await guildData.writeToDataBase();
			message.reactions.removeAll();
			return functionName;
		});
	});
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

		if (!(commandData.fromTextChannel as Discord.TextChannel).permissionsFor(commandData.guild?.client.user as Discord.User)?.has('MANAGE_MESSAGES')) {
			const msgString = `------\n**I need the Manage Messages permission in this channel, for this game!**\n------`;
			let msgEmbed = new Discord.MessageEmbed()
				.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
				.setColor(guildData.borderColor as [number, number, number])
				.setDescription(msgString)
				.setTimestamp(Date() as unknown as Date)
				.setTitle('__**Permissions Issue:**__')
			let msg = await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
			if (commandData.toTextChannel instanceof Discord.WebhookClient) {
				msg = new Discord.Message(commandData.guild!.client, msg, commandData.fromTextChannel!);
			}
			await msg.delete({timeout: 20000});
			return commandReturnData;
		}

		const betRegExp = /\d{1,18}/;
		if (commandData.args[0] === undefined || !betRegExp.test(commandData.args[0]) || parseInt(commandData.args[0], 10) < 1) {
			const msgString = `------\n**Please enter a valid bet amount! (!blackjack = BETAMOUNT)**\n------`;
			let msgEmbed = new Discord.MessageEmbed()
				.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
				.setColor(guildData.borderColor as [number, number, number])
				.setDescription(msgString)
				.setTimestamp(Date() as unknown as Date)
				.setTitle('__**Missing Or Invalid Arguments:**__')
			let msg = await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
			if (commandData.toTextChannel instanceof Discord.WebhookClient) {
				msg = new Discord.Message(commandData.guild!.client, msg, commandData.fromTextChannel!);
			}
			await msg.delete({timeout: 20000});
			return commandReturnData;
		}

		const betAmount = parseInt(commandData.args[0].match(betRegExp)![0]!, 10);

		const userID = commandData.guildMember?.id;
		const guildMemberData = new GuildMemberData({dataBase: discordUser.dataBase, id: userID!, guildId: commandData.guild!.id,
			userName: (commandData.guildMember as Discord.GuildMember)!.user.username, displayName: (commandData.guildMember as Discord.GuildMember).displayName});
		await guildMemberData.getFromDataBase();

		if (betAmount > guildMemberData.currency.wallet) {
			const msgString = `------\n**Sorry, but you have insufficient funds for placing that wager!**\n------`;
			let msgEmbed = new Discord.MessageEmbed()
				.setAuthor((commandData.guildMember as Discord.GuildMember)?.user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL() as string)
				.setColor(guildData.borderColor as [number, number, number])
				.setDescription(msgString)
				.setTimestamp(Date() as unknown as Date)
				.setTitle('__**Missing Funds:**__')
			let msg = await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
			if (commandData.toTextChannel instanceof Discord.WebhookClient) {
				msg = new Discord.Message(commandData.guild!.client, msg, commandData.fromTextChannel!);
			}
			await msg.delete({timeout: 20000});
			return commandReturnData;
		}

		const finalMessageEmbed = new Discord.MessageEmbed();

		let finalMsgString = '';
		for (let x = 0; x < 2; x += 1) {
			finalMsgString = `__**Your Bet Amount:**__ ${betAmount} ${discordUser.userData.currencyName}\n`;
		}

		let footerMsgString = '';
		footerMsgString = '------\n✅ to Hit, ❎ to Stand.\n------';

		await guildData.getFromDataBase();
		const userHand = [];
		const userAceIndices: number[] = [];
		userHand.push(drawNextBlackjackCard(guildData.blackjackStack));
		checkAndSetAceValues(userHand, userAceIndices);
		userHand.push(drawNextBlackjackCard(guildData.blackjackStack));
		checkAndSetAceValues(userHand, userAceIndices);
		const userHandScore = userHand[0]!.value + userHand[1]!.value;

		const dealerHand = [];
		const dealerAceIndices: number[] = [];
		dealerHand.push(drawNextBlackjackCard(guildData.blackjackStack));
		checkAndSetAceValues(dealerHand, dealerAceIndices);
		dealerHand.push(drawNextBlackjackCard(guildData.blackjackStack));
		checkAndSetAceValues(dealerHand, dealerAceIndices);
		let newDealerHandScore = dealerHand[0]!.value;
		await guildData.writeToDataBase();

		if ((userHandScore === 9) || (userHandScore === 10) || (userHandScore === 11)) {
			footerMsgString = `${footerMsgString.slice(0, footerMsgString.length - 8)}, ⏬ to Double Down.\n------`;
		}

		if (userHandScore === 21) {
			if (dealerHand[0]!.value === 10 && dealerHand[1]!.type === 'Ace') {
				dealerHand[1]!.value = 11;
			} else if (dealerHand[1]!.value === 10 && dealerHand[0]!.type === 'Ace') {
				dealerHand[0]!.value = 11;
			}

			newDealerHandScore = dealerHand[0]!.value + dealerHand[1]!.value;

			if (newDealerHandScore === 21) {
				const footerMsgString2 = `\n------\n__**Your Wallet Balance:**__ ${guildMemberData.currency.wallet} ${discordUser.userData.currencyName}\n------`;

				finalMessageEmbed
					.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
					.setTimestamp(Date.now())
					.setColor([0, 0, 255])
					.setTitle('__**Blackjack Tie:**__')
					.setDescription(finalMsgString)
					.setFooter(`Cards Remaining: ${guildData.blackjackStack.length}`);
				finalMessageEmbed.fields = [{ name: `Dealer's Hand: (${newDealerHandScore})`, value: dealerHand[0]!.suit + dealerHand[0]!.type + dealerHand[1]!.suit + dealerHand[1]!.type, inline: true },
					{ name: `Player's Hand: (${userHandScore})`, value: userHand[0]!.suit + userHand[0]!.type + userHand[1]!.suit + userHand[1]!.type, inline: true },
					{ name: '__**Game Status: Tie**__', value: footerMsgString2, inline: false }];
				await HelperFunctions.sendMessageWithCorrectChannel(commandData, finalMessageEmbed);
				return commandReturnData;
			}
			await guildMemberData.getFromDataBase();
			const payAmount = Math.trunc(1.5 * betAmount);
			guildMemberData.currency.wallet += payAmount;
			await guildMemberData.writeToDataBase();
			await guildData.getFromDataBase();
			if (payAmount > guildData.casinoStats.largestBlackjackPayout.amount) {
				guildData.casinoStats.largestBlackjackPayout.amount = payAmount;
				guildData.casinoStats.largestBlackjackPayout.date = Date();
				guildData.casinoStats.largestBlackjackPayout.userID = userID!;
				guildData.casinoStats.largestBlackjackPayout.username = (commandData.guildMember as Discord.GuildMember).user.username;
			}
			guildData.casinoStats.totalBlackjackPayout += payAmount;
			guildData.casinoStats.totalPayout
			await guildData.writeToDataBase();

			const footerMsgString2 = `\n------\n__**Payout Amount:**__ ${payAmount} ${discordUser.userData.currencyName}\n__**Your New Wallet Balance:**__ ${
				guildMemberData.currency.wallet} ${discordUser.userData.currencyName}\n------`;

			finalMessageEmbed
				.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
				.setTimestamp(Date.now())
				.setColor([0, 255, 0])
				.setTitle('__**Blackjack Win:**__')
				.setDescription(finalMsgString)
				.setFooter(`Cards Remaining: ${guildData.blackjackStack.length}`);
			finalMessageEmbed.fields = [{ name: `Dealer's Hand: (${newDealerHandScore})`, value: dealerHand[0]!.suit + dealerHand[0]!.type + dealerHand[1]!.suit + dealerHand[1]!.type, inline: true },
				{ name: `Player's Hand: (${userHandScore})`, value: userHand[0]!.suit + userHand[0]!.type + userHand[1]!.suit + userHand[1]!.type, inline: true },
				{ name: '__**Game Status: Player Wins**__', value: footerMsgString2, inline: false }];
			await HelperFunctions.sendMessageWithCorrectChannel(commandData, finalMessageEmbed);
			return commandReturnData;
		}

		finalMessageEmbed
			.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
			.setTimestamp(Date.now())
			.setColor([0, 0, 255])
			.setTitle('__**Blackjack:**__')
			.setDescription(finalMsgString)
			.setFooter(`Cards Remaining: ${guildData.blackjackStack.length}`);
		finalMessageEmbed.fields = [{ name: `Dealer's Hand: (${newDealerHandScore})`, value: dealerHand[0]!.suit + dealerHand[0]!.type, inline: true },
			{ name: `Player's Hand: (${userHandScore})`, value: userHand[0]!.suit + userHand[0]!.type + userHand[1]!.suit + userHand[1]!.type, inline: true },
			{ name: '__**Game Status: In Play**__', value: footerMsgString, inline: false }];
		let newMessage = await HelperFunctions.sendMessageWithCorrectChannel(commandData, finalMessageEmbed);
		if (commandData.toTextChannel instanceof Discord.WebhookClient) {
			newMessage = new Discord.Message(commandData.guildMember!.client, newMessage, commandData.fromTextChannel!);
		}
		const newCardCount = 2;
		await newMessage.react('✅');
		await newMessage.react('❎');
		if (newCardCount === 2 && (newMessage.embeds[0]!.fields[2]!.value.includes('⏬'))) {
			await newMessage.react('⏬');
		}
		await recurseThroughMessagePages(newMessage, betAmount, userHand, userHandScore,
			userAceIndices, dealerHand, newDealerHandScore, dealerAceIndices, userID as string, commandData.guildMember as Discord.GuildMember,
			guildMemberData, guildData, newCardCount, discordUser, command.name);
		return commandReturnData;
	} catch (error) {
		return new Promise((resolve, reject) => {
			reject(error);
		});
	}
}
command.function = execute;
export default command as FoundationClasses.BotCommand;
