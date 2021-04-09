// addshoprole.ts - Module for adding a shop role.
// Feb 7, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import FoundationClasses from '../FoundationClasses';
import DiscordUser from '../DiscordUser';
import GuildData from '../GuildData';
import HelperFunctions from '../HelperFunctions';

const command: FoundationClasses.BotCommand = {
	name: 'addshoprole',
	description: '__**Add Shop Role Usage:**__ !addshoprole = NAME, HEXCOLROVALUE, COST',
	function: Function()
};

async function execute(commandData: FoundationClasses.CommandData, discordUser: DiscordUser): Promise<FoundationClasses.CommandReturnData> {
	try {
		const commandReturnData: FoundationClasses.CommandReturnData = {
			commandName: command.name
		};
		commandReturnData.commandName = command.name;
		const areWeInADM = await HelperFunctions.areWeInADM(commandData);

		if (areWeInADM === true) {
			return commandReturnData;
		}

		const doWeHaveAdminPermission = await HelperFunctions.doWeHaveAdminPermission(commandData, discordUser);

		if (doWeHaveAdminPermission === false) {
			return commandReturnData;
		}

		const guildData = new GuildData({dataBase: discordUser.dataBase, id: commandData.guild!.id, memberCount: commandData.guild!.memberCount, name: commandData.guild!.name});
		await guildData.getFromDataBase();

		const nameRegExp = /.{1,36}/;
		const hexColorRegExp = /.{1,24}/;
		const costRegExp = /\d{1,18}/;
		if (commandData.args[0] === undefined || !nameRegExp.test(commandData.args[0])) {
			const msgString = `------\n**Please enter a proper role name! (!addshoprole = NAME, HEXCOLORVALIE, COST)**\n------`;
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
		if (commandData.args[1] === undefined || !hexColorRegExp.test(commandData.args[1])) {
			const msgString = `------\n**Please enter a valid hex color value! (!addshoprole = NAME, HEXCOLORVALIE, COST)**\n------`;
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
		if (commandData.args[2] === undefined || !costRegExp.test(commandData.args[2]) || parseInt(commandData.args[2], 10) <= 0) {
			const msgString = `------\n**Please enter a valid cost value! (!addshoprole = NAME, HEXCOLORVALIE, COST)**\n------`;
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

		const roleName = commandData.args[0].match(nameRegExp)![0]!;
		const roleColor = commandData.args[1].match(hexColorRegExp)![0];
		const roleCost = parseInt(commandData.args[2].match(costRegExp)![0]!, 10);

		for (let x = 0; x < guildData.guildShop.roles.length; x += 1) {
			if ((roleName as string).toLowerCase() === guildData.guildShop.roles[x]!.roleName.toLowerCase()) {
				const msgString = `------\n**Sorry, but a role by that name already exists!**\n------`;
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
		}

		const rolePermStrings: string[] = [];
		rolePermStrings[0] = 'CREATE_INSTANT_INVITE';
		rolePermStrings[1] = 'ADD_REACTIONS';
		rolePermStrings[2] = 'VIEW_CHANNEL';
		rolePermStrings[3] = 'SEND_MESSAGES';
		rolePermStrings[4] = 'CHANGE_NICKNAME';
		rolePermStrings[5] = 'USE_EXTERNAL_EMOJIS';
		rolePermStrings[6] = 'CONNECT';
		rolePermStrings[7] = 'EMBED_LINKS';
		rolePermStrings[8] = 'ATTACH_FILES';
		rolePermStrings[9] = 'SPEAK';

		const roleManager = new Discord.RoleManager(commandData.guild!);

		const role = await roleManager.create({
			data: {
				name: roleName,
				color: roleColor,
				permissions: rolePermStrings as Discord.PermissionResolvable,
				hoist: true,
				mentionable: true,
			},
		});

		const currentRole: FoundationClasses.InventoryRole = {
			roleCost: roleCost,
			roleName: roleName,
			roleID: role.id
		}

		guildData.guildShop.roles.push(currentRole);
		await guildData.writeToDataBase();

		let msgString = '';
		msgString = `${"Nicely done! You've added a new role to the store's inventory, giving the server access to it!\nIt is as follows:\n------\n"
						+ '__**Role:**__ <@&'}${role.id}> **__Cost__**: ${roleCost}\n------`;
		const messageEmbed = new Discord.MessageEmbed();
		messageEmbed
			.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL() as string)
			.setColor(roleColor as string)
			.setDescription(msgString)
			.setTimestamp(Date.now())
			.setTitle('__**New Role Added:**__');

		await HelperFunctions.sendMessageWithCorrectChannel(commandData, messageEmbed);
		return commandReturnData;
	} catch (error) {
		return new Promise((resolve, reject) => {
			reject(error);
		});
	}
}
command.function = execute;
export default command as FoundationClasses.BotCommand;
