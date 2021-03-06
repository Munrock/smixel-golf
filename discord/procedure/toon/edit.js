const prompt = require('./../../prompt');
const Toon = require('./../../../lib/toon');

async function edit_toon(msg, toon) {
    const playerId = msg.author.id;

    //break if they don't own the character
    if(msg.author.id!=toon.data.owner) return await msg.reply(`you don't appear to be the owner of ${toon.data.name.name}`);

    await msg.say(`While editing, use \`"\` to keep the existing value.`);

    //get the pronouns
    await msg.reply([
        `Change pronouns? Currently set to [${toon.pronouner.encode('[sub0]/[obj0]')}]:`,
        "1 they/them",
        "2 she/her",
        "3 he/him",
        "4 it🤖",
    ].join("\r\n"));

    constPronounResponse = await prompt(msg, [playerId], "1", ['1','2','3','4']);
    toon.data.pronouns = ['np','f','m','ns'][parseInt(constPronounResponse)-1];

    //get the names

    await msg.say(`Regular name [${toon.data.name.name}]:`);
    toon.data.name.name = await prompt(msg, [playerId], toon.data.name.name);

    await msg.say(`Full name [${toon.data.name.full}]:`);
    toon.data.name.full = await prompt(msg, [playerId], toon.data.name.full);

    await msg.say(`Nickname [${toon.data.name.nick}]:`);
    toon.data.name.nick = await prompt(msg, [playerId], toon.data.name.nick);

    await toon.save();
    await msg.reply(`changes saved!`);
    return toon;

}

module.exports = edit_toon;