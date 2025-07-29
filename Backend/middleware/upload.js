const multer = require('multer');
const path = require('path');
const fs = require('fs');

// ✅ Ensure uploads directories exist
const uploadDirs = [
  'uploads/resumes',
  'uploads/photos',
  'uploads/notices',
  'uploads/iqac',
  'uploads/facilities',
];

uploadDirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// ✅ Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = 'uploads/';

    if (file.fieldname === 'resume') {
      uploadPath += 'resumes/';
    } else if (file.fieldname === 'photo') {
      uploadPath += 'photos/';
    } else if (file.fieldname === 'attachments') {
      uploadPath += 'notices/';
    } else if (file.fieldname === 'file' || file.fieldname === 'iqacFile') {
      uploadPath += 'iqac/';
    }  else if (file.fieldname === 'image') {
      uploadPath += 'facilities/';
    } 

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// ✅ File filter
const fileFilter = (req, file, cb) => {
  if (file.fieldname === 'resume') {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed for resumes'), false);
    }
  } else if (file.fieldname === 'photo') {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed for photos'), false);
    }
  } else if (file.fieldname === 'file' || file.fieldname === 'iqacFile') {
    // Optional check: allow only PDFs and images for IQAC
    if (
      file.mimetype === 'application/pdf' ||
      file.mimetype.startsWith('image/')
    ) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF or image files are allowed for IQAC uploads'), false);
    }
  } else {
    cb(null, true); // Accept all others by default
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024 // 5MB default
  }
});

module.exports = upload;
