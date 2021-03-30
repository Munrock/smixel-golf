const mongoose = require('mongoose');

const { Schema } = mongoose;

const roomSchema = new Schema({
    nodeType: { type: String, default: 'middle', enum: ['start','end','middle']},
    canBeRandom: { type: Boolean, default: true },
    biome: { type: String, default: 'plains' },
    challenge: {
       difficulty: { type: Number, default: 3 },
       tags: { type: [String], default: ['misc']},
    },
    description: { type: String, default: 'No Description'},
    narrative: { type: String, default: 'The ball lands in an undefined location.'},
});



// module.exports = {
//     Course: mongoose.model('Room', roomSchema),
// };
module.exports = mongoose.model('Room', rooomSchema);