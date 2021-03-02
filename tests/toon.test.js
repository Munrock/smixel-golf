require('dotenv').config();
const mongoose = require('mongoose');
const Toon = require('./../lib/toon');

beforeAll(async () => {
    return await mongoose.connect(process.env.MONGODB_ADDRESS, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

});

afterAll(() => {
    mongoose.connection.close();
});

describe('Toon', () => {
    test('create a toon', async () => {
        const testtoon = await Toon.make({
            name: { name: "Becky", nick: "The Man", full: "Becky Lynch", }
        }, '12345654321');

        expect(testtoon.data.name.name).toBe("Becky");
        expect(testtoon.data.name.nick).toBe("The Man");
        expect(testtoon.data.name.full).toBe("Becky Lynch");
        expect(testtoon.data.pronouns).toBe("np");
        expect(testtoon.data._id).toBeDefined();
    });

    test('retrieve a toon', async () => {
        const testtoon = await Toon.getFromPlayerId('12345654321');

        expect(testtoon.data.name.name).toBe("Becky");
        expect(testtoon.data.name.nick).toBe("The Man");
        expect(testtoon.data.name.full).toBe("Becky Lynch");
        expect(testtoon.data.pronouns).toBe("np");
        expect(testtoon.data._id).toBeDefined();
    });

    test('edit toon data', async () => {
        const testtoon = await Toon.getFromPlayerId('12345654321');
        testtoon.data.name.nick = "The Lasskicker";
        testtoon.data.pronouns = "f";
        await testtoon.save();
        const updatedtoon = await Toon.getFromPlayerId('12345654321');

        expect(updatedtoon.data.name.name).toBe("Becky");
        expect(updatedtoon.data.name.nick).toBe("The Lasskicker");
        expect(updatedtoon.data.name.full).toBe("Becky Lynch");
        expect(updatedtoon.data.pronouns).toBe("f");
        expect(updatedtoon.data._id).toBeDefined();
    });

    test('delete a toon', async () => {
        const testtoon = await Toon.getFromPlayerId('12345654321');
        await testtoon.destroy();
        const deletedtoon = await Toon.getFromPlayerId('12345654321');
        expect(deletedtoon).toBe(false);
    });

});
