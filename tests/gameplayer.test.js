require('dotenv').config();
const mongoose = require('mongoose');
const Toon = require('./../lib/toon');
const Player = require('./../lib/player');
const GameData = require('./../lib/game-data');

beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_ADDRESS, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    const testtoon = await Toon.make({
        name: { name: "Becky", nick: "The Man", full: "Becky Lynch", }
    }, '12345654321');

});

afterAll(async () => {
    const testtoon = await Toon.getFromPlayerId('12345654321');
    await testtoon.destroy();
    const othertoon = await Toon.getFromPlayerId('asdfgfdsa');
    await othertoon.destroy();

    mongoose.connection.close();
});

describe('Player', () => {

    test('retrieve a toon from player', async () => {
        const player = new Player('12345654321');

        const toon = await player.toon();
        expect(toon.data.name.full).toBe("Becky Lynch");
    });


    test('set player focus on another toon', async () => {
        const player = new Player('12345654321');
        const othertoon = await Toon.make({
            name: { name: "Charlotte", nick: "The Queen", full: "Charlotte Flair", }
        }, 'asdfgfdsa');

        player.focusToon(othertoon);
    
        const toon = await player.toon();
        expect(toon.data.name.full).toBe("Charlotte Flair");
    });






});
