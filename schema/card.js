const mongoose = require('mongoose');
const { Schema } = mongoose;

const cardSchema = new Schema({
    name: { type: String, default: 'untitled' },
    namespace: { type: String },
    
    //slot defines an equipment slot / concept
    //can have multiple slots e.g. 'main hand' and 'off-hand'
    slot: { type: [String], default: ['none']}, // if 'none', ignore all other entries.

    //aesthetic supercategory of slot
    //non-strict enum: gear, status, skill, personality
    category: { type: String, default: 'gear'},
    
    //tags define the traits that will be added to the character.
    //these have no inherent abilities but can be checked for by tests
    tags: {type: [String], default: []},

    //does the card disappear at the end of a run?
    temporary: {type: Boolean, default: false},

    //can the card be removed by the player?
    cursed: {type: Boolean, default: false},
});

module.exports = mongoose.model('Card', cardSchema);