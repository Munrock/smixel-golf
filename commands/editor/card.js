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
                    prompt: `Inventory Slot (can be more than one, seperated by commas)?`,
                    type: 'string',
                    wait: 600
                },
                {
                    key: 'tags',
                    prompt: `property tags [defines where the card bonus can be applied], broken up by commas?`,
                    type: 'string',
                    wait: 600
                },
                {
                    key: 'bonus',
                    prompt: `bonus dice values to be added, broken up by commas.\r\n \`0=d4, 1=d6, 2=d8, 3=d10, 4=d12, 5=d20\``,
                    type: 'string',
                    wait: 600
                },
                {
                    key: 'ctags',
                    prompt: `character property tags, broken up by commas?`,
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

    async run(msg, { namespace, name, category, slot, tags, ctags, temporary, cursed }) {


        const card = await CardLibrary.create(namespace.trim(), name.trim());

        card.category = category.trim();
        card.slot = slot.split(",").map(slot=>slot.trim());
        card.tags = tags.split(",").map(tag => tag.trim());
        card.bonus = bonus.split(",").map(die => parseInt(die.trim()));
        card.ctags = ctags.split(",").map(ctag => ctag.trim());
        card.temporary = temporary;
        card.cursed = cursed;

        await card.save();

        msg.say(`\`\`\`${JSON.stringify(card)}\`\`\``);

    }
};

