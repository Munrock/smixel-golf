const mongoose = require('mongoose');


const { Schema } = mongoose;

const courseSchema = new Schema({
    offset: Number,
    label: String,
    code: String
});



module.exports = {
    Course: mongoose.model('Course', courseSchema),

};