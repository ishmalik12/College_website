const express = require('express');
const Faculty = require('../models/Faculty');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const router = express.Router();

// Get all faculty (public)
router.get('/public', async (req, res) => {
  try {
    const { department } = req.query;
    const filter = { isActive: true };
    
    if (department) filter.department = department;
    
    const faculty = await Faculty.find(filter)
      .sort({ displayOrder: 1, name: 1 });

    res.json({ success: true, faculty });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching faculty', error: error.message });
  }
});

// Get all faculty (admin)
router.get('/', auth, async (req, res) => {
  try {
    const { department, isActive, page = 1, limit = 20 } = req.query;
    const filter = {};
    
    if (department) filter.department = department;
    if (isActive !== undefined) filter.isActive = isActive === 'true';
    
    const faculty = await Faculty.find(filter)
      .sort({ displayOrder: 1, name: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Faculty.countDocuments(filter);

    res.json({
      success: true,
      faculty,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching faculty', error: error.message });
  }
});

// Create faculty

router.post('/', auth, upload.single('photo'), async (req, res) => {
  try {
    const facultyData = { ...req.body };
    
    if (req.file) {
      facultyData.photoUrl = `/uploads/photos/${req.file.filename}`;
    }

    // Parse arrays if they come as strings
    if (facultyData.researchInterests && typeof facultyData.researchInterests === 'string') {
      facultyData.researchInterests = JSON.parse(facultyData.researchInterests);
    }
    if (facultyData.publications && typeof facultyData.publications === 'string') {
      facultyData.publications = JSON.parse(facultyData.publications);
    }
    if (facultyData.awards && typeof facultyData.awards === 'string') {
      facultyData.awards = JSON.parse(facultyData.awards);
    }

    const faculty = new Faculty(facultyData);
    await faculty.save();

    res.status(201).json({ success: true, faculty });
  } catch (error) {
    res.status(500).json({ message: 'Error creating faculty', error: error.message });
  }
});

// Update faculty
router.put('/:id', auth, upload.single('photo'), async (req, res) => {
  try {
    const facultyData = { ...req.body };
    
    if (req.file) {
      facultyData.photoUrl = `/uploads/photos/${req.file.filename}`;
    }

    // Parse arrays if they come as strings
    if (facultyData.researchInterests && typeof facultyData.researchInterests === 'string') {
      facultyData.researchInterests = JSON.parse(facultyData.researchInterests);
    }
    if (facultyData.publications && typeof facultyData.publications === 'string') {
      facultyData.publications = JSON.parse(facultyData.publications);
    }
    if (facultyData.awards && typeof facultyData.awards === 'string') {
      facultyData.awards = JSON.parse(facultyData.awards);
    }

    const faculty = await Faculty.findByIdAndUpdate(
      req.params.id,
      facultyData,
      { new: true }
    );

    if (!faculty) {
      return res.status(404).json({ message: 'Faculty not found' });
    }

    res.json({ success: true, faculty });
  } catch (error) {
    res.status(500).json({ message: 'Error updating faculty', error: error.message });
  }
});

// Delete faculty
router.delete('/:id', auth, async (req, res) => {
  try {
    const faculty = await Faculty.findByIdAndDelete(req.params.id);
    
    if (!faculty) {
      return res.status(404).json({ message: 'Faculty not found' });
    }

    res.json({ success: true, message: 'Faculty deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting faculty', error: error.message });
  }
});

module.exports = router;