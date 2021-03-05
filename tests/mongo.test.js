require('dotenv').config();
const mongoose = require('mongoose');
const Toon = require('./../lib/toon');
const Player = require('./../lib/player');
const GameData = require('./../lib/game-data');
const CardData = require('./../schema/card');

beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_ADDRESS, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });
    await Toon.make({
        name: { name: "Becky", nick: "The Man", full: "Becky Lynch", }
    }, 'gameplayertestid1');

});

afterAll(async () => {
    const testtoon = await Toon.getFromPlayerId('gameplayertestid1');
    await testtoon.destroy();
    const othertoon = await Toon.getFromPlayerId('gameplayertestid2');
    await othertoon.destroy();

    mongoose.connection.close();
});


describe('Toon', () => {
    test('create a toon', async () => {
        const testtoon = await Toon.make({
            name: { name: "Becky", nick: "The Man", full: "Becky Lynch", }
        }, 'toontestid');

        expect(testtoon.data.name.name).toBe("Becky");
        expect(testtoon.data.name.nick).toBe("The Man");
        expect(testtoon.data.name.full).toBe("Becky Lynch");
        expect(testtoon.data.pronouns).toBe("np");
        expect(testtoon.data._id).toBeDefined();
    });

    test('retrieve a toon', async () => {
        const testtoon = await Toon.getFromPlayerId('toontestid');

        expect(testtoon.data.name.name).toBe("Becky");
        expect(testtoon.data.name.nick).toBe("The Man");
        expect(testtoon.data.name.full).toBe("Becky Lynch");
        expect(testtoon.data.pronouns).toBe("np");
        expect(testtoon.data._id).toBeDefined();
    });

    test('toon pronouns', async () => {
        const testtoon = await Toon.getFromPlayerId('toontestid');

        const string = "name is name0, nick is nick0, full name is full0, :: line break sub0 vtb0 nick0, this sentence is about obj0, the championship is pop0, it is poa0 championship, sub0 vtb0 the best.";

        const processed = testtoon.pronouner.encode(string);

        expect(processed).toEqual(["name is Becky, nick is The Man, full name is Becky Lynch, ", " line break they are The Man, this sentence is about them, the championship is theirs, it is their championship, they are the best."]);
    });

    test('edit toon data', async () => {
        const testtoon = await Toon.getFromPlayerId('toontestid');
        testtoon.data.name.nick = "The Lasskicker";
        testtoon.data.pronouns = "f";
        await testtoon.save();
        const updatedtoon = await Toon.getFromPlayerId('toontestid');

        expect(updatedtoon.data.name.name).toBe("Becky");
        expect(updatedtoon.data.name.nick).toBe("The Lasskicker");
        expect(updatedtoon.data.name.full).toBe("Becky Lynch");
        expect(updatedtoon.data.pronouns).toBe("f");
        expect(updatedtoon.data._id).toBeDefined();
    });

    test('toon pronouns again', async () => {
        const testtoon = await Toon.getFromPlayerId('toontestid');

        const string = "name is name0, nick is nick0, full name is full0, :: line break sub0 vtb0 nick0, this sentence is about obj0, the championship is pop0, it is poa0 championship, sub0 vtb0 the best.";

        const processed = testtoon.pronouner.encode(string);

        expect(processed).toEqual(["name is Becky, nick is The Lasskicker, full name is Becky Lynch, ", " line break she is The Lasskicker, this sentence is about her, the championship is hers, it is her championship, she is the best."]);
    });

    test('delete a toon', async () => {
        const testtoon = await Toon.getFromPlayerId('toontestid');
        const ttid = testtoon.data._id;
        await testtoon.destroy();
        const deletedtoon = await Toon.getFromId(ttid);
        expect(deletedtoon).toBe(false);
    });

});

describe('Player', () => {

    test('retrieve a toon from player', async () => {
        const player = new Player('gameplayertestid1');

        const toon = await player.toon();
        expect(toon.data.name.full).toBe("Becky Lynch");
    });

    test('set player focus on another toon', async () => {
        const player = new Player('gameplayertestid1');
        const othertoon = await Toon.make({
            name: { name: "Charlotte", nick: "The Queen", full: "Charlotte Flair", }
        }, 'gameplayertestid2');

        player.focusToon(othertoon);

        const toon = await player.toon();
        expect(toon.data.name.full).toBe("Charlotte Flair");
    });

});

describe('Card Schema', ()=>{

    test('create', async () => {
        const card = new CardData();
        card.name = 'Test Club';
        card.namespace = 'Test Cards';
        card.slot = 'main hand';
        card.category = 'gear';
        card.tags = ['club','blunt','melee'];
        card.temporary = false;
        card.cursed = false;
        await card.save();
        expect(card._id).toBeDefined();
    });

    test('retrieve, update', async () => {
        const card = await CardData.findOne({name: 'Test Club', namespace:'Test Cards'});
        card.name = 'Spiky Test Club';
        card.tags.push('piercing');
        await card.save();
        expect(card.name).toBe('Spiky Test Club');
        expect(card.tags).toContain('piercing');
    });

    test('retrieve, delete', async () => {
        const card = await CardData.findOne({namespace: 'Test Cards'});
        const id = card._id;
        expect(id).toBeDefined();
        await Card.findByIdAndDelete(id);
        const deletedcard = await CardData.findById(id);
        expect(deletedcard).toBeNull();
    });

});

describe('GameData', () => {

    test('load a player and get their toon', async () => {
        const g = new GameData();
        const becky = await g.getPlayer('gameplayertestid1').toon();
        expect(becky.data.name.full).toBe("Becky Lynch");
    });

});
