const { Command } = require('discord.js-commando');
const create_toon = require('./../../discord/procedure/toon/create');

module.exports = class ActivityCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'new-character',
            //aliases: [],
            group: 'toons',
            memberName: 'create',
            description: 'Create a golfer',
        });
    }

    async run(msg) {
       
       const result = await create_toon(msg);

       console.log(result);

       msg.reply('your character is created!');
        
    }
};

