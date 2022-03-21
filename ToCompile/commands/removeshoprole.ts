// removeshoprole.ts - Module for my remove shop role command.
// Feb 6, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import FoundationClasses from '../FoundationClasses';
import DiscordUser from '../DiscordUser';
import GuildData from '../GuildData';
import HelperFunctions from '../HelperFunctions';

const command: FoundationClasses.BotCommand = {
	name: 'removeshoprole',
	description: '__**Remove Shop Role Usage:**__ !removeshoprole = ROLENAME',
	function: Function()
};

async function  execute(commandData: FoundationClasses.CommandData, discordUser: DiscordUser): Promise<FoundationClasses.CommandReturnData> {
	try {
		const commandReturnData: FoundationClasses.CommandReturnData = {
			commandName: command.name
		};
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

		const roleNameRegExp = /.{1,36}/;
		if (commandData.args[0] === undefined || !roleNameRegExp.test(commandData.args[0])) {
			const msgString = `------\n**Please enter a valid role name! (!removeshoprole = ROLENAME)**\n------`;
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

		const roleName = commandData.args[0];

		let realRoleName = '';
		let roleID = '';
		let isRoleFound = Boolean(false);
		for (let x = 0; x < guildData.guildShop.roles.length; x += 1) {
			if (roleName === guildData.guildShop.roles[x]!.roleName) {
				roleID = guildData.guildShop.roles[x]!.roleID;
				realRoleName = guildData.guildShop.roles[x]!.roleName;
				isRoleFound = true;
				guildData.guildShop.roles.splice(x, 1);
				await guildData.writeToDataBase();
				break;
			}
		}

		let msgString = '';

		if (isRoleFound === false) {
			msgString += '------\nThe role could not be found in the guild data cache!\n------';
		}

		const roleManager = new Discord.RoleManager(commandData.guild!);

		const role = await roleManager.fetch(roleID)!;

		try {
			role!.delete();

			msgString += `You've just deleted a role from the shop/server!\n------\n__**Role Name:**__ ${realRoleName}\n------`;

			const messageEmbed = new Discord.MessageEmbed();
			messageEmbed.setDescription(msgString).setTimestamp(Date.now()).setTitle('__**Shop/Server Role Deleted:**__').setColor([255, 0, 0]);
			await HelperFunctions.sendMessageWithCorrectChannel(commandData, messageEmbed);
			return commandReturnData;
		} catch (error) {
			msgString = '------\nSorry, but the role was not found in the guild!\n------';

			const messageEmbed = new Discord.MessageEmbed();
			messageEmbed.setDescription(msgString).setTimestamp(Date.now()).setTitle('__**Shop/Server Role Deleted:**__').setColor([255, 0, 0]);
			await HelperFunctions.sendMessageWithCorrectChannel(commandData, messageEmbed);
			return commandReturnData;
		}
	} catch (error) {
		return new Promise((resolve, reject) => {
			reject(error);
		});
	}
}
command.function = execute;
export default command as FoundationClasses.BotCommand;
