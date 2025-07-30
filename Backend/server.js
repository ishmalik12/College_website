const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const iqacRoutes = require('./routes/iqacRoutes');
require('dotenv').config();
const fs = require('fs');

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// ✅ Step 2: Disable Helmet's strict image blocking (if using helmet)
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(compression());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Middleware

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(morgan('combined'));

app.use('/uploads/iqac', express.static(path.join(__dirname, 'uploads','iqac')));
app.use('/uploads/resumes', express.static(path.join(__dirname, 'uploads', 'resumes')));
app.use('/uploads/notices', express.static(path.join(__dirname, 'uploads/notices'), {
  setHeaders: (res, filePath) => {
    res.set('Content-Disposition', 'inline');
  }
}));
app.use('/uploads/photos', express.static(path.join(__dirname, 'uploads/photos'), {
  setHeaders: (res, filePath) => {
    res.set('Content-Disposition', 'inline');
  }
}));
app.use('/uploads/facilities', express.static(path.join(__dirname, 'uploads/facilities'), {
  setHeaders: (res, filePath) => {
    res.set('Content-Disposition', 'inline');
  }
}));

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/teacher-applications', require('./routes/teacherApplications'));
app.use('/api/alumni-applications', require('./routes/alumniApplications'));
app.use('/api/faculty', require('./routes/faculty'));
app.use('/api/notices', require('./routes/notices'));
app.use('/api/achievements', require('./routes/AchievementRoutes'));
app.use('/api/facilities', require('./routes/facilityRoutes'));

app.use('/api/gallery', require('./routes/galleryRoutes'));


app.use('/api/iqac', iqacRoutes);
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// 404 handler
app.use('error', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

app.get('/download/:filename', (req, res) => {
  const filePath = path.join(__dirname, 'uploads/notices', req.params.filename);

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).json({ message: 'File not found' });
    }

    res.download(filePath);
  });
});

module.exports = app;