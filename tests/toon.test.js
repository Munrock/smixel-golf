require('dotenv').config();
const mongoose = require('mongoose');

beforeAll(async () => {
    return await mongoose.connect(process.env.MONGODB_ADDRESS, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

});

afterAll(()=>{
    mongoose.connection.close();
});

describe('Toon', () => {
    test('should exist', () => {
        expect(0).toBe(0);
    });
});
