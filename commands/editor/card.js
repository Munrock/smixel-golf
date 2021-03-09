const { Command } = require('discord.js-commando');
const CardLibrary = require('./../../lib/card-library');

module.exports = class ActivityCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'card',
            //aliases: [],
            group: 'editor',
            memberName: 'card',
            description: 'Card Editor',
            ownerOnly: true,
            args: [
                {
                    key: 'namespace',
                    prompt: `Namespace?`,
                    type: 'string',
                    wait: 600
                },
                {
                    key: 'name',
                    prompt: `Name?`,
                    type: 'string',
                    wait: 600
                },
                {
                    key: 'category',
                    prompt: `Card Category?`,
                    type: 'string',
                    oneOf: ['gear','status','skill','personality'],
                    wait: 600
                },
                {
                    key: 'slot',
                    prompt: `Inventory Slot?`,
                    type: 'string',
                    wait: 600
                },
                {
                    key: 'tags',
                    prompt: `property tags, broken up by commas?`,
                    type: 'string',
                    wait: 600
                },
                {
                    key: 'temporary',
                    prompt: `Temporary?`,
                    type: 'boolean'
                },
                {
                    key: 'cursed',
                    prompt: `Cursed?`,
                    type: 'boolean'
                },
            ],
        });
    }

    async run(msg, { namespace, name, category, slot, tags, temporary, cursed }) {


        const card = await CardLibrary.create(namespace.trim(), name.trim());

        card.category = category.trim();
        card.slot = slot.trim();
        card.tags = tags.split(",").map(tag => tag.trim());;
        card.temporary = temporary;
        card.cursed = cursed;

        await card.save();

        msg.say(`\`\`\`${JSON.stringify(card)}\`\`\``);

    }
};

