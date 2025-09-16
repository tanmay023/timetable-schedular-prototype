const mongoose = require('mongoose');

const batchSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true,trim:true },
    year: { type: Number, required: true,min:1,max:5 },
    department: { type: String, required: true,trim:true },
    strength: { type: Number, required: true,min:1 },
    subjects:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }]
}, { timestamps: true });

module.exports = mongoose.model('Batch', batchSchema);