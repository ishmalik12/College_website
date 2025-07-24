const express = require('express');
const AlumniApplication = require('../models/AlumniApplication');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const router = express.Router();

// Submit application (public)
router.post('/submit', upload.single('photo'), async (req, res) => {
  try {
    const applicationData = { ...req.body };
    
    if (req.file) {
      applicationData.photoUrl = `/uploads/photos/${req.file.filename}`;
    }

    const application = new AlumniApplication(applicationData);
    await application.save();

    res.json({ success: true, message: 'Alumni registration submitted successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting application', error: error.message });
  }
});

// Get all applications (admin)
router.get('/', auth, async (req, res) => {
  try {
    const { status, program, page = 1, limit = 20 } = req.query;
    const filter = {};
    
    if (status) filter.status = status;
    if (program) filter.program = program;
    
    const applications = await AlumniApplication.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await AlumniApplication.countDocuments(filter);

    res.json({
      success: true,
      applications,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching applications', error: error.message });
  }
});

// Get featured alumni (public)
router.get('/featured', async (req, res) => {
  try {
    const featured = await AlumniApplication.find({ 
      status: 'approved', 
      featured: true 
    })
    .sort({ passingYear: -1 })
    .limit(10);

    res.json({ success: true, alumni: featured });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching featured alumni', error: error.message });
  }
});

// Update application
router.patch('/:id', auth, async (req, res) => {
  try {
    const application = await AlumniApplication.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.json({ success: true, application });
  } catch (error) {
    res.status(500).json({ message: 'Error updating application', error: error.message });
  }
});

// Delete application
router.delete('/:id', auth, async (req, res) => {
  try {
    const application = await AlumniApplication.findByIdAndDelete(req.params.id);
    
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.json({ success: true, message: 'Application deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting application', error: error.message });
  }
});

module.exports = router;