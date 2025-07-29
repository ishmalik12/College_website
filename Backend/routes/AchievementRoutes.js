const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const upload = require('../middleware/upload');
const Achievement = require('../models/Achievement');
const auth = require('../middleware/auth');



// POST: Add Student Achievement
router.post('/student',auth, upload.single('photo'), async (req, res) => {
  try {
    const { name, description } = req.body;
    const photo = req.file ? '/uploads/photos/' + req.file.filename : null;
    const achievement = new Achievement({
      name,
      description,
      photo,
      type: 'student'
    });

    await achievement.save();
    res.json({ success: true, data: achievement });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Upload failed' });
  }
});

// GET: Fetch all student achievements
router.get('/student', async (req, res) => {
  try {
    const data = await Achievement.find({ type: 'student' });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch achievements' });
  }
});

module.exports = router;
