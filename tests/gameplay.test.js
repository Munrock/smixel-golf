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


describe('SkillCheck', () => {

    test('roll 2d6', () => {
        const result = SkillCheck.roll([6, 6]);
        expect(result).toBeGreaterThanOrEqual(2);
        expect(result).toBeLessThanOrEqual(12);
    });

    test('roll d6', () => {
        const result = SkillCheck.roll([6]);
        expect(result).toBeGreaterThanOrEqual(1);
        expect(result).toBeLessThanOrEqual(6);
    });

    test('roll 2d4', () => {
        const result = SkillCheck.roll([4, 4]);
        expect(result).toBeGreaterThanOrEqual(2);
        expect(result).toBeLessThanOrEqual(8);
    });

    test('roll d2', () => {
        const result = SkillCheck.roll([2]);
        expect(result).toBeGreaterThanOrEqual(1);
        expect(result).toBeLessThanOrEqual(2);
    });

    test('roll 2d1', () => {
        const result = SkillCheck.roll([1]);
        expect(result).toBe(1);
    });

    test('failed skillcheck with no bonuses', async () => {
        const toon = await Toon.getFromPlayerId('gameplayertestid2');
        toon.library.drawToHandSize();
        const sc = new SkillCheck(toon);
        const results = sc.test(['misc'], 5);
        console.log(SkillCheck.explainDice(results.dice));
        expect(results.result).toBe(false);
        expect(results.dice).toStrictEqual([4]);
        expect(results.target).toBe(5);
        expect(results.roll).toBeGreaterThanOrEqual(1);
        expect(results.roll).toBeLessThanOrEqual(4);
    });

    test('passed skillcheck with no bonuses', async () => {
        const toon = await Toon.getFromPlayerId('gameplayertestid2');
        toon.library.drawToHandSize();
        const sc = new SkillCheck(toon);
        const results = sc.test(['misc'], 1);
        console.log(SkillCheck.explainDice(results.dice));
        expect(results.result).toBe(true);
        expect(results.dice).toStrictEqual([4]);
        expect(results.target).toBe(1);
        expect(results.roll).toBeGreaterThanOrEqual(1);
        expect(results.roll).toBeLessThanOrEqual(4);
    });

});
