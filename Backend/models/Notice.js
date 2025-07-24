const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['urgent', 'info', 'success'],
    default: 'info'
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  priority: {
    type: String,
    enum: ['high', 'medium', 'low'],
    default: 'medium'
  },
  pinned: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  expiryDate: {
    type: Date
  },
  attachments: [{
    filename: String,
    originalName: String,
    url: String,
    size: Number
  }],
  author: {
    type: String,
    default: 'Admin'
  },
  views: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Indexes
noticeSchema.index({ isActive: 1, pinned: -1, createdAt: -1 });
noticeSchema.index({ category: 1 });
noticeSchema.index({ type: 1 });

module.exports = mongoose.model('Notice', noticeSchema);