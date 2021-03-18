require('dotenv').config();
const mongoose = require('mongoose');
const Toon = require('./../lib/toon');
const Player = require('./../lib/player');
const GameData = require('./../lib/game-data');
const CardData = require('./../schema/card');
const CardLibrary = require('./../lib/card-library');
const SkillCheck = require('./../lib/skill-check');

beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_ADDRESS, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });
    await Toon.make({
        name: { name: "Becky", nick: "The Man", full: "Becky Lynch", }
    }, 'gameplayertestid1');
    await Toon.make({
        name: { name: "Charlotte", nick: "The Queen", full: "Charlotte Flair", }
    }, 'gameplayertestid2');

});

afterAll(async () => {
    const testtoon = await Toon.getFromPlayerId('gameplayertestid1');
    await testtoon.destroy();
    const othertoon = await Toon.getFromPlayerId('gameplayertestid2');
    await othertoon.destroy();

    await CardData.deleteMany({
        namespace: 'testatoes'
    });

    mongoose.connection.close();
});


describe('SkillCheck',()=>{

    test('failed skillcheck with no bonuses', async () => {
        const toon = await Toon.getFromPlayerId('gameplayertestid2');
        const sc = new SkillCheck(toon);
        const results = sc.test(['misc'],5);
        expect(results.result).toBe(false);
        expect(results.dice[0]).toBeGreaterThanOrEqual(1);
        expect(results.dice[0]).toBeLessThanOrEqual(4);
    });

    test('passed skillcheck with no bonuses', async () => {
        const toon = await Toon.getFromPlayerId('gameplayertestid2');
        const sc = new SkillCheck(toon);
        const results = sc.test(['misc'],1);
        expect(results.result).toBe(true);
        expect(results.dice[0]).toBeGreaterThanOrEqual(1);
        expect(results.dice[0]).toBeLessThanOrEqual(4);
    });

});
