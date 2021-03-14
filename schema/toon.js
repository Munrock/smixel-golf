const mongoose = require('mongoose');
const CardData = require('./card');


const { Schema } = mongoose;

const toonSchema = new Schema({
    owner: { type: String, index: true },
    name: {
        nick: String,
        full: String,
        name: String,
    },
    deck: [{
        type: Schema.Types.ObjectId,
        ref: 'Card'
    }],
    pronouns: { type: String, enum: ['f', 'm', 'np', 'ns'], default: 'np' },
    //Masculine, Feminine, Neutral-Plural, Neutral-Singular

    stats: {
        base: {
            physical: {
                agility: { type: Number, default: 0 },
                fortitude: { type: Number, default: 0 },
                might: { type: Number, default: 0 },
            },
            mental: {
                learning: { type: Number, default: 0 },
                logic: { type: Number, default: 0 },
                perception: { type: Number, default: 0 },
                will: { type: Number, default: 0 },
            },
            social: {
                deception: { type: Number, default: 0 },
                persuasion: { type: Number, default: 0 },
                presence: { type: Number, default: 0 },
            },
            extra: {
                alteration: { type: Number, default: 0 },
                creation: { type: Number, default: 0 },
                energy: { type: Number, default: 0 },
                entropy: { type: Number, default: 0 },
                influence: { type: Number, default: 0 },
                movement: { type: Number, default: 0 },
                prescience: { type: Number, default: 0 },
                protection: { type: Number, default: 0 },
            },
        },
        current: {
            physical: {
                agility: { type: Number, default: 0 },
                fortitude: { type: Number, default: 0 },
                might: { type: Number, default: 0 },
            },
            mental: {
                learning: { type: Number, default: 0 },
                logic: { type: Number, default: 0 },
                perception: { type: Number, default: 0 },
                will: { type: Number, default: 0 },
            },
            social: {
                deception: { type: Number, default: 0 },
                persuasion: { type: Number, default: 0 },
                presence: { type: Number, default: 0 },
            },
            extra: {
                alteration: { type: Number, default: 0 },
                creation: { type: Number, default: 0 },
                energy: { type: Number, default: 0 },
                entropy: { type: Number, default: 0 },
                influence: { type: Number, default: 0 },
                movement: { type: Number, default: 0 },
                prescience: { type: Number, default: 0 },
                protection: { type: Number, default: 0 },
            },
        },
    },
    hp: { type: Number, default: 10 },
});



module.exports = mongoose.model('Toon', toonSchema);