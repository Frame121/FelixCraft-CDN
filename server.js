const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3000;

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Allowed file types
const allowedTypes = [
  'image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/bmp', 'image/svg+xml',
  'video/mp4', 'video/avi', 'video/mov', 'video/wmv',
  'audio/mp3', 'audio/mpeg', 'audio/wav', 'audio/ogg',
  'application/zip', 'application/x-zip-compressed', 'application/rar', 'application/x-rar-compressed',
  'application/pdf',
  'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'text/plain', 'text/csv', 'text/html', 'text/css', 'text/javascript',
  'application/json', 'application/xml', 'text/xml'
];

// Generate random filename
function generateRandomName(ext) {
  return crypto.randomBytes(8).toString('hex') + ext;
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = req.body.folder || '';
    const uploadPath = folder ? path.join(uploadsDir, folder) : uploadsDir;
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const randomName = generateRandomName(ext);
    cb(null, randomName);
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('File type not allowed'), false);
  }
};

// Multer upload configuration
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 100 * 1024 * 1024 // 100MB
  }
});

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Serve uploaded files
app.use('/uploads', express.static(uploadsDir));

// Files page
app.get('/files', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'files.html'));
});

// Upload API
app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ status: 'error', message: 'No file uploaded' });
  }

  const folder = req.body.folder || '';
  const fileUrl = `http://localhost:${PORT}/uploads/${folder ? folder + '/' : ''}${req.file.filename}`;
  
  // If this is a temp file for folder creation, delete it after creating the folder
  if (req.file.originalname === 'temp.txt') {
    try {
      fs.unlinkSync(req.file.path);
    } catch (error) {
      console.error('Error deleting temp file:', error);
    }
  }
  
  res.json({
    status: 'success',
    url: fileUrl,
    folder: folder,
    filename: req.file.filename
  });
});

// Delete endpoint (optional)
app.delete('/delete/:filename', (req, res) => {
  const filename = req.params.filename;
  const token = req.query.token;

  // Simple token check (in production, use proper auth)
  if (!token || token !== 'secret') {
    return res.status(403).json({ status: 'error', message: 'Invalid token' });
  }

  const filePath = path.join(uploadsDir, filename);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    res.json({ status: 'success', message: 'File deleted' });
  } else {
    res.status(404).json({ status: 'error', message: 'File not found' });
  }
});

// Recent files (optional)
let recentFiles = [];

app.get('/api/recent', (req, res) => {
  res.json(recentFiles.slice(-10)); // Last 10 files
});

// Get all uploaded files recursively
function getAllFiles(dirPath, arrayOfFiles = [], folder = '') {
  try {
    const files = fs.readdirSync(dirPath);
    files.forEach(file => {
      const fullPath = path.join(dirPath, file);
      const stats = fs.statSync(fullPath);
      if (stats.isDirectory()) {
        const subfolder = folder ? `${folder}/${file}` : file;
        arrayOfFiles = getAllFiles(fullPath, arrayOfFiles, subfolder);
      } else {
        // Skip temporary files created for folder creation
        if (file !== 'temp.txt') {
          arrayOfFiles.push({
            filename: file,
            folder: folder,
            url: `http://localhost:${PORT}/uploads/${folder ? folder + '/' : ''}${file}`,
            size: stats.size,
            uploadedAt: stats.mtime.toISOString()
          });
        }
      }
    });
  } catch (error) {
    console.error('Error reading directory:', error);
  }
  return arrayOfFiles;
}

app.get('/api/files', (req, res) => {
  try {
    const allFiles = getAllFiles(uploadsDir);
    res.json(allFiles.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt))); // Sort by newest first
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Failed to list files' });
  }
});

// Update recent files on upload
app.use('/api/upload', (req, res, next) => {
  if (req.method === 'POST' && res.statusCode === 200) {
    const folder = req.body.folder || '';
    recentFiles.push({
      filename: req.file.filename,
      url: `http://localhost:${PORT}/uploads/${folder ? folder + '/' : ''}${req.file.filename}`,
      folder: folder,
      uploadedAt: new Date().toISOString()
    });
  }
  next();
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});