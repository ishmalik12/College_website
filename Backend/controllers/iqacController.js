const IqacMember = require('../models/IqacMember');
const IqacUpload = require('../models/IqacUpload');
const fs = require('fs');
const path = require('path');
// ------------------ IQAC TEAM ------------------

// ➕ Add IQAC Member
exports.addIqacMember = async (req, res) => {
  try {
    const { name, designation, department } = req.body;
    
    // Convert displayOrder to number explicitly
    const displayOrder = isNaN(Number(req.body.displayOrder)) ? 0 : Number(req.body.displayOrder);


    const photoUrl = req.file ? `/uploads/iqac/${req.file.filename}` : '';

    const member = new IqacMember({ name, designation, department, photoUrl, displayOrder });
    await member.save();

    res.status(201).json({ success: true, member });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};


// 📃 Get IQAC Team (public)
exports.getIqacTeam = async (req, res) => {
  try {
    const team = await IqacMember.find().sort({ name: 1 });
    res.json({ success: true, team });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ❌ Delete IQAC Member
exports.deleteIqacMember = async (req, res) => {
  try {
    await IqacMember.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Member removed' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ------------------ IQAC UPLOADS ------------------

// 📤 Upload File (minutes / mou / circular)
exports.uploadIqacFile = async (req, res) => {
  try {
    const { type, title, description } = req.body;
    const filePath = req.file ? `/uploads/iqac/${req.file.filename}` : '';
    const fileType = req.file?.mimetype;

    const upload = new IqacUpload({ type, title, description, filePath, fileType });
    await upload.save();

    res.status(201).json({ success: true, upload });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// 📂 Get Uploads by Type (minutes/mou/circular)
exports.getUploadsByType = async (req, res) => {
  try {
    const { type } = req.params; 
    const files = await IqacUpload.find({ type }).sort({ createdAt: -1 });
    res.json({ success: true, files });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};


exports.deleteIqacUpload = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await IqacUpload.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "File not found" });
    }
    res.json({ success: true, message: "Upload deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
