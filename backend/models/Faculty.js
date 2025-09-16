const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
    name: { type: String, required: true },
    department: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    qualifications: [{ type: String }],
    unavailability: [{ type: String }],
    maxHoursPerWeek: { type: Number, default: 10 }
}, { timestamps: true });

module.exports = mongoose.model('Faculty', facultySchema);