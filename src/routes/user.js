const express = require("express")
const router = express.Router();
const multer = require("multer")
const path = require('path');

const userController = require("../controller/userController")
const {validation} = require("../middleware/validator")


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  
  const fileFilter = function (req, file, cb) {
    // Check the file type
     let fileType = file.originalname.split('.').pop() 
    if ( fileType == 'jpeg' ||fileType == 'png' ||fileType == 'jpg'||fileType == 'pdf') {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, JPG and PDF files are allowed.'), false);
    }
  };
  
  
  const upload = multer({ storage: storage,
    fileFilter: fileFilter});
  

router.post("/verification", upload.array('documents'),validation, userController.postData)
router.get("/get-user", userController.getData)

module.exports = router;
