const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const auth = require('../middleware/auth');
const IQACTeamMember = require('../models/IqacMember');


const {
  addIqacMember,
  getIqacTeam,
  deleteIqacMember,
  uploadIqacFile,
  getUploadsByType,
  deleteIqacUpload,
} = require('../controllers/iqacController');

// Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/iqac/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });
router.get('/', (req, res) => {
  res.send('IQAC API is working');
});

// 🔒 Admin-only routes
router.post('/team', auth, upload.single('photo'), addIqacMember);
router.delete('/team/:id', auth, deleteIqacMember);
// Update IQAC Member
router.put('/team/:id', auth, upload.single('photo'), async (req, res) => {
  try {
    const { name, designation, department, displayOrder } = req.body;

    const updateData = {
      name,
      designation,
      department,
      displayOrder: Number(displayOrder), 
    };
    if (updateData.displayOrder !== undefined) {
  updateData.displayOrder = Number(updateData.displayOrder);
}


    if (req.file) {
      updateData.photoUrl = `/uploads/photos/${req.file.filename}`;
    }

    const updated = await IQACTeamMember.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Member not found' });
    }

    res.json({ success: true, member: updated });
  } catch (error) {
    console.error('Update Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.delete('/upload/:id', auth, deleteIqacUpload);

router.post('/upload', auth, upload.single('file'), uploadIqacFile);

// 🌐 Public routes
router.get('/team', getIqacTeam);
router.get('/uploads/:type', getUploadsByType);

module.exports = router;
