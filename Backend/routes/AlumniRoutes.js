const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const upload = require('../middleware/upload');
const Alumni = require('../models/Alumni');
const auth = require('../middleware/auth');
const fs = require('fs');



// POST: Add Student Achievement
router.post('/alumni', auth, upload.single('photo'), async (req, res) => {
  try {
    const { name, batch, work } = req.body;
    const photo = req.file ? '/uploads/photos/' + req.file.filename : null;

    const alumni = new Alumni({
      name,
      batch,
      work,
      photo,
    });

    await alumni.save(); // ✅ FIXED this line
    res.json({ success: true, data: alumni });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Upload failed' });
  }
});

// GET: Fetch all student achievements
router.get('/alumni', async (req, res) => {
  try {
    const data = await Alumni.find();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch achievements' });
  }
});

router.delete('/alumni/:id', auth, async (req, res) => {
  try {
    const alumni = await Alumni.findById(req.params.id);

    if (!alumni) {
      return res.status(404).json({ success: false, message: 'Alumni not found' });
    }

    // Delete the photo from the file system if it exists
    if (alumni.photo) {
      const filePath = path.join(__dirname, '..', alumni.photo);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    // Delete from database
    await Alumni.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: 'Alumni deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to delete alumni' });
  }
});

module.exports = router;
