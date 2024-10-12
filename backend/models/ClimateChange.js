// models/ClimateChange.js
const mongoose = require('mongoose');

const ClimateChangeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    causes: [{ type: String, required: true }],
    disasters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Disaster' }], // This is correct
  });

module.exports = mongoose.model('ClimateChange', ClimateChangeSchema);


