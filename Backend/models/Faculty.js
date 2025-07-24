const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  designation: {
    type: String,
    required: true,
    trim: true
  },
  department: {
    type: String,
    required: true,
    trim: true
  },
  qualification: {
    type: String,
    required: true,
    trim: true
  },
  experience: {
    type: String,
    trim: true
  },
  specialization: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    trim: true
  },
  photoUrl: {
    type: String
  },
  bio: {
    type: String,
    trim: true
  },
  researchInterests: [{
    type: String,
    trim: true
  }],
  publications: [{
    title: String,
    journal: String,
    year: Number,
    url: String
  }],
  awards: [{
    title: String,
    year: Number,
    description: String
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  displayOrder: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Indexes
facultySchema.index({ department: 1, displayOrder: 1 });
facultySchema.index({ isActive: 1 });

module.exports = mongoose.model('Faculty', facultySchema);