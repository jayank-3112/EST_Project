const mongoose = require('mongoose');

const DisasterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  impact: { type: String, required: true },
  climateChange: { type: mongoose.Schema.Types.ObjectId, ref: 'ClimateChange' },
});

module.exports = mongoose.model('Disaster', DisasterSchema);
