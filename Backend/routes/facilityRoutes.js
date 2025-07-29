const express = require('express');
const router = express.Router();
const Facility = require('../models/Facilities');
const upload = require('../middleware/upload');
const auth = require('../middleware/auth');

// ✅ GET all facilities
router.get('/', async (req, res) => {
  try {
    const data = await Facility.find();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});


router.post('/', upload.single('image'),auth, async (req, res) => {
  try {
    const { name, description } = req.body;
    const image = req.file ? '/uploads/facilities/' + req.file.filename : '';

    const facility = new Facility({ name, description, image });
    await facility.save();
    res.status(201).json({ success: true, message: 'Facility added' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ✅ DELETE facility
router.delete('/:id', auth,async (req, res) => {
  try {
    await Facility.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
