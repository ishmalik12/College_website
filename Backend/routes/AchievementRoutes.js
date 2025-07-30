const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const upload = require('../middleware/upload');
const Achievement = require('../models/Achievement');
const auth = require('../middleware/auth');
const fs = require('fs');



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

router.delete('/student/:id', auth, async (req, res) => {
  try {
    const achievement = await Achievement.findById(req.params.id);

    if (!achievement) {
      return res.status(404).json({ success: false, message: 'Achievement not found' });
    }

    // Delete the photo from the file system if it exists
    if (achievement.photo) {
      const filePath = path.join(__dirname, '..', achievement.photo);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    // Delete from database
    await Achievement.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: 'Achievement deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to delete achievement' });
  }
});

module.exports = router;
