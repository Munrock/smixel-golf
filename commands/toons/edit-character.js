const { Command } = require('discord.js-commando');
const create_toon = require('./../../discord/procedure/toon/create');
const edit_toon = require('./../../discord/procedure/toon/edit');

module.exports = class ActivityCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'edit-character',
            //aliases: [],
            group: 'toons',
            memberName: 'edit',
            description: 'Edit a golfer',
        });
    }

    async run(msg) {
        //TODO revise this if we allow more than one golfer per player
       
        const player = this.client.gameData.getPlayer(msg.author.id);
        console.log("player---------", player);

        //get a character focused if there isn't one
        //currently, one toon per character so if there isn't a character we create instead.
        try {
            console.log("try");
            const toon = await player.toon();
            console.log("toon---------", toon);
            await edit_toon(msg, toon);
        }catch (e) {
            //same as new-character.js
            console.error(e);
            const result = await create_toon(msg);
            console.log(result);
            msg.reply('your character is created!');
        }

        //run the edit process
        
    }
};

