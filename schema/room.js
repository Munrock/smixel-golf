const mongoose = require('mongoose');

const { Schema } = mongoose;

const roomSchema = new Schema({
    nodeType: { type: String, default: 'middle', enum: ['start', 'end', 'middle'] },
    canBeRandom: { type: Boolean, default: true },
    biome: { type: String, default: 'plains' },
    challenge: {
        difficulty: { type: Number, default: 3 },
        tags: { type: [String], default: ['golf club'] },
    },
    description: { type: String, default: 'No Description' },
    narrative: {
        arrival: { type: String, default: 'The ball lands in an undefined location.' },
        success: { type: String, default: 'name0 hits the ball clean and crisp.' },
        failure: { type: String, default: 'name0 scuffs the shot.  It veers wildly and bounces off a tree.' },
    },
    exits: {
        success: {
            exitType: { type: String, default: 'random', enum: ['random', 'link'] },
            link: {
                type: Schema.Types.ObjectId,
                ref: 'Room'
            },
        },
        failure: {
            exitType: { type: String, default: 'random', enum: ['random', 'link'] },
            link: {
                type: Schema.Types.ObjectId,
                ref: 'Room'
            }
        },
    },
    
});



// module.exports = {
//     Course: mongoose.model('Room', roomSchema),
// };
module.exports = mongoose.model('Room', rooomSchema);