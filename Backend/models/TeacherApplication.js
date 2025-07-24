const mongoose = require('mongoose');

const teacherApplicationSchema = new mongoose.Schema({
  jobProfile: {
    type: String,
    required: true,
    enum: ['Assistant Professor', 'Lecturer']
  },
  fullName: {
    type: String,
    required: true,
    trim: true
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
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female', 'Other']
  },
  dob: {
    type: Date
  },
  city: {
    type: String,
    trim: true
  },
  ug: {
    type: String,
    required: true,
    enum: ['B.Sc', 'B.Tech']
  },
  pg: {
    type: String,
    required: true,
    enum: ['M.Sc', 'M.Tech']
  },
  specialization: {
    type: String,
    required: true,
    trim: true
  },
  otherQual: {
    type: String,
    trim: true
  },
  org: {
    type: String,
    trim: true
  },
  designation: {
    type: String,
    trim: true
  },
  academicExp: {
    type: String,
    required: true,
    enum: ['0-2 years', '2-5 years']
  },
  phdStatus: {
    type: String,
    enum: ['Completed', 'Pursuing']
  },
  ugcNet: {
    type: String,
    enum: ['Yes', 'No']
  },
  resumeUrl: {
    type: String
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'shortlisted', 'rejected', 'hired'],
    default: 'pending'
  },
  notes: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

// Indexes
teacherApplicationSchema.index({ status: 1, createdAt: -1 });
teacherApplicationSchema.index({ email: 1 });
teacherApplicationSchema.index({ jobProfile: 1 });

module.exports = mongoose.model('TeacherApplication', teacherApplicationSchema);