const express = require('express');
const Notice = require('../models/Notice');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const router = express.Router();
router.get('/public', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const { category, type } = req.query;

    const filter = {
      isActive: true,
    };

    if (category) filter.category = category;
    if (type) filter.type = type;

    const notices = await Notice.find(filter)
      .sort({ pinned: -1, createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Notice.countDocuments(filter);

    return res.json({
      success: true,
      notices,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error('Error fetching notices:', error);
    res.status(500).json({ message: 'Error fetching notices', error: error.message });
  }
});



// Get all notices (admin)
router.get('/', auth, async (req, res) => {
  try {
    const { category, type, isActive, page = 1, limit = 20 } = req.query;
    const filter = {};
    
    if (category) filter.category = category;
    if (type) filter.type = type;
    if (isActive !== undefined) filter.isActive = isActive === 'true';
    
    const notices = await Notice.find(filter)
      .sort({ pinned: -1, createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Notice.countDocuments(filter);

    res.json({
      success: true,
      notices,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notices', error: error.message });
  }
});

// Create notice
router.post('/', auth, upload.array('attachments', 5), async (req, res) => {
  try {
    const noticeData = { ...req.body };
    
    if (req.files && req.files.length > 0) {
      noticeData.attachments = req.files.map(file => ({
        filename: file.filename,
        originalName: file.originalname,
        url: `/uploads/notices/${file.filename}`,
        size: file.size
      }));
    }

    const notice = new Notice(noticeData);
    await notice.save();

    res.status(201).json({ success: true, notice });
  } catch (error) {
    res.status(500).json({ message: 'Error creating notice', error: error.message });
  }
});

// Update notice
router.put('/:id', auth, upload.array('attachments', 5), async (req, res) => {
  try {
    const noticeData = { ...req.body };
    
    if (req.files && req.files.length > 0) {
      noticeData.attachments = req.files.map(file => ({
        filename: file.filename,
        originalName: file.originalname,
        url: `/uploads/notices/${file.filename}`,
        size: file.size
      }));
    }

    const notice = await Notice.findByIdAndUpdate(
      req.params.id,
      noticeData,
      { new: true }
    );

    if (!notice) {
      return res.status(404).json({ message: 'Notice not found' });
    }

    res.json({ success: true, notice });
  } catch (error) {
    res.status(500).json({ message: 'Error updating notice', error: error.message });
  }
});

// Delete notice
router.delete('/:id', auth, async (req, res) => {
  try {
    const notice = await Notice.findByIdAndDelete(req.params.id);
    
    if (!notice) {
      return res.status(404).json({ message: 'Notice not found' });
    }

    res.json({ success: true, message: 'Notice deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting notice', error: error.message });
  }
});

// Increment notice views
router.patch('/:id/view', async (req, res) => {
  try {
    const notice = await Notice.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    );

    if (!notice) {
      return res.status(404).json({ message: 'Notice not found' });
    }

    res.json({ success: true, views: notice.views });
  } catch (error) {
    res.status(500).json({ message: 'Error updating views', error: error.message });
  }
});

module.exports = router;