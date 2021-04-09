// deletedbentry.ts - Module for my "delete db entry" command.
// Mar 18, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import FoundationClasses from '../FoundationClasses';
import DiscordUser from '../DiscordUser';
import GuildData from '../GuildData';
import HelperFunctions from '../HelperFunctions';

class Data{
	key: string = '';
	value: any;
}

class DeletedCounter {
	private deletedCount: number = 0;

	private data: Data = new Data();

	setData(key: string, value: any): void {
		const newData = new Data();
		newData.key = key;
		newData.value = value;
		this.data = newData;
	}

	getData(): Data {
		return this.data;
	}

	incrementDeletedCount(): void {
		this.deletedCount += 1;
	}

	returnDeletedCount(): number {
		return this.deletedCount;
	}
}

async function onData(dbKey: string, discordUser: DiscordUser, deletedCounter: DeletedCounter): Promise<void> {
	if (deletedCounter.getData() !== undefined && dbKey !== '') {
		if (deletedCounter.getData().key.includes(dbKey)) {
			try{
				console.log(deletedCounter.getData().key, '=', deletedCounter.getData().value);
				await discordUser.dataBase.del(deletedCounter.getData().key);
				deletedCounter.incrementDeletedCount();
			}
			catch(error) {
				if (error.message.includes('Unexpected token')) {
					await discordUser.dataBase.del(deletedCounter.getData().key);
					deletedCounter.incrementDeletedCount();
				}
			}
		}
	}
}

const command: FoundationClasses.BotCommand = {
	name: 'deletedbentry',
	description: "!deletedbentry = BOTNAME, DBENTRYKEY, where BOTNAME is a bot's name and DBENTRYKEY is the key" +
	"to a database entry that is stored within the bot!",
	function: Function()
};

async function execute(commandData: FoundationClasses.CommandData, discordUser: DiscordUser): Promise<FoundationClasses.CommandReturnData> {
	try {
		const commandReturnData: FoundationClasses.CommandReturnData = {
			commandName: command.name
		};
		
		const areWeInADM = await HelperFunctions.areWeInADM(commandData);

		if (areWeInADM) {
			return commandReturnData;
		}

		const areWeACommander = await HelperFunctions.doWeHaveAdminPermission(commandData, discordUser);

		if (!areWeACommander) {
			return commandReturnData;
		}

		const guildData = new GuildData({dataBase: discordUser.dataBase, id: commandData.guild!.id, name: commandData.guild!.name, memberCount: commandData.guild!.memberCount});
        await guildData.getFromDataBase();

		if (commandData.args[0] === undefined) {
			const msgString = `------\n**Please, enter a bot to delete the key from! (!deletedbentry = BOTNAME, DBENTRYKEY)**\n------`;
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
		if (commandData.args[0].toLowerCase() !== 'janny' && commandData.args[0].toLowerCase() !== 'musichouse' && commandData.args[0].toLowerCase() !== 'gamehouse') {
			const msgString = `------\n**Please, enter a bot to delete the key from! (!deletedbentry = BOTNAME, DBENTRYKEY)**\n------`;
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
		if (commandData.args[0].toLowerCase() !== 'gamehouse') {
			return commandReturnData;
		}
		if (commandData.args[1] === undefined) {
			const msgString = `------\n**Please, enter a DB key to search for!**\n------`;
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

		let dbKey = '';
		if (commandData.args[1] !== undefined) {
			const argZero = commandData.args[1].toString();
			dbKey = argZero;
		}

		const deletedCounter = new DeletedCounter();
		const iterator = discordUser.dataBase.iterate({});
		for await (const {key, value} of iterator) {
			console.log(key + ' = ' + value);
            if (key.includes(dbKey)) {
				deletedCounter.setData(key, value);
				await onData(dbKey, discordUser, deletedCounter);
			}
        }

		await iterator.end();
		const msgEmbed = new Discord.MessageEmbed();
		msgEmbed
			.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
			.setColor(guildData.borderColor as [number, number, number])
			.setDescription(`------\n__**Number of Deleted Entries**__: ${deletedCounter.returnDeletedCount()}\n------`)
			.setTimestamp(Date.now())
			.setTitle('__**Deleted DB Entries:**__');
		await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
		return commandReturnData;
	} catch (error) {
		return new Promise((resolve, reject) => {
			reject(error);
		});
	}
}
command.function = execute;
export default command as FoundationClasses.BotCommand;
