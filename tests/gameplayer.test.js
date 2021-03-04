require('dotenv').config();
const mongoose = require('mongoose');
const Toon = require('./../lib/toon');
const Player = require('./../lib/player');
const GameData = require('./../lib/game-data');

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
