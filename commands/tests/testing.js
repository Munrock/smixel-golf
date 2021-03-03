const { Command } = require('discord.js-commando');

const prompt = require('../../discord/prompt');

module.exports = class ActivityCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'testing',
            //aliases: [],
            group: 'tests',
            memberName: 'testing',
            description: 'test discordjs stuff',
            ownerOnly: true,   
            // args: [
            //     {
            //         key: 'search',
            //         prompt: `Character Name?`,
            //         type: 'string',
            //         default: ''
            //     }
            // ],
        });
    }

    async run(msg, { search }) {
       
        msg.reply('say something...');

        const something = await prompt(
            msg,
            msg.author.id,
            'nothing was said'
        );

        msg.say(something);
    }
};

