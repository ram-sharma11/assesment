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
  const upload = multer({ storage });

router.post("/verification",validation, upload.array('documents'), userController.postData)
router.get("/get-user", userController.getData)

module.exports = router;
