const multer = require('multer');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      // Define the destination folder where files will be stored
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      // Generate a unique file name or use the original name
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + '-' + uniqueSuffix);
    },
  });
  
  const fileFilter = (req, file, cb) => {
    // Define the accepted file types
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, or PDF files are allowed.'), false);
    }
  };
  
  const upload = multer({ storage: storage, fileFilter: fileFilter });
  