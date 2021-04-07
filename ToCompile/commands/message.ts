// message.ts - Module for my message command.
// Jan 30, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import FoundationClasses from '../FoundationClasses';

const command: FoundationClasses.BotCommand = {
    name: 'message',
    description: '__**Message Usage**__: discordUser command executes automatically upon receiving certain messages!.',
    function: Function()
};

/**
* Selects a chosen chat message and sends it via the appropriate channel,
* upon recieving a trigger phrase or word.
*/
async function execute(message: Discord.Message): Promise<string> {
    try {
        const number = Math.random() * 100;
        if (message.content != null && message.content !== undefined) {
            if (message.content.toLowerCase().includes('hey ') && number <= 15) {
                await message.reply("Greetings, what's up fellow Discordee?! Can I offer you some drugs?");
            }
        }
        return command.name;
    } catch (error) {
        return new Promise((resolve, reject) => {
            reject(error);
        });
    }
}
command.function = execute;
export default command as FoundationClasses.BotCommand;
