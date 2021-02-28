const { Command } = require('discord.js-commando');


module.exports = class ActivityCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'enter',
            //aliases: [],
            group: 'play',
            memberName: 'enter',
            description: 'Enter a character into the ring',   
            args: [
                {
                    key: 'search',
                    prompt: `Character Name?`,
                    type: 'string',
                    default: ''
                }
            ],
        });
    }

    async run(msg, { search }) {
       
        //scree
    }
};

