const prompt = require('./../../prompt');
const Toon = require('./../../../lib/toon');

async function create_toon(msg) {
    const playerId = msg.author.id;
    const playerName = msg.member.nickname?msg.member.nickname:msg.author.username;

    //need name x3, owner, prononouns, player id
    let data = {
        name: {
            name: playerName,
            nick: playerName,
            full: playerName,
        },
        pronouns: "np",
    };
    
    //get the pronouns
    await msg.reply([
        "answer a few questions to create your character!",
        "You'll see some default responses in [square brackers]; you can choose the default option by responding with a single \".",
        "Starting with pronouns - respond with a number [1]:",
        "1 they/them",
        "2 she/her",
        "3 he/him",
        "4 it/🤖",
    ].join("\r\n"));

    constPronounResponse = await prompt(msg, [playerId], "1", ['1','2','3','4']);
    data.pronouns = ['np','f','m','ns'][parseInt(constPronounResponse)+1];

    //get the names
    await msg.reply([
        "now decide character names.  You can specify 3 different names, or make them all the same",
        "regular name, e.g. Fappington",
        "'Full' name, e.g. Sir Fappington",
        "Nickname, e.g. Fappy",
        `Start with the regular name [${data.name.name}]:`
    ].join("\r\n"));
    data.name.name = await prompt(msg, [playerId], data.name.name);

    await msg.say(`Full name [${data.name.name}]:`);
    data.name.full = await prompt(msg, [playerId], data.name.name);

    await msg.say(`Nickname [${data.name.name}]:`);
    data.name.nick = await prompt(msg, [playerId], data.name.name);

    return await Toon.make(data, playerId);
}

module.exports = create_toon;