const { Command } = require('discord.js-commando');
const Room = require('./../../lib/room');

module.exports = class ActivityCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'room',
            //aliases: [],
            group: 'editor',
            memberName: 'room',
            description: 'Room Editor',
            ownerOnly: true,
            args: [
                {
                    key: 'namespace',
                    prompt: `Namespace?`,
                    type: 'string',
                    wait: 600
                },
                {
                    key: 'nodeType',
                    prompt: `Node Type?`,
                    type: 'string',
                    oneOf: ['start', 'middle', 'end'],
                    wait: 600
                },
                {
                    key: 'biome',
                    prompt: `Biome?`,
                    type: 'string',
                    wait: 600
                },
                {
                    key: 'description',
                    prompt: `Description?`,
                    type: 'string',
                    wait: 600
                },
                {
                    key: 'arrival',
                    prompt: `arrival text?`,
                    type: 'string',
                    wait: 600
                },
                {
                    key: 'tags',
                    prompt: `Challenge: Tags?`,
                    type: 'string',
                    wait: 600
                },
                {
                    key: 'difficulty',
                    prompt: `Challenge: Difficulty?`,
                    type: 'integer',
                    wait: 600
                },
                {
                    key: 'success',
                    prompt: `success text?`,
                    type: 'string',
                    wait: 600
                },
                {
                    key: 'failure',
                    prompt: `failure tex?`,
                    type: 'string',
                    wait: 600
                },
            ],
        });
    }

    async run(msg, { namespace, nodeType, biome, description, arrival, tags, difficulty, success, failure }) {

        // const card = await CardLibrary.create(namespace.trim(), name.trim());

        // card.category = category.trim();
        // card.slot = slot.split(",").map(slot => slot.trim());
        // card.tags = tags.split(",").map(tag => tag.trim());
        // card.bonus = bonus.split(",").map(die => parseInt(die.trim()));
        // card.ctags = ctags.split(",").map(ctag => ctag.trim());
        // card.temporary = temporary;
        // card.cursed = cursed;

        // await card.save();

        // msg.say(`\`\`\`${JSON.stringify(card)}\`\`\``);

    }
};

