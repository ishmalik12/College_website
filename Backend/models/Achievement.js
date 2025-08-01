const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  photo: { type: String }, 
  type: { type: String, enum: ['student', 'academic', 'research'], default: 'student' }
});

module.exports = mongoose.model('Achievement', achievementSchema);
