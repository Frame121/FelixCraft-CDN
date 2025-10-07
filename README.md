# 🌟 FelixCraft CDN

A beautiful, minimal, and user-friendly Content Delivery Network (CDN) built with Node.js and Express. Upload, manage, and share your files with ease!

![FelixCraft CDN](https://img.shields.io/badge/FelixCraft-CDN-blue?style=for-the-badge)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## ✨ Features

### 🎨 **Beautiful Design**
- **Pastel Color Scheme** - Soft blue, pink, and purple gradients
- **Glass Morphism Effects** - Modern blur and transparency effects
- **Smooth Animations** - Float, fade-in, and hover animations
- **Responsive Design** - Works perfectly on all devices

### 📤 **File Upload**
- **Drag & Drop Support** - Simply drag files to upload
- **Multiple File Types** - Images, videos, audio, documents, archives
- **File Size Limit** - Up to 100MB per file
- **Real-time Preview** - See image previews before upload
- **Progress Feedback** - Visual upload progress indicators

### 🗂️ **File Management**
- **File Explorer Interface** - macOS Finder-style file browser
- **Folder Navigation** - Browse through folders with breadcrumbs
- **File Actions** - Copy URL, download, and open files
- **Search & Filter** - Easy file organization
- **File Information** - Size, upload date, and file type icons

### 🔧 **Technical Features**
- **RESTful API** - Clean API endpoints for file operations
- **Random File Names** - Secure file naming with crypto
- **File Type Validation** - Only allowed file types accepted
- **Error Handling** - Graceful error messages and recovery
- **Modern JavaScript** - ES6+ features and async/await

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
https://github.com/Frame121/FelixCraft-CDN.git
cd FelixCraft-CDN
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the server**
```bash
npm start
```

4. **Open your browser**
```
http://localhost:3000
```

### Development Mode
```bash
npm run dev
```

## 📁 Project Structure

```
felixcraft-cdn/
├── 📁 public/           # Static files
│   ├── 📄 index.html    # Upload page
│   └── 📄 files.html    # File manager
├── 📁 uploads/          # Uploaded files storage
├── 📄 server.js         # Main server file
├── 📄 package.json      # Dependencies
└── 📄 README.md         # This file
```

## 🎯 Usage

### Upload Files
1. Visit `http://localhost:3000`
2. Drag & drop files or click to browse
3. Files are uploaded to the root directory
4. Get shareable URLs instantly

### Manage Files
1. Visit `http://localhost:3000/files`
2. Browse through your uploaded files
3. Navigate folders with breadcrumbs
4. Use action buttons to copy, download, or open files

## 🔌 API Endpoints

### Upload File
```http
POST /api/upload
Content-Type: multipart/form-data

Body:
- file: File to upload
- folder: Target folder (optional)
```

### Get All Files
```http
GET /api/files
```

### Get Recent Files
```http
GET /api/recent
```

### Delete File
```http
DELETE /delete/:filename?token=secret
```

## 🎨 Supported File Types

### 🖼️ Images
- JPEG, PNG, GIF, WebP, BMP, SVG

### 🎥 Videos
- MP4, AVI, MOV, WMV

### 🎵 Audio
- MP3, WAV, OGG

### 📄 Documents
- PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX

### 📦 Archives
- ZIP, RAR

### 💻 Code Files
- TXT, CSV, JSON, XML, HTML, CSS, JS

## ⚙️ Configuration

### Environment Variables
```bash
PORT=3000                    # Server port (default: 3000)
```

### File Size Limit
Edit `server.js` to change the file size limit:
```javascript
limits: {
  fileSize: 100 * 1024 * 1024 // 100MB
}
```

### Allowed File Types
Edit the `allowedTypes` array in `server.js` to modify supported file types.

## 🛡️ Security Features

- **File Type Validation** - Only whitelisted file types allowed
- **Random File Names** - Prevents file name conflicts and guessing
- **File Size Limits** - Prevents abuse with large files
- **Input Sanitization** - Clean user inputs
- **Error Handling** - Secure error messages

## 🎭 Customization

### Colors
Edit the Tailwind config in HTML files to change colors:
```javascript
colors: {
  'pastel-blue': '#e3f2fd',
  'pastel-pink': '#fce4ec',
  'pastel-purple': '#f3e5f5'
}
```

### Animations
Modify CSS animations in the `<style>` sections:
```css
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}
```

## 🐛 Troubleshooting

### Common Issues

**Port already in use**
```bash
# Kill existing Node processes
taskkill /f /im node.exe  # Windows
killall node              # macOS/Linux
```

**Upload fails**
- Check file size (max 100MB)
- Verify file type is supported
- Ensure uploads directory exists

**Files not loading**
- Check server is running
- Verify uploads directory permissions
- Check browser console for errors

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**FelixCraft Official**
- GitHub: [@felixcraft](https://github.com/felixcraft)
- Website: [felixcraft.com](https://felixcraft.com)

## 🙏 Acknowledgments

- **Tailwind CSS** - For the beautiful styling framework
- **Font Awesome** - For the amazing icons
- **Express.js** - For the robust web framework
- **Multer** - For handling file uploads
- **Google Fonts** - For the Mitr font family

## 📊 Stats

![GitHub stars](https://img.shields.io/github/stars/your-username/felixcraft-cdn?style=social)
![GitHub forks](https://img.shields.io/github/forks/your-username/felixcraft-cdn?style=social)
![GitHub issues](https://img.shields.io/github/issues/your-username/felixcraft-cdn)
![GitHub license](https://img.shields.io/github/license/your-username/felixcraft-cdn)

---

<div align="center">
  <p>Made with ❤️ by FelixCraft Official</p>
  <p>⭐ Star this repo if you found it helpful!</p>
</div>
