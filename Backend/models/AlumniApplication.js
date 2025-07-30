const mongoose = require('mongoose');

const alumniApplicationSchema = new mongoose.Schema({
  program: {
    type: String,
    required: true,
    enum: ['Bachelor of Arts (B.A.)', 'Bachelor of Commerce (B.Com.)', 'Bachelor of Science (B.Sc.)', 'B.Sc. Maths','B.Sc. Biology']
  },
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  passingYear: {
    type: Number,
    required: true
  },
  mobile: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  dob: {
    type: Date
  },
  organization: {
    type: String,
    required: true,
    trim: true
  },
  designation: {
    type: String,
    required: true,
    trim: true
  },
  testimonial: {
    type: String,
    required: true,
    trim: true
  },
  photoUrl: {
    type: String
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'featured', 'archived'],
    default: 'pending'
  },
  featured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Indexes
alumniApplicationSchema.index({ status: 1, createdAt: -1 });
alumniApplicationSchema.index({ program: 1 });
alumniApplicationSchema.index({ passingYear: 1 });

module.exports = mongoose.model('AlumniApplication', alumniApplicationSchema);