const express = require('express');
const TeacherApplication = require('../models/TeacherApplication');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const router = express.Router();

// Submit application (public)
router.post('/submit', upload.single('resume'), async (req, res) => {
  try {
    const applicationData = { ...req.body };
    
    if (req.file) {
      applicationData.resumeUrl = `/uploads/resumes/${req.file.filename}`;
    }

    const application = new TeacherApplication(applicationData);
    await application.save();

    res.json({ success: true, message: 'Application submitted successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting application', error: error.message });
  }
});

// Get all applications (admin)
router.get('/', auth, async (req, res) => {
  try {
    const { status, jobProfile, page = 1, limit = 20 } = req.query;
    const filter = {};
    
    if (status) filter.status = status;
    if (jobProfile) filter.jobProfile = jobProfile;
    
    const applications = await TeacherApplication.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await TeacherApplication.countDocuments(filter);

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

// Get single application
router.get('/:id', auth, async (req, res) => {
  try {
    const application = await TeacherApplication.findById(req.params.id);
    
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.json({ success: true, application });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching application', error: error.message });
  }
});

// Update application status
router.patch('/:id', auth, async (req, res) => {
  try {
    const { status, notes } = req.body;
    const application = await TeacherApplication.findByIdAndUpdate(
      req.params.id,
      { status, notes },
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
    const application = await TeacherApplication.findByIdAndDelete(req.params.id);
    
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.json({ success: true, message: 'Application deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting application', error: error.message });
  }
});

module.exports = router;