const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true,trim:true },
    capacity: { type: Number, required: true,min:1 },
    type: { type: String, required: true, enum: ['Lecture Hall', 'Laboratory','Seminar Room','Computer Lab'] },
    location: { type: String ,trim:true}}, { timestamps: true });

module.exports = mongoose.model('Room', roomSchema);