// duel.ts - Module for my dueling command
// Feb 4, 2021
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
	name: 'duel',
	description: '__**Duel Usage**__: !duel = BETAMOUNT, @USERMENTION',
	function: Function()
};

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
		}

		const numberRegExp = /\d{1,18}/;
		const idRegExp = /\d{18}/;
		if (commandData.args[0] === undefined || !numberRegExp.test(commandData.args[0]) || parseInt(commandData.args[0], 10) < 0) {
			const msgString = `------\n**Please enter a valid bet amount! (!duel = BETAMOUNT, @USERMENTION)**\n------`;
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
		if (commandData.args[1] === undefined || !idRegExp.test(commandData.args[1])) {
			const msgString = `------\n**Please enter a valid user mention or user ID! (!duel = BETAMOUNT, @USERMENTION)**\n------`;
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

		const betAmount = parseInt(commandData.args[0].match(numberRegExp)![0]!, 10);
		const toUserID = commandData.args[1].match(idRegExp)![0]!;

		const fromUserID = (commandData.guildMember as Discord.GuildMember).user.id;

		const fromGuildMemberData = new GuildMemberData({dataBase: discordUser.dataBase, id: commandData.guildMember!.id, guildId: commandData.guild!.id,
			userName: (commandData.guildMember as Discord.GuildMember)!.user.username, displayName: (commandData.guildMember as Discord.GuildMember).displayName});
		await fromGuildMemberData.getFromDataBase();

		const toGuildMember = commandData.guild!.members.resolve(toUserID);

		if (toGuildMember === null) {
			const msgString = `------\n**Sorry, but that user could not be found!**\n------`;
			let msgEmbed = new Discord.MessageEmbed()
				.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
				.setColor(guildData.borderColor as [number, number, number])
				.setDescription(msgString)
				.setTimestamp(Date() as unknown as Date)
				.setTitle('__**User Issue:**__');
			let msg = await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
			if (commandData.toTextChannel instanceof Discord.WebhookClient) {
				msg = new Discord.Message(commandData.guild!.client, msg, commandData.fromTextChannel!);
			}
			await msg.delete({timeout: 20000});
			return commandReturnData;
		}

		const toGuildMemberData = new GuildMemberData({dataBase: discordUser.dataBase, id: toGuildMember.id, guildId: commandData.guild!.id,
			userName: toGuildMember.user.username, displayName: toGuildMember.displayName});
		await toGuildMemberData.getFromDataBase();

		if (toGuildMemberData == null) {
			const msgString = `------\n**Sorry, but the specified user data could not be found!**\n------`;
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

		let fromUserCurrency = fromGuildMemberData.currency.wallet!;
		let toUserCurrency = toGuildMemberData.currency.wallet!;

		if (betAmount > fromUserCurrency) {
			const msgString = `------\n**Sorry, but you have insufficient funds in your wallet for placing that wager!**\n------`;
			let msgEmbed = new Discord.MessageEmbed()
				.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
				.setColor(guildData.borderColor as [number, number, number])
				.setDescription(msgString)
				.setTimestamp(Date() as unknown as Date)
				.setTitle('__**Insufficient Funds:**__')
			let msg = await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
			if (commandData.toTextChannel instanceof Discord.WebhookClient) {
				msg = new Discord.Message(commandData.guild!.client, msg, commandData.fromTextChannel!);
			}
			await msg.delete({timeout: 20000});
			return commandReturnData;
		}
		if (betAmount > toUserCurrency) {
			const msgString = `------\n**Sorry, but they have insufficient funds in their wallet for accepting that wager!**\n------`;
			let msgEmbed = new Discord.MessageEmbed()
				.setAuthor((commandData.guildMember as Discord.GuildMember)?.user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
				.setColor(guildData.borderColor as [number, number, number])
				.setDescription(msgString)
				.setTimestamp(Date() as unknown as Date)
				.setTitle('__**Insufficient Funds:**__')
			let msg = await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
			if (commandData.toTextChannel instanceof Discord.WebhookClient) {
				msg = new Discord.Message(commandData.guild!.client, msg, commandData.fromTextChannel!);
			}
			await msg.delete({timeout: 20000});
			return commandReturnData;
		}

		let msgEmbedString = '';
		msgEmbedString = `${msgEmbedString}You've been challenged to a duel! :crossed_swords: \nBy user: <@!${fromUserID}>\nFor a wager of: ${betAmount} ${discordUser.userData.currencyName
		}\nReact with :white_check_mark: to accept or :x: to reject!`;
		const messageEmbed = new Discord.MessageEmbed();
		messageEmbed.setDescription(msgEmbedString).setTimestamp(Date.now()).setTitle("__**IT'S TIME TO DUEL!**__").setColor([0, 0, 255]);
		let newMessage = await HelperFunctions.sendMessageWithCorrectChannel(commandData, messageEmbed, toUserID);
		if (commandData.toTextChannel instanceof Discord.WebhookClient) {
			newMessage = new Discord.Message(commandData.guild!.client, newMessage, commandData.fromTextChannel!);
		}
		newMessage.react('✅');
		newMessage.react('❌');
		const filter = (reaction: Discord.MessageReaction, user: Discord.User) => (reaction.emoji.name === '✅' || reaction.emoji.name === '❌') && user.id === toUserID;
		newMessage.awaitReactions(filter, { max: 1, time: 120000 }).then(async (collected) => {
			if (collected.size === 0) {
				let rejectedString = '';

				rejectedString = `${rejectedString}Sorry, <@!${fromUserID}>, but <@!${toUserID}> has rejected your duel offer! (Timed Out!)`;
				const messageEmbed2 = new Discord.MessageEmbed();
				messageEmbed2.setColor([255, 0, 0]).setTimestamp(Date.now()).setTitle('__**DUEL REJECTED!**__').setDescription(rejectedString);
				newMessage.reactions.removeAll();
				await newMessage.channel.send(`<@!${fromUserID}>`, { embed: messageEmbed2 });
			} else if (collected.first()!.emoji.name === '✅') {
				await fromGuildMemberData.getFromDataBase();
				fromUserCurrency = fromGuildMemberData.currency.wallet;
				await toGuildMemberData.getFromDataBase();
				toUserCurrency = toGuildMemberData.currency.wallet;

				if (betAmount > fromUserCurrency) {
					let msgString = '';
					msgString += `${msgEmbedString}\n\n__**Sorry, but you have insufficient funds in your wallet for placing that wager!**__`;

					const messageEmbed3 = new Discord.MessageEmbed()
						.setDescription(msgString).setTimestamp(Date.now()).setColor([255, 0, 0])
						.setTitle("__**IT'S TIME TO DUEL!**__");
					await newMessage.edit(messageEmbed3);
					newMessage.reactions.removeAll();
					return commandReturnData;
				}
				if (betAmount > toUserCurrency) {
					let msgString = '';
					msgString += `${msgEmbedString}\n\n__**Sorry, but they have insufficient funds in their wallet for accepting that wager!**__`;

					const messageEmbed4 = new Discord.MessageEmbed()
						.setDescription(msgString).setTimestamp(Date.now()).setColor([255, 0, 0])
						.setTitle("__**IT'S TIME TO DUEL!**__");
					await newMessage.edit(messageEmbed4);
					newMessage.reactions.removeAll();
					return commandReturnData;
				}

				const fromUserRoll = Math.trunc(Math.random() * 100);
				const toUserRoll = Math.trunc(Math.random() * 100);
				const messageEmbeds = [];
				const finalStrings = [];
				const fromUserGainStrings = [];
				const fromUserLossStrings = [];
				const toUserGainStrings = [];
				const toUserLossStrings = [];
				let fromUserSelfMod = 0;
				let fromUserOppMod = 0;
				let toUserSelfMod = 0;
				let toUserOppMod = 0;
				let finalFromUserRoll = 0;
				let finalToUserRoll = 0;

				for (let x = 0; x < fromGuildMemberData.items.length; x += 1) {
					const currentItem = fromGuildMemberData.items[x]!;

					if (currentItem.selfMod > 0) {
						const currentString = `+${currentItem.selfMod} of base roll from <@!${fromUserID}>'s ${currentItem.emoji}${currentItem.itemName}\n`;
						fromUserGainStrings.push(currentString);
						fromUserSelfMod += currentItem.selfMod;
					}
					if (currentItem.oppMod < 0) {
						const currentString = `${currentItem.oppMod} of base roll from <@!${fromUserID}>'s ${currentItem.emoji}${currentItem.itemName}\n`;
						toUserLossStrings.push(currentString);
						toUserOppMod += currentItem.oppMod;
					}
				}

				for (let x = 0; x < toGuildMemberData.items.length; x += 1) {
					const currentItem = toGuildMemberData.items[x]!;

					if (currentItem.selfMod > 0) {
						const currentString = `+${currentItem.selfMod} of base roll from <@!${toUserID}>'s ${currentItem.emoji}${currentItem.itemName}\n`;
						toUserGainStrings.push(currentString);
						toUserSelfMod += currentItem.selfMod;
					}
					if (currentItem.oppMod < 0) {
						const currentString = `${currentItem.oppMod} of base roll from <@!${toUserID}>'s ${currentItem.emoji}${currentItem.itemName}\n`;
						fromUserLossStrings.push(currentString);
						fromUserOppMod += currentItem.oppMod;
					}
				}

				finalFromUserRoll = HelperFunctions
					.applyAsymptoticTransform((fromUserRoll + fromUserSelfMod + fromUserOppMod),
						2000, 100);
				finalToUserRoll = HelperFunctions
					.applyAsymptoticTransform((toUserRoll + toUserSelfMod + toUserOppMod), 2000, 100);

				let fromUserFooterString = '';
				if (finalFromUserRoll !== fromUserRoll || fromUserOppMod !== 0
					|| fromUserSelfMod !== 0) {
					fromUserFooterString = `__**For a final roll of:**__ ${finalFromUserRoll}\n`;
				}

				let toUserFooterString = '';
				if (finalToUserRoll !== toUserRoll || toUserOppMod !== 0 || toUserSelfMod !== 0) {
					toUserFooterString = `__**For a final roll of:**__ ${finalToUserRoll}\n`;
				}

				if (finalFromUserRoll > finalToUserRoll) {
					fromGuildMemberData.currency.wallet = Number(fromGuildMemberData.currency.wallet);
					fromGuildMemberData.currency.wallet += betAmount;
					toGuildMemberData.currency.wallet = Number(toGuildMemberData.currency.wallet);
					toGuildMemberData.currency.wallet -= betAmount;
					await fromGuildMemberData.writeToDataBase();
					await toGuildMemberData.writeToDataBase();

					let currentPage = 0;

					let fromUserVicHeaderString = '';
					fromUserVicHeaderString = `<@!${fromUserID}> has defeated <@!${toUserID}>!!\n__Your rolls were__:\n`;

					finalStrings[currentPage] = fromUserVicHeaderString;

					const midFooter1 = `__**<@!${fromUserID}>:**__ ${fromUserRoll}\n`;
					const midFooter2 = `__**<@!${toUserID}>:**__ ${toUserRoll}\n`;

					finalStrings[currentPage] += midFooter1;

					let finalFooterString = '';
					finalFooterString = `${'-----\n__Your new wallet balances are:__\n'
												+ '<@!'}${fromUserID}>: ${fromGuildMemberData.currency.wallet} ${discordUser.userData.currencyName}\n`
												+ `<@!${toUserID}>: ${toGuildMemberData.currency.wallet} ${discordUser.userData.currencyName}\n------`;

					let fromUserModStrings = [];
					fromUserModStrings = fromUserGainStrings.concat(fromUserLossStrings);

					for (let x = 0; x < fromUserModStrings.length; x += 1) {
						if ((finalStrings[currentPage]!.length + fromUserModStrings[x]!.length
							+ midFooter1.length + fromUserFooterString.length) >= 2048) {
							finalStrings.length += 1;
							currentPage += 1;
							finalStrings[currentPage] = fromUserVicHeaderString;
						}
						finalStrings[currentPage] += fromUserModStrings[x];
						if (x === fromUserModStrings.length - 1) {
							finalStrings[currentPage] += fromUserFooterString;
						}
					}

					finalStrings[currentPage] += midFooter2;

					let toUserModStrings = [];
					toUserModStrings = toUserGainStrings.concat(toUserLossStrings);

					for (let x = 0; x < toUserModStrings.length; x += 1) {
						if ((finalStrings[currentPage]!.length + toUserModStrings[x]!.length
							+ toUserFooterString.length) >= 2048) {
							finalStrings.length += 1;
							currentPage += 1;
							finalStrings[currentPage] = fromUserVicHeaderString;
						}
						finalStrings[currentPage] += toUserModStrings[x];
						if (x === toUserModStrings.length - 1) {
							finalStrings[currentPage] += toUserFooterString;
						}
					}
					finalStrings[currentPage] += finalFooterString;

					messageEmbeds.length = finalStrings.length;
					for (let x = 0; x < finalStrings.length; x += 1) {
						messageEmbeds[x] = new Discord.MessageEmbed();
						messageEmbeds[x]!.setColor([0, 255, 0]).setTimestamp(Date.now()).setTitle(`__**DUEL RESULTS! (${x + 1} of ${finalStrings.length})**__`).setDescription(finalStrings[x]);
					}
				} else if (finalToUserRoll > finalFromUserRoll) {
					toGuildMemberData.currency.wallet = Number(toGuildMemberData.currency.wallet);
					toGuildMemberData.currency.wallet += betAmount;
					fromGuildMemberData.currency.wallet = Number(fromGuildMemberData.currency.wallet);
					fromGuildMemberData.currency.wallet -= betAmount;
					await fromGuildMemberData.writeToDataBase();
					await toGuildMemberData.writeToDataBase();

					let currentPage = 0;

					let toUserVicHeaderString = '';
					toUserVicHeaderString = `<@!${toUserID}> has defeated <@!${fromUserID}>!!\n__Your rolls were__:\n`;

					finalStrings[currentPage] = toUserVicHeaderString;

					const midFooter1 = `__**<@!${toUserID}>:**__ ${toUserRoll}\n`;
					const midFooter2 = `__**<@!${fromUserID}>:**__ ${fromUserRoll}\n`;

					finalStrings[currentPage] += midFooter1;

					const finalFooterString = `${'-----\n__Your new wallet balances are:__\n'
												+ '<@!'}${toUserID}>: ${toGuildMemberData.currency.wallet} ${discordUser.userData.currencyName}\n`
												+ `<@!${fromUserID}>: ${fromGuildMemberData.currency.wallet} ${discordUser.userData.currencyName}\n------`;

					let toUserModStrings = [];
					toUserModStrings = toUserGainStrings.concat(toUserLossStrings);

					for (let x = 0; x < toUserModStrings.length; x += 1) {
						if ((finalStrings[currentPage]!.length + toUserModStrings[x]!.length
							+ midFooter1.length + toUserFooterString.length) >= 2048) {
							finalStrings.length += 1;
							currentPage += 1;
							finalStrings[currentPage] = toUserVicHeaderString;
						}
						finalStrings[currentPage] += toUserModStrings[x];
						if (x === toUserModStrings.length - 1) {
							finalStrings[currentPage] += toUserFooterString;
						}
					}

					finalStrings[currentPage] += midFooter2;

					let fromUserModStrings = [];
					fromUserModStrings = fromUserGainStrings.concat(fromUserLossStrings);

					for (let x = 0; x < fromUserModStrings.length; x += 1) {
						if ((finalStrings[currentPage]!.length + fromUserModStrings[x]!.length
							+ fromUserFooterString.length) >= 2048) {
							finalStrings.length += 1;
							currentPage += 1;
							finalStrings[currentPage] = toUserVicHeaderString;
						}
						finalStrings[currentPage] += fromUserModStrings[x];
						if (x === fromUserModStrings.length - 1) {
							finalStrings[currentPage] += fromUserFooterString;
						}
					}
					finalStrings[currentPage] += finalFooterString;

					messageEmbeds.length = finalStrings.length;
					for (let x = 0; x < finalStrings.length; x += 1) {
						messageEmbeds[x] = new Discord.MessageEmbed();
						messageEmbeds[x]!.setColor([0, 255, 0]).setTimestamp(Date.now()).setTitle(`__**DUEL RESULTS! (${x + 1} of ${finalStrings.length})**__`).setDescription(finalStrings[x]);
					}
				} else if (finalToUserRoll === finalFromUserRoll) {
					finalStrings.length = 1;
					finalStrings[0] = '__**Looks like it was a draw! Nicely done!**__';
					newMessage.reactions.removeAll();
					messageEmbeds[0] = new Discord.MessageEmbed();
					messageEmbeds[0].setColor([0, 0, 255]).setTimestamp(Date.now()).setTitle(`__**DUEL RESULTS! (${0 + 1} of ${finalStrings.length})**__`).setDescription(finalStrings[0]);
					await newMessage.channel.send(messageEmbeds[0]);
					return commandReturnData;
				}
				const currentPageIndex = 0;
				const newerMessage = await newMessage.channel.send(messageEmbeds[currentPageIndex]!);
				if (newMessage.deletable) {
					await newMessage.delete();
				}
				await HelperFunctions.recurseThroughMessagePages(fromUserID,
					newerMessage, currentPageIndex, messageEmbeds, false);
			} else if (collected.first()!.emoji.name === '❌') {
				let rejectedString = '';

				rejectedString = `${rejectedString}Sorry, <@!${fromUserID}>, but <@!${toUserID}> has rejected your duel offer!`;
				const messageEmbed5 = new Discord.MessageEmbed();
				messageEmbed5.setColor([255, 0, 0]).setTimestamp(Date.now()).setTitle('__**DUEL REJECTED!**__').setDescription(rejectedString);
				await newMessage.channel.send(`<@!${fromUserID}>`, { embed: messageEmbed5 });
				if (newMessage.deletable) {
					await newMessage.delete();
				}
				return commandReturnData;
			}
			return commandReturnData;
		});
		return commandReturnData;
	} catch (error) {
		return new Promise((resolve, reject) => {
			reject(error);
		});
	}
}
command.function = execute;
export default command as FoundationClasses.BotCommand;
