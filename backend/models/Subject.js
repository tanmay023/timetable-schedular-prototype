const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    code: { type: String, required: true, unique: true },
    credits: { type: Number, required: true },
    department: { type: String, required: true },
    semester: { type: Number, required: true },
    lectureHours: { type: Number, default: 0 },
    labHours: { type: Number, default: 0 },
    type: { type: String,required:true, enum: ['Core', 'Elective','Lab'], required: true }
}, { timestamps: true });

module.exports = mongoose.model('Subject', subjectSchema);