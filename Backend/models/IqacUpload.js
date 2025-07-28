const mongoose = require('mongoose');

const iqacUploadSchema = new mongoose.Schema({
  type: { 
    type: String, 
    enum: ['minutes', 'mou', 'circular'], 
    required: true 
  },
  title: String,
  description: String,
  filePath: String,
  fileType: String,
  uploadedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('IqacUpload', iqacUploadSchema);
