const mongoose = require('mongoose');

const alumniSchema = new mongoose.Schema({
  name: { type: String, required: true },
  batch: { type: String, required: true },
  work: { type: String, required: true },
  photo: { type: String }, 
});

module.exports = mongoose.model('Alumni', alumniSchema);
